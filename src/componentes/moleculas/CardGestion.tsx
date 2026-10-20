import "../../Admin.css";
import BotonAdmin from "../atomos/BotonAdmin";

interface Props {
    titulo: string;
    descripcion: string;
    icono: string;
    color: "primary" | "success";
    destino?: string;
}

function CardGestion({
    titulo,
    descripcion,
    icono,
    color,
    destino
}: Props) {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4 text-dark text-start">

                <h4 className="fw-bold mb-3">
                    <i
                        className={`bi bi-${icono} text-${color} me-2`}
                        aria-hidden="true"
                    />
                    {titulo}
                </h4>

                <p className="text-muted mb-4">
                    {descripcion}
                </p>

                <BotonAdmin
                    texto={`Administrar ${titulo.includes("Productos") ? "Productos" : "Usuarios"}`}
                    color={color}
                    destino={destino}
                />

            </div>
        </div>
    );
}

export default CardGestion;
