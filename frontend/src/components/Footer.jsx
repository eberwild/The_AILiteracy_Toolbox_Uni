import '../styles/components/Footer.css';

function Footer() {

    return(
        <>
            <footer className='footer'>
                <p>© 2026 Kevin Flotow | Bachelorarbeit Angewandte Informatik – Universität Duisburg-Essen</p>
                <a className='impressum-link' 
                    href="https://colaps.team/impressum/" 
                    target='blank'
                >
                    Imprint
                </a>
            </footer>
        </>
    )
}

export default Footer;