import { Link } from "react-router-dom";
export default function BotonLeerMas({ href }: { href: string }) {
  return (
    <Link to={href} className="btn btn-outline-primary">
      Leer más
    </Link>
  );
}
