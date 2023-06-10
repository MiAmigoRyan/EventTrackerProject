package com.skilldistillery.climbtrainer.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.climbtrainer.entities.Workout;
import com.skilldistillery.climbtrainer.services.WorkoutService;

@RestController
@RequestMapping("api")
public class WorkoutController {

	@Autowired
	private WorkoutService	workoutService;
	
	@GetMapping("/workouts")
	public List<Workout> listSWorkout(){
		return workoutService.listAllWorkouts();
	}
	
	@GetMapping("workouts/{workoutId}")
	public Workout getWorkout(
			@PathVariable("workoutId") Integer workoutId,
			HttpServletResponse res
			) {
			Workout workout = workoutService.getWorkout(workoutId);
			if(workout==null) {
				res.setStatus(400);
			}
			return workout;
	}
	
	@PostMapping("workouts")
	public Workout addWorkout(
		@RequestBody Workout newWorkout,
		HttpServletRequest req,
		HttpServletResponse res
		) {
		newWorkout = workoutService.create(newWorkout);
		try{	
		if(newWorkout == null) {
				res.setStatus(400);
			} else {
				res.setStatus(200);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(newWorkout.getId());
				res.setHeader("Location", url.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			newWorkout=null;
		}
		return newWorkout;
	}
	
	@PutMapping("workouts/{workoutId}")
	public Workout updateWorkout(
			@RequestBody Workout workout,
			@PathVariable ("workoutId") Integer workoutId,
			HttpServletResponse res
			) {
		try {
			workout = workoutService.update(workoutId, workout);
			if(workout == null) {
				res.setStatus(400);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			workout=null;
		}
		return workout;
	}
	
	@DeleteMapping ("workouts/{workoutId}")
	public void deleteWorkout(
			@PathVariable("workoutId") Integer workoutId,
			HttpServletResponse res
			) {
			if(workoutService.delete(workoutId)) {
				res.setStatus(200);
			}else {
				res.setStatus(400);
			}
		
	}
	
	
}
