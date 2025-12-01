import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { obtenerPublicaciones } from "../services/postsService";

const ApiDataContext = createContext();

export function ApiDataProvider({ children }) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  const cargarPublicaciones = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await obtenerPublicaciones();
      setPublicaciones(data);
      setUltimaActualizacion(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPublicaciones();
  }, [cargarPublicaciones]);

  const value = useMemo(
    () => ({
      publicaciones,
      cargando,
      error,
      recargar: cargarPublicaciones,
      ultimaActualizacion,
    }),
    [cargarPublicaciones, cargando, error, publicaciones, ultimaActualizacion]
  );

  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
}

export function useApiData() {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error("useApiData debe usarse dentro de ApiDataProvider");
  }
  return context;
}
