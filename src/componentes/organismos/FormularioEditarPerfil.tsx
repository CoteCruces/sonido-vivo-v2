import { useState } from "react";
import type { FormEvent } from "react";

import CampoFormulario from "../moleculas/CampoFormulario";
import {
    actualizarPerfil
} from "../servicios/usuariosService";

import type {
    DatosEditarPerfil
} from "../servicios/usuariosService";

import type { Usuario } from "../utilidades/tipos";

interface Props {
    usuario: Usuario;
    onGuardado: (usuario: Usuario) => void;
    onCancelar: () => void;
}

function FormularioEditarPerfil({
    usuario,
    onGuardado,
    onCancelar
}: Props) {

    // Cargar los datos actuales
    const [datos, setDatos] = useState<DatosEditarPerfil>({
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        fechaNacimiento: usuario.fechaNacimiento ?? "",
        direccion: usuario.direccion ?? "",
        region: usuario.region ?? "",
        comuna: usuario.comuna ?? ""
    });

    const [errores, setErrores] = useState({
        nombre: "",
        apellidos: ""
    });

    const [errorGeneral, setErrorGeneral] = useState("");

    // Actualizar los campos controlados
    const actualizar = (
        campo: keyof DatosEditarPerfil,
        valor: string
    ) => {
        setDatos(prev => ({
            ...prev,
            [campo]: valor
        }));

        if (campo === "nombre" || campo === "apellidos") {
            setErrores(prev => ({
                ...prev,
                [campo]: ""
            }));
        }

        setErrorGeneral("");
    };

    // Guardar cambios
    const guardar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores = {
            nombre: "",
            apellidos: ""
        };

        if (!datos.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        }

        if (!datos.apellidos.trim()) {
            nuevosErrores.apellidos =
                "Los apellidos son obligatorios.";
        }

        setErrores(nuevosErrores);

        if (nuevosErrores.nombre || nuevosErrores.apellidos) {
            return;
        }

        try {
            const actualizado = actualizarPerfil(
                usuario.correo,
                datos
            );

            if (!actualizado) {
                setErrorGeneral(
                    "No se encontró la cuenta del usuario."
                );
                return;
            }

            // Informar a MiCuenta que se guardaron los cambios
            onGuardado(actualizado);

        } catch {
            setErrorGeneral(
                "No se pudieron guardar los cambios."
            );
        }
    };

    return (
        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4 p-md-5 text-start text-dark">

                <h3 className="fw-bold mb-2">
                    Editar mis datos
                </h3>

                <p className="text-muted mb-4">
                    Modifica tu información personal.
                </p>

                <form onSubmit={guardar} noValidate>

                    <div className="row g-3">

                        <div className="col-md-6">
                            <CampoFormulario
                                etiqueta="Nombre *"
                                nombre="nombre"
                                valor={datos.nombre}
                                alCambiar={valor =>
                                    actualizar("nombre", valor)
                                }
                                error={errores.nombre}
                            />
                        </div>

                        <div className="col-md-6">
                            <CampoFormulario
                                etiqueta="Apellidos *"
                                nombre="apellidos"
                                valor={datos.apellidos}
                                alCambiar={valor =>
                                    actualizar("apellidos", valor)
                                }
                                error={errores.apellidos}
                            />
                        </div>

                        <div className="col-md-6">
                            <CampoFormulario
                                etiqueta="Fecha de Nacimiento"
                                nombre="fechaNacimiento"
                                tipo="date"
                                valor={datos.fechaNacimiento ?? ""}
                                alCambiar={valor =>
                                    actualizar("fechaNacimiento", valor)
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <CampoFormulario
                                etiqueta="Dirección"
                                nombre="direccion"
                                valor={datos.direccion ?? ""}
                                alCambiar={valor =>
                                    actualizar("direccion", valor)
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <CampoFormulario
                                etiqueta="Región"
                                nombre="region"
                                valor={datos.region ?? ""}
                                alCambiar={valor =>
                                    actualizar("region", valor)
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <CampoFormulario
                                etiqueta="Comuna"
                                nombre="comuna"
                                valor={datos.comuna ?? ""}
                                alCambiar={valor =>
                                    actualizar("comuna", valor)
                                }
                            />
                        </div>

                    </div>

                    {errorGeneral && (
                        <div className="alert alert-danger mt-4">
                            {errorGeneral}
                        </div>
                    )}

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
                            onClick={onCancelar}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default FormularioEditarPerfil;
