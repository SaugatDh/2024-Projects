const form = document.getElementById('todo');
const input = document.getElementById('task');
const todolist = document.getElementById('todo-list');
const watermark = document.querySelector('.watermark');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = input.value;
    if (newTask === '') {
        alert('Please enter a task!');
        return;
    }

    input.value = '';
    
    addTask(newTask);
    toggleWatermark();
    saveTasksToLocalStorage(); // Save to local storage after adding a task
});

function addTask(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkBox);

    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>`;
    listItem.appendChild(deleteButton);

    todolist.appendChild(listItem);

    // Checkbox event for strike-through effect
    checkBox.addEventListener('change', function() {
        taskText.style.textDecoration = this.checked ? "line-through" : "none";
        if (this.checked) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
        saveTasksToLocalStorage(); // Save to local storage on checkbox change
    });

    // Delete button event
    deleteButton.addEventListener('click', function() {
        todolist.removeChild(listItem);
        toggleWatermark();
        saveTasksToLocalStorage(); // Save to local storage after deletion
    });

    // Edit button event
    editButton.addEventListener('click', function() {
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            taskText.textContent = input.value; // Update task text
            input.value = ''; // Clear input after saving
            editButton.textContent = 'Edit'; // Reset button text
            listItem.classList.remove('editing'); // Remove editing class
        } else {
            input.value = taskText.textContent; // Set input to current task text
            editButton.textContent = 'Save'; // Change button text to Save
            listItem.classList.add('editing'); // Add editing class
        }
        saveTasksToLocalStorage(); // Save to local storage after editing
    });
}

function toggleWatermark() {
    if (todolist.children.length > 0) {
        todolist.classList.add('has-items');
    } else {
        todolist.classList.remove('has-items');
    }
}


function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
        // Set checkbox state based on saved data
        const taskItems = document.querySelectorAll('.task-item');
        const lastTaskItem = taskItems[taskItems.length - 1]; // Get the last added task
        const checkBox = lastTaskItem.querySelector('input[type="checkbox"]');
        checkBox.checked = task.completed;
        const taskText = lastTaskItem.querySelector('span');
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }
    });
    toggleWatermark(); // Update watermark based on loaded tasks
});
