export const dinero = (valor: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
export const rutaImagen = (ruta: string) =>
  ruta.startsWith("http") || ruta.startsWith("/") ? ruta : `/${ruta}`;
export const emailValido = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
export function runValido(valor: string) {
  const run = valor.replace(/[.\-\s]/g, "").toUpperCase();
  if (!/^\d{7,8}[\dK]$/.test(run)) return false;
  let suma = 0,
    factor = 2;
  for (let i = run.length - 2; i >= 0; i--) {
    suma += Number(run[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const dv = 11 - (suma % 11);
  return (dv === 11 ? "0" : dv === 10 ? "K" : String(dv)) === run.at(-1);
}
export const regiones = [
  {
    region: "Valparaíso",
    comunas: [
      "Viña del Mar",
      "Valparaíso",
      "Quilpué",
      "Villa Alemana",
      "Concón",
    ],
  },
  {
    region: "Región Metropolitana",
    comunas: [
      "Santiago",
      "Providencia",
      "Las Condes",
      "Ñuñoa",
      "Maipú",
      "La Florida",
    ],
  },
  {
    region: "Biobío",
    comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chillán"],
  },
];
