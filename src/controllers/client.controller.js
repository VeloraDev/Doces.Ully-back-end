import ClientService from "../services/client.service.js";

function clientParse(client){
  return {
    id: client.id,
    name: client.name,
    phone: client.phone,
  };
}

export default class ClientController {
  static async create(req, res, next) {
    try {
      const client = await ClientService.create(req.body);
      return res.status(201).json(clientParse(client));
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const client = await ClientService.getClientById(req.clientId);
      return res.status(200).json(clientParse(client));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const client = await ClientService.update(req.clientId, req.body);
      return res.status(200).json(clientParse(client));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ClientService.delete(req.clientId);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next){
    try {
      const { phone, password } = req.body;
      const token = await ClientService.login(phone, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
