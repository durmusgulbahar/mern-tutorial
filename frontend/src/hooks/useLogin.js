import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { BASE_URL } from "../constants";

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false); // [1]
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch(`${BASE_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
                const json = await response.json();
                if (!response.ok) {
                    throw new Error(`${json.message} (${response.status})`);
                }
                
                localStorage.setItem("user", JSON.stringify(json));   
                
                //update the auth context
                dispatch({type:"LOGIN", payload: json});

                setIsLoading(false);

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
       
    }

    return { isLoading, error, handleLogin };
}
