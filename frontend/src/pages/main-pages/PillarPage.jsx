import { useState } from 'react';
// picture import
import UnderstandingPicture from '../../assets/UnderstandingAI.png';
import CriticalThinking from '../../assets/CriticalThinking.png';
import PracticalSkills from '../../assets/PracticalSkills.png';
import Ethic from '../../assets/Ethics.png';

// pillar-components import
import CriticalThinkingComp from '../../components/pillar-components/CriticakThinking';
import EthicsComp from '../../components/pillar-components/Ethics';
import PracticalSkillsComp from '../../components/pillar-components/PracticalSkills';
import UnderstandingAIComp from '../../components/pillar-components/UnderstandingAI';

import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import '../../styles/pages/PillarPage.css';

function PillarPage() {

    const [ activeComponent , setActiveComponent ] = useState(null);

    return(

        <div className='pillar-page'>  

            <MainHeader/>


            <div className="pillar-section">
                            
                <img src={UnderstandingPicture} alt="Pillar-UnderstandingAI-logo"
                    onClick={() => {
                        setActiveComponent('UnderstandingAI')
                    }} />
            
                <img src={CriticalThinking} alt="Pillar-CriticalThinking-logo"
                    onClick={() => {
                        setActiveComponent('CriticalThinking')
                    }} />
            
                <img src={PracticalSkills} alt="Pillar-PracticalSkill-logo"
                    onClick={() => {
                        setActiveComponent('PracticalSkills')
                    }} />

                <img src={Ethic} alt="Pillar-Ethical-logo"
                    onClick={() => {
                        setActiveComponent('Ethics')
                    }} />
                            
            </div>


            <div className='selected-pillar'>

                {activeComponent === 'UnderstandingAI' && <UnderstandingAIComp/> }
                {activeComponent === 'CriticalThinking' && <CriticalThinkingComp/>}
                {activeComponent === 'PracticalSkills' && <PracticalSkillsComp/>}
                {activeComponent === 'Ethics' && <EthicsComp/>}

            </div>


            <div className='general-info'>
                <h2>General Information</h2>
                <div className='pillar-spacer'></div>
                    <ul className='pillar-text'>

                        <li>
                            AI does not “understand” the world like humans do.
                            It works by processing data and probabilities, not by having intentions, emotions, or awareness.
                        </li>
                        <li>
                            AI systems identify patterns in data and make predictions based on them.
                            They do not think, feel, or make conscious decisions.
                        </li>
                        <li>
                            Most AI models are trained on examples to recognize patterns or generate outputs.
                            They are tools, not independent thinkers.
                        </li>
                        
                    </ul>
            </div>

            <Footer/>

        </div>
    )
}

export default PillarPage;