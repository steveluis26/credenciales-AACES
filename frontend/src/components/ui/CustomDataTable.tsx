import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

interface ColumnConfig<T> {
  field: keyof T;
  header: string;
  body?: (rowData: T) => React.ReactNode;
}

interface CustomDataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  loading?: boolean;
}

const CustomDataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
}: CustomDataTableProps<T>) => {
  if (loading) {
    return (
      <div
        className="flex justify-content-center align-items-center"
        style={{ height: '200px' }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <DataTable
      value={data}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      emptyMessage="No se encontraron registros"
    >
      {columns.map((col) => (
        <Column
          key={String(col.field)}
          field={String(col.field)}
          header={col.header}
          body={col.body}
        />
      ))}
    </DataTable>
  );
};

export default CustomDataTable;
