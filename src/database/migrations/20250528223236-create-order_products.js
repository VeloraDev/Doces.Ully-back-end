'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Order_Products", {
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
    await queryInterface.addConstraint("Order_Products", {
      fields: ["order_id", "product_id"],
      type: "primary key",
      name: "order_products_pk",
    });
  },

  async down (queryInterface) {
    queryInterface.dropTable("Order_Products");
  }
};
