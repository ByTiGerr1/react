import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Implementacion from "./pages/Implementacion";
import { ApiDataProvider } from "./providers/ApiDataProvider";

function App() {
  return (
    <BrowserRouter>
      <ApiDataProvider>
        <div className="app-shell">
          <AppNavbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/implementacion" element={<Implementacion />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </ApiDataProvider>
    </BrowserRouter>
  );
}

export default App;
