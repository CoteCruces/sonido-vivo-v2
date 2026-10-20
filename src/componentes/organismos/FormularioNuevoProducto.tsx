
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { crearProducto } from "../servicios/productosService";

type DatosFormulario = {
    nombre: string;
    categoria: string;
    descripcion: string;
    descripcionLarga: string;
    precio: string;
    stock: string;
    imagen: string;
};

type Errores = Partial<
    Record<keyof DatosFormulario, string>
>;

const datosIniciales: DatosFormulario = {
    nombre: "",
    categoria: "",
    descripcion: "",
    descripcionLarga: "",
    precio: "",
    stock: "",
    imagen: ""
};

const categorias = [
    "Guitarras Acústicas",
    "Guitarras Eléctricas",
    "Bajos Eléctricos",
    "Baterías",
    "Teclados y Pianos",
    "Amplificadores",
    "Micrófonos",
    "Pedales de Efectos",
    "Accesorios",
    "Estudio y Grabación"
];

function FormularioNuevoProducto() {

    const navigate = useNavigate();

    const [datos, setDatos] =
        useState<DatosFormulario>(datosIniciales);

    const [errores, setErrores] =
        useState<Errores>({});

    const [errorGeneral, setErrorGeneral] = useState("");

    // Actualizar los campos
    const actualizar = (
        campo: keyof DatosFormulario,
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
    };

    // Validaciones con JavaScript
    const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores: Errores = {};

        if (datos.nombre.trim() === "") {
            nuevosErrores.nombre =
                "El nombre es obligatorio.";
        }

        if (datos.categoria === "") {
            nuevosErrores.categoria =
                "Seleccione una categoría.";
        }

        if (datos.descripcion.trim() === "") {
            nuevosErrores.descripcion =
                "Ingrese una descripción.";
        }

        if (
            !/^\d+$/.test(datos.precio) ||
            Number(datos.precio) <= 0
        ) {
            nuevosErrores.precio =
                "Ingrese un precio entero mayor a 0.";
        }

        if (!/^\d+$/.test(datos.stock)) {
            nuevosErrores.stock =
                "El stock debe ser un número entero mayor o igual a 0.";
        }

        if (datos.imagen.trim() === "") {
            nuevosErrores.imagen =
                "Ingrese la ruta de la imagen.";
        } else if (!datos.imagen.startsWith("/")) {
            nuevosErrores.imagen =
                "La ruta debe comenzar con /.";
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        try {
            crearProducto({
                nombre: datos.nombre.trim(),
                categoria: datos.categoria,
                descripcion: datos.descripcion.trim(),
                descripcionLarga: datos.descripcionLarga.trim(),
                precio: Number(datos.precio),
                stock: Number(datos.stock),
                imagen: datos.imagen.trim()
            });

            // Volver al catálogo
            navigate("/catalogo");

        } catch {
            setErrorGeneral(
                "No se pudo guardar el producto."
            );
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>

            <div className="row g-3">

                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Nombre del producto *"
                        nombre="nombre"
                        valor={datos.nombre}
                        alCambiar={(v) =>
                            actualizar("nombre", v)
                        }
                        placeholder="Ej: Guitarra Yamaha"
                        error={errores.nombre}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        Categoría *
                    </label>

                    <select
                        className={`form-select ${
                            errores.categoria ? "is-invalid" : ""
                        }`}
                        value={datos.categoria}
                        onChange={(e) =>
                            actualizar("categoria", e.target.value)
                        }
                    >
                        <option value="">
                            Seleccione una categoría
                        </option>

                        {categorias.map((categoria) => (
                            <option
                                key={categoria}
                                value={categoria}
                            >
                                {categoria}
                            </option>
                        ))}
                    </select>

                    {errores.categoria && (
                        <div className="invalid-feedback">
                            {errores.categoria}
                        </div>
                    )}
                </div>

                <div className="col-12">
                    <CampoFormulario
                        etiqueta="Descripción *"
                        nombre="descripcion"
                        valor={datos.descripcion}
                        alCambiar={(v) =>
                            actualizar("descripcion", v)
                        }
                        placeholder="Descripción breve del producto"
                        error={errores.descripcion}
                    />
                </div>

                <div className="col-12">
                    <label
                        htmlFor="descripcionLarga"
                        className="form-label fw-semibold"
                    >
                        Descripción larga
                    </label>

                    <textarea
                        id="descripcionLarga"
                        className="form-control"
                        rows={4}
                        value={datos.descripcionLarga}
                        onChange={(e) =>
                            actualizar(
                                "descripcionLarga",
                                e.target.value
                            )
                        }
                        placeholder="Características detalladas..."
                    />
                </div>

                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Precio *"
                        nombre="precio"
                        tipo="number"
                        valor={datos.precio}
                        alCambiar={(v) =>
                            actualizar("precio", v)
                        }
                        placeholder="Ej: 129990"
                        error={errores.precio}
                    />
                </div>

                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Stock *"
                        nombre="stock"
                        tipo="number"
                        valor={datos.stock}
                        alCambiar={(v) =>
                            actualizar("stock", v)
                        }
                        placeholder="Ej: 10"
                        error={errores.stock}
                    />
                </div>

                <div className="col-12">
                    <CampoFormulario
                        etiqueta="Ruta de la imagen *"
                        nombre="imagen"
                        valor={datos.imagen}
                        alCambiar={(v) =>
                            actualizar("imagen", v)
                        }
                        placeholder="/img/NuevoProducto.jpg"
                        error={errores.imagen}
                    />
                </div>

                {errorGeneral && (
                    <div className="col-12">
                        <div className="alert alert-danger">
                            {errorGeneral}
                        </div>
                    </div>
                )}

                <div className="col-12 d-flex gap-3 mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Guardar Producto
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/catalogo")}
                    >
                        Cancelar
                    </button>
                </div>

            </div>
        </form>
    );
}

export default FormularioNuevoProducto;
