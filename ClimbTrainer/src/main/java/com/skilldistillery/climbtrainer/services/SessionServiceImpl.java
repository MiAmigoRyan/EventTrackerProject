package com.skilldistillery.climbtrainer.services;

import java.util.List;
import java.util.Optional;

import com.skilldistillery.climbtrainer.entities.Exercise;
import com.skilldistillery.climbtrainer.entities.Session;
import com.skilldistillery.climbtrainer.repositories.ExerciseRepository;
import com.skilldistillery.climbtrainer.repositories.SessionRepository;

public class SessionServiceImpl implements SessionService {

	private SessionRepository sessionRepo;
	
	private ExerciseRepository exerciseRepo;
	
	@Override
	public List<Session> listAllSessions() {
		return sessionRepo.findAll();
	}

	@Override
	public Session getSession(int sessionId) {
		Session session = null;
		Optional<Session> sessionOpt = sessionRepo.findById(sessionId);
		if(sessionOpt.isPresent()) {
			
		}
		return session;
	}

	@Override
	public Session create(Session newSession) {
		return sessionRepo.saveAndFlush(newSession);
	}

	@Override
	public Session update(int sessionId, Session session) {
		Optional<Session> sessionOpt = sessionRepo.findById(sessionId);
		if(sessionOpt.isPresent()) {
			Session managedSession = sessionOpt.get();
			managedSession.setDate(session.getDate());
			managedSession.setNotes(session.getNotes());
			managedSession.setComplete(session.isComplete());
			managedSession.setExercises(session.getExercises());
			
			return sessionRepo.saveAndFlush(managedSession);
			}
		
		return null;
	}

	@Override
	public boolean delete(int sessionId) {
		boolean deleted = false;
		Optional<Session> sessionOpt = sessionRepo.findById(sessionId);
		if(sessionOpt.isPresent()) {
			Session toDelete = sessionOpt.get();
			sessionRepo.delete(toDelete);
			deleted = true;
		}
		return deleted;
	}

}
