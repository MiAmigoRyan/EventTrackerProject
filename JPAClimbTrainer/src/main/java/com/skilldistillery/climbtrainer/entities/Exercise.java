package com.skilldistillery.climbtrainer.entities;

import java.sql.Time;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Exercise {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonIgnore
	@ManyToMany (mappedBy="exercises")
	private List<Workout> workouts;
	
	private String name;
	
	@Column (name="image_url")
	private String image;
	
	@Column(name="video_url")
	private String video;
	
	private String description;
	
	private String type;
	
	private int reps;
	
	private int sets;
	
	private Time duration;
	
	private String dicipline;
	
	public Exercise() {
		super();
	}

	public List<Workout> getWorkouts() {
		return workouts;
	}

	public void setWorkouts(List<Workout> workouts) {
		this.workouts = workouts;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getReps() {
		return reps;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

	public int getSets() {
		return sets;
	}

	public void setSets(int sets) {
		this.sets = sets;
	}

	public Time getDuration() {
		return duration;
	}

	public void setDuration(Time duration) {
		this.duration = duration;
	}

	public String getDicipline() {
		return dicipline;
	}

	public void setDicipline(String dicipline) {
		this.dicipline = dicipline;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Exercise [id=").append(id).append(", workouts=").append(workouts).append(", name=").append(name)
				.append(", image=").append(image).append(", video=").append(video).append(", description=")
				.append(description).append(", type=").append(type).append(", reps=").append(reps).append(", sets=")
				.append(sets).append(", duration=").append(duration).append(", dicipline=").append(dicipline)
				.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, dicipline, duration, id, image, name, reps, workouts, sets, type, video);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Exercise other = (Exercise) obj;
		return Objects.equals(description, other.description) && Objects.equals(dicipline, other.dicipline)
				&& Objects.equals(duration, other.duration) && id == other.id && Objects.equals(image, other.image)
				&& Objects.equals(name, other.name) && reps == other.reps && Objects.equals(workouts, other.workouts)
				&& sets == other.sets && Objects.equals(type, other.type) && Objects.equals(video, other.video);
	}

	
	
	
}
