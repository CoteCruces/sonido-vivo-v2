import FormularioContacto from "../organismos/FormularioContacto";

function Contactanos(){
    return(
        //Contenedor principal con margen superior
        <div className = "container mt-5">
            <div className = "row justify-content-center">
                <div className = "col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className = "mb-4">Formulario de Contacto</h2>
                        <FormularioContacto />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contactanos;