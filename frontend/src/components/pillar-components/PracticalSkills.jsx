import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/PracticalSkills.css';
import { useState } from "react";
import Prompting from '../../assets/pillarPages/practical-skills/prompting.png';
import ToolSelection from '../../assets/pillarPages/practical-skills/tool-selection.png';
import InterpretingOutputs from '../../assets/pillarPages/practical-skills/interpreting.png';
import Limitations from '../../assets/pillarPages/practical-skills/limitations.png';
import EffectiveUse from '../../assets/pillarPages/practical-skills/effective-use.png';

function PracticalSkills() {

    const [activeInfo , setActiveInfo] = useState('');
    const [visible , setVisibility] = useState(false);

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


                <img src={Prompting} alt="prompting-img" className="fields-img"
                    onClick={() => {
                        setActiveInfo('Prompting - Writing clear and precise instructions helps AI produce more useful and relevant results.');
                        setVisibility(true);
                    }}/>
                
                <img src={ToolSelection} alt="select-tool-img" className="fields-img"
                    onClick={() => {
                        setActiveInfo('Toolselection - Different AI tools are designed for different tasks, such as text, images, or data analysis.');
                        setVisibility(true);
                    }}/>
                
                <img src={InterpretingOutputs} alt="interpert-output-img" className="fields-img"
                    onClick={() => {
                        setActiveInfo('Interpreting Outputs - AI outputs should be reviewed, understood, and adapted rather than used without reflection.');
                        setVisibility(true);
                    }}/>
                
                <img src={Limitations} alt="limitations-img" className="fields-img" 
                    onClick={() => {
                        setActiveInfo('Limitations - Knowing when AI is not suitable for a task is as important as knowing when to use it.');
                        setVisibility(true);
                    }}/>
                
                <img src={EffectiveUse} alt="effective-use-info" className="fields-img" 
                    onClick={() => {
                        setActiveInfo('Effective use - Effective AI use often requires refining prompts and inputs based on previous results.');
                        setVisibility(true);
                    }}/>
                
                <div className="field-info"
                    style={{display: visible ? 'block' : 'none'}}>
                    {activeInfo}
                </div>


            </div>
        </div>
    )
}

export default PracticalSkills;