const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute.js')
//importando rotas de usuarios
const usuario = require('./usuariosRoute.js')
//importando rota de autenticação. ELe sempre deve ser o primeiro
const auth = require('./authRoute.js')
//importando rotas de roles
const role = require('./role.js')
//importando rotas de permissoes
const permissao = require('./permissaoRoute.js')


module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuario,
    role,
    permissao
  )
}
