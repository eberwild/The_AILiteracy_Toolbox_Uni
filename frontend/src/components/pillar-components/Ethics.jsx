import MainHeader from "../../components/MainHeader";
import '../../styles/pillarPages/Ethics.css';
import Ethic from '../../assets/pillarPages/ethic.png';

function Ethics() {

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
                </p>
            </div>

            <div className="ethic-info">

                <p className="ethic-text">
                    AI systems influence decisions in education, healthcare, work, and everyday life.
                    Ethics and responsibility help ensure that AI is used in a way that respects human rights,
                    protects individuals, and benefits society as a whole.
                </p>

                <img src={Ethic} 
                     alt="ethic-overview" 
                     className="ethic-img"
                />

            </div>

            <div className="ethic-problems">
                <div className="problem">
                    <h2>Fairness & Bias</h2>
                    <p className="problem-text">
                       AI systems can produce unfair results if their training data contains biases.
                    </p>
                </div>

                <div className="problem">
                    <h2>Transparency</h2>
                    <p className="problem-text">
                       Users should understand when and how AI is being used, and what its limitations are.
                    </p>
                </div>

                <div className="problem">
                    <h2>Privacy</h2>
                    <p className="problem-text">
                       AI often relies on large amounts of data, making data protection and privacy essential.
                    </p>
                </div>

                <div className="problem">
                    <h2>Human responsibility</h2>
                    <p className="problem-text">
                       AI does not make moral decisions — humans remain responsible for outcomes.
                    </p>
                </div>

                <div className="problem">
                    <h2>Social impact</h2>
                    <p className="problem-text">
                       AI can affect jobs, access to information, and social equality.
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