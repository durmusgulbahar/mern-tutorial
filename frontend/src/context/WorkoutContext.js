import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();
export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT':
            return {
                ...state,
                workouts: [action.payload, ...state.workouts]
            }
        case 'REMOVE_WORKOUT':
            return {
                ...state,

            }
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload,
            }
        case 'DELETE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state;
    }
}
export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, { workouts: [] });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
}
