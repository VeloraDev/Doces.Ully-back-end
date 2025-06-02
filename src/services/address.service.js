import Address from "../models/address.js";

export default class AddressService {
  static async create(data) {
    return await Address.create(data);
  }

  static async getAddresses(clientId) {
    return await Address.findAll({where: { client_id: clientId }});
  }

  static async getAddressById(id, clientId) {
    const address = await Address.findByPk(id);
    if (!address || address.client_id !== clientId) return null;
    return address;
  }

  static async update(id, data, clientId) {
    const address = await Address.findByPk(id);
    if (!address || address.client_id !== clientId) return null;

    return await address.update(data);
  }

  static async delete(id, clientId) {
    const address = await Address.findByPk(id);
    if (!address || address.client_id !== clientId) return null;

    await address.destroy();
    return true;
  }
}
