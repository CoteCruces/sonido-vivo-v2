const API = "/api/carrito";
const CLAVE = "sonidoVivoCarritoId";

export type RegistroCarrito = {
    id: number;
    usuarioId: number;
    productoId: number;
    cantidad: number;
};

// Identificador temporal del carrito.
// Funciona con y sin iniciar sesión.
function obtenerIdCarrito(): number {
    const guardado = sessionStorage.getItem(CLAVE);

    if (guardado !== null) {
        const id = Number(guardado);

        if (Number.isSafeInteger(id) && id < 0) {
            return id;
        }
    }

    const aleatorio = crypto.getRandomValues(
        new Uint32Array(1)
    )[0];

    const id = -(1000000000 + aleatorio);

    sessionStorage.setItem(CLAVE, String(id));

    return id;
}

// Obtener los productos desde MySQL.
export async function obtenerCarritoApi(): Promise<RegistroCarrito[]> {
    const id = obtenerIdCarrito();

    const respuesta = await fetch(
        `${API}/usuario/${id}`
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el carrito.");
    }

    return respuesta.json();
}

// Agregar un producto.
export async function agregarCarritoApi(
    productoId: number,
    cantidad: number
): Promise<RegistroCarrito> {
    const respuesta = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuarioId: obtenerIdCarrito(),
            productoId,
            cantidad
        })
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo agregar el producto.");
    }

    return respuesta.json();
}

// Modificar cantidad.
export async function actualizarCarritoApi(
    registro: RegistroCarrito,
    cantidad: number
): Promise<RegistroCarrito> {
    const respuesta = await fetch(
        `${API}/${registro.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuarioId: obtenerIdCarrito(),
                productoId: registro.productoId,
                cantidad
            })
        }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el carrito.");
    }

    return respuesta.json();
}

// Eliminar un registro.
export async function eliminarCarritoApi(
    registroId: number
): Promise<void> {
    const respuesta = await fetch(
        `${API}/${registroId}`,
        { method: "DELETE" }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el producto.");
    }
}
