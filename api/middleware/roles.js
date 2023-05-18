//Middleware para verificar Role/perfil de um usuario. Se ele podera acessar aquela rota
//Passaremos uma lista de roles que podera acessar o endpoint

const database = require('../models')

const roles = (listaRoles) => {
    //Se usuario tiver permissao, ele pode prosseguir
    return async (req, res, next) => {
        //validar se o usuario tem permissao ao endpoint
        const { usuarioId } = req

        const usuario = await database.usuarios.findOne({
            //Adicionando array com todas as informações e relacionamento do usuario
            include: [
                {
                    //objetos dos relacionamentos
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            return res.status(401).send("Usuario não cadastrado")
        }

        //Verificar se a lista de roles passadas bate com as do nosso usuario
        const rolesCadastradas = usuario.usuario_roles
            .map((role) => role.nome)
            .some((role) => listaRoles.includes(role))

        if(!rolesCadastradas) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = roles