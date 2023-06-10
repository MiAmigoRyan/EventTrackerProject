package com.skilldistillery.climbtrainer.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SessionTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Session session;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	emf=Persistence.createEntityManagerFactory("JPAClimbTrainer");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
	em= emf.createEntityManager();
	session = em.find(Session.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		session = null;
	}

	@Test
	void test() {
		assertNotNull(session);
		assertEquals("wrecked! rough session", session.getNotes());
	}

}
