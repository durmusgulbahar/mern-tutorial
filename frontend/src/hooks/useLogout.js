import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { BASE_URL } from "../constants";
import { useWorkoutContext } from "./useWorkoutContext";
export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const { dispatch: dispatchWorkout} = useWorkoutContext();
    const logout = async () => {

        try {
            localStorage.removeItem("user");

            //update the auth context
            dispatch({ type: "LOGOUT" });
            dispatchWorkout({type:"SET_WORKOUTS", payload: null});
        } catch (error) {
            setError(error.message);
        }

    }

    return { error, logout };
}