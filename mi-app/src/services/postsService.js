const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function obtenerPublicaciones() {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las publicaciones");
  }

  const data = await respuesta.json();
  return data.slice(0, 15);
}
