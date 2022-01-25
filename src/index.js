import { v4 as uuidv4 } from "uuid";

// Factory Function for creating todo's
const model = (() => {
  let masterList = JSON.parse(localStorage.getItem("masterList")) || [];

  const addTodoToList = (todo) => {
    masterList.push(todo);
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const deleteTodo = (id) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    const newArray = list.filter((todo) => todo.id != id);
    masterList = newArray;
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const saveListToLocalStorage = () => {
    localStorage.setItem("masterList", JSON.stringify(masterList));
  };

  const getProjectNames = () => {
    const projectNames = ["all"];
    const currentList = localStorage.getItem("masterList");
    const readableList = JSON.parse(currentList);
    readableList.map((todo) => {
      projectNames.push(todo.listName);
    });
    const cleanedUpList = [...new Set(projectNames)];
    return cleanedUpList;
  };

  return {
    masterList,
    addTodoToList,
    deleteTodo,
    getProjectNames,
  };
})();

const view = (() => {
  const mainDiv = document.getElementById("content");

  const projectListUl = document.createElement("ul");
  projectListUl.classList.add("project-list-ul");
  mainDiv.appendChild(projectListUl);

  const todoList = document.createElement("ul");
  todoList.classList.add("todo-list-ul");
  mainDiv.appendChild(todoList);

  const addDeleteButton = (element) => {
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo-btn");
    deleteTodoButton.innerHTML = "X";
    element.appendChild(deleteTodoButton);
  };

  const displayProjectNames = (list) => {
    projectListUl.innerHTML = "";
    list.map((li) => projectListUl.appendChild(li));
  };

  const displayTodos = (list) => {
    todoList.innerHTML = "";
    list.map((todo) => {
      const newTodoLi = document.createElement("li");
      const todoDiv = newTodoLi.appendChild(document.createElement("div"));
      newTodoLi.id = todo.id;
      addDeleteButton(newTodoLi);
      todoDiv.innerHTML = todo.title;
      todoList.appendChild(newTodoLi);
    });
  };

  const displayTodosByProject = (project) => {
    todoList.innerHTML = "";
    let filteredTodos = "";
    const allTodos = JSON.parse(localStorage.getItem("masterList"));
    if (project != "all") {
      filteredTodos = allTodos.filter((todo) => todo.listName === project);
    } else {
      filteredTodos = allTodos;
    }
    displayTodos(filteredTodos);
  };

  return {
    displayTodos,
    displayProjectNames,
    displayTodosByProject,
  };
})();

const controller = (() => {
  const submitButton = document.getElementById("new-todo-submit");
  const form = document.getElementById("todo-form");

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const todo = Object.fromEntries(data.entries());
    todo.id = uuidv4();
    model.addTodoToList(todo);
    form.reset();
    handleDisplayProjectNames();
    applyEventListeners();
  };

  const handleDisplayListByProject = (event) => {
    const projectName = event.target.innerHTML;
    view.displayTodosByProject(projectName);
  };

  const handleDisplayProjectNames = () => {
    const projectNameListItems = [];
    const projectNames = model.getProjectNames();
    projectNames.map((name) => {
      const projectNameLi = document.createElement("li");
      projectNameLi.innerHTML = name;
      projectNameLi.classList.add("project-name-li");
      projectNameLi.addEventListener("click", handleDisplayListByProject);
      projectNameListItems.push(projectNameLi);
    });
    view.displayProjectNames(projectNameListItems);
  };

  const handleDeleteTodo = (e) => {
    console.log("this fired");
    model.deleteTodo(e.target.parentElement.id);
    applyEventListeners();
  };

  const applyEventListeners = () => {
    submitButton.addEventListener("click", handleSubmitTodo);
    const deleteButton = document.querySelectorAll(".delete-todo-btn");
    deleteButton.forEach((btn) => {
      btn.addEventListener("click", handleDeleteTodo);
    });
  };

  // Render Todos to Page
  view.displayTodos(JSON.parse(localStorage.getItem("masterList")));
  applyEventListeners();
  handleDisplayProjectNames();
})();
