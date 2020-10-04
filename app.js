//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const dateElement = document.getElementById('date');
const filterOption = document.querySelector('.filter-todos');

//Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

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

//function saveLocalTodos(todo)

// get date
let dateOption = { weekday: 'long', month: 'short', day:'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", dateOption);
