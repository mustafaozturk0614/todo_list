const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const todoList = document.querySelector("#td");
const todolist2 = document.querySelector("#yt");
const todolist3 = document.querySelector("#ot");
const firsCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.getElementById("filter");
const filter1 = document.getElementById("filter1");
const filter2 = document.getElementById("filter2");
const clearButton = document.querySelector("#clear-todos");
const date = document.querySelector("#date");

$(document).ready(function() {


    eventListeners();

});





function eventListeners() { // tüm event listenerler

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI());
    document.addEventListener("DOMContentLoaded", loadAllOldTodosUI());
    document.addEventListener("DOMContentLoaded", loadAllDOTodosUI());
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    filter1.addEventListener("keyup", filterTodos1);
    filter2.addEventListener("keyup", filterTodos2);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos() {

    if (confirm("Tümünü Silmek İstediğinize Eminmisiniz")) {

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);


        }
        localStorage.removeItem("todos");


    }

}

function transferTodos() {

    console.log("naber");


}

function filterTodos(e, id) {
    const filterVAlue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll("#td");
    console.log(listItems);

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterVAlue) === -1) {

            listItem.setAttribute("style", "display: none !important")
        } else {
            listItem.setAttribute("style", "display: block")

        }


    })




}

function filterTodos1(e) {
    const filterVAlue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll("#yt");
    console.log(listItems);

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterVAlue) === -1) {

            listItem.setAttribute("style", "display: none !important")
        } else {
            listItem.setAttribute("style", "display: block")

        }


    })




}

function filterTodos2(e) {
    const filterVAlue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll("#ot");
    console.log(listItems);

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
    let name = document.querySelectorAll(".form-check-input");
    console.log(name);
    let check = e.target.id;


    if (e.target.className === 'fa fa-remove') {

        e.target.parentElement.parentElement.remove();


        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo  başarıyla silindi");
    }
    if (e.target.className === "form-check-input") {

        if (document.querySelector("#" + check).checked == true) {
            console.log(check);
            let li = e.target.parentElement.parentElement.parentElement;
            let date = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
            let todos = e.target.parentElement.parentElement.firstElementChild.textContent;
            let item = addTodoToUI(todos, date);
            li.remove();
            addList(todolist2, item);

            console.log(e.target.parentElement.parentElement.parentElement.textContent);
            showAlert("success", "Todo  başarıyla aktarıldı");
            addTodoDOToStorage(todos, date);
            deleteTodoFromStorage(e.target.parentElement.parentElement.parentElement.textContent);

        }


    }








}

function deleteTodoFromStorage(deletedata) {
    console.log(deletedata);

    let todos = getTodosFromStorage();


    todos.forEach(function(todo, index) {
        if (todo[0] + todo[1] === deletedata) {
            todos.splice(index, 1);

        }


    });

    localStorage.setItem("todos", JSON.stringify(todos));
    controlTime();
}

function controlTime() {
    let todos = getTodosFromStorage();
    var now = new Date();



    todos.forEach(function(todo, index) {
        let tm = new Date(todo[1]);

        if (tm < now) {
            todos.splice(index, 1);


            let item = addTodoToUI(todo[0], todo[1]);
            addList(todolist3, item);
        }


    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        let item = addTodoToUI(todo[0], todo[1]);
        addList(todoList, item);


    });



}

function loadAllOldTodosUI() {
    let todos = getdontTodosFromStorage();
    todos.forEach(function(todo) {
        let item = addTodoToUI(todo[0], todo[1]);
        addList(todolist3, item);


    });


}

function loadAllDOTodosUI() {
    let todos = getDoTodosFromStorage();
    todos.forEach(function(todo) {
        let item = addTodoToUI(todo[0], todo[1]);
        addList(todolist2, item);


    });
}

function addTodo(e) {
    /* <div class="alert alert-danger" role="alert">
    A simple dark alert—check it out!
    </div>*/
    let todolists = todoList;
    const newTodo = todoInput.value.trim();
    const newDate = date.value;
    console.log(newTodo, newDate);
    if (newTodo === "") {
        showAlert("danger", "lütfen bir todo girin");
    } else if (newDate === "") {
        showAlert("danger", "lütfen bir tarih girin");
    } else {

        let item = addTodoToUI(newTodo, newDate);

        addList(todolists, item);
        let stor = [newTodo, newDate];

        addTodoToStorage(newTodo, newDate);
        addTodoAllToStorage(newTodo, newDate);
        showAlert("success", "todo başarıyla eklendi")
    }


    e.preventDefault();
}

function addTodoToUI(newTodo, newDate) {

    let listItem = document.createElement("li");
    const link = document.createElement("a");
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    input.className = "form-check-input";
    input.type = "checkbox";
    let list = getAllTodosFromStorage();

    let number = list.length;
    console.log(number);
    input.id = "check" + number;
    input.name = "check";
    input.value = "checkedValue";
    p.appendChild(document.createTextNode(newDate));


    label.className = "form-check-label";

    div.className = "form-check";
    label.appendChild(input);
    label.appendChild(p);
    div.appendChild(label);

    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(p2).appendChild(document.createTextNode(newTodo));
    listItem.appendChild(div);
    listItem.appendChild(link);


    todoInput.value = "";
    return listItem;




}

function addList(todolist, items) {

    todolist.appendChild(items);


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

function getDoTodosFromStorage() {
    let doTodos;


    if (localStorage.getItem("doTodos") === null) {
        doTodos = [];

    } else {
        doTodos = JSON.parse(localStorage.getItem("doTodos"));
    }

    return doTodos;

}

function getdontTodosFromStorage() {
    let dontTodos;


    if (localStorage.getItem("dontTodos") === null) {
        dontTodos = [];

    } else {
        dontTodos = JSON.parse(localStorage.getItem("dontTodos"));
    }

    return dontTodos;

}

function getAllTodosFromStorage() {
    let allTodos;


    if (localStorage.getItem("allTodos") === null) {
        allTodos = [];

    } else {
        allTodos = JSON.parse(localStorage.getItem("allTodos"));
    }

    return allTodos;

}

function addTodoToStorage(newTodo, newDate) {
    let t = [newTodo, newDate];
    console.log(t);
    let todos = getTodosFromStorage();
    todos.push(t);
    console.log(todos);

    localStorage.setItem("todos", JSON.stringify(todos));



}

function addTodoDOToStorage(newTodo, newDate) {
    let t = [newTodo, newDate];
    console.log(t);
    let todos = getDoTodosFromStorage();
    todos.push(t);
    console.log(todos);

    localStorage.setItem("doTodos", JSON.stringify(todos));



}

function addTodoAllToStorage(newTodo, newDate) {
    let t = [newTodo, newDate];
    console.log(t);
    let todos = getAllTodosFromStorage();
    todos.push(t);
    console.log(todos);

    localStorage.setItem("allTodos", JSON.stringify(todos));



}

// $(function() {
//     $("#gnd").on("click", function(e) {
//         const newTodo = $("#todo").val();


//         console.log(newTodo);

//         e.preventDefault();

//     });

// });