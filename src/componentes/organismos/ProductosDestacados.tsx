import { useEffect, useState } from "react";
import CardCatalogo from "../moleculas/CardCatalogo";
import { obtenerProductosApi } from "../servicios/productosApi";
import type { Producto } from "../utilidades/tipos";

function ProductosDestacados() {
    const [destacados, setDestacados] = useState<Producto[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let activo = true;

        obtenerProductosApi()
            .then((productos) => {
                if (!activo) return;

                const disponibles = productos.filter(
                    (producto) => producto.stock > 0
                );

                const idsDestacados = [2, 6, 15, 13, 20, 30, 40, 35];

                const seleccionados = disponibles.filter(
                    (producto) => idsDestacados.includes(producto.id)
                );

                setDestacados(
                    seleccionados.length > 0
                        ? seleccionados
                        : disponibles.slice(0, 8)
                );
            })
            .catch(() => {
                if (activo) {
                    setError("No se pudieron cargar los productos destacados.");
                }
            });

        return () => {
            activo = false;
        };
    }, []);

    return (
        <section className="my-5">
            <h2 className="mb-4">Productos destacados</h2>

            {error && (
                <p className="text-danger">{error}</p>
            )}

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
