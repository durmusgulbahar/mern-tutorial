import {useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { BASE_URL } from '../constants';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
const Home = () => {
    const { workouts, dispatch } = useWorkoutContext();
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${BASE_URL}/api/workouts`);
            const json = await response.json();
            if(!response.ok) {
                throw new Error(`${json.message} (${response.status})`);
            };
            dispatch({type:"SET_WORKOUTS",payload: json});
            
        }   
        fetchWorkouts();
    }, [dispatch]);

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