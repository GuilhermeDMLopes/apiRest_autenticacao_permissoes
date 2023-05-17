'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles_permissoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.UUID,
        //criando referencia ao id de roles
        references: {
          model: 'roles',
          key: 'id'
        },
        //caso usuario seja editado ou deletado, precisamos adicionar essas informações dentro da tabela pivo
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      permissao_id: {
        type: Sequelize.UUID,
        //criando referencia ao id de permissoes
        references: {
          model: 'permissoes',
          key: 'id'
        },
        //caso usuario seja editado ou deletado, precisamos adicionar essas informações dentro da tabela pivo
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles_permissoes');
  }
};