const express = require('express');
const { createWorkout, getAllWorkout, getAWorkout, deleteWorkout, updateWorkout } = require('../controllers/WorkoutController');
const router = express.Router();

// GET all workouts
router.get('/',getAllWorkout);

// GET a workout by id
router.get('/:id',getAWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout by id

router.delete('/:id', deleteWorkout);

// UPDATE a workout by id

router.patch('/:id',updateWorkout);


module.exports = router;