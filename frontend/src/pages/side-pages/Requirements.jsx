import MainHeader from "../../components/MainHeader";
import '../../styles/sidePages/Requirements.css';

function Requirements (){

    return(

        <div className="requirements-page">
            <MainHeader/>
            <div className="requirements-section">

                <div className="project-type">
                    <h2>Plain Web Project (HTML/CSS/JS)</h2>
                    <div className="req-spacer"></div>
                    <div className="req-info">
                        <p>For simple browser-based tools and games.</p>
                        <ul className="requirements">
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
                </div>

                <div className="project-type">
                    <h2>Node.js Project</h2>
                    <div className="req-spacer"></div>
                    <div className="req-info">
                        <p>For Javascript backend applications.</p>
                        <ul className="requirements">
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
                </div>

                <div className="project-type">
                    <h2>Python Project (Flask)</h2>
                    <div className="req-spacer"></div>
                    <div className="req-info">
                        <p>For Python-based web applications.</p>
                        <ul className="requirements">
                            <li>A public GitHub repository</li>
                            <li>A requirements.txt file</li>
                            <li>A Flask app (app.py or main.py)</li>
                            <li>The app must listen on 0.0.0.0 and use os.environ.get("PORT")</li>
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
        </div>
    )
}

export default Requirements;