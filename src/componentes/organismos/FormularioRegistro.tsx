
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { registrarUsuario } from "../servicios/usuariosService";
import { validarRUN } from "../utilidades/validarRUN";

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

    const [errorRegistro, setErrorRegistro] = useState("");

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

        setErrorRegistro("");
    };

    const comunas = regionesYComunas.find(
        (item) => item.region === datos.region
    )?.comunas || [];

    // VALIDACIONES
    const validarFormulario = (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const nuevosErrores: ErroresRegistro = {};

        // Valida que nombres y apellidos no lleven números ni símbolos incorrectos.
        const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

        // Valida que el RUN no esté vacío y tenga un dígito verificador correcto.
        if (datos.run.trim() === "") {
            nuevosErrores.run = "El RUN es obligatorio.";
        } else if (!validarRUN(datos.run)) {
            nuevosErrores.run = "Ingrese un RUN válido.";
        }

        
        // Valida que el nombre no esté vacío, no lleve números y no supere 50 caracteres.
        if (datos.nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (!soloLetras.test(datos.nombre.trim())) {
            nuevosErrores.nombre =
                "El nombre solo puede contener letras.";
        } else if (datos.nombre.trim().length > 50) {
            nuevosErrores.nombre =
                "El nombre no puede superar 50 caracteres.";
        }

        
        // Valida que los apellidos no estén vacíos, no lleven números y no superen 100 caracteres.
        if (datos.apellidos.trim() === "") {
            nuevosErrores.apellidos =
                "Los apellidos son obligatorios.";
        } else if (!soloLetras.test(datos.apellidos.trim())) {
            nuevosErrores.apellidos =
                "Los apellidos solo pueden contener letras.";
        } else if (datos.apellidos.trim().length > 100) {
            nuevosErrores.apellidos =
                "Los apellidos no pueden superar 100 caracteres.";
        }

        // Valida que el correo tenga formato correcto y no supere 100 caracteres.
        if (datos.correo.trim() === "") {
            nuevosErrores.correo =
                "El correo electrónico es obligatorio.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())
        ) {
            nuevosErrores.correo =
                "Ingrese un correo electrónico válido.";
        } else if (datos.correo.trim().length > 100) {
            nuevosErrores.correo =
                "El correo no puede superar 100 caracteres.";
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

        // Valida que la dirección esté completa y tenga entre 5 y 300 caracteres.
        if (datos.direccion.trim() === "") {
            nuevosErrores.direccion =
                "La dirección es obligatoria.";
        } else if (datos.direccion.trim().length < 5) {
            nuevosErrores.direccion = "La dirección debe tener al menos 5 caracteres.";
        } else if (datos.direccion.trim().length > 300) {
            nuevosErrores.direccion =
                "La dirección no puede superar 300 caracteres.";
        }

        // Valida que se seleccione una región incluida en las opciones disponibles.
        if (datos.region === "") {
            nuevosErrores.region =
                "Debe seleccionar una región.";
        } else if (!regionesYComunas.some(item => item.region === datos.region)) {
            nuevosErrores.region = "Seleccione una región válida.";
        }

        // Valida que la comuna corresponda a la región seleccionada.
        if (datos.comuna === "") {
            nuevosErrores.comuna =
                "Debe seleccionar una comuna.";
        } else if (!comunas.includes(datos.comuna)) {
            nuevosErrores.comuna =
                "Seleccione una comuna válida.";
        }

        // Valida que la contraseña no esté vacía y tenga entre 4 y 10 caracteres.
        if (!datos.clave.trim()) {
            nuevosErrores.clave =
                "La contraseña es obligatoria.";
        } else if (
            datos.clave.length < 4 ||
            datos.clave.length > 10
        ) {
            nuevosErrores.clave =
                "La contraseña debe tener entre 4 y 10 caracteres.";
        }

        // Valida que la confirmación esté completa y coincida con la contraseña.
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

        
        try {
            // Registrar al usuario mediante el servicio
            registrarUsuario({
                run: datos.run,
                nombre: datos.nombre,
                apellidos: datos.apellidos,
                correo: datos.correo,
                fechaNacimiento: datos.fechaNacimiento,
                direccion: datos.direccion,
                region: datos.region,
                comuna: datos.comuna,
                clave: datos.clave
            });

            // Mostrar confirmación
            setErrorRegistro("");
            setMensaje(
                "Cuenta creada correctamente. " +
                "Ahora puedes iniciar sesión."
            );

        } catch (error) {
            // Mostrar correo o RUN duplicado
            setErrorRegistro(
                error instanceof Error
                    ? error.message
                    : "No se pudo registrar el usuario."
            );
        }

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

                
                {/* Errores al registrar la cuenta */}
                {errorRegistro && (
                    <div className="col-12">
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {errorRegistro}
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
