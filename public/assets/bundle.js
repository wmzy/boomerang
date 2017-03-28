/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

URLON = {
	stringify: function (input) {
		function encodeString (str) {
			return encodeURI(str.replace(/([=:&@_;\/])/g, '/$1'));
		}

		function stringify (input) {
			// Number or Boolean or Null
			if (typeof input === 'number' || input === true || input === false || input === null) {
				return ':' + input;
			}
			// Array
			if (input instanceof Array) {
				var res = [];
				for (var i = 0; i < input.length; ++i) {
					res.push(stringify(input[i]));
				}
				return '@' + res.join('&') + ';';
			}
			// Object
			if (typeof input === 'object') {
				var res = [];
				for (var key in input) {
					res.push(encodeString(key) + stringify(input[key]));
				}
				return '_' + res.join('&') + ';';
			}
			// String or undefined			
			return '=' + encodeString((input !== null ? (input !== undefined ? input : "undefined") : "null").toString());
		}

		return stringify(input).replace(/;+$/g, '');
	},

	parse: function (str) {
		var pos = 0;
		str = decodeURI(str);

		function read() {
			var token = '';
			for (; pos !== str.length; ++pos) {
				if (str.charAt(pos) === '/') {
					pos += 1;
					if (pos === str.length) {
						token += ';';
						break;
					}
				} else if (str.charAt(pos).match(/[=:&@_;]/)) {
					break;
				}
				token += str.charAt(pos);
			}
			return token;
		}

		function parse() {
			var type = str.charAt(pos++);

			// String
			if (type === '=') {
				return read();
			}
			// Number or Boolean
			if (type === ':') {
				var value = read();
				if (value === 'true') {
					return true;
				}
				if (value === 'false') {
					return false;
				}
				value = parseFloat(value);
				return isNaN(value) ? null : value;
			}
			// Array
			if (type === '@') {
				var res = [];
				loop: {
					if (pos >= str.length || str.charAt(pos) === ';') {
						break loop;
					}
					while (1) {
						res.push(parse());
						if (pos >= str.length || str.charAt(pos) === ';') {
							break loop;
						}
						pos += 1;
					}
				}
				pos += 1;
				return res;
			}
			// Object
			if (type === '_') {
				var res = {};
				loop: {
					if (pos >= str.length || str.charAt(pos) === ';') {
						break loop;
					}
					while (1) {
						var name = read();
						res[name] = parse();
						if (pos >= str.length || str.charAt(pos) === ';') {
							break loop;
						}
						pos += 1;
					}
				}
				pos += 1;
				return res;
			}
			// Error
			throw 'Unexpected char ' + type;
		}

		return parse();
	}
};

if (true) {
	exports.stringify = URLON.stringify;
	exports.parse = URLON.parse;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_URLON__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_URLON___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_URLON__);

document.addEventListener('DOMContentLoaded', function () {
  var editor = document.getElementById('editor');
  var output = document.getElementById('output');

  editor.addEventListener('change', () => {
    try {
      var str = __WEBPACK_IMPORTED_MODULE_0_URLON___default.a.stringify(JSON.parse(editor.value));
      var link = 'http://localhost:3000/raw/' + str;
      console.log(link);
      output.href = link;
      output.innerText = link;
    } catch (e) {
      output.href = '#';
      output.innerText = '#'
    }
  })
});


/***/ })
/******/ ]);