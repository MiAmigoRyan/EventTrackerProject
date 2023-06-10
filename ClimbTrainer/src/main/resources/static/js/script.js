window.addEventListener('load', function(e) {

	console.log('js loaded with event function');

	init();
});

function init() {
	configButtons();
	getExercises();
	
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
	let updateButton = document.createElement('button');
	updateButton.textContent = 'Update';
	updateForm.appendChild(nameLabel);
	updateForm.appendChild(nameInput);
	updateForm.appendChild(updateButton);
	updateForm.addEventListener('submit', function(e) {
		e.preventDefault();
		let updatedName = nameInput.value;
		if (!updatedName) {
			//error message
			console.log('updated Exercise is null!')
			return;
		}
		let updatedExercise = {
			id: exerciseId,
			name: updatedName
		};
		sendUpdateRequest(exerciseId, updatedExercise);
	});
	let dataDiv = document.getElementById('exerciseData');
	dataDiv.textContext = '';
	dataDiv.appendChild(updateForm);
}

function configCreateButton(){
	
	//ADD EXERCISE
	document.newExerciseForm.submit.addEventListener('click', function(e){
		e.preventDefault();
		createExercise(newExercise());
		
	}); 
}


function configSearchButton(){
	//EXERCISE SEARCH BY ID	
	let searchBtn = document.getElementsByName('searchById')[0];
	searchBtn.textContent = 'Search Exercises';
	searchBtn.addEventListener('click', function(e) {
		e.preventDefault();
		let exerciseId = document.exerciseSearchForm.exerciseId.value;
		console.log(exerciseId);
		
		if (!isNaN(exerciseId) && exerciseId > 0) {
			getExerciseById(exerciseId);
		}		
	}); 
	
}

function getExercises() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '/api/exercises');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let exercises = JSON.parse(xhr.responseText);
				console.log(exercises);
				displayExercises(exercises);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
				//TODO : displayError('ERROR MESSAGE')
			}
		}
	};
	xhr.send();
};

function getExerciseById(exerciseId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '/api/exercises/' + exerciseId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let exercise = JSON.parse(xhr.responseText);
				console.log(exercise);
				displaySingleExercise(exercise);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
				//TODO : displayError('ERROR MESSAGE')		
			}
		}
	}
	xhr.send();
};

function displayExercises(exercises) {

	let dataDiv = document.getElementById('exerciseData');
	dataDiv.textContent = '';

	let exerciseList = document.createElement('ul');

	exercises.forEach(function(value) {
		let li = document.createElement('li');
		li.textContent = `${value.name}`;
		exerciseList.appendChild(li);

		let deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.classList.add('btn');
		deleteButton.classList.add('btn-danger');

		let updateButton = document.createElement('button');
		updateButton.textContent = 'Update';
		updateButton.classList.add('btn');
		updateButton.classList.add('btn-primary');

		li.appendChild(deleteButton);
		li.appendChild(updateButton);
		exerciseList.appendChild(li);

		// event listeners for delete and update buttons
		deleteButton.addEventListener('click', function() {
			deleteExercise(value.id);
		});

		updateButton.addEventListener('click', function() {
			updatedExercise(value.id);
		});
	});

	dataDiv.appendChild(exerciseList);
};

function displaySingleExercise(exercise) {
	let dataDiv = document.getElementById('exerciseData');

	let singleExercise = document.createElement('ul');
	let name = document.createElement('li');
	name.textContent = 'exercise name : ' + exercise.name;
	singleExercise.appendChild(name);

	dataDiv.appendChild(singleExercise);

	//make delete button separate function???
	let delForm = document.createElement("p");

	let exerciseIdInput = document.createElement('input');
	exerciseIdInput.type = 'hidden';
	exerciseIdInput.name = 'exercrciseId';
	exerciseIdInput.value = exercise.id;
	delForm.appendChild(exerciseIdInput);

	dataDiv.appendChild(delForm);
	let delButton = document.createElement('button');
	delButton.textContent = 'delete this exercise';
	delButton.classList.add('btn');
	delButton.classList.add('btn-danger');
	dataDiv.appendChild(delButton);

	delButton.addEventListener('click', function(e) {
		e.preventDefault();
		let exerciseId = document.delForm.exerciseId.value;
		deleteExercise(exerciseId);
	});
}

function newExercise() {

	let newExercise = {
		name: document.newExerciseForm.name.value
	};
	return newExercise;
};

function createExercise(newExercise) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/exercises');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('newExercise created :' + newExercise);
				//displaySingleExercise(newExercise);
				getExercises();
			} else {
				console.error('error creating exercise', xhr.status, xhr.responseText);
				//TODO ERROR MESSAGE
			}
		}
	}
	xhr.send(JSON.stringify(newExercise))
};

function deleteExercise(exerciseId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/exercises/' + exerciseId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				console.log('delete success');
				let exerciseDiv = document.getElementById('exerciseData');
				exerciseDiv.textContent = '';
				getExercises();
			} else {
				console.error('error deleting exercise', xhr.status, xhr.responseText)

			}
		}
	}
	xhr.send();
}

function updatedExercise(exerciseId) {
	let updateForm = document.createElement('form');

	let nameLabel = document.createElement('label');
	nameLabel.textContext = 'Name :';

	let nameInput = document.createElement('input');
	nameInput.type = 'text';
	nameInput.name = 'name';
	nameInput.required = true;

	let updateButton = document.createElement('button');
	updateButton.textContent = 'Update';

	updateForm.appendChild(nameLabel);
	updateForm.appendChild(nameInput);
	updateForm.appendChild(updateButton);

	updateForm.addEventListener('submit', function(e) {
		e.preventDefault();

		let updatedName = nameInput.value;
		if (!updatedName) {
			//error message
			console.log('updated Exercise is null!')
			return;
		}
		let updatedExercise = {
			id: exerciseId,
			name: updatedName
		};

		sendUpdateRequest(exerciseId, updatedExercise);
	});
	let dataDiv = document.getElementById('exerciseData');	
	dataDiv.textContext = '';
	dataDiv.appendChild(updateForm);

}

function sendUpdateRequest(exerciseId, updatedExercise) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/exercises/' + exerciseId);
	xhr.setRequestHeader('Content-Type', 'application/json');


	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('update success' + updatedExercise);
				displaySingleExercise(updatedExercise);
				getExercises();
			} else {
				console.error('error updating exercise', xhr.status, xhr.responseText);
			}
		}
	}
	xhr.send(JSON.stringify(updatedExercise));

}

