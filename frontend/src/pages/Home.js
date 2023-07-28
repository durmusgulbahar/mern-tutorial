import { useState, useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
const Home = () => {
    const[workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(('/api/workouts'));
            const json = await response.json();
            if(!response.ok) {
                throw new Error(`${json.message} (${response.status})`);
            };
            setWorkouts(json);
        }   
        fetchWorkouts();
    }, []);

    return (
        <div className="Home">
       
            <h1>Home</h1>
            <div className="workouts">
                {
                    workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Home;