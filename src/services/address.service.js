import Address from "../models/address.js";

export default class AddressService {
  static async create(data) {
    return await Address.create(data);
  }

  static async getAddresses() {
    return await Address.findAll();
  }

  static async getAddressById(id) {
    return await Address.findByPk(id);
  }

  static async update(id, data) {
    const address = await Address.findByPk(id);
    if (!address) return null;

    return await address.update(data);
  }

  static async delete(id) {
    const address = await Address.findByPk(id);
    if (!address) return null;

    await address.destroy();
    return true;
  }
}
