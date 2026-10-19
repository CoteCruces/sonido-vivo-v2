import CardDestacados from "../moleculas/CardDestacados";

function ProductosDestacados() {
  return (
    <div className="container mt-4">
      <br />
      <br />
      <h1>
        <strong>PRODUCTOS DESTACADOS!!</strong>
      </h1>
      <br />
      <br />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <div className="col">
          <CardDestacados />
        </div>
        <div className="col">
          <CardDestacados />
        </div>
        <div className="col">
          <CardDestacados />
        </div>
      </div>
      <br />
    </div>
  );
}

export default ProductosDestacados;