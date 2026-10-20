
interface Props {
    accion: "Editar" | "Eliminar";
    onClick?: () => void;
    deshabilitado?: boolean;
}

function BotonAccionProducto({
    accion,
    onClick,
    deshabilitado = true
}: Props) {

    const color = accion === "Editar"
        ? "btn-warning"
        : "btn-danger";

    return (
        <button
            type="button"
            className={`btn ${color} btn-sm`}
            onClick={onClick}
            disabled={deshabilitado}
        >
            {accion}
        </button>
    );
}

export default BotonAccionProducto;
