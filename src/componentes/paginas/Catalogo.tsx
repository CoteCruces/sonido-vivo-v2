
import CardCatalogo from "../moleculas/CardCatalogo";
import { productos } from "../datos/productos";

function Catalogo() {
    return (
        <div className="container mt-4">
            <h1>Productos</h1>

            <div className="row g-4 mt-2">
                {productos.map((producto) => (
                    <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3"
                        key={producto.id}
                    >
                        <CardCatalogo producto={producto} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;
