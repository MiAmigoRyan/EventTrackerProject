package com.skilldistillery.climbtrainer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.climbtrainer.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {

}
