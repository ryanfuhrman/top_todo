import { v4 as uuidv4 } from "uuid";

// Factory Function for creating todo's
const model = (() => {
  let masterList =
    JSON.parse(localStorage.getItem("masterList")) ||
    localStorage.setItem("masterList", "[]");

  const getTodo = (id) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    const todo = list.filter((todo) => todo.id === id);
    return todo;
  };

  const addTodoToList = (todo) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    list.push(todo);
    console.log(list);
    saveListToLocalStorage(list);
    view.displayTodos();
  };

  const deleteTodo = (id, resetProjectNameList) => {
    C;
    const newArray = list.filter((todo) => todo.id != id);
    saveListToLocalStorage(newArray);
    view.displayTodos();
    resetProjectNameList();
  };

  const updateTodo = (updatedTodo, id) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    let indexOfTodo = list.findIndex((todo) => todo.id === id);
    console.log(list[indexOfTodo]);
  };

  const saveListToLocalStorage = (list) => {
    localStorage.setItem("masterList", JSON.stringify(list));
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

  const createEditButton = () => {
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-todo-btn");
    return editButton;
  };

  return {
    masterList,
    getTodo,
    addTodoToList,
    deleteTodo,
    getProjectNames,
    createEditButton,
    updateTodo,
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

  const editableTodo = (todo, id) => {
    const todoToEdit = model.getTodo(id)[0];

    const { title, description, dueDate, priorityLevel, projectName } =
      todoToEdit;

    const editTodoFormHTML = `<div class="edit-todo-form-div">
      <form action="" method="get" class="edit-todo-form" id="edit-todo-form">
        <div class="edit-form-section-div">
          <label for="title">Title: </label>
          <input type="text" name="title" id="title" value="${title}" required />
        </div>
        <div class="edit-form-section-div">
          <label for="description">Description: </label>
          <input type="text" name="description" id="description" value="${description}" required />
        </div>
        <div class="edit-form-section-div">
          <label for="dueDate">Due Date: </label>
          <input type="date" name="dueDate" id="dueDate" value="${dueDate}" required />
        </div>
        <div class="edit-form-section-div">
          <label for="priority">Priority: </label>
          <select name="priorityLevel" id="priority-levels">
            <option value="${priorityLevel}">${priorityLevel}</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="edit-form-section-div">
          <label for="projectName">List: </label>
          <input
            name="projectName"
            list="project-names"
            value="${projectName}"
          />
          <datalist name="todo projects" id="project-names"> </datalist>
        </div>
        <div class="edit-form-section-div">
          <input type="submit" value="Update" id="update-todo-submit" />
        </div>
      </form>
    </div>`;

    todo.innerHTML = "";
    todo.innerHTML = editTodoFormHTML;
  };

  const displayProjectNames = (list) => {
    projectListUl.innerHTML = "";
    list.map((li) => projectListUl.appendChild(li));
  };

  const displayTodos = (
    list = JSON.parse(localStorage.getItem("masterList"))
  ) => {
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
    li.classList.add("display-more-info");
    const descriptionDiv = document.createElement("div");
    descriptionDiv.innerHTML = todoSelected[0].description;
    const dueDateDiv = document.createElement("div");
    dueDateDiv.innerHTML = todoSelected[0].dueDate;
    const priorityLevelDiv = document.createElement("div");
    priorityLevelDiv.innerHTML = todoSelected[0].priorityLevel;
    const projectNameDiv = document.createElement("div");
    projectNameDiv.innerHTML = todoSelected[0].projectName;
    const editButton = model.createEditButton();

    li.appendChild(descriptionDiv);
    li.appendChild(dueDateDiv);
    li.appendChild(priorityLevelDiv);
    li.appendChild(projectNameDiv);
    li.appendChild(editButton);
  };

  return {
    displayTodos,
    displayProjectNames,
    displayTodosByProject,
    displayMoreInfo,
    editableTodo,
  };
})();

const controller = (() => {
  const submitButton = document.getElementById("new-todo-submit");

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    const form = document.getElementById("todo-form");
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
    const id = li.id;
    view.displayMoreInfo(id, li);
    const editInfoButton = document.querySelector(".edit-todo-btn");
    editInfoButton.addEventListener("click", handleEditTodo);
    applyEventListeners();
  };

  const handleEditTodo = (e) => {
    const todo = e.target.parentElement;
    const id = todo.id;
    view.editableTodo(todo, id);
    const updateTodoButton = document.querySelector("#update-todo-submit");
    updateTodoButton.addEventListener("click", (e) => {
      handleUpdateTodo(e, id);
    });
    applyEventListeners();
  };

  const handleUpdateTodo = (event, id) => {
    event.preventDefault();
    const form = document.getElementById("edit-todo-form");
    const data = new FormData(form);
    const todo = Object.fromEntries(data.entries());
    model.updateTodo(todo, id);
  };

  const applyEventListeners = () => {
    submitButton.addEventListener("click", handleSubmitTodo);
    const deleteButton = document.querySelectorAll(".delete-todo-btn");
    const moreInfoButton = document.querySelectorAll(".more-info-btn");
    deleteButton.forEach((btn) => {
      btn.addEventListener("click", handleDeleteTodo);
    });
    moreInfoButton.forEach((btn) => {
      btn.addEventListener("click", handleMoreInfo);
    });
    submitButton.addEventListener("click", handleSubmitTodo);
  };

  // Render Todos to Page
  view.displayTodos(JSON.parse(localStorage.getItem("masterList")));
  applyEventListeners();
  handleDisplayProjectNames();
})();
