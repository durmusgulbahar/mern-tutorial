import {useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { BASE_URL } from '../constants';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
const Home = () => {
    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${BASE_URL}/api/workouts`
             , {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
             }});
            const json = await response.json();
            if(!response.ok) {
                throw new Error(`${json.message} (${response.status})`);
            };
            dispatch({type:"SET_WORKOUTS",payload: json});
            
        }   
        if(user){
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                    )
                    )
                }
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;