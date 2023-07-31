import React, { useState } from 'react'
import { BASE_URL } from '../constants';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent to refrest the page
        if(!user){
            setError("You must logged in");
            return;
        }
        
        const workout = { title, load, reps };
        const response = await fetch(`${BASE_URL}/api/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(`${json.message} (${response.status})`);
        }

        setTitle('');
        setLoad('');
        setReps('');

        dispatch({ type: 'ADD_WORKOUT', payload: json });
     
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Workout Title:</label>
            <input type="text" onChange={
                e => setTitle(e.target.value)
            } value={title} />


            <label>Load (Kg):</label>
            <input type="number" onChange={
                e => setLoad(e.target.value)
            } value={load} />


            <label>Reps:</label>
            <input type="number" onChange={
                e => setReps(e.target.value)
            } value={reps} />

            <button type="submit">Add Workout</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default WorkoutForm;