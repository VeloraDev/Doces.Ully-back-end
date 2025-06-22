import { Model, DataTypes } from "sequelize";

export default class Address extends Model {
  static init(sequelize){
    super.init( {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "O campo bairro é obrigatório",
          },
          len: {
            args: [3, 255],
            msg: "O campo bairro precisa conter entre 3 e 255 caracteres",
          }
        }
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "O campo rua é obrigatório",
          },
          len: {
            args: [3, 255],
            msg: "O campo rua precisa conter entre 3 e 255 caracteres",
          }
        }
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "O campo numero é obrigatório",
          },
        }
      },
      landmark: {
        type: DataTypes.STRING,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Cliente é obrigatório",
          },
          isUUID: {
            args: 4,
            msg: "ID de cliente inválido",
          },
        },
      },
    }, {
      sequelize,
      modelName: "Address",
      tableName: "Addresses",
    });

    return this;
  }

  static associate(models){
    this.belongsTo(models.Client, { foreignKey: "client_id" });
  }
}
