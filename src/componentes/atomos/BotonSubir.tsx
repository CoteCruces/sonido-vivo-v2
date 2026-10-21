function BotonSubir() {
  const irArriba = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Hace que la transición sea suave
    });
  };

  return (
    <button className="btn btn-primary" onClick={irArriba}>
      Subir
    </button>
  );
}

export default BotonSubir;