document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('task-list');
    const progressNum = document.getElementById('num');
    const progressBar = document.getElementById('progress');

    let tasks = [];

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const task = {
            text,
            complete: false,
            id: Date.now()
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.complete;
            checkbox.classList.add('edit-checkbox'); // Added class for styling
            checkbox.addEventListener('change', () => {
                task.complete = !task.complete;
                renderTasks();
            });

            const taskText = document.createElement('div');
            taskText.classList.add('task-text');
            taskText.textContent = task.text;
            if (task.complete) {
                taskText.style.textDecoration = 'line-through';
            }

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => editTask(task.id));

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.classList.add('complete');
            completeButton.addEventListener('click', () => {
                task.complete = true;
                renderTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');
            taskActions.appendChild(editButton);
            taskActions.appendChild(completeButton);
            taskActions.appendChild(deleteButton);

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(taskActions);
            taskList.appendChild(li);
        });

        updateStats();
    }

    function editTask(id) {
        const task = tasks.find(task => task.id === id);
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null) {
            task.text = newText.trim();
            renderTasks();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.complete).length;
        progressNum.textContent = `${completedTasks}/${totalTasks}`;

        const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
});
