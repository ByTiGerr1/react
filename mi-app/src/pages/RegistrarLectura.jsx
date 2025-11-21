import { useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { agregarMedicion } from "../services/medicionesService";
import { Navigate, useNavigate } from "react-router-dom";

const opcionesMedidor = Array.from({ length: 10 }, (_, indice) => {
  const valor = (indice + 1).toString().padStart(2, "0");
  return { label: valor, value: valor };
});

const opcionesTipo = [
  { label: "Kilowatts", value: "Kilowatts" },
  { label: "Watts", value: "Watts" },
  { label: "Temperatura", value: "Temperatura" },
];

const limpiarHtml = (texto) => texto.replace(/<[^>]*>?/gm, "").trim();

const formatearFechaHora = (fecha) => {
  const pad = (numero) => numero.toString().padStart(2, "0");
  const dia = pad(fecha.getDate());
  const mes = pad(fecha.getMonth() + 1);
  const anio = fecha.getFullYear();
  const hora = pad(fecha.getHours());
  const minuto = pad(fecha.getMinutes());
  return {
    fechaTexto: `${dia}-${mes}-${anio}`,
    horaTexto: `${hora}:${minuto}`,
  };
};

export default function RegistrarLectura() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    fechaHora: null,
    medidor: null,
    direccion: "",
    valor: null,
    tipo: null,
  });
  const [redirigir, setRedirigir] = useState(false);

  const actualizarCampo = (campo, valor) => {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
  };

  const validar = () => {
    const errores = [];
    if (!datos.fechaHora) errores.push("Seleccione una fecha y hora.");
    if (!datos.medidor) errores.push("Seleccione un medidor.");
    if (!limpiarHtml(datos.direccion)) errores.push("Ingrese la dirección.");
    if (!datos.valor || datos.valor <= 0 || datos.valor > 500)
      errores.push("El valor debe ser mayor a 0 y menor o igual a 500.");
    if (!datos.tipo) errores.push("Seleccione un tipo de medida.");
    return errores;
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    const errores = validar();

    if (errores.length) {
      toast.current?.show({
        severity: "warn",
        summary: "Datos inválidos",
        detail: errores.join(" "),
        life: 4000,
      });
      return;
    }

    const { fechaTexto, horaTexto } = formatearFechaHora(datos.fechaHora);
    const nuevaMedicion = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      fecha: fechaTexto,
      hora: horaTexto,
      medidor: datos.medidor,
      direccion: datos.direccion,
      valor: datos.valor,
      tipo: datos.tipo,
      timestamp: datos.fechaHora.getTime(),
    };

    agregarMedicion(nuevaMedicion);
    setRedirigir(true);
    navigate("/mediciones");
  };

  if (redirigir) {
    return <Navigate to="/mediciones" />;
  }

  return (
    <div className="page">
      <Toast ref={toast} position="top-center" />
      <form className="card form" onSubmit={manejarEnvio}>
        <h2>Registrar Lectura</h2>
        <div className="campo">
          <label htmlFor="fecha">Fecha y Hora</label>
          <Calendar
            id="fecha"
            value={datos.fechaHora}
            onChange={(e) => actualizarCampo("fechaHora", e.value)}
            showIcon
            showTime
            hourFormat="24"
            placeholder="dd-MM-yyyy HH:mm"
          />
        </div>
        <div className="campo">
          <label htmlFor="medidor">Medidor</label>
          <Dropdown
            id="medidor"
            value={datos.medidor}
            options={opcionesMedidor}
            onChange={(e) => actualizarCampo("medidor", e.value)}
            placeholder="Seleccione un medidor"
          />
        </div>
        <div className="campo">
          <label htmlFor="direccion">Dirección</label>
          <Editor
            id="direccion"
            value={datos.direccion}
            onTextChange={(e) =>
              actualizarCampo("direccion", e.htmlValue || "")
            }
            style={{ height: "150px" }}
          />
        </div>
        <div className="campo">
          <label htmlFor="valor">Valor</label>
          <InputNumber
            id="valor"
            value={datos.valor}
            onValueChange={(e) => actualizarCampo("valor", e.value)}
            min={1}
            max={500}
            useGrouping={false}
            placeholder="Ingrese valor"
          />
        </div>
        <div className="campo">
          <label>Tipo de Medida</label>
          <div className="flex gap-3 flex-wrap">
            {opcionesTipo.map((opcion) => (
              <div className="flex align-items-center gap-2" key={opcion.value}>
                <RadioButton
                  inputId={opcion.value}
                  value={opcion.value}
                  onChange={(e) => actualizarCampo("tipo", e.value)}
                  checked={datos.tipo === opcion.value}
                />
                <label htmlFor={opcion.value}>{opcion.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="acciones">
          <Button label="Guardar" icon="pi pi-save" type="submit" />
        </div>
      </form>
    </div>
  );
}
