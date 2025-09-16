import { select, insert } from "../config/db.js"
import * as usuarioService from "../service/users-service.js"

// UTILIZANDO UM CONTROLLER SEM CLASSES
export function mostraListaUsuarios(req, res) {
    // res.send("RESPOSTA DO CONTROLLER");
    const dados = select();
    res.render('users-lista', { dados })
    // res.render('users-lista', { dados: dados })
}

export function mostraPaginaCriacaoUsuario(req, res) {
    const id = req.params.id;

    if (id) {
        const user = usuarioService.busca(id);
        res.render('users-create', { model: user });
    } else {
        res.render('users-create');
    }
}

export function criarUsuario(req, res) {
    const user = req.body;
    return res.render("users-create", usuarioService.criar(user));
}

export function editarUsuario(req, res) {
    const user = req.body;
    return res.render("users-create", usuarioService.editar(user));
}



