/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// Factory Function for creating todo's\nconst model = (() => {\n  let masterList = JSON.parse(localStorage.getItem(\"masterList\")) || [];\n  let testList = JSON.parse(localStorage.getItem(\"testList\")) || [\n    {\n      title: \"walk dog\",\n      description: \"walk missy around the block\",\n      dueDate: \"today\",\n      priority: \"urgent\",\n    },\n  ];\n\n  const addTodoToList = (todo) => {\n    masterList.push(todo);\n    saveListToLocalStorage();\n    view.displayTodos(masterList);\n  };\n\n  const deleteTodo = (todo) => {};\n\n  const saveListToLocalStorage = () => {\n    localStorage.setItem(\"masterList\", JSON.stringify(masterList));\n  };\n\n  return {\n    masterList,\n    testList,\n    addTodoToList,\n  };\n})();\n\nconst view = (() => {\n  const mainDiv = document.getElementById(\"content\");\n  const list = document.createElement(\"ul\");\n  mainDiv.appendChild(list);\n\n  const addDeleteButton = (element) => {\n    const deleteTodoButton = document.createElement(\"button\");\n    deleteTodoButton.innerHTML = \"X\";\n    element.appendChild(deleteTodoButton);\n  };\n\n  const displayTodos = (todoList) => {\n    list.innerHTML = \"\";\n    todoList.map((todo) => {\n      const newTodoLi = document.createElement(\"li\");\n      const todoDiv = newTodoLi.appendChild(document.createElement(\"div\"));\n      addDeleteButton(newTodoLi);\n      todoDiv.innerHTML = todo.title;\n      list.appendChild(newTodoLi);\n    });\n  };\n\n  return {\n    displayTodos,\n  };\n})();\n\nconst controller = (() => {\n  const submitButton = document.getElementById(\"new-todo-submit\");\n  const form = document.getElementById(\"todo-form\");\n\n  const handleSubmitTodo = (event) => {\n    event.preventDefault();\n    const data = new FormData(form);\n    const todo = Object.fromEntries(data.entries());\n    model.addTodoToList(todo);\n    form.reset();\n  };\n\n  const handleDeleteTodo = (e) => {\n    console.log(e);\n  };\n\n  submitButton.addEventListener(\"click\", handleSubmitTodo);\n  // deleteButton.addEventListener(\"click\", handleDeleteTodo);\n\n  view.displayTodos(model.masterList);\n\n  return {\n    handleDeleteTodo,\n  };\n})();\n\n\n//# sourceURL=webpack://top_todo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;