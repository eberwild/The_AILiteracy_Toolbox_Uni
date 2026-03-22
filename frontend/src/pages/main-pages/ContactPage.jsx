import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import '../../styles/pages/ContactPage.css';
import faqData from '../../data/faqData';
import FAQItem from '../../components/FAQItem';

function ContactPage() {


    return(

        <div className='contact-page'>
            <MainHeader/>

            <div className='aboutUs-section'>
                <h2>About Us</h2>
                <div className='contact-spacer'></div>
                    <p className='about-info'>
                        The project originally started as a student group initiative at the University of Duisburg-Essen, 
                        aimed at providing practical, real-world learning experiences in artificial intelligence.
                        <br/>
                        The project was continued and finalized as part of a Bachelor thesis. During this phase, additional functionalities were 
                        implemented and existing tools were refined, transforming the toolbox into a complete and fully functional educational resource.
                        
                        The project was supervised by <a className='prof-link' href="https://iachounta.com/website/" target='blank'>Prof. Dr. Irene‑Angelica Chounta</a>
                        , Professor of Computational Methods in Modeling and Analysis of Learning Processes at the University of Duisburg‑Essen. 
                        Her research focuses on computational learning analytics, 
                        AI in education, and educational technologies, providing valuable guidance on educational and technical aspects of the project.
                    </p>
            </div>

            <section className="faq-section">
            <h2 className='faq-header'>Frequently Asked Questions (FAQ)</h2>
            <div className='faq-spacer'></div>

            {faqData.map (faq => (

                <FAQItem 
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    />
            ))}

            </section>

            <div className='author-section'>
                <h2>Project Author</h2>
                <div className='contact-spacer'></div>
                <p>
                    Developed and implemented as part of a Bachelor thesis project.
                </p>
                <div className='author-links'>
                    <a className='author-linkedin-link'
                        href='https://www.linkedin.com/in/kevin-flotow-073488374/'
                        target='_blank'>
                        LinkedIn
                    </a>
                    <a className='author-github-link'
                        href='https://github.com/eberwild'
                        target='_blank'>
                        GitHub
                    </a>

                </div>
            </div>

            <div className="contact-intro-section">
                <h2>Contact Us</h2>
                <div className="contact-spacer"></div>
                <p className="contact-intro">
                Got questions, suggestions, or ideas for collaboration?<br/>
                <br/>
                Email: Colabs@UniEmail.de
                <br/>
                Not sure if you need to contact us? Maybe your question has already been answered. 
                Check out our FAQ section — we’ve gathered some of the most common queries to help you out quickly!
                </p>
            </div>

            

            <Footer/>

        </div>
    )
}

export default ContactPage;