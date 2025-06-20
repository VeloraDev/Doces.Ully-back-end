import AddressService from "../services/address.service.js";

function addressParse(address) {
  return {
    id: address.id,
    neighborhood: address.neighborhood,
    street: address.street, 
    number: address.number, 
    landmark: address.landmark 
  };
}

export default class AddressController {
  static async create(req, res, next) {
    try {
      const address = await AddressService.create({ ...req.body, client_id: req.clientId });
      return res.status(201).json(addressParse(address));
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const addresses = await AddressService.getAddresses(req.clientId);
      res.status(200).json(addresses.map(address => {
        return addressParse(address);
      }));
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const address = await AddressService.getAddressById(req.params.id, req.clientId);
      if (!address) {
        return res.status(404).json({
          message: "Endereço não encontrado",
        });
      }
      
      return res.status(200).json(addressParse(address));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const address = await AddressService.update(req.params.id, req.body, req.clientId);
      if (!address) {
        return res.status(404).json({
          message: "Endereço não encontrado",
        });
      }

      return res.status(200).json(addressParse(address));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const addressDeleted = await AddressService.delete(req.params.id, req.clientId);
      if (!addressDeleted) {
        return res.status(404).json({
          message: "Endereço não encontrado",
        });
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
