import { Link, useSearchParams } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import CardCatalogo from "../moleculas/CardCatalogo";
export default function Catalogo() {
  const { productos } = useTienda();
  const [parametros] = useSearchParams();
  const categoria = parametros.get("categoria")?.toLowerCase() || "";
  const buscar = parametros.get("buscar")?.toLowerCase() || "";
  const filtrados = productos.filter(
    (p) =>
      (!categoria || p.categoria.toLowerCase().includes(categoria)) &&
      (!buscar ||
        `${p.nombre} ${p.descripcion} ${p.categoria}`
          .toLowerCase()
          .includes(buscar)),
  );
  return (
    <main>
      <div className="container mt-4">
        <h2 className="mb-4" style={{ color: "rgb(110, 92, 75)" }}>
          Catálogo de Instrumentos
        </h2>
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"
          id="catalogo-container"
        >
          {filtrados.length ? (
            filtrados.map((p) => (
              <div className="col" key={p.id}>
                <CardCatalogo producto={p} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">
                No hay productos disponibles en esta categoría.
              </p>
              <Link to="/catalogo" className="btn btn-outline-primary btn-sm">
                Ver todo el catálogo
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </main>
  );
}
