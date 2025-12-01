import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate, useLocation, Link } from "react-router-dom";

const items = [
  { label: "Inicio", icon: "pi pi-home", path: "/" },
  { label: "Implementación", icon: "pi pi-code", path: "/implementacion" },
];

export default function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const model = items.map((item) => ({
    ...item,
    template: (_menuItem, options) => (
      <Link
        className={`${options.className} ${
          location.pathname === item.path ? "active" : ""
        }`}
        to={item.path}
      >
        <span className={`p-menuitem-icon ${item.icon}`} />
        <span className="p-menuitem-text">{item.label}</span>
      </Link>
    ),
  }));

  const start = <span className="font-bold text-xl">API Explorer</span>;
  const end = (
    <div className="flex align-items-center gap-2">
      <Button
        icon="pi pi-home"
        label="Volver al inicio"
        severity="info"
        onClick={() => navigate("/")}
      />
    </div>
  );

  return <Menubar model={model} start={start} end={end} />;
}
