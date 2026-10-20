export type Producto = {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  descripcionLarga?: string;
  precio: number;
  stock: number;
  imagen: string;
};
export type Noticia = {
  id: number;
  titulo: string;
  fecha: string;
  resumen: string;
  contenidoCompleto: string;
  imagen: string;
};

export type Usuario = {
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    rol: string;
    direccion?: string;
    fechaNacimiento?: string;
    region?: string;
    comuna?: string;
};

export type ItemCarrito = { id: number; cantidad: number };
export type Pedido = {
  id: string;
  fecha: string;
  total: number;
  articulos: { nombre: string; cantidad: number; precio: number }[];
  metodo: string;
};
export type Sesion = { correo: string; rol: string };