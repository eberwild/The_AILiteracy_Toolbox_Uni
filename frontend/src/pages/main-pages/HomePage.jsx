import MainHeader from "../../components/MainHeader";
import '../../styles/pages/HomePage.css';
function HomePage(){


    return (

        <>
        <div className="home-page">
            <MainHeader/>

            <div className="website-info">
                <h2 className="home-title">
                    The AI Literacy Toolbox
                </h2>

                <div className="home-spacer"></div>

                <p className="home-text">
                    The AI Literacy Toolbox helps people understand what artificial intelligence is, 
                    and also how it affects out society.
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

                    Long, D., & Magerko, B. (2020). What is AI Literacy? 
                    Competencies and Design Considerations.  
                    
                </p>
            </div>


        </div>
        </>
    )
}

export default HomePage;