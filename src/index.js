import { v4 as uuidv4 } from "uuid";

// Factory Function for creating todo's
const model = (() => {
  let masterList = JSON.parse(localStorage.getItem("masterList")) || [];

  let testList = JSON.parse(localStorage.getItem("testList")) || [
    {
      title: "walk dog",
      description: "walk missy around the block",
      dueDate: "today",
      priority: "urgent",
    },
  ];

  const addTodoToList = (todo) => {
    masterList.push(todo);
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const deleteTodo = (id) => {
    const mutableArray = [...masterList];
    const newArray = mutableArray.filter((todo) => todo.id != id);
    console.log(newArray);
    masterList = newArray;
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const saveListToLocalStorage = () => {
    localStorage.setItem("masterList", JSON.stringify(masterList));
  };

  return {
    masterList,
    addTodoToList,
    deleteTodo,
  };
})();

const view = (() => {
  const mainDiv = document.getElementById("content");
  const list = document.createElement("ul");
  mainDiv.appendChild(list);

  const addDeleteButton = (element) => {
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo-btn");
    deleteTodoButton.innerHTML = "X";
    element.appendChild(deleteTodoButton);
  };

  const displayTodos = (todoList) => {
    list.innerHTML = "";
    todoList.map((todo) => {
      const newTodoLi = document.createElement("li");
      const todoDiv = newTodoLi.appendChild(document.createElement("div"));
      newTodoLi.id = todo.id;
      addDeleteButton(newTodoLi);
      todoDiv.innerHTML = todo.title;
      list.appendChild(newTodoLi);
    });
  };

  return {
    displayTodos,
  };
})();

const controller = (() => {
  const submitButton = document.getElementById("new-todo-submit");
  const form = document.getElementById("todo-form");

  // Render Todos to Page
  view.displayTodos(model.masterList);

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const todo = Object.fromEntries(data.entries());
    todo.id = uuidv4();
    console.log(todo);
    model.addTodoToList(todo);
    form.reset();
  };

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
