package com.skilldistillery.climbtrainer.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.climbtrainer.entities.Exercise;
import com.skilldistillery.climbtrainer.services.ExerciseService;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class ExerciseController {
	
	@Autowired
	private ExerciseService exerciseService;
	
	@GetMapping("exercises")
	public List<Exercise> listExercises(){
		return exerciseService.listAllExercises();
	}
	
	@GetMapping("exercises/{exerciseId}")
	public Exercise getExercise( 
		@PathVariable("exerciseId") Integer exerciseId,
		HttpServletResponse res
		) {
		Exercise exercise = exerciseService.getExercise(exerciseId);
		if(exercise==null) {
			res.setStatus(400);
		}
		return exercise;
	}
	
	@PostMapping("exercises")
	public Exercise addExercise(
			@RequestBody Exercise newExercise,
			HttpServletRequest req,
			HttpServletResponse res
			) {
			try {
				newExercise = exerciseService.create(newExercise);
				if(newExercise==null) {
					res.setStatus(400);
				}else {
					res.setStatus(200);
					StringBuffer url = req.getRequestURL();
					url.append("/").append(newExercise.getId());
					res.setHeader("Location", url.toString());
				}
			} catch (Exception e) {
				e.printStackTrace();
				res.setStatus(400);
				newExercise=null;
			}
			return newExercise;
	}
	
	@PutMapping("exercises/{exerciseId}")
	public Exercise updateExercise(
			@RequestBody Exercise exercise,
			@PathVariable("exerciseId") Integer exerciseId,
			HttpServletResponse res				
			) {
			try {
				exercise = exerciseService.update(exerciseId, exercise);
				if (exercise == null) {
					res.setStatus(400);
				}
			} catch (Exception e) {
				e.printStackTrace();
				res.setStatus(400);
				exercise=null;
			}
			
		return exercise;
		
	}
	
	@DeleteMapping("exercises/{exerciseId}")
	public void deleteExercise(
			@PathVariable("exerciseId") Integer exerciseId,
			HttpServletResponse res
			) {
			if(exerciseService.delete(exerciseId)) {
				res.setStatus(200);
			}else {
				res.setStatus(400);
			}
		return ;
		
	}
}
