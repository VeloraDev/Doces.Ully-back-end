/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Products", "img_path", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Products", "img_path", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
