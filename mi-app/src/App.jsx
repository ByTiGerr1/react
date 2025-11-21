import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import RegistrarLectura from "./pages/RegistrarLectura";
import Mediciones from "./pages/Mediciones";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<RegistrarLectura />} />
          <Route path="/mediciones" element={<Mediciones />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
