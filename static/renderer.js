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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_controls__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_sounds__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_server__ = __webpack_require__(39);



 // should be moved to common

const {WIN_WIDTH, WIN_HEIGHT} = __WEBPACK_IMPORTED_MODULE_0_core_data__["a" /* default */]

let game = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
game.controls = new __WEBPACK_IMPORTED_MODULE_1_core_controls__["a" /* default */]()
game.sounds   = new __WEBPACK_IMPORTED_MODULE_2_core_sounds__["a" /* default */]()
game.server   = new __WEBPACK_IMPORTED_MODULE_3_common_server__["a" /* default */]()
/* harmony default export */ __webpack_exports__["default"] = (game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const N = null
/* harmony default export */ __webpack_exports__["a"] = ({
  ROWS_INV: 12,
  ROWS_VIS: 11,
  ROWS: 12 + 11,
  COLS: 6,
  PANELS: (12+11) * 6,

  STOPTIME: 60*3,

  //number of starting blocks
  NRBLOCK : 17,
  // States
  STATIC     : Symbol('static'),
  HANG       : Symbol('hang'),
  FALL       : Symbol('fall'),
  LAND       : Symbol('land'),
  SWAP_L     : Symbol('swap_l'),
  SWAP_R     : Symbol('swap_r'),
  SWAPPING_L : Symbol('swaping_l'),
  SWAPPING_R : Symbol('swaping_r'),
  CLEAR      : Symbol('clear'),
  POPPING    : Symbol('popping'),
  GARBAGE    : Symbol('garbage'),
  // Animation Frame
  FRAME_LAND    : [4,4,4,2,2,2,3,3,3,0],
  FRAME_CLEAR   : [5,0,5,0,5,0,5,0,5,0,5,0,
                   5,0,5,0,5,0,5,0,5,0,5,0,
                   5,0,5,0,5,0,5,0,5,0,5,0,
                   5,0,5,0,5,0,5,0,6,6,6,6,
                   6,6,6,6,6,6,6,6,6,6,6,6],

  FRAME_LIVE    :  0,
  FRAME_DANGER  : [0,0,0,0,
                   2,2,2,2,
                   0,0,0,0,
                   3,3,3,3,
                   4,4,4,4],

  FRAME_DEAD    : 6,
  FRAME_NEWLINE : 1,

  FRAME_STAR: [1,1,2,2,3,3,4,4,5,5,5,5,5,5,4,4,3,3,2,2,1,1,1,1,1,1,1],

  // Timing
  TIME_CLEAR : 60, //the time it takes before the first panel is ready to start popping
  TIME_POP   : 9,  //when a panel is ready to pop is needs to wait for time_pop before popping
  TIME_FALL  : 3,  //how long to wait after popping last panel before panel falls
  TIME_SWAP : 4,
  TIME_PUSH : 1000,
  TIME_PARTICLE : 20,   // the time the particle stays on the screen for 

  TIME_GARBAGE_CLEAR: 30,
  TIME_GARBAGE_POP  : 12,

  UNIT : 32,
  WIN_WIDTH  : 398 * 2,//256,
  WIN_HEIGHT : 224 * 2,

  MENUCURSORBLINK : 12,

  STARTPOS_PANELCURSOR_SPEED : 6,

  GARBAGE_SHAKE: [
    [
      1,1,1,
      2,2,2,
      1,1,1,
      0,0,0,
      -1,-1,-1,
      0,0,0
    ]
  ],

  WALL_ROLLUP: [
    0,1,0,1,0,1,0,2,0,2,0,
    2,0,3,3,0,3,0,4,4,0,
    4,0,5,5,0,5,0,6,0,6,
    0,7,7,0,7,0,0,8,0,0,
    8,0,0,8,0,9,9,0,16,32,
    48,64,80,96,112,128,144,160,176,192,
    192,188,185,185,188,192,192,189,187,187,
    189,192,192,190,189,189,190,192,192,190,
    192,190,192,191,192,191,192,191,192
  ],

  BAUBLE_FLOAT: [
    -1,-1,0,1,2,3,4,
    4,5,5,6,6,7,
    7,8,8,8,9,9,
    9,9,9,10,10,
    10,10,10,10,10,
    10,10,10,10,10,
    10,10,10,11,11,
    11,11,11
  ]

});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_data__ = __webpack_require__(1);


const {COLS,ROWS} = __WEBPACK_IMPORTED_MODULE_0_core_data__["a" /* default */]

/* harmony default export */ __webpack_exports__["a"] = ({
  /* upscale base pixels to the correct size */
  px: function(px){
    return px * 2
  },
  i2xy: function(i){
    const y = Math.floor(i / COLS);
    const x = i % COLS;
    return [x,y];
  },
  xy2i: function(x,y){
    // x left-right
    // y top-down
    return (y*COLS) + x;
  },
  stack_log: function(s){
    var header = [
      {value: '' },
      {value: '0'},
      {value: '1'},
      {value: '2'},
      {value: '3'},
      {value: '4'},
      {value: '5'},
      {value: '6'}
    ]
    console.log('   -','0', '1', '2', '3', '4', '5')
    console.log(' 0 -',s[0] ,s[1] ,s[2] ,s[3] ,s[4] ,s[5] )
    console.log(' 1 -',s[6] ,s[7] ,s[8] ,s[9] ,s[10],s[11])
    console.log(' 2 -',s[12],s[13],s[14],s[15],s[16],s[17])
    console.log(' 3 -',s[18],s[19],s[20],s[21],s[22],s[23])
    console.log(' 4 -',s[24],s[25],s[26],s[27],s[28],s[29])
    console.log(' 5 -',s[30],s[31],s[32],s[33],s[34],s[35])
    console.log(' 6 -',s[36],s[37],s[38],s[39],s[40],s[41])
    console.log(' 7 -',s[42],s[43],s[44],s[45],s[46],s[47])
    console.log(' 8 -',s[48],s[49],s[50],s[51],s[52],s[53])
    console.log('9 -',s[54],s[55],s[56],s[57],s[58],s[59])
    console.log('10 -',s[60],s[61],s[62],s[63],s[64],s[65])

  },
  out_of_bounds(x,y){
    return x < 0 || x > (COLS-1) ||
           y < 0 || y > (ROWS-1)
  }
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
		if (vnode.instance != null) onremove(vnode.instance)
		else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		for (var i = 0; i < hooks.length; i++) hooks[i]()
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.5"
m.vnode = Vnode
if (true) module["exports"] = m
else window.m = m
}());

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);

const {remote} = __WEBPACK_IMPORTED_MODULE_0_electron___default.a

let mode = remote.getCurrentWindow().custom.mode
class UiMode {
  close(){
    mode = false
    document.getElementById('game').classList.remove('hide')
  }
  show(){
    mode = 'input'
    document.getElementById('game').classList.add('hide')
  }
  get mode(){
    return mode
  }
  set mode(v){
    mode = v
  }
}
const klass = new UiMode()

/* harmony default export */ __webpack_exports__["a"] = (klass);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron_store__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron_store__);


const store = new __WEBPACK_IMPORTED_MODULE_0_electron_store___default.a()

/* harmony default export */ __webpack_exports__["a"] = (store);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(47);

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(48);

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(49);

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(50);

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(51);

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(52);

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(53);

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(5)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(81)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);



const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_1_electron___default.a

class CoreInputs {
  constructor(inputs,online,stage) {
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)

    this.pack   = this.pack.bind(this)
    this.unpack = this.unpack.bind(this)

    this.update_input = this.update_input.bind(this)
    this.replay_input = this.replay_input.bind(this)

    this.create(inputs,online,stage)
  } //constructor

  create(inputs,online,stage){
    this.stage = stage
    if(inputs){
      this.replay    = true
      this.inputs    = inputs
    } else {
      this.online = online
      this.replay = false
      this.inputs = [[0x00],[0x00]]
      if (this.online){
        this.ack = [0,0]
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].server.on('framedata',this.unpack)
      }
    }
  }
  get stage(){ return this._stage }
  set stage(v){ this._stage = v}

  get last_pack(){ return this._last_pack }
  set last_pack(v){ this._last_pack = v}

  get tick(){ return this._tick }
  set tick(v){ this._tick = v}

  get online(){ return this._online }
  set online(v){ this._online = v}

  get inputs(){ return this._inputs }
  set inputs(v){ this._inputs = v}

  get serialize(){
    return this.inputs
  }

  pack(){
    const data = []
    for (let i = this.ack[1]; this.tick >= i; i++){
      data.push(this.inputs[0][i])
    }
    return {
      frame_count: data.length,
      frames: data,
      ack0: this.ack[1],//local
      ack1: this.ack[0] //remote
    }
  }

  unpack(data){
    const frame_start = this.ack[0]
    const frame_end   = data.ack0+data.frame_count-1

    ipc.send(
      'log',
      `UN ${this.tick}: ${data.ack0} ${data.ack1} ${data.frames.join(',')}`
    )
    //console.log('unpack__:',frame_start,frame_end,'|',this.ack[0])
    //console.log('unpack__:',data.frames)
    for (let tick = frame_start; frame_end >= tick; tick++) {
      let byte = data.frames[tick-data.ack0]
      if(typeof this.inputs[1][tick] === 'undefined') {
        if (byte === 0x01){ console.log('+',this.tick,tick) }
        this.inputs[1].push(byte)
      } else {
        if (byte === 0x01){ console.log('=',this.tick,tick) }
        this.inputs[1][tick] = byte
      }
    }
    // Tell the stage (mode_vs) that we want to roll from..to
    // the next time update is called.
    this.stage.roll.ready = true
    if (this.stage.roll.from === null){
      this.stage.roll.from = this.ack[0]
    } else {
      this.stage.roll.from = Math.min(this.ack[0],this.stage.roll.from)
    }

    this.stage.roll.to = this.tick
    this.ack[0] = Math.max(frame_end,this.ack[0])
    this.ack[1] = Math.max(this.ack[1],data.ack1)
  }

  update_input(pi,tick){
    const byte = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.serialize(pi)
    this.inputs[pi].push(byte)
  }

  replay_input(pi,tick){
    const byte = this.inputs[pi][tick]
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.execute(pi,byte)
  }

  update(tick,send) {
    this.tick = tick
    if (this.replay || send === false){
      this.replay_input(0,tick)
      this.replay_input(1,tick)
    } else {
      this.update_input(0,tick)
      if (this.online && (typeof this.inputs[1][tick] !== 'undefined') ){
        this.replay_input(1,tick)
      } else {
        this.update_input(1,tick)
      }
    }
    if (this.online && send){
      this.last_pack = this.pack()
      ipc.send(
        'log',
        `PK ${tick}: ${this.last_pack.ack0} ${this.last_pack.ack1} ${this.last_pack.frames.join(',')}`
      )
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].server.send('framedata',this.last_pack)
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CoreInputs;
 //klass


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var seedrandom = __webpack_require__(12);
var self = __webpack_require__(56);

module.exports = self;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_garbage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_playfield_countdown__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_playfield_cursor__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_playfield_wall__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_score__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_panel__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_character__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_ai__ = __webpack_require__(68);













const {
  ROWS_INV,
  ROWS,
  COLS,
  PANELS,
  UNIT,
  TIME_PUSH,
  STOPTIME,
  GARBAGE_SHAKE
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class Playfield {
  get [Symbol.toStringTag](){ return 'Playfield' }
  static initClass() {
    this.prototype.history = {};
    this.prototype.pi          = null  // player number, used to detect input
    this.prototype.unit        = null
    this.prototype.rows        = null
    this.prototype.cols        = null
    this.prototype.combo       = null
    this.prototype.chain       = null
    this.prototype.cursor      = null
    this.prototype.blank       = null
    this.prototype.clearing    = null
    this.prototype.clearing_garbage = null
    this.prototype.score       = 0
    this.prototype.scoreText   = null
    this.prototype.has_ai      = false
    this.prototype.land        = false
  }
  constructor(pi){
    if (pi !== 0 && pi !== 1){ 
      throw new Error("player_number present and must be 0 or 1")
    }

    this.pi = pi
    this.garbage    = new __WEBPACK_IMPORTED_MODULE_3_core_garbage__["a" /* default */]()
    this.countdown  = new __WEBPACK_IMPORTED_MODULE_4_components_playfield_countdown__["a" /* default */]()
    this.cursor     = new __WEBPACK_IMPORTED_MODULE_5_components_playfield_cursor__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0_core_game__["default"])
    this.wall       = new __WEBPACK_IMPORTED_MODULE_6_components_playfield_wall__["a" /* default */]()
    this.score_lbl  = new __WEBPACK_IMPORTED_MODULE_7_components_score__["a" /* default */]()
    this.ai         = new __WEBPACK_IMPORTED_MODULE_10_components_ai__["a" /* default */]()
    this.character     = new __WEBPACK_IMPORTED_MODULE_9_components_character__["a" /* default */]()
  }

  get stoptime(){ return this._stoptime }
  set stoptime(v){ this._stoptime = v }

  get shake(){ return this._shake }
  set shake(v){ this._shake = v }

  get counter(){ return this._counter }
  set counter(v){ this._counter = v }

  get push_counter(){ return this._push_counter }
  set push_counter(v){ this._push_counter = v }

  get pushing(){ return this._pushing }
  set pushing(v){ this._pushing = v }

  /**
   * Helper method to acces the stack, either through filters stack(x, y) gets the right index 
   * or directly as an index stack(0) === stack[0],
   * also can return the whole stack by stack(), only way to acces the stack itself!
   * 
   * @param {integer} v1 if set only this acts as a way to enter stack directly, otherwhise it acts as a filtered x pos
   * @param {integer} v2 if set this acts as the wanted y pos 
   */
  stack(v1=null,v2=null){
    if (v1 >= 0 && v2 >= 0 && v1 !== null && v2 !== null) {
      return this._stack[__WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].xy2i(v1,v2)]
    } else if (v1 >= 0 && v1 !== null && v2 === null) {
      return this._stack[v1]
    } else if(v1 === null && v2 === null){
      return this._stack
    } else {
      throw(new Error('invalid query to stack'))
    }
  }
  get snap() {
    const snap_cursor = this.cursor.snap
    const snap_countdown = this.countdown.snap
    const snap_stack  = []
    for (let panel of this.stack()){
      snap_stack.push(panel.snap)
    }
    return [
      this.push_counter,
      snap_cursor,
      snap_stack,
      snap_countdown,
      this.pushing
    ]
  }
  load(snapshot){
    this.push_counter = snapshot[0]
    this.cursor.load(   snapshot[1])
    for (let i = 0; i < this.stack_len; i++) {
      this.stack(i).load(snapshot[2][i])
    }
    this.countdown.load(snapshot[3])
    this.pushing = snapshot[4]
  }
  create(stage,opts){
    if (stage === null) {
      throw new Error("must pass stage")
    }
    if (opts           === null ||
        opts.x         === null ||
        opts.y         === null ||
        opts.countdown === null ||
        opts.panel     === null){
      throw new Error("must pass at least x,y,countdown and panels")
    }


    this.stage            = stage
    this.should_push      = opts.push      || false
    this.should_countdown = opts.countdown || false

    this.height = (ROWS+1) * UNIT
    this.width  = COLS     * UNIT

    this.x = opts.x
    this.y = opts.y

    this.layer_block  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group()
    this.layer_block.x  = this.x
    this.layer_block.y  = this.y - (ROWS_INV*UNIT)

    this.create_stack(opts.panels)

    this.score        = 0
    this.chain        = 0
    this.push_counter = TIME_PUSH
    this.stoptime     = STOPTIME

    if (this.stage.cpu[1] !== null){
      this.garbage.create(this.stage,this.pi)
    }

    //this.score_lbl.create()
    // for mode_puzzle, couting all swaps
    this.swap_counter = 0;
    this.character.create(
      "zephyr",
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerX - 30,
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerY - 100,
      this.pi
    );
  }

  create_after() {
    this.layer_cursor = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group()
    this.layer_cursor.x = this.x
    this.layer_cursor.y = this.y

    this.countdown.create(this)
    this.cursor.create(this)
    if (this.has_ai) { this.ai.create(this, this.cursor) }
    this.wall.create(this,this.x,this.y)
  }
  create_stack(data){
    this._stack = []
    this.create_panels()
    this.fill_panels(data)
  }

  get stack_len(){
    return this._stack.length
  }
  get stack_size(){
    return this.should_push ? this.stack_len-COLS : this.stack_len
  }

  push() {
    let i;
    // move all panels up the stack
    const stack = new Array(this.stack_len)
    for (i = COLS; i < this.stack_len; i++) {
      let [x,y] = Array.from(__WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].i2xy(i-COLS))
      stack[i-COLS] = this._stack[i]
      stack[i-COLS].x = x
      stack[i-COLS].y = y
    }
    this._stack = stack

    this.create_newline()

    if (this.cursor.y > 0) { this.cursor.y--; }
    return 1
  }
  create_newline(mode){
    if (!this.should_push) { return; }
    const rows = (ROWS + (this.should_push ? 1 : 0 ))

    // create panels
    for (let i = PANELS; i < PANELS+COLS; i++){
      const [x,y] = Array.from(__WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].i2xy(i))
      this._stack[i] = new __WEBPACK_IMPORTED_MODULE_8_components_panel__["a" /* default */]()
      this.stack(i).create(this, x, y)
    }
    // fill panels
    for (let i = PANELS; i < PANELS+COLS; i++){
      this.stack(i).set('unique')
    }
  }

  game_over() {
    this.stage.state = 'gameover'
    this.push_counter = 0
  }

  create_panels(){
    const rows = (ROWS + (this.should_push === true ? 1 : 0 ))
    const size = COLS * rows
    this._stack = new Array().fill(null)

    for (let i = 0; i < size; i++){
      const [x,y] = Array.from(__WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].i2xy(i))
      this._stack[i] = new __WEBPACK_IMPORTED_MODULE_8_components_panel__["a" /* default */]()
      this.stack(i).create(this, x, y)
    }
  }
  
  /**
   * Sets the Stack Panels to data given by the parameter.
   * Also if a push call was made it also sets the bottom row to unique - not comboable
   * 
   * @param {Array} data the panel.kind data from 0 to ~10 or nulls = empty  
   */
  fill_panels(data){
    this.stack().forEach((panel, i) => { panel.set(data[i]); });

    if (this.should_push)
      for (let i = PANELS; i < PANELS+COLS; i++)
        this.stack(i).set('unique');
  }

  update_stack() {
    for (let i = 0; i < this.stack_len; i++) {
      this.stack((this.stack_len-1)-i).update()
    }
  }

  /**
   * Resets this playfields stack to the new given data 
   * Resets the swap_counter - puzzle mode
   * 
   * @param {Array} new_Panels the panels the stack should reset to
   * @param {integer} new_counter_size size that the swap_counter should be set to
   */
  reset_stack(new_Panels, new_counter_size = 0) {
    this.stack().forEach((panel) => { panel.soft_reset() })
    this.swap_counter = new_counter_size
    this.fill_panels(new_Panels)
  }

  /** 
   * checks if the stack has only empty panels
   * @returns true when the whole stack consists of empty block
   */
  stack_is_empty() {
    for (var i = 0; i < PANELS; i++)
      if (!this.stack(i).empty)
        return false;
    return true;
  }

  chain_and_combo() {
    let i, panel
    for (i = 0; i < this.stack_size; i++) {
      this.stack(i).chain_and_combo()
    }

    const combo = this.clearing.length
    let   chain = 0
    for (let panel of this.clearing){
      panel.popping(this.clearing.length)
    if (panel.chain > 0) { /*console.log(panel.chain)*/ }
      chain = Math.max(chain,panel.chain)
    }
    for (let panel of this.clearing){ panel.chain = chain }
    return [combo, chain]
  }
  
  /**
   * Calls the swap Method through the given parameters on the internal stack.
   * Only able to swap if both Panels are swappable.
   * A swap_counter goes up that counts all swaps (no swaps done when both panels are empty).
   * 
   * @param {integer} x xpos to be accessed in the stack - 2D Array whise
   * @param {integer} y ypos to be accessed in the stack - 2D Array whise
   */
  swap(x,y){
    let panelLeft   = this.stack(x, y);
    let panelRight  = this.stack(x + 1, y);

    if (panelLeft.swappable && panelRight.swappable) {
      panelLeft.swap();

      if (!panelLeft.empty && !panelRight.empty ) {
        this.swap_counter++;
        return true;
      }    
    }
  }
  
  danger(within){
    const offset = COLS*(within+ROWS_INV);
    const cols   = [];
    for (let i = 0; i < COLS; i++){
      if (this.stack(offset+i)         &&
         (this.stack(offset+i).kind >= 0) &&
         (this.stack(offset+i).kind !== null)) {
        cols.push(i)
      }
    }
    if (cols.length > 0) { return cols; } else { return false; }
  }
  /* The tick function is the main function of the TaGame object.
   * It gets called every tick and executes the other internal functions.
   * It will update the grid,
   * calculate the current score,
   * spawn possible garbage,
   * updates the sprites to the correct locations in the canvas.
   */
  update_push(danger) {
    if (!this.should_push) {return}
    if (this.pushing) {
      this.push_counter -= 100
    } else {
      this.push_counter--
    }
    /* ensure push_counter never goes into the negative */
    if (this.push_counter < 0)
      this.push_counter = 0

    if (this.push_counter <= 0 && !danger) {
      this.pushing        = false
      this.push_counter   = TIME_PUSH       
      this.score         += this.push()
    }
  }
  score_combo(combo){
    switch (combo) {
      case 4: return 20;
      case 5: return 30;
      case 6: return 50;
      case 7: return 60;
      case 8: return 70;
      case 9: return 80;
      case 10: return 100;
      case 11: return 140;
      case 12: return 170;
      default:
        return 0;
    }
  }
  score_chain(chain){
    switch (chain) {
      case 2:  return 50;
      case 3:  return 80;
      case 4:  return 150;
      case 5:  return 300;
      case 6:  return 400;
      case 7:  return 500;
      case 8:  return 700;
      case 9:  return 900;
      case 10: return 1100;
      case 11: return 1300;
      case 12: return 1500;
      case 13: return 1800;
      default:
        return 0;
    }
  }
  update_score(combo,chain){
    if (combo > 0) {
      this.score += combo * 10
      this.score += this.score_combo(combo)
      if (chain) {
        this.score += this.score_chain(chain)
      }
    }
  }
  update_garbage_clearing(){
    if (this.clearing_garbage.length > 0){
      for (let panel of this.stack()){
        panel.panel_garbage.popping()
      }
    }
    this.clearing_garbage = []
  }
  render_stack() {
    for (let panel of this.stack()){
      panel.render()
    }
  }
  render() {
    this.cursor.render()
    this.wall.render()
    this.render_stack()

    let shake = 0
    if (this.shake >= 0 && this.counter > 0) {
      const shake_i  = GARBAGE_SHAKE[this.shake].length-this.counter
      shake = GARBAGE_SHAKE[shake][shake_i]
    }

    const y = this.y - (ROWS_INV*UNIT)
    if (this.should_push) {
      const lift = (this.push_counter / TIME_PUSH) * UNIT
      this.layer_block.y  = y + lift + shake
      this.layer_cursor.y = y + lift + shake
    } else {
      this.layer_block.y  = y + shake
      this.layer_cursor.y = y + shake
    }
  }
  update() {
    this.countdown.update()
    this.cursor.update()
    this.character.update()
    
    //this.score_lbl.update(this.chain, this.score)
    let danger = null
    if (this.stage.state === 'running'){
      danger = this.danger(0)
      if (danger && this.push_counter <= 0) {
        this.stoptime--
        this.character.sprite.play("losing");
        console.log('stoptime',this.stoptime)
        if (this.stoptime <= 0){
          this.stage.game_over()
          this.character.sprite.play("lost");
        }
      } else {
        this.stoptime = STOPTIME
      }
    }

    if (this.stage.state === 'gameover') {
      this.wall.update()
    }
    if (this.stage.state !== 'running') { return; }

    if (this.counter > 0) { this.counter-- }
    this.update_push(danger)
    this.clearing         = []
    this.clearing_garbage = []

    this.update_stack()
    if (this.has_ai) { this.ai.update() }
    // combo n chain
    const cnc = this.chain_and_combo()

    if (this.stage.cpu[1] !== null) { // if no second player, don't bother with garbage
      this.update_garbage_clearing()
      this.garbage.update(cnc[0],cnc[1])
    }
    this.update_score(cnc[0],cnc[1])

    if (this.land === true) {
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.land()
      this.land = false
    }
  }

  shutdown() {
    return this.cursor.shutdown()
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Playfield;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);



/** Counts up the actively played Game Time and displays 
 *  the Time through Sprite Digits
 */
const {px} = __WEBPACK_IMPORTED_MODULE_1_core_filters__["a" /* default */]

class ComponentTimer {
  /** get snapshot of the timer, get only to not let this be modifyable */
  get snap() {
    return [
      this.d0.frame,
      this.d1.frame,
      this.d2.frame
    ];
  }

  /** set all Digit Counters to the snapshots Data
   * @param {Array} snapshot to get data from if packet loss
   */
  load(snapshot) {
    this.d0.frame = snapshot[0];
    this.d0.frame = snapshot[1];
    this.d0.frame = snapshot[2];
  }

  /** A Sprite group is created with its position
   *  Each Time Digit gets added as a Sprite
   *  Internal tick counter and a bool to stop everything
   */
  create(x,y) {
    this.group = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group();
    this.group.x = x;
    this.group.y = y;
    this.d0 = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(0) , 0, 'ints_large',0);
    this.d1 = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(16), 0, 'ints_large',0);
    this.d2 = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(24), 0, 'ints_large',0);
    this.group.add(this.d0);
    this.group.add(this.d1);
    this.group.add(this.d2);

    this.tick = 0;
    this.running = false;
  }

  /** Sets the Sprite Frames of each Digit to a Counter,
   *  Each counter goes up determined by the time passed etc.
   *  everything is stoppable through this.running
   */
  render() {
    if (!this.running)
      return;
    const time = Math.floor(this.tick / 60);
    if (time > 0){
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;

      if (minutes > 9){
        this.d0.frame = 9;
      } else {
        this.d0.frame = minutes;
      }
      if (seconds <= 9){
        this.d1.frame = 0;
        this.d2.frame = seconds;
      } else {
        this.d1.frame = parseInt(`${seconds}`.charAt(0));
        this.d2.frame = parseInt(`${seconds}`.charAt(1));
      }
    }

    this.tick++;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentTimer;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_menu_pause_cursor__ = __webpack_require__(71);




const {px} = __WEBPACK_IMPORTED_MODULE_1_core_filters__["a" /* default */]

/** A ComponentPauseMenu handles the pausing of a stage
 *  new controls are provided to move in the menu and use various options
 */
class ComponentPauseMenu {
  /** bindings & new menu cursor created */
  constructor() {
    this.cancel = this.cancel.bind(this);
    this.continue = this.continue.bind(this);
    this.pause = this.pause.bind(this);
    
    this.cursor = new __WEBPACK_IMPORTED_MODULE_2_components_menu_pause_cursor__["a" /* default */]();
  }

  /**
   * pausing turned of normally
   * add a sprite to this object but turn it off for now
   * create a cursor with no controls provided yet 
   * @param {mode_vs} stage reference to call both playfields 
   */
  create(stage) {
    this.paused = false;

    this.stage = stage;

    // for now playfield.x changed to a value
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(__WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerX, __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerY, 'menu_pause');
    this.sprite.anchor.setTo(0.5);   
    this.sprite.visible = false;

    // create a controller with this menu given as a reference, push 2 methods of the menu
    return this.cursor.create(this, -70, -16, [
      this.continue,
      this.cancel
    ]);
  }

  /** leave the game */
  cancel() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].state.start('menu');
  }

  /** called through cursor, unpauses the menu and turns of the sprite again
   * also calls the mode_vs||stage resume method which will return new cursor controls
   */
  continue() {
    this.paused         = false;
    this.sprite.visible = false;
    this.stage.resume();
  }

  /** unpauses update method of the menu, 
   * make this object visible and 
   * reassigns controls to both playfields registered players */
  pause() {
    this.paused = true;
    this.sprite.visible = true;

    if (this.stage.playfield1 !== undefined &&
        this.stage.playfield2 !== undefined) {
      // give player control
      this.cursor.map_controls(this.stage.playfield1.pi);
      // below possibly gives 2nd player controls of the menu (didnt test, but didnt break p1.pi control)
      this.cursor.map_controls(this.stage.playfield2.pi);
    }
    else {
      this.cursor.map_controls(this.stage.playfield.pi);
    }
  }

  /** once unpaused the menu will update its cursor */
  update() {
    if (!this.paused) 
      return; 

    // check for any Input and if any pressed - continue or cancel may be called here
    this.cursor.update();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPauseMenu;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = levels;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_data__ = __webpack_require__(1);



function levels() {
  const _ = null;   // empty panel  
  const b = 1;      // blue
  const g = 2;      // green
  const p = 3;      // purple
  const r = 4;      // red
  const y = 5;      // yellow

  const { PANELS } = __WEBPACK_IMPORTED_MODULE_0_core_data__["a" /* default */]

  /**
   * private method to help with array creation
   * @param {Array} old_array array to enhance with _ spaces
   * @param {Array} combined arrays
   */
  var fill = function(old_array) {
    // spawns nulls until the last 6 lines were chosen
    let new_array = new Array((PANELS - old_array.length)).fill(_);
    return new_array.concat(old_array);
  }

  // each new {} inside is a new level
  this.puzzle_levels = [
    // stage 1 - 01
    {
      panels: fill([
        _, r, _, r, r, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, b, _, _, _,
        _, b, b, _, b, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, g, r, _, _,
        _, _, r, g, _, _,
        _, _, r, g, _, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, b, y, _, _,
        _, _, b, y, _, _,
        _, _, y, b, _, _,
        _, _, b, y, _, _,
        _, _, b, y, _, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, g, _, _, _,
        g, g, b, _, b, b
      ]),
      steps: 1
    },

    {
      panels: fill([
        r, r, p, r, p, p
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, r, _, _, _,
        _, _, r, _, _, _,
        _, _, b, _, _, _,
        _, _, r, _, _, _,
        _, _, r, _, _, _,
        _, _, b, b, _, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, _, _, y, _,
        _, _, _, _, y, _,
        _, p, p, y, p, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, b, _, _, _,
        _, _, g, b, _, _,
        _, _, g, g, b, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, y, r, _, _,
        _, _, r, y, _, _,
        _, _, y, r, _, _,
        _, _, r, y, _, _,
        _, _, y, r, _, _
      ]),
      steps: 3
    },
  
    // stage 2 - 01
    {
      panels: fill([
        _, _, y, _, _, _,
        _, _, r, _, _, _,
        _, _, r, _, _, _,
        _, _, y, _, _, _,
        _, _, r, y, y, _
      ]),
      steps: 1
    }
  ]
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(8)
var rp = __webpack_require__(24)
var minimatch = __webpack_require__(13)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(84)
var EE = __webpack_require__(86).EventEmitter
var path = __webpack_require__(5)
var assert = __webpack_require__(25)
var isAbsolute = __webpack_require__(15)
var globSync = __webpack_require__(87)
var common = __webpack_require__(26)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(88)
var util = __webpack_require__(14)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(28)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(8)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(80)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(5)
var minimatch = __webpack_require__(13)
var isAbsolute = __webpack_require__(15)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(27)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var electron = __webpack_require__(3);
var main_1 = __webpack_require__(30);
var ipc = electron.ipcRenderer;
main_1["default"]();
var game_1 = __webpack_require__(0);
var boot_1 = __webpack_require__(41);
var load_1 = __webpack_require__(42);
var menu_1 = __webpack_require__(43);
var mode_vs_1 = __webpack_require__(46);
var mode_puzzle_1 = __webpack_require__(73);
var puzzle_menu_1 = __webpack_require__(75);
var connect_1 = __webpack_require__(77);
game_1["default"].state.add('boot', boot_1["default"]);
game_1["default"].state.add('load', load_1["default"]);
game_1["default"].state.add('menu', menu_1["default"]);
game_1["default"].state.add('connect', connect_1["default"]);
game_1["default"].state.add('mode_vs', mode_vs_1["default"]);
game_1["default"].state.add('mode_puzzle', mode_puzzle_1["default"]);
game_1["default"].state.add('puzzle_menu', puzzle_menu_1["default"]);
game_1["default"].state.start('boot');
ipc.on('play-vs', function (event, _a) {
    var seed = _a.seed, online = _a.online, cpu = _a.cpu;
    game_1["default"].state.start('mode_vs', true, false, {
        seed: seed,
        online: online,
        cpu: cpu
    });
});
ipc.on('replay-load', function (event, _a) {
    var seed = _a.seed, inputs = _a.inputs;
    game_1["default"].state.start('mode_vs', true, false, {
        seed: seed,
        online: false,
        inputs: inputs,
        cpu: [false, false]
    });
});
ipc.on('network-connect', function (event, data) {
    game_1["default"].state.start('connect', true, false, data);
});


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_mode__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ui_input__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ui_network__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ui_audio__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ui_replay__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_electron__);








const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_6_electron___default.a


function class_tab(new_mode){
  if (__WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode === new_mode){
    return 'active'
  } else {
    return ''
  }
}

function click_tab(new_mode){
  return function(){
    __WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode = new_mode
  }
}

function nav(){
  return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('nav.divider',[
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.tab',{className: class_tab('input')  , onclick: click_tab('input')}  ,'Inputs'),
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.tab',{className: class_tab('network'), onclick: click_tab('network')},'Network'),
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.tab',{className: class_tab('audio')  , onclick: click_tab('audio')}  ,'Audio'),
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.tab',{className: class_tab('replay') , onclick: click_tab('replay')}  ,'Replays'),
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.clear')
  ])
}
function content(){
  if      (__WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode === 'input')  { return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.content.settings_input'  ,Object(__WEBPACK_IMPORTED_MODULE_2_ui_input__["a" /* default */])()   )}
  else if (__WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode === 'network'){ return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.content.settings_network',Object(__WEBPACK_IMPORTED_MODULE_3_ui_network__["a" /* default */])() )}
  else if (__WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode === 'audio')  { return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.content.settings_audio'  ,Object(__WEBPACK_IMPORTED_MODULE_4_ui_audio__["a" /* default */])()   )}
  else if (__WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode === 'replay') { return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.content.settings_replay' ,Object(__WEBPACK_IMPORTED_MODULE_5_ui_replay__["a" /* default */])()  )}
}

function render(){
  const app = {view: function(){
    if (__WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode !== false) {
      return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.wrap1',
        __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.wrap2',[
          nav(),
          content()
        ])
      )
    }
  }}

  const el = document.getElementById('ui')
  __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.mount(el, app)
}

ipc.on('reload',function(event,data){
  __WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].mode = data.mode
  document.getElementById('game').classList.add('hide')
  __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw()
})

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_mode__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mithril__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_keycode__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_keycode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_keycode__);






const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_2_electron___default.a
let setting = null
let inputs  = __WEBPACK_IMPORTED_MODULE_3_common_store__["a" /* default */].get('inputs')


function setkey(key){
  return(function(){
    setting = key
  })
}

function inputclass(key){
  if (setting === key) {
    return 'setting'
  } else {
    return ''
  }
}

function inputvalue(key){
  const v = inputs[key]
  if (typeof(v) === 'string' && (v.charAt(1) === 'A' || v.charAt(1) === 'P')){
    return v
  } else {
    return __WEBPACK_IMPORTED_MODULE_4_keycode___default()(v)
  }
}

function textfield(key,label){
  return __WEBPACK_IMPORTED_MODULE_1_mithril___default()('tr.text_field',[
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('td.lbl',label),
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('td.val',__WEBPACK_IMPORTED_MODULE_1_mithril___default()(".input",{ className: inputclass(key), onclick: setkey(key) }, inputvalue(key) ))
  ])
}

function render(){
 return __WEBPACK_IMPORTED_MODULE_1_mithril___default()('form',[
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.p0',
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.title','Player 1'),
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('table',[
     textfield(0,'Up'),
     textfield(1,'Down'),
     textfield(2,'Left'),
     textfield(3,'Right'),
     textfield(4,'A'),
     textfield(5,'B'),
     textfield(6,'L'),
     textfield(7,'R'),
     textfield(8,'Start')
    ])),
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.p1',
     __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.title','Player 2'),
     __WEBPACK_IMPORTED_MODULE_1_mithril___default()('table',[
     textfield(9,'Up'),
     textfield(10,'Down'),
     textfield(11,'Left'),
     textfield(12,'Right'),
     textfield(13,'A'),
     textfield(14,'B'),
     textfield(15,'L'),
     textfield(16,'R'),
     textfield(17,'Start')
    ])),
   __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.clear')
 ])
}

function storekey(v){
  let i = inputs.indexOf(v)
  if (i != -1) { inputs[i] = null}
  inputs[setting] = v
  __WEBPACK_IMPORTED_MODULE_3_common_store__["a" /* default */].set('inputs', inputs)
  ipc.send('controls-update')
  setting = null
  __WEBPACK_IMPORTED_MODULE_1_mithril___default.a.redraw()
}

document.onclick = function (e) {
  if (setting != null && e.target.className != 'input setting') {
    setting = null
  }
}

document.onkeydown = function (e) {
  if (e.keyCode === 70) { //f (for fullscreen)
    ipc.send('fullscreen')
  } else if (e.keyCode === 27) { //esc
    if (__WEBPACK_IMPORTED_MODULE_0_ui_mode__["a" /* default */].mode === false) {
      __WEBPACK_IMPORTED_MODULE_0_ui_mode__["a" /* default */].show()
    } else {
      __WEBPACK_IMPORTED_MODULE_0_ui_mode__["a" /* default */].close()
    }
    __WEBPACK_IMPORTED_MODULE_1_mithril___default.a.redraw()
  }

  if (setting != null) {
    storekey(e.keyCode)
  }
}

function poll_gamepad(){
  if (setting === null){ return }
  const gg = navigator.getGamepads()
  if (gg[0] === null &&
      gg[1] === null &&
      gg[2] === null &&
      gg[3] === null){ return }
  for(let i = 0; i < gg.length; i++){
    let gamepad = gg[i]
    if (gamepad !== null) {
      for (let ii = 0;  ii < gamepad.buttons.length; ii++) {
        if (gamepad.buttons[ii].value === 1){
          storekey(`${i}PAD${ii}`)
        } // if
      } // for

      for (let ii = 0;  ii < gamepad.axes.length; ii++) {
        let axis = null
        if      (ii % 2 === 0) {
          if     (gamepad.axes[ii]  ===  -1){ axis = 'L' }
          else if(gamepad.axes[ii]  ===   1){ axis = 'R' }
        }
        else if (ii % 2 === 1) {
          if     (gamepad.axes[ii]  ===  -1){ axis = 'U' }
          else if(gamepad.axes[ii]  ===   1){ axis = 'D' }
        }
        if (axis !== null){
          storekey(`${i}AXS${ii}${axis}`)
        }
      } // for

    } // if
  } // for
}

setInterval(function(){
  poll_gamepad()
},100)

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("electron-store");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_mode__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);





const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_3_electron___default.a

let inputs  = __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].get('network.host_port')
let host_port = {value: __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].get('network.host_port'), setValue: function(v) {host_port.value = v}}
let join_host = {value: __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].get('network.join_host'), setValue: function(v) {join_host.value = v}}
let join_port = {value: __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].get('network.join_port'), setValue: function(v) {join_port.value = v}}

function submit_host(){
  __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].set('network.host_port',host_port.value)
  ipc.send('network-connect',{
    mode: 'host',
    host_port: host_port.value,
    join_host: join_host.value,
    join_port: join_port.value
  })
  __WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].close()
  return false
}

function submit_join(){
  __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].set('network.join_host',join_host.value)
  __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].set('network.join_port',join_port.value)
  ipc.send('network-connect',{
    mode: 'join',
    host_port: host_port.value,
    join_host: join_host.value,
    join_port: join_port.value
  })
  __WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].close()
  return false
}
function render(){
  return([
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('form.host.divider',{onsubmit: submit_host}, [
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.text_field.port',[__WEBPACK_IMPORTED_MODULE_0_mithril___default()('label','port'),__WEBPACK_IMPORTED_MODULE_0_mithril___default()("input[type='text']",{oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr('value',host_port.setValue), value: host_port.value })]),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()("input[type='submit']",{value: 'Host'})
    ]),
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('form.join',{onsubmit: submit_join}, [
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.text_field.host',[__WEBPACK_IMPORTED_MODULE_0_mithril___default()('label','host'),__WEBPACK_IMPORTED_MODULE_0_mithril___default()("input[type='text']",{oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr('value',join_host.setValue), value: join_host.value })]),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.text_field.port',[__WEBPACK_IMPORTED_MODULE_0_mithril___default()('label','port'),__WEBPACK_IMPORTED_MODULE_0_mithril___default()("input[type='text']",{oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr('value',join_port.setValue), value: join_port.value })]),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()("input[type='submit']",{value: 'Join'})
    ])
  ])
}

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_mode__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mithril__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mithril__);



let audio_sfx_volume = 100
let audio_msx_volume = 100

function render(){
  return __WEBPACK_IMPORTED_MODULE_1_mithril___default()('form',[
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.check_box.sfx',[
      __WEBPACK_IMPORTED_MODULE_1_mithril___default()("input[type='range']",{
        min:"0",
        max:"100",
        value: audio_sfx_volume,
        oninput: function(e){
         audio_sfx_volume = e.target.value
        }
      }),
      __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.val',[
        'Sound Effects: ',
        audio_sfx_volume + '%'
      ])
    ]),
    __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.check_box.msx',[
      __WEBPACK_IMPORTED_MODULE_1_mithril___default()("input[type='range']",{
        min:"0",
        max:"100",
        value: audio_msx_volume,
        oninput: function(e){
         audio_msx_volume = e.target.value
        }
      }),
      __WEBPACK_IMPORTED_MODULE_1_mithril___default()('.val',[
        'Music: ',
        audio_msx_volume + '%'
      ])
    ])
  ])
}

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_mode__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);





const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_3_electron___default.a

let replay_files = []
let replay_dir   = __WEBPACK_IMPORTED_MODULE_2_common_store__["a" /* default */].get('replay_dir')
ipc.send('replay-list')
ipc.on('replay-dir',function(event,dir){
  replay_dir = dir
  __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw()
})
ipc.on('replay-list',function(event,files){
  replay_files = files
  __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw()
})

function click_reveal_replay_dir(){
  ipc.send('replay-dir-reveal')
}
function click_change_replay_dir(){
  ipc.send('replay-dir-change')
}
function click_change_replay_dir(){
  ipc.send('replay-dir-change')
}
function click_reset_replay_dir(){
  ipc.send('replay-dir-reset')
}
function click_replay_play(file){
  return function(){
    ipc.send('replay-load',file)
    __WEBPACK_IMPORTED_MODULE_1_ui_mode__["a" /* default */].close()
  }
}
function click_replay_remove(file){
  return function(){
    i = replay_files.indexOf(file)
    replay_files.splice(i, 1)
    ipc.send('replay-delete',file)
  }
}

function settings_replay_items(){
  let items = []
  for (let file of replay_files){
    items.push(__WEBPACK_IMPORTED_MODULE_0_mithril___default()('tr.item',[
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('td.name', file),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('td.date', ''),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('td.actions',[
        __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.button.small.replay.icon',{onclick: click_replay_play(file)}, [
          __WEBPACK_IMPORTED_MODULE_0_mithril___default()('span.fa.fa-play'),
          __WEBPACK_IMPORTED_MODULE_0_mithril___default()('span','Replay')
        ]),
        __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.button.small.delete',{onclick: click_replay_remove(file)}, [
          __WEBPACK_IMPORTED_MODULE_0_mithril___default()('span.fa.fa-trash-o')
        ])
      ])
    ]))
  }
  return items
}
function render(){
  return __WEBPACK_IMPORTED_MODULE_0_mithril___default()('form',[
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.text_field.replay_dir',[
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('label','Replay Folder Location:'),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.input',replay_dir),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.buttons',[
        __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.button.reveal',{onclick: click_reveal_replay_dir},'Reveal'),
        __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.button.change',{onclick: click_change_replay_dir},'Change'),
        __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.button.reset' ,{onclick: click_reset_replay_dir },'Reset'),
      ]),
      __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.clear')
    ]),
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()('.data-table', __WEBPACK_IMPORTED_MODULE_0_mithril___default()('table',settings_replay_items()))
  ])
}
/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_game__ = __webpack_require__(0);




const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_0_electron___default.a

class CoreControls {
  constructor() {
  }

  create() {
    this.callbacks = {
      pl0_up    : function(){},
      pl0_down  : function(){},
      pl0_left  : function(){},
      pl0_right : function(){},
      pl0_a     : function(){},
      pl0_b     : function(){},
      pl0_l     : function(){},
      pl0_r     : function(){},
      pl0_start : function(){},
      pl1_up    : function(){},
      pl1_down  : function(){},
      pl1_left  : function(){},
      pl1_right : function(){},
      pl1_a     : function(){},
      pl1_b     : function(){},
      pl1_l     : function(){},
      pl1_r     : function(){},
      pl1_start : function(){}
    }

    __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].input.gamepad.start()
    this.pad = __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].input.gamepad.pad1

    this._simdown = {
      pl0_up    : false,
      pl0_down  : false,
      pl0_left  : false,
      pl0_right : false,
      pl0_a     : false,
      pl0_b     : false,
      pl0_l     : false,
      pl0_r     : false,
      pl0_start : false,
      pl1_up    : false,
      pl1_down  : false,
      pl1_left  : false,
      pl1_right : false,
      pl1_a     : false,
      pl1_b     : false,
      pl1_l     : false,
      pl1_r     : false,
      pl1_start : false
    } //simulated down
    this._down = {}
    this.keys  = []
    this.rebind()

    ipc.on('controls-rebind', (event) => {
      this.rebind()
      this.map(0,{
        up:    this.callbacks.pl0_up,
        down:  this.callbacks.pl0_down,
        left:  this.callbacks.pl0_left,
        right: this.callbacks.pl0_right,
        a:     this.callbacks.pl0_a,
        b:     this.callbacks.pl0_b,
        l:     this.callbacks.pl0_l,
        r:     this.callbacks.pl0_r,
        start: this.callbacks.pl0_start
      })
      this.map(1,{
        up:    this.callbacks.pl1_up,
        down:  this.callbacks.pl1_down,
        left:  this.callbacks.pl1_left,
        right: this.callbacks.pl1_right,
        a:     this.callbacks.pl1_a,
        b:     this.callbacks.pl1_b,
        l:     this.callbacks.pl1_l,
        r:     this.callbacks.pl1_r,
        start: this.callbacks.pl1_start
      })
    })
  }
  rebind(){
    let inputs = __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].get('inputs')
    __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].input.keyboard.reset()
    this.keys = {}
    this.keys.pl0_up    = this.add_input(inputs[0])
    //player 1
    this.keys.pl0_down  = this.add_input(inputs[1])
    this.keys.pl0_left  = this.add_input(inputs[2])
    this.keys.pl0_right = this.add_input(inputs[3])
    this.keys.pl0_a     = this.add_input(inputs[4])
    this.keys.pl0_b     = this.add_input(inputs[5])
    this.keys.pl0_l     = this.add_input(inputs[6])
    this.keys.pl0_r     = this.add_input(inputs[7])
    this.keys.pl0_start = this.add_input(inputs[8])
    //player 2
    this.keys.pl1_up    = this.add_input(inputs[9])
    this.keys.pl1_down  = this.add_input(inputs[10])
    this.keys.pl1_left  = this.add_input(inputs[11])
    this.keys.pl1_right = this.add_input(inputs[12])
    this.keys.pl1_a     = this.add_input(inputs[13])
    this.keys.pl1_b     = this.add_input(inputs[14])
    this.keys.pl1_l     = this.add_input(inputs[15])
    this.keys.pl1_r     = this.add_input(inputs[16])
    this.keys.pl1_start = this.add_input(inputs[17])
    //global binding

    // AB - This should work but refuses to do so.
    //const key = game.input.keyboard.addKey(Phaser.Keyboard.ESC)
    //key.onDown.add(this.toggle_menu,this)
  }
  toggle_menu(){
    console.log('toggle menu')
  }
  add_input(i){
    if(typeof(i) === 'string'){
      if (i.charAt(1) === 'P') { // check for button
        return [
          parseInt(i.charAt(0)),
          parseInt(i.substr(4,i.length-1))
        ]
      } else if (i.charAt(1) === 'A') { // check for axis
        return [
          parseInt(i.charAt(0)),
          parseInt(i.charAt(4)),
          i.substr(5)
        ]
      }
    } else {
      return __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].input.keyboard.addKey(i)
    }
  }
  is_down(pi,key){
    const name = `pl${pi}_${key}`
    return this._down[name] > 0
  }
  disable(){
    this.map(0,{})
    this.map(1,{})
  }
  map(pi,opts){
    const keys = "up down left right a b l r start".split(' ');
    for (let key of keys) {
      this.map_key(pi,key,opts)
    }
  }
  map_key(pi,key,opts){
    const fun = opts[key] ? opts[key] : function() {};
    this.callbacks[`pl${pi}_${key}`] = fun
  }
  serialize(pi){
    var byte = 0x00
    if(this.check_down(false,`pl${pi}_up`   )){byte = byte | 0x01} //0000 0001
    if(this.check_down(false,`pl${pi}_down` )){byte = byte | 0x02} //0000 0010
    if(this.check_down(false,`pl${pi}_left` )){byte = byte | 0x04} //0000 0100
    if(this.check_down(false,`pl${pi}_right`)){byte = byte | 0x08} //0000 1000
    if(this.check_down(false,`pl${pi}_a`    )){byte = byte | 0x10} //0001 0000
    if(this.check_down(false,`pl${pi}_b`    )){byte = byte | 0x20} //0010 0000
    if(this.check_down(false,`pl${pi}_r`    )||
       this.check_down(false,`pl${pi}_l`    )){byte = byte | 0x40} //0100 0000
    if(this.check_down(false,`pl${pi}_start`)){byte = byte | 0x80} //1000 0000
    return byte
  }
  execute(pi,byte){
    this.execute_key(byte,pi,0x01,'up')
    this.execute_key(byte,pi,0x02,'down')
    this.execute_key(byte,pi,0x04,'left')
    this.execute_key(byte,pi,0x08,'right')
    this.execute_key(byte,pi,0x10,'a')
    this.execute_key(byte,pi,0x20,'b')
    this.execute_key(byte,pi,0x40,'r')
    this.execute_key(byte,pi,0x80,'start')
  }
  execute_key(byte,pi,at,key){
    const name = `pl${pi}_${key}`
    if ((byte & at) === at) {
      this._simdown[name] = true
    } else {
      this._simdown[name] = false
    }
  }
  trigger(name){
    this.callbacks[name](this._down[name]++)
  }
  load(snapshot){
    this._down.pl0_up    = snapshot[0][0]
    this._down.pl0_down  = snapshot[0][1]
    this._down.pl0_left  = snapshot[0][2]
    this._down.pl0_right = snapshot[0][3]
    this._down.pl0_a     = snapshot[0][4]
    this._down.pl0_b     = snapshot[0][5]
    this._down.pl0_l     = snapshot[0][6]
    this._down.pl0_r     = snapshot[0][7]
    this._down.pl0_start = snapshot[0][8]
    this._down.pl1_up    = snapshot[0][9]
    this._down.pl1_down  = snapshot[0][10]
    this._down.pl1_left  = snapshot[0][11]
    this._down.pl1_right = snapshot[0][12]
    this._down.pl1_a     = snapshot[0][13]
    this._down.pl1_b     = snapshot[0][14]
    this._down.pl1_l     = snapshot[0][15]
    this._down.pl1_r     = snapshot[0][16]
    this._down.pl1_start = snapshot[0][17]

    this._simdown.pl0_up    = snapshot[1][0]
    this._simdown.pl0_down  = snapshot[1][1]
    this._simdown.pl0_left  = snapshot[1][2]
    this._simdown.pl0_right = snapshot[1][3]
    this._simdown.pl0_a     = snapshot[1][4]
    this._simdown.pl0_b     = snapshot[1][5]
    this._simdown.pl0_l     = snapshot[1][6]
    this._simdown.pl0_r     = snapshot[1][7]
    this._simdown.pl0_start = snapshot[1][8]
    this._simdown.pl1_up    = snapshot[1][9]
    this._simdown.pl1_down  = snapshot[1][10]
    this._simdown.pl1_left  = snapshot[1][11]
    this._simdown.pl1_right = snapshot[1][12]
    this._simdown.pl1_a     = snapshot[1][13]
    this._simdown.pl1_b     = snapshot[1][14]
    this._simdown.pl1_l     = snapshot[1][15]
    this._simdown.pl1_r     = snapshot[1][16]
    this._simdown.pl1_start = snapshot[1][17]
  }
  get snap(){
    return [[
       this._down.pl0_up
      ,this._down.pl0_down
      ,this._down.pl0_left
      ,this._down.pl0_right
      ,this._down.pl0_a
      ,this._down.pl0_b
      ,this._down.pl0_l
      ,this._down.pl0_r
      ,this._down.pl0_start
      ,this._down.pl1_up
      ,this._down.pl1_down
      ,this._down.pl1_left
      ,this._down.pl1_right
      ,this._down.pl1_a
      ,this._down.pl1_b
      ,this._down.pl1_l
      ,this._down.pl1_r
      ,this._down.pl1_start
    ],[
       this._simdown.pl0_up
      ,this._simdown.pl0_down
      ,this._simdown.pl0_left
      ,this._simdown.pl0_right
      ,this._simdown.pl0_a
      ,this._simdown.pl0_b
      ,this._simdown.pl0_l
      ,this._simdown.pl0_r
      ,this._simdown.pl0_start
      ,this._simdown.pl1_up
      ,this._simdown.pl1_down
      ,this._simdown.pl1_left
      ,this._simdown.pl1_right
      ,this._simdown.pl1_a
      ,this._simdown.pl1_b
      ,this._simdown.pl1_l
      ,this._simdown.pl1_r
      ,this._simdown.pl1_start
    ]]
  }
  check_down(sim,key){
    const input = this.keys[key]
    if(sim) {
      if (this._simdown[key]){ 
        return true
      } else {
        return false
      }
    } else {
      if (Array.isArray(input)) {
        if (__WEBPACK_IMPORTED_MODULE_2_core_game__["default"].input.gamepad.supported && __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].input.gamepad.active && this.pad.connected){
          if (input.length === 2){
            return this.pad.isDown(input[1])
          }
          else if (input.length === 3){
            if      (input[2] === 'U') { return this.pad.axis(input[1]) < -0.1}
            else if (input[2] === 'D') { return this.pad.axis(input[1]) >  0.1}
            else if (input[2] === 'L') { return this.pad.axis(input[1]) < -0.1}
            else if (input[2] === 'R') { return this.pad.axis(input[1]) >  0.1}
            else { return false }
          }
        } else {
          return false
        }
      } else if (input !== undefined){
        return input.isDown
      } else {
        return false
      }
    }
  }
  update(sim0=false,sim1=false){
    this.update_pl(sim0,0)
    this.update_pl(sim1,1)
  }
  update_pl(sim,pi){
    if      (this.check_down(sim,`pl${pi}_left`) ){ this.trigger(`pl${pi}_left`) }
    else if (this.check_down(sim,`pl${pi}_right`)){ this.trigger(`pl${pi}_right`)}
    else {
      this._down[`pl${pi}_left`]  = 0
      this._down[`pl${pi}_right`] = 0
    }

    if      (this.check_down(sim,`pl${pi}_up`)  ){ this.trigger(`pl${pi}_up`)  }
    else if (this.check_down(sim,`pl${pi}_down`)){ this.trigger(`pl${pi}_down`) }
    else {
      this._down[`pl${pi}_up`]   = 0
      this._down[`pl${pi}_down`] = 0
    }

    if (this.check_down(sim,`pl${pi}_a`))    { this.trigger(`pl${pi}_a`)     } else { this._down[`pl${pi}_a`]     = 0 }
    if (this.check_down(sim,`pl${pi}_b`))    { this.trigger(`pl${pi}_b`)     } else { this._down[`pl${pi}_b`]     = 0 }
    if (this.check_down(sim,`pl${pi}_l`))    { this.trigger(`pl${pi}_l`)     } else { this._down[`pl${pi}_l`]     = 0 }
    if (this.check_down(sim,`pl${pi}_r`))    { this.trigger(`pl${pi}_r`)     } else { this._down[`pl${pi}_r`]     = 0 }
    if (this.check_down(sim,`pl${pi}_start`)){ this.trigger(`pl${pi}_start`) } else { this._down[`pl${pi}_start`] = 0 }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CoreControls;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


class CoreSounds {
  create() {
    this.sfx_swap = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_swap')

    this.msx_stage_results  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('msx_stage_results')
    this.msx_stage          = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('msx_stage')
    this.msx_stage_critical = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('msx_stage_critical')

    this.state_music = 'none'

    this.sfx_land = []
    this.sfx_land[0]  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_drop0')
    this.sfx_land[1]  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_drop1')
    this.sfx_land[2]  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_drop2')
    this.sfx_land[3]  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_drop3')

    this.sfx_confirm = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_confirm')
    this.sfx_select  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_select')

    this.sfx_blip  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_countdown_blip')
    this.sfx_ding  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_countdown_ding')
  } 

  land() {
    this.sfx_land[0].play()
  }

  swap() {
    this.sfx_swap.play()
  }

  confirm() {
    //this.sfx_confirm.play()
  }

  select() {
    this.sfx_select.play()
  }

  blip() {
    this.sfx_blip.play()
  }

  ding() {
    this.sfx_ding.play()
  }

  stage_music(state) {
    switch (state) {
      case 'pause':
        switch (this.state_music) {
          case 'active':
            this.msx_stage.pause();
            break;
          case 'danger': 
            this.msx_stage_critical.pause();
            break;
        }
        break;
      case 'resume':
        switch (this.state_music) {
          case 'active':
            this.msx_stage.resume();
            break;
          case 'danger':
            this.msx_stage_critical.resume();
            break;
        }
        break;
      case 'none':
        this.state_music = state;
        this.msx_stage.stop();
        this.msx_stage_critical.stop();
        this.msx_stage_results.stop();
        break;
      case 'active':
        if (this.state_music != 'active') {
          this.state_music = state;
          this.msx_stage.play('',0,0.5,true);
          this.msx_stage_critical.stop();
          this.msx_stage_results.stop();
        }
        break;
      case 'danger':
        if (this.state_music != 'danger') {
          this.state_music = state;
          this.msx_stage.stop();
          this.msx_stage_critical.play();
          this.msx_stage_results.stop();
        }
        break;
      case 'results':
        if (this.state_music != 'results') {
          this.state_music = state;
          this.msx_stage.stop();
          this.msx_stage_critical.stop();
          this.msx_stage_results.play();
        }
        break;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CoreSounds;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dgram__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dgram___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dgram__);


class Server {
  get state(){ return this._state }

  get address(){ return `${this.host}:${this.port}` }
  get host(){ return this._host }
  get port(){ return this._port }
  get send_address(){ return `${this.send_host}:${this.send_port}` }
  get send_host(){ return this._send_host }
  get send_port(){ return this._send_port }

  set host(v){ this._host = v }
  set port(v){ this._port = v }
  set send_host(v){ this._send_host = v }
  set send_port(v){ this._send_port = v }

  get seed(){ return this._seed }
  set seed(v){ this._seed = v }

  get pos(){ return this._pos }
  set pos(v){ this._pos = v }

  create(port,host,callback){
    if(port === null) { throw(new Error('port can not be null')) }
    if(host === null) { throw(new Error('host can not be null')) }
    this.states  = {}
    this._state  = 'inactive'
    this.port    = port
    this.host    = host
    this.server = __WEBPACK_IMPORTED_MODULE_0_dgram___default.a.createSocket('udp4')
    this.server.on('error'    , this.error)
    this.server.on('message'  , this.message)
    this.server.on('listening', this.listening(callback))
    this.server.bind(this.port,this.host)
    this.on('ping',function(data){
      this.pong(data)
    }.bind(this))
  }
  on(key,callback){
    this.states[key] = callback
  }
  connected(callback){
    this._state     = 'awaiting'
    this._connected = callback
  }
  connect(port,host,seed,callback){
    if(port === null) { throw(new Error('port can not be null')) }
    if(host === null) { throw(new Error('host can not be null')) }
    this._connected = callback
    this._state    = 'connecting'
    this.seed      = seed
    this.send_port = port
    this.send_host = host
    this.send('connecting',seed)
  }
  error(err){
    //console.log(`server error:\n${err.stack}`)
    this.server.close()
  }
  buf_int(v,data){
    const size = Math.ceil(data.toString(2).length / 8)
    const arr  = new Array(size+1).fill(null)
    arr[0] = v
    const buf  = Buffer.from(arr)
    buf.writeUIntBE(data,1,size)
    return buf
  }
  buf_str(v,data){
    const buf1 = Buffer.from([v])
    const buf2 = Buffer.from(data, 'ascii')
    const buf = Buffer.concat([buf1,buf2],buf1.length+buf2.length)
    return buf
  }
  buf_framedata(v,data){
    const size0 = Math.ceil(data.ack0.toString(2).length / 8)
    const size1 = Math.ceil(data.ack1.toString(2).length / 8)

    const arr  = [v,null,null,null].concat(data.frames).concat(new Array(size0+size1))
    const buf  = Buffer.from(arr)
    buf.writeUInt8(data.frame_count,1)
    buf.writeUInt8(size0,2)
    buf.writeUInt8(size1,3)
    buf.writeUIntBE(data.ack0,
                    data.frame_count+4, //offset
                    size0)
    buf.writeUIntBE(data.ack1,
                    data.frame_count+4+size0, //offset
                    size1)
    return buf
  }
  msg_int(buf){
    return buf.readUIntBE(1,buf.length-1)
  }
  msg_str(buf){
    return buf.toString('ascii', 1)
  }
  msg_framedata(buf){
    const frame_count = buf.readUInt8(1)
    const offset      = 4+frame_count
    const size0       = buf.readUInt8(2)
    const size1       = buf.readUInt8(3)
    const ack0        = buf.readUIntBE(offset,size0)
    const ack1        = buf.readUIntBE(offset+size0,size1)
    const frames      = []
    for (let i = 4; i < frame_count+4 ; i++){
      frames.push(buf[i])
    }
    return {
      frame_count: frame_count,
      frames: frames,
      ack0: ack0,
      ack1: ack1
    }
  }
  signal(k,data){
         if (k === 'connecting') {return this.buf_str(0x00,data)}
    else if (k === 'connected')  {return Buffer.from([0x01])}
    else if (k === 'ping')       {return this.buf_int(0x02,data)}
    else if (k === 'pong')       {return this.buf_int(0x03,data)}
    else if (k === 'framedata')  {return this.buf_framedata(0x04,data)}
    else {throw(new Error("no idea what you want to send"))}
  }
  // 0x00 - connecting
  // 0x01 - connected
  // 0x02 - ping
  // 0x03 - pong
  // 0x04 - framedata
  msg(buf){
         if (buf[0] === 0x00                    ) {return ['connecting',this.msg_str(buf)]}
    else if (buf[0] === 0x01 && buf.length === 1) {return ['connected' ,null]}
    else if (buf[0] === 0x02                    ) {return ['ping'      ,this.msg_int(buf)]}
    else if (buf[0] === 0x03                    ) {return ['pong'      ,this.msg_int(buf)]}
    else if (buf[0] === 0x04)                     {return ['framedata' ,this.msg_framedata(buf)] }
    else {throw(new Error("no idea what you go"))}
  }
  message(buf,req){
    //console.log(`${this.address} >| ${req.address}:${req.port} :::${buf}`)

    const [sig,data] = this.msg(buf)

    if (sig === 'connecting' && this.state === 'awaiting'){
      this.seed   = data
      this._state = 'connected'
      this._connected(null,true)
      this.send_port = req.port
      this.send_host = req.address
      this.send('connected')
    } else if (sig === 'connected' && this.state === 'connecting'){
      this._state = 'connected'
      if (this.send_port === req.port && this.send_host === req.address){
        this._connected(null,{port: req.port, host: req.address})
      } else {
        this._connected("port and host don't match",{port: req.port, host: req.address})
      }
    } else {
      //console.log('sig',sig)
      if (this.states[sig]) {
        this.states[sig](data)
      } else {
        console.log('error',sig,data)
        throw(new Error('no idea where to go'))
      }
    }
  }
  listening(callback){
    return function(){
      this._state  = 'listening'
      const address = this.server.address()
      //console.log(`${address.address}:${address.port} :::listening`)
      if (callback){callback()}
    }.bind(this)
  }
  send(name,data){
    const buf = this.signal(name,data)
    if(this.send_port === null) { throw(new Error('port can not be null')) }
    if(this.send_host === null) { throw(new Error('host can not be null')) }
    this.server.send(buf, 0, buf.length, this.send_port, this.send_host, this.sent)
  }
  sent(err, bytes){
    if (err){throw err}
    //console.log(`${this.address} -> ${this.send_address} :::${bytes}`)
  }
  ping(){
    this.send('ping',new Date().getTime())
  }
  pong(data){
    // fake delay between 20ms to 2s
    //const s = Math.floor(Math.random() * (20 - 2 + 1)) + 2
    //setTimeout(function(){
      this.send('pong',data)
    //}.bind(this),s*10)
  }
  close(){
    this.server.close()
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Server;
 // klass


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("dgram");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);

class StatesBoot {
  create() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].stage.backgroundColor = '#282828'
    this.pixelate()
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].state.start('load')
  }

  pixelate() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].stage.disableVisibilityChange = true

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].scale.pageAlignHorizontally = true;
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].scale.pageAlignVertically = true;

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].scale.setResizeCallback(function () {
      var height = window.innerHeight;
      var width = window.innerWidth;
     
      var resize_vertical_black_bars = () => {
        this.game.width = height;
        this.game.height = height;
      }
      
      var resize_fully = () => {
        this.game.width = width;
        this.game.height = height;
      }

      resize_fully();
    }, this);

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].renderer.renderSession.roundPixels = true
    Phaser.Canvas.setImageRenderingCrisp(__WEBPACK_IMPORTED_MODULE_0_core_game__["default"].canvas)
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = StatesBoot;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);



const {px} = __WEBPACK_IMPORTED_MODULE_1_core_filters__["a" /* default */]
  /** Loads all sprites, spritesheets, sound effects, etc to the phaser game
   *  Uses signals to detect once everything has been loaded correctly
   */
class StatesLoad {
  create() {
    const x = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerX
    const y = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerY
    const font_style1 = { font: '20px Verdana', fill: '#FFF', align: 'center' }
    const font_style2 = { font: '12px Verdana', fill: '#FFF', align: 'center' }
    this.loader = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.text(0,y    , `Loading ${0}%`, font_style1)
    this.files  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.text(0,y+40 , "Files 0 / 0"  , font_style2)
    this.file   = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.text(0,y+70 , ""             , font_style2)
    this.loader.visible = false
    this.files.visible  = false
    this.file.visible   = false
    
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.onLoadStart.add(this.load_start   , this)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.onFileComplete.add(this.file_complete, this)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.onLoadComplete.add(this.load_complete, this)
    this.load_all()
  }

  load_start() {

  }
  
  file_complete(progress,key,success,cur,total){
    this.files.setText(`Files ${cur} / ${total}`)
    this.file.setText(key)
  } 

  load_complete() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.create()
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.create()
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].state.start('menu')
  }

  update() {
    this.loader.setText(`Loading ${__WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.progress}%`);
  }

  render() {
    //this.loader.visible = true
    //this.files.visible  = true
    //this.file.visible   = true
  }

  load_all() {
    // Music --------
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('msx_stage'         , './assets/music/stage.mp3')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('msx_stage_critical', './assets/music/stage_critical.mp3')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('msx_stage_results' , './assets/music/stage_results.mp3')
    // SFX ----------
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_confirm', './assets/sound_effects/pause.ogg')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_select' , './assets/sound_effects/confirm.ogg')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_swap'   , './assets/sound_effects/swap.ogg')

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_countdown_blip'   , './assets/sound_effects/countdown_blip.ogg')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_countdown_ding'   , './assets/sound_effects/countdown_ding.ogg')

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_drop0'   , './assets/sound_effects/drop0.ogg')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_drop1'   , './assets/sound_effects/drop1.mp3')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_drop2'   , './assets/sound_effects/drop2.mp3')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_drop3'   , './assets/sound_effects/drop3.mp3')

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_pop0', './assets/sound_effects/pop0.ogg');
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_pop1', './assets/sound_effects/pop1.ogg');
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_pop2', './assets/sound_effects/pop2.ogg');
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.audio('sfx_pop3', './assets/sound_effects/pop3.ogg');
    //game.load.audio('sfx_pop4', './assets/sound_effects/pop4.mp3');
    //game.load.audio('sfx_pop5', './assets/sound_effects/pop5.mp3');
    // Bg -----------
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('bg_blue'  , './assets/images/bg_blue.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('bg_green' , './assets/images/bg_green.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('bg_purple', './assets/images/bg_purple.png')
    // UI -----------
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('ints_small' , './assets/images/ints_small.png'  , px(8), px(8 ), 18)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('ints_large' , './assets/images/ints_large.png'  , px(8), px(14),18)
    // Menus --------
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('menu'             , './assets/images/menu.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('menu_cursor'      , './assets/images/menu_cursor.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('menu_pause_cursor', './assets/images/menu_pause_cursor.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('menu_pause'       , './assets/images/menu_pause.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('pause'            , './assets/images/pause.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('puzzle_menu'       , './assets/images/puzzle_menu.png')
    // Playfield ----
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('playfield_cursor'    , './assets/images/playfield_cursor.png'  , px(38), px(22), 2)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_vs_frame'        , './assets/images/playfield_vs_frame.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_vs_bg'           , './assets/images/playfield_vs_bg.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('mode_puzzle_bg'            , './assets/images/mode_puzzle_bg.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('playfield_countdown' , './assets/images/playfield_countdown.png', px(62), px(38), 4)

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('panels'              , './assets/images/panels.png'   , px(16), px(16), 136)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('garbage'             , './assets/images/garbage.png'  , px(16), px(16), 14)

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char00', './assets/images/characters/char00.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char01', './assets/images/characters/char01.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char02', './assets/images/characters/char02.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char03', './assets/images/characters/char03.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char04', './assets/images/characters/char04.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char05', './assets/images/characters/char05.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char06', './assets/images/characters/char06.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char07', './assets/images/characters/char07.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char08', './assets/images/characters/char08.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char09', './assets/images/characters/char09.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char10', './assets/images/characters/char10.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char11', './assets/images/characters/char11.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_char12', './assets/images/characters/char12.png')

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_wall0', './assets/images/playfield_wall0.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image('playfield_wall1', './assets/images/playfield_wall1.png')

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('star_counter', './assets/images/star_counter.png',px(16),px(16),12)

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('bauble'          , './assets/images/bauble.png',px(3),px(16),6)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.image(      'bauble_times'    , './assets/images/bauble_times.png')
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('bauble_num'      , './assets/images/bauble_num.png',px(6),px(9),10)
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('bauble_num_small', './assets/images/bauble_num_small.png',px(5),px(9),10)

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('panel_particles', './assets/images/pop_frames.png', px(16), px(16), 8);
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.spritesheet('zephyr', './assets/images/zephyr_all.png', 48, 48, 60);

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].load.start()
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = StatesLoad;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_menu__ = __webpack_require__(44);



/**
 * Higher Order Menu that keeps the menu updated - Adds Background
 */
class StatesMenu {
  constructor() {
    this.menu   = new __WEBPACK_IMPORTED_MODULE_1_components_menu__["a" /* default */]();
  }

  /** loads the gamebackground, creates the menu object */
  create() {
    this.bg = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.tileSprite(0, 0, __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.width, __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.height, 'bg_green');
    this.menu.create();
  }

  /** controls & and menu are updated to move around,
   *  tilepos is changed to act as a parralax
   */
  update() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.update();
    this.menu.update();
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** stops controller support */
  shutdown() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.disable()
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = StatesMenu;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_menu_cursor__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);





const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_3_electron___default.a
const {px} = __WEBPACK_IMPORTED_MODULE_1_core_filters__["a" /* default */]

/** Class representing a menu. */
class ComponentMenu {
  constructor() {
    this.cursor = new __WEBPACK_IMPORTED_MODULE_2_components_menu_cursor__["a" /* default */]()
  }
  
  create() {
    // create sprite, choose centerXY and anchor to the middle of the sprite - remembered when rescaling
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(__WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerX, __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.centerY, 'menu');
    this.sprite.anchor.setTo(0.5);               

    this.cursor.create(this, -90, -46, [
      this.mode_1p_vs_2p_local,
      this.mode_1p_vs_2p_online,
      this.mode_1p_vs_cpu,
      this.mode_improve,
      this.mode_option
    ]);
  }
  
  update() {
    this.cursor.update()
  }
  
  mode_1p_vs_2p_local() {
    ipc.send('play-vs',{online: false, cpu: [false,false]})
  }
  
  mode_1p_vs_2p_online() {
    ipc.send('settings','network')
  }
  
  mode_1p_vs_cpu() {
    ipc.send('play-vs',{online: false, cpu: [false,true]})
  }

  /** starts the mode_puzzle state */
  mode_improve() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].state.start('puzzle_menu', true, false);
  }
  
  mode_option() {
    ipc.send('settings','replay')
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentMenu;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);



const {UNIT, MENUCURSORBLINK} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class ComponentMenuCursor {
  constructor() {
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.update = this.update.bind(this);
  }

  create(menu,x,y,menu_items) {
    this.menu = menu;
    this.x = x;
    this.y = y;
    this.menu_items = menu_items;

    this.counter = 0;
    this.index  = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(this.x, this.y+(this.index*UNIT), 'menu_cursor');
    this.menu.sprite.addChild(this.sprite);

    this.map_controls(0)
    this.map_controls(1)
  }

  map_controls(pi) {
    return __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.map(pi, {
      up   : this.up,
      down : this.down,
      a    : this.confirm,
      b    : this.cancel,
      start: this.confirm
    });
  }

  up(tick) {
    if (tick > 0) { return }
    if (this.index !== 0) {
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.select()
      this.counter = 0;
      this.sprite.visible = true;
      return this.index--;
    }
  }

  down(tick) {
    if (tick > 0) { return }
    if (this.index !== (this.menu_items.length-1)) {
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.select()
      this.counter = 0;
      this.sprite.visible = true;
      return this.index++;
    }
  }

  confirm(tick) {
    if (tick > 0) { return }
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.confirm()
    return this.menu_items[this.index]()
  }

  cancel(tick) {
    if (tick > 0) { return }
    return console.log('cancel');
  }

  update() {
    this.sprite.y = this.y+(this.index*UNIT);
    this.counter++;
    if (this.counter > MENUCURSORBLINK) {
      this.counter = 0;
      return this.sprite.visible = !this.sprite.visible;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentMenuCursor;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_seedrandom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_seedrandom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_seedrandom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_inputs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_snapshots__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_stack__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_playfield__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_ping__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_debug_frame__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_timer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_components_menu_pause__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_components_star_counter__ = __webpack_require__(72);















const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_0_electron___default.a
const { px } = __WEBPACK_IMPORTED_MODULE_3_core_filters__["a" /* default */]
const {
  ROWS,
  COLS
} = __WEBPACK_IMPORTED_MODULE_5_core_data__["a" /* default */]

class ModeVs {
  constructor() {
    this.playfield1   = new __WEBPACK_IMPORTED_MODULE_8_components_playfield__["a" /* default */](0)
    this.playfield2   = new __WEBPACK_IMPORTED_MODULE_8_components_playfield__["a" /* default */](1)
    this.ping         = new __WEBPACK_IMPORTED_MODULE_9_components_ping__["a" /* default */]()
    this.debug_frame  = new __WEBPACK_IMPORTED_MODULE_10_components_debug_frame__["a" /* default */]()
    this.timer        = new __WEBPACK_IMPORTED_MODULE_11_components_timer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2_core_game__["default"])

    this.menu_pause   = new __WEBPACK_IMPORTED_MODULE_12_components_menu_pause__["a" /* default */]()
    this.star_counter = new __WEBPACK_IMPORTED_MODULE_13_components_star_counter__["a" /* default */]()
  }

  static initClass() {
    this.prototype.rng = null
    this.prototype.debug = false
    this.prototype.roll = {}
  }
  init(data){
    this.rounds_won = [2,1]
    this.tick   = 0
    this.seed   = data.seed
    this.cpu    = data.cpu
    this.online = data.online
    this.rng    = __WEBPACK_IMPORTED_MODULE_1_seedrandom___default()(this.seed, {state: true})
    
    this.inputs = new __WEBPACK_IMPORTED_MODULE_4_core_inputs__["a" /* default */](data.inputs,data.online,this)
    this.snapshots = new __WEBPACK_IMPORTED_MODULE_6_core_snapshots__["a" /* default */]()
    this.roll = {
      ready: false,
      from: null,
      to: null
    }
  }

  get snap(){
    return [this.rng.state(), this.state];
  }

  load(snapshot){
    let state = this.rng.state() 
    this.rng = __WEBPACK_IMPORTED_MODULE_1_seedrandom___default()(this.seed, {state: snapshot[0]}) 
    this.state = snapshot[1] 
  }

  get state(){ return this._state }
  set state(v){ this._state = v }

  get online(){  return this._online }
  set online(v){ this._online = v }

  get cpu(){  return this._cpu }
  set cpu(v){ this._cpu = v }

  create_bg() {
    this.bg = __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].add.sprite(0,0, 'playfield_vs_bg');
  }
  create_frame(offset){
    this.frame = __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].add.sprite(offset,0, 'playfield_vs_frame');
  }
  create() {
    ipc.send('log',`VS ${this.seed} ------------------------------`)
    this.danger = false

    const offset = px(55);
    this.create_bg()

    const stack = new __WEBPACK_IMPORTED_MODULE_7_core_stack__["a" /* default */](this.rng);
    stack.create({ range: 6, ground: 2, wells: "average", chips: "many" });

    if (this.online && __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].server.pos === 1) {
      this.playfield2.create(this, {countdown: true, push: true, x: offset+px(184), y: px(24), panels: stack.panels})
      this.playfield1.create(this, {countdown: true, push: true, x: offset+px(8  ), y: px(24), panels: stack.panels})
    } else {
      this.playfield1.create(this, {countdown: true, push: true, x: offset+px(8  ), y: px(24), panels: stack.panels})
      this.playfield2.create(this, {countdown: true, push: true, x: offset+px(184), y: px(24), panels: stack.panels})
    }

    this.create_frame(offset)
    this.playfield1.create_after()
    this.playfield2.create_after()
    this.timer.create(offset+px(128),px(168));

    this.snapshots.create(
      this,
      this.playfield1,
      this.playfield2,
      this.timer
    )
    this.snapshots.snap(0)

    if (this.online){
      this.ping.create()
    }
    this.debug_frame.create()

    this.menu_pause.create(this)
    this.star_counter.create(this,px(91),px(91))
  }

  /** turns on the menu, changes it state, turns of the timer from counting */
  pause(){
    __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].sounds.stage_music('pause');

    this.state = "pause";
    this.timer.running = false;
    this.menu_pause.pause();
  }

  /** called by the menu and reassigns control to both playfields, timer runs again */
  resume() {
    // only resumes the game if countdown's are over
    if (this.playfield1.countdown.state === null ||
        this.playfield2.countdown.state === null) {
      __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].sounds.stage_music('resume');
      
      this.state = "running";
      this.timer.running = true;
    }
    
    this.playfield1.cursor.map_controls();
    this.playfield2.cursor.map_controls();
  }

  game_over() {
    console.log('gameover')
    if(!this.inputs.replay){
      ipc.send('replay-save', {seed: this.seed, inputs: this.inputs.serialize});
    }
    __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].sounds.stage_music('results')
    this.timer.running = false
    this.playfield1.game_over()
    this.playfield2.game_over()
  }
  danger_check() {
    const d1 = this.playfield1.danger(1)
    const d2 = this.playfield2.danger(2)

    if (d1 || d2) {
      if (this.danger === false) {
        __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].sounds.stage_music('danger')
      }
      this.danger = true
    } else {
      if (this.danger === true) {
        __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].sounds.stage_music('active')
      }
      this.danger = false
    }
  }
  roll_to(from,to){
    if (from > to) { // rollback
    } else { //rollforward
      this.snapshots.load(from)
      this.log_stack(from,'snap')
      // since we loaded a snapshot, maybe we don't need to step
      // throuh the frame we loaded the snapshot on.
      for (let i = from+1; i <= to; i++) {
        this.step(i)
        this.log_stack(i)
      }
    }
    this.roll = {ready: false, from: null, to: null}
  }
  update() {
    this.roll_log_heading = []
    this.roll_log_data    = []
    this.log_stack(this.tick,'start')
    if (this.roll.ready){
      ipc.send(
        'log',
        `RL ${this.tick}: ${this.roll.from} ${this.roll.to}`
      )
      this.roll_to(this.roll.from,this.roll.to)
    }
    this.step(false)
    this.log_stack(this.tick,'end')

    //ipc.send(
      //'log',
      //`ST ${this.tick}: ${this.log_roll()}`
    //)

    this.menu_pause.update()
    this.star_counter.update()
  }

  log_stack(tick,format=null){
    this.roll_log_heading.push({tick: tick, format: format})
    for (let i = 0; i < ROWS; i++){
      let line = ''
      line += this.playfield1._stack[0+(i*COLS)].log()
      line += this.playfield1._stack[1+(i*COLS)].log()
      line += this.playfield1._stack[2+(i*COLS)].log()
      line += ' '
      line += this.playfield1._stack[3+(i*COLS)].log()
      line += this.playfield1._stack[4+(i*COLS)].log()
      line += this.playfield1._stack[5+(i*COLS)].log()
      line += '  '
      line += this.playfield2._stack[0+(i*COLS)].log()
      line += this.playfield2._stack[1+(i*COLS)].log()
      line += this.playfield2._stack[2+(i*COLS)].log()
      line += ' '
      line += this.playfield2._stack[3+(i*COLS)].log()
      line += this.playfield2._stack[4+(i*COLS)].log()
      line += this.playfield2._stack[5+(i*COLS)].log()
      if (this.roll_log_data[i] === undefined){
        this.roll_log_data[i] = []
      }
      this.roll_log_data[i].push(line)
    }
  }

  log_roll(){
    let str    = ""
    let format = null
    let tick   = null

    str   += "\n"
    for (let i = 0; i < this.roll_log_heading.length; i++){
      tick   = `${this.roll_log_heading[i].tick}                     `
      tick   = tick.substr(0,22)
      format = this.roll_log_heading[i].format
      str += tick
    }

    for (let i = 0; i < ROWS; i++){
      str   += "\n"

      if (Math.floor(ROWS/2) === i) {
        for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
          format = this.roll_log_heading[ii].format
          str += this.roll_log_data[i][ii]
          if (ii < this.roll_log_data[i].length-1){
             if (format === 'start' ||
                 format === 'end') {
               str += ' -|-> '
             } else {
               str += ' ---> '
             }
          }
        }
      } else {
        for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
          format = this.roll_log_heading[ii].format
          str += this.roll_log_data[i][ii]
          if (ii < this.roll_log_data[i].length-1){
             if (format === 'start' ||
                 format === 'end') {
               str += '  |   '
             } else {
               str += '      '
             }
          }
        }
      }
    }
    return str
  }

  step(tick){
    if (tick === false) {
      this.tick++
    }
    // we need to swap the playfield update order for
    // one of the players otherwise in multipalyer it will
    // generate the panels on the wrong side.
    if (this.online && __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].server.pos === 1) {
      this.playfield2.update()
      this.playfield1.update()
    } else {
      this.playfield1.update()
      this.playfield2.update()
    }
    this.danger_check()
    if (tick === false) {
      this.inputs.update(this.tick,true)
      __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].controls.update()
      this.snapshots.snap(this.tick)
    } else {
      this.inputs.update(tick,false)
      __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].controls.update(false,true)
      this.snapshots.snap(tick)
    }
  }
  render(){
    if(this.debug){
      console.log('debugger triggered')
      debugger
    }
    this.timer.render()
    if (this.playfield1) { this.playfield1.render() }
    if (this.playfield2) { this.playfield2.render() }
    if (this.online){
      this.ping.render()
    }
    //this.debug_frame.render(this.tick)
    this.star_counter.render()
  }
  shutdown() {
    console.log('shutdown mode_vs')
    __WEBPACK_IMPORTED_MODULE_2_core_game__["default"].sounds.stage_music('none')
    this.playfield1.shutdown()
    this.playfield2.shutdown()
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = ModeVs;



/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(7)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(7)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(7)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(7)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(7)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(7)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(16);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return seedrandom; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


class Snapshots {
  /** Saves variables which need to get snapped or loaded
   * @param {mode} stage chosen mode to play in
   * @param {playfield} p0 first one
   * @param {playfield} p1 second one
   * @param {Timer} timer timer of the mode
   */ 
  create(stage, p0, p1, timer){
    // to snap / load
    this.stage      = stage;
    this.playfield0 = p0;
    this.playfield1 = p1;
    this.timer      = timer;

    // counter for each Frame
    this.index      = -1;
    this.index_tick = 0;
    
    // snapshot size limit 120 saved Frames
    this.snapshot   = new Array(120).fill(null);
  }
  
  get stage(){ return this._stage }
  set stage(v){ this._stage = v}

  get playfield0(){ return this._playfield0 }
  set playfield0(v){ this._playfield0 = v}

  get playfield1(){ return this._playfield1 }
  set playfield1(v){ this._playfield1 = v}

  /** indexes get updated through methods 
   *  each saved variable gets loaded with a snapshot provided through the new index
   * @param {integer} tick possibly from networking 
   */
  load(tick){
    this.index      = this.cindex(tick);
    this.index_tick = this.cindex_tick(tick);

    // all objects - subobjects to load with a snapshot
    this.playfield0.load(this.snapshot[this.index][0]);
    this.playfield1.load(this.snapshot[this.index][1]);
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.load(  this.snapshot[this.index][2]);
    this.stage.load(this.snapshot[this.index][3]);
    this.timer.load(this.snapshot[this.index][4]);
  }

  cindex(tick){
    const offset = tick - this.index_tick
    if (offset >= 0){return offset}
    else            {return 120+offset}
  }

  cindex_tick(tick){
    const offset = tick - this.index_tick
    if (offset >= 0){return this.index_tick}
    else            {return this.index_tick-120}
  }

  snap(tick){
    if (this.index >= 119){
      this.index      = -1;
      this.index_tick = tick;
    }

    this.index++;
    
    this.snapshot[this.index] = [this.playfield0.snap,
                                 this.playfield1.snap,
                                 __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.snap,
                                 this.stage.snap,
                                 this.timer.snap]
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Snapshots;
 


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_shuffle_seed__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_shuffle_seed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_shuffle_seed__);





const {
  COLS, 
  ROWS, 
  PANELS
  } = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

/** 
 * Creates a randomized 1d Array with numbers 
 * that can be assigned to a Stack to form all Sprites
 * The Algorithm creates the Numbers carefully so 
 * no combos are done once finished
 */
class Stack {
   /** Panels Array that saves the numbers being generated  
   * @param {object} rng seed that the randomness is based on  
   */ 
  constructor(rng) { 
    this.rng = rng; 
    this.panels = 0;

    // null block generation
    this.kinds = [0, 1, 2, 3, 4, 5]; 
    this.wellArray = [];
    this.chipArray = [];
  }

  /**
   * from top to bottom creation of all playfields stack sprites
   * numbers are being generated - regenerated if recent numbers are the same
   * @param {object} object of parameters, so you now what youre changing to what 
   */
  create({ range = 5, ground = 1, wells = "average", chips = "average" }) {
    this.panels = new Array(PANELS).fill(null);

    this.wellArray = this.setArrayToSize({ noun: wells, lowest: 10, average: 20, highest: 40 });
    this.chipArray = this.setArrayToSize({ noun: chips, lowest: 2, average: 4, highest: 8 });
    
    // fill with nulls so empty space will result in unvisible blocks
    let savedNumbers = new Array(PANELS).fill(null);
    let lastNumber = -1;
    
    // generate numbers from top range to bottom
    for (var i = (PANELS - range * COLS); i < PANELS; i++) {
      let currentNumber = __WEBPACK_IMPORTED_MODULE_3_shuffle_seed___default.a.shuffle(this.kinds, this.rng())[0]; 

      // x and y pos to move in the array and detect things
      let indexes = __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].i2xy(i);

      // save the top number, if top number is set the number below it should never be the same
      let topNumber = savedNumbers[__WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].xy2i(indexes[0], indexes[1] - 1)];

      // random chance that currentnumber is simply null
      if (this.wellArray.length != 1) 							// only if wellArray size has been set
        if (i < (PANELS - ground * COLS))						// only generate nulls above ground
          if (__WEBPACK_IMPORTED_MODULE_3_shuffle_seed___default.a.shuffle(this.wellArray, this.rng())[0] == 1)  	
            currentNumber = null;

      // random chance to have null blocks through chips sets created
      if (this.chipArray.length != 1) 
        if (i < PANELS - ((range - 1) * COLS))		// chips are only the top layer
          if (__WEBPACK_IMPORTED_MODULE_3_shuffle_seed___default.a.shuffle(this.chipArray, this.rng())[0] == 1) 
            currentNumber = null;

      // if x = 0 we dont need to detect the left neighbor color so we set last to something different
      if (indexes[0] == 0) 
        lastNumber == -1;

      // generate new number until currentNumber is unique
      // not when its already null, do when its top / last number is same
      while (currentNumber != null &&
             currentNumber == topNumber ||
             currentNumber == lastNumber) {
        currentNumber = __WEBPACK_IMPORTED_MODULE_3_shuffle_seed___default.a.shuffle(this.kinds, this.rng())[0]; 
      }

      // set last number and send current to array
      lastNumber = currentNumber;
      savedNumbers[i] = currentNumber;
    }

    // nullifyBlocksAboveNulls
    for (var i = PANELS; i > 0; i--)
      if (savedNumbers[i] === null) 		// important === ... == caused bugs
        savedNumbers[i - COLS] = null;

    this.panels = savedNumbers;
  }

  /**
   * sets an Array to a size acording to prechosen sizes 
   * @param {object} noun and supposed to be array sizes, the larger the less chances
   * @returns {Array} 
   */
  setArrayToSize({ noun, lowest, average, highest }) {
    let size = 0;
    
    switch (noun) {
      case "none": 										break;
      case "many": 		size = lowest; 	break;
      case "average": size = average; break;
      case "few": 		size = highest; break;
      default: console.log("not existing statement sent"); break;
    }

    // set space for wellArray
    let arr = new Array(size).fill(0);
    arr[0] = 1;

    return arr;
  }

  /**
   * logs the array created in a readable way for debugging purposes
   * @param {Array} arrayToLog 1d array of numbers/elements
   */
  logArrayLikeAPlayfield(arrayToLog) {
    for (var i = 0; i < ROWS; i++) {
      let str = "";

      for (var j = 0; j < COLS; j++)
        str += arrayToLog[__WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].xy2i(j, i)] + "  ";

      console.log(str);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stack;



/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

;(function() {
	var self = {};

	if(Math.seedrandom) seedrandom = Math.seedrandom;

	var isArray = function($){
		return Object.prototype.toString.call( $ ) === '[object Array]'
	}

	var extend = function(obj) {
		for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) obj[key] = arguments[i][key];
		return obj;
	}

	var seedify = function(seed){
		if (/(number|string)/i.test(Object.prototype.toString.call(seed).match(/^\[object (.*)\]$/)[1])) return seed;
		if (isNaN(seed)) return Number(String((this.strSeed = seed)).split('').map(function(x){return x.charCodeAt(0)}).join(''));
		return seed;
	}

	var seedRand = function(func,min,max){
		return Math.floor(func() * (max - min + 1)) + min;
	}

	self.shuffle = function(arr,seed){
		if (!isArray(arr)) return null;
		seed = seedify(seed) || 'none';

		var size = arr.length;
		var rng = seedrandom(seed);
		var resp = [];
		var keys = [];

		for(var i=0;i<size;i++) keys.push(i);
		for(var i=0;i<size;i++){
			var r = seedRand(rng,0,keys.length-1);
			var g = keys[r];
			keys.splice(r,1);
			resp.push(arr[g]);
		}
		return resp;
	}

	self.unshuffle = function(arr,seed){
		if (!isArray(arr)) return null;
		seed = seedify(seed) || 'none';

		var size = arr.length;
		var rng = seedrandom(seed);
		var resp = [];
		var map = [];
		var keys = [];

		for(var i=0;i<size;i++) {
			resp.push(null);
			keys.push(i);
		}

		for(var i=0;i<size;i++){
			var r = seedRand(rng,0,keys.length-1);
			var g = keys[r];
			keys.splice(r,1);
			resp[g]=arr[i];
		}

		return resp;
	}

	if(true){
		module.exports=self;
	} else {
		this['shuffleSeed']=self;
	}
}.call(this));


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);



const {
  GARBAGE
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class ComponentGarbage {
  create(stage, pi){
    this.stage = stage
    this.pi    = pi
    this.queue = []
    // 0 1 2 3 4 5
    this.alternate = [
      {index: 0, frame: [0,1,2,3,4,5]}, // 1 garbage wide
      {index: 0, frame: [0,4,2]},       // 2 garbage wide
      {index: 0, frame: [0,3,1,2]},     // 3 garbage wide
      {index: 0, frame: [0,2]},         // 4 garbage wide
      {index: 0, frame: [0,1]},         // 5 garbage wide
      {index: 0, frame: [0]}            // 6 garbage wide
    ]

  }

  alt(size) {
    const x   = this.alternate[size-1].frame[this.alternate[size-1].index]
    const len = this.alternate[size-1].frame.length
    this.alternate[size-1].index++
    if (this.alternate[size-1].index >= len){
      this.alternate[size-1].index = 0
    }
    return x
  }

  update(combo,chain) {
    let ncombo = false
    let nchain = false
    if (combo > 3) { ncombo = combo }
    if (chain > 0) { nchain = chain }
    if (ncombo !== false || nchain !== false) {
      this.push(ncombo,nchain)
    }

    if (this.queue.length > 0) {
      this.queue[0].counter--
      if (this.queue[0].counter === 0){
        this.shift()
      }
    }
  }

  push(combo,chain) {
    const delay = 20
    this.queue.push({
      counter: delay,
      combo  : combo,
      chain  : chain
    })

    // send out character animation before the 20frames delay
    if (combo > 3) {
      if (this.pi === 0)
        this.stage.playfield1.character.sprite.play("attack");
      else if (this.pi === 1)
        this.stage.playfield2.character.sprite.play("attack");
    }
  }

  shift() {
    let playfield = null
    if (this.pi === 0) { playfield = this.stage.playfield2 }
    else               { playfield = this.stage.playfield1 }
    if (
      playfield.stack(0).empty &&
      playfield.stack(1).empty &&
      playfield.stack(2).empty &&
      playfield.stack(3).empty &&
      playfield.stack(4).empty &&
      playfield.stack(5).empty
    ) {
      this.left  = !this.left
      const v = this.queue.shift()

      // if garbage sent after delay - play attacked on the playfield chosen
      if (v.combo > 3)
        playfield.character.sprite.play("attacked");

      if (v.combo === 4) {
        const o = this.alt(3) //offset
        playfield.stack(o+0).set_garbage(this.stage.tick)
        playfield.stack(o+1).set_garbage(this.stage.tick)
        playfield.stack(o+2).set_garbage(this.stage.tick)
      } else if (v.combo === 5){
        const o = this.alt(4) //offset
        playfield.stack(o+0).set_garbage(this.stage.tick)
        playfield.stack(o+1).set_garbage(this.stage.tick)
        playfield.stack(o+2).set_garbage(this.stage.tick)
        playfield.stack(o+3).set_garbage(this.stage.tick)
      } else if (v.combo === 6){
        const o = this.alt(5) //offset
        playfield.stack(o+0).set_garbage(this.stage.tick)
        playfield.stack(o+1).set_garbage(this.stage.tick)
        playfield.stack(o+2).set_garbage(this.stage.tick)
        playfield.stack(o+3).set_garbage(this.stage.tick)
        playfield.stack(o+4).set_garbage(this.stage.tick)
      } else if (v.combo === 7){
        const o = this.alt(6) //offset
        playfield.stack(o+0).set_garbage(this.stage.tick)
        playfield.stack(o+1).set_garbage(this.stage.tick)
        playfield.stack(o+2).set_garbage(this.stage.tick)
        playfield.stack(o+3).set_garbage(this.stage.tick)
        playfield.stack(o+4).set_garbage(this.stage.tick)
        playfield.stack(o+5).set_garbage(this.stage.tick)
      } else if (v.combo === 8){
        playfield.stack(o+0).set_garbage(this.stage.tick)
        playfield.stack(o+1).set_garbage(this.stage.tick)
        playfield.stack(o+2).set_garbage(this.stage.tick)
        playfield.stack(o+3).set_garbage(this.stage.tick)
        playfield.stack(o+4).set_garbage(this.stage.tick)
        playfield.stack(o+5).set_garbage(this.stage.tick)

        playfield.stack(o+0).set_garbage(this.stage.tick)
        playfield.stack(o+1).set_garbage(this.stage.tick)
        playfield.stack(o+2).set_garbage(this.stage.tick)
        playfield.stack(o+3).set_garbage(this.stage.tick)
        playfield.stack(o+4).set_garbage(this.stage.tick)
        playfield.stack(o+5).set_garbage(this.stage.tick)
      } else if (v.combo === 9){
      } else if (v.combo === 10){
      } else if (v.combo === 11){
      } else if (v.combo === 12){
      } else if (v.combo === 13){
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentGarbage;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);



const {px} = __WEBPACK_IMPORTED_MODULE_1_core_filters__["a" /* default */]

class ComponentPlayfieldCountdown {
  load(snapshot) {
    this.state   = snapshot[0]
    this.counter = snapshot[1]
  }

  get snap() {
    return [this.state, this.counter]
  }

  create(playfield) {
    this.playfield = playfield

    const x = this.playfield.x+px(16);
    const y = px(-38);
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(x, y, 'playfield_countdown', 0)

    if(this.playfield.should_countdown){
      this.counter = 0
      this.state   = 'moving'
    } else {
      this.state   = 'skip'
    }
  }

  update() {
    if (this.state === 'skip') { this.start() }
    if (this.state === 'moving') {
      if (this.sprite.y < px(80)) {
        this.sprite.y += px(4);
      } else {
        this.sprite.frame = 1;
        this.state = 3;
        this.playfield.cursor.entrance()
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.blip()
      }
    }
    if (this.state === 3) {
      this.counter++;
      if (this.counter > 60) {
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.blip()
        this.sprite.frame = 2;
        this.counter = 0;
        this.state = 2;
      }
    }
    if (this.state === 2) {
      this.counter++;
      if (this.counter > 60) {
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.blip()
        this.sprite.frame = 3;
        this.counter = 0;
        this.state = 1;
      }
    }
    if (this.state === 1) {
      this.counter++;
      if (this.counter > 60) {
        this.start()
      }
    }
  }

  start() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.ding()
    this.sprite.visible         = false
    this.playfield.cursor.state = 'active'
    if (this.playfield.stage.cpu[0] === false ||
       (this.playfield.stage.online !== false &&
        this.playfield.pi == 0
       )){
      this.playfield.cursor.map_controls()
    }
    this.playfield.cursor.sprite.visible = true
    this.playfield.stage.state = 'running'
    if (this.playfield.stage.timer) {
      this.playfield.stage.timer.running = true
    }

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.stage_music('active')
    this.state = null
  }

  render() {
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPlayfieldCountdown;



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);



const {
  COLS,
  ROWS_INV,
  ROWS_VIS,
  ROWS,
  UNIT,
  STARTPOS_PANELCURSOR_SPEED,
  PANELCURSOR_CHECK_SPEED
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class ComponentCursor {
  /** bindings only */
  constructor() {
    // movement keys
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);

    // actions
    this.swap = this.swap.bind(this);
    this.undo_swap = this.undo_swap.bind(this)
    this.push = this.push.bind(this);
    this.pause = this.pause.bind(this);

    // utility methods
    this.pressed_then_held = this.pressed_then_held.bind(this);
  }

  /**
   * Initialises the Cursor's position in x & y, counter, and its sprite
   * Also adds this sprite to a layer above the blocks
   * @param {object} playfield 
   * @param {string} mode B button changes methods depending on the stage
   */
  create(playfield, modetype = "vs"){
    this.playfield  = playfield
    this.state      = 'hidden'

    this.counter_flicker = 0
    this.counter         = 0

    // this is the starting position of the
    // cursor. We have to offset using ROWS_INV
    // to get its correct position for visible porition
    // of the playfield
    this.x = 2
    this.y = 6 + ROWS_INV

    let x,y, visible

    if(this.playfield.should_countdown){
      x = ((COLS-2)*UNIT) - this.offset
      y = 0               - this.offset
      visible = false
    } else {
      x = (this.x * UNIT) - this.offset
      y = (this.y * UNIT) - this.offset
      visible = true
      this.state = 'active'
      this.map_controls()
    }
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(x, y, 'playfield_cursor', 0);
    this.sprite.animations.add('idle', [0,1]);
    this.sprite.animations.play('idle', Math.round(__WEBPACK_IMPORTED_MODULE_0_core_game__["default"].time.desiredFps / 10), true);
    this.sprite.visible = visible;

    this.playfield.layer_cursor.add(this.sprite);

    this.ignore = false;

    this.mode = modetype;
    this.cursor_swap_history = [];
  }

  /**
   * This is the offset for the cursor so it appears
   * perfectly over the panel
   */
  get offset(){
    return (UNIT / 16) * 3
  }

  get snap() {
    return [
      this.x,
      this.y,
      this.state,
      this.counter_flicker,
      this.counter
    ];
  }

  load(data){
    this.x               = data[0];
    this.y               = data[1];
    this.state           = data[2];
    this.counter_flicker = data[3];
    this.counter         = data[4];
  }

  entrance() {
    this.sprite.visible = true;
    this.state = 'entering';
  }

  /**
   * defines the game controls and links the callsbacks to this cursors methods
   */
  map_controls() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.map(this.playfield.pi, {
      up   : this.up,
      down : this.down,
      left : this.left,
      right: this.right,
      a    : this.swap,
      b    : this.mode === "vs" ? this.swap : this.undo_swap,
      l    : this.push,
      r    : this.push,
      start: this.pause
    });
  }

  /**
   * If tick was at 0 or tick is over a certain number return true
   * @param {integer} tick increasing counter
   * @returns bool
   */
  pressed_then_held(tick) {
    if (tick == 0) 
      this.ignore = false;

    if (tick > 15)
      this.ignore = true;

    return this.ignore || tick == 0;
  }

  /**
   * Moves the cursor up once if it isnt at the top of the playfield,
   * only when pressed_then_held returns true
   * @param {integer} tick increasing counter
   * @returns true if actually moved
   */
  up(tick) {
    if (this.pressed_then_held(tick)) 
      if (this.y > ROWS_VIS) {
        this.y--; 
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.select();
      }
  }

  /**
   * Moves the cursor down once if it isnt at the bottom of the playfield,
   * only when pressed_then_held returns true
   * @param {integer} tick increasing counter
   * @returns true if actually moved
   */
  down(tick) {
    if (this.pressed_then_held(tick))
      if (this.y < (ROWS - 1)) {
        this.y++; 
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.select();
      }
  }

  /**
   * Moves the cursor down once if it isnt at the left of the playfield,
   * only when pressed_then_held returns true
   * @param {integer} tick increasing counter
   * @returns true if actually moved
   */
  left(tick) {
    if (this.pressed_then_held(tick)) 
      if (this.x > 0) { 
          this.x--; 
          __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.select();
      }
  }

  /**
   * Moves the cursor down once if it isnt at the right of the playfield,
   * only when pressed_then_held returns true
   * @param {integer} tick increasing counter
   * @returns true if actually moved
   */
  right(tick) {
    if (this.pressed_then_held(tick)) 
      if (this.x < (COLS - 2)) { 
        this.x++; 
        __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.select();
      }
  }

  /**
   * Calls the attached Playfield's swap method from where the Player hovers over
   * Only triggered when the key is pressed once, the playfields state is running and
   * the cursor's state is active
   * 
   * puzzle mode - saves the panel positions of all blocks after each swap
   * 
   * @param {integer} tick increasing counter
   */
  swap(tick) {
    if (tick > 0 || 
        this.playfield.stage.state !== 'running' || 
        this.state !== 'active') 
      return; 

    if (this.playfield.swap(this.x, this.y)) 
      if (this.mode === "puzzle") {
        let stack_in_kind = [];
        this.playfield.stack().forEach((panel, i) => {
          stack_in_kind[i] = panel.kind;
        });
        this.cursor_swap_history.push(stack_in_kind);
      }
  }

  /** 
   * undoes the latest swap - up to the beginning before swapping started
   * @param {integer} tick acts as a timer - allows only keypresses
   */
  undo_swap(tick) {
    if (tick > 0) 
      return;

    // reset stack, decrease counter by one!
    if (this.cursor_swap_history.length !== 0) 
      this.playfield.reset_stack(this.cursor_swap_history.pop(), --this.playfield.swap_counter);
  }

  /**
   * Calls the Pause method of the stage when a button is pressed
   * @param {integer} tick acts as a timer - allows only keypresses
   */
  pause(tick) {
    if (tick > 0) 
      return; 

    this.playfield.stage.pause();
  }

  /**
   * Calls the attached Playfield's push method to move all the panels higher
   * Only triggered when the playfields state is running and the cursor's state is active
   * @param {integer} tick increasing counter
   */
  push(tick) {
    if (this.playfield.stage.state !== 'running' ||
        this.state !== 'active')
      return;
    this.playfield.pushing = true;
  }

  /** updates the internal x & y pos, animation for flickers, setting controls once entered */
  update() {
    // should check in a deterministic way for preactive
    let x = (this.x * UNIT) - this.offset;
    let y = (ROWS_INV * UNIT) + (this.y * UNIT) - this.offset;

    if (this.state === 'entering' || this.state === 'preactive') {
      this.counter_flicker++;
      
      if (this.counter_flicker > 1) 
        this.counter_flicker = 0;
    }
  }

  /** updates the actual sprite position, almost the same as update() */
  render(){
    let x = (this.x * UNIT) - this.offset
    let y = (this.y * UNIT) - this.offset

    if ((this.state === 'entering') ||
        (this.state === 'preactive')) {
      if (this.counter_flicker === 1) {
        this.sprite.visible = !this.sprite.visible
      }
    }
    switch (this.state) {
      case 'entering':
        // increases by STARTPOS_PANELCURSOR_SPEED until y is reached, then sets it to y
        this.sprite.y = this.sprite.y < y ? this.sprite.y + STARTPOS_PANELCURSOR_SPEED : y;
        
        // once sprite.y has reached its goal position move x the same way
        if (this.sprite.y === y)
          this.sprite.x = this.sprite.x > x ? this.sprite.x - STARTPOS_PANELCURSOR_SPEED : x;
      
        if (this.sprite.x === x && this.sprite.y === y) {
          this.map_controls();
          this.state = "preactive";
        }

        break;
      case 'preactive': case 'active':
        this.sprite.x = x;
        this.sprite.y = y;
        break;
    }
  }

  /** empty */
  shutdown() {
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentCursor;



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);




const {px} = __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */]
const {
  WALL_ROLLUP,
  UNIT,
  ROWS_VIS
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class ComponentPlayfieldWall {
  create(playfield,x,y){
    this.playfield = playfield
    this.sprite    = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(x, y, `playfield_wall${this.playfield.pi}`)
    this.counter   = 0
  }

  update() {
    if (this.counter < WALL_ROLLUP.length-1) {
      this.counter++
    }
  }

  render() {
    //frame animation offset from from the bottom of the wall
    this.sprite.y = px(this.playfield.y + 168 - WALL_ROLLUP[this.counter])
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPlayfieldWall;



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


class ComponentScore {
  create() {
    this.lbl = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.text(0, 10, '0', {
      fontSize: '16px',
      fill: 0x000000
    });
    this.lbl.y = 10;
    this.lbl.setTextBounds(50, 0, 46, 32);
    this.lbl.boundsAlignH = 'right';
    this.lbl.align        = 'right';
    this.lbl.lineSpacing  = -7;
  }

  update(chain,score) {
    let text  = `${score}`;
    if (chain) { text += `\nchain: ${chain+1}`; }
    this.lbl.setText(text);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentScore;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_bauble__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_panel_garbage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_panel_particle__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_shuffle_seed__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_shuffle_seed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_shuffle_seed__);








const {
  UNIT,
  SWAP_L,
  SWAP_R,
  SWAPPING_L,
  SWAPPING_R,
  STATIC,
  HANG,
  FALL,
  LAND,
  GARBAGE,
  CLEAR,
  PANELS,
  COLS,
  ROWS_INV,
  ROWS,
  FRAME_LAND,
  FRAME_CLEAR,
  FRAME_LIVE,
  FRAME_DANGER,
  FRAME_DEAD,
  FRAME_NEWLINE,
  ANIM_SWAP_LEFT,
  ANIM_SWAP_RIGHT,
  TIME_SWAP,
  TIME_CLEAR,
  TIME_POP,
  TIME_FALL,
  TIME_PARTICLE
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

/** 
 *
 */
class ComponentPanel {
  get [Symbol.toStringTag](){ return 'Panel' }
  get kind()    { return this.i }
  set kind(val) {        this.i = val }

  /**
   *  The panel's counter does two things
   *
   *  1. It keeps track of the index of a panel's animation in `animate()`
   *  2. It's the timer used to determine when to change a panel's state in `update()`
   *
   *  @type {number}
   */
  get counter()    {return this.attr_counter }
  set counter(val) {       this.attr_counter = val }
  
  get state()    {return this.attr_state }
  set state(val) {       this.attr_state = val }

  get chain()    {return this.attr_chain }
  set chain(val) { this.attr_chain = val }

  get  left(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x-1,this.y)   ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x-1,this.y)   }
  get right(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x+1,this.y)   ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x+1,this.y)   }
  get under(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x  ,this.y+1) ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x  ,this.y+1) }
  get above(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x  ,this.y-1) ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x  ,this.y-1) }

  get  left2(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x-2,this.y) ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x-2,this.y)  }
  get right2(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x+2,this.y) ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x+2,this.y)  }
  get under2(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x,this.y+2) ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x  ,this.y+2)}
  get above2(){ return __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */].out_of_bounds(this.x,this.y-2) ? __WEBPACK_IMPORTED_MODULE_3_components_panel_blank__["a" /* default */] : this.playfield.stack(this.x  ,this.y-2)}

  /** */
  constructor() {
    this.bauble_chain  = new __WEBPACK_IMPORTED_MODULE_4_components_bauble__["a" /* default */]()
    this.panel_garbage = new __WEBPACK_IMPORTED_MODULE_5_components_panel_garbage__["a" /* default */]()

    // each panel has 5 particles - in create these are set to follow a circular path!
    this.particles = [];
    for (let i = 0; i < 5; i++) 
      this.particles[i] = new __WEBPACK_IMPORTED_MODULE_6_components_panel_particle__["a" /* default */]();
  }

  /** */
  static initClass() {
    this.prototype.playfield          = null
    this.prototype.x                  = null
    this.prototype.y                  = null
    this.prototype.chain              = null
    this.prototype.sprite             = null
    this.prototype.i                  = null
  }

  /** */
  get snap() {
    let snap_particles = []
    this.particles.forEach((particle, i) => {
      snap_particles[i] = particle.snap
    })

    return [
      this.x,
      this.y,
      this.kind,
      this.state,
      this.counter,
      this.chain,
      this.group,
      snap_particles
    ]
  }

  /** */
  load(data){
    this.x       = data[0]
    this.y       = data[1]
    this.kind    = data[2]
    this.state   = data[3]
    this.counter = data[4]
    this.chain   = data[5]
    this.garbage = data[6]
    this.group   = data[7]
    
    this.particles.forEach((particle, i) => {
      particle = data[8][i]
    })
  }

  /** */
  create(playfield, x, y){
    this.playfield = playfield
    this.counter   = 0
    this.i = null
    this.x = x;
    this.y = y;
    this.state = STATIC
    this.chain = 0

    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(this.x * UNIT, this.y * UNIT, 'panels',0);
    this.playfield.layer_block.add(this.sprite)
    // shouldn't have to call visible false
    // here as it should be taken care of in render
    // but without it here, it causes a flicker at
    // start of match. If we can find someone way to
    // move this in the render that would be ideal.
    this.sprite.visible = false

    this.panel_garbage.create(this,this.playfield)
    this.bauble_chain.create(this)
  
    // circular path is getting set, 
    // angle needs to be defined so the particles know where to start properly
    // if type: "normal" you should only define 4 ComponentParticles, not more not less,
    // if type: "rotate" the amount of particles doesnt matter
    let angle = 0;
    let step = (2 * Math.PI) / this.particles.length;
    this.particles.forEach((particle, i) => {
      particle.create({panel: this, type: "rotate", id: i, angle: angle});
      angle += step;
    });
  }

  set_garbage(group){
    this.state = GARBAGE
    this.panel_garbage.group = group
    this.panel_garbage.state = FALL
  }

  /** resets this panel to a normal state - stops animation usefull for stack resets */ 
  soft_reset() {
    this.counter = 0;
    this.state = STATIC;
  }

  /** */
  get swappable() {
    return  this.above.state !== HANG &&
            (this.state === STATIC ||
            // LAND will swap but will play must at play least 1 frame.
            (this.state === LAND && this.counter < FRAME_LAND.length)  
    )
  }
  /** */
  get support()   {  return this.state !== FALL && !this.hidden }
  /** */
  get clearable() {  return this.swappable && this.under.support && !this.hidden }
  /** */
  get comboable() {  return this.clearable || (this.state === CLEAR && this.playfield.clearing.indexOf(this))}
  /** */
  get empty() {      return  this.state === STATIC && this.hidden }
  /** */
  get hidden(){      return (this.kind === null) }

  log(){
    const k = (this.kind === null) ? 'N' : this.kind
    return `${k}`
  }

  /** */
  matched(kind){
    return ((this.left.kind  === kind) && (this.right.kind  === kind)) ||
           ((this.above.kind === kind) && (this.under.kind  === kind)) ||
           ((this.above.kind === kind) && (this.above2.kind === kind)) ||
           ((this.under.kind === kind) && (this.under2.kind === kind)) ||
           ((this.left.kind  === kind) && (this.left2.kind  === kind)) ||
           ((this.right.kind === kind) && (this.right2.kind === kind))
  }
  /** */
  get frame(){ return this.sprite.frame }
  /**
   * Sets the current frame based on panel kind
   *
   * We use a spritesheet for all the panels graphics.
   * Each panel kind eg. green, red, blue takes up one row in the spritespeet.
   *
   */
  set frame(i){ this.sprite.frame = (this.kind * 8) + i}
  /** */
  set(i){
    switch (i) {
      case 'unique':
        this.kind = this.nocombo();
        break;
      default:
        this.kind = i;
        break;
    }
  }

    /** */
    get swappable() {
      return  this.above.state !== HANG &&
              (this.state === STATIC ||
              // LAND will swap but will play must at play least 1 frame.
              (this.state === LAND && this.counter < FRAME_LAND.length)  
      )
    }
    /** */
    get support()   {  return this.state !== FALL && !this.hidden }
    /** */
    get clearable() {  return this.swappable && this.under.support && !this.hidden }
    /** */
    get comboable() {  return this.clearable || (this.state === CLEAR && this.playfield.clearing.indexOf(this) && this.counter === 0)}
    /** */
    get empty() {      return  this.state === STATIC && this.hidden }
    /** */
    get hidden(){      return (this.kind === null) }

    log(){
      const k = (this.kind === null) ? 'N' : this.kind
      return `${k}`
    }

  /** 
   * `update(i)` handles the states and its transition to other states.
   * A panel's state will usually change when the panel's `counter`
   * reaches zero.
   *
   */
  update(){
    if (this.state === GARBAGE) {
      this.panel_garbage.update()
    } else {
      if (this.newline){ return; }
      if (this.counter > 0) { this.counter--}
      switch (this.state) {
        case SWAP_L:
          if (this.counter > 0) { return }
          const i1 = this.kind
          const i2 = this.right.kind
          this.kind       = i2
          this.right.kind = i1

          this.state   = SWAPPING_L
          this.counter = TIME_SWAP
          break
        case SWAP_R:
          if (this.counter > 0) { return }
          this.state   = SWAPPING_R
          this.counter = TIME_SWAP
          break
        case SWAPPING_L:
          if (this.counter > 0) { return }
          this.state = STATIC
          break
        case SWAPPING_R:
          if (this.counter > 0) { return }
          this.state = STATIC
          break
        case STATIC:
          if ((this.under.empty && !this.empty) || this.under.state === HANG) {
            this.state   = HANG
            this.counter = 0
          } else if (this.danger && this.counter === 0) {
            // we add 1 otherwise we will miss out on one frame
            // since counter can never really hit zero and render
            this.chain = 0
            this.counter = FRAME_DANGER.length+1
          } else {
            this.chain = 0
          }
          break;
        case HANG:
          if (this.counter > 0) { return }
          this.state = FALL
          break;
        case FALL:
          if (this.counter > 0) { return }
          if (this.under.empty) {
            this.under.kind    = this.kind
            this.under.state   = this.state
            this.under.counter = this.counter
            this.under.chain   = this.chain

            this.kind    = null
            this.state   = STATIC
            this.counter = 0
            this.chain   = 0
          } else {
            this.state   = LAND
            this.counter = FRAME_LAND.length
          }
          //} else if (this.under.state === CLEAR) {
            //this.state = STATIC
          //} else {
            //this.state   = this.under.state
            //this.counter = this.under.counter
            //this.chain   = this.under.chain
          //}
            //this.state   = LAND
            //this.counter = FRAME_LAND.length
          break;
        case CLEAR:
          if (this.counter > 0) { 
            const [xi,xlen] = this.clear_index
            this.clear_i    = xi
            this.clear_len  = xlen

            const time_max = TIME_CLEAR + (TIME_POP*this.clear_len) + TIME_FALL
            this.time_pop = TIME_CLEAR + (TIME_POP* this.clear_i)
            this.time_cur = time_max - this.counter

            if (this.time_cur === this.time_pop) {
              this.particles.forEach((particle) => {
                particle.counter = TIME_PARTICLE;
              });

              this.clear_i < 6 ? __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sound.play("sfx_pop" + this.clear_i) : __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sound.play("sfx_pop5");
            }
          } else {
            if (this.above && !this.above.hidden && this.above.state === STATIC) {
              this.above.chain += 1
            }
            this.state   = STATIC
            this.kind    = null
            this.counter = 0
            this.chain   = 0
            this.group   = null
          }
          break;
        case LAND:
          if (this.counter > 0) { return }
          this.state = STATIC
          break;
        default:
          throw(new Error('unknown panel state'))
      }
    }

    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  /**
   * Determines whether a panel should be visible or not
   * at the time of render
   */
  render_visible(){
    if (this.hidden){
      this.sprite.visible = false
    } else if (this.state === CLEAR && this.time_cur >= this.time_pop) {
      this.sprite.visible = false
    } else {
      this.sprite.visible = true
    }
  }
  /**
   * Swaps the this panel with the panel to it's right.
   */
  swap() {
    if (this.hidden && this.right.hidden) { return }

    this.counter        = 0
    this.right.counter  = 0

    this.chain       = 0
    this.right.chain = 0

    this.state       = SWAP_L
    this.right.state = SWAP_R

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].sounds.swap()
  }
  /**
    Calculates and set the counter for the panel to pop
    @param {{number}} i
  */
  popping(i){
    this.counter = TIME_CLEAR + (TIME_POP*i) + TIME_FALL     
  }

  /**
   * `nocombo()` will return a number that represents a kind of panel
   * that will not result in a combo or the same number above.
   *
   *  eg. Lets say we have the following stack
   * ```js
   *  // 2 0 2
   *  // 1 3 1
   *  // 4 4 *
   * ```
   * Then we expect `nocombo()` to 
   * * return either `0,2,3`
   * * and it should not return `4` because that would result in a match
   * * and it should not return `1` because above it there is a `1` above
   * 
   * @returns {number} new kind to be set to!
  */
  nocombo() {
    const arr = [0, 1, 2, 3, 4] 
    if (this.above.kind){ arr.splice(arr.indexOf(this.above.kind), 1)} 
    let values = __WEBPACK_IMPORTED_MODULE_7_shuffle_seed___default.a.shuffle(arr,this.playfield.stage.rng()) 
    return this.i = values.find((i)=> { 
      return this.matched(i) === false 
    }) 
  }
  
  /** 
  * `danger()` will check if the this panel's column
  *  contains any active panel's a few panels from the top.
  *  and if it does it should return true, because this column
  *  in the stack is in danger.
  */
  get danger(){
    return !this.playfield.stack(this.x,1+ROWS_INV).hidden
  }
  /** 
  * `dead()` will check if the this panel's column contains
  * an active panel in the first row. If this is the case
  * then the this panel should be considered dead.
  */
  get dead(){
    return !this.playfield.stack(this.x,0+ROWS_INV).hidden
  }
  /** 
  * `newline()` checks if this panel is a newline.
  *  A panel is considered a newline when its the last
  *  row in the stack and the playfield should push panels,
  *  When a playfield should push panels it will add an extra
  *  row to the end of stack which for newline.
  */
  get newline(){
    return this.playfield.should_push && this.y === ROWS
  }
  /** 
  * `clear()` will change a panel's state to clear.
  * it will also on the same tick push this panel to
  * an array called `clearing`. This clearing array is used
  * to help set the counter time for the entire duration of the clear.
  * You can see this in `Playfield.chain_and_combo` where it will then
  * call `Panel.popping` to set the counter.
  */
  clear() {
    if (this.state === CLEAR) { return }
    this.state = CLEAR
    this.chain += 1
    this.playfield.clearing.push(this)
    this.group = this.playfield.stage.tick;
  }
  /**
   * Checks above and under and then left and right from the current panel.
   * Panels will be added to playfield.clearing to determine combo and chain
   *
   * */
  chain_and_combo() {
    if (!this.comboable) { return }

    if (this.left.comboable  && this.left.kind  === this.kind &&
        this.right.comboable && this.right.kind === this.kind) {
      this.left.clear()
      this.clear()
      this.right.clear()
    }

    if (this.above.comboable  && this.above.kind  === this.kind &&
        this.under.comboable  && this.under.kind  === this.kind) {
      this.above.clear()
      this.clear()
      this.under.clear()
    }
  }
  /**
   * 
   Returns the index of the current panel clearing and amount of panels clearing
   @returns {array} - [index,length]
   */
  get clear_index(){
    if (this.state !== CLEAR) {
      throw(new Error('clear_index called on none CLEAR panel'))
    }
    let panels = []
    for (let p of this.playfield.stack()){
      if (p.group === this.group &&
          p.state === CLEAR) {
        panels.push(p)
      }
    }
    return [panels.indexOf(this),panels.length]
  }

  /**
   * `animate()` is responsible for setting the panel's current sprite frame
   *  and in the case of swapping adjusting the sprite's `x` and `y`
   *
   * * newline  - when a panel is on a new line and appears greyed out
   * * dead     - when a panel shows a dead face
   * * danger   - when a panel is in danger it bounces
   * * clear    - when a panel is clearing it flashes and then vanishes
   * * land     - when a panel lands 
   * * swapping - when two panels swap
   * * live     - the panel's normal state
   *
   */
  animate(){
    if (this.newline) {
      this.frame = FRAME_NEWLINE
    } else if (this.dead === true && this.playfield.stage.state === 'gameover'){
      this.frame = FRAME_DEAD
    } else if (this.state === CLEAR){
      if (FRAME_CLEAR.length > this.time_cur){
        this.frame = FRAME_CLEAR[this.time_cur]
      }
    } else if (this.state === LAND){
      this.frame = FRAME_LAND[FRAME_LAND.length-this.counter]
    } else if (this.state === SWAPPING_L || this.state === SWAPPING_R){
      let v = (UNIT / TIME_SWAP) * this.counter
      switch (this.state) {
        case SWAPPING_L:
          this.sprite.x += v
          break
        case SWAPPING_R:
          this.sprite.x -= v
          break
      }
      this.frame = FRAME_LIVE
    } else if (this.danger){
      const i = FRAME_DANGER[FRAME_DANGER.length - this.counter+1]
      this.frame = i
    } else {
      this.frame = FRAME_LIVE
    }
  }
  /** */
  render(){
    this.sprite.x = this.x * UNIT
    this.sprite.y = this.y * UNIT
    this.animate()
    this.render_visible()
    this.bauble_chain.render()
    this.panel_garbage.render()

    this.particles.forEach((particle) => {
      particle.render();
    });
  }
  /** */
  shutdown(){}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPanel;
 // klass


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);



const {STATIC} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

/* harmony default export */ __webpack_exports__["a"] = ({
  [Symbol.toStringTag]: 'PanelBlank',
  kind                : null,
  x                   : null,
  y                   : null,
  state               : STATIC,
  counter             : 0,
  animation_state     : null,
  animation_counter   : 0,
  comboable           : false,
  support             : true,
  empty               : false
});


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);




const {
  UNIT,
  CLEAR,
  BAUBLE_FLOAT
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]
const {px} = __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */]

class ComponentBauble {
  get [Symbol.toStringTag](){ return 'Bauble' }

  create(panel) {
    this.panel = panel
    this.create_chain()
    this.create_combo()
  }

  create_chain() {
    this.chain = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group()
    this.chain.visible = false
    this.chain_left   = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(0)   , px(0), 'bauble',0) // 3px wide
    this.chain_middle = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(3)   , px(0), 'bauble',1)
    this.chain_right  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(3+20), px(0), 'bauble',2) // 3px wide

    this.chain_times = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(2), px(8), 'bauble_times') // 4px wide

    this.chain_int   = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(7), px(3), 'bauble_num',0) // 6px wide

    this.chain_small_int0  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(7)   , px(3), 'bauble_num_small',0) // 5px wide
    this.chain_small_int1  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(7+6) , px(3), 'bauble_num_small',0) // 5px wide
    this.chain_small_int2  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(7+12), px(3), 'bauble_num_small',0) // 5px wide

    this.chain.add(this.chain_left)
    this.chain.add(this.chain_middle)
    this.chain.add(this.chain_right)
    this.chain.add(this.chain_int)
    this.chain.add(this.chain_times)
    this.chain.add(this.chain_small_int0)
    this.chain.add(this.chain_small_int1)
    this.chain.add(this.chain_small_int2)
  }

  create_combo() {
    this.combo = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group()
    this.combo.visible = false
    this.combo_left   = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(0)   , px(0), 'bauble',3) // 3px wide
    this.combo_middle = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(3)   , px(0), 'bauble',4)
    this.combo_right  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(3+20), px(0), 'bauble',5) // 3px wide

    this.combo_int0       = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(7), px(3), 'bauble_num',0)       // 6px wide
    this.combo_small_int0 = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(px(7), px(3), 'bauble_num_small',0) // 5px wide

    this.combo.add(this.combo_left)
    this.combo.add(this.combo_middle)
    this.combo.add(this.combo_right)
    this.combo.add(this.combo_int0)
    this.combo.add(this.combo_small_int0)
  }


  update() {
  }

  render() {
    let x = this.panel.playfield.layer_block.x
    let y = this.panel.playfield.layer_block.y
    x    += (this.panel.x * UNIT)
    y    += (this.panel.y * UNIT)
    y    -= BAUBLE_FLOAT[this.panel.time_cur]
    this.render_chain(x,y)
    this.render_combo(x,y)
  }

  render_chain(x,y) {
    const chain = this.panel.chain
    if (this.panel.state   === CLEAR &&
        this.panel.clear_i === 0     &&
        chain                > 1     &&
        this.panel.time_cur  > 0
    ){
      this.chain.x = x
      this.chain.y = y

      this.chain.visible      = true
      this.chain_left.y       = px(0)
      this.chain_middle.y     = px(0)
      this.chain_right.y      = px(0)
      this.chain_int.y        = px(3)
      this.chain_small_int0.y = px(3)
      this.chain_small_int1.y = px(3)
      this.chain_small_int2.y = px(3)
      this.chain_times.y      = px(8)

      if (chain <= 9) {
        this.chain_int.frame = chain

        this.chain_middle.width = px(10)
        this.chain_right.x      = this.chain_left.width+this.chain_middle.width

        this.chain_int.visible  = true
        this.chain_small_int0.visible = false
        this.chain_small_int1.visible = false
        this.chain_small_int2.visible = false
      } else {
        let str = chain.toString()
        this.chain_int.visible  = false
        if (str.length === 2) {
          this.chain_small_int0.frame = parseInt(str[0])
          this.chain_small_int1.frame = parseInt(str[1])

          const i0 = parseInt(str[0]) === 1 ? px(3) : px(5)
          const i1 = parseInt(str[1]) === 1 ? px(3) : px(5)

          this.chain_small_int0.x = px(2) + i0
          this.chain_small_int1.x = px(2) + i0 + i1 + px(1)

          this.chain_middle.width = px(2)+i0+px(1)+i1+px(1) // times, int, space, int, pad
          this.chain_right.x      = this.chain_left.width+this.chain_middle.width

          this.chain_small_int0.visible = true
          this.chain_small_int1.visible = true
          this.chain_small_int2.visible = false
        } else if (str.length > 2) {
          this.chain_small_int0.frame = parseInt(str[0])
          this.chain_small_int1.frame = parseInt(str[1])
          this.chain_small_int2.frame = parseInt(str[2])

          const i0 = parseInt(str[0]) === 1 ? px(3) : px(5)
          const i1 = parseInt(str[1]) === 1 ? px(3) : px(5)
          const i2 = parseInt(str[2]) === 1 ? px(3) : px(5)

          this.chain_small_int0.x = px(2) + i0
          this.chain_small_int1.x = px(2) + i0 + i1 + px(1)
          this.chain_small_int2.x = px(2) + i0 + i1 + px(1)  + i2 + px(1)

          this.chain_middle.width = px(2)+i0+px(1)+i1+px(1)+i2+px(1) // times, int, space, int, space, int, pad
          this.chain_right.x      = this.chain_left.width+this.chain_middle.width

          this.chain_small_int0.visible = true
          this.chain_small_int1.visible = true
          this.chain_small_int2.visible = true
        }
      }
    } else {
      this.chain.visible = false
    }
  }

  render_combo(x,y) {
    const combo = this.panel.clear_len
    const chain = this.panel.chain
    if (this.panel.state   === CLEAR &&
        this.panel.clear_i === 0     &&
        combo                > 3     &&
        this.panel.time_cur  > 0
    ){
      this.combo.x = x
      this.combo.y = y

      let offset = 0
      if (chain > 1){ offset = px(16) }
      this.combo.visible      = true
      this.combo_left.y       = offset
      this.combo_middle.y     = offset
      this.combo_right.y      = offset
      this.combo_int0.y       = offset + px(3)
      this.combo_small_int0.y = offset + px(3)


      if (combo <= 9) {
        this.combo_int0.frame = combo

        this.combo_middle.width = px(10)
        this.combo_right.x      = this.combo_left.width+this.combo_middle.width

        this.combo_int0.visible       = true
        this.combo_small_int0.visible = false
      } else {
        let str = combo.toString()
        this.combo_small_int0.frame = parseInt(str[0])
        this.combo_int0.frame       = parseInt(str[1])

        const i0 = parseInt(str[0]) === 1 ? px(3) : px(5)
        const i1 = parseInt(str[1]) === 1 ? px(3) : px(6)

        this.combo_small_int0.x = px(2)
        this.combo_int0.x = px(2) + i0 + px(1)

        this.combo_middle.width = px(10)
        this.combo_right.x      = this.combo_left.width+this.combo_middle.width

        this.combo_int0.visible       = true
        this.combo_small_int0.visible = true
      }
    } else {
      this.combo.visible = false
    }
  }

  shutdown() {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentBauble;
 


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_data__ = __webpack_require__(1);




const {
  COLS,
  UNIT,
  FALL,
  CLEAR,
  STATIC,
  TIME_GARBAGE_CLEAR,
  TIME_GARBAGE_POP,
  GARBAGE,
  GARBAGE_SHAKE
} = __WEBPACK_IMPORTED_MODULE_2_core_data__["a" /* default */]

class ComponentPanelGarbage {
  get [Symbol.toStringTag](){ return 'PanelGarbage' }

  get state()    {return this._state }
  set state(val) {       this._state = val }

  get group()    {return this._group }
  set group(val) {       this._group = val }

  create(panel,playfield){
    this.panel     = panel
    this.playfield = playfield
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(0,0, 'garbage',0)
    this.sprite.visible = false
  }

  /**
   Returns the index of the current panel clearing and amount of panels clearing
   @returns {array} - [index,length]
   */
  get clear_index(){
    if (this.state !== CLEAR) {
      throw(new Error('clear_index called on none CLEAR panel'))
    }
    let panels = []
    for (let p of this.playfield.stack()){
      if (p.state               === GARBAGE &&
          p.panel_garbage.group === this.group) {
        panels.push(p.panel_garbage)
      }
    }
    return [panels.indexOf(this),panels.length]
  }

  popping(){
    if (this.panel.state === GARBAGE &&
        this.playfield.clearing_garbage.indexOf(this.group) !== -1 ){
      this.state         = CLEAR
      this.panel.counter = TIME_GARBAGE_CLEAR + (this.group_len * TIME_GARBAGE_POP)
      this.panel.set('unique')
    }
  }

  get group_len(){
    let len = 0
    for (let p of this.playfield.stack()){
      if (p.state               === GARBAGE &&
          p.panel_garbage.group === this.group) {
        len++
      }
    }
    return len
  }

  update(){
    switch (this.state) {
      case STATIC:
        if (this.fall_check()) {
          this.state = FALL
        } else if  (
          this.panel.under.state === CLEAR ||
          this.panel.above.state === CLEAR ||
          this.panel.left.state  === CLEAR ||
          this.panel.right.state === CLEAR
        ){
          const i = this.playfield.clearing_garbage.indexOf(this.group)
          if (i === -1){
            this.playfield.clearing_garbage.push(this.group)
          }
        }
      break;
      case FALL:
        if (this.fall_check()) {
          this.panel.under.state               = GARBAGE
          this.panel.under.panel_garbage.group = this.group
          this.panel.under.panel_garbage.state = this.state

          this.group = null
          this.state = null

          this.panel.kind    = null
          this.panel.state   = STATIC
          this.panel.counter = 0
          this.panel.chain   = 0
        } else {
          this.playfield.shake   = 0
          this.playfield.counter = GARBAGE_SHAKE[this.playfield.shake].length
          this.state = STATIC
        }
      break;
      case CLEAR:
        if (this.panel.counter > 0) { 
          this.panel.counter--
          const [i,len] = this.clear_index
          this.time_max = TIME_GARBAGE_CLEAR + (len   * TIME_GARBAGE_POP)
          this.time_pop = TIME_GARBAGE_CLEAR + (len-i * TIME_GARBAGE_POP)
          this.time_cur = this.time_max - this.panel.counter
        } else {
          this.state = STATIC
          this.group = null
          this.panel.state = STATIC
        }
      break;
    }
  }

  /** 
   * This looks at the current row for panels that belong
   * to this garbage panel group and then check below each one to
   * see if all of them are empty underneath so it should fall.
   *
   * */
  fall_check(){
    let fall = true
    for (let x = 0; x < COLS; x++){
      let panel = this.playfield.stack(x,this.panel.y)
      if (panel.state               === GARBAGE &&
          panel.panel_garbage.group === this.group) {
        if (panel.under.empty === false || panel.under.hang) { fall = false}
      }
    }
    return fall
  }

  render_visible(){
    if (this.state === CLEAR){
      this.sprite.visible = this.time_cur < this.time_pop
    } else {
      this.sprite.visible = this.panel.state === GARBAGE
    }
  }

  /** */
  render(){
    let str = ''
    if (this.state === CLEAR){
      this.sprite.frame = 13
    } else {
      if (this.panel.left.state  === GARBAGE && this.panel.left.panel_garbage.group  === this.group){ str += '1' } else { str += '0' }
      if (this.panel.right.state === GARBAGE && this.panel.right.panel_garbage.group === this.group){ str += '1' } else { str += '0' }
      if (this.panel.above.state === GARBAGE && this.panel.above.panel_garbage.group === this.group){ str += '1' } else { str += '0' }
      if (this.panel.under.state === GARBAGE && this.panel.under.panel_garbage.group === this.group){ str += '1' } else { str += '0' }

      if      (str === '0000'){ this.sprite.frame = 0}

      else if (str === '0100'){ this.sprite.frame = 1}
      else if (str === '1100'){ this.sprite.frame = 2}
      else if (str === '1000'){ this.sprite.frame = 3}

      else if (str === '0101'){ this.sprite.frame = 4}
      else if (str === '1101'){ this.sprite.frame = 5}
      else if (str === '1001'){ this.sprite.frame = 6}

      else if (str === '0111'){ this.sprite.frame = 7}
      else if (str === '1111'){ this.sprite.frame = 8}
      else if (str === '1011'){ this.sprite.frame = 9}

      else if (str === '0110'){ this.sprite.frame = 10}
      else if (str === '1110'){ this.sprite.frame = 11}
      else if (str === '1010'){ this.sprite.frame = 12}
    }

    let x = this.playfield.layer_block.x
    let y = this.playfield.layer_block.y
    x    += (this.panel.x * UNIT)
    y    += (this.panel.y * UNIT)
    this.sprite.x = x
    this.sprite.y = y

    this.render_visible()
  }
  /** */
  shutdown(){}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPanelGarbage;
 // klass


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);



const {
  UNIT,
  TIME_PARTICLE
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]
const normalType = [
  {x:  1, y:  1},
  {x: -1, y:  1},
  {x:  1, y: -1},
  {x: -1, y: -1}
]

/**
 * A Panel has a particle that gets shown when the Panel gets cleared
 * A Panel_Particle has 4 directions right now, top left - top right - bottom right - bottom left
 * Once the counter has been set to the TIME_PARTICLE a counter runs down and the particle will animate
 */
class ComponentPanelParticle {
  /**
   * Initializes the sprite defaulted to not visible, inits vars and has arguments
   * @param {object} panel parent which the pos will depend on
   * @param {integer} dir which direction to go - 1 = top left, 2 = top right, 3 = bottom right, ...
   */
  create({panel, type = "normal", id, angle = 0}) {
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(0, 0, "panel_particles", 0);
    this.sprite.visible = false;

    this.x = 0;
    this.y = 0;

    // these shouldnt change over time, they dont get snapped
    this.id = id;
    this.type = type;
    this.panel = panel;

    // which type and angle set 
    this.angle = angle;

    // orientation
    if (this.type === "normal") {
      this.xdir = normalType[this.id].x;
      this.ydir = normalType[this.id].y;
    }

    // handling animation
    this.counter = 0;
    this.frame_counter = 0;
  }

  /** @returns an Array of the vars that can be rerolled to to recreate a state completely */
  get snap() {
    return [
      this.x,
      this.y,
      this.xdir,
      this.ydir,
      this.counter,
      this.frame_counter,
      this.angle
    ]
  }

  /** loads an Array with integer values that each var should get set to */
  load(data) {
    this.x = data[0];
    this.y = data[1];
    this.xdir = data[2];
    this.ydir = data[3];
    this.counter = data[4];
    this.frame_counter = data[5];
    this.angle = data[6];
  }

  /** sets the pos of the particle, also sets the dir based on its dir  */
  update() {
    this.x = this.panel.playfield.layer_block.x + (this.panel.x * UNIT);
    this.y = this.panel.playfield.layer_block.y + (this.panel.y * UNIT);

    if (this.counter > 0) {
      this.counter--;
      const cur = TIME_PARTICLE - this.counter;

      switch (this.type) {
        case "normal": 
          this.x += this.xdir * cur;
          this.y += this.ydir * cur;
          break;
      
        case "rotate": 
          this.x += Math.cos(this.angle) * cur;
          this.y += Math.sin(this.angle) * cur;
          
          this.angle += 0.1;

          break;
      }
    }
  }

  /**
   * Calculus for sprite animation - the Time each frame has with 8 frames would be 0.125s
   * returns true when 0.125 would have been passed and waits for the next 0.125 so 0.300s to be crossed
   * @param {integer} frames amt of frames to set intervals
   * @param {integer} ct upgoing counter
   * @param {integer} current real num from 0 to 1
   * @returns true when current has crossed over ct+1/frames
   */
  animate_in_intervals(frames, current) {
    return (((this.frame_counter + 1) / frames) <= current);
  }

  /** draws the sprite contents, animates the sprite when visible */
  render() {
    if (this.counter > 0) {
      const cur = (TIME_PARTICLE - this.counter) / TIME_PARTICLE;

      if (this.animate_in_intervals(8, cur))
        this.sprite.frame = this.frame_counter++;
    }
    else this.frame_counter = 0;

    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.visible = (this.counter > 0);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPanelParticle;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_filters__ = __webpack_require__(2);



const {px} = __WEBPACK_IMPORTED_MODULE_1_core_filters__["a" /* default */]

/** a Boilerplate class to be used for characters,
 *  you should only define the sprite animations and pos of the sprite
 */
class ComponentCharacterTemplate {
  create(sprite, x = 0, y = 0, pi) {
    this.playfield_num = pi;
    this.animation_speed = 10;
    
    // sprite creation
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(x, y, sprite, 0);
    this.sprite.anchor.setTo(0.5);
    this.sprite.scale.set(2);
    this.sprite.smoothed = false;
    this.x = x;
    this.y = y;

    if (pi == 1) {
      this.sprite.scale.x = -2;
      this.x -= -60;
    }

    // adding all animations - connecting them 
    this.add_animation("stand", 8, 0, true);
    this.add_animation("attack", 9, 12, false, true);
    this.add_animation("attacked", 9, 24, false, true);
    this.add_animation("lost", 12, 36, false);
    this.add_animation("losing", 4, 48, true);

    this.sprite.play('stand');
  }

  add_animation(anim_name, hframes, offset, loop, callback = false) {
    this.sprite.animations.add(anim_name, this.animiation_frames(hframes, offset), this.animation_speed, loop);

    if (callback)
      this.sprite.animations.getAnimation(anim_name).onComplete.add(() => {
        this.sprite.play("stand");
      })
  }

  animiation_frames(hframes, offset) {
    var temp = [];

    for (var i = offset; i < offset + hframes; i++)
      temp.push(i);

    return temp;
  }

  update() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentCharacterTemplate;



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


class ComponentAi {
  create(playfield, cursor) {
    this.playfield = playfield;
    this.cursor = cursor;
    return this.plan = false;
  }

  update() {
    this.cursor.mv_up();

    if (this.plan === false) {
      const stack = [];
      for (let x = 0, end = this.playfield.rows, asc = 0 <= end; asc ? x < end : x > end; asc ? x++ : x--) {
        for (let y = 0, end1 = this.playfield.cols, asc1 = 0 <= end1; asc1 ? y < end1 : y > end1; asc1 ? y++ : y--) {
          const panel = this.playfield.stack[x][y];
          stack.push(panel.i);
        }
      }
      console.log('ai stack', stack);
    }
    return this.plan = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentAi;



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


class ComponentPing {
  get ping(){  return this._ping }
  set ping(v){ this._ping = v }

  create() {
    this.ping = null
    this.lbl = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.text(6, 4, '', {font: 'normal 10px Arial',fill: '#FFFFFF'})

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].server.on('pong',function(data){
      this.ping = Math.floor((new Date().getTime()-data) / 2)
    }.bind(this))

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].server.ping()
    setInterval(function(){
      __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].server.ping()
    }.bind(this),3000)
  }

  render() {
    if (this.ping === null) {return}
    this.lbl.setText(`${this.ping}ms`)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentPing;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


class ComponentDebugFrame {
  create() {
    this.lbl = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.text(116, 4, '', {font: 'normal 10px Arial',fill: '#FFFFFF'})
  }

  render(i){
    this.lbl.setText(`F${i}`)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentDebugFrame;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);




const {UNIT} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]
const {px}   = __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */]

/** Cursor to handle menu_pause movement and method calls
 *  could maybe be optimized by just calling the menu_pause methods here
 */
class ComponentMenuPauseCursor {
  /** only bindings, no new objects */
  constructor() {
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  /**
   * sets the sprite position relative to the sprite of the menu
   * 
   * @param {menu_pause} menu reference 
   * @param {integer} x pos
   * @param {integer} y pos
   * @param {Array} menu_items functions from menu
   */
  create(menu, x, y, menu_items){
    this.menu = menu;
    this.x = x;
    this.y = y;
   
    // array with methods and its accessor index
    this.menu_items = menu_items;
    this.index  = 0;

    this.sfx_confirm = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_confirm');
    this.sfx_select  = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.audio('sfx_select');

    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(this.x, this.y, 'menu_pause_cursor');
    return this.menu.sprite.addChild(this.sprite);
  }

  /**
   * binds controls to methods of this cursor
   * @param {playerNumber} any_player_number 
   */
  map_controls(any_player_number) {
    return __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.map(any_player_number, {
      up   : this.up,
      down : this.down,
      a    : this.confirm,
      start: this.confirm
    }
    );
  }

  confirm(tick) {
    if (tick > 0) 
      return;

    this.sfx_confirm.play();
    return this.menu_items[this.index]();
  }

  up(tick) {
    if (tick > 0) 
      return;

    if (this.index !== 0) {
      this.sfx_select.play();
      return this.index--;
    }
  }

  down(tick) {
    if (tick > 0) 
      return;

    if (this.index !== (this.menu_items.length-1)) {
      this.sfx_select.play();
      return this.index++;
    }
  }
  
  update() {
    return this.sprite.y = this.y + (this.index * px(12));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComponentMenuPauseCursor;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_filters__ = __webpack_require__(2);




const {px} = __WEBPACK_IMPORTED_MODULE_2_core_filters__["a" /* default */]
const {
  FRAME_STAR
} = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class StarCounter {
  create(stage,x,y){
    this.stage = stage
    this.group = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group()
    this.group.x = x
    this.group.y = y
    this.sprites = []
    this.sprites[0] = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(x       , y       , `star_counter`,0)
    this.sprites[1] = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(x+px(18), y       , `star_counter`,6)
    this.sprites[2] = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(x       , y+px(17), `star_counter`,0)
    this.sprites[3] = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(x+px(18), y+px(17), `star_counter`,6)

    this.group.add(this.sprites[0])
    this.group.add(this.sprites[1])
    this.group.add(this.sprites[2])
    this.group.add(this.sprites[3])

    this.counter = 0
  }

  update() {
    if (this.counter > FRAME_STAR.length){
      this.counter = 0
    } else {
      this.counter++
    }
  }

  render() {
    if (this.stage.rounds_won[0] > 0) {
      this.sprites[0].frame = FRAME_STAR[this.counter]
    } else {
      this.sprites[0].frame = 0
    }

    if (this.stage.rounds_won[0] > 1) {
      this.sprites[2].frame = FRAME_STAR[this.counter]
    } else {
      this.sprites[2].frame = 0
    }


    if (this.stage.rounds_won[1] > 0) {
      this.sprites[1].frame = FRAME_STAR[this.counter] + 6
    } else {
      this.sprites[1].frame = 6
    }

    if (this.stage.rounds_won[1] > 1) {
      this.sprites[3].frame = FRAME_STAR[this.counter] + 6
    } else {
      this.sprites[3].frame = 6
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StarCounter;



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_seedrandom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_seedrandom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_seedrandom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_inputs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_puzzles__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_playfield__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_menu_pause__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_timer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_step_counter__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_data__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_filters__ = __webpack_require__(2);











const { UNIT } = __WEBPACK_IMPORTED_MODULE_8_core_data__["a" /* default */]
const { px }   = __WEBPACK_IMPORTED_MODULE_9_core_filters__["a" /* default */]


/* run by phaser state.start */
class PuzzleMode {
  constructor() {
    this.playfield  = new __WEBPACK_IMPORTED_MODULE_4_components_playfield__["a" /* default */](0);
    this.menu_pause = new __WEBPACK_IMPORTED_MODULE_5_components_menu_pause__["a" /* default */]();
    this.timer      = new __WEBPACK_IMPORTED_MODULE_6_components_timer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1_core_game__["default"]);
    this.step_display = new __WEBPACK_IMPORTED_MODULE_7_components_step_counter__["a" /* default */]();
    this.inputs     = new __WEBPACK_IMPORTED_MODULE_2_core_inputs__["a" /* default */]();
  }

  init(data) {
    this.level_index = data.chosen_index;
  }

  /** creates the playfield, menu_pause and timer objects
   *  with certain parameters
   */
  create() {
    __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].add.sprite(0, 0, "mode_puzzle_bg");

    this.tick   = -1;
    this.seed   = 'puzzle';
    this.cpu    = [false, null];
    this.rng    = __WEBPACK_IMPORTED_MODULE_0_seedrandom___default()(this.seed);

    // gathered from level puzzle data
    this.puzzles = new __WEBPACK_IMPORTED_MODULE_3_core_puzzles__["a" /* default */]();
    this.change_level(this.puzzles.puzzle_levels[this.level_index++]);

    this.playfield.create(this, {
      countdown: false,
      push  : false,
      x     : 88,
      y     : 40,
      panels: this.panels
    });

    this.playfield.create_after();
    this.playfield.cursor.mode = "puzzle";

    this.menu_pause.create(this);
    this.timer.create(25,30);
    this.step_display.create({ playfield: this.playfield, step_limit: this.steps_left });
  }
  
  /** shuts down the playfield */
  shutdown() {
    __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].sounds.stage_music('none');
    this.playfield.shutdown();
  }

  /** changes the current level to the next one from the puzzle array - counters go up */
  change_level(lvl) {
    this.panels = lvl.panels;
    this.steps_left = lvl.steps;
    this.step_display.step_limit = lvl.steps;
  }

  /** stops all control - plays a sound and stops the timer */
  pause() {
    __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].sounds.stage_music('pause');
  
    this.state = "pause";
    this.timer.running = false;
    this.menu_pause.pause();
  }

  /** regains control over playfield - plays a sound and timer runs again */
  resume() {
    __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].sounds.stage_music('resume');
  
    this.state = "running";
    this.timer.running = true;
    this.playfield.cursor.map_controls("puzzle");      
  }

  /** updates all important objects, especially the inputs
   *  based on the interal tick counter thats increasing
   */
  update() {
    if (this.playfield.stack_is_empty()) {
      if (this.puzzles.puzzle_levels.length === (this.level_index)) {
        __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].state.start("menu");
        return;
      }

      this.change_level(this.puzzles.puzzle_levels[this.level_index++]);      
      this.playfield.cursor.cursor_swap_history = [];
      this.playfield.reset_stack(this.panels, 0);  
    }

    // if over a limit overcrossed reset
    if (this.playfield.swap_counter > this.steps_left) {
      this.playfield.cursor.cursor_swap_history = [];
      this.playfield.reset_stack(this.panels, 0);
    }

    this.tick++;

    __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].controls.update();
    this.playfield.update();
    this.inputs.update(this.tick);

    this.menu_pause.update();
  }

  /** calls the render functions of the timer and playfield */
  render() {
    this.timer.render();
    this.step_display.render();
  
    if (this.playfield) 
      this.playfield.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = PuzzleMode;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);


/**
 * A StepCounter is used in the Puzzle Mode to show the current amount of steps you have left.
 * The internal step_limit always has to get updated to the next room change.
 */
class StepCounter {
  /**
   * Add a Sprite group set the parent pos and create sprites on a relative position.
   * @param {object} mulitple vars defaulted - playfield reference is expected.  
   */
  create({ step_limit = 0, playfield, x = 200, y = 50}) {
    this.group = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.group();
    this.group.x = x; 
    this.group.y = y;

    this.d1 = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(12, 0, "ints_large", 0);
    this.d2 = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(0, 0, "ints_large", 0);
    this.group.add(this.d1);
    this.group.add(this.d2);

    this.steps = 0;
    
    // playfield reference
    this.playfield = playfield;
    this.step_limit = step_limit;
  }

  /** update the sprites each frame */
  render() {
    this.steps = this.step_limit - this.playfield.swap_counter;
    
    if (this.steps >= 10) {
      let d1_count = this.getDigit(this.steps, 0);
      let d2_count = this.getDigit(this.steps, 1);
      
      this.d1.frame = d1_count;
      this.d2.frame = d2_count;
    }
    else {
      this.d1.frame = this.steps;
      this.d2.frame = 0;
    }
  }

  /**
   * Gets a digit from a number and returns it
   * @param {integer} number real num
   * @param {integer} n which digit you want to get
   * @returns integer below 10
   */
  getDigit(number, n) {
    return Math.floor((number / Math.pow(10, n - 1)) % 10);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StepCounter;



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_puzzle_menu_cursor__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_puzzles__ = __webpack_require__(22);





class PuzzleSelect {
  constructor() {
    this.cursor = new __WEBPACK_IMPORTED_MODULE_1_components_puzzle_menu_cursor__["a" /* default */]();
  }

  create() {
    this.bg = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.tileSprite(0, 0, __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.width, __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].world.height, 'bg_green');
    
    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].add.sprite(0, 0, 'puzzle_menu');

    this.puzzles = new __WEBPACK_IMPORTED_MODULE_2_core_puzzles__["a" /* default */]();
    this.cursor.create(this, 26, 39);
  }

  update() {
    this.sprite.x = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].width  / 4 - this.sprite.width  / 2;
    this.sprite.y = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].height / 8 - this.sprite.height / 2;

    this.cursor.update()
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.update();
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** stops controller support */
  shutdown() {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.disable();
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = PuzzleSelect;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_data__ = __webpack_require__(1);



const { UNIT } = __WEBPACK_IMPORTED_MODULE_1_core_data__["a" /* default */]

class PuzzleSelectCursor {
  constructor() {
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.update = this.update.bind(this);
  }

  create(parent, x, y) {
    this.x = x;
    this.y = y;
    this.index  = 0;

    this.sprite = __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].make.sprite(this.x, this.y + (this.index * UNIT), 'menu_cursor');
    this.parent = parent;
    this.parent.sprite.addChild(this.sprite);
    
    this.map_controls(0);
    this.map_controls(1);
  }

  map_controls(pi) {
    return __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].controls.map(pi, {
      up   : this.up,
      down : this.down,
      a    : this.confirm,
      b    : this.cancel,
      start: this.confirm
    });
  }

  up(tick) {
    if (tick > 0) 
      return;

    if (this.index > 0)
      --this.index;
  }

  down(tick) {
    if (tick > 0) 
      return;
    
    if (this.index < this.parent.puzzles.puzzle_levels.length - 1)
      ++this.index;
  }

  confirm(tick) {
    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].state.start("mode_puzzle", true, false, { chosen_index: this.index });
  }

  cancel(tick) {
    if (tick > 0)
      return; 

    __WEBPACK_IMPORTED_MODULE_0_core_game__["default"].state.start("menu");
  }

  update() {
    this.sprite.y = this.y + (this.index * UNIT);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PuzzleSelectCursor;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_replay__ = __webpack_require__(78);




const {ipcRenderer: ipc} = __WEBPACK_IMPORTED_MODULE_0_electron___default.a

class StatesConnect {
  init(data) {
    this.mode      = data.mode
    this.host_port = data.host_port
    this.join_host = data.join_host
    this.join_port = data.join_port
  }

  get mode(){      return this._mode      }
  get host_port(){ return this._host_port }
  get join_host(){ return this._join_host }
  get join_port(){ return this._join_port }

  set mode(v){      this._mode      = v}
  set host_port(v){ this._host_port = v}
  set join_host(v){ this._join_host = v}
  set join_port(v){ this._join_port = v}

  create() {
    this.bg = __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].add.tileSprite(0, 0, __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].world.width, __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].world.height, 'bg_green')
    __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].server.create(this.host_port,'0.0.0.0',this.listening)
  }

  listening() {
    if (this.mode === 'host') {
      __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].server.connected(this.start)
      __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].server.pos = 0
    } else if(this.mode === 'join') {
      __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].server.pos = 1
      __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].server.connect(
        this.join_port,
        this.join_host,
        __WEBPACK_IMPORTED_MODULE_2_common_replay__["a" /* default */].random_seed(), //hacky until we get a game setup screen
        this.start
      )
    }
  }

  start() {
    ipc.send('play-vs',{
      seed  : __WEBPACK_IMPORTED_MODULE_1_core_game__["default"].server.seed,
      online: true,
      cpu   : [false,false]
    })
  }

  update() {
    this.bg.tilePosition.y += 0.5
    this.bg.tilePosition.x -= 0.5
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = StatesConnect;



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fs__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mkdir_recursive__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mkdir_recursive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mkdir_recursive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_glob__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_glob___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_glob__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_crypto__);








const {app} = __WEBPACK_IMPORTED_MODULE_0_electron___default.a

function list(callback){
  let dir = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(__WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].get('replay_dir'),'*.replay')
  __WEBPACK_IMPORTED_MODULE_5_glob___default()(dir,{},function(err,files){
    let filenames = []
    for (let file of files){
      filenames.push(
        __WEBPACK_IMPORTED_MODULE_2_path___default.a.basename(file,'.replay')
      )
    }
    callback(err,filenames)
  })
}

function del(name){
  const dir      = __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].get('replay_dir')
  const filename = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(dir,`${name}.replay`)
  __WEBPACK_IMPORTED_MODULE_3_fs___default.a.unlink(filename,function(){}) //delets file if happens to already exist
}

function dir(state,dir){
  if(state === 'change' && (dir === null || dir === undefined)){
    console.log(state,dir)
    throw(new Error('must pass a directory'))
  }
  if (state === 'reset'){
    dir = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(app.getPath('appData'),'swap-n-pop','replays')
    __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].set('replay_dir',dir)
  } else if (state === 'change'){
    __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].set('replay_dir',dir)
  } else {
    if (__WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].has('replay_dir')){
      dir = __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].get('replay_dir')
    } else {
      dir = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(app.getPath('appData'),'swap-n-pop','replays')
      __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].set('replay_dir',dir)
    }
  }
  if (!__WEBPACK_IMPORTED_MODULE_3_fs___default.a.existsSync(dir)){ __WEBPACK_IMPORTED_MODULE_4_mkdir_recursive___default.a.mkdirSync(dir); } // create dir if it don't exist.
  return dir
}

function save(name,seed,inputs,callback) {

  const dir      = __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].get('replay_dir')
  const filename = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(dir,`${name}.replay`)

  if (!__WEBPACK_IMPORTED_MODULE_3_fs___default.a.existsSync(dir)){ __WEBPACK_IMPORTED_MODULE_4_mkdir_recursive___default.a.mkdirSync(dir); } // create dir if it don't exist.
  __WEBPACK_IMPORTED_MODULE_3_fs___default.a.unlink(filename,function(){}) //delets file if happens to already exist

  const int0     = inputs[0].length
  const int1     = inputs[1].length

  const lens     = seed.length
  const len0     = Math.ceil(int0.toString(2).length / 8)
  const len1     = Math.ceil(int1.toString(2).length / 8)

  const frames   = inputs[0].concat(inputs[1])

  const buf_len    = Buffer.from([lens,len0,len1])
  const buf_seed   = Buffer.from(seed, 'ascii')
  const buf_int0   = Buffer.allocUnsafe(len0)
  const buf_int1   = Buffer.allocUnsafe(len1)
  const buf_frames = Buffer.from(frames)

  buf_int0.writeUIntBE(int0,0,len0)
  buf_int1.writeUIntBE(int1,0,len1)

  const buf = Buffer.concat([
    buf_len,
    buf_seed,
    buf_int0,
    buf_int1,
    buf_frames
  ],
      buf_len.length
    + buf_seed.length
    + buf_int0.length
    + buf_int1.length
    + buf_frames.length
  )

  __WEBPACK_IMPORTED_MODULE_3_fs___default.a.writeFile(filename,buf,'binary',function(err) {
    callback(err,filename)
  })
}

function load(name,callback){
  const dir      = __WEBPACK_IMPORTED_MODULE_1_common_store__["a" /* default */].get('replay_dir')
  const filename = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(dir,`${name}.replay`)
  var   inputs   = [[],[]]
  var   seed     = null
  __WEBPACK_IMPORTED_MODULE_3_fs___default.a.readFile(filename, function(err,buf){
    const lens = buf[0]
    const len0 = buf[1]
    const len1 = buf[2]
    const bufs = Buffer.allocUnsafe(lens)
    buf.copy(bufs,0,3,3+lens)
    const seed = bufs.toString('ascii')
    const int0 = buf.readUIntBE(3+lens,len0)
    const int1 = buf.readUIntBE(3+lens+len0,len1)

    let len = 3+lens+len0+len1
    buf0 = Buffer.allocUnsafe(int0)
    buf1 = Buffer.allocUnsafe(int1)
    buf.copy(buf0,0,len,len+int0)
    buf.copy(buf1,0,len+int0,len+int0+int1)
    let a0 = Array.prototype.slice.call(buf0, 0)
    let a1 = Array.prototype.slice.call(buf1, 0)

    callback(err,{seed: seed, inputs: [a0,a1]})
  })
}

function random_seed (howMany=16, chars) {
  chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789"
  var rnd = __WEBPACK_IMPORTED_MODULE_6_crypto___default.a.randomBytes(howMany)
      , value = new Array(howMany)
      , len = chars.length

  for (var i = 0; i < howMany; i++) {
    value[i] = chars[rnd[i] % len]
  }

  return value.join('');
}


/* harmony default export */ __webpack_exports__["a"] = ({
  list: list,
  dir : dir,
  del: del,
  save: save,
  load: load,
  random_seed: random_seed
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @file mkdir-recursive main
 * @module mkdir-recursive
 * @version 0.3.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2015
 * @license GPLv3
 */

/*
 * initialize module
 */
var fs = __webpack_require__(8);
var path = __webpack_require__(5);

/*
 * exports
 */
/**
 * make main. Check README.md
 * 
 * @exports mkdir
 * @function mkdir
 * @param {String} root - pathname
 * @param {Number} mode - directories mode, see Node documentation
 * @param {Function} callback - next callback
 */
function mkdir(root, mode, callback) {

  if (typeof mode === 'function') {
    var callback = mode;
    var mode = null;
  }
  if (typeof root !== 'string') {
    throw new Error('missing root');
  } else if (typeof callback !== 'function') {
    throw new Error('missing callback');
  }

  var chunks = root.split(path.sep); // split in chunks
  var chunk;
  if (path.isAbsolute(root) === true) { // build from absolute path
    chunk = chunks.shift(); // remove "/" or C:/
    if (!chunk) { // add "/"
      chunk = path.sep;
    }
  } else {
    chunk = path.resolve(); // build with relative path
  }

  return mkdirRecursive(chunk, chunks, mode, callback);
}
module.exports.mkdir = mkdir;

/**
 * makeSync main. Check README.md
 * 
 * @exports mkdirSync
 * @function mkdirSync
 * @param {String} root - pathname
 * @param {Number} mode - directories mode, see Node documentation
 * @return [{Object}]
 */
function mkdirSync(root, mode) {

  if (typeof root !== 'string') {
    throw new Error('missing root');
  }

  var chunks = root.split(path.sep); // split in chunks
  var chunk;
  if (path.isAbsolute(root) === true) { // build from absolute path
    chunk = chunks.shift(); // remove "/" or C:/
    if (!chunk) { // add "/"
      chunk = path.sep;
    }
  } else {
    chunk = path.resolve(); // build with relative path
  }

  return mkdirSyncRecursive(chunk, chunks, mode);
}
module.exports.mkdirSync = mkdirSync;

/**
 * remove main. Check README.md
 * 
 * @exports rmdir
 * @function rmdir
 * @param {String} root - pathname
 * @param {Function} callback - next callback
 */
function rmdir(root, callback) {

  if (typeof root !== 'string') {
    throw new Error('missing root');
  } else if (typeof callback !== 'function') {
    throw new Error('missing callback');
  }

  var chunks = root.split(path.sep); // split in chunks
  var chunk = path.resolve(root); // build absolute path
  // remove "/" from head and tail
  if (chunks[0] === '') {
    chunks.shift();
  }
  if (chunks[chunks.length - 1] === '') {
    chunks.pop();
  }

  return rmdirRecursive(chunk, chunks, callback);
}
module.exports.rmdir = rmdir;

/**
 * removeSync main. Check README.md
 * 
 * @exports rmdirSync
 * @function rmdirSync
 * @param {String} root - pathname
 * @return [{Object}]
 */
function rmdirSync(root) {

  if (typeof root !== 'string') {
    throw new Error('missing root');
  }

  var chunks = root.split(path.sep); // split in chunks
  var chunk = path.resolve(root); // build absolute path
  // remove "/" from head and tail
  if (chunks[0] === '') {
    chunks.shift();
  }
  if (chunks[chunks.length - 1] === '') {
    chunks.pop();
  }

  return rmdirSyncRecursive(chunk, chunks);
}
module.exports.rmdirSync = rmdirSync;

/*
 * functions
 */
/**
 * make directory recursively
 * 
 * @function mkdirRecursive
 * @param {String} root - absolute root where append chunks
 * @param {Array} chunks - directories chunks
 * @param {Number} mode - directories mode, see Node documentation
 * @param {Function} callback - next callback
 */
function mkdirRecursive(root, chunks, mode, callback) {

  var chunk = chunks.shift();
  if (!chunk) {
    return callback(null);
  }
  var root = path.join(root, chunk);

  return fs.exists(root, function(exists) {

    if (exists === true) { // already done
      return mkdirRecursive(root, chunks, mode, callback);
    }
    return fs.mkdir(root, mode, function(err) {

      if (err) {
        return callback(err);
      }
      return mkdirRecursive(root, chunks, mode, callback); // let's magic
    });
  });
}

/**
 * make directory recursively. Sync version
 * 
 * @function mkdirSyncRecursive
 * @param {String} root - absolute root where append chunks
 * @param {Array} chunks - directories chunks
 * @param {Number} mode - directories mode, see Node documentation
 * @return [{Object}]
 */
function mkdirSyncRecursive(root, chunks, mode) {

  var chunk = chunks.shift();
  if (!chunk) {
    return;
  }
  var root = path.join(root, chunk);

  if (fs.existsSync(root) === true) { // already done
    return mkdirSyncRecursive(root, chunks, mode);
  }
  var err = fs.mkdirSync(root, mode);
  return err ? err : mkdirSyncRecursive(root, chunks, mode); // let's magic
}

/**
 * remove directory recursively
 * 
 * @function rmdirRecursive
 * @param {String} root - absolute root where take chunks
 * @param {Array} chunks - directories chunks
 * @param {Function} callback - next callback
 */
function rmdirRecursive(root, chunks, callback) {

  var chunk = chunks.pop();
  if (!chunk) {
    return callback(null);
  }
  var pathname = path.join(root, '..'); // backtrack

  return fs.exists(root, function(exists) {

    if (exists === false) { // already done
      return rmdirRecursive(root, chunks, callback);
    }
    return fs.rmdir(root, function(err) {

      if (err) {
        return callback(err);
      }
      return rmdirRecursive(pathname, chunks, callback); // let's magic
    });
  });
}

/**
 * remove directory recursively. Sync version
 * 
 * @function rmdirRecursive
 * @param {String} root - absolute root where take chunks
 * @param {Array} chunks - directories chunks
 * @return [{Object}]
 */
function rmdirSyncRecursive(root, chunks) {

  var chunk = chunks.pop();
  if (!chunk) {
    return;
  }
  var pathname = path.join(root, '..'); // backtrack

  if (fs.existsSync(root) === false) { // already done
    return rmdirSyncRecursive(root, chunks);
  }
  var err = fs.rmdirSync(root);
  return err ? err : rmdirSyncRecursive(pathname, chunks); // let's magic
}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(5);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(8);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(82);
var balanced = __webpack_require__(83);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(14);
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  module.exports = __webpack_require__(85);
}


/***/ }),
/* 85 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(8)
var rp = __webpack_require__(24)
var minimatch = __webpack_require__(13)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(23).Glob
var util = __webpack_require__(14)
var path = __webpack_require__(5)
var assert = __webpack_require__(25)
var isAbsolute = __webpack_require__(15)
var common = __webpack_require__(26)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(27)
var reqs = Object.create(null)
var once = __webpack_require__(28)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ })
/******/ ]);