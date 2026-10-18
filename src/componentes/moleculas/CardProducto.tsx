import Boton from "../atomos/Boton";

function CardProducto(){
    return(
        <div className = "card producto" style=  {{ width: '18rem'}}>
            <img 
                src = "/img/GuitarraAcusticaFolkYamahaF310.jpg"
                className = "card-img-top"
                alt = "GuitarraAcusticaFolkYamahaF310"
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
export default CardProducto;