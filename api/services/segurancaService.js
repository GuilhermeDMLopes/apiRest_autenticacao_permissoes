//Service de segurança
const database = require('../models')
//importando sequelize para verificar os id's de roles e permissoes
const Sequelize = require('sequelize')

class SegurancaService {
    //Criando função para cadastrar ACL
    async cadastrarAcl(dto) {
        //Buscando usuario e verificando se ele ja tem roles e permissoes
        const usuario = await database.usuarios.findOne({
            //Inclui no retorno do usuario seus roles e permissoes
            include: [
                {
                    model: database.roles,
                    //mesmo nome que está em models
                    as: 'usuario_roles',
                    //Id da role, nome e descrição
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    model: database.permissoes,
                    //mesmo nome que está em models
                    as: 'usuario_permissoes',
                    //Id da permissao, nome e descrição
                    attributes: ['id', 'nome', 'descricao']
                }
            ],
            where: {
                id: dto.usuarioId
            }
            
        })

        if(!usuario) {
            throw new Error('Usuario não cadastrado')
        }

        //Verifica se os ids informados das roles e permissoes realmente existem
        const rolesCadastradas = await database.roles.findAll({
            where: {
                //Validação de busca para N perfis
                id: {
                    //Vamos passar um array e verificar cada posição do array
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        //removendo as roles e permissoes que ja existem e inserindo as novas
        //remove todos os relacionamentos entre usuario e perfis de usuario
        await usuario.removeUsuario_roles(usuario.usuario_roles)
        await usuario.removeUsuario_permissoes(usuario.usuario_permissoes)

        //Adicionando os novos
        await usuario.addUsuario_roles(rolesCadastradas)
        await usuario.addUsuario_permissoes(permissoesCadastradas)

        //faz uma nova busca pelo usuario para garantir que os dados estão sincronizados
        const novoUsuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ]
        })

        return novoUsuario
    }

    //Função para cadastrar novas permissoes aos perfis
    async cadastrarPermissoesRoles(dto) {
        //Buscar nossa role
        const role = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id','nome','descricao'],
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        if(!role) {
            throw new Error("Role não cadastrada")
        }

        //Buscar para ver se os id das permissoes são validos
        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        //remover as permissoes existentes no perfil
        await role.removeRoles_das_permissoes(role.roles_das_permissoes)
        //adicionando as novas
        await role.addRoles_das_permissoes(permissoesCadastradas)

        //retornando perfil de usuario atualizado
        const novaRole = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao']                    
                }                
            ],
            where: {
                id: dto.roleId
            }
        })

        return novaRole
    }
}

module.exports = SegurancaService