import { BASE_URL } from "../constants";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
// date fns
import { formatDistanceToNow } from 'date-fns';
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleClick = async () => {

    if(!user){
      return;
    }
    const response = await fetch(`${BASE_URL}/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        } });
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
