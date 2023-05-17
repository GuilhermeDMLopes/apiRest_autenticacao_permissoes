const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute.js')
//importando rotas de usuarios
const usuario = require('./usuariosRoute.js')

module.exports = app => {
  app.use(
    bodyParser.json(),
    produto,
    usuario
  )
}
