import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import CampoFormulario from "../moleculas/CampoFormulario";
import { editarUsuarioAdmin } from "../servicios/usuariosService";
import type { Usuario } from "../utilidades/tipos";

interface Props {
    usuario: Usuario;
}

function FormularioEditarUsuario({ usuario }: Props) {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellidos, setApellidos] = useState(usuario.apellidos);
    const [rol, setRol] = useState(usuario.rol);

    const [errores, setErrores] = useState({
        nombre: "",
        apellidos: ""
    });

    const [errorGeneral, setErrorGeneral] = useState("");

    const guardar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores = {
            nombre: nombre.trim()
                ? ""
                : "El nombre es obligatorio.",

            apellidos: apellidos.trim()
                ? ""
                : "Los apellidos son obligatorios."
        };

        setErrores(nuevosErrores);
        setErrorGeneral("");

        if (nuevosErrores.nombre || nuevosErrores.apellidos) {
            return;
        }

        try {
            const actualizado = editarUsuarioAdmin(
                usuario.run,
                {
                    nombre,
                    apellidos,
                    rol
                }
            );

            if (!actualizado) {
                setErrorGeneral("No se encontró el usuario.");
                return;
            }

            navigate("/admin/usuarios");

        } catch (error) {
            setErrorGeneral(
                error instanceof Error
                    ? error.message
                    : "No se pudieron guardar los cambios."
            );
        }
    };

    return (
        <form onSubmit={guardar} noValidate>

            <div className="row g-3">

                {/* RUN: solo lectura */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        RUN
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={usuario.run}
                        disabled
                    />
                </div>

                {/* Correo: solo lectura */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Correo Electrónico
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={usuario.correo}
                        disabled
                    />
                </div>

                {/* Nombre */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Nombre *"
                        nombre="nombre"
                        valor={nombre}
                        alCambiar={(valor) => {
                            setNombre(valor);
                            setErrores(prev => ({
                                ...prev,
                                nombre: ""
                            }));
                        }}
                        error={errores.nombre}
                    />
                </div>

                {/* Apellidos */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Apellidos *"
                        nombre="apellidos"
                        valor={apellidos}
                        alCambiar={(valor) => {
                            setApellidos(valor);
                            setErrores(prev => ({
                                ...prev,
                                apellidos: ""
                            }));
                        }}
                        error={errores.apellidos}
                    />
                </div>

                {/* Rol */}
                <div className="col-md-6">
                    <label
                        htmlFor="rolUsuario"
                        className="form-label fw-semibold"
                    >
                        Rol del Usuario
                    </label>

                    <select
                        id="rolUsuario"
                        className="form-select"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="Cliente">
                            Cliente
                        </option>

                        <option value="Administrador">
                            Administrador
                        </option>
                    </select>
                </div>

            </div>

            {/* Error general */}
            {errorGeneral && (
                <div
                    className="alert alert-danger mt-4"
                    role="alert"
                >
                    {errorGeneral}
                </div>
            )}

            {/* Botones */}
            <div className="d-flex flex-wrap gap-3 mt-4">

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Guardar Cambios
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin/usuarios")}
                >
                    Cancelar
                </button>

            </div>

        </form>
    );
}

export default FormularioEditarUsuario;
