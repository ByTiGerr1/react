import { useEffect, useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { obtenerEntradas, agregarEntrada } from '../services/servicioEntradas';
import FormularioCompra from '../components/FormularioCompra';
import TablaEntradas from '../components/TablaEntradas';

const opcionesPeliculas = [
  { label: 'Wifi Ralph', value: 'Wifi Ralph' },
  { label: 'Dragon Ball Super Broly', value: 'Dragon Ball Super Broly' },
  { label: 'Cascanueces', value: 'Cascanueces' },
  { label: 'El Grinch', value: 'El Grinch' }
];

export default function GestorEntradas() {
  const referenciaToast = useRef(null);
  const [entradas, setEntradas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  useEffect(() => {
    const guardadas = obtenerEntradas();
    setEntradas(guardadas);
  }, []);

  const guardarEntrada = (entradaNueva) => {
    agregarEntrada(entradaNueva);
    setEntradas((anteriores) => [...anteriores, entradaNueva]);
    if (referenciaToast.current) {
      referenciaToast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Entrada guardada' });
    }
  };

  const entradasFiltradas = peliculaSeleccionada
    ? entradas.filter((entrada) => entrada.pelicula === peliculaSeleccionada)
    : entradas;

  return (
    <div className="p-3 gestor-entradas">
      <Toast ref={referenciaToast} position="top-right" />
      <Toolbar left={() => <h2 className="m-0">Sansanmark</h2>} />
      <FormularioCompra alEnviar={guardarEntrada} opcionesPeliculas={opcionesPeliculas} />
      <TablaEntradas
        entradas={entradasFiltradas}
        filtroPelicula={peliculaSeleccionada}
        alCambiarFiltro={setPeliculaSeleccionada}
        opcionesPeliculas={opcionesPeliculas}
      />
    </div>
  );
}