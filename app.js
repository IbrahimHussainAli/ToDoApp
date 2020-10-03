//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const dateElement = document.getElementById('date');

//Event listeners
todoButton.addEventListener('click', addTodo);

//Functions 
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    //add class='todo' to div
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = 'hey';
    newTodo.classList.add('todo-item');
    //put the li into todo Div
    todoDiv.appendChild(newTodo); 
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-circle"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton)
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('completed-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
}

// get date
let dateOption = { weekday: 'long', month: 'short', day:'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", dateOption);
