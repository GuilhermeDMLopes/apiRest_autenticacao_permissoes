//Validar permissoes do usuario
const databate = require('../models')

const permissoes = (listaPermissoes) => {
    return async (req, res, next) => {
        //pegando id do usuario na req
        const {usuarioId} = req

        //buscando usuario
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            return res.status(401).send('Usuario não cadastrado')
        }

        //Se a lista de permissoes do endpoint é a lista de permissoes do usuario
        const permissoesCadastradas = usuario.usuario_permissoes
            .map((permissao) => permissao.nome)
            .some((permissao) => listaPermissoes.includes(permissao))

        if(!permissoesCadastradas) {
            return res.status(401).send('Usuario nao possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = permissoes