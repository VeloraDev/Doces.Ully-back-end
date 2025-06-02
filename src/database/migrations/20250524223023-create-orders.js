'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.ENUM("pendente", "concluido", "cancelado"),
        allowNull: false,
        defaultValue: "pendente",
      },
      is_pickup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      payment_method: {
        type: Sequelize.ENUM("pix", "dinheiro"),
        allowNull: false,
      },
      address_neighborhood: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_landmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Clients",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface) {
     await queryInterface.dropTable('Orders');
  }
};
