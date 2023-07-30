import { BASE_URL } from "../constants";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// date fns
import { formatDistanceToNow } from 'date-fns';
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const response = await fetch(`${BASE_URL}/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.message} (${response.status})`);
    }
    
    dispatch({ type: "DELETE_WORKOUT", payload: json });
    

  };


  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick} >DELETE</span>
    </div>
  );
};

export default WorkoutDetails;
