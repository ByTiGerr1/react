import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const integrantes = [
  "Daniela Ríos",
  "Marcos Ramírez",
  "Valeria Soto",
  "Juan Herrera",
];

export default function Home() {
  return (
    <div className="page">
      <Card title="Taller React + PrimeReact" className="shadow-2">
        <p className="mb-3">
          Esta es una app sencilla hecha en clase. Consume una API pública, usa
          React Router para cambiar de página y un proveedor para compartir los
          datos.
        </p>
        <h3>Integrantes</h3>
        <ul>
          {integrantes.map((nombre) => (
            <li key={nombre}>{nombre}</li>
          ))}
        </ul>
        <div className="mt-4">
          <Button
            as={Link}
            to="/implementacion"
            icon="pi pi-arrow-right"
            label="Ver datos"
          />
        </div>
      </Card>
    </div>
  );
}
