import Client from "../models/client.js";

export default class ClientService {
  static async create(data) {
    return await Client.create(data);
  }

  static async getClientById(id) {
    return await Client.findByPk(id);
  }

  static async update(id, data) {
    const client = await Client.findByPk(id);
    if (!client) return null;

    return await client.update(data);
  }

  static async delete(id) {
    const client = await Client.findByPk(id);
    if (!client) return null;

    await client.destroy();
    return true;
  }
}
