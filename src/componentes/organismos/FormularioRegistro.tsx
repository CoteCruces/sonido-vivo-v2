
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";

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

type DatosRegistro = {
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    clave: string;
    confirmarClave: string;
};

type ErroresRegistro = Partial<
    Record<keyof DatosRegistro, string>
>;

// Validación del RUN chileno
function validarRUN(run: string): boolean {
    const limpio = run
        .replace(/[.\-\s]/g, "")
        .toUpperCase();

    if (!/^[0-9]{7,8}[0-9K]$/.test(limpio)) {
        return false;
    }

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7
            ? 2
            : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    const dvCalculado =
        resultado === 11 ? "0" :
        resultado === 10 ? "K" :
        String(resultado);

    return dv === dvCalculado;
}

function FormularioRegistro() {

    const [datos, setDatos] = useState<DatosRegistro>({
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

    const [errores, setErrores] =
        useState<ErroresRegistro>({});

    const [mensaje, setMensaje] = useState("");

    // Actualizar campos y limpiar su error
    const actualizar = (
        campo: keyof DatosRegistro,
        valor: string
    ) => {
        setDatos((anteriores) => ({
            ...anteriores,
            [campo]: valor
        }));

        setErrores((anteriores) => ({
            ...anteriores,
            [campo]: ""
        }));

        setMensaje("");
    };

    const comunas = regionesYComunas.find(
        (item) => item.region === datos.region
    )?.comunas || [];

    // VALIDACIONES CON JAVASCRIPT
    const validarFormulario = (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const nuevosErrores: ErroresRegistro = {};

        // Validar RUN
        if (datos.run.trim() === "") {
            nuevosErrores.run = "El RUN es obligatorio.";
        } else if (!validarRUN(datos.run)) {
            nuevosErrores.run = "Ingrese un RUN válido.";
        }

        // Validar nombre
        if (datos.nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (datos.nombre.trim().length > 50) {
            nuevosErrores.nombre =
                "El nombre no puede superar 50 caracteres.";
        }

        // Validar apellidos
        if (datos.apellidos.trim() === "") {
            nuevosErrores.apellidos =
                "Los apellidos son obligatorios.";
        } else if (datos.apellidos.trim().length > 100) {
            nuevosErrores.apellidos =
                "Los apellidos no pueden superar 100 caracteres.";
        }

        // Validar correo
        if (datos.correo.trim() === "") {
            nuevosErrores.correo =
                "El correo electrónico es obligatorio.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)
        ) {
            nuevosErrores.correo =
                "Ingrese un correo electrónico válido.";
        } else if (datos.correo.length > 100) {
            nuevosErrores.correo =
                "El correo no puede superar 100 caracteres.";
        }

        // Validar fecha de nacimiento (opcional)
        if (datos.fechaNacimiento) {
            const fecha = new Date(
                `${datos.fechaNacimiento}T00:00:00`
            );

            const hoy = new Date();

            if (
                Number.isNaN(fecha.getTime()) ||
                fecha > hoy
            ) {
                nuevosErrores.fechaNacimiento =
                    "Ingrese una fecha de nacimiento válida.";
            }
        }

        // Validar dirección
        if (datos.direccion.trim() === "") {
            nuevosErrores.direccion =
                "La dirección es obligatoria.";
        } else if (datos.direccion.trim().length > 300) {
            nuevosErrores.direccion =
                "La dirección no puede superar 300 caracteres.";
        }

        // Validar región
        if (datos.region === "") {
            nuevosErrores.region =
                "Debe seleccionar una región.";
        }

        // Validar comuna
        if (datos.comuna === "") {
            nuevosErrores.comuna =
                "Debe seleccionar una comuna.";
        } else if (!comunas.includes(datos.comuna)) {
            nuevosErrores.comuna =
                "Seleccione una comuna válida.";
        }

        // Validar contraseña
        if (datos.clave === "") {
            nuevosErrores.clave =
                "La contraseña es obligatoria.";
        } else if (
            datos.clave.length < 4 ||
            datos.clave.length > 10
        ) {
            nuevosErrores.clave =
                "La contraseña debe tener entre 4 y 10 caracteres.";
        }

        // Confirmar contraseña
        if (datos.confirmarClave === "") {
            nuevosErrores.confirmarClave =
                "Debe confirmar su contraseña.";
        } else if (
            datos.clave !== datos.confirmarClave
        ) {
            nuevosErrores.confirmarClave =
                "Las contraseñas no coinciden.";
        }

        // Mostrar todos los errores
        setErrores(nuevosErrores);
        setMensaje("");

        // Si hay errores, no continuar
        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        // Formulario válido
        setMensaje(
            "Formulario validado correctamente. " +
            "El registro aún no está conectado a un servidor."
        );
    };

    return (
        <form onSubmit={validarFormulario} noValidate>

            <div className="row g-3">

                {/* RUN */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="RUN *"
                        nombre="run"
                        valor={datos.run}
                        alCambiar={(v) => actualizar("run", v)}
                        placeholder="12345678-9"
                        error={errores.run}
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
                        <option value="Cliente">
                            Cliente
                        </option>
                    </select>
                </div>

                {/* Nombre */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Nombre *"
                        nombre="nombre"
                        valor={datos.nombre}
                        alCambiar={(v) => actualizar("nombre", v)}
                        placeholder="Ingrese su nombre"
                        error={errores.nombre}
                    />
                </div>

                {/* Apellidos */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Apellidos *"
                        nombre="apellidos"
                        valor={datos.apellidos}
                        alCambiar={(v) => actualizar("apellidos", v)}
                        placeholder="Ingrese sus apellidos"
                        error={errores.apellidos}
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
                        error={errores.correo}
                    />
                </div>

                {/* Fecha de nacimiento */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Fecha de Nacimiento"
                        tipo="date"
                        nombre="fechaNacimiento"
                        valor={datos.fechaNacimiento}
                        alCambiar={(v) =>
                            actualizar("fechaNacimiento", v)
                        }
                        error={errores.fechaNacimiento}
                    />
                </div>

                {/* Dirección */}
                <div className="col-12">
                    <CampoFormulario
                        etiqueta="Dirección *"
                        nombre="direccion"
                        valor={datos.direccion}
                        alCambiar={(v) => actualizar("direccion", v)}
                        placeholder="Calle, número, departamento"
                        error={errores.direccion}
                    />
                </div>

                {/* Región */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Región *
                    </label>

                    <select
                        className={`form-select ${
                            errores.region ? "is-invalid" : ""
                        }`}
                        value={datos.region}
                        onChange={(e) => {
                            actualizar("region", e.target.value);
                            actualizar("comuna", "");
                        }}
                    >
                        <option value="">
                            Seleccione una región
                        </option>

                        {regionesYComunas.map((item) => (
                            <option
                                key={item.region}
                                value={item.region}
                            >
                                {item.region}
                            </option>
                        ))}
                    </select>

                    {errores.region && (
                        <div className="invalid-feedback">
                            {errores.region}
                        </div>
                    )}
                </div>

                {/* Comuna */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Comuna *
                    </label>

                    <select
                        className={`form-select ${
                            errores.comuna ? "is-invalid" : ""
                        }`}
                        value={datos.comuna}
                        onChange={(e) =>
                            actualizar("comuna", e.target.value)
                        }
                        disabled={!datos.region}
                    >
                        <option value="">
                            Seleccione una comuna
                        </option>

                        {comunas.map((comuna) => (
                            <option
                                key={comuna}
                                value={comuna}
                            >
                                {comuna}
                            </option>
                        ))}
                    </select>

                    {errores.comuna && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                        >
                            {errores.comuna}
                        </div>
                    )}
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
                        error={errores.clave}
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
                        placeholder="Repita su contraseña"
                        error={errores.confirmarClave}
                    />
                </div>

                {/* Mensaje de éxito */}
                {mensaje && (
                    <div className="col-12">
                        <div
                            className="alert alert-success"
                            role="status"
                        >
                            {mensaje}
                        </div>
                    </div>
                )}

                {/* Botón de registro */}
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 fw-bold"
                    >
                        Crear Cuenta
                    </button>
                </div>

                {/* Volver al login */}
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
