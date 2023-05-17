//Criando rota para usuario
const { Router } = require('express');
//importando controller de usuario
const UsuarioController = require("../controllers/usuarioController.js")

const router = Router();

//Criando rotas para usuario
router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios')
    .get('/usuarios/id/:id')
    .put('/usuarios/id/:id')
    .delete('/usuarios/id/:id')

module.exports = router;