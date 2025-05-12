import { DataTypes, Model } from "sequelize";

export default class Product extends Model{
  static init(sequelize){
    super.init( {
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
          notNull: {
            msg: "Campo nome é obrigatório"
          },
          len: {
            args: [3, 255],
            msg: "O nome do produto precisa conter entre 3 e 255 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo descrição é obrigatório"
          },
          len: {
            args: [3, 255],
            msg: "A descrição precisa conter entre 3 e 255 caracteres",
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo preço é obrigatório"
          },
          isNumeric: {
            msg: "Preço inválido",
          },
          min: {
            args: [0],
            msg: "O valor não pode ser menor que zero",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          notNull: {
            msg: "Campo quantidade é obrigatório"
          },
          isNumeric: {
            msg: "Quantidade inválida",
          },
          min: {
            args: [0],
            msg: "O valor não pode ser menor que zero",
          },
        },
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Categoria é obrigatória",
          },
          isUUID: {
            args: 4,
            msg: "ID de categoria inválido",
          },
        },
      },
      img_path:{
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          return this.getDataValue('img_path');
        }
      },
      img_url: {
        type: DataTypes.VIRTUAL,
        get(){
          const path = this.getDataValue("img_path");
          if(!path) return null;
          return `${process.env.SERVER_URL}/${path}`;
        }
      }
    }, {
      sequelize,
      modelName: 'Product',
    });

    return this;
  }

  static associate (models) {
    this.belongsTo(models.Category, { foreignKey: "category_id" });
  }
}
