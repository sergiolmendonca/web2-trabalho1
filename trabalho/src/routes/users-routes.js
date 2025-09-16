import { Router } from "express"
import * as usuarioControler from "../controller/users-controller.js";

const usersRouter = Router();

const respostaPadrao = (req, res) => { res.send("FUNCIONA") };

usersRouter.get('/lista',  usuarioControler.mostraListaUsuarios);

// montar o formulario (visualizar a tela onde vai ser preenchido)
usersRouter.get('/criar',  usuarioControler.mostraPaginaCriacaoUsuario);
// receber os dados e processar
usersRouter.post('/criar', usuarioControler.criarUsuario);

usersRouter.get('/edit/:id',   usuarioControler.mostraPaginaCriacaoUsuario);
usersRouter.post('/edit',  usuarioControler.editarUsuario);

usersRouter.get('/delete', respostaPadrao);

export  { usersRouter }