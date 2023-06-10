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

import com.skilldistillery.climbtrainer.entities.Session;
import com.skilldistillery.climbtrainer.services.SessionService;

@RestController
@RequestMapping("api")
public class SessionController {

	@Autowired
	private SessionService	sessionService;
	
	@GetMapping("workouts")
	public List<Session> listSessions(){
		return sessionService.listAllSessions();
	}
	
	@GetMapping("workouts/{workoutId}")
	public Session getSession(
			@PathVariable("workoutId") Integer sessionId,
			HttpServletResponse res
			) {
			Session session = sessionService.getSession(sessionId);
			if(session==null) {
				res.setStatus(400);
			}
			return session;
	}
	
	@PostMapping("workouts")
	public Session addWorkout(
		@RequestBody Session newSession,
		HttpServletRequest req,
		HttpServletResponse res
		) {
		try {
			newSession = sessionService.create(newSession);
			if(newSession == null) {
				res.setStatus(400);
			} else {
				res.setStatus(200);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(newSession.getId());
				res.setHeader("Location", url.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			newSession=null;
		}
		return newSession;
	}
	
	@PutMapping("workouts/{workoutId}")
	public Session updateSession(
			@RequestBody Session session,
			@PathVariable ("workoutId") Integer sessionId,
			HttpServletResponse res
			) {
		try {
			session = sessionService.update(sessionId, session);
			if(session == null) {
				res.setStatus(400);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			session=null;
		}
		return session;
	}
	
	@DeleteMapping ("workouts/{workoutId}")
	public void deleteSession(
			@PathVariable("workoutId") Integer sessionId,
			HttpServletResponse res
			) {
			if(sessionService.delete(sessionId)) {
				res.setStatus(200);
			}else {
				res.setStatus(400);
			}
		
	}
	
	
}
