package com.skilldistillery.climbtrainer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.climbtrainer.entities.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer>{

	
}
