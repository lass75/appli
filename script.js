document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const userInput = document.getElementById('userInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Fonction pour charger les tâches depuis le localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            taskList.innerHTML = savedTasks;
            attachDeleteListeners(); // Attacher les gestionnaires d'événements pour les nouveaux boutons de suppression
        }
    }

    // Charger les tâches au chargement de la page
    loadTasks();

    // Fonction pour attacher les gestionnaires d'événements pour les boutons de suppression
    function attachDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const taskItem = this.parentElement;
                taskItem.remove();
                // Mise à jour du localStorage après la suppression d'une tâche
                localStorage.setItem('tasks', taskList.innerHTML);
            });
        });
    }

    addBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const userName = userInput.value.trim();
        if (taskText !== '' && userName !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'taskItem';
            taskItem.innerHTML = `
                <span>${taskText}</span> (<span class="userName">${userName}</span>)
                <button class="deleteBtn">Fait</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';
            userInput.value = '';

            // Sauvegarder les tâches dans le localStorage
            localStorage.setItem('tasks', taskList.innerHTML);

            // Attacher les gestionnaires d'événements pour le nouveau bouton de suppression
            attachDeleteListeners();
        }
    });
});
