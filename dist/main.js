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

eval("// Factory Function for creating todo's\nconst model = (() => {\n  let todoList = [\n    {\n      title: \"walk dog\",\n      description: \"walk missy around the block\",\n      dueDate: \"today\",\n      priority: \"urgent\",\n    },\n  ];\n\n  const createTodo = (title, description, dueDate, priority) => {\n    addTodoToList({\n      title,\n      description,\n      dueDate,\n      priority,\n    });\n  };\n\n  const addTodoToList = (todo) => {\n    todoList.push(todo);\n  };\n\n  return {\n    createTodo,\n    todoList,\n  };\n})();\n\nconst view = (() => {\n  const mainDiv = document.getElementById(\"content\");\n  const list = document.createElement(\"ul\");\n  mainDiv.appendChild(list);\n\n  const displayTodos = () => {\n    model.todoList.map((todo) => {\n      const newTodoLi = document.createElement(\"li\");\n      newTodoLi.innerHTML = todo.title;\n      list.appendChild(newTodoLi);\n    });\n  };\n\n  return {\n    displayTodos,\n  };\n})();\n\nconst controller = (() => {\n  view.displayTodos();\n})();\n\n\n//# sourceURL=webpack://top_todo/./src/index.js?");

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