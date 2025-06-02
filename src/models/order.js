import { DataTypes, Model } from "sequelize";

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        status: {
          type: DataTypes.ENUM("pendente", "concluido", "cancelado"),
          defaultValue: "pendente",
          allowNull: false,
        },
        is_pickup: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          validate: {
            notNull: {
              msg: "O pedido precisa ser informado se é entrega ou retirada",
            },
          },
        },
        payment_method: {
          type: DataTypes.ENUM("pix", "dinheiro"),
          allowNull: false,
          validate: {
            notNull: {
              msg: "O pedido precisa ter um método de pagamento",
            },
            isIn: {
              args: ["pix", "dinheiro"],
              msg: "A forma de pagamento precisa ser em pix, ou dinheiro",
            },
          },
        },
        address_neighborhood: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address_street: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address_landmark: {
          type: DataTypes.STRING,
          allowNull: true,
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
      },
      {
        sequelize,
        modelName: "Order",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: "client_id" });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: "order_id",
    });
  }
}
