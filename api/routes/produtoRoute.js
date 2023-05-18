const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
//Importando middleware de roles
const roles = require('../middleware/roles.js')
//IMportando middleware de permissoes
const permissoes = require('../middleware/permissoes.js')
const permissoesRoles = require('../middleware/permissoesRoles')

const router = Router()

router
  //Apenas quem tem permissao de perfil de adicionar pode usar essa rota
  .post('/produto', permissoesRoles(["adicionar"]), ProdutoController.cadastrarProduto)
  //apenas quem tem permissao de listar pode usar essa rota
  .get('/produto', permissoes(["listar"]), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', permissoesRoles(["listar"]), ProdutoController.buscarProdutoPorId)
  //apenas gerentes podem usar essa rota
  .delete('/produto/id/:id', roles(["Gerente"]), permissoes(["excluir"]), ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', permissoesRoles(["editar"]), ProdutoController.editarProduto)

module.exports = router