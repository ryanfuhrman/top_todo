import { v4 as uuidv4 } from "uuid";

// Factory Function for creating todo's
const model = (() => {
  let masterList = JSON.parse(localStorage.getItem("masterList")) || [];

  const addTodoToList = (todo) => {
    masterList.push(todo);
    saveListToLocalStorage();
    view.displayAllTodos(masterList);
  };

  const deleteTodo = (id) => {
    const mutatableArray = [...masterList];
    const newArray = mutatableArray.filter((todo) => todo.id != id);
    masterList = newArray;
    saveListToLocalStorage();
    view.displayAllTodos(masterList);
  };

  const saveListToLocalStorage = () => {
    localStorage.setItem("masterList", JSON.stringify(masterList));
  };

  const getProjectNames = () => {
    const projectNames = [];
    model.masterList.map((todo) => {
      projectNames.push(todo.listName);
    });
    return projectNames;
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
  projectListUl.classList.add = "project-list-ul";
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

  const displayProjectNames = () => {
    projectListUl.innerHTML = "";
    const projectNames = model.getProjectNames();
    projectNames.forEach((name) => {
      const projectNameLi = document.createElement("li");
      projectNameLi.innerHTML = name;
      projectNameLi.classList.add("project-name-li");
      projectListUl.appendChild(projectNameLi);
    });
  };

  const displayAllTodos = (list) => {
    todoList.innerHTML = "";
    list.map((todo) => {
      const newTodoLi = document.createElement("li");
      const todoDiv = newTodoLi.appendChild(document.createElement("div"));
      newTodoLi.id = todo.id;
      addDeleteButton(newTodoLi);
      todoDiv.innerHTML = todo.title;
      todoList.appendChild(newTodoLi);
    });
    displayProjectNames();
  };

  const displayTodosByProject = (project) => {};

  return {
    displayAllTodos,
    displayProjectNames,
  };
})();

const controller = (() => {
  const submitButton = document.getElementById("new-todo-submit");
  const form = document.getElementById("todo-form");

  // Render Todos to Page
  view.displayAllTodos(model.masterList);

  const projectListNames = document.querySelectorAll(".project-name-li");

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const todo = Object.fromEntries(data.entries());
    todo.id = uuidv4();
    model.addTodoToList(todo);
    form.reset();
  };

  const handleDisplayList = (event) => {
    console.log(event.target.innerHTML);
  };

  projectListNames.forEach((project) => {
    project.addEventListener("click", handleDisplayList);
  });

  const handleDeleteTodo = (e) => model.deleteTodo(e.target.parentElement.id);
  submitButton.addEventListener("click", handleSubmitTodo);

  const deleteButton = document.querySelectorAll(".delete-todo-btn");

  deleteButton.forEach((btn) =>
    btn.addEventListener("click", handleDeleteTodo)
  );

  return {
    handleDeleteTodo,
  };
})();
