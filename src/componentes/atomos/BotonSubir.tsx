import Boton from "./Boton";
export default function BotonSubir() {
  return (
    <Boton
      variante="outline-secondary"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Volver arriba ↑
    </Boton>
  );
}
