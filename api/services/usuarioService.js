//Arquivo de serviços de usuario
//importando DB
const database = require('../models')
//importando hash para senha
const { hash } = require('bcryptjs')
//IMportando uuid para id do usuario cadastrado
const uuid = require('uuid')

class UsuarioService {
    //Função de cadastro
    //dto tem todas as informações do usuario, nome, email e senha (é um objeto)
    async cadastrar(dto) {
        //validando se usuario ja existe pelo email
        
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if(usuario) {
            throw new Error("Usuario ja cadastrado")
        }

        try {
            //Criptografando a senha do usuario com bcrypt
            //passamos a senha e a quantidade de saltos para nossa senha
            const senhaHash = await hash(dto.senha, 8)
    
            const novoUsuario = await database.usuarios.create({
                //Gerando um hash no padrão v4
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
    
            //retornando para controller a criação do usuario
            return novoUsuario            
        } catch (error) {
            throw new Error("Erro ao cadastrar usuario")
        }


    }

    async buscarTodosUsuarios() {
        const usuarios = await database.usuarios.findAll()

        return usuarios
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        })

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        return usuario
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id)

        try {
            usuario.nome = dto.nome
            usuario.email = dto.email

            await usuario.save()

            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id)

        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario!')
        }
    }
}

module.exports = UsuarioService