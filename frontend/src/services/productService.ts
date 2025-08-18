import axios from 'axios';
import { API_URL } from '../config/api';

export async function createProduct(product: {
  name: string;
  price: number;
  stock: number; 
  
  categoryId: string;
}) {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
}

export async function getProducts() {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
}
