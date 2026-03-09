import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import '../../styles/sidePages/Imprint.css';

function Imprint () {

    return(
        <div className='imprint-page'>
            <MainHeader/>
            <h1>Imprint</h1>
            <div className='imprint-spacer'></div>
            <div className='imprint-info'>

                <div className='project-operator'>
                    <h2>Operator</h2>
                    <p>
                        University of Duisburg-Essen
                        <br/>
                        Universitätsstraße 2
                        <br/>
                        45141 Essen
                        <br/>
                        Germany
                    </p>
                </div>
                
                <div className='project-info'>
                    <h2>Project Information</h2>
                    <p>
                        This website was created as part of a bachelor thesis in the
                        Applied Computer Science program at the University of Duisburg-Essen.
                    </p>
                </div>
                
                <div className='project-author'>
                    <h2>Author</h2>
                    <p>Kevin Flotow</p>
                </div>
                
                <div className='project-supervisor'>
                    <h2>Supervisor</h2>
                    <p>Prof. Dr. Irene Chounta</p>
                </div>
                
            </div>

            <Footer/>

        </div>
    )
}

export default Imprint;