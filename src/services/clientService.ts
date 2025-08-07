// clientService.ts
import axios from 'axios';
import { API_URL } from '../config/api';

export async function createClient(client: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}) {
  const response = await axios.post(`${API_URL}/clients`, client);
  return response.data;
}

export async function getClients() {
  const response = await axios.get(`${API_URL}/clients`);
  return response.data;
}

export async function deleteClient(id: string) {
  const response = await axios.delete(`${API_URL}/clients/${id}`);
  return response.data;
}

export async function updateClient(id: string, client: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}) {
  const response = await axios.put(`${API_URL}/clients/${id}`, client);
  return response.data;
}
