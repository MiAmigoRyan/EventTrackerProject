package com.skilldistillery.climbtrainer.services;

import java.util.List;
import java.util.Optional;

import com.skilldistillery.climbtrainer.entities.Exercise;
import com.skilldistillery.climbtrainer.entities.Workout;
import com.skilldistillery.climbtrainer.repositories.ExerciseRepository;
import com.skilldistillery.climbtrainer.repositories.WorkoutRepository;

public class WorkoutServiceImpl implements WorkoutService {

	private WorkoutRepository workoutRepo;
	
	private ExerciseRepository exerciseRepo;
	
	@Override
	public List<Workout> listAllWorkouts() {
		return workoutRepo.findAll();
	}

	@Override
	public Workout getWorkout(int workoutId) {
		Workout workout = null;
		Optional<Workout> workoutOpt = workoutRepo.findById(workoutId);
		if(workoutOpt.isPresent()) {
			
		}
		return workout;
	}

	@Override
	public Workout create(Workout newWorkout) {
		return workoutRepo.saveAndFlush(newWorkout);
	}

	@Override
	public Workout update(int workoutId, Workout workout) {
		Optional<Workout> workoutOpt = workoutRepo.findById(workoutId);
		if(workoutOpt.isPresent()) {
			Workout managedWorkout = workoutOpt.get();
			managedWorkout.setDate(workout.getDate());
			managedWorkout.setNotes(workout.getNotes());
			managedWorkout.setComplete(workout.isComplete());
			managedWorkout.setExercises(workout.getExercises());
			
			return workoutRepo.saveAndFlush(managedWorkout);
			}
		
		return null;
	}

	@Override
	public boolean delete(int workoutId) {
		boolean deleted = false;
		Optional<Workout> workoutOpt = workoutRepo.findById(workoutId);
		if(workoutOpt.isPresent()) {
			Workout toDelete = workoutOpt.get();
			workoutRepo.delete(toDelete);
			deleted = true;
		}
		return deleted;
	}

}
