//Criando rota para usuario
const { Router } = require('express');
//importando controller de usuario
const UsuarioController = require("../controllers/usuarioController.js")
//Adicionando middleware de autenticação
const autenticado = require('../middleware/autenticado.js')

const router = Router();

//utilizando middleware
router.use(autenticado);

//Criando rotas para usuario
router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.buscarTodosUsuarios)
    .get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId)
    .put('/usuarios/id/:id', UsuarioController.editarUsuario)
    .delete('/usuarios/id/:id', UsuarioController.deletarUsuario)

module.exports = router;