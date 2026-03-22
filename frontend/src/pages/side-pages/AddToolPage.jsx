import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
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
        tags: '',
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
            clearTimeout(timerRef.current);
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
                const response = await axios.post(`${API_URL}/api/tools` , input );
                if(response.status === 201){
                    await sendEmails(input);
                    showServerResponse(response.data.message);
                }
            } else {
                showServerResponse(result.text);
            }
        } catch(err){
            console.log('Error in submitting tool:' , err.message);
            
            const fallbackMessage =
                err.response?.data?.message || 'Demo Mode: Tool has been submitted';

            showServerResponse(fallbackMessage);
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

            <div className="provide-tool-section">
            <h1 className="submit-header">Submit Your Tool here!</h1>
            <div className="addtool-spacer"></div>
            <p className="share-text">
                Help us grow the AI Toolbox!  
                Share your interactive game, quiz or teaching tool to help others understand AI concepts in fun and accessible ways.
                Once submitted, the entry will be reviewed by the admin team. <br/>
                If approved, the tool will be published on the toolbox page, making it available for all users to explore and play.
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
                <small>Include GitHub Link with working version</small>
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

                <label htmlFor="tags">Tags -- (comma seperated)</label>
                <input id="tags" 
                        type="tags"
                        name="tags" 
                        value={toolInput.tags}
                        onChange={(event) => {
                            setToolInput({...toolInput , tags: event.target.value})
                        }}
                        required>
                </input>

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
                <option value="" disabled>Select age range</option>
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

                            //await insertNewTool(toolInput);
                            const result = await checkToolInput(toolInput);
                            if(result.status){
                                showServerResponse('Demo Mode : ToolInput checked and emails would have been send.')
                            } else {
                                showServerResponse(result.text);
                            }
                                
                        }}
                >
                        Submit
                </button>

            </form>

        </div>

            <div className="tool-requirements">
                <h2>Supported Project Types</h2>
                <div className="addtool-spacer"></div>
                    <div className="requirements">

                        <div className="req">
                            <div className="req-header">Plain HTML/CSS/JS </div>
                            <div className="req-info">For simple browser-based tools and games.</div>
                            <ul className="req-data">
                                <li>A public GitHub repository</li>
                                <li>An index.html file in the root directory</li>
                                <li>No backend required</li>
                                <li>All assets must be included in the repository</li>
                            </ul>
                            <div className="example-code">
                            <p>Example:</p>
                            <pre>
                                <code>
{`project/
 ├── index.html
 ├── style.css
 ├── script.js`}
                                </code>
                            </pre>
                        </div>
                        </div>

                        <div className="req">
                            <div className="req-header">Node.js </div>
                            <div className="req-info">For Javascript backend applications.</div>
                            <ul className="req-data">
                                <li>A public GitHub repository</li>
                                <li>A package.json file in the root directory</li>
                                <li>A valid start script inside package.json</li>
                                <li>The app must listen on process.env.PORT</li>
                            </ul>
                            <div className="example-code">
                            <p>Example:</p>
                            <pre>
                                <code>
{`const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
});`}
                                </code>
                            </pre>
                        </div>
                        </div>

                        <div className="req">
                            <div className="req-header">Python Flask </div>
                            <div className="req-info">For Python-based web applications.</div>
                            <ul className="req-data">
                                <li>A public GitHub repository</li>
                                <li>A requirements.txt file</li>
                                <li>A Flask app (app.py or main.py)</li>
                                <li>The app must listen on 0.0.0.0 and <br/> use os.environ.get("PORT")</li>
                            </ul>
                            <div className="example-code">
                            <p>Example:</p>
                            <pre>
                                <code>
{`import os
from flask import Flask

app = Flask(__name__)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)`}
                                </code>
                            </pre>
                        </div>
                        </div>
                    </div>
                
            </div>

            <Footer/>

    </div>
    )
}

export default AddToolPage;