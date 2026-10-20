import "../../Admin.css";
import NavbarAdmin from "../organismos/NavbarAdmin";
import ContenidoAdmin from "../organismos/ContenidoAdmin";
import FooterAdmin from "../organismos/FooterAdmin";

function PanelAdmin() {
    return (
        <div className="panel-admin d-flex flex-column min-vh-100">

            <NavbarAdmin />

            <ContenidoAdmin />

            <FooterAdmin />

        </div>
    );
}

export default PanelAdmin;
