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
        apellidos: "",
        fechaNacimiento: "",
        direccion: "",
        region: "",
        comuna: ""
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

        setErrores(prev => ({
            ...prev,
            [campo]: ""
        }));

        setErrorGeneral("");
    };

    // Guardar cambios
    const guardar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Valida que el nombre y los apellidos no lleven números ni símbolos incorrectos.
        const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

        const soloUbicacion = /^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u;

        const nuevosErrores = {
            nombre: "",
            apellidos: "",
            fechaNacimiento: "",
            direccion: "",
            region: "",
            comuna: ""
        };
 
        // Valida que el nombre no esté vacío, no lleve números y tenga máximo 50 caracteres.
        if (!datos.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (!soloLetras.test(datos.nombre.trim())) {
            nuevosErrores.nombre = "El nombre solo puede contener letras.";
        } else if (datos.nombre.trim().length > 50) {
            nuevosErrores.nombre = "El nombre no puede superar 50 caracteres.";
        }

        // Valida que los apellidos no estén vacíos, no lleven números y tengan máximo 100 caracteres.
        if (!datos.apellidos.trim()) {
            nuevosErrores.apellidos = "Los apellidos son obligatorios.";
        } else if (!soloLetras.test(datos.apellidos.trim())) {
            nuevosErrores.apellidos = "Los apellidos solo pueden contener letras.";
        } else if (datos.apellidos.trim().length > 100) {
            nuevosErrores.apellidos = "Los apellidos no pueden superar 100 caracteres.";
        }

        // Valida que la fecha de nacimiento exista en el calendario y no sea futura.
        if (datos.fechaNacimiento) {
            const texto = datos.fechaNacimiento;
            const [anio, mes, dia] = texto.split("-").map(Number);
            const fecha = new Date(anio, mes - 1, dia);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            const fechaValida =
                /^\d{4}-\d{2}-\d{2}$/.test(texto) &&
                anio >= 1900 &&
                fecha.getFullYear() === anio &&
                fecha.getMonth() === mes - 1 &&
                fecha.getDate() === dia;

            if (!fechaValida) {
                nuevosErrores.fechaNacimiento =
                    "Ingrese una fecha de nacimiento válida (desde 1900).";
            } else if (fecha > hoy) {
                nuevosErrores.fechaNacimiento =
                    "La fecha de nacimiento no puede ser futura.";
            }
        }

        // Valida que una dirección opcional tenga entre 5 y 300 caracteres.
        const direccion = (datos.direccion ?? "").trim();
        if (direccion && direccion.length < 5) {
            nuevosErrores.direccion = "La dirección debe tener al menos 5 caracteres.";
        } else if (direccion.length > 300) {
            nuevosErrores.direccion = "La dirección no puede superar 300 caracteres.";
        }

        // Valida que la región opcional no lleve números ni símbolos incorrectos.
        const region = (datos.region ?? "").trim();
        if (region && !soloUbicacion.test(region)) {
            nuevosErrores.region = "La región solo puede contener letras.";
        } else if (region.length > 100) {
            nuevosErrores.region = "La región no puede superar 100 caracteres.";
        }

        // Valida que la comuna opcional no lleve números ni símbolos incorrectos.
        const comuna = (datos.comuna ?? "").trim();
        if (comuna && !soloUbicacion.test(comuna)) {
            nuevosErrores.comuna = "La comuna solo puede contener letras.";
        } else if (comuna.length > 100) {
            nuevosErrores.comuna = "La comuna no puede superar 100 caracteres.";
        }

        setErrores(nuevosErrores);
        setErrorGeneral("");

        // Impide guardar el perfil mientras exista una validación pendiente.
        if (Object.values(nuevosErrores).some(error => error !== "")) {
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
                                error={errores.fechaNacimiento}
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
                                error={errores.direccion}
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
                                error={errores.region}
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
                                error={errores.comuna}
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
