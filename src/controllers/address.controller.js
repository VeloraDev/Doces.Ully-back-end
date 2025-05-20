import { ValidationError } from "sequelize";
import AddressService from "../services/address.service.js";

export default class AddressController {
  static async create(req, res) {
    try {
      const address = await AddressService.create({ ...req.body, client_id: req.clientId });
      return res.status(201).json({ 
        id: address.id,
        neighborhood: address.neighborhood,
        street: address.street, 
        number: address.number, 
        landmark: address.landmark 
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({
          errors: messages,
        });
      }

      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async index(req, res) {
    try {
      const addresses = await AddressService.getAddresses(req.clientId);
      res.status(200).json(addresses.map(address => {
        return { 
        id: address.id,
        neighborhood: address.neighborhood,
        street: address.street, 
        number: address.number, 
        landmark: address.landmark 
      };
      }));
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async show(req, res) {
    try {
      const address = await AddressService.getAddressById(req.params.id, req.clientId);
      if (!address) {
        return res.status(404).json({
          message: "Endereço não encontrado",
        });
      }
      
      return res.status(200).json({ 
        id: address.id,
        neighborhood: address.neighborhood,
        street: address.street, 
        number: address.number, 
        landmark: address.landmark 
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async update(req, res) {
    try {
      const address = await AddressService.update(req.params.id, req.body, req.clientId);
      if (!address) {
        return res.status(404).json({
          message: "Endereço não encontrado",
        });
      }

      return res.status(200).json({ 
        id: address.id,
        neighborhood: address.neighborhood,
        street: address.street, 
        number: address.number, 
        landmark: address.landmark 
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({
          errors: messages,
        });
      }

      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async delete(req, res) {
    try {
      const addressDeleted = await AddressService.delete(req.params.id, req.clientId);
      if (!addressDeleted) {
        return res.status(404).json({
          message: "Endereço não encontrado",
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }
}
