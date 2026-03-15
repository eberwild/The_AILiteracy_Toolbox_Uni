import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/PracticalSkills.css';
import { useState } from "react";

function PracticalSkills() {

    const [activeInfo , setActiveInfo] = useState('');

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
                    Practical skills empower users to use AI efficiently, creatively, and responsibly in everyday life.
                </p>
            </div>

            <div className="practical-fields">

{/*
                <img src={Prompting} alt="prompting-img" className="practical-img"
                    onClick={() => setActiveInfo('Writing clear and precise instructions helps AI produce more useful and relevant results.')}/>
                
                <img src={ToolSelection} alt="select-tool-img" className="practical-img"
                    onClick={() => setActiveInfo('Different AI tools are designed for different tasks, such as text, images, or data analysis.')}/>
                
                <img src={InterpretingOutputs} alt="interpert-output-img" className="practical-img"
                    onClick={() => setActiveInfo('AI outputs should be reviewed, understood, and adapted rather than used without reflection.')}/>
                
                <img src={Limitations} alt="limitations-img" className="practical-img" 
                    onClick={() => setActiveInfo('Knowing when AI is not suitable for a task is as important as knowing when to use it.')}/>
                
                <img src={EffectiveUse} alt="effective-use-info" className="practical-img" 
                    onClick={() => setActiveInfo('Effective AI use often requires refining prompts and inputs based on previous results.')}/>
                
                <div className="active-info">{activeInfo}</div>

*/}
            </div>
        </div>
    )
}

export default PracticalSkills;