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
                        The project was initially developed as a student group initiative at the University of Duisburg-Essen,
                        with the goal of providing practical, real-world experience in the field of artificial intelligence.

                        It was further developed and completed as part of my Bachelor’s thesis. During this phase, additional functionalities were implemented
                        and existing components were refined, resulting in a comprehensive and fully functional educational toolbox.
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
                Email: <span className='colaps-email'>colapsresearch@gmail.com</span>

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