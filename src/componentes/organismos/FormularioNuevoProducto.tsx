
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { crearProducto, actualizarProducto } from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";

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

type DatosProducto = {
    nombre: string;
    categoria: string;
    descripcion: string;
    descripcionLarga: string;
    precio: string;
    stock: string;
    imagen: string;
};

type Errores = Partial<Record<keyof DatosProducto, string>>;

interface Props {
    producto?: Producto;
}

function FormularioNuevoProducto({ producto }: Props) {
    const navigate = useNavigate();

    
    const [datos, setDatos] = useState<DatosProducto>({
        nombre: producto?.nombre ?? "",
        categoria: producto?.categoria ?? "",
        descripcion: producto?.descripcion ?? "",
        descripcionLarga: producto?.descripcionLarga ?? "",
        precio: producto ? String(producto.precio) : "",
        stock: producto ? String(producto.stock) : "",
        imagen: producto?.imagen ?? ""
    });


    const [errores, setErrores] = useState<Errores>({});
    const [errorGeneral, setErrorGeneral] = useState("");

    const actualizar = (
        campo: keyof DatosProducto,
        valor: string
    ) => {
        setDatos(prev => ({ ...prev, [campo]: valor }));
        setErrores(prev => ({ ...prev, [campo]: "" }));
        setErrorGeneral("");
    };

    const guardar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores: Errores = {};

        // Valida que el nombre del producto no esté vacío, contenga letras y tenga máximo 100 caracteres.
        if (!datos.nombre.trim()) {
            nuevosErrores.nombre = "Ingrese el nombre.";
        } else if (!/\p{L}/u.test(datos.nombre)) {
            nuevosErrores.nombre = "El nombre debe contener letras.";
        } else if (datos.nombre.trim().length > 100) {
            nuevosErrores.nombre = "El nombre no puede superar 100 caracteres.";
        }

        // Valida que la categoría corresponda a una de las opciones disponibles.
        if (!categorias.includes(datos.categoria)) {
            nuevosErrores.categoria = "Seleccione una categoría.";
        }

        // Valida que la descripción tenga entre 5 y 500 caracteres.
        if (!datos.descripcion.trim()) {
            nuevosErrores.descripcion = "Ingrese una descripción.";
        } else if (datos.descripcion.trim().length < 5) {
            nuevosErrores.descripcion = "La descripción debe tener al menos 5 caracteres.";
        } else if (datos.descripcion.trim().length > 500) {
            nuevosErrores.descripcion = "La descripción no puede superar 500 caracteres.";
        }

        // Valida que la descripción larga opcional no supere 2000 caracteres.
        if (datos.descripcionLarga.trim().length > 2000) {
            nuevosErrores.descripcionLarga = "La descripción larga no puede superar 2000 caracteres.";
        }

        // Valida que el precio sea un número entero positivo y seguro.
        if (
            !/^\d+$/.test(datos.precio) ||
            !Number.isSafeInteger(Number(datos.precio)) ||
            Number(datos.precio) <= 0
        ) {
            nuevosErrores.precio = "Ingrese un precio entero mayor que cero.";
        }

        // Valida que el stock sea un número entero no negativo y seguro.
        if (
            !/^\d+$/.test(datos.stock) ||
            !Number.isSafeInteger(Number(datos.stock))
        ) {
            nuevosErrores.stock = "Ingrese un stock entero de cero o más.";
        }

        // Valida que la imagen tenga una ruta local con extensión de imagen.
        const rutaImagen = datos.imagen.trim();
        if (
            !/^\/(?!\/)(?!.*\.\.)[^\s<>"']+\.(png|jpe?g|webp|gif|svg|avif)$/i.test(rutaImagen)
        ) {
            nuevosErrores.imagen =
                "Ingrese una ruta local de imagen válida (por ejemplo /img/foto.jpg).";
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        
    try {
        const datosProducto = {
            nombre: datos.nombre.trim(),
            categoria: datos.categoria,
            descripcion: datos.descripcion.trim(),
            descripcionLarga: datos.descripcionLarga.trim(),
            precio: Number(datos.precio),
            stock: Number(datos.stock),
            imagen: datos.imagen.trim()
        };

        if (producto) {
            // EDITAR PRODUCTO EXISTENTE
            const actualizado = actualizarProducto(
                producto.id,
                datosProducto
            );

            if (!actualizado) {
                setErrorGeneral("No se encontró el producto.");
                return;
            }

        } else {
            // CREAR PRODUCTO NUEVO
            crearProducto(datosProducto);
        }

        navigate("/admin/productos");

        } catch {
            setErrorGeneral("No se pudieron guardar los cambios.");
        }

    };

    return (
        <form onSubmit={guardar} noValidate>
            <div className="row g-3">

                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Nombre del Producto *"
                        nombre="nombre"
                        valor={datos.nombre}
                        alCambiar={v => actualizar("nombre", v)}
                        error={errores.nombre}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">
                        Categoría *
                    </label>

                    <select
                        className={`form-select ${
                            errores.categoria ? "is-invalid" : ""
                        }`}
                        value={datos.categoria}
                        onChange={e =>
                            actualizar("categoria", e.target.value)
                        }
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria} value={categoria}>
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
                        alCambiar={v => actualizar("descripcion", v)}
                        error={errores.descripcion}
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">
                        Descripción Larga
                    </label>
                    <textarea
                        className={`form-control ${errores.descripcionLarga ? "is-invalid" : ""}`}
                        rows={4}
                        value={datos.descripcionLarga}
                        onChange={e =>
                            actualizar("descripcionLarga", e.target.value)
                        }
                        aria-invalid={Boolean(errores.descripcionLarga)}
                    />
                    {errores.descripcionLarga && (
                        <div className="invalid-feedback d-block">{errores.descripcionLarga}</div>
                    )}
                </div>

                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Precio *"
                        tipo="number"
                        nombre="precio"
                        valor={datos.precio}
                        alCambiar={v => actualizar("precio", v)}
                        error={errores.precio}
                    />
                </div>

                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Stock *"
                        tipo="number"
                        nombre="stock"
                        valor={datos.stock}
                        alCambiar={v => actualizar("stock", v)}
                        error={errores.stock}
                    />
                </div>

                <div className="col-12">
                    <CampoFormulario
                        etiqueta="Ruta de la Imagen *"
                        nombre="imagen"
                        valor={datos.imagen}
                        alCambiar={v => actualizar("imagen", v)}
                        placeholder="/img/NombreImagen.jpg"
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
                    <button type="submit" className="btn btn-primary">
                        {producto ? "Guardar Cambios" : "Guardar Producto"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/admin/productos")}
                    >
                        Cancelar
                    </button>
                </div>

            </div>
        </form>
    );
}

export default FormularioNuevoProducto;
