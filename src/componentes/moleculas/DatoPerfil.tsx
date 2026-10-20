interface Props {
    etiqueta: string;
    valor?: string;
}

function DatoPerfil({ etiqueta, valor }: Props) {
    return (
        <div className="col-12 col-md-6 mb-3">
            <label className="form-label fw-semibold text-dark">
                {etiqueta}
            </label>

            <div className="form-control bg-light text-dark">
                {valor || "No informado"}
            </div>
        </div>
    );
}

export default DatoPerfil;
