//Arquivo controller de seguranca
const SegurancaService = require('../services/segurancaService.js')
const segurancaService = new SegurancaService()

class SegurancaController {
    //Cadastrando ACL (Role e permissao a um usuario)
    static async cadastrarAcl(req, res) {
        //Recebdno nosso perfil de usuarios e nossas permissoes
        const { roles, permissoes } = req.body
        //Pegando id do usuario de dentro da nossa req
        const{usuarioId} = req

        try {
            //Criando acl passando roles, permissoes e id do usuario
            const acl = await segurancaService.cadastrarAcl({roles, permissoes, usuarioId})
            
            res.status(201).send(acl)
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }

    //FUnção para cadsatrar permissoes a novos usuarios
    static async cadastrarPermissoesRoles(req, res) {
        //Receber o perfil/ROle e um array de permissoes com as varias permissoes para cada role
        const {roleId, permissoes} = req.body

        try {
            //Chamando a service
            const permissoesRoles = await segurancaService.cadastrarPermissoesRoles({roleId, permissoes})

            res.status(201).send(permissoesRoles)
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }
}

module.exports = SegurancaController