package com.skilldistillery.climbtrainer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.climbtrainer.entities.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

}
