window.addEventListener('load', function(e) {

	console.log('js loaded with event function');

	init();
});

function init() {
	createGetExerciseByIdForm();
	createExerciseModal();
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
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	xhr.send();
};

function createGetExerciseByIdForm() {
  const label = document.createElement('label');
  label.textContent = 'Exercise ID:';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'exerciseIdInput';
  
  const button = document.createElement('button');
  button.textContent = 'Exercise Details by ID';
  
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const exerciseId = document.getElementById('exerciseIdInput').value;
    getExerciseById(exerciseId);
  });
  
  document.body.appendChild(label);
  document.body.appendChild(input);
  document.body.appendChild(button);
}

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
  totalRepsHeader.textContent = 'total reps';
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
      updateModal(value.id);
    });

    tbody.appendChild(row);
  });

  exerciseTable.appendChild(thead);
  exerciseTable.appendChild(tbody);
  dataDiv.appendChild(exerciseTable);
}

function sendUpdateRequest(exerciseId, updatedExercise) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/exercises/' + exerciseId);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('update success' + updatedExercise);
				getExercises();
			} else {
				console.error('error updating exercise', xhr.status, xhr.responseText);
			}
		}
	}
	xhr.send(JSON.stringify(updatedExercise));
}

function updateModal(exerciseId) {
 //create element
  let modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.add('fade'); // Add fade in
  modal.setAttribute('id', 'updateModal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');

  //dialog 
  let modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'document');

  //content container
  let modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  //modal header
  let modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  // close button
  let closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;'; // 'x'
  closeButton.classList.add('close');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('data-dismiss', 'modal'); 

  modalHeader.appendChild(closeButton);

  // Create modal body
  let modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  // Create update form
  let updateForm = document.createElement('form');
  updateForm.setAttribute('id', 'updateForm');

  	let nameLabel = document.createElement('label');
	nameLabel.textContent = 'Name :';

	let nameInput = document.createElement('input');
	nameInput.type = 'text';
	nameInput.name = 'name';
	nameInput.required = true;
	
	let repsLabel = document.createElement('label');
	repsLabel.textContent = 'Reps :'
	let repsInput = document.createElement('input');
	repsInput.type= 'number';
	repsInput.name ='reps';
	
	let setsLabel = document.createElement('label');
	setsLabel.textcontent = 'Sets :';	
	let setsInput = document.createElement('input');
	setsInput.type = 'number';
	setsInput.name= 'sets';
	
	let descriptionLabel = document.createElement('label');
	descriptionLabel.textContent = 'Description :';
	
	let descriptionInput = document.createElement('input');
	descriptionInput.type = 'text';
	descriptionInput.name = 'description';

	updateForm.appendChild(nameLabel);
	updateForm.appendChild(nameInput);
	updateForm.appendChild(repsLabel);
	updateForm.appendChild(repsInput);
	updateForm.appendChild(setsLabel);
	updateForm.appendChild(setsInput);
	updateForm.appendChild(descriptionLabel);
	updateForm.appendChild(descriptionInput);
	
	let updatedExercise = {
			id: exerciseId,
			name: nameInput.value,
			reps: repsInput.value,
			sets: setsInput.value,
			description: descriptionInput.value,
			}
			
  // update button
  let updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.classList.add('btn');
  updateButton.classList.add('btn-primary');
  updateButton.setAttribute('type', 'submit');

  updateForm.appendChild(updateButton);

  modalBody.appendChild(updateForm);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);

  modal.appendChild(modalDialog);

  document.body.appendChild(modal);

  // Display  modal
  $(modal).modal('show');

  // Handle form submission
  updateForm.addEventListener('submit', function (event) {
    event.preventDefault();
   
    sendUpdateRequest(exerciseId, updatedExercise);

    $(modal).modal('hide'); 
  });

  closeButton.addEventListener('click', function () {
    //close modal
    $(modal).modal('hide'); 
  });

}

function displaySingleExercise(exercise) {
//create element
  let modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.add('fade'); // Add fade in
  modal.setAttribute('id', 'updateModal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');

  //dialog 
  let modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'document');

  //content container
  let modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  //modal header
  let modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

 // close button
  let closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;'; // 'x'
  closeButton.classList.add('close');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('data-dismiss', 'modal'); 

  modalHeader.appendChild(closeButton);
  
  let exerciseDetails = document.createElement('div');
  exerciseDetails.classList.add('exercise-details');
  
  let exerciseName = document.createElement('h2');
  exerciseName.textContent = exercise.name;
  
  let exerciseDescription = document.createElement('p');
  exerciseDescription.textContent = exercise.description;
  
  exerciseDetails.appendChild(exerciseName);
  exerciseDetails.appendChild(exerciseDescription);
  
  modalContent.appendChild(closeButton);
  modalContent.appendChild(exerciseDetails);
  
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
  
  // Open the modal
  $(modal).modal('show');
  
  // Close modal when close button is clicked
    closeButton.addEventListener('click', function() {
    $(modal).modal('hide');
    modal.remove(); 
  });
 
}


function newExercise() {
  return {
    name: document.newExerciseForm.name.value,
    reps: document.newExerciseForm.reps.value,
    sets: document.newExerciseForm.sets.value,
    description: document.newExerciseForm.description.value
  }
}

function createExercise(newExercise) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/exercises');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('newExercise created :' + newExercise);
				//TODO add pop up of new exercise with confirmation button
				exerciseTable();
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

function createExerciseModal(){

function openCreateModal() {
  const modal = document.getElementById('createExerciseModal');
  modal.style.display = 'block';
}

function closeCreateModal() {
  const modal = document.getElementById('createExerciseModal');
  modal.style.display = 'none';
}

document.getElementById('openCreateModalBtn').addEventListener('click', openCreateModal);
document.querySelector('#createExerciseModal .close').addEventListener('click', closeCreateModal);

// close modal clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('createExerciseModal');
  if (event.target == modal) {
    closeCreateModal();
  }
});

//event listener to form
document.getElementById('createExerciseForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const newExerciseData = {
    name: document.getElementById('createExerciseForm').name.value,
    reps: document.getElementById('createExerciseForm').reps.value,
    sets: document.getElementById('createExerciseForm').sets.value,
    description: document.getElementById('createExerciseForm').description.value
  };
  createExercise(newExerciseData);
  closeCreateModal();
});
}
