import Boton from "../atomos/Boton";

function CardCatalogo(){
    return(
        <div className = "card catalogo" style=  {{ width: '18rem'}}>
            <img 
                src = "/img/GuitarraAcusticaFolkYamahaF310.png"
                className = "card-img-top"
                alt = "Imagen no disponible"
            />
                <div className = "card-body">
                    <h5 className = "card-title">Guitarra Acústica Folk Yamaha F310</h5>
                    <p className = "card-text">Tapa de abeto, aros y fondo de meranti.
                                               Ideal para iniciantes.
                    </p>
                    <Boton />
                </div>
        </div>
    )
}
export default CardCatalogo;