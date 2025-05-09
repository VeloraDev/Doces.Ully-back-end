import Client from "../models/client.js";

export default class ClientService{
  static async create(data){
    return await Client.create(data);
  }
}