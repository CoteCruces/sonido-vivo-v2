
import { Link } from "react-router-dom";

interface Props {
    texto: string;
    color: "primary" | "success" | "warning" | "danger";
    destino?: string;
}

function BotonAdmin({ texto, color, destino }: Props) {
    const clases = `btn btn-${color} fw-semibold`;

    if (destino) {
        return (
            <Link to={destino} className={clases}>
                {texto}
            </Link>
        );
    }

    return (
        <button type="button" className={clases} disabled>
            {texto}
        </button>
    );
}

export default BotonAdmin;
