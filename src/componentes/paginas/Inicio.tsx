import { useEffect, useState } from "react";
import { useTienda } from "../../contextos/TiendaContexto";
import CardCatalogo from "../moleculas/CardCatalogo";
const diapositivas = [
  {
    imagen: "/imagenes/carrusel/descuentos.jpg",
    lineas: ["Aprovecha Septiembre", "con descuentos de hasta un 30%"],
  },
  {
    imagen: "/imagenes/carrusel/guitarra ibanez.jpg",
    lineas: [
      "Guitarra Ibanez edición limitada",
      "solo por este mes",
      "Antes: $750.000 Ahora: $450.000",
    ],
  },
  {
    imagen: "/imagenes/carrusel/bateria.jpg",
    lineas: ["Batería Acústica Pearl", "Ahora: $599.000"],
  },
  { imagen: "/imagenes/carrusel/sonido vivo.jpg", lineas: [] },
];
export default function Inicio() {
  const [indice, setIndice] = useState(0);
  const { productos } = useTienda();
  useEffect(() => {
    const reloj = window.setInterval(
      () => setIndice((i) => (i + 1) % diapositivas.length),
      3000,
    );
    return () => window.clearInterval(reloj);
  }, []);
  const destacados = [1, 12, 14, 19, 26, 32]
    .map((id) => productos.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  return (
    <main>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide w-76 mx-auto"
        style={{
          borderRadius: 30,
          overflow: "hidden",
          boxShadow: "0 8px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div className="carousel-inner">
          {diapositivas.map((d, i) => (
            <div
              className={`carousel-item ${i === indice ? "active" : ""}`}
              key={d.imagen}
            >
              <img
                src={d.imagen}
                className="d-block w-100"
                alt="Imagen no disponible"
              />
              {d.lineas.length > 0 && (
                <div className="carousel-text">
                  {d.lineas.map((linea, j) => (
                    <span key={linea}>
                      <strong>{linea}</strong>
                      {j < d.lineas.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={() =>
            setIndice(
              (i) => (i + diapositivas.length - 1) % diapositivas.length,
            )
          }
          aria-label="Anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={() => setIndice((i) => (i + 1) % diapositivas.length)}
          aria-label="Siguiente"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <br />
      <h1>
        <strong>PRODUCTOS DESTACADOS!!</strong>
      </h1>
      <br />
      <br />
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {destacados.map((p) => (
            <div className="col" key={p.id}>
              <CardCatalogo producto={p} destacado />
            </div>
          ))}
        </div>
      </div>
      <br />
    </main>
  );
}
