import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/UnderstandingAI.css';
import AIFields from '../../assets/pillarPages/AI-fields.png';

function UnderstandingAI(){

    return(

        <div className="understanding-page">
            <MainHeader/>

            <div className="understanding-intro">
                <h2>Understanding AI</h2>
                <div className="understanding-spacer"></div>
                <p className="understanding-text">
                    Understanding AI refers to the ability to grasp what artificial intelligence is, how it works at a basic level,
                    what it can and cannot do, and how AI systems are created, trained, and used in real-world contexts.
                    <br/>
                    Artificial Intelligence is often talked about as if it were one single thing.
                    In reality, AI is a broad field made up of many different disciplines, methods,
                    and technologies that work together to enable machines to perform tasks that normally require human intelligence.
                </p>
            </div>

            <div className="understanding-info">
                <div className="understanding-fields">
                    <img src={AIFields} 
                        alt="fields-of_AI" 
                        className="fields-img"
                    />

                <p className="fields-info">
                    <strong>Machine Learning</strong> – Systems that learn patterns from data instead of being explicitly programmed.
                    <br/>
                    <br/>
                    <strong>Neural Networks</strong> – Models inspired by the human brain, used to recognize complex patterns.
                    <br/>
                    <br/>
                    <strong>Data & Statistics</strong> – The foundation that allows AI systems to learn, predict, and improve.
                    <br/>
                    <br/>
                    <strong>Natural Language Processing</strong> – Enables machines to understand and generate human language.
                    <br/>
                    <br/>
                    <strong>Computer Vision</strong> – Allows AI to interpret images and videos.
                </p>
   
                </div>

                <div className="understanding-limits">

                    <div className="understanding-do">
                        <h3>What AI can do:</h3>
                        <p>
                            &bull; &emsp; Analyze large amounts of data
                            <br/>
                            &bull; &emsp; Recognize patterns
                            <br/>
                            &bull; &emsp; Support decision-making
                        </p>
                    </div>
                        

                    <div className="understanding-do">
                        <h3>What AI cannot do:</h3>
                        <p>
                            &bull; &emsp; Think independently
                            <br/>
                            &bull; &emsp; Understand context like humans
                            <br/>
                            &bull; &emsp; Make value-based or moral decisions
                            <br/> 
                        </p>
                    </div>

                </div>

                <div className="understanding-facit">
                    <p>
                        Understanding how AI works at a basic level helps you use it more effectively,
                        question its outputs, and make informed decisions when interacting with AI systems.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default UnderstandingAI;