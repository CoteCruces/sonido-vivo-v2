import { useLocation } from "react-router-dom";
export default function Footer() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith("/admin");
  return (
    <footer className="text-center mt-auto">
      <div className="container">
        <small>
          &copy; 2026 Sonido Vivo -{" "}
          {admin
            ? pathname === "/admin"
              ? "Administración"
              : "Módulo de Administración"
            : "Todos los derechos reservados."}
        </small>
      </div>
    </footer>
  );
}
