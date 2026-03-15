import { useState } from "react";
import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/CriticalThinking.css';

import Accuracy from '../../assets/pillarPages/critical-thinking/accuracy.png';
import Biased from '../../assets/pillarPages/critical-thinking/biased.png';
import ContextAwerness from '../../assets/pillarPages/critical-thinking/context-awerness.png';
import DataQuality from '../../assets/pillarPages/critical-thinking/data-quality.png';
import Accountability from '../../assets/pillarPages/critical-thinking/accountability.png';


function CriticalThinking() {

    const [activeInfo , setActiveInfo] = useState('');
    const [visible , setVisibility] = useState(false);

    const showInfo = () => {
        setVisibility(true);
    }

    return(

        <div className="critical-thinking-page">
                <MainHeader/>

                <div className="critical-intro">
                    <h2>Critical Thinking</h2>
                    <div className="critical-spacer"></div>
                    <p className="critical-text">
                        Critical Thinking means being able to assess the reliability, limitations, biases,
                        and consequences of AI systems and their results,
                        and to make informed judgments about when and how AI should be trusted or used.
                    </p>
                </div>

                <div className="critical-fields">

                    <img src={Accuracy} alt="accuracy-img" className="critical-img"
                        onClick={() => {
                            setActiveInfo('Accuracy - Verify whether the AI’s information is correct and supported by reliable sources.');
                            showInfo();
                        }}/>

                    <img src={Biased} alt="biased-img" className="critical-img" 
                        onClick={() => {
                            setActiveInfo('Biased - AI can reflect biases present in its training data,leading to unfair or misleading results.');
                            showInfo();
                        }}/>
                    <img src={ContextAwerness} alt="context-awerness-img" className="critical-img"
                        onClick={() => {
                            setActiveInfo('Contextawerness -  AI does not understand situations, emotions, or intentions the way humans do.');
                            showInfo();
                        }}/>
                    <img src={DataQuality} alt="data-quality-img" className="critical-img" 
                        onClick={() => {
                            setActiveInfo('Dataquality - The quality of AI results depends on the quality of the data behind them.');
                            showInfo();
                        }}/>
                    <img src={Accountability} alt="accountability-img" className="critical-img" 
                        onClick={() => {
                            setActiveInfo('Accountability - AI provides suggestions, but humans are responsible for the final decisions.');
                            showInfo();
                        }}/>

                </div>

                <div className="active-info"
                    style={{display: visible ? 'block' : 'none'}}>
                    {activeInfo}
                </div>

                <div className="critical-facit">
                    <h2>Before trusting an AI result, ask yourself:</h2>

                    <p className="critical-facit-text">
                        Where might this information come from?
                        <br/>
                        Does the result make sense in this context?
                        <br/>
                        Could important information be missing?
                        <br/>
                        Would I trust this without verification?
                    </p>
                </div>

        </div>
    )
}

export default CriticalThinking;