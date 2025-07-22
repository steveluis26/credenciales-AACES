import api from './api'; // usa el cliente centralizado

export interface Cliente {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  rfc?: string;
  fecha_vencimiento_pago?: string;
}

// GET lista de clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get('/clientes');
  return response.data;
};

// POST crear cliente
export const createCliente = async (clienteData: Cliente): Promise<Cliente> => {
  const response = await api.post('/clientes', clienteData);
  return response.data;
};

// PATCH toggle estado
export const toggleClienteStatus = async (id: number): Promise<void> => {
  await api.patch(`/clientes/${id}/toggle-status`);
};

// GET clientes próximos a vencimiento
export const getClientesProximosVencimientos = async (): Promise<Cliente[]> => {
  const response = await api.get('/clientes/proximos-vencimientos');
  return response.data;
};
