import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/PracticalSkills.css';
import Practical from '../../assets/pillarPages/practical-skills.png';

function PracticalSkills() {

    return(

        <div className="practical-page">
            <MainHeader/>

            <div className="practical-intro">
                <h2>Practical Skills</h2>
                <div className="practical-spacer"></div>
                <p className="practical-text">
                    Practical Skills mean being able to interact with AI systems hands-on—such as selecting appropriate tools,
                    providing meaningful inputs,
                    interpreting outputs,
                    and applying results appropriately while understanding their limitations.
                </p>
            </div>

            <div className="practical-info">

                <img src={Practical} 
                     alt="practical-diagramm"
                     className="practical-img"
                />

                <div className="practical-problems">
                    <div className="problem">
                        <h2>Prompting</h2>
                        <p className="problem-text">
                            Writing clear and precise instructions helps AI produce more useful and relevant results.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>Choosing the right tool</h2>
                        <p className="problem-text">
                            Different AI tools are designed for different tasks, such as text, images, or data analysis.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>Interpreting results</h2>
                        <p className="problem-text">
                            AI outputs should be reviewed, understood, and adapted rather than used without reflection.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>Iteration</h2>
                        <p className="problem-text">
                            Effective AI use often requires refining prompts and inputs based on previous results.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>Understanding limitations</h2>
                        <p className="problem-text">
                            Knowing when AI is not suitable for a task is as important as knowing when to use it.
                        </p>
                    </div>
                    
                </div>

                <div className="practical-facit">
                    <p className="practical-text">
                        Practical skills empower users to use AI efficiently, creatively, and responsibly in everyday life.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default PracticalSkills;