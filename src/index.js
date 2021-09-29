// Factory Function for creating todo's
const model = (() => {
  let todoList = [
    {
      title: "walk dog",
      description: "walk missy around the block",
      dueDate: "today",
      priority: "urgent",
    },
  ];

  const createTodo = (title, description, dueDate, priority) => {
    addTodoToList({
      title,
      description,
      dueDate,
      priority,
    });
  };

  const addTodoToList = (todo) => {
    todoList.push(todo);
  };

  return {
    createTodo,
    todoList,
  };
})();

const view = (() => {
  const mainDiv = document.getElementById("content");
  const list = document.createElement("ul");
  mainDiv.appendChild(list);

  const displayTodos = () => {
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
  view.displayTodos();
})();
