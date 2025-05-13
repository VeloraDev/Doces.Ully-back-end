
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
          }
        }
      },
      password_hash: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.VIRTUAL,        
        validate: {
          notNull: {
            msg: "Campo senha é obrigatório",
          },
        },
      },
    }, {
      sequelize,
      modelName: 'Admin',
    });

    return this;
  }

  static passwordIsValid(password){
    return bcrypt.compare(password, this.password_hash);
  }
};
