
import { Link } from "react-router-dom";

interface Props {
    id: number;
}

function BotonLeerMas({ id }: Props) {
    return (
        <Link
            to={`/noticias/${id}`}
            className="btn btn-primary"
        >
            Leer Más
        </Link>
    );
}

export default BotonLeerMas;
