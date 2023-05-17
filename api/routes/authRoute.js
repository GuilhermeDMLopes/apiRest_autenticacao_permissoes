//Arquivo para criar token de autenticação para as rotas
const { Router } = require('express');
//importando controller
const AuthController = require('../controllers/authController.js')

const router = Router()

router
    .post('/auth/login', AuthController.login)

module.exports = router