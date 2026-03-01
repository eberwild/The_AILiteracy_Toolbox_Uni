import MainHeader from "../../components/MainHeader";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../styles/sidePages/ResetPage.css";

function ResetPage() {

    // states
    const [password , setPassword] = useState("");
    const [message , setMessage] = useState("");
    const [visible , setVisible] = useState(false);

    // params out of the URL query string
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    function togglePassword(){
        setVisible(!visible);
    }

    async function changePassword(password , token){
        try {
            const response = await axios.post("http://localhost:5000/api/users/password-change" ,
                { password } , 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage(response.data.message);
        } catch(error) {
            setMessage(error.response?.data?.message || "ServerFehler");
        }
    }

    return(

        <div className="change-page">
            <MainHeader/>
            <div className="change-section">
                <h2>Select a new Passwort:</h2>
                <input type={visible ? 'text' : 'password'}
                        value={password}
                        placeholder="New Password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                />
                <button className='show-button'
                        type='button'
                        onClick={togglePassword}>
                    {visible? "Hide Password" : "Show Password"}
                </button>
                <button className="change-button"
                        onClick={async() => {
                            changePassword(password , token);
                        }}>
                        Change Password
                </button>
                <p className="change-info">{message}</p>
            </div>
            
        </div>
    )
}

export default ResetPage;