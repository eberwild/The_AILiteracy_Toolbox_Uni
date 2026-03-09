import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import '../../styles/pages/HomePage.css';
function HomePage(){


    return (

        <>
        <div className="home-page">
            <MainHeader/>

            <div className="website-info">
                <h1 className="home-title">
                    The AI Literacy Toolbox
                </h1>

                <div className="home-spacer"></div>

                <p className="home-text">
                    The AI Literacy Toolbox helps people understand what artificial intelligence is, 
                    and also how it affects out society.
                    <br/>
                    It provides practical tools which are contributed by users and by students,
                    explanations for beginner, and learning resources to support a critical, ethical and informed use of AI.
                </p>

            </div>

            <div className="definition-section">
                <h2 className="home-title">What is AI Literacy ?</h2>
                <div className="home-spacer"></div>
                <p className="definition">
                
                    “AI Literacy is a set of competencies that enables individuals to critically
 
                    evaluate AI technologies , communicate and collaborate effectively with AI

                    and use AI as a tool online , at home ,and in the workplace.” 
                    <br/>
                    <br/>

                    Long, D., & Magerko, B. (2020). What is AI literacy? Competencies and design considerations. 
                    Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems, 1–16. 

                    <br/> 

                    <a href="https://dl.acm.org/doi/10.1145/3313831.3376727"
                        target="_blank"
                        className="thesis-link"
                    >
                        https://dl.acm.org/doi/10.1145/3313831.3376727
                    </a>
                    
                </p>
            </div>

            <Footer/>

        </div>
        </>
    )
}

export default HomePage;