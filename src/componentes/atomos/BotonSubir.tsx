
function BotonSubir() {

    const subir = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={subir}
        >
            ↑ Subir
        </button>
    );
}

export default BotonSubir;
