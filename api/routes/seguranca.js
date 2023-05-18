//Arquivo para relacionar perfis de usuarios e permissoes ao usuario
const { Router } = require('express')
//Importando controller
const SegurancaController = require('../controllers/segurancaController.js')

const router = Router()

//Segundo endpoint responsavel por fazer o cadastro de permissoes em novos perfis
router
    .post('/seguranca/acl', SegurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles)

module.exports = router;