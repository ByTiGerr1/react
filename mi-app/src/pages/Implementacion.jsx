import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useApiData } from "../providers/ApiDataProvider";

export default function Implementacion() {
  const { publicaciones, cargando, error, recargar, ultimaActualizacion } =
    useApiData();

  return (
    <div className="page">
      <Card
        title="Implementación"
        subTitle="Lista de publicaciones obtenidas desde JSONPlaceholder"
        className="shadow-2"
      >
        <div className="flex justify-content-between align-items-center gap-3 mb-3">
          <span className="text-600">
            {ultimaActualizacion
              ? `Última carga: ${ultimaActualizacion.toLocaleTimeString()}`
              : "Sin datos aún"}
          </span>
          <Button
            label={cargando ? "Cargando..." : "Recargar"}
            icon="pi pi-refresh"
            onClick={recargar}
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <DataTable
          value={publicaciones}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          loading={cargando}
          emptyMessage={cargando ? "Cargando datos..." : "No hay publicaciones"}
          responsiveLayout="scroll"
        >
          <Column field="id" header="ID" style={{ width: "70px" }} />
          <Column field="title" header="Título" />
          <Column field="body" header="Contenido" />
        </DataTable>
      </Card>
    </div>
  );
}
