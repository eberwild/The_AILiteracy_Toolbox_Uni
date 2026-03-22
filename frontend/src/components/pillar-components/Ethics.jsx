import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/Ethics.css';
import { useState } from 'react';
import Fairness from '../../assets/pillarPages/ethic/Fair.png';
import Transparency from '../../assets/pillarPages/ethic/Transparency.png';
import Responsibility from '../../assets/pillarPages/ethic/Respon.png';
import SocialImpact from '../../assets/pillarPages/ethic/Social.png';
import DataProtection from '../../assets/pillarPages/ethic/Data.png';

function Ethics() {

    const [activeInfo , setActiveInfo] = useState('');
    const [visible , setVisibility] = useState(false);

    return(

        <div className="ethics-page">
            <MainHeader/>

            <div className="ethic-intro">
                <h2>Ethic & Responsibility</h2>
                <div className="ethic-spacer"></div>
                <p className="ethic-text">
                    Ethics and Responsibility mean understanding issues such as bias, privacy,
                    fairness, and accountability in AI,
                    and making conscious,
                    responsible decisions about how AI is developed, deployed, and used.
                    <br/>
                    AI systems influence decisions in education, healthcare, work, and everyday life.
                    Ethics and responsibility help ensure that AI is used in a way that respects human rights,
                    protects individuals, and benefits society as a whole.
                </p>
            </div>

            <div className="ethic-info">

                <div className="ethic-fields">
                <img src={Fairness} alt="fairness-img" className="fields-img"
                    onClick={() => {
                        setActiveInfo('Fairness & Bias - AI systems can produce unfair results if their training data contains biases.');
                        setVisibility(true);
                    }}/>
                
                <img src={Transparency} alt="transparency-img" className="fields-img"
                    onClick={() => {
                        setActiveInfo('Transparency - Users should understand when and how AI is being used, and what its limitations are.');
                        setVisibility(true);
                    }}/>
                
                <img src={Responsibility} alt="responsibility-img" className="fields-img"
                    onClick={() => {
                        setActiveInfo('Responsibility - AI does not make moral decisions — humans remain responsible for outcomes.');
                        setVisibility(true);
                    }}/>
                
                <img src={SocialImpact} alt="socialImpact-img" className="fields-img" 
                    onClick={() => {
                        setActiveInfo('Social Impact - AI can affect jobs, access to information, and social equality.');
                        setVisibility(true);
                    }}/>
                
                <img src={DataProtection} alt="data-info" className="fields-img" 
                    onClick={() => {
                        setActiveInfo('Privacy - AI often relies on large amounts of data, making data protection and privacy essential.');
                        setVisibility(true);
                    }}/>
                                
                <div className="field-info"
                    style={{display: visible ? 'block' : 'none'}}>
                    {activeInfo}
                </div>
            </div>

            </div>

            <div className="ethic-problems">
                

                <div className="problem">
                    <h2>Transparency</h2>
                    <p className="problem-text">
                       Users should understand when and how AI is being used, and what its limitations are.
                    </p>
                </div>

                

                <div className="problem">
                    <h2>Human responsibility</h2>
                    <p className="problem-text">
                       AI does not make moral decisions — humans remain responsible for outcomes.
                    </p>
                </div>

                

            </div>

            <div className="ethic-facit">
                <p className="ethic-facit-text">
                    AI systems do not have values or intentions.
                    Responsibility always lies with the people who design, deploy, and use them.
                </p>
            </div>

        </div>
    )
}

export default Ethics;