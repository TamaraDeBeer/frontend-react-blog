import {Link} from "react-router-dom";

function NotFound() {
    return (
        <>
            <h2>Oeps... Deze pagina bestaat niet</h2>
            <h4>Klik <Link to="/">hier</Link> om terug te gaan naar de homepagina</h4>
        </>
    );
}

export default NotFound;