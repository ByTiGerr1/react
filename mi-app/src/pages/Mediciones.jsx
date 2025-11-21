import { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import {
  eliminarMedicion,
  obtenerMediciones,
} from "../services/medicionesService";

const tipos = [
  { label: "Kilowatts", value: "Kilowatts" },
  { label: "Watts", value: "Watts" },
  { label: "Temperatura", value: "Temperatura" },
];

const unidadPorTipo = {
  Kilowatts: "kW",
  Watts: "W",
  Temperatura: "C",
};

export default function Mediciones() {
  const [mediciones, setMediciones] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [tipoFiltrado, setTipoFiltrado] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    setMediciones(obtenerMediciones());
  }, []);

  const filtrar = () => {
    setTipoFiltrado(tipoSeleccionado);
  };

  const limpiarFiltro = () => {
    setTipoFiltrado(null);
    setTipoSeleccionado(null);
  };

  const descartar = (id) => {
    const restantes = eliminarMedicion(id);
    setMediciones(restantes);
    toast.current?.show({
      severity: "info",
      summary: "Lectura descartada",
      life: 2000,
    });
  };

  const medicionesMostrar = tipoFiltrado
    ? mediciones.filter((medicion) => medicion.tipo === tipoFiltrado)
    : mediciones;

  const plantillaValor = (fila) =>
    `${fila.valor} ${unidadPorTipo[fila.tipo] || ""}`;

  const acciones = (fila) => (
    <Button
      label="Descartar Lectura"
      icon="pi pi-trash"
      severity="danger"
      onClick={() => descartar(fila.id)}
    />
  );

  return (
    <div className="page">
      <Toast ref={toast} position="top-center" />
      <div className="card">
        <div className="flex gap-2 align-items-end mb-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="filtro">Filtrar por tipo de medida</label>
            <Dropdown
              id="filtro"
              value={tipoSeleccionado}
              options={tipos}
              onChange={(e) => setTipoSeleccionado(e.value)}
              placeholder="Seleccione un tipo"
            />
          </div>
          <div className="flex gap-2">
            <Button label="Filtrar" icon="pi pi-filter" onClick={filtrar} />
            <Button
              label="Limpiar"
              icon="pi pi-times"
              outlined
              onClick={limpiarFiltro}
            />
          </div>
        </div>
        <DataTable
          value={medicionesMostrar}
          sortField="timestamp"
          sortOrder={-1}
          emptyMessage="Sin mediciones registradas"
        >
          <Column field="fecha" header="Fecha" sortable sortField="timestamp" />
          <Column field="hora" header="Hora" />
          <Column field="medidor" header="Medidor" />
          <Column header="Valor" body={plantillaValor} />
          <Column header="Acciones" body={acciones} />
        </DataTable>
      </div>
    </div>
  );
}
