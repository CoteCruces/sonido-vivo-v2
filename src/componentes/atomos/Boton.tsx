
import { Link } from "react-router-dom";

interface Props {
    id: number;
}

function Boton({ id }: Props) {
    return (
        <Link
            to={`/producto/${id}`}
            className="btn btn-primary"
        >
            Ver Producto
        </Link>
    );
}

export default Boton;
