import { v4 as uuidv4 } from "uuid";

// Factory Function for creating todo's
const model = (() => {
  let masterList =
    JSON.parse(localStorage.getItem("masterList")) ||
    localStorage.setItem("masterList", "[]");

  const addTodoToList = (todo) => {
    masterList.push(todo);
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const deleteTodo = (id, resetProjectNameList) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    const newArray = list.filter((todo) => todo.id != id);
    masterList = newArray;
    saveListToLocalStorage();
    view.displayTodos(masterList);
    //
    resetProjectNameList();
  };

  const updateTodo = (id) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    const todoToEdit = list.filter((todo) => todo.id === id);
  };

  const saveListToLocalStorage = () => {
    localStorage.setItem("masterList", JSON.stringify(masterList));
  };

  const getProjectNames = () => {
    const projectNames = ["all"];
    const currentList = localStorage.getItem("masterList");
    const readableList = JSON.parse(currentList);
    readableList.map((todo) => {
      projectNames.push(todo.projectName);
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

  const addMoreInfoButton = (element) => {
    const moreInfoButton = document.createElement("button");
    moreInfoButton.classList.add("more-info-btn");
    moreInfoButton.innerHTML = "More Info";
    element.appendChild(moreInfoButton);
  };

  const addEditButton = (element) => {
    const editTodoButton = document.createElement("button");
    editTodoButton.classList.add("edit-todo-btn");
    editTodoButton.innerHTML = "Edit";
    element.appendChild(editTodoButton);
  };

  const displayProjectNames = (list) => {
    projectListUl.innerHTML = "";
    list.map((li) => projectListUl.appendChild(li));
  };

  const displayTodos = (list) => {
    todoList.innerHTML = "";
    list.map((todo) => {
      const newTodoLi = document.createElement("li");
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-div");
      newTodoLi.appendChild(todoDiv);
      newTodoLi.id = todo.id;
      addMoreInfoButton(newTodoLi);
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
      filteredTodos = allTodos.filter((todo) => todo.projectName === project);
    } else {
      filteredTodos = allTodos;
    }
    displayTodos(filteredTodos);
  };

  const displayMoreInfo = (id, li) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    const todoSelected = list.filter((todo) => todo.id === id);
    console.log(todoSelected[0]);
    li.classList.add("display-more-info");
    const descriptionDiv = document.createElement("div");
    descriptionDiv.innerHTML = todoSelected[0].description;
    const dueDateDiv = document.createElement("div");
    dueDateDiv.innerHTML = todoSelected[0].dueDate;
    const priorityLevelDiv = document.createElement("div");
    priorityLevelDiv.innerHTML = todoSelected[0].priorityLevel;
    const projectNameDiv = document.createElement("div");
    projectNameDiv.innerHTML = todoSelected[0].projectName;

    li.appendChild(descriptionDiv);
    li.appendChild(dueDateDiv);
    li.appendChild(priorityLevelDiv);
    li.appendChild(projectNameDiv);
  };

  return {
    displayTodos,
    displayProjectNames,
    displayTodosByProject,
    displayMoreInfo,
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
    applyEventListeners();
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
    model.deleteTodo(e.target.parentElement.id, handleDisplayProjectNames);
    applyEventListeners();
    handleDisplayProjectNames();
  };

  const handleMoreInfo = (e) => {
    const li = e.target.parentElement;
    const id = e.target.parentElement.id;
    const todoDiv = e.target.parentElement.children[0];
    // console.log(id);
    view.displayMoreInfo(id, li);
    // const form =
  };

  const handleEditTodo = (e) => {
    // model.updateTodo(e.target.parentElement.id);
    console.log(e.target);
    applyEventListeners();
  };

  const applyEventListeners = () => {
    submitButton.addEventListener("click", handleSubmitTodo);
    const deleteButton = document.querySelectorAll(".delete-todo-btn");
    const moreInfoButton = document.querySelectorAll(".more-info-btn");
    // const editButton = document.querySelectorAll(".edit-todo-btn");
    deleteButton.forEach((btn) => {
      btn.addEventListener("click", handleDeleteTodo);
    });
    moreInfoButton.forEach((btn) => {
      btn.addEventListener("click", handleMoreInfo);
    });
    // editButton.forEach((btn) => {
    //   btn.addEventListener("click", handleEditTodo);
    // });
  };

  // Render Todos to Page
  view.displayTodos(JSON.parse(localStorage.getItem("masterList")));
  applyEventListeners();
  handleDisplayProjectNames();
})();
