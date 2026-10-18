type Props = {
    tipo : string;
    nombre : string;
    valor : string; //valor actual del campo
    alCambiar: (valor: string) => void; //funcion que actualiza el valor
};

function Input({tipo, nombre, valor, alCambiar}: Props){

    return(
      <input
        type={tipo}
        name={nombre}
        className="form-control"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
      />
    );
}
export default Input;