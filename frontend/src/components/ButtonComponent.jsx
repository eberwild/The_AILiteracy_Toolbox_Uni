import { useNavigate } from "react-router-dom";
import '../styles/components/Buttons.css';

function ButtonComponent(){

    // useNavigate -> easy navigation between different pages
    const navigate = useNavigate();

    return (
        <div className="button-component">

                <div className="button-section">
                    <button className="signup-button"
                    onClick={() => {
                        navigate('/register');
                    }}>
                    Sign up
                    </button>

                    <button className="login-button"
                    onClick={() => {
                        navigate('/login');
                    }}>
                        Log in
                    </button>
                </div>
                
        </div>
            
    )
   
}

export default ButtonComponent;