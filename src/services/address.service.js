import Address from "../models/address.js";
import AppError from "../errors/AppError.js";

export default class AddressService {
  static async create(data) {
    return await Address.create(data);
  }

  static async getAddresses(clientId) {
    return await Address.findAll({where: { client_id: clientId }});
  }

  static async getAddressById(id, clientId) {
    const address = await Address.findByPk(id);
    if (!address || address.client_id !== clientId){
      throw new AppError("Endereço não encontrado", 404);
    }
    return address;
  }

  static async update(id, data, clientId) {
    const address = await Address.findByPk(id);
    if (!address || address.client_id !== clientId){
      throw new AppError("Endereço não encontrado", 404);
    }

    return await address.update(data);
  }

  static async delete(id, clientId) {
    const address = await Address.findByPk(id);
    if (!address || address.client_id !== clientId){
      throw new AppError("Endereço não encontrado", 404);
    }

    await address.destroy();
    return true;
  }
}
