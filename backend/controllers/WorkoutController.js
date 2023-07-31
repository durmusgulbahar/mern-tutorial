const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');
//get all workouts
const getAllWorkout=async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}
//get a single workout
const getAWorkout= async (req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Object id not valid"});
    }
    const workout = await Workout.findById(id);

    if(!workout){
        res.status(404).json({error: "Workout not found"});
    }

    res.status(200).json(workout);
}
//create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
  
    //add doc to db
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, reps, load, user_id });
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//delete a workout
const deleteWorkout= async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

//update a workout
const updateWorkout= async (req, res) => {
    const {id} = req.params;
    const { title, reps, load } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Object id not valid"});
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});
    if(!workout){
        return res.status(404).json({error: "Workout not found"});
    }
    res.status(200).json({msg: `Updated workout with id ${id}`});
}

module.exports = {
    createWorkout,
    getAllWorkout,
    getAWorkout,
    deleteWorkout,
    updateWorkout
}