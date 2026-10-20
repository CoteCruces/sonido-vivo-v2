import type { Usuario } from "../utilidades/tipos";
import DatoPerfil from "../moleculas/DatoPerfil";

interface Props {
    usuario: Usuario;
}

function PerfilUsuario({ usuario }: Props) {
    return (
        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4 p-md-5 text-start">

                <h3 className="fw-bold text-dark mb-2">
                    Mis Datos Personales
                </h3>

                <p className="text-muted mb-4">
                    Información registrada en tu cuenta de Sonido Vivo.
                </p>

                <div className="row">

                    <DatoPerfil
                        etiqueta="RUN"
                        valor={usuario.run}
                    />

                    <DatoPerfil
                        etiqueta="Nombre"
                        valor={usuario.nombre}
                    />

                    <DatoPerfil
                        etiqueta="Apellidos"
                        valor={usuario.apellidos}
                    />

                    <DatoPerfil
                        etiqueta="Correo Electrónico"
                        valor={usuario.correo}
                    />

                    <DatoPerfil
                        etiqueta="Fecha de Nacimiento"
                        valor={usuario.fechaNacimiento}
                    />

                    <DatoPerfil
                        etiqueta="Dirección"
                        valor={usuario.direccion}
                    />

                    <DatoPerfil
                        etiqueta="Región"
                        valor={usuario.region}
                    />

                    <DatoPerfil
                        etiqueta="Comuna"
                        valor={usuario.comuna}
                    />

                </div>

            </div>
        </div>
    );
}

export default PerfilUsuario;
