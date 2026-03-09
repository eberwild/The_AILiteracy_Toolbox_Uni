import { NavLink } from 'react-router';
import '../styles/components/Footer.css';

function Footer() {

    return(
        <>
            <footer className='footer'>
                <p>© 2026 Kevin Flotow | Bachelorarbeit Angewandte Informatik – Universität Duisburg-Essen</p>
                <NavLink className='impressum-link' to="/imprint">Imprint</NavLink>
            </footer>
        </>
    )
}

export default Footer;