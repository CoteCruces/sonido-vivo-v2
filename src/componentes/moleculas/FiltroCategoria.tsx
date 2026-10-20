interface Props {
    categorias: string[];
    valor: string;
    alCambiar: (categoria: string) => void;
}

function FiltroCategoria({
    categorias,
    valor,
    alCambiar
}: Props) {
    return (
        <div>
            <label
                htmlFor="filtroCategoria"
                className="form-label fw-semibold"
            >
                Filtrar por categoría
            </label>

            <select
                id="filtroCategoria"
                className="form-select"
                value={valor}
                onChange={(e) => alCambiar(e.target.value)}
            >
                <option value="">Todas las categorías</option>

                {categorias.map((categoria) => (
                    <option
                        key={categoria}
                        value={categoria}
                    >
                        {categoria}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FiltroCategoria;
