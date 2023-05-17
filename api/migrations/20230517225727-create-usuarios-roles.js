'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.UUID,
        //criando referencia ao id de usuarios
        references: {
          model: 'usuarios',
          key: 'id'
        },
        //caso usuario seja editado ou deletado, precisamos adicionar essas informações dentro da tabela pivo
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      role_id: {        
        type: Sequelize.UUID,
        //mesma coisa do item anterior
        references: {
          model: 'roles',
          key: 'id'
        },        
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
    await queryInterface.dropTable('usuarios_roles');
  }
};