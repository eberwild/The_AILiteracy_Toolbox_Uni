import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/CriticalThinking.css';
import Critical from '../../assets/pillarPages/critical-awerness.png';

function CriticalThinking() {

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

                <div className="critical-info">

                    <img src={Critical} 
                        alt="" 
                        className="critical-img"
                    />

                    <p className="critical-text">
                        AI systems can generate convincing answers, images, and recommendations.
                        <br/>
                        <br/>
                        However, they can also make mistakes, reflect biases, or produce misleading results.
                        <br/>
                        <br/>
                        Critical thinking helps users evaluate AI outputs instead of blindly trusting them.
                    </p>

                </div>

                <div className="critical-problems">
                    <div className="problem">
                        <h2> AI can be wrong</h2>
                        <p className="problem-text">
                            AI systems do not always provide correct or complete answers.
                            They predict likely outcomes based on data, not truth.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>AI can be biased</h2>
                        <p className="problem-text">
                            AI can reflect biases present in its training data,
                            leading to unfair or misleading results.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>AI lacks context</h2>
                        <p className="problem-text">
                            AI does not understand situations, emotions, or intentions the way humans do.
                        </p>
                    </div>

                    <div className="problem">
                        <h2>Confidence ≠ correctness</h2>
                        <p className="problem-text">
                             AI outputs may sound confident even when they are inaccurate.
                        </p>
                    </div>
            
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