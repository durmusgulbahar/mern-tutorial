const express = require('express');
const { createWorkout, getAllWorkout, getAWorkout, deleteWorkout, updateWorkout } = require('../controllers/WorkoutController');

const requireAuth = require('../middlewares/requireAuth');


const router = express.Router();

//require authentication for all routes
router.use(requireAuth);

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