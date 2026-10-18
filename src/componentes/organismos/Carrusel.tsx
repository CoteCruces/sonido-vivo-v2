function Carrusel() {
  return (
    <div 
      id="carouselExampleAutoplaying" 
      className="carousel slide mx-auto" 
      data-bs-ride="carousel"
      data-bs-interval="3000"
      style={{ 
        maxWidth: "900px", // Ajusta el ancho máximo 
        borderRadius: "30px", 
        overflow: "hidden", 
        boxShadow: "0 8px 8px rgba(0, 0, 0, 0.2)" 
      }}
    >
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img 
            src="/imgCarrusel/descuentos.jpg" 
            className="d-block w-100" 
            height="800" 
            alt="Imagen no disponible" 
            style={{ objectFit: "cover" }}
          />
          <div className="carousel-text"> 
            <strong>Aprovecha Octubre </strong><br /> 
            <strong>con descuentos de hasta un 30%</strong>
          </div>
        </div>

        <div className="carousel-item">
          <img 
            src="/imgCarrusel/guitarra ibanez.jpg" 
            className="d-block w-100" 
            height="800" 
            alt="Imagen no disponible"
            style={{ objectFit: "cover" }}
          />
          <div className="carousel-text">
            <strong>Guitarra Ibanez edición limitada 
              <br />solo por este mes
              <br />Antes: $750.000 Ahora: $450.000
            </strong>
          </div>
        </div>

        <div className="carousel-item">
          <img 
            src="/imgCarrusel/bateria.jpg" 
            className="d-block w-100" 
            height="800" 
            alt="Imagen no disponible"
            style={{ objectFit: "cover" }}
          />
          <div className="carousel-text">
            <strong>Batería Acústica Pearl <br /> Ahora: $599.000</strong>
          </div>
        </div>

        <div className="carousel-item">
          <img 
            src="/imgCarrusel/sonido vivo.jpg" 
            className="d-block w-100" 
            height="800" 
            alt="Imagen no disponible" 
            style={{ objectFit: "cover" }}
          />
        </div>

      </div>

      {/* Controles de navegación */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carrusel;