import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { productosIniciales } from "../datos/productos";
import { usuariosIniciales } from "../datos/usuarios";
import type {
  ItemCarrito,
  Pedido,
  Producto,
  Sesion,
  Usuario,
} from "../utilidades/tipos";

type Tienda = {
  productos: Producto[];
  usuarios: Usuario[];
  sesion: Sesion | null;
  pedidos: Pedido[];
  carrito: ItemCarrito[];
  unidades: number;
  total: number;
  items: { producto: Producto; cantidad: number }[];
  agregar: (id: number) => void;
  cambiarCantidad: (id: number, cantidad: number) => void;
  vaciar: () => void;
  guardarProducto: (producto: Producto) => void;
  borrarProducto: (id: number) => void;
  guardarUsuario: (usuario: Usuario, anterior?: string) => void;
  borrarUsuario: (run: string) => void;
  iniciarSesion: (email: string) => boolean;
  cerrarSesion: () => void;
  guardarPedido: (metodo: string) => void;
};
const Contexto = createContext<Tienda | null>(null);
function leer<T>(clave: string, alternativa: T): T {
  try {
    const valor = localStorage.getItem(clave);
    if (valor !== null) {
      const parsed: unknown = JSON.parse(valor);
      if (Array.isArray(alternativa) && !Array.isArray(parsed))
        return alternativa;
      return parsed as T;
    }
  } catch {
    /* almacenamiento no disponible */
  }
  return alternativa;
}
function convertirCarrito(): ItemCarrito[] {
  const guardado = leer<unknown[]>("carrito", []);
  return guardado
    .map((item) => {
      const registro = item as { id?: string | number; cantidad?: number };
      return { id: Number(registro.id), cantidad: Number(registro.cantidad) };
    })
    .filter(
      (p) =>
        Number.isFinite(p.id) && Number.isInteger(p.cantidad) && p.cantidad > 0,
    );
}
export function ProveedorTienda({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(() =>
    leer("productos", productosIniciales),
  );
  const [usuarios, setUsuarios] = useState<Usuario[]>(() =>
    leer("usuarios", usuariosIniciales),
  );
  const [sesion, setSesion] = useState<Sesion | null>(() =>
    leer("sv_sesion", null),
  );
  const [carrito, setCarrito] = useState<ItemCarrito[]>(convertirCarrito);
  const [pedidos, setPedidos] = useState<Pedido[]>(() =>
    leer("sv_pedidos", []),
  );
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  useEffect(() => {
    localStorage.setItem("sv_sesion", JSON.stringify(sesion));
  }, [sesion]);
  useEffect(() => {
    localStorage.setItem("sv_pedidos", JSON.stringify(pedidos));
  }, [pedidos]);
  const items = useMemo(
    () =>
      carrito.flatMap((i) => {
        const producto = productos.find((p) => p.id === i.id);
        return producto ? [{ producto, cantidad: i.cantidad }] : [];
      }),
    [carrito, productos],
  );
  const unidades = items.reduce((ac, p) => ac + p.cantidad, 0);
  const total = items.reduce((ac, p) => ac + p.cantidad * p.producto.precio, 0);
  const agregar = (id: number) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto || producto.stock <= 0) return;
    setCarrito((ant) => {
      const actual = ant.find((p) => p.id === id)?.cantidad ?? 0;
      if (actual >= producto.stock) return ant;
      return actual
        ? ant.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
        : [...ant, { id, cantidad: 1 }];
    });
  };
  const cambiarCantidad = (id: number, cantidad: number) => {
    const stock = productos.find((p) => p.id === id)?.stock ?? 0;
    setCarrito((ant) =>
      cantidad <= 0
        ? ant.filter((p) => p.id !== id)
        : ant
            .map((p) =>
              p.id === id ? { ...p, cantidad: Math.min(cantidad, stock) } : p,
            )
            .filter((p) => p.cantidad > 0),
    );
  };
  const guardarProducto = (producto: Producto) =>
    setProductos((ant) =>
      ant.some((p) => p.id === producto.id)
        ? ant.map((p) => (p.id === producto.id ? producto : p))
        : [...ant, producto],
    );
  const borrarProducto = (id: number) => {
    setProductos((ant) => ant.filter((p) => p.id !== id));
    setCarrito((ant) => ant.filter((p) => p.id !== id));
  };
  const guardarUsuario = (usuario: Usuario, anterior?: string) =>
    setUsuarios((ant) =>
      anterior
        ? ant.map((u) => (u.run === anterior ? usuario : u))
        : [...ant, usuario],
    );
  const borrarUsuario = (run: string) =>
    setUsuarios((ant) => ant.filter((u) => u.run !== run));
  const iniciarSesion = (email: string) => {
    const usuario = usuarios.find(
      (u) => u.correo.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!usuario) return false;
    setSesion({ correo: usuario.correo, rol: usuario.rol });
    return true;
  };
  const cerrarSesion = () => setSesion(null);
  const guardarPedido = (metodo: string) => {
    const pedido: Pedido = {
      id: `PED-${Date.now()}`,
      fecha: new Date().toLocaleDateString("es-CL"),
      total,
      metodo,
      articulos: items.map((i) => ({
        nombre: i.producto.nombre,
        cantidad: i.cantidad,
        precio: i.producto.precio,
      })),
    };
    setPedidos((ant) => [pedido, ...ant]);
    setProductos((ant) =>
      ant.map((p) => ({
        ...p,
        stock: Math.max(
          0,
          p.stock - (carrito.find((i) => i.id === p.id)?.cantidad || 0),
        ),
      })),
    );
    setCarrito([]);
  };
  return (
    <Contexto.Provider
      value={{
        productos,
        usuarios,
        sesion,
        pedidos,
        carrito,
        items,
        unidades,
        total,
        agregar,
        cambiarCantidad,
        vaciar: () => setCarrito([]),
        guardarProducto,
        borrarProducto,
        guardarUsuario,
        borrarUsuario,
        iniciarSesion,
        cerrarSesion,
        guardarPedido,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTienda() {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("useTienda requiere ProveedorTienda");
  return contexto;
}
