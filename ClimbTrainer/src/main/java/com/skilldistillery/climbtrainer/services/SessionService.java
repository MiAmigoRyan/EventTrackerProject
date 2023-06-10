package com.skilldistillery.climbtrainer.services;

import java.util.List;

import com.skilldistillery.climbtrainer.entities.Exercise;
import com.skilldistillery.climbtrainer.entities.Session;

public interface SessionService {
	
	List<Session> listAllSessions();
	Session getSession(int sessionId);
	Session create(Session newSession);
	Session update(int sessionId, Session session);
	boolean delete(int sessionId);

}
