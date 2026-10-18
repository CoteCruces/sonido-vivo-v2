import { dinero } from "../../utilidades/funciones";
export default function Precio({
  valor,
  className = "",
}: {
  valor: number;
  className?: string;
}) {
  return <span className={className}>{dinero(valor)}</span>;
}
