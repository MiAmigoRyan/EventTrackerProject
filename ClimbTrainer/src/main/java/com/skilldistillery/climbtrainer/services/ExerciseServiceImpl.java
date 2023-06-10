package com.skilldistillery.climbtrainer.services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.climbtrainer.entities.Exercise;
import com.skilldistillery.climbtrainer.repositories.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService {
	
	@Autowired
	private ExerciseRepository exerciseRepo;
	
	@Override
	public List<Exercise> listAllExercises() {
		return exerciseRepo.findAll();
	}

	@Override
	public Exercise getExercise(int exerciseId) {
		Exercise exercise = null;
		Optional<Exercise> exerciseOpt = exerciseRepo.findById(exerciseId);
		if(exerciseOpt.isPresent()) {
			exercise= exerciseOpt.get();
		}
		return exercise;
	}

	@Override
	public Exercise create(Exercise newExercise) {
		return exerciseRepo.saveAndFlush(newExercise);
	}

	@Override
	public Exercise update(int exerciseId, Exercise exercise) {
		Optional<Exercise> exerciseOpt = exerciseRepo.findById(exerciseId);
		if(exerciseOpt.isPresent()) {
			Exercise managedExercise = exerciseOpt.get();
			managedExercise.setName(exercise.getName());
			managedExercise.setImage(exercise.getImage());
			managedExercise.setVideo(exercise.getVideo());
			managedExercise.setDescription(exercise.getDescription());
			managedExercise.setType(exercise.getType());
			managedExercise.setDuration(exercise.getDuration());
			managedExercise.setDicipline(exercise.getDicipline());
			
			
			return exerciseRepo.saveAndFlush(managedExercise);
		}
		return null;
	}

	@Override
	public boolean delete(int exerciseId) {
		boolean deleted = false;
		Optional<Exercise> exerciseOpt = exerciseRepo.findById(exerciseId);
		if(exerciseOpt.isPresent()) {
			Exercise toDelete = exerciseOpt.get();
			exerciseRepo.delete(toDelete);
			deleted = true;
		}
		return deleted;
	}

}
