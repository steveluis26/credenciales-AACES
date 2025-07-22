import axios from 'axios';
import { API_URL } from '../utils/constants';

interface Cliente {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  rfc?: string;
  fecha_vencimiento_pago?: string;
}

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get(`${API_URL}/clientes`);
  return response.data;
};

export const createCliente = async (clienteData: Cliente): Promise<Cliente> => {
  const response = await axios.post(`${API_URL}/clientes`, clienteData);
  return response.data;
};

export const toggleClienteStatus = async (id: number): Promise<void> => {
  await axios.patch(`${API_URL}/clientes/${id}/toggle-status`);
};

export const getClientesProximosVencimientos = async (): Promise<Cliente[]> => {
  const response = await axios.get(`${API_URL}/clientes/proximos-vencimientos`);
  return response.data;
};