package com.skilldistillery.climbtrainer.entities;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;


@Entity
public class Workout {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToMany
	@JoinTable(name="exercise_has_training_session",
	joinColumns = @JoinColumn(name="training_session_id"),
	inverseJoinColumns = @JoinColumn(name="exercise_id"))
	private List<Exercise> exercises;
	
	private Date date;
	
	private String notes;

	public List<Exercise> getExercises() {
		return exercises;
	}
	public void setExercises(List<Exercise> exercises) {
		this.exercises = exercises;
	}

	private boolean complete;
	
	public Workout() {
		super();
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(boolean complete) {
		this.complete = complete;
	}

	
	
	@Override
	public int hashCode() {
		return Objects.hash(complete, date, exercises, id, notes);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Workout other = (Workout) obj;
		return complete == other.complete && Objects.equals(date, other.date)
				&& Objects.equals(exercises, other.exercises) && id == other.id && Objects.equals(notes, other.notes);
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Session [id=").append(id).append(", exercises=").append(exercises).append(", date=")
				.append(date).append(", notes=").append(notes).append(", complete=").append(complete).append("]");
		return builder.toString();
	}

}
