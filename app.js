//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const dateElement = document.getElementById('date');
const filterOption = document.querySelector('.filter-todos');
const userName = document.querySelector('.userName');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getName);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
userName.addEventListener('focus', function(){
    userName.classList.add('editing'); 
});
userName.addEventListener('blur', function(){
    userName.classList.remove('editing');
});
userName.addEventListener('blur', addNameToLocal);
userName.addEventListener('keypress', addNameToLocal);

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
    newTodo.innerText = todoInput.value;
    if (newTodo.innerText != ""){
    newTodo.classList.add('todo-item');
    } else {
        alert("Please enter a Todo");
        return;
    };
    //put the li into todo Div
    todoDiv.appendChild(newTodo);
    //add todo to localstorage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-circle"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton)
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete todo item
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //check item
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        const completeButton = todo.querySelector('.complete-btn');
        if (todo.classList[1] === 'completed'){
        completeButton.innerHTML = "";
        completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
            completeButton.innerHTML = '<i class="far fa-check-circle"></i>';
        }
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function checkCurrentTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    return todos;
};

function saveLocalTodos(todo){
    //check if there are any todos
    let todos = checkCurrentTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos = checkCurrentTodos();
    todos.forEach(function(todo){
    //Todo Div
        const todoDiv = document.createElement('div');
    //add class='todo' to div
        todoDiv.classList.add('todo');
    //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        if (newTodo.innerText != ""){
        newTodo.classList.add('todo-item');
        } else {
            alert("Please enter a Todo");
            return;
        };
    //put the li into todo Div
        todoDiv.appendChild(newTodo);
    //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="far fa-check-circle"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton)
    //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    //append to list
        todoList.appendChild(todoDiv);
    })
} 

function removeLocalTodos(todo){
    let todos = checkCurrentTodos();
    let todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addNameToLocal(e){
    //check if press enter or focus away (blur)
    if (e.keyCode === 13 || e.type === 'blur'){
    e.preventDefault();
    //check if field is empty
    if(!userName.innerText == ""){
        let name = userName.innerText;
        localStorage.setItem('name', name);
    } else {
    e.preventDefault();
    userName.innerText = localStorage.getItem('name');
}
    }
}

function getName(){
    if (localStorage.getItem('name') === null){
        userName.innerText = 'User'
    } else {
        userName.innerText = localStorage.getItem('name');
    }
}

// get date
let dateOption = { weekday: 'long', month: 'short', day:'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", dateOption);

// get time
let now = new Date();
let hours = now.getHours;
let ft = now.toLocaleString("en-gb", {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
});
document.getElementById('time').innerHTML = ft;