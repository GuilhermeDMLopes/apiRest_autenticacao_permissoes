'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // fazendo associação entre roles e usuarios e permissoes
      //Parametros: tabela que recebe relacionamento, referencia da tabela pivo
      permissoes.belongsToMany(models.usuarios, {
        through: models.usuarios_permissoes,
        as: 'permissoes_de_usuario',
        foreignKey: 'permissao_id'
      })
      permissoes.belongsToMany(models.roles, {
        through: models.roles_permissoes,
        as: 'permissoes_das_roles',
        foreignKey: 'permissao_id'
      })
    }
  }
  permissoes.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissoes',
  });
  return permissoes;
};