//Arquivo para rotas de permissoes de usuario
const PermissaoController = require('../controllers/permissaoController')

const { Router } = require('express')

const router = Router()

router
    .post('/permissao', PermissaoController.cadastrar)
    .get('/permissao', PermissaoController.buscarTodasPermissoes)
    .get('permissao/:id', PermissaoController.buscarPermissaoPorId)
    .delete('/permissao/:id', PermissaoController.deletarPermissaoPorId)
    .put('/permissao/:id', PermissaoController.editarPermissao)

module.exports = router