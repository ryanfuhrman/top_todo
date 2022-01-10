// Factory Function for creating todo's
const model = (() => {
  let masterList = JSON.parse(localStorage.getItem("masterList")) || [];
  let testList = JSON.parse(localStorage.getItem("testList")) || [
    {
      title: "walk dog",
      description: "walk missy around the block",
      dueDate: "today",
      priority: "urgent",
      project: "random",
    },
  ];

  const addTodoToList = (todo) => {
    masterList.push(todo);
    saveListToLocalStorage();
    view.displayTodos(masterList);
  };

  const deleteTodo = (todo) => {};

  const saveListToLocalStorage = () => {
    localStorage.setItem("masterList", JSON.stringify(masterList));
  };

  return {
    masterList,
    testList,
    addTodoToList,
  };
})();

const view = (() => {
  const mainDiv = document.getElementById("content");
  const list = document.createElement("ul");
  mainDiv.appendChild(list);

  const addDeleteButton = (element) => {
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.innerHTML = "X";
    element.appendChild(deleteTodoButton);
  };

  const displayTodos = (todoList) => {
    list.innerHTML = "";
    todoList.map((todo) => {
      const newTodoLi = document.createElement("li");
      const todoDiv = newTodoLi.appendChild(document.createElement("div"));
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

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const todo = Object.fromEntries(data.entries());
    model.addTodoToList(todo);
    form.reset();
  };

  const handleDeleteTodo = (e) => {
    console.log(e);
  };

  submitButton.addEventListener("click", handleSubmitTodo);
  // deleteButton.addEventListener("click", handleDeleteTodo);

  view.displayTodos(model.masterList);

  return {
    handleDeleteTodo,
  };
})();
