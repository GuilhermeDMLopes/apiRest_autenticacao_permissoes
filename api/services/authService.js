//Arquivo para receber as funções de autenticação
//importando db
const database = require('../models')
//importando bcrypt para comparar hash da senha
const { compare } = require('bcryptjs');
//importando biblioteca para gerar JWT
const { sign } = require('jsonwebtoken')
//importando arquivo com secret
const jsonSecret = require('../config/jsonSecret.js')

class AuthService {
    //Criando função para fazer login
    async login(dto) {
        const usuario = await database.usuarios.findOne({
            //Quais atributos vamos retornar na nossa consulta.
            //Retornaremos o id, email e senha pra validar se realmente é a do usuario
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
        })

        if(!usuario) {
            throw new Error("Usuario não cadastrado")
        }

        const senhasIguais = await compare(dto.senha, usuario.senha)

        if(!senhasIguais) {
            throw new Error("Usuario ou Senha incorreta")
        }

        //Criando JWT
        //Parametros: payload, secret(codigo unico do projeto), option(tempo de expiração, etc)
        //utilizando site md5.cz, geraremos um secret atraves da palavra seguranca e copiar o hash gerado
        //Ficara armazenado em config/jsonSecret.js mas deve ser feito em um .env
        const accessToken = sign({
            id: usuario.id,
            email: usuario.email,
        }, jsonSecret.secret, {
            //1 dia em segundos
            expiresIn: 86400
        })

        return { accessToken }
    }
}

module.exports = AuthService