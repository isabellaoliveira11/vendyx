import axios from 'axios';
import type { Client } from '../types/client';

const API_URL = 'http://localhost:3333';

export const clientService = {
  async getClients(): Promise<Client[]> {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  },
  async createClient(data: Omit<Client, 'id'>): Promise<Client> {
    const response = await axios.post(`${API_URL}/clients`, data);
    return response.data;
  },
  async updateClient(id: string, data: Omit<Client, 'id'>): Promise<Client> {
    const response = await axios.put(`${API_URL}/clients/${id}`, data);
    return response.data;
  },
  async deleteClient(id: string): Promise<void> {
    await axios.delete(`${API_URL}/clients/${id}`);
  }
};
