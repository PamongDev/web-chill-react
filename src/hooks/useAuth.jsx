import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function useAuth(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    useEffect(()=> {
        const sessionData = localStorage.getItem('userLoggedIn');
        if(sessionData){
            setUser(JSON.parse(sessionData));   
        } else{
            navigate("/sign-in");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        navigate("/sign-in");
    }

    return { user, handleLogout };
}

