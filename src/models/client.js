import { DataTypes, Model, ValidationError } from "sequelize";
import validator from "validator";
import bcrypt from "bcryptjs";

export default class Client extends Model {
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
          len: {
            args: [3, 255],
            msg: "O nome da precisa conter entre 3 e 255 caracteres",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Telefone já cadastrado na base de dados",
        },
        validate: {
          isPhone(value){
            if(!validator.isMobilePhone(value, "pt-BR")){
              throw new ValidationError("Telefone inválido");
            }
          },
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          len: {
            args: [8, 255],
            msg: "A senha precisa ter pelo menos 8 caracteres",
          },
        },
      },
    }, {
      sequelize,
      modelName: 'Client',
    });

    this.addHook('beforeSave', async client => {
      if(client.password){
        client.password_hash = await bcrypt.hash(client.password, 9);
      }
    });
    
    return this;
  }
}
