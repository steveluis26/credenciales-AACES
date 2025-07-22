import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import CustomDataTable from 'components/ui/CustomDataTable';
import ClienteForm from 'components/admin/ClienteForm';
import { getClientes, createCliente, toggleClienteStatus } from 'services/clientes';
import { useAuth } from 'hooks/useAuth';

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  activo?: boolean;
  fecha_vencimiento_pago?: string;
}

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const { user } = useAuth();

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data as Cliente[]); // aseguramos que es Cliente[]
    } catch {
      showError('Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleCreate = async (clienteData: Omit<Cliente, 'id'>) => {
    try {
      await createCliente(clienteData);
      fetchClientes();
      setShowDialog(false);
      showSuccess('Cliente creado exitosamente');
    } catch {
      showError('Error al crear cliente');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleClienteStatus(id);
      fetchClientes();
      showSuccess('Estado del cliente actualizado');
    } catch {
      showError('Error al actualizar estado');
    }
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };

  const columns = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'nombre', header: 'Nombre', sortable: true, filter: true },
    { field: 'email', header: 'Email', sortable: true, filter: true },
    {
      field: 'activo',
      header: 'Estado',
      body: (rowData: Cliente) => (
        <i
          className={`pi pi-${rowData.activo ? 'check-circle text-green-500' : 'times-circle text-red-500'}`}
          style={{ fontSize: '1.2rem' }}
        />
      ),
      width: '100px',
    },
    {
      field: 'fecha_vencimiento_pago',
      header: 'Vencimiento',
      sortable: true,
      body: (rowData: Cliente) =>
        rowData.fecha_vencimiento_pago
          ? new Date(rowData.fecha_vencimiento_pago).toLocaleDateString()
          : '—',
    },
    {
      field: 'acciones',
      header: 'Acciones',
      body: (rowData: Cliente) => (
        <Button
          label={rowData.activo ? 'Desactivar' : 'Activar'}
          className={`p-button-sm ${
            rowData.activo ? 'p-button-danger' : 'p-button-success'
          }`}
          onClick={() => handleToggleStatus(rowData.id)}
        />
      ),
    },
  ];

  return (
    <div className="card">
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Clientes</h2>
        {user?.rol === 'admin' && (
          <Button
            label="Nuevo Cliente"
            icon="pi pi-plus"
            onClick={() => setShowDialog(true)}
          />
        )}
      </div>

      <CustomDataTable<Cliente>
        data={clientes}
        columns={columns}
        loading={loading}
      />

      <Dialog
        header="Nuevo Cliente"
        visible={showDialog}
        style={{ width: '50vw' }}
        onHide={() => setShowDialog(false)}
        modal
      >
        <ClienteForm onSubmit={handleCreate} />
      </Dialog>
    </div>
  );
};

export default ClientesPage;
