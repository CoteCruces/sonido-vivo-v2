import type { ButtonHTMLAttributes, ReactNode } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?:
    | "primary"
    | "outline-primary"
    | "outline-secondary"
    | "outline-danger"
    | "danger"
    | "success";
  children: ReactNode;
};
export default function Boton({
  variante = "primary",
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button className={`btn btn-${variante} ${className}`} {...props}>
      {children}
    </button>
  );
}
