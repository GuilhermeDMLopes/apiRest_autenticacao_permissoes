//Arquivo de controller de autenticação
const AuthService = require('../services/authService.js')

const authService = new AuthService();

class AuthController {
    //Função para autenticar login
    static async login(req, res) {
        //pegando email e senha para autenticar usuario
        const { email, senha } = req.body

        try {
            const login = await authService.login({email, senha})
    
            res.status(200).send(login)            
        } catch (error) {
            res.status(401).send({message: error.message})
        }
    }
}

module.exports = AuthController