
import CardCatalogo from "../moleculas/CardCatalogo";
import { obtenerProductos } from "../servicios/productosService";

function ProductosDestacados() {

    // Seleccionar cuatro productos destacados
    const idsDestacados = [2, 6, 15, 13, 20, 30, 40, 35];

    const destacados = obtenerProductos().filter(
        (producto) =>
            idsDestacados.includes(producto.id) &&
            producto.stock > 0
    );

    return (
        <section className="my-5">

            <h2 className="mb-4">
                Productos destacados
            </h2>

            <div className="row g-4">

                {destacados.map((producto) => (
                    <div
                        key={producto.id}
                        className="col-12 col-md-6 col-xl-3 d-flex justify-content-center"
                    >
                        <CardCatalogo producto={producto} />
                    </div>
                ))}

            </div>

        </section>
    );
}

export default ProductosDestacados;
