interface Props {
    alAgregar: () => void;
    sinStock: boolean;
}

function BotonAgregarCarrito({
    alAgregar,
    sinStock
}: Props) {
    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={alAgregar}
            disabled={sinStock}
        >
            {sinStock ? "Sin stock" : "Agregar al carrito"}
        </button>
    );
}

export default BotonAgregarCarrito;
