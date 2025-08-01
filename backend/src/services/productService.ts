import axios from 'axios'

const API_URL = 'http://localhost:3333'

export async function getProducts() {
  const response = await axios.get(`${API_URL}/products`)
  return response.data
}

export async function createProduct(product: {
  name: string
  price: number
  quantity: number
  categoryId: string
}) {
  const response = await axios.post(`${API_URL}/products`, product)
  return response.data
}

export async function updateProduct(id: string, product: {
  name: string
  price: number
  quantity: number
  categoryId: string
}) {
  const response = await axios.put(`${API_URL}/products/${id}`, product)
  return response.data
}

export async function deleteProduct(id: string) {
  const response = await axios.delete(`${API_URL}/products/${id}`)
  return response.data
}
