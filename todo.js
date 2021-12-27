const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const todoList = document.querySelector(".list-group");
const firsCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
$(document).ready(function() {

    eventListeners();
});





function eventListeners() { // tüm event listenerler

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI());
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos)


}

function clearAllTodos() {

    if (confirm("Tümünü Silmek İstediğinize Eminmisiniz")) {

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);


        }
        localStorage.removeItem("todos");


    }

}

function filterTodos(e) {
    const filterVAlue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterVAlue) === -1) {

            listItem.setAttribute("style", "display: none !important")
        } else {
            listItem.setAttribute("style", "display: block")

        }


    })




}

function deleteTodo(e) {

    if (e.target.className === 'fa fa-remove') {


        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)

        showAlert("success", "Todo  başarıyla silindi");
    }

}

function deleteTodoFromStorage(deletetodo) {

    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);

        }


    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });



}

function addTodo(e) {
    /* <div class="alert alert-danger" role="alert">
    A simple dark alert—check it out!
    </div>*/

    const newTodo = todoInput.value.trim();
    console.log(newTodo);
    if (newTodo === "") {
        showAlert("danger", "lütfen bir todo girin")
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "todo başarıyla eklendi")
    }


    e.preventDefault();
}

function addTodoToUI(newTodo) {

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";




}

function showAlert(type, messagge) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;

    alert.textContent = messagge;
    console.log(alert);
    firsCardBody.appendChild(alert);
    setTimeout(function() {
        alert.remove();

    }, 2000);


}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

function addTodoToStorage(newTodo) {

    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));



}


// $(function() {
//     $("#gnd").on("click", function(e) {
//         const newTodo = $("#todo").val();


//         console.log(newTodo);

//         e.preventDefault();

//     });

// });