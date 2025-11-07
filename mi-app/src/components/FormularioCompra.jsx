import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

const opcionesDia = [
  { label: 'Lunes', value: 'Lunes' },
  { label: 'Martes', value: 'Martes' },
  { label: 'Miércoles', value: 'Miércoles' },
  { label: 'Jueves', value: 'Jueves' },
  { label: 'Viernes', value: 'Viernes' }
];

const opcionesPago = [
  { label: 'Efectivo', value: 'Efectivo' },
  { label: 'Tarjeta', value: 'Tarjeta' }
];

export default function FormularioCompra({ alEnviar, opcionesPeliculas }) {
  const [valoresFormulario, setValoresFormulario] = useState({
    dia: null,
    tipoPago: null,
    cantidad: 1,
    ciudad: '',
    pelicula: null
  });
  const [mensajes, setMensajes] = useState([]);

  const cambiarValor = (campo, valor) => {
    setValoresFormulario({ ...valoresFormulario, [campo]: valor });
  };

  const revisarErrores = () => {
    const listaErrores = [];
    if (!valoresFormulario.dia) {
      listaErrores.push({ severity: 'error', detail: 'Seleccione un día.' });
    }
    if (!valoresFormulario.tipoPago) {
      listaErrores.push({ severity: 'error', detail: 'Seleccione un tipo de pago.' });
    }
    if (!valoresFormulario.cantidad || valoresFormulario.cantidad < 1) {
      listaErrores.push({ severity: 'error', detail: 'Ingrese una cantidad válida.' });
    }
    if (!valoresFormulario.ciudad.trim()) {
      listaErrores.push({ severity: 'error', detail: 'Ingrese la ciudad.' });
    }
    if (!valoresFormulario.pelicula) {
      listaErrores.push({ severity: 'error', detail: 'Seleccione una película.' });
    }
    return listaErrores;
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const erroresDetectados = revisarErrores();
    setMensajes(erroresDetectados);

    if (erroresDetectados.length > 0) {
      return;
    }

    alEnviar({ ...valoresFormulario });
    setValoresFormulario({ dia: null, tipoPago: null, cantidad: 1, ciudad: '', pelicula: null });
    setMensajes([]);
  };

  return (
    <form
      onSubmit={manejarEnvio}
      className="card"
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <h3>Comprar Entrada</h3>
      <Messages value={mensajes} />
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="dia">Día</label>
          <Dropdown
            id="dia"
            value={valoresFormulario.dia}
            options={opcionesDia}
            onChange={(evento) => cambiarValor('dia', evento.value)}
            placeholder="Seleccione el día"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Tipo de Pago</label>
          <SelectButton
            value={valoresFormulario.tipoPago}
            options={opcionesPago}
            onChange={(evento) => cambiarValor('tipoPago', evento.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="cantidad">Cantidad de Entradas</label>
          <InputNumber
            id="cantidad"
            value={valoresFormulario.cantidad}
            onValueChange={(evento) => cambiarValor('cantidad', evento.value)}
            min={1}
            showButtons
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="ciudad">Ciudad</label>
          <InputText
            id="ciudad"
            value={valoresFormulario.ciudad}
            onChange={(evento) => cambiarValor('ciudad', evento.target.value)}
            placeholder="Ingrese la ciudad"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="pelicula">Película</label>
          <ListBox
            id="pelicula"
            value={valoresFormulario.pelicula}
            options={opcionesPeliculas}
            onChange={(evento) => cambiarValor('pelicula', evento.value)}
            optionLabel="label"
            optionValue="value"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" label="Comprar" icon="pi pi-check" />
      </div>
    </form>
  );
}