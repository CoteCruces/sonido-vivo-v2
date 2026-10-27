import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import CampoFormulario from "../moleculas/CampoFormulario";
import { crearUsuarioAdmin } from "../servicios/usuariosService";
import { validarRUN } from "../utilidades/validarRUN";

type Rol = "Cliente" | "Administrador";

type DatosFormulario = {
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    clave: string;
    confirmarClave: string;
    rol: Rol;
};

type Errores = Partial<
    Record<keyof DatosFormulario, string>
>;

function FormularioNuevoUsuario() {

    const navigate = useNavigate();

    const [datos, setDatos] = useState<DatosFormulario>({
        run: "",
        nombre: "",
        apellidos: "",
        correo: "",
        clave: "",
        confirmarClave: "",
        rol: "Cliente"
    });

    const [errores, setErrores] = useState<Errores>({});
    const [errorGeneral, setErrorGeneral] = useState("");

    // Actualizar los campos del formulario
    const actualizar = (
        campo: Exclude<keyof DatosFormulario, "rol">,
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

    // Validar y guardar el nuevo usuario
    const guardar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores: Errores = {};

        // Valida que el nombre y los apellidos no lleven números ni símbolos incorrectos.
        const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

        // Valida que el RUN esté completo y tenga un dígito verificador correcto.
        if (!datos.run.trim()) {
            nuevosErrores.run = "El RUN es obligatorio.";
        } else if (!validarRUN(datos.run)) {
            nuevosErrores.run = "Ingrese un RUN válido.";
        }

        
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


        // Valida que el correo sea obligatorio, tenga formato correcto y máximo 100 caracteres.
        if (!datos.correo.trim()) {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())
        ) {
            nuevosErrores.correo = "Ingrese un correo válido.";
        } else if (datos.correo.trim().length > 100) {
            nuevosErrores.correo = "El correo no puede superar 100 caracteres.";
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

        // Valida que la confirmación de contraseña esté completa y coincida.
        if (!datos.confirmarClave) {
            nuevosErrores.confirmarClave = "Debe confirmar su contraseña.";
        } else if (datos.clave !== datos.confirmarClave) {
            nuevosErrores.confirmarClave = "Las contraseñas no coinciden.";
        }

        // Valida que el rol sea Cliente o Administrador.
        if (datos.rol !== "Cliente" && datos.rol !== "Administrador") {
            nuevosErrores.rol = "Seleccione un rol válido.";
        }

        setErrores(nuevosErrores);

        // Detener si existen errores
        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        try {
            crearUsuarioAdmin({
                run: datos.run.trim(),
                nombre: datos.nombre.trim(),
                apellidos: datos.apellidos.trim(),
                correo: datos.correo.trim(),
                clave: datos.clave,
                rol: datos.rol
            });

            // Volver al mantenedor
            navigate("/admin/usuarios");

        } catch (error) {
            setErrorGeneral(
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el usuario."
            );
        }
    };

    return (
        <form onSubmit={guardar} noValidate>

            <div className="row g-3">

                {/* RUN */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="RUN *"
                        nombre="run"
                        valor={datos.run}
                        alCambiar={valor =>
                            actualizar("run", valor)
                        }
                        error={errores.run}
                        placeholder="12.345.678-5"
                    />
                </div>

                {/* Nombre */}
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

                {/* Apellidos */}
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

                {/* Correo */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Correo Electrónico *"
                        nombre="correo"
                        tipo="email"
                        valor={datos.correo}
                        alCambiar={valor =>
                            actualizar("correo", valor)
                        }
                        error={errores.correo}
                    />
                </div>

                {/* Contraseña */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Contraseña *"
                        nombre="clave"
                        tipo="password"
                        valor={datos.clave}
                        alCambiar={valor =>
                            actualizar("clave", valor)
                        }
                        error={errores.clave}
                    />
                </div>

                {/* Confirmar contraseña */}
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Confirmar Contraseña *"
                        nombre="confirmarClave"
                        tipo="password"
                        valor={datos.confirmarClave}
                        alCambiar={valor =>
                            actualizar("confirmarClave", valor)
                        }
                        error={errores.confirmarClave}
                    />
                </div>

                {/* Rol */}
                <div className="col-md-6">
                    <label
                        htmlFor="rolNuevoUsuario"
                        className="form-label fw-semibold"
                    >
                        Rol del Usuario *
                    </label>

                    <select
                        id="rolNuevoUsuario"
                        className={`form-select ${errores.rol ? "is-invalid" : ""}`}
                        value={datos.rol}
                        onChange={(e) => {
                            const valor = e.target.value;

                            if (
                                valor === "Cliente" ||
                                valor === "Administrador"
                            ) {
                                setDatos(prev => ({
                                    ...prev,
                                    rol: valor
                                }));
                            }
                        }}
                    >
                        <option value="Cliente">
                            Cliente
                        </option>

                        <option value="Administrador">
                            Administrador
                        </option>
                    </select>
                    {errores.rol && (
                        <div className="invalid-feedback d-block">{errores.rol}</div>
                    )}
                </div>

            </div>

            {/* Errores del servicio */}
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
                    className="btn btn-success"
                >
                    Crear Usuario
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/admin/usuarios")
                    }
                >
                    Cancelar
                </button>

            </div>

        </form>
    );
}

export default FormularioNuevoUsuario;
