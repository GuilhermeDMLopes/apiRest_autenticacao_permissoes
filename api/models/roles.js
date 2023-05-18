'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // fazendo associação entre roles e usuarios e permissoes
      //Parametros: tabela que recebe relacionamento, referencia da tabela pivo
      roles.belongsToMany(models.usuarios, {
        through: models.usuarios_roles,
        //nome tem que ser diferente do usado em usuarios.js
        as: 'roles_do_usuario',
        foreignKey: 'role_id'
      })
      roles.belongsToMany(models.permissoes, {
        through: models.roles_permissoes,
        as: 'roles_das_permissoes',
        foreignKey: 'role_id'
      })
    }
  }
  roles.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};