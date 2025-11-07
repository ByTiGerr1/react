import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PRECIO_ENTRADA = 5000;

export default function TablaEntradas({ entradas, encabezado }) {
  const plantillaValor = (fila) => fila.cantidad * PRECIO_ENTRADA;

  return (
    <div className="card">
      <h3 className="m-0 p-3">Entradas Compradas</h3>
      <DataTable value={entradas} header={encabezado} emptyMessage="Sin entradas registradas">
        <Column field="dia" header="Día" />
        <Column field="pelicula" header="Película" />
        <Column field="cantidad" header="Cantidad de Entradas" />
        <Column header="Valor a Pagar" body={plantillaValor} />
      </DataTable>
    </div>
  );
}