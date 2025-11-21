const CLAVE = "mediciones-electricas";

const leer = () => {
  const guardadas = localStorage.getItem(CLAVE);
  if (!guardadas) return [];
  try {
    const parsed = JSON.parse(guardadas);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const obtenerMediciones = () => leer();

export const agregarMedicion = (medicion) => {
  const actuales = leer();
  const actualizadas = [...actuales, medicion];
  localStorage.setItem(CLAVE, JSON.stringify(actualizadas));
  return actualizadas;
};

export const eliminarMedicion = (id) => {
  const filtradas = leer().filter((medicion) => medicion.id !== id);
  localStorage.setItem(CLAVE, JSON.stringify(filtradas));
  return filtradas;
};
