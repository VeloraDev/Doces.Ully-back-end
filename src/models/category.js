import { Model, DataTypes } from "sequelize";

export default class Category extends Model {
  static init(sequelize){
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {          
          notEmpty:{
            msg: "O nome da categoria não pode ser vazio",
          },
          len: {
            args: [3, 255],
            msg: "O nome da categoria precisa conter entre 3 e 255 caracteres",
          },
        }
      }
    }, {
      sequelize,
      modelName: 'Category',
    });
    return this;
  }
}
