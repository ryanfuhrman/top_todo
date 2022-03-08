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
    saveListToLocalStorage(list);
    view.displayTodos();
  };

  const deleteTodo = (id, resetProjectNameList) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    const newArray = list.filter((todo) => todo.id != id);
    saveListToLocalStorage(newArray);
    view.displayTodos();
    resetProjectNameList();
  };

  const updateTodo = (updatedTodo, id, viewFn, projectNamesFn) => {
    const list = JSON.parse(localStorage.getItem("masterList"));
    let indexOfTodo = list.findIndex((todo) => todo.id === id);
    // console.log(updatedTodo);
    // console.log(list[indexOfTodo]);
    list[indexOfTodo] = updatedTodo;
    saveListToLocalStorage(list);
    viewFn();
    console.log(list);
    const projectNames = getProjectNames(list);
    console.log(projectNames);
    // projectNamesFn(projectNames);
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

  const createEditButton = (fn) => {
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-todo-btn");
    editButton.addEventListener("click", fn);
    return editButton;
  };

  const createLessInfoButton = (fn) => {
    const lessInfoButton = document.createElement("button");
    lessInfoButton.innerHTML = "Less Info";
    lessInfoButton.classList.add("less-info-button");
    lessInfoButton.addEventListener("click", fn);
    return lessInfoButton;
  };

  const createMoreInfoButton = (fn) => {
    const moreInfoButton = document.createElement("button");
    moreInfoButton.innerHTML = "More Info";
    moreInfoButton.classList.add("more-info-button");
    moreInfoButton.addEventListener("click", fn);
    return moreInfoButton;
  };

  const createDeleteTodoButton = (fn) => {
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.innerHTML = "Delete Todo";
    deleteTodoButton.classList.add("delete-todo-button");
    deleteTodoButton.addEventListener("click", fn);
    return deleteTodoButton;
  };

  return {
    masterList,
    getTodo,
    addTodoToList,
    deleteTodo,
    getProjectNames,
    createEditButton,
    updateTodo,
    createLessInfoButton,
    createMoreInfoButton,
    createDeleteTodoButton,
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
    list.map((li) => {
      projectListUl.appendChild(li);
    });
  };

  const displayTodos = (
    list = JSON.parse(localStorage.getItem("masterList"))
  ) => {
    todoList.innerHTML = "";

    list.map(
      ({ id, title, description, dueDate, priorityLevel, projectName }) => {
        const newTodoLi = document.createElement("li");
        newTodoLi.classList.add("todo-li");
        newTodoLi.id = id;
        const todoHTML = `
          <ul class="todo-data-list" id=${id}>
            <li class="title todo-data">${title}</li>
            <li class="description todo-data more-todo-data">${description}</li>
            <li class="date todo-data more-todo-data">${dueDate}</li>
            <li class="priority todo-data">${priorityLevel}</li>
            <li class="project todo-data more-todo-data">${projectName}</li>
          </ul>
          <div class="buttons">
            <button class="more-info-btn">More Info</button>
            <button class="delete-todo-btn">Delete Todo</button>
          </div>`;

        newTodoLi.innerHTML = todoHTML;
        todoList.appendChild(newTodoLi);
      }
    );
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

  const displayMoreInfo = (todo, lessInfoFn, editFn) => {
    const todoButtonsDiv = todo.children[1];
    const moreInfoButton = todoButtonsDiv.children[0];
    const editButton = model.createEditButton(editFn);

    todoButtonsDiv.appendChild(editButton);
    todoButtonsDiv.removeChild(moreInfoButton);
    const lessInfoButton = model.createLessInfoButton(lessInfoFn);
    todoButtonsDiv.prepend(lessInfoButton);
    const todoData = todo.children[0].children;
    for (let i = 0; i < todoData.length; i++) {
      if (todoData[i].classList.contains("more-todo-data")) {
        todoData[i].classList.add("hide-todo-data");
      }
    }
  };

  const displayLessInfo = (li) => {
    const nodes = li.children;
    const dataToRemove = document.querySelectorAll(".todo-data-div");
    nodes.remove(dataToRemove);
  };

  return {
    displayTodos,
    displayProjectNames,
    displayTodosByProject,
    displayMoreInfo,
    displayLessInfo,
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
    model.deleteTodo(
      e.target.parentElement.parentElement.id,
      handleDisplayProjectNames
    );
    applyEventListeners();
    handleDisplayProjectNames();
  };

  const handleMoreInfo = (e) => {
    const todoDiv = e.target.parentElement.parentElement;
    view.displayMoreInfo(todoDiv, handleLessInfo, handleEditTodo);
    applyEventListeners();
  };

  const handleLessInfo = (e) => {
    const todoButtonsDiv = e.target.parentElement;
    const lessInfoButton = todoButtonsDiv.children[0];
    const editButton = todoButtonsDiv.children[2];
    todoButtonsDiv.removeChild(lessInfoButton);
    todoButtonsDiv.removeChild(editButton);
    const moreInfoButton = model.createMoreInfoButton(handleMoreInfo);
    todoButtonsDiv.prepend(moreInfoButton);
    const todoData = todoButtonsDiv.parentElement.children[0].children;
    for (let i = 0; i < todoData.length; i++) {
      if (todoData[i].classList.contains("hide-todo-data")) {
        todoData[i].classList.remove("hide-todo-data");
      }
    }
  };

  const handleEditTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    console.log(todo);
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
    todo.id = id;
    model.updateTodo(todo, id, view.displayTodos, view.displayProjectNames);
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
  };

  // Render Todos to Page
  view.displayTodos(
    JSON.parse(localStorage.getItem("masterList")),
    handleMoreInfo,
    handleDeleteTodo
  );
  applyEventListeners();
  handleDisplayProjectNames();
})();
