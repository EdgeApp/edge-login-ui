var abcui =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ABCUI = function () {
	  function ABCUI(options) {
	    // These arguments might be the api keys etc.
	    // console.log(options)
	    // this.bundlePath = options.bundlePath

	    _classCallCheck(this, ABCUI);
	  }

	  _createClass(ABCUI, [{
	    key: 'createIFrame',
	    value: function createIFrame(path) {
	      var frame = document.createElement('iframe');
	      var body = document.getElementsByTagName('BODY')[0];
	      body.appendChild(frame, body);
	      frame.setAttribute('src', path);
	      frame.setAttribute('frameborder', '0');
	      frame.setAttribute('allowtransparency', 'true');
	      frame.setAttribute('style', 'border: 0px none transparent; overflow: hidden; visibility: visible; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: block; background: transparent;');
	      return frame;
	    }
	  }, {
	    key: 'removeIFrame',
	    value: function removeIFrame(frame) {
	      frame.parentNode.removeChild(frame);
	    }
	  }, {
	    key: 'openLoginWindow',
	    value: function openLoginWindow() {
	      var _this = this;

	      var frame = this.createIFrame('/login');

	      window.exitCallback = function () {
	        _this.removeIFrame(frame);
	      };
	    }
	  }, {
	    key: 'openSignUpWindow',
	    value: function openSignUpWindow() {
	      var _this2 = this;

	      var frame = this.createIFrame('/signup/username');

	      window.exitCallback = function () {
	        _this2.removeIFrame(frame);
	      };
	    }
	  }]);

	  return ABCUI;
	}();

	// Let's make this a module later when we move this to a seperate app
	// export default ABCUI


	window.ABCUI = new ABCUI() || {};

/***/ }
/******/ ]);