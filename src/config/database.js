import dotenv from "dotenv";
dotenv.config(); 

export default {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialectOptions: {
    timezone: "-03:00",
  },
  timezone: "-03:00",
  define: {
    timestamps: true,
    underscored: true,
  },
};
