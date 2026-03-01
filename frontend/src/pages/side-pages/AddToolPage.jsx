import MainHeader from "../../components/MainHeader";
import axios from 'axios';
import '../../styles/sidePages/AddToolPage.css';
import { NavLink } from 'react-router';
import { useState , useRef} from 'react';
import { checkToolInput } from "../../utils/toolValidation.js";

function AddToolPage() {

    // input fields from user
    const [toolInput , setToolInput] = useState({
        name: '',
        title: '',
        email: '',
        type: '',
        gitURL: '',
        imgURL: '',
        ageRecom: '',
        description: '',
        consent: false
    });

    // feedback for user in hidden div
    const [ visible , setVisible] = useState(false);
    const [ message , setMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const timerRef = useRef(null);

    function showServerResponse(text) {
        setMessage(text);
        setVisible(true);

        if(timerRef.current){
            clearTimeout(timerRef);
        }

        timerRef.current = setTimeout(() => {
            setVisible(false);
        } , 3000)
    }

    // insert a new tool into the database
    async function insertNewTool(input){
        try {
            const result = await checkToolInput(input);
            if(result.status){
                const token = localStorage.getItem('token');
                const response = await axios.post(`${API_URL}/api/tools` , input ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                if(response.status === 201){
                    await sendEmails(input);
                    showServerResponse(response.data.message);
                }
            } else {
                showServerResponse(result.text);
            }
        } catch(err){
            console.log('Error in submitting tool:' , err.message);
            showServerResponse(err.response.data.message);
        }
    }

    // send emails after a new tool is submitted successfully
    async function sendEmails(input) {
        try {
            const response = await axios.post(`${API_URL}/api/email/submission` , {
                toolTitle: input.title ,
                email: input.email 
            });
            showServerResponse(response.data.message);
        } catch(err) {
            console.log('Error in sendMails function: ' , err.message);
        }
    }

    return(

        <div className="add-tool-page">

            <MainHeader/>

            <div className="addtool-intro-section">
                <h2>Add Your own Tool</h2>
                <div className="addtool-spacer"></div>
                <p className="addtool-intro">
                    Logged-in users can contribute their own AI tools or games by filling out the input fields below.
                    Once submitted, the entry will be reviewed by the admin team. <br/>
                    If approved, the tool will be published on the toolbox page, making it available for all users to explore and play.
                </p>
                <p className="blackboard-info">
                    If you are interested in collaborating with others on an AI tool rather than working alone, you can check the 
                    <NavLink to="/blackboard" className="blackboard-link">
                       {" "} Blackboard page {" "}
                    </NavLink> 
                    to see if anyone is looking for a collaborator. You can also add your own entry to find someone to work with.
                </p>
                <p className="blackboard-info">
                    To submit a tool or access the Blackboard page, please 
                    <NavLink to="/login" className="blackboard-link">
                       {" "} log in {" "}
                    </NavLink>
                    or 
                    <NavLink to="/register" className="blackboard-link">
                       {" "} sign up {" "}
                    </NavLink>.
                </p>
            </div>

            <div className="tool-requirements">
                <h2>Supported Project Types</h2>
                <div className="addtool-spacer"></div>
                <ul style={{lineHeight: 2}}>
                    <li>Plain HTML/CSS/JS </li>
                    <li>Node.js</li>
                    <li>Python Flask</li>
                </ul>
                <NavLink to="/requirements"
                        className="requirements-link"
                >
                    Click here for full requirements! 
                </NavLink>
            </div>

        <div className="provide-tool-section">
            <h1 className="submit-header">Submit Your Tool here!</h1>
            <div className="addtool-spacer"></div>
            <p className="share-text">
                Help us grow the AI Toolbox!  
                Share your interactive game, quiz or teaching tool to help others understand AI concepts in fun and accessible ways.
            </p>

            <div className="intro-steps">
                <div className="intro-step">
                <div className="intro-text"></div>
                <p>1. Fill in the form</p>
                <small>Title, category, and short description</small>
                </div>
                <div className="intro-step">
                <div className="intro-text"></div>
                <p>2. Add your link</p>
                <small>Include GitHub or working version</small>
                </div>
                <div className="intro-step">
                <div className="intro-text"></div>
                <p>3. We feature it</p>
                <small>After review, your tool goes live!</small>
                </div>
            </div>

            <form className="input-form">

                <label htmlFor="name">Your Name/Alias --  (at least 3 characters)</label>
                <input type="text" 
                       id="name"
                       className="user-alias" 
                       placeholder="Enter your name or an alias"
                       value={toolInput.name} 
                       onChange={(event) => {
                            setToolInput({...toolInput , name : event.target.value})
                       }}
                       required/>
                
                <label htmlFor="title">Tool Title* -- (at least 6 characters)</label>
                <input type="text" 
                       id="title"
                       className="tool-name" 
                       placeholder="Enter tool name" 
                       value={toolInput.title}
                       onChange={(event) => {
                            setToolInput({...toolInput , title: event.target.value})
                       }}
                       required />

                <label htmlFor="email">Contact Email*</label>
                <input type="email" 
                       id="email"
                       className="user-email" 
                       placeholder="you@example.com" 
                       value={toolInput.email}
                       onChange={(event) => {
                            setToolInput({...toolInput , email: event.target.value})
                       }}
                       required />

                <label htmlFor="type">Type*</label>
                <select id="type" 
                        name="type" 
                        value={toolInput.type}
                        onChange={(event) => {
                            setToolInput({...toolInput , type: event.target.value})
                        }}
                        required>
                <option value="" disabled selected>Choose one</option>
                <option value="game">Game</option>
                <option value="education">Education</option>
                <option value="quiz">Quiz</option>
                <option value="other">Other</option>
                </select>

                <label htmlFor="github">GitHub Link*</label>
                <input type="url" 
                       id="github"
                       className="github-link" 
                       placeholder="https://github.com/..." 
                       value={toolInput.gitURL}
                       onChange={(event) => {
                            setToolInput({...toolInput , gitURL: event.target.value})
                       }}
                       required />

                <label htmlFor="thumbnailURL">Thumbnail URL</label>
                <input type="url" 
                       id="thumbnailURL"
                       className="thumbnail-URL" 
                       placeholder="https://example.com/image.jpg" 
                       value={toolInput.imgURL}
                       onChange={(event) => {
                            setToolInput({...toolInput , imgURL: event.target.value})
                       }}
                />

                <label htmlFor="ageRecommendation">Age Recommendation*</label>
                <select className="ageRecommendation" 
                        id="ageRecommendation"
                        name="ageRecommendation" 
                        value={toolInput.ageRecom}
                        onChange={(event) => {
                            setToolInput({...toolInput , ageRecom: event.target.value})
                        }}
                        required
                >
                <option value="" disabled selected>Select age range</option>
                <option value="all">All ages</option>
                <option value="5-12">Kids (5-12)</option>
                <option value="13-17">Teens (13-17)</option>
                <option value="18+">Adults (18+)</option>
                </select>

                <label htmlFor="description">Description* -- (at least 15 characters) </label>
                <textarea name="description"
                          id="description"
                          rows="4" 
                          placeholder="Brief description..."
                          className="tool-text-area" 
                          value={toolInput.description}
                          onChange={(event) => {
                                setToolInput({...toolInput , description: event.target.value})
                          }}
                          required>
                </textarea>

                <label className="consent-checkbox">
                <input type="checkbox" 
                       checked={toolInput.consent}
                       onChange={() => {
                            setToolInput({...toolInput , consent: !toolInput.consent})
                       }}
                       required />
                    I consent to my submitted GitHub repository being used on this website.
                </label>

                <div className="server-info"
                    style={{display: visible ? 'block' : 'none' }}>
                    {message}
                </div>

                <button type="button" 
                        className="submit-button"
                        onClick={async () => {

                            await insertNewTool(toolInput);
                                
                        }}
                >
                        Submit
                </button>

            </form>

        </div>

    </div>
    )
}

export default AddToolPage;