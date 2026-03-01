import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/components/BlackboardEntry.css';

function BlackboardEntry({ id , email , message , created_at , userID}) {

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    let currentUserId ;

    if(token){
        const decoded = jwtDecode(token);
        currentUserId = decoded?.id ? Number(decoded.id) : null;
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/api/blackboard/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); // quick & dirty reload 
        } catch (err) {
            console.log("Delete error:", err.message);
        }
    };

    return(

        <>
            <div className="blackboard-entry">
                    <div className="user-email">
                        From: {email}
                    </div>

                    <div className="user-text">
                        {message} 
                    </div>

                    <div className='bottom-section'>

                        {currentUserId && userID && Number(currentUserId) === Number(userID) && (
                        <button className='delete-button'
                            onClick={handleDelete}>
                            Delete
                        </button>
                        )}

                        <div className="user-time">
                            {created_at}
                        </div>

                    </div>
                
            </div>
        </>
    )
}

export default BlackboardEntry;