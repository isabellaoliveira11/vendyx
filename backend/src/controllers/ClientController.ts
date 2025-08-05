// backend/src/controllers/ClientController.ts
import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';

const clientService = new ClientService();

export class ClientController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, address } = req.body;
      const client = await clientService.create({ name, email, phone, address });
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const clients = await clientService.findAll();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}