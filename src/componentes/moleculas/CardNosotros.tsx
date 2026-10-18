import { Link } from "react-router-dom";
export default function CardNosotros() {
  return (
    <>
      <div className="row">
        <div
          className="col"
          style={{ fontStyle: "oblique", color: "rgb(110, 92, 75)" }}
        >
          <div className="card">
            <img
              src="/imagenes/nosotros/taller.jpg"
              className="card-img-top"
              alt="Taller Sonido Vivo"
            />
            <div className="card-body">
              <h2 className="card-title">
                <u>Nuestra Historia</u>
              </h2>
              <p>
                El compás de nuestra historia comenzó en 2015, en un pequeño
                taller subterráneo, impulsado por la pasión de un músico
                aficionado. Lo que empezó como un modesto servicio de reparación
                de guitarras se transformó, con el paso de los años, en la
                tienda de instrumentos musicales más confiable de la Región de
                Valparaíso.
              </p>
              <br />
              <h5>El Primer Acorde: Una Pasión Compartida</h5>
              <p>
                Nuestra trayectoria no se mide en los 11 años que tenemos, sino
                en las canciones que hemos ayudado a crear. A finales de los
                ochenta, encontrar un instrumento de calidad era un desafío para
                los artistas locales. Con más entusiasmo que capital, decidimos
                abrir nuestras puertas para ofrecer no solo herramientas, sino
                asesoría real de músico a músico. Cada guitarra, teclado y
                percusión que vendíamos pasaba por nuestras manos para asegurar
                que su afinación y alma estuvieran intactas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ color: "rgb(110, 92, 75)" }} />
      <div className="row">
        <div
          className="col"
          style={{ fontStyle: "oblique", color: "rgb(110, 92, 75)" }}
        >
          <div className="card">
            <img
              src="/imagenes/nosotros/nosotros.jfif"
              className="card-img-top"
              alt="Sonido Vivo"
            />
            <div className="card-body">
              <h5 className="card-title">Nuestro Compromiso Hoy</h5>
              <p>
                A lo largo de nuestra historia, hemos visto pasar por nuestro
                mostrador a jóvenes que compraban su primera uña de guitarra y
                que hoy regresan como profesionales consagrados. Nos enorgullece
                ser el puente entre tu talento y el sonido perfecto. Hoy,
                seguimos innovando para llevarte los mejores instrumentos y
                audio del mundo, respaldados por la misma garantía y calidez
                humana de nuestro primer día.
              </p>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-primary"
              >
                Subir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
