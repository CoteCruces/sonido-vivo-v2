
import { useEffect, useState } from "react";

const diapositivas = [
  {
    imagen: "/imgCarrusel/descuentos.jpg",
    lineas: ["Aprovecha Octubre", "con descuentos de hasta un 30%"],
  },
  {
    imagen: "/imgCarrusel/guitarra ibanez.jpg",
    lineas: [
      "Guitarra Ibanez edición limitada",
      "solo por este mes",
      "Antes: $750.000 Ahora: $450.000",
    ],
  },
  {
    imagen: "/imgCarrusel/bateria.jpg",
    lineas: ["Batería Acústica Pearl", "Ahora: $599.000"],
  },
  { 
    imagen: "/imgCarrusel/sonido vivo.jpg", 
    lineas: [] 
  },
];

function Carrusel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((actual) =>
        (actual + 1) % diapositivas.length
      );
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  const siguiente = () => {
    setIndice((actual) =>
      (actual + 1) % diapositivas.length
    );
  };

  const anterior = () => {
    setIndice((actual) =>
      (actual - 1 + diapositivas.length) %
      diapositivas.length
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1500px",
        height: "500px",
        margin: "-25px auto",
        borderRadius: "30px",
        overflow: "hidden",
        boxShadow: "0 8px 8px rgba(0,0,0,0.2)",
      }}
    >
      {diapositivas.map((diapositiva, i) => (
        <div
          key={i}
          aria-hidden={indice !== i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: indice === i ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            zIndex: indice === i ? 1 : 0,
          }}
        >
          <img
            src={diapositiva.imagen}
            alt={`Diapositiva ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {diapositiva.lineas.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "25%",
                left: "10%",
                width: "80%",
                padding: "2rem",
                backgroundColor: "rgba(44,62,80,0.8)",
                color: "rgb(221,235,222)",
                textAlign: "center",
                fontSize: "clamp(16px, 2.5vw, 30px)",
                borderRadius: "8px",
              }}
            >
              {diapositiva.lineas.map((linea, j) => (
                <div key={j}>
                  <strong>{linea}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={anterior}
        aria-label="Anterior"
        style={{
          position: "absolute",
          left: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          background: "rgba(0,0,0,0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          fontSize: "36px",
          width: "45px",
          height: "45px",
          lineHeight: "1",
          cursor: "pointer",
        }}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={siguiente}
        aria-label="Siguiente"
        style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          background: "rgba(0,0,0,0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          fontSize: "36px",
          width: "45px",
          height: "45px",
          lineHeight: "1",
          cursor: "pointer",
        }}
      >
        ›
      </button>
    </div>
  );
}

export default Carrusel;
