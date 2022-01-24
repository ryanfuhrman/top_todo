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
    const mutatableArray = [...masterList];
    const newArray = mutatableArray.filter((todo) => todo.id != id);
    masterList = newArray;
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const saveListToLocalStorage = () => {
    localStorage.setItem("masterList", JSON.stringify(masterList));
  };

  const getProjectNames = () => {
    const projectNames = [];
    model.masterList.map((todo) => {
      projectNames.push(todo.listName);
    });
    const listWithDuplicateNames = [...model.masterList].map(
      (project) => project.listName
    );
    const cleanedUpList = [...new Set(listWithDuplicateNames)];
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
    const allTodos = [...model.masterList];
    const todosMatchingProjectName = allTodos.filter(
      (todo) => todo.listName === project
    );
    displayTodos(todosMatchingProjectName);
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

  // Render Todos to Page
  view.displayTodos(model.masterList);

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
    const projectName = event.target.innerHTML;
    view.displayTodosByProject(projectName);
  };

  const handleDeleteTodo = (e) => {
    model.deleteTodo(e.target.parentElement.id);
  };

  const handleDisplayProjectNames = () => {
    const projectNameListItems = [];
    const projectNames = model.getProjectNames();
    projectNames.map((name) => {
      const projectNameLi = document.createElement("li");
      projectNameLi.innerHTML = name;
      projectNameLi.classList.add("project-name-li");
      projectNameLi.addEventListener("click", handleDisplayList);
      projectNameListItems.push(projectNameLi);
    });
    view.displayProjectNames(projectNameListItems);
  };

  const deleteButton = document.querySelectorAll(".delete-todo-btn");

  const applyEventListeners = () => {
    // projectListNames.forEach((project) => {
    //   project.addEventListener("click", handleDisplayList);
    // });
    submitButton.addEventListener("click", handleSubmitTodo);
    deleteButton.forEach((btn) =>
      btn.addEventListener("click", handleDeleteTodo)
    );
  };

  applyEventListeners();
  handleDisplayProjectNames();

  return {
    applyEventListeners,
  };
})();
