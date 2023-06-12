window.addEventListener('load', function(e) {

	console.log('js loaded with event function');

	init();
});

function init() {
	getExercises();	
}

function getExercises() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/exercises');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let exercises = JSON.parse(xhr.responseText);
				console.log(exercises);
				exerciseTable(exercises);
				//displayExercises(exercises);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
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

function exerciseTable(exercises) {
 console.log(exercises);
  let dataDiv = document.getElementById('exerciseData');
  dataDiv.textContent = '';

  let exerciseTable = document.createElement('table');
  exerciseTable.classList.add('table');

  let thead = document.createElement('thead');
  let headerRow = document.createElement('tr');
  thead.appendChild(headerRow);

  let nameHeader = document.createElement('th');
  nameHeader.textContent = 'Exercise Name';
  headerRow.appendChild(nameHeader);

  let repsHeader = document.createElement('th');
  repsHeader.textContent = 'reps';
  headerRow.appendChild(repsHeader);
  
  let setsHeader = document.createElement('th');
  setsHeader.textContent = 'sets';
  headerRow.appendChild(setsHeader);
  
  let totalRepsHeader = document.createElement('th');
  totalRepsHeader.textContext = 'total reps';
  headerRow.appendChild(totalRepsHeader);
  
  let descriptionHeader = document.createElement('th');
  descriptionHeader.textContent = 'description';
  headerRow.appendChild(descriptionHeader);
 
  let tbody = document.createElement('tbody');

  exercises.forEach(function (value) {
    let row = document.createElement('tr');

    let nameCell = document.createElement('td');
    nameCell.textContent = value.name;
    row.appendChild(nameCell);

    let repsCell = document.createElement('td');
    repsCell.textContent = value.reps;
    row.appendChild(repsCell);
    
    let setsCell = document.createElement('td');
    setsCell.textContent = value.sets;
    row.appendChild(setsCell);
    
    let totalRepsCell = document.createElement('td');
    let repsTotalCalc = parseInt(value.reps)*parseInt(value.sets);
    totalRepsCell.textContent = repsTotalCalc;
    row.appendChild(totalRepsCell);
    
    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = value.description;
    row.appendChild(descriptionCell);

    let updateButton = document.createElement('button');
    updateButton.textContent = 'Change';
    updateButton.classList.add('btn');
    updateButton.classList.add('btn-primary');
    
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');

    let buttonCell = document.createElement('td');
    buttonCell.appendChild(deleteButton);
    buttonCell.appendChild(updateButton);
    row.appendChild(buttonCell);

    // Event listeners for delete and update buttons
    deleteButton.addEventListener('click', function () {
      deleteExercise(value.id);
    });

    updateButton.addEventListener('click', function () {
      updatedExercise(value.id);
    });

    tbody.appendChild(row);
  });

  exerciseTable.appendChild(thead);
  exerciseTable.appendChild(tbody);
  dataDiv.appendChild(exerciseTable);
}

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
		name: document.newExerciseForm.name.value,
		reps: document.newExerciseForm.reps.value,
		sets: document.newExerciseForm.sets.value,
		description: document.newExerciseForm.description.value
		
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
	
	let repsInput = document.createElement('input');
	repsInput.type= 'number';
	repsInput.name ='reps';
	
	let setsInput = document.createElement('input');
	setsInput.type = 'number';
	setsInput.name= 'sets';
	
	let descriptionInput = document.createElement('input');
	descriptionInput.type = 'text';
	descriptionInput.name = 'description';
	

	let updateButton = document.createElement('button');
	updateButton.textContent = 'Update';

	updateForm.appendChild(nameLabel);
	updateForm.appendChild(nameInput);
	updateForm.appendChild(updateButton);

	updateForm.addEventListener('submit', function(e) {
		e.preventDefault();

		let updatedName = nameInput.value;
		if (!updatedName) {
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


