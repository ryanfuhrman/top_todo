// Factory Function for creating todo's
const model = (() => {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [
    {
      title: "walk dog",
      description: "walk missy around the block",
      dueDate: "today",
      priority: "urgent",
      project: "random",
    },
  ];
  console.log(localStorage.getItem("todoList"));
  const addTodoToList = (todo) => {
    todoList.push(todo);
    saveListToLocalStorage();
    view.displayTodos();
  };

  const saveListToLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  return {
    todoList,
    addTodoToList,
  };
})();

const view = (() => {
  const mainDiv = document.getElementById("content");
  const list = document.createElement("ul");
  mainDiv.appendChild(list);

  const displayTodos = () => {
    list.innerHTML = "";
    model.todoList.map((todo) => {
      const newTodoLi = document.createElement("li");
      newTodoLi.innerHTML = todo.title;
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
  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const todo = Object.fromEntries(data.entries());
    model.addTodoToList(todo);
    form.reset();
  };
  submitButton.addEventListener("click", handleNewTodoSubmit);

  view.displayTodos();
})();
