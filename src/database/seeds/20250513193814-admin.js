'use strict';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface) {
    if(!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD){
      throw new Error("E-mail ou senha não definidos no .env");
    }
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await queryInterface.bulkInsert('Admins', [{
      id: crypto.randomUUID(),
      email: process.env.ADMIN_EMAIL,
      password_hash: hash,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Admins', { email: process.env.ADMIN_EMAIL }, {});
  }
};
