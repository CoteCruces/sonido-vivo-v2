import type { InputHTMLAttributes } from "react";
import Input from "../atomos/Input";
type Props = InputHTMLAttributes<HTMLInputElement> & {
  etiqueta: string;
  error?: string;
};
export default function CampoFormulario({
  etiqueta,
  error,
  id,
  ...props
}: Props) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold" htmlFor={id}>
        {etiqueta}
      </label>
      <Input id={id} aria-invalid={Boolean(error)} {...props} />
      {error && <p className="text-danger small mb-0">{error}</p>}
    </div>
  );
}
