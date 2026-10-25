
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function BuscadorNavbar({ alBuscar }: { alBuscar?: () => void }) {
    const [texto, setTexto] = useState("");
    const navigate = useNavigate();

    const buscar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const busqueda = texto.trim();
        alBuscar?.();

        if (busqueda) {
            navigate(
                `/catalogo?buscar=${encodeURIComponent(busqueda)}`
            );
        } else {
            navigate("/catalogo");
        }
    };

    return (
        <form
            className="d-flex align-items-center gap-2 w-100"
            style={{ maxWidth: "350px" }}
            role="search"
            onSubmit={buscar}
        >
            <input
                className="form-control flex-grow-1"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                style={{ minWidth: 0 }}
            />

            <button
                type="submit"
                className="btn btn-outline-primary"
                aria-label="Buscar productos"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                </svg>
            </button>
        </form>
    );
}

export default BuscadorNavbar;
