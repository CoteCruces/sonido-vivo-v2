import { Link } from "react-router-dom";

interface Props {
    texto: string;
    color: "primary" | "success" | "warning" | "danger";
    destino?: string;
    onClick?: () => void;
}

function BotonAdmin({
    texto,
    color,
    destino,
    onClick
}: Props) {

    const clases = `btn btn-${color} fw-semibold`;

    // Botón que navega a otra página
    if (destino) {
        return (
            <Link to={destino} className={clases}>
                {texto}
            </Link>
        );
    }

    // Botón que ejecuta una acción
    return (
        <button
            type="button"
            className={clases}
            onClick={onClick}
            disabled={!onClick}
        >
            {texto}
        </button>
    );
}

export default BotonAdmin;
