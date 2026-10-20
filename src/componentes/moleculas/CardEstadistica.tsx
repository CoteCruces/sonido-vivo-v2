import "../../Admin.css";

interface Props {
    titulo: string;
    cantidad: string;
    icono: string;
    color: "primary" | "success" | "warning";
}

function CardEstadistica({
    titulo,
    cantidad,
    icono,
    color
}: Props) {
    return (
        <div className="card border-0 shadow-sm bg-light h-100">
            <div className="card-body d-flex align-items-center gap-3 text-start">

                <i
                    className={`bi bi-${icono} display-5 text-${color}`}
                    aria-hidden="true"
                />

                <div>
                    <h5 className="text-muted mb-1">
                        {titulo}
                    </h5>

                    <h3 className="fw-bold text-dark mb-0">
                        {cantidad}
                    </h3>
                </div>

            </div>
        </div>
    );
}

export default CardEstadistica;
