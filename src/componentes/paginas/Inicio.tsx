import Carrusel from "../organismos/Carrusel";
import ProductosDestacados from "../organismos/ProductosDestacados";

function Inicio(){
    return(
        <div className = "container mt-4">
            <Carrusel />
            <ProductosDestacados/>
        </div>
    )
}
export default Inicio;