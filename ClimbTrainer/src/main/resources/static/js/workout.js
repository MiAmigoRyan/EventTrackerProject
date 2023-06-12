window.addEventListener('load', function(e) {

	console.log('js loaded with event function');

	init();
});

function init() {
	configButtons();
	getWorkouts();
	
}


function configButtons(){
	configSearchButton();
	configCreateButton();
	
	//configDeleteButton();
	
	//configUpdateButton();
	
}

function getBr(){
	return document.createElement('br')
}

function getHeader(levelHeader, textContent ){
	
//TODO ::	document.createElement('h'+levelHeader)
// textContent
}

function configDeleteButton(){
	
}

function configUpdateButton(){

}

function configCreateButton(){
	
	//ADD EXERCISE
	document.newWorkoutForm.submit.addEventListener('click', function(e){
		e.preventDefault();
		createWorkout(newWorkout());
		
	}); 
}


function getWorkouts() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/workouts');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let workouts = JSON.parse(xhr.responseText);
				console.log(workouts);
				displayWorkouts(workouts);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
				//TODO : displayError('ERROR MESSAGE')
			}
		}
	};
	xhr.send();
};

function getWorkoutById(workoutId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/workouts/' + workoutId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let workout = JSON.parse(xhr.responseText);
				console.log(workout);
				displaySingleWorkout(workout);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
				//TODO : displayError('ERROR MESSAGE')		
			}
		}
	}
	xhr.send();
};

function displayWorkouts(workouts) {

};

function displaySingleWorkout(workout) {
	let dataDiv = document.getElementById('workoutData');

	let singleWorkout = document.createElement('ul');
	let name = document.createElement('li');
	name.textContent = 'workout name : ' + workout.name;
	singleWorkout.appendChild(name);

	dataDiv.appendChild(singleWorkout);

	//make delete button separate function???
	let delForm = document.createElement("p");

	let workoutIdInput = document.createElement('input');
	workoutIdInput.type = 'hidden';
	workoutIdInput.name = 'workoutId';
	workoutIdInput.value = workout.id;
	delForm.appendChild(workoutIdInput);

	dataDiv.appendChild(delForm);
	let delButton = document.createElement('button');
	delButton.textContent = 'delete this workout';
	delButton.classList.add('btn');
	delButton.classList.add('btn-danger');
	dataDiv.appendChild(delButton);

	delButton.addEventListener('click', function(e) {
		e.preventDefault();
		let workoutId = document.delForm.workoutId.value;
		deleteWorkout(workoutId);
	});
}

function newWorkout() {

	let newWorkout = {
		name: document.newWorkoutForm.name.value
	};
	return newWorkout;
};

function createWorkout(newWorkout) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/workouts');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('newWorkout created :' + newWorkout);
				
				getWorkouts();
			} else {
				console.error('error creating workout', xhr.status, xhr.responseText);
				//TODO ERROR MESSAGE
			}
		}
	}
	xhr.send(JSON.stringify(newWorkout))
};

function deleteWorkout(workoutId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/workouts/' + workoutId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				console.log('delete success');
				let workoutDiv = document.getElementById('workoutData');
				workoutDiv.textContent = '';
				getWorkouts();
			} else {
				console.error('error deleting workout', xhr.status, xhr.responseText)

			}
		}
	}
	xhr.send();
}

function updatedWorkout(workoutId) {

}

function sendUpdateRequest(workoutId, updatedWorkout) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/workouts/' + workoutId);
	xhr.setRequestHeader('Content-Type', 'application/json');


	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('update success' + updatedWorkout);
				displaySingleWorkout(updatedWorkout);
				getWorkouts();
			} else {
				console.error('error updating workout', xhr.status, xhr.responseText);
			}
		}
	}
	xhr.send(JSON.stringify(updatedWorkout));

}

