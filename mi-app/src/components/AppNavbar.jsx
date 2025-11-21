import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  { label: "Inicio", icon: "pi pi-home", path: "/" },
  { label: "Registrar Lectura", icon: "pi pi-pencil", path: "/registrar" },
  { label: "Mediciones Existentes", icon: "pi pi-table", path: "/mediciones" },
];

export default function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const model = items.map((item) => ({
    ...item,
    command: () => navigate(item.path),
    className: location.pathname === item.path ? "p-menuitem-active" : "",
  }));

  const start = <span className="font-bold text-xl">Sanquinta</span>;
  const end = (
    <div className="flex align-items-center gap-2">
      <Button
        icon="pi pi-home"
        label="Ir al inicio"
        severity="info"
        onClick={() => navigate("/")}
      />
    </div>
  );

  return <Menubar model={model} start={start} end={end} />;
}
