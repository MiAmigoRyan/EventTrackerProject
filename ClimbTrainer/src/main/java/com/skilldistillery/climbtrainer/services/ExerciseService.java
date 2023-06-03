package com.skilldistillery.climbtrainer.services;

import java.util.List;

import com.skilldistillery.climbtrainer.entities.Exercise;

public interface ExerciseService {

	List<Exercise> listAllExercises();
	Exercise getExercise(int exerciseId);
	Exercise create(Exercise newExercise);
	Exercise update(int exerciseId, Exercise exercise);
	boolean delete(int exerciseId);
}
