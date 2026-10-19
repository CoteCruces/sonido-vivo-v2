
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";

// Regiones y comunas
const regionesYComunas = [
    {
        region: "Valparaíso",
        comunas: [
            "Viña del Mar",
            "Valparaíso",
            "Quilpué",
            "Villa Alemana",
            "Concón"
        ]
    },
    {
        region: "Región Metropolitana",
        comunas: [
            "Santiago",
            "Providencia",
            "Las Condes",
            "Ñuñoa",
            "Maipú",
            "La Florida"
        ]
    },
    {
        region: "Biobío",
        comunas: [
            "Concepción",
            "Talcahuano",
            "San Pedro de la Paz",
            "Chillán"
        ]
    }
];

// Validación de RUN chileno
function validarRUN(run: string) {
    const limpio = run.trim().toUpperCase();

    if (!/^[0-9]{7,8}[0-9K]$/.test(limpio)) {
        return false;
    }

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    const dvCalculado =
        resultado === 11 ? "0" :
        resultado === 10 ? "K" :
        String(resultado);

    return dv === dvCalculado;
}

function FormularioRegistro() {

    const [datos, setDatos] = useState({
        run: "",
        nombre: "",
        apellidos: "",
        correo: "",
        fechaNacimiento: "",
        direccion: "",
        region: "",
        comuna: "",
        clave: "",
        confirmarClave: ""
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Actualizar los campos
    const actualizar = (
        campo: keyof typeof datos,
        valor: string
    ) => {
        setDatos((anteriores) => ({
            ...anteriores,
            [campo]: valor
        }));
    };

    // Obtener comunas según la región
    const comunas = regionesYComunas.find(
        (item) => item.region === datos.region
    )?.comunas || [];

    const manejarRegistro = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setMensaje("");

        if (!validarRUN(datos.run)) {
            setError("Ingrese un RUN válido, sin puntos ni guion.");
            return;
        }

        if (!datos.nombre.trim() || datos.nombre.length > 50) {
            setError("Ingrese un nombre válido (máximo 50 caracteres).");
            return;
        }

        if (!datos.apellidos.trim() || datos.apellidos.length > 100) {
            setError("Ingrese apellidos válidos (máximo 100 caracteres).");
            return;
        }

        if (
            datos.correo.length > 100 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)
        ) {
            setError("Ingrese un correo electrónico válido.");
            return;
        }

        if (!datos.direccion.trim() || datos.direccion.length > 300) {
            setError("Ingrese una dirección válida.");
            return;
        }

        if (!datos.region || !comunas.includes(datos.comuna)) {
            setError("Seleccione una región y comuna.");
            return;
        }

        if (datos.clave.length < 4 || datos.clave.length > 10) {
            setError("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        if (datos.clave !== datos.confirmarClave) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Aún no guarda usuarios reales
        setMensaje(
            "Datos validados correctamente. El registro aún no está conectado a un sistema de usuarios."
        );
    };

    return (
        <form onSubmit={manejarRegistro} noValidate>

            <div className="row g-3">

                {/* RUN */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="RUN *"
                        tipo="text"
                        nombre="run"
                        valor={datos.run}
                        alCambiar={(v) => actualizar("run", v)}
                        placeholder="12345678K"
                    />
                </div>

                {/* Tipo de usuario */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Tipo de Usuario *
                    </label>

                    <select
                        className="form-select"
                        value="Cliente"
                        disabled
                    >
                        <option value="Cliente">Cliente</option>
                    </select>
                </div>

                {/* Nombre */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Nombre *"
                        tipo="text"
                        nombre="nombre"
                        valor={datos.nombre}
                        alCambiar={(v) => actualizar("nombre", v)}
                        placeholder="Tu nombre"
                    />
                </div>

                {/* Apellidos */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Apellidos *"
                        tipo="text"
                        nombre="apellidos"
                        valor={datos.apellidos}
                        alCambiar={(v) => actualizar("apellidos", v)}
                        placeholder="Tus apellidos"
                    />
                </div>

                {/* Correo */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Correo Electrónico *"
                        tipo="email"
                        nombre="correo"
                        valor={datos.correo}
                        alCambiar={(v) => actualizar("correo", v)}
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                {/* Fecha de nacimiento */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Fecha de Nacimiento"
                        tipo="date"
                        nombre="fechaNacimiento"
                        valor={datos.fechaNacimiento}
                        alCambiar={(v) => actualizar("fechaNacimiento", v)}
                    />
                </div>

                {/* Dirección */}
                <div className="col-12">
                    <CampoFormulario
                        etiqueta="Dirección *"
                        tipo="text"
                        nombre="direccion"
                        valor={datos.direccion}
                        alCambiar={(v) => actualizar("direccion", v)}
                        placeholder="Calle, número, departamento"
                    />
                </div>

                {/* Región */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Región *
                    </label>

                    <select
                        className="form-select"
                        value={datos.region}
                        onChange={(e) => {
                            actualizar("region", e.target.value);
                            actualizar("comuna", "");
                        }}
                    >
                        <option value="">Selecciona una región</option>

                        {regionesYComunas.map((item) => (
                            <option
                                key={item.region}
                                value={item.region}
                            >
                                {item.region}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Comuna */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Comuna *
                    </label>

                    <select
                        className="form-select"
                        value={datos.comuna}
                        onChange={(e) =>
                            actualizar("comuna", e.target.value)
                        }
                        disabled={!datos.region}
                    >
                        <option value="">
                            Selecciona una comuna
                        </option>

                        {comunas.map((comuna) => (
                            <option key={comuna} value={comuna}>
                                {comuna}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Contraseña */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Contraseña *"
                        tipo="password"
                        nombre="clave"
                        valor={datos.clave}
                        alCambiar={(v) => actualizar("clave", v)}
                        placeholder="Entre 4 y 10 caracteres"
                    />
                </div>

                {/* Confirmar contraseña */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Confirmar Contraseña *"
                        tipo="password"
                        nombre="confirmarClave"
                        valor={datos.confirmarClave}
                        alCambiar={(v) =>
                            actualizar("confirmarClave", v)
                        }
                        placeholder="Repite tu contraseña"
                    />
                </div>

                {/* Mensajes de validación */}
                {error && (
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                )}

                {mensaje && (
                    <div className="col-12">
                        <div className="alert alert-info" role="status">
                            {mensaje}
                        </div>
                    </div>
                )}

                {/* Botón */}
                <div className="col-12 mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 fw-bold"
                    >
                        Crear Cuenta
                    </button>
                </div>

                {/* Ir al Login */}
                <div className="col-12 text-center">
                    <small>
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="fw-bold">
                            Inicia Sesión
                        </Link>
                    </small>
                </div>

            </div>
        </form>
    );
}

export default FormularioRegistro;
