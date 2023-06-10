package com.skilldistillery.climbtrainer.services;

import java.util.List;

import com.skilldistillery.climbtrainer.entities.Exercise;
import com.skilldistillery.climbtrainer.entities.Workout;

public interface WorkoutService {
	
	List<Workout> listAllWorkouts();
	Workout getWorkout(int workoutId);
	Workout create(Workout newWorkout);
	Workout update(int workoutId, Workout workout);
	boolean delete(int workoutId);

}
