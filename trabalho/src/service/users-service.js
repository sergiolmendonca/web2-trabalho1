import { select, insert } from "../config/db.js"
import { createHash } from "crypto"

export function criar(user) {
    const dados = select();

    const validacao = validaFormulario(user, dados);
    if (!validacao.valid) return { success: false, message: validacao.message };

    user.password = hashPassword(user.password);
    insert(user);

    return  { success: true, message: "Usuário cadastrado com sucesso!" };
}

export function editar(user) {
    let user_to_modify = select().find(x => x.id == user.id);

    if (!user_to_modify) return { success: false, message: "Usuário não encontrado!" };

    user_to_modify.name = user.name;
    user_to_modify.email = user.email;
    user_to_modify.status = user.status;
    user_to_modify.role = user.role;
    user_to_modify.username = user.username;
    user_to_modify.password = user.password ? hashPassword(user.password) : user_to_modify.password;
    

    return { success: true, message: "Usuário alterado com sucesso!" };
}

export function busca(id) {
    return select().find(x => x.id == id);
}

function validaFormulario(user, dados) {
    if (dados.find((x) => x.email == user.email)) 
        return { valid: false, message: "Já existe um usuário cadastrado com este email!" };

    if (dados.find((x) => x.username == user.username)) 
        return { valid: false, message: "Já existe um usuário cadastrado com este username!" };

    for (const chave in user) 
        if(!user[chave]) return { valid: false, message: `O campo ${chave} deve ser preenchido!` };

    return { valid: true };
}

function hashPassword(senha) {
    return createHash("sha256").update(senha).digest();
}