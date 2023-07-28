import React, { useState } from 'react'
import { BASE_URL } from '../constants';
const WorkoutForm = () => {

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent to refrest the page
        const workout = { title, load, reps };
        const response = await fetch(`${BASE_URL}/api/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
        alert('Workout added successfully');
        window.location.reload();
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

        </form>
    )
}

export default WorkoutForm;