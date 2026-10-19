
interface Props {
    etiqueta: string;
    tipo?: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
    placeholder?: string;
    error?: string;
}

function CampoFormulario({
    etiqueta,
    tipo = "text",
    nombre,
    valor,
    alCambiar,
    placeholder,
    error
}: Props) {
    return (
        <div className="mb-3">
            <label htmlFor={nombre} className="form-label fw-semibold">
                {etiqueta}
            </label>

            <input
                id={nombre}
                name={nombre}
                type={tipo}
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={valor}
                onChange={(e) => alCambiar(e.target.value)}
                placeholder={placeholder}
                aria-invalid={Boolean(error)}
            />

            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
}

export default CampoFormulario;
