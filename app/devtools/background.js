/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports) {

// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*
var ports = {};
function msg_devtools_page(message, sender, send_response) {
    if (message === 'connect') {
        return;
    }
    if (message.port) {
        ports[message.port].postMessage(message.msg);
    }
    else {
        chrome.tabs.executeScript(message.tab_id, { file: message.inject });
    }
}
function msg_devtools_panel(message, sender, send_response) {
    if (message === 'connect') {
        return;
    }
    if (message.port) {
        ports[message.port].postMessage(message.msg);
    }
}
function msg_content_script(message, sender, send_response) {
    if (message === 'connect') {
        return;
    }
    ports['devtools-panel'].postMessage(message);
}
function on_connect(port) {
    ports[port.name] = port;
    switch (port.name) {
        case 'devtools-page': {
            ports['devtools-page'].onMessage.addListener(msg_devtools_page);
            break;
        }
        case 'content-script': {
            ports['content-script'].onMessage.addListener(msg_content_script);
            break;
        }
        case 'devtools-panel': {
            ports['devtools-panel'].onMessage.addListener(msg_devtools_panel);
            break;
        }
    }
}
chrome.extension.onConnect.addListener(on_connect);


/***/ })

/******/ });