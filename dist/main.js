/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://top_todo/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n    // find the complete implementation of crypto (msCrypto) on IE11.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://top_todo/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://top_todo/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://top_todo/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://top_todo/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n// Factory Function for creating todo's\nconst model = (() => {\n  let masterList =\n    JSON.parse(localStorage.getItem(\"masterList\")) ||\n    localStorage.setItem(\"masterList\", \"[]\");\n\n  const getTodo = (id) => {\n    const list = JSON.parse(localStorage.getItem(\"masterList\"));\n    const todo = list.filter((todo) => todo.id === id);\n    return todo;\n  };\n\n  const addTodoToList = (todo) => {\n    const list = JSON.parse(localStorage.getItem(\"masterList\"));\n    list.push(todo);\n    console.log(list);\n    saveListToLocalStorage(list);\n    view.displayTodos();\n  };\n\n  const deleteTodo = (id, resetProjectNameList) => {\n    const list = JSON.parse(localStorage.getItem(\"masterList\"));\n    const newArray = list.filter((todo) => todo.id != id);\n    saveListToLocalStorage(newArray);\n    view.displayTodos();\n    resetProjectNameList();\n  };\n\n  const updateTodo = (updatedTodo, id) => {\n    const list = JSON.parse(localStorage.getItem(\"masterList\"));\n    let indexOfTodo = list.findIndex((todo) => todo.id === id);\n    console.log(list[indexOfTodo]);\n  };\n\n  const saveListToLocalStorage = (list) => {\n    localStorage.setItem(\"masterList\", JSON.stringify(list));\n  };\n\n  const getProjectNames = () => {\n    const projectNames = [\"all\"];\n    const currentList = localStorage.getItem(\"masterList\");\n    const readableList = JSON.parse(currentList);\n    readableList.map((todo) => {\n      projectNames.push(todo.projectName);\n    });\n    const cleanedUpList = [...new Set(projectNames)];\n    return cleanedUpList;\n  };\n\n  const createEditButton = () => {\n    const editButton = document.createElement(\"button\");\n    editButton.innerHTML = \"Edit\";\n    editButton.classList.add(\"edit-todo-btn\");\n    return editButton;\n  };\n\n  const createLessInfoButton = (fn) => {\n    const lessInfoButton = document.createElement(\"button\");\n    lessInfoButton.innerHTML = \"Less Info\";\n    lessInfoButton.classList.add(\"less-info-button\");\n    lessInfoButton.addEventListener(\"click\", fn);\n    return lessInfoButton;\n  };\n\n  const createMoreInfoButton = (fn) => {\n    const moreInfoButton = document.createElement(\"button\");\n    moreInfoButton.innerHTML = \"more Info\";\n    moreInfoButton.classList.add(\"more-info-button\");\n    moreInfoButton.addEventListener(\"click\", fn);\n    return moreInfoButton;\n  };\n\n  return {\n    masterList,\n    getTodo,\n    addTodoToList,\n    deleteTodo,\n    getProjectNames,\n    createEditButton,\n    updateTodo,\n    createLessInfoButton,\n    createMoreInfoButton,\n  };\n})();\n\nconst view = (() => {\n  const mainDiv = document.getElementById(\"content\");\n\n  const projectListUl = document.createElement(\"ul\");\n  projectListUl.classList.add(\"project-list-ul\");\n  mainDiv.appendChild(projectListUl);\n\n  const todoList = document.createElement(\"ul\");\n  todoList.classList.add(\"todo-list-ul\");\n  mainDiv.appendChild(todoList);\n\n  // const addDeleteButton = (element) => {\n  //   const deleteTodoButton = document.createElement(\"button\");\n  //   deleteTodoButton.classList.add(\"delete-todo-btn\");\n  //   deleteTodoButton.innerHTML = \"X\";\n  //   element.appendChild(deleteTodoButton);\n  // };\n\n  // const addMoreInfoButton = (element) => {\n  //   const moreInfoButton = document.createElement(\"button\");\n  //   moreInfoButton.classList.add(\"more-info-btn\");\n  //   moreInfoButton.innerHTML = \"More Info\";\n  //   element.appendChild(moreInfoButton);\n  // };\n\n  const addEditButton = (element) => {\n    const editTodoButton = document.createElement(\"button\");\n    editTodoButton.classList.add(\"edit-todo-btn\");\n    editTodoButton.innerHTML = \"Edit\";\n    element.appendChild(editTodoButton);\n  };\n\n  const editableTodo = (todo, id) => {\n    const todoToEdit = model.getTodo(id)[0];\n\n    const { title, description, dueDate, priorityLevel, projectName } =\n      todoToEdit;\n\n    const editTodoFormHTML = `<div class=\"edit-todo-form-div\">\n      <form action=\"\" method=\"get\" class=\"edit-todo-form\" id=\"edit-todo-form\">\n        <div class=\"edit-form-section-div\">\n          <label for=\"title\">Title: </label>\n          <input type=\"text\" name=\"title\" id=\"title\" value=\"${title}\" required />\n        </div>\n        <div class=\"edit-form-section-div\">\n          <label for=\"description\">Description: </label>\n          <input type=\"text\" name=\"description\" id=\"description\" value=\"${description}\" required />\n        </div>\n        <div class=\"edit-form-section-div\">\n          <label for=\"dueDate\">Due Date: </label>\n          <input type=\"date\" name=\"dueDate\" id=\"dueDate\" value=\"${dueDate}\" required />\n        </div>\n        <div class=\"edit-form-section-div\">\n          <label for=\"priority\">Priority: </label>\n          <select name=\"priorityLevel\" id=\"priority-levels\">\n            <option value=\"${priorityLevel}\">${priorityLevel}</option>\n            <option value=\"low\">Low</option>\n            <option value=\"medium\">Medium</option>\n            <option value=\"high\">High</option>\n          </select>\n        </div>\n        <div class=\"edit-form-section-div\">\n          <label for=\"projectName\">List: </label>\n          <input\n            name=\"projectName\"\n            list=\"project-names\"\n            value=\"${projectName}\"\n          />\n          <datalist name=\"todo projects\" id=\"project-names\"> </datalist>\n        </div>\n        <div class=\"edit-form-section-div\">\n          <input type=\"submit\" value=\"Update\" id=\"update-todo-submit\" />\n        </div>\n      </form>\n    </div>`;\n\n    todo.innerHTML = \"\";\n    todo.innerHTML = editTodoFormHTML;\n  };\n\n  const displayProjectNames = (list) => {\n    projectListUl.innerHTML = \"\";\n    list.map((li) => projectListUl.appendChild(li));\n  };\n\n  const displayTodos = (\n    list = JSON.parse(localStorage.getItem(\"masterList\"))\n  ) => {\n    todoList.innerHTML = \"\";\n    list.map(\n      ({ id, title, description, dueDate, priorityLevel, projectName }) => {\n        const newTodoLi = document.createElement(\"li\");\n        newTodoLi.classList.add(\"todo-li\");\n        newTodoLi.id = id;\n        const todoHTML = `\n          <ul class=\"todo-info-list\">\n            <li class=\"todo-title\">${title}</li>\n            <li class=\"todo-description\">${description}</li>\n            <li class=\"todo-date\">${dueDate}</li>\n            <li class=\"todo-priority\">${priorityLevel}</li>\n            <li class=\"todo-project\">${projectName}</li>\n          </ul>\n          <div class=\"buttons\">\n            <button class=\"more-info-btn\">More Info</button>\n            <button class=\"delete-todo-btn\">Delete Todo</button>\n          </div>`;\n\n        newTodoLi.innerHTML = todoHTML;\n        todoList.appendChild(newTodoLi);\n      }\n    );\n  };\n\n  const displayTodosByProject = (project) => {\n    todoList.innerHTML = \"\";\n    let filteredTodos = \"\";\n    const allTodos = JSON.parse(localStorage.getItem(\"masterList\"));\n    if (project != \"all\") {\n      filteredTodos = allTodos.filter((todo) => todo.projectName === project);\n    } else {\n      filteredTodos = allTodos;\n    }\n    displayTodos(filteredTodos);\n  };\n\n  const displayMoreInfo = (id, li) => {\n    const list = JSON.parse(localStorage.getItem(\"masterList\"));\n    const todoSelected = list.filter((todo) => todo.id === id);\n    li.classList.add(\"display-more-info\");\n    const descriptionDiv = document.createElement(\"div\");\n    descriptionDiv.classList.add(\"todo-data-div\");\n    descriptionDiv.innerHTML = todoSelected[0].description;\n    const dueDateDiv = document.createElement(\"div\");\n    dueDateDiv.classList.add(\"todo-data-div\");\n    dueDateDiv.innerHTML = todoSelected[0].dueDate;\n    const priorityLevelDiv = document.createElement(\"div\");\n    priorityLevelDiv.classList.add(\"todo-data-div\");\n    priorityLevelDiv.innerHTML = todoSelected[0].priorityLevel;\n    const projectNameDiv = document.createElement(\"div\");\n    projectNameDiv.classList.add(\"todo-data-div\");\n    projectNameDiv.innerHTML = todoSelected[0].projectName;\n    const editButton = model.createEditButton();\n\n    li.appendChild(descriptionDiv);\n    li.appendChild(dueDateDiv);\n    li.appendChild(priorityLevelDiv);\n    li.appendChild(projectNameDiv);\n    li.appendChild(editButton);\n  };\n\n  const displayLessInfo = (li) => {\n    const nodes = li.children;\n    const dataToRemove = document.querySelectorAll(\".todo-data-div\");\n    console.log(nodes);\n    console.log(dataToRemove);\n    nodes.remove(dataToRemove);\n  };\n\n  return {\n    displayTodos,\n    displayProjectNames,\n    displayTodosByProject,\n    displayMoreInfo,\n    displayLessInfo,\n    editableTodo,\n  };\n})();\n\nconst controller = (() => {\n  const submitButton = document.getElementById(\"new-todo-submit\");\n\n  const handleSubmitTodo = (event) => {\n    event.preventDefault();\n    const form = document.getElementById(\"todo-form\");\n    const data = new FormData(form);\n    const todo = Object.fromEntries(data.entries());\n    todo.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    model.addTodoToList(todo);\n    form.reset();\n    handleDisplayProjectNames();\n    applyEventListeners();\n  };\n\n  const handleDisplayListByProject = (event) => {\n    const projectName = event.target.innerHTML;\n    view.displayTodosByProject(projectName);\n    applyEventListeners();\n  };\n\n  const handleDisplayProjectNames = () => {\n    const projectNameListItems = [];\n    const projectNames = model.getProjectNames();\n    projectNames.map((name) => {\n      const projectNameLi = document.createElement(\"li\");\n      projectNameLi.innerHTML = name;\n      projectNameLi.classList.add(\"project-name-li\");\n      projectNameLi.addEventListener(\"click\", handleDisplayListByProject);\n      projectNameListItems.push(projectNameLi);\n    });\n    view.displayProjectNames(projectNameListItems);\n  };\n\n  const handleDeleteTodo = (e) => {\n    model.deleteTodo(e.target.parentElement.id, handleDisplayProjectNames);\n    applyEventListeners();\n    handleDisplayProjectNames();\n  };\n\n  const handleMoreInfo = (e) => {\n    const todo = e.target.parentNode;\n    const moreInfoButton = todo.children[1];\n    const lessInfoButton = model.createLessInfoButton(handleLessInfo);\n    todo.removeChild(moreInfoButton);\n    todo.appendChild(lessInfoButton);\n    const li = todo;\n    const id = li.id;\n    view.displayMoreInfo(id, li);\n    const editInfoButton = document.querySelector(\".edit-todo-btn\");\n    editInfoButton.addEventListener(\"click\", handleEditTodo);\n    applyEventListeners();\n  };\n\n  const handleLessInfo = (e) => {\n    const parent = e.target.parentNode;\n    view.displayLessInfo(parent);\n    const todo = e.target.parentNode;\n    const lessInfoButton = todo.children[2];\n    const moreInfoButton = model.createMoreInfoButton(handleMoreInfo);\n    todo.removeChild(lessInfoButton);\n    todo.appendChild(moreInfoButton);\n  };\n\n  const handleEditTodo = (e) => {\n    const todo = e.target.parentElement;\n    const id = todo.id;\n    view.editableTodo(todo, id);\n    const updateTodoButton = document.querySelector(\"#update-todo-submit\");\n    updateTodoButton.addEventListener(\"click\", (e) => {\n      handleUpdateTodo(e, id);\n    });\n    applyEventListeners();\n  };\n\n  const handleUpdateTodo = (event, id) => {\n    event.preventDefault();\n    const form = document.getElementById(\"edit-todo-form\");\n    const data = new FormData(form);\n    const todo = Object.fromEntries(data.entries());\n    model.updateTodo(todo, id);\n  };\n\n  const applyEventListeners = () => {\n    submitButton.addEventListener(\"click\", handleSubmitTodo);\n    const deleteButton = document.querySelectorAll(\".delete-todo-btn\");\n    const moreInfoButton = document.querySelectorAll(\".more-info-btn\");\n    deleteButton.forEach((btn) => {\n      btn.addEventListener(\"click\", handleDeleteTodo);\n    });\n    moreInfoButton.forEach((btn) => {\n      btn.addEventListener(\"click\", handleMoreInfo);\n    });\n    submitButton.addEventListener(\"click\", handleSubmitTodo);\n  };\n\n  // Render Todos to Page\n  view.displayTodos(JSON.parse(localStorage.getItem(\"masterList\")));\n  applyEventListeners();\n  handleDisplayProjectNames();\n})();\n\n\n//# sourceURL=webpack://top_todo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;