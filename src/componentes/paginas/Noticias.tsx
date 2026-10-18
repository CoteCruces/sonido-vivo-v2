import { noticias } from "../../datos/noticias";
import CardNoticias from "../moleculas/CardNoticias";
export default function Noticias() {
  return (
    <main>
      <div className="container mt-4">
        {noticias.map((n, i) => (
          <div key={n.id}>
            <CardNoticias noticia={n} />
            {i < noticias.length - 1 && (
              <hr style={{ color: "rgb(110, 92, 75)" }} />
            )}
          </div>
        ))}
      </div>
      <br />
    </main>
  );
}
