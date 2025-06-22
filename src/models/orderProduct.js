import { DataTypes, Model } from "sequelize";

export default class OrderProduct extends Model {
  static init(sequelize){
    super.init( {
      order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pedido é obrigatório",
          },
          isUUID: {
            args: 4,
            msg: "ID de pedido inválido",
          },
        },
      },
      product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Produto é obrigatório",
          },
          isUUID: {
            args: 4,
            msg: "ID de produto inválido",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantidade não pode ser nula",
          },
          min: {
            args: 1,
            msg: "Deve haver no mínimo um produto",
          }
        }
      }
    }, {
      sequelize,
      modelName: "OrderProduct",
      tableName: "Order_Products",
      timestamps: false,
      id: false,
    } );
  }

  static asssiate(models){
    OrderProduct.belongsTo(models.Order, { foreignKey: "order_id" });
    OrderProduct.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}