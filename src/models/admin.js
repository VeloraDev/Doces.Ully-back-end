
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class Admin extends Model{
  static init(sequelize){
    super.init({
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo email é obrigatório",
          },
          isEmail: {
            msg: "E-mail inválido",
          },
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: "Admin",
      tableName: "Admins",
    });

    return this;
  }

  passwordIsValid(password){
    return bcrypt.compare(password, this.password_hash);
  }
};
