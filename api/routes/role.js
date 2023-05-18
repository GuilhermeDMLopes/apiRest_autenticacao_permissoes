//Arquivo para rotas para roles de usuario
const RoleController = require('../controllers/roleController.js')

const { Router } = require('express')

const router = Router()

router
    .post('/role', RoleController.cadastrar)
    .get('/role', RoleController.buscarTodasRoles)
    .get('role/:id', RoleController.buscarRolePorId)
    .delete('/role/:id', RoleController.deletarRolePorId)
    .put('/role/:id', RoleController.editarRole)

module.exports = router