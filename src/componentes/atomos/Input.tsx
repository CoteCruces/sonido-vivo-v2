type Props = {
    tipo : string;
    nombre : string;
    valor : string; //valor actual del campo
    alCambiar: (valor: string) => void; //funcion que actualiza el valor
    placeholder?: string;
};

function Input({tipo, nombre, valor, alCambiar, placeholder}: Props){

    return(
      <input
        type={tipo}
        name={nombre}
        className="form-control"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        placeholder={placeholder}
      />
    );
}
export default Input;