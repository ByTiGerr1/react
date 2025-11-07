const CLAVE_ALMACENAMIENTO = 'sansanmark_entradas';

export function obtenerEntradas() {
  const textoGuardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (!textoGuardado) {
    return [];
  }
  const lista = JSON.parse(textoGuardado);
  if (Array.isArray(lista)) {
    return lista;
  }
  return [];
}

export function agregarEntrada(entrada) {
  const entradas = obtenerEntradas();
  entradas.push(entrada);
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(entradas));
  return entrada;
}