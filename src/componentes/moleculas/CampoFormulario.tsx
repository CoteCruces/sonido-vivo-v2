import Input from "../atomos/Input";

type Props = {
    etiqueta :string;
    tipo : string;
    nombre : string;
    valor: string;
    alCambiar: (valor: string) => void;
    placeholder?: string; //Se agrega para mostrar texto de ejemplo en los campos de entrada del formulario
};

function CampoFormulario({etiqueta, tipo, nombre, valor, alCambiar, placeholder}: Props){
    return(
        <div className = "mb-3">
            <label className = "form-label">
                {etiqueta}
            </label>
            <Input 
            tipo = {tipo} 
            nombre = {nombre}
            valor = {valor}
            alCambiar =  {alCambiar}
            placeholder = {placeholder}/>
        </div>
    );
}
export default CampoFormulario;