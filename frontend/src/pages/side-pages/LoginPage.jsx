import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { useRef, useState } from 'react';
import MainHeader from "../../components/MainHeader";
import '../../styles/sidePages/LoginPage.css';
import { checkLoginInput } from '../../utils/loginValidation.js';

function LoginPage() {

// state to track ot passwort is shown or not
const [show , setShow] = useState(false);

const [ message , setMessage ] = useState('');
const [ visible , setVisible ] = useState(false);

const timerRef = useRef(null);

const loginNavigate = useNavigate();

// state to track the input value the user made
const [loginData , setLoginData] = useState({
    userEmail : '',
    userPassword : ''
})

// toggles passwort visibility
function changeVisibility(){
    setShow(!show);
}

// show quick toast with server repsonse
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

// function to login an existing user 
async function loginUser(){
    
    try{
        const response = await axios.post('http://localhost:5000/api/users/login' , {
            email: loginData.userEmail,
            password : loginData.userPassword
        });
        if(response.status === 200){
            localStorage.setItem('token' , response.data.token);
            loginNavigate('/add-tool');
        } 
    }catch(err){
        // axios stores errors >=400 in err.response
        if(err.response) {
            console.error('Error from server' , err.response.data.message);
            showServerResponse(err.response.data.message);
        } 
    }
}

    return(

        <>
        <div className="login-page">
            <MainHeader/>

            <div className="login-section">
            <h2>Login</h2>
                <input type="text"
                        placeholder='Email'
                        value={loginData.userEmail}
                        onChange={(event) => {
                            setLoginData({...loginData , userEmail: event.target.value});
                        }}  />

                <input type={show ? 'text' : 'password'}
                       placeholder='Password'
                       value={loginData.userPassword}
                       onChange={(event) => {
                        setLoginData({...loginData , userPassword: event.target.value});
                       }} />
                <button className='show-button'
                        type='button'
                        onClick={changeVisibility}>
                    {show? "Hide Password" : "Show Password"}
                </button>
                <button className='login-button'
                        onClick={async () => {
                            const result = checkLoginInput(loginData);
                            if(result.status){
                                await loginUser();
                            } else {
                                showServerResponse(result.text);
                            }
                            
                        }}
                >
                    Login
                </button>

                <div className="server-info"
                    style={{display: visible ? 'block' : 'none' }}>
                    {message}
                </div>
            </div>

            <div className='login-links'>
                <p>
                    No account yet ?{" "} 
                    <Link to="/register"
                          className='register-link'>
                            Sign Up here!
                    </Link>
                </p>

                <p>
                    Forgot Your Password? {" "} 
                    <Link to='/reset-request'
                          className='reset-link'>
                        Click here!
                    </Link>
                </p>
            </div>
            

        </div> 
        </>
    )
}

export default LoginPage;