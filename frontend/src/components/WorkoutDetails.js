

const WorkoutDetails = ({ workout }) => {
    let date = new Date(workout.createdAt);
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>Created At: {date.toLocaleString()}</p>
        </div>
    )
}

export default WorkoutDetails;