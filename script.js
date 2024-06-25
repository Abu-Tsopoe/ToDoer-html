// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterTasks = document.getElementById('filterTasks');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    let tasks = [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
            return true;
        });
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            taskItem.innerHTML = `
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" ${task.completed ? 'checked' : ''} data-index="${index}">
                    <label class="form-check-label ${task.completed ? 'completed' : ''}">${task.name} (${task.time})</label>
                </div>
                <div>
                    <button class="btn btn-sm btn-warning editBtn" data-index="${index}">Edit</button>
                    <button class="btn btn-sm btn-danger deleteBtn" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = (name, time) => {
        tasks.push({ name, time, completed: false });
        renderTasks(filterTasks.value);
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks(filterTasks.value);
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks(filterTasks.value);
    };

    const clearCompletedTasks = () => {
        tasks = tasks.filter(task => !task.completed);
        renderTasks(filterTasks.value);
    };

    document.getElementById('taskForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        const taskTime = timeInput.value;
        if (taskName && taskTime) {
            addTask(taskName, taskTime);
            taskInput.value = '';
            timeInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('editBtn')) {
            const newTaskName = prompt('Edit task name:', tasks[index].name);
            const newTaskTime = prompt('Edit task time:', tasks[index].time);
            if (newTaskName && newTaskTime) {
                tasks[index].name = newTaskName;
                tasks[index].time = newTaskTime;
                renderTasks(filterTasks.value);
            }
        }
        if (e.target.classList.contains('deleteBtn')) {
            deleteTask(index);
        }
        if (e.target.classList.contains('form-check-input')) {
            toggleTaskCompletion(index);
        }
    });

    filterTasks.addEventListener('change', () => {
        renderTasks(filterTasks.value);
    });

    clearCompletedBtn.addEventListener('click', () => {
        clearCompletedTasks();
    });

    // Initial rendering of tasks
    renderTasks();
});
