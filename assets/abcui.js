exports["abcui"] =
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var abc = __webpack_require__(1);

	var DomWindow;
	var DomDocument;
	if (typeof window === 'undefined') {
	  DomWindow = {};
	} else {
	  DomWindow = window;
	}
	if (typeof document === 'undefined') {
	  DomDocument = {
	    createElement: function createElement() {
	      console.log('createElement: Error browser routine used in non-browser environment');
	    },
	    getElementsByTagName: function getElementsByTagName() {
	      console.log('getElementsByTagName: Error browser routine used in non-browser environment');
	    }
	  };
	} else {
	  DomDocument = document;
	}
	function createIFrame(path) {
	  var frame = DomDocument.createElement('iframe');
	  var body = DomDocument.getElementsByTagName('BODY')[0];
	  body.appendChild(frame, body);
	  frame.setAttribute('src', path);
	  frame.setAttribute('frameborder', '0');
	  frame.setAttribute('allowtransparency', 'true');
	  frame.setAttribute('style', 'border: 0px none transparent; overflow: hidden; visibility: visible; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: block; background: transparent;');
	  return frame;
	}

	function removeIFrame(frame) {
	  frame.parentNode.removeChild(frame);
	}

	function makeABCUIContext(args) {
	  return new InnerAbcUi(args);
	}

	function InnerAbcUi(args) {
	  var apiKey = args.apiKey;
	  if (!apiKey) {
	    throw Error('Missing api key');
	  }
	  DomWindow.abcContext = this.abcContext = abc.makeContext({ 'apiKey': args.apiKey, 'accountType': args.accountType });
	  if (args['bundlePath']) {
	    this.bundlePath = args.bundlePath;
	  } else {
	    this.bundlePath = '/abcui';
	  }
	  DomWindow.abcuiContext = {
	    'vendorName': args.vendorName,
	    'bundlePath': this.bundlePath
	  };

	  if (typeof args.vendorImageUrl === 'string') {
	    DomWindow.abcuiContext.vendorImageUrl = args.vendorImageUrl;
	  } else {
	    DomWindow.abcuiContext.vendorImageUrl = '';
	  }
	}

	InnerAbcUi.prototype.openLoginWindow = function (callback) {
	  var frame = createIFrame(this.bundlePath + '/assets/index.html');
	  var that = this;
	  var abcContext = DomWindow.abcContext;
	  DomWindow.loginCallback = function (error, account, opts) {
	    if (account) {

	      // if (opts && opts.setupRecovery) {
	      //   opts.noRequirePassword = true
	      //   that.openSetupRecoveryWindow(account, opts, function () {})
	      // } else if (!abcContext.pinExists(account.username)) {
	      //   that.openChangePinEdgeLoginWindow(account, opts, function () {})
	      // }
	      DomWindow.abcAccount = account;
	      callback(error, account);
	      setTimeout(function () {
	        removeIFrame(frame);
	      }, 15000);
	    }
	  };
	  DomWindow.exitCallback = function () {
	    removeIFrame(frame);
	  };
	};

	InnerAbcUi.prototype.getABCContext = function () {
	  return this.abcContext;
	};

	InnerAbcUi.prototype.openRecoveryWindow = function (callback) {
	  createIFrame(this.bundlePath + '/assets/index.html#/recovery');
	};

	InnerAbcUi.prototype.openSetupRecoveryWindow = function (account, opts, callback) {
	  var frame;
	  if (opts && opts.noRequirePassword) {
	    frame = createIFrame(this.bundlePath + '/assets/index.html#/account/setuprecovery-nopassword');
	  } else {
	    frame = createIFrame(this.bundlePath + '/assets/index.html#/account/setuprecovery');
	  }
	  DomWindow.exitCallback = function () {
	    removeIFrame(frame);
	  };
	};

	InnerAbcUi.prototype.openChangePinEdgeLoginWindow = function (account, callback) {
	  var frame = createIFrame(this.bundlePath + '/assets/index.html#/account/changepin-edge-login');
	  DomWindow.exitCallback = function () {
	    removeIFrame(frame);
	  };
	};

	InnerAbcUi.prototype.openManageWindow = function (account, callback) {
	  DomWindow.abcAccount = account;
	  var frame = createIFrame(this.bundlePath + '/assets/index.html#/home/');
	  DomWindow.exitCallback = function () {
	    removeIFrame(frame);
	    callback(null);
	  };
	};

	var abcui = {};
	abcui.makeABCUIContext = makeABCUIContext;
	module.exports = abcui;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var baseX = _interopDefault(__webpack_require__(2));
	var buffer = __webpack_require__(3);
	var buffer__default = _interopDefault(buffer);
	var aesjs = _interopDefault(__webpack_require__(4));
	var HmacDRBG = _interopDefault(__webpack_require__(5));
	var scryptJs = _interopDefault(__webpack_require__(17));
	var url = _interopDefault(__webpack_require__(18));
	var crypto = _interopDefault(__webpack_require__(19));
	var fetch = _interopDefault(__webpack_require__(20));
	var nodeLocalstorage = __webpack_require__(56);

	var base58Codec = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

	var base16 = {
	  parse: function parse (text) {
	    return new buffer.Buffer(text, 'hex')
	  },
	  stringify: function stringify (data) {
	    return new buffer.Buffer(data).toString('hex')
	  }
	};

	var base58 = {
	  parse: function parse (text) {
	    return new buffer.Buffer(base58Codec.decode(text))
	  },
	  stringify: function stringify (data) {
	    return base58Codec.encode(data)
	  }
	};

	var base64 = {
	  parse: function parse (text) {
	    return new buffer.Buffer(text, 'base64')
	  },
	  stringify: function stringify (data) {
	    return new buffer.Buffer(data).toString('base64')
	  }
	};

	var utf8 = {
	  parse: function parse (text) {
	    return new buffer.Buffer(text, 'utf8')
	  },
	  stringify: function stringify (data) {
	    return new buffer.Buffer(data).toString('utf8')
	  }
	};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var cryptoBundle = createCommonjsModule(function (module, exports) {
	(function(e, a) { for(var i in a) { e[i] = a[i]; } }(exports, /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			{ return installedModules[moduleId].exports; }

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
	/***/ function(module, exports, __webpack_require__) {

		// These two libraries are broken under Rollup.js,
		// so we have to webpack them before we include them in our bundle.
		// This is the Webpack entry point.

		exports.elliptic = __webpack_require__(1);
		exports.hashjs = __webpack_require__(18);


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var elliptic = exports;

		elliptic.version = __webpack_require__(2).version;
		elliptic.utils = __webpack_require__(3);
		elliptic.rand = __webpack_require__(9);
		elliptic.curve = __webpack_require__(11);
		elliptic.curves = __webpack_require__(17);

		// Protocols
		elliptic.ec = __webpack_require__(25);
		elliptic.eddsa = __webpack_require__(29);


	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = {
			"name": "elliptic",
			"version": "6.4.0",
			"description": "EC cryptography",
			"main": "lib/elliptic.js",
			"files": [
				"lib"
			],
			"scripts": {
				"jscs": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
				"jshint": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
				"lint": "npm run jscs && npm run jshint",
				"unit": "istanbul test _mocha --reporter=spec test/index.js",
				"test": "npm run lint && npm run unit",
				"version": "grunt dist && git add dist/"
			},
			"repository": {
				"type": "git",
				"url": "git@github.com:indutny/elliptic"
			},
			"keywords": [
				"EC",
				"Elliptic",
				"curve",
				"Cryptography"
			],
			"author": "Fedor Indutny <fedor@indutny.com>",
			"license": "MIT",
			"bugs": {
				"url": "https://github.com/indutny/elliptic/issues"
			},
			"homepage": "https://github.com/indutny/elliptic",
			"devDependencies": {
				"brfs": "^1.4.3",
				"coveralls": "^2.11.3",
				"grunt": "^0.4.5",
				"grunt-browserify": "^5.0.0",
				"grunt-cli": "^1.2.0",
				"grunt-contrib-connect": "^1.0.0",
				"grunt-contrib-copy": "^1.0.0",
				"grunt-contrib-uglify": "^1.0.1",
				"grunt-mocha-istanbul": "^3.0.1",
				"grunt-saucelabs": "^8.6.2",
				"istanbul": "^0.4.2",
				"jscs": "^2.9.0",
				"jshint": "^2.6.0",
				"mocha": "^2.1.0"
			},
			"dependencies": {
				"bn.js": "^4.4.0",
				"brorand": "^1.0.1",
				"hash.js": "^1.0.0",
				"hmac-drbg": "^1.0.0",
				"inherits": "^2.0.1",
				"minimalistic-assert": "^1.0.0",
				"minimalistic-crypto-utils": "^1.0.0"
			}
		};

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var utils = exports;
		var BN = __webpack_require__(4);
		var minAssert = __webpack_require__(7);
		var minUtils = __webpack_require__(8);

		utils.assert = minAssert;
		utils.toArray = minUtils.toArray;
		utils.zero2 = minUtils.zero2;
		utils.toHex = minUtils.toHex;
		utils.encode = minUtils.encode;

		// Represent num in a w-NAF form
		function getNAF(num, w) {
		  var naf = [];
		  var ws = 1 << (w + 1);
		  var k = num.clone();
		  while (k.cmpn(1) >= 0) {
		    var z;
		    if (k.isOdd()) {
		      var mod = k.andln(ws - 1);
		      if (mod > (ws >> 1) - 1)
		        { z = (ws >> 1) - mod; }
		      else
		        { z = mod; }
		      k.isubn(z);
		    } else {
		      z = 0;
		    }
		    naf.push(z);

		    // Optimization, shift by word if possible
		    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
		    for (var i = 1; i < shift; i++)
		      { naf.push(0); }
		    k.iushrn(shift);
		  }

		  return naf;
		}
		utils.getNAF = getNAF;

		// Represent k1, k2 in a Joint Sparse Form
		function getJSF(k1, k2) {
		  var jsf = [
		    [],
		    []
		  ];

		  k1 = k1.clone();
		  k2 = k2.clone();
		  var d1 = 0;
		  var d2 = 0;
		  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

		    // First phase
		    var m14 = (k1.andln(3) + d1) & 3;
		    var m24 = (k2.andln(3) + d2) & 3;
		    if (m14 === 3)
		      { m14 = -1; }
		    if (m24 === 3)
		      { m24 = -1; }
		    var u1;
		    if ((m14 & 1) === 0) {
		      u1 = 0;
		    } else {
		      var m8 = (k1.andln(7) + d1) & 7;
		      if ((m8 === 3 || m8 === 5) && m24 === 2)
		        { u1 = -m14; }
		      else
		        { u1 = m14; }
		    }
		    jsf[0].push(u1);

		    var u2;
		    if ((m24 & 1) === 0) {
		      u2 = 0;
		    } else {
		      var m8 = (k2.andln(7) + d2) & 7;
		      if ((m8 === 3 || m8 === 5) && m14 === 2)
		        { u2 = -m24; }
		      else
		        { u2 = m24; }
		    }
		    jsf[1].push(u2);

		    // Second phase
		    if (2 * d1 === u1 + 1)
		      { d1 = 1 - d1; }
		    if (2 * d2 === u2 + 1)
		      { d2 = 1 - d2; }
		    k1.iushrn(1);
		    k2.iushrn(1);
		  }

		  return jsf;
		}
		utils.getJSF = getJSF;

		function cachedProperty(obj, name, computer) {
		  var key = '_' + name;
		  obj.prototype[name] = function cachedProperty() {
		    return this[key] !== undefined ? this[key] :
		           this[key] = computer.call(this);
		  };
		}
		utils.cachedProperty = cachedProperty;

		function parseBytes(bytes) {
		  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
		                                     bytes;
		}
		utils.parseBytes = parseBytes;

		function intFromLE(bytes) {
		  return new BN(bytes, 'hex', 'le');
		}
		utils.intFromLE = intFromLE;



	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
		  'use strict';

		  // Utils
		  function assert (val, msg) {
		    if (!val) { throw new Error(msg || 'Assertion failed'); }
		  }

		  // Could use `inherits` module, but don't want to move from single file
		  // architecture yet.
		  function inherits (ctor, superCtor) {
		    ctor.super_ = superCtor;
		    var TempCtor = function () {};
		    TempCtor.prototype = superCtor.prototype;
		    ctor.prototype = new TempCtor();
		    ctor.prototype.constructor = ctor;
		  }

		  // BN

		  function BN (number, base, endian) {
		    if (BN.isBN(number)) {
		      return number;
		    }

		    this.negative = 0;
		    this.words = null;
		    this.length = 0;

		    // Reduction context
		    this.red = null;

		    if (number !== null) {
		      if (base === 'le' || base === 'be') {
		        endian = base;
		        base = 10;
		      }

		      this._init(number || 0, base || 10, endian || 'be');
		    }
		  }
		  if (typeof module === 'object') {
		    module.exports = BN;
		  } else {
		    exports.BN = BN;
		  }

		  BN.BN = BN;
		  BN.wordSize = 26;

		  var Buffer$$1;
		  try {
		    Buffer$$1 = __webpack_require__(6).Buffer;
		  } catch (e) {
		  }

		  BN.isBN = function isBN (num) {
		    if (num instanceof BN) {
		      return true;
		    }

		    return num !== null && typeof num === 'object' &&
		      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
		  };

		  BN.max = function max (left, right) {
		    if (left.cmp(right) > 0) { return left; }
		    return right;
		  };

		  BN.min = function min (left, right) {
		    if (left.cmp(right) < 0) { return left; }
		    return right;
		  };

		  BN.prototype._init = function init (number, base, endian) {
		    if (typeof number === 'number') {
		      return this._initNumber(number, base, endian);
		    }

		    if (typeof number === 'object') {
		      return this._initArray(number, base, endian);
		    }

		    if (base === 'hex') {
		      base = 16;
		    }
		    assert(base === (base | 0) && base >= 2 && base <= 36);

		    number = number.toString().replace(/\s+/g, '');
		    var start = 0;
		    if (number[0] === '-') {
		      start++;
		    }

		    if (base === 16) {
		      this._parseHex(number, start);
		    } else {
		      this._parseBase(number, base, start);
		    }

		    if (number[0] === '-') {
		      this.negative = 1;
		    }

		    this.strip();

		    if (endian !== 'le') { return; }

		    this._initArray(this.toArray(), base, endian);
		  };

		  BN.prototype._initNumber = function _initNumber (number, base, endian) {
		    if (number < 0) {
		      this.negative = 1;
		      number = -number;
		    }
		    if (number < 0x4000000) {
		      this.words = [ number & 0x3ffffff ];
		      this.length = 1;
		    } else if (number < 0x10000000000000) {
		      this.words = [
		        number & 0x3ffffff,
		        (number / 0x4000000) & 0x3ffffff
		      ];
		      this.length = 2;
		    } else {
		      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
		      this.words = [
		        number & 0x3ffffff,
		        (number / 0x4000000) & 0x3ffffff,
		        1
		      ];
		      this.length = 3;
		    }

		    if (endian !== 'le') { return; }

		    // Reverse the bytes
		    this._initArray(this.toArray(), base, endian);
		  };

		  BN.prototype._initArray = function _initArray (number, base, endian) {
		    var this$1 = this;

		    // Perhaps a Uint8Array
		    assert(typeof number.length === 'number');
		    if (number.length <= 0) {
		      this.words = [ 0 ];
		      this.length = 1;
		      return this;
		    }

		    this.length = Math.ceil(number.length / 3);
		    this.words = new Array(this.length);
		    for (var i = 0; i < this.length; i++) {
		      this$1.words[i] = 0;
		    }

		    var j, w;
		    var off = 0;
		    if (endian === 'be') {
		      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
		        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
		        this$1.words[j] |= (w << off) & 0x3ffffff;
		        this$1.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
		        off += 24;
		        if (off >= 26) {
		          off -= 26;
		          j++;
		        }
		      }
		    } else if (endian === 'le') {
		      for (i = 0, j = 0; i < number.length; i += 3) {
		        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
		        this$1.words[j] |= (w << off) & 0x3ffffff;
		        this$1.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
		        off += 24;
		        if (off >= 26) {
		          off -= 26;
		          j++;
		        }
		      }
		    }
		    return this.strip();
		  };

		  function parseHex (str, start, end) {
		    var r = 0;
		    var len = Math.min(str.length, end);
		    for (var i = start; i < len; i++) {
		      var c = str.charCodeAt(i) - 48;

		      r <<= 4;

		      // 'a' - 'f'
		      if (c >= 49 && c <= 54) {
		        r |= c - 49 + 0xa;

		      // 'A' - 'F'
		      } else if (c >= 17 && c <= 22) {
		        r |= c - 17 + 0xa;

		      // '0' - '9'
		      } else {
		        r |= c & 0xf;
		      }
		    }
		    return r;
		  }

		  BN.prototype._parseHex = function _parseHex (number, start) {
		    var this$1 = this;

		    // Create possibly bigger array to ensure that it fits the number
		    this.length = Math.ceil((number.length - start) / 6);
		    this.words = new Array(this.length);
		    for (var i = 0; i < this.length; i++) {
		      this$1.words[i] = 0;
		    }

		    var j, w;
		    // Scan 24-bit chunks and add them to the number
		    var off = 0;
		    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
		      w = parseHex(number, i, i + 6);
		      this$1.words[j] |= (w << off) & 0x3ffffff;
		      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
		      this$1.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
		      off += 24;
		      if (off >= 26) {
		        off -= 26;
		        j++;
		      }
		    }
		    if (i + 6 !== start) {
		      w = parseHex(number, start, i + 6);
		      this.words[j] |= (w << off) & 0x3ffffff;
		      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
		    }
		    this.strip();
		  };

		  function parseBase (str, start, end, mul) {
		    var r = 0;
		    var len = Math.min(str.length, end);
		    for (var i = start; i < len; i++) {
		      var c = str.charCodeAt(i) - 48;

		      r *= mul;

		      // 'a'
		      if (c >= 49) {
		        r += c - 49 + 0xa;

		      // 'A'
		      } else if (c >= 17) {
		        r += c - 17 + 0xa;

		      // '0' - '9'
		      } else {
		        r += c;
		      }
		    }
		    return r;
		  }

		  BN.prototype._parseBase = function _parseBase (number, base, start) {
		    var this$1 = this;

		    // Initialize as zero
		    this.words = [ 0 ];
		    this.length = 1;

		    // Find length of limb in base
		    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
		      limbLen++;
		    }
		    limbLen--;
		    limbPow = (limbPow / base) | 0;

		    var total = number.length - start;
		    var mod = total % limbLen;
		    var end = Math.min(total, total - mod) + start;

		    var word = 0;
		    for (var i = start; i < end; i += limbLen) {
		      word = parseBase(number, i, i + limbLen, base);

		      this$1.imuln(limbPow);
		      if (this$1.words[0] + word < 0x4000000) {
		        this$1.words[0] += word;
		      } else {
		        this$1._iaddn(word);
		      }
		    }

		    if (mod !== 0) {
		      var pow = 1;
		      word = parseBase(number, i, number.length, base);

		      for (i = 0; i < mod; i++) {
		        pow *= base;
		      }

		      this.imuln(pow);
		      if (this.words[0] + word < 0x4000000) {
		        this.words[0] += word;
		      } else {
		        this._iaddn(word);
		      }
		    }
		  };

		  BN.prototype.copy = function copy (dest) {
		    var this$1 = this;

		    dest.words = new Array(this.length);
		    for (var i = 0; i < this.length; i++) {
		      dest.words[i] = this$1.words[i];
		    }
		    dest.length = this.length;
		    dest.negative = this.negative;
		    dest.red = this.red;
		  };

		  BN.prototype.clone = function clone () {
		    var r = new BN(null);
		    this.copy(r);
		    return r;
		  };

		  BN.prototype._expand = function _expand (size) {
		    var this$1 = this;

		    while (this.length < size) {
		      this$1.words[this$1.length++] = 0;
		    }
		    return this;
		  };

		  // Remove leading `0` from `this`
		  BN.prototype.strip = function strip () {
		    var this$1 = this;

		    while (this.length > 1 && this.words[this.length - 1] === 0) {
		      this$1.length--;
		    }
		    return this._normSign();
		  };

		  BN.prototype._normSign = function _normSign () {
		    // -0 = 0
		    if (this.length === 1 && this.words[0] === 0) {
		      this.negative = 0;
		    }
		    return this;
		  };

		  BN.prototype.inspect = function inspect () {
		    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
		  };

		  /*

		  var zeros = [];
		  var groupSizes = [];
		  var groupBases = [];

		  var s = '';
		  var i = -1;
		  while (++i < BN.wordSize) {
		    zeros[i] = s;
		    s += '0';
		  }
		  groupSizes[0] = 0;
		  groupSizes[1] = 0;
		  groupBases[0] = 0;
		  groupBases[1] = 0;
		  var base = 2 - 1;
		  while (++base < 36 + 1) {
		    var groupSize = 0;
		    var groupBase = 1;
		    while (groupBase < (1 << BN.wordSize) / base) {
		      groupBase *= base;
		      groupSize += 1;
		    }
		    groupSizes[base] = groupSize;
		    groupBases[base] = groupBase;
		  }

		  */

		  var zeros = [
		    '',
		    '0',
		    '00',
		    '000',
		    '0000',
		    '00000',
		    '000000',
		    '0000000',
		    '00000000',
		    '000000000',
		    '0000000000',
		    '00000000000',
		    '000000000000',
		    '0000000000000',
		    '00000000000000',
		    '000000000000000',
		    '0000000000000000',
		    '00000000000000000',
		    '000000000000000000',
		    '0000000000000000000',
		    '00000000000000000000',
		    '000000000000000000000',
		    '0000000000000000000000',
		    '00000000000000000000000',
		    '000000000000000000000000',
		    '0000000000000000000000000'
		  ];

		  var groupSizes = [
		    0, 0,
		    25, 16, 12, 11, 10, 9, 8,
		    8, 7, 7, 7, 7, 6, 6,
		    6, 6, 6, 6, 6, 5, 5,
		    5, 5, 5, 5, 5, 5, 5,
		    5, 5, 5, 5, 5, 5, 5
		  ];

		  var groupBases = [
		    0, 0,
		    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
		    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
		    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
		    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
		    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
		  ];

		  BN.prototype.toString = function toString (base, padding) {
		    var this$1 = this;

		    base = base || 10;
		    padding = padding | 0 || 1;

		    var out;
		    if (base === 16 || base === 'hex') {
		      out = '';
		      var off = 0;
		      var carry = 0;
		      for (var i = 0; i < this.length; i++) {
		        var w = this$1.words[i];
		        var word = (((w << off) | carry) & 0xffffff).toString(16);
		        carry = (w >>> (24 - off)) & 0xffffff;
		        if (carry !== 0 || i !== this$1.length - 1) {
		          out = zeros[6 - word.length] + word + out;
		        } else {
		          out = word + out;
		        }
		        off += 2;
		        if (off >= 26) {
		          off -= 26;
		          i--;
		        }
		      }
		      if (carry !== 0) {
		        out = carry.toString(16) + out;
		      }
		      while (out.length % padding !== 0) {
		        out = '0' + out;
		      }
		      if (this.negative !== 0) {
		        out = '-' + out;
		      }
		      return out;
		    }

		    if (base === (base | 0) && base >= 2 && base <= 36) {
		      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
		      var groupSize = groupSizes[base];
		      // var groupBase = Math.pow(base, groupSize);
		      var groupBase = groupBases[base];
		      out = '';
		      var c = this.clone();
		      c.negative = 0;
		      while (!c.isZero()) {
		        var r = c.modn(groupBase).toString(base);
		        c = c.idivn(groupBase);

		        if (!c.isZero()) {
		          out = zeros[groupSize - r.length] + r + out;
		        } else {
		          out = r + out;
		        }
		      }
		      if (this.isZero()) {
		        out = '0' + out;
		      }
		      while (out.length % padding !== 0) {
		        out = '0' + out;
		      }
		      if (this.negative !== 0) {
		        out = '-' + out;
		      }
		      return out;
		    }

		    assert(false, 'Base should be between 2 and 36');
		  };

		  BN.prototype.toNumber = function toNumber () {
		    var ret = this.words[0];
		    if (this.length === 2) {
		      ret += this.words[1] * 0x4000000;
		    } else if (this.length === 3 && this.words[2] === 0x01) {
		      // NOTE: at this stage it is known that the top bit is set
		      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
		    } else if (this.length > 2) {
		      assert(false, 'Number can only safely store up to 53 bits');
		    }
		    return (this.negative !== 0) ? -ret : ret;
		  };

		  BN.prototype.toJSON = function toJSON () {
		    return this.toString(16);
		  };

		  BN.prototype.toBuffer = function toBuffer (endian, length) {
		    assert(typeof Buffer$$1 !== 'undefined');
		    return this.toArrayLike(Buffer$$1, endian, length);
		  };

		  BN.prototype.toArray = function toArray (endian, length) {
		    return this.toArrayLike(Array, endian, length);
		  };

		  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
		    var byteLength = this.byteLength();
		    var reqLength = length || Math.max(1, byteLength);
		    assert(byteLength <= reqLength, 'byte array longer than desired length');
		    assert(reqLength > 0, 'Requested array length <= 0');

		    this.strip();
		    var littleEndian = endian === 'le';
		    var res = new ArrayType(reqLength);

		    var b, i;
		    var q = this.clone();
		    if (!littleEndian) {
		      // Assume big-endian
		      for (i = 0; i < reqLength - byteLength; i++) {
		        res[i] = 0;
		      }

		      for (i = 0; !q.isZero(); i++) {
		        b = q.andln(0xff);
		        q.iushrn(8);

		        res[reqLength - i - 1] = b;
		      }
		    } else {
		      for (i = 0; !q.isZero(); i++) {
		        b = q.andln(0xff);
		        q.iushrn(8);

		        res[i] = b;
		      }

		      for (; i < reqLength; i++) {
		        res[i] = 0;
		      }
		    }

		    return res;
		  };

		  if (Math.clz32) {
		    BN.prototype._countBits = function _countBits (w) {
		      return 32 - Math.clz32(w);
		    };
		  } else {
		    BN.prototype._countBits = function _countBits (w) {
		      var t = w;
		      var r = 0;
		      if (t >= 0x1000) {
		        r += 13;
		        t >>>= 13;
		      }
		      if (t >= 0x40) {
		        r += 7;
		        t >>>= 7;
		      }
		      if (t >= 0x8) {
		        r += 4;
		        t >>>= 4;
		      }
		      if (t >= 0x02) {
		        r += 2;
		        t >>>= 2;
		      }
		      return r + t;
		    };
		  }

		  BN.prototype._zeroBits = function _zeroBits (w) {
		    // Short-cut
		    if (w === 0) { return 26; }

		    var t = w;
		    var r = 0;
		    if ((t & 0x1fff) === 0) {
		      r += 13;
		      t >>>= 13;
		    }
		    if ((t & 0x7f) === 0) {
		      r += 7;
		      t >>>= 7;
		    }
		    if ((t & 0xf) === 0) {
		      r += 4;
		      t >>>= 4;
		    }
		    if ((t & 0x3) === 0) {
		      r += 2;
		      t >>>= 2;
		    }
		    if ((t & 0x1) === 0) {
		      r++;
		    }
		    return r;
		  };

		  // Return number of used bits in a BN
		  BN.prototype.bitLength = function bitLength () {
		    var w = this.words[this.length - 1];
		    var hi = this._countBits(w);
		    return (this.length - 1) * 26 + hi;
		  };

		  function toBitArray (num) {
		    var w = new Array(num.bitLength());

		    for (var bit = 0; bit < w.length; bit++) {
		      var off = (bit / 26) | 0;
		      var wbit = bit % 26;

		      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
		    }

		    return w;
		  }

		  // Number of trailing zero bits
		  BN.prototype.zeroBits = function zeroBits () {
		    var this$1 = this;

		    if (this.isZero()) { return 0; }

		    var r = 0;
		    for (var i = 0; i < this.length; i++) {
		      var b = this$1._zeroBits(this$1.words[i]);
		      r += b;
		      if (b !== 26) { break; }
		    }
		    return r;
		  };

		  BN.prototype.byteLength = function byteLength () {
		    return Math.ceil(this.bitLength() / 8);
		  };

		  BN.prototype.toTwos = function toTwos (width) {
		    if (this.negative !== 0) {
		      return this.abs().inotn(width).iaddn(1);
		    }
		    return this.clone();
		  };

		  BN.prototype.fromTwos = function fromTwos (width) {
		    if (this.testn(width - 1)) {
		      return this.notn(width).iaddn(1).ineg();
		    }
		    return this.clone();
		  };

		  BN.prototype.isNeg = function isNeg () {
		    return this.negative !== 0;
		  };

		  // Return negative clone of `this`
		  BN.prototype.neg = function neg () {
		    return this.clone().ineg();
		  };

		  BN.prototype.ineg = function ineg () {
		    if (!this.isZero()) {
		      this.negative ^= 1;
		    }

		    return this;
		  };

		  // Or `num` with `this` in-place
		  BN.prototype.iuor = function iuor (num) {
		    var this$1 = this;

		    while (this.length < num.length) {
		      this$1.words[this$1.length++] = 0;
		    }

		    for (var i = 0; i < num.length; i++) {
		      this$1.words[i] = this$1.words[i] | num.words[i];
		    }

		    return this.strip();
		  };

		  BN.prototype.ior = function ior (num) {
		    assert((this.negative | num.negative) === 0);
		    return this.iuor(num);
		  };

		  // Or `num` with `this`
		  BN.prototype.or = function or (num) {
		    if (this.length > num.length) { return this.clone().ior(num); }
		    return num.clone().ior(this);
		  };

		  BN.prototype.uor = function uor (num) {
		    if (this.length > num.length) { return this.clone().iuor(num); }
		    return num.clone().iuor(this);
		  };

		  // And `num` with `this` in-place
		  BN.prototype.iuand = function iuand (num) {
		    var this$1 = this;

		    // b = min-length(num, this)
		    var b;
		    if (this.length > num.length) {
		      b = num;
		    } else {
		      b = this;
		    }

		    for (var i = 0; i < b.length; i++) {
		      this$1.words[i] = this$1.words[i] & num.words[i];
		    }

		    this.length = b.length;

		    return this.strip();
		  };

		  BN.prototype.iand = function iand (num) {
		    assert((this.negative | num.negative) === 0);
		    return this.iuand(num);
		  };

		  // And `num` with `this`
		  BN.prototype.and = function and (num) {
		    if (this.length > num.length) { return this.clone().iand(num); }
		    return num.clone().iand(this);
		  };

		  BN.prototype.uand = function uand (num) {
		    if (this.length > num.length) { return this.clone().iuand(num); }
		    return num.clone().iuand(this);
		  };

		  // Xor `num` with `this` in-place
		  BN.prototype.iuxor = function iuxor (num) {
		    var this$1 = this;

		    // a.length > b.length
		    var a;
		    var b;
		    if (this.length > num.length) {
		      a = this;
		      b = num;
		    } else {
		      a = num;
		      b = this;
		    }

		    for (var i = 0; i < b.length; i++) {
		      this$1.words[i] = a.words[i] ^ b.words[i];
		    }

		    if (this !== a) {
		      for (; i < a.length; i++) {
		        this$1.words[i] = a.words[i];
		      }
		    }

		    this.length = a.length;

		    return this.strip();
		  };

		  BN.prototype.ixor = function ixor (num) {
		    assert((this.negative | num.negative) === 0);
		    return this.iuxor(num);
		  };

		  // Xor `num` with `this`
		  BN.prototype.xor = function xor (num) {
		    if (this.length > num.length) { return this.clone().ixor(num); }
		    return num.clone().ixor(this);
		  };

		  BN.prototype.uxor = function uxor (num) {
		    if (this.length > num.length) { return this.clone().iuxor(num); }
		    return num.clone().iuxor(this);
		  };

		  // Not ``this`` with ``width`` bitwidth
		  BN.prototype.inotn = function inotn (width) {
		    var this$1 = this;

		    assert(typeof width === 'number' && width >= 0);

		    var bytesNeeded = Math.ceil(width / 26) | 0;
		    var bitsLeft = width % 26;

		    // Extend the buffer with leading zeroes
		    this._expand(bytesNeeded);

		    if (bitsLeft > 0) {
		      bytesNeeded--;
		    }

		    // Handle complete words
		    for (var i = 0; i < bytesNeeded; i++) {
		      this$1.words[i] = ~this$1.words[i] & 0x3ffffff;
		    }

		    // Handle the residue
		    if (bitsLeft > 0) {
		      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
		    }

		    // And remove leading zeroes
		    return this.strip();
		  };

		  BN.prototype.notn = function notn (width) {
		    return this.clone().inotn(width);
		  };

		  // Set `bit` of `this`
		  BN.prototype.setn = function setn (bit, val) {
		    assert(typeof bit === 'number' && bit >= 0);

		    var off = (bit / 26) | 0;
		    var wbit = bit % 26;

		    this._expand(off + 1);

		    if (val) {
		      this.words[off] = this.words[off] | (1 << wbit);
		    } else {
		      this.words[off] = this.words[off] & ~(1 << wbit);
		    }

		    return this.strip();
		  };

		  // Add `num` to `this` in-place
		  BN.prototype.iadd = function iadd (num) {
		    var this$1 = this;

		    var r;

		    // negative + positive
		    if (this.negative !== 0 && num.negative === 0) {
		      this.negative = 0;
		      r = this.isub(num);
		      this.negative ^= 1;
		      return this._normSign();

		    // positive + negative
		    } else if (this.negative === 0 && num.negative !== 0) {
		      num.negative = 0;
		      r = this.isub(num);
		      num.negative = 1;
		      return r._normSign();
		    }

		    // a.length > b.length
		    var a, b;
		    if (this.length > num.length) {
		      a = this;
		      b = num;
		    } else {
		      a = num;
		      b = this;
		    }

		    var carry = 0;
		    for (var i = 0; i < b.length; i++) {
		      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
		      this$1.words[i] = r & 0x3ffffff;
		      carry = r >>> 26;
		    }
		    for (; carry !== 0 && i < a.length; i++) {
		      r = (a.words[i] | 0) + carry;
		      this$1.words[i] = r & 0x3ffffff;
		      carry = r >>> 26;
		    }

		    this.length = a.length;
		    if (carry !== 0) {
		      this.words[this.length] = carry;
		      this.length++;
		    // Copy the rest of the words
		    } else if (a !== this) {
		      for (; i < a.length; i++) {
		        this$1.words[i] = a.words[i];
		      }
		    }

		    return this;
		  };

		  // Add `num` to `this`
		  BN.prototype.add = function add (num) {
		    var res;
		    if (num.negative !== 0 && this.negative === 0) {
		      num.negative = 0;
		      res = this.sub(num);
		      num.negative ^= 1;
		      return res;
		    } else if (num.negative === 0 && this.negative !== 0) {
		      this.negative = 0;
		      res = num.sub(this);
		      this.negative = 1;
		      return res;
		    }

		    if (this.length > num.length) { return this.clone().iadd(num); }

		    return num.clone().iadd(this);
		  };

		  // Subtract `num` from `this` in-place
		  BN.prototype.isub = function isub (num) {
		    var this$1 = this;

		    // this - (-num) = this + num
		    if (num.negative !== 0) {
		      num.negative = 0;
		      var r = this.iadd(num);
		      num.negative = 1;
		      return r._normSign();

		    // -this - num = -(this + num)
		    } else if (this.negative !== 0) {
		      this.negative = 0;
		      this.iadd(num);
		      this.negative = 1;
		      return this._normSign();
		    }

		    // At this point both numbers are positive
		    var cmp = this.cmp(num);

		    // Optimization - zeroify
		    if (cmp === 0) {
		      this.negative = 0;
		      this.length = 1;
		      this.words[0] = 0;
		      return this;
		    }

		    // a > b
		    var a, b;
		    if (cmp > 0) {
		      a = this;
		      b = num;
		    } else {
		      a = num;
		      b = this;
		    }

		    var carry = 0;
		    for (var i = 0; i < b.length; i++) {
		      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
		      carry = r >> 26;
		      this$1.words[i] = r & 0x3ffffff;
		    }
		    for (; carry !== 0 && i < a.length; i++) {
		      r = (a.words[i] | 0) + carry;
		      carry = r >> 26;
		      this$1.words[i] = r & 0x3ffffff;
		    }

		    // Copy rest of the words
		    if (carry === 0 && i < a.length && a !== this) {
		      for (; i < a.length; i++) {
		        this$1.words[i] = a.words[i];
		      }
		    }

		    this.length = Math.max(this.length, i);

		    if (a !== this) {
		      this.negative = 1;
		    }

		    return this.strip();
		  };

		  // Subtract `num` from `this`
		  BN.prototype.sub = function sub (num) {
		    return this.clone().isub(num);
		  };

		  function smallMulTo (self, num, out) {
		    out.negative = num.negative ^ self.negative;
		    var len = (self.length + num.length) | 0;
		    out.length = len;
		    len = (len - 1) | 0;

		    // Peel one iteration (compiler can't do it, because of code complexity)
		    var a = self.words[0] | 0;
		    var b = num.words[0] | 0;
		    var r = a * b;

		    var lo = r & 0x3ffffff;
		    var carry = (r / 0x4000000) | 0;
		    out.words[0] = lo;

		    for (var k = 1; k < len; k++) {
		      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
		      // note that ncarry could be >= 0x3ffffff
		      var ncarry = carry >>> 26;
		      var rword = carry & 0x3ffffff;
		      var maxJ = Math.min(k, num.length - 1);
		      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
		        var i = (k - j) | 0;
		        a = self.words[i] | 0;
		        b = num.words[j] | 0;
		        r = a * b + rword;
		        ncarry += (r / 0x4000000) | 0;
		        rword = r & 0x3ffffff;
		      }
		      out.words[k] = rword | 0;
		      carry = ncarry | 0;
		    }
		    if (carry !== 0) {
		      out.words[k] = carry | 0;
		    } else {
		      out.length--;
		    }

		    return out.strip();
		  }

		  // TODO(indutny): it may be reasonable to omit it for users who don't need
		  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
		  // multiplication (like elliptic secp256k1).
		  var comb10MulTo = function comb10MulTo (self, num, out) {
		    var a = self.words;
		    var b = num.words;
		    var o = out.words;
		    var c = 0;
		    var lo;
		    var mid;
		    var hi;
		    var a0 = a[0] | 0;
		    var al0 = a0 & 0x1fff;
		    var ah0 = a0 >>> 13;
		    var a1 = a[1] | 0;
		    var al1 = a1 & 0x1fff;
		    var ah1 = a1 >>> 13;
		    var a2 = a[2] | 0;
		    var al2 = a2 & 0x1fff;
		    var ah2 = a2 >>> 13;
		    var a3 = a[3] | 0;
		    var al3 = a3 & 0x1fff;
		    var ah3 = a3 >>> 13;
		    var a4 = a[4] | 0;
		    var al4 = a4 & 0x1fff;
		    var ah4 = a4 >>> 13;
		    var a5 = a[5] | 0;
		    var al5 = a5 & 0x1fff;
		    var ah5 = a5 >>> 13;
		    var a6 = a[6] | 0;
		    var al6 = a6 & 0x1fff;
		    var ah6 = a6 >>> 13;
		    var a7 = a[7] | 0;
		    var al7 = a7 & 0x1fff;
		    var ah7 = a7 >>> 13;
		    var a8 = a[8] | 0;
		    var al8 = a8 & 0x1fff;
		    var ah8 = a8 >>> 13;
		    var a9 = a[9] | 0;
		    var al9 = a9 & 0x1fff;
		    var ah9 = a9 >>> 13;
		    var b0 = b[0] | 0;
		    var bl0 = b0 & 0x1fff;
		    var bh0 = b0 >>> 13;
		    var b1 = b[1] | 0;
		    var bl1 = b1 & 0x1fff;
		    var bh1 = b1 >>> 13;
		    var b2 = b[2] | 0;
		    var bl2 = b2 & 0x1fff;
		    var bh2 = b2 >>> 13;
		    var b3 = b[3] | 0;
		    var bl3 = b3 & 0x1fff;
		    var bh3 = b3 >>> 13;
		    var b4 = b[4] | 0;
		    var bl4 = b4 & 0x1fff;
		    var bh4 = b4 >>> 13;
		    var b5 = b[5] | 0;
		    var bl5 = b5 & 0x1fff;
		    var bh5 = b5 >>> 13;
		    var b6 = b[6] | 0;
		    var bl6 = b6 & 0x1fff;
		    var bh6 = b6 >>> 13;
		    var b7 = b[7] | 0;
		    var bl7 = b7 & 0x1fff;
		    var bh7 = b7 >>> 13;
		    var b8 = b[8] | 0;
		    var bl8 = b8 & 0x1fff;
		    var bh8 = b8 >>> 13;
		    var b9 = b[9] | 0;
		    var bl9 = b9 & 0x1fff;
		    var bh9 = b9 >>> 13;

		    out.negative = self.negative ^ num.negative;
		    out.length = 19;
		    /* k = 0 */
		    lo = Math.imul(al0, bl0);
		    mid = Math.imul(al0, bh0);
		    mid = (mid + Math.imul(ah0, bl0)) | 0;
		    hi = Math.imul(ah0, bh0);
		    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
		    w0 &= 0x3ffffff;
		    /* k = 1 */
		    lo = Math.imul(al1, bl0);
		    mid = Math.imul(al1, bh0);
		    mid = (mid + Math.imul(ah1, bl0)) | 0;
		    hi = Math.imul(ah1, bh0);
		    lo = (lo + Math.imul(al0, bl1)) | 0;
		    mid = (mid + Math.imul(al0, bh1)) | 0;
		    mid = (mid + Math.imul(ah0, bl1)) | 0;
		    hi = (hi + Math.imul(ah0, bh1)) | 0;
		    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
		    w1 &= 0x3ffffff;
		    /* k = 2 */
		    lo = Math.imul(al2, bl0);
		    mid = Math.imul(al2, bh0);
		    mid = (mid + Math.imul(ah2, bl0)) | 0;
		    hi = Math.imul(ah2, bh0);
		    lo = (lo + Math.imul(al1, bl1)) | 0;
		    mid = (mid + Math.imul(al1, bh1)) | 0;
		    mid = (mid + Math.imul(ah1, bl1)) | 0;
		    hi = (hi + Math.imul(ah1, bh1)) | 0;
		    lo = (lo + Math.imul(al0, bl2)) | 0;
		    mid = (mid + Math.imul(al0, bh2)) | 0;
		    mid = (mid + Math.imul(ah0, bl2)) | 0;
		    hi = (hi + Math.imul(ah0, bh2)) | 0;
		    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
		    w2 &= 0x3ffffff;
		    /* k = 3 */
		    lo = Math.imul(al3, bl0);
		    mid = Math.imul(al3, bh0);
		    mid = (mid + Math.imul(ah3, bl0)) | 0;
		    hi = Math.imul(ah3, bh0);
		    lo = (lo + Math.imul(al2, bl1)) | 0;
		    mid = (mid + Math.imul(al2, bh1)) | 0;
		    mid = (mid + Math.imul(ah2, bl1)) | 0;
		    hi = (hi + Math.imul(ah2, bh1)) | 0;
		    lo = (lo + Math.imul(al1, bl2)) | 0;
		    mid = (mid + Math.imul(al1, bh2)) | 0;
		    mid = (mid + Math.imul(ah1, bl2)) | 0;
		    hi = (hi + Math.imul(ah1, bh2)) | 0;
		    lo = (lo + Math.imul(al0, bl3)) | 0;
		    mid = (mid + Math.imul(al0, bh3)) | 0;
		    mid = (mid + Math.imul(ah0, bl3)) | 0;
		    hi = (hi + Math.imul(ah0, bh3)) | 0;
		    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
		    w3 &= 0x3ffffff;
		    /* k = 4 */
		    lo = Math.imul(al4, bl0);
		    mid = Math.imul(al4, bh0);
		    mid = (mid + Math.imul(ah4, bl0)) | 0;
		    hi = Math.imul(ah4, bh0);
		    lo = (lo + Math.imul(al3, bl1)) | 0;
		    mid = (mid + Math.imul(al3, bh1)) | 0;
		    mid = (mid + Math.imul(ah3, bl1)) | 0;
		    hi = (hi + Math.imul(ah3, bh1)) | 0;
		    lo = (lo + Math.imul(al2, bl2)) | 0;
		    mid = (mid + Math.imul(al2, bh2)) | 0;
		    mid = (mid + Math.imul(ah2, bl2)) | 0;
		    hi = (hi + Math.imul(ah2, bh2)) | 0;
		    lo = (lo + Math.imul(al1, bl3)) | 0;
		    mid = (mid + Math.imul(al1, bh3)) | 0;
		    mid = (mid + Math.imul(ah1, bl3)) | 0;
		    hi = (hi + Math.imul(ah1, bh3)) | 0;
		    lo = (lo + Math.imul(al0, bl4)) | 0;
		    mid = (mid + Math.imul(al0, bh4)) | 0;
		    mid = (mid + Math.imul(ah0, bl4)) | 0;
		    hi = (hi + Math.imul(ah0, bh4)) | 0;
		    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
		    w4 &= 0x3ffffff;
		    /* k = 5 */
		    lo = Math.imul(al5, bl0);
		    mid = Math.imul(al5, bh0);
		    mid = (mid + Math.imul(ah5, bl0)) | 0;
		    hi = Math.imul(ah5, bh0);
		    lo = (lo + Math.imul(al4, bl1)) | 0;
		    mid = (mid + Math.imul(al4, bh1)) | 0;
		    mid = (mid + Math.imul(ah4, bl1)) | 0;
		    hi = (hi + Math.imul(ah4, bh1)) | 0;
		    lo = (lo + Math.imul(al3, bl2)) | 0;
		    mid = (mid + Math.imul(al3, bh2)) | 0;
		    mid = (mid + Math.imul(ah3, bl2)) | 0;
		    hi = (hi + Math.imul(ah3, bh2)) | 0;
		    lo = (lo + Math.imul(al2, bl3)) | 0;
		    mid = (mid + Math.imul(al2, bh3)) | 0;
		    mid = (mid + Math.imul(ah2, bl3)) | 0;
		    hi = (hi + Math.imul(ah2, bh3)) | 0;
		    lo = (lo + Math.imul(al1, bl4)) | 0;
		    mid = (mid + Math.imul(al1, bh4)) | 0;
		    mid = (mid + Math.imul(ah1, bl4)) | 0;
		    hi = (hi + Math.imul(ah1, bh4)) | 0;
		    lo = (lo + Math.imul(al0, bl5)) | 0;
		    mid = (mid + Math.imul(al0, bh5)) | 0;
		    mid = (mid + Math.imul(ah0, bl5)) | 0;
		    hi = (hi + Math.imul(ah0, bh5)) | 0;
		    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
		    w5 &= 0x3ffffff;
		    /* k = 6 */
		    lo = Math.imul(al6, bl0);
		    mid = Math.imul(al6, bh0);
		    mid = (mid + Math.imul(ah6, bl0)) | 0;
		    hi = Math.imul(ah6, bh0);
		    lo = (lo + Math.imul(al5, bl1)) | 0;
		    mid = (mid + Math.imul(al5, bh1)) | 0;
		    mid = (mid + Math.imul(ah5, bl1)) | 0;
		    hi = (hi + Math.imul(ah5, bh1)) | 0;
		    lo = (lo + Math.imul(al4, bl2)) | 0;
		    mid = (mid + Math.imul(al4, bh2)) | 0;
		    mid = (mid + Math.imul(ah4, bl2)) | 0;
		    hi = (hi + Math.imul(ah4, bh2)) | 0;
		    lo = (lo + Math.imul(al3, bl3)) | 0;
		    mid = (mid + Math.imul(al3, bh3)) | 0;
		    mid = (mid + Math.imul(ah3, bl3)) | 0;
		    hi = (hi + Math.imul(ah3, bh3)) | 0;
		    lo = (lo + Math.imul(al2, bl4)) | 0;
		    mid = (mid + Math.imul(al2, bh4)) | 0;
		    mid = (mid + Math.imul(ah2, bl4)) | 0;
		    hi = (hi + Math.imul(ah2, bh4)) | 0;
		    lo = (lo + Math.imul(al1, bl5)) | 0;
		    mid = (mid + Math.imul(al1, bh5)) | 0;
		    mid = (mid + Math.imul(ah1, bl5)) | 0;
		    hi = (hi + Math.imul(ah1, bh5)) | 0;
		    lo = (lo + Math.imul(al0, bl6)) | 0;
		    mid = (mid + Math.imul(al0, bh6)) | 0;
		    mid = (mid + Math.imul(ah0, bl6)) | 0;
		    hi = (hi + Math.imul(ah0, bh6)) | 0;
		    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
		    w6 &= 0x3ffffff;
		    /* k = 7 */
		    lo = Math.imul(al7, bl0);
		    mid = Math.imul(al7, bh0);
		    mid = (mid + Math.imul(ah7, bl0)) | 0;
		    hi = Math.imul(ah7, bh0);
		    lo = (lo + Math.imul(al6, bl1)) | 0;
		    mid = (mid + Math.imul(al6, bh1)) | 0;
		    mid = (mid + Math.imul(ah6, bl1)) | 0;
		    hi = (hi + Math.imul(ah6, bh1)) | 0;
		    lo = (lo + Math.imul(al5, bl2)) | 0;
		    mid = (mid + Math.imul(al5, bh2)) | 0;
		    mid = (mid + Math.imul(ah5, bl2)) | 0;
		    hi = (hi + Math.imul(ah5, bh2)) | 0;
		    lo = (lo + Math.imul(al4, bl3)) | 0;
		    mid = (mid + Math.imul(al4, bh3)) | 0;
		    mid = (mid + Math.imul(ah4, bl3)) | 0;
		    hi = (hi + Math.imul(ah4, bh3)) | 0;
		    lo = (lo + Math.imul(al3, bl4)) | 0;
		    mid = (mid + Math.imul(al3, bh4)) | 0;
		    mid = (mid + Math.imul(ah3, bl4)) | 0;
		    hi = (hi + Math.imul(ah3, bh4)) | 0;
		    lo = (lo + Math.imul(al2, bl5)) | 0;
		    mid = (mid + Math.imul(al2, bh5)) | 0;
		    mid = (mid + Math.imul(ah2, bl5)) | 0;
		    hi = (hi + Math.imul(ah2, bh5)) | 0;
		    lo = (lo + Math.imul(al1, bl6)) | 0;
		    mid = (mid + Math.imul(al1, bh6)) | 0;
		    mid = (mid + Math.imul(ah1, bl6)) | 0;
		    hi = (hi + Math.imul(ah1, bh6)) | 0;
		    lo = (lo + Math.imul(al0, bl7)) | 0;
		    mid = (mid + Math.imul(al0, bh7)) | 0;
		    mid = (mid + Math.imul(ah0, bl7)) | 0;
		    hi = (hi + Math.imul(ah0, bh7)) | 0;
		    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
		    w7 &= 0x3ffffff;
		    /* k = 8 */
		    lo = Math.imul(al8, bl0);
		    mid = Math.imul(al8, bh0);
		    mid = (mid + Math.imul(ah8, bl0)) | 0;
		    hi = Math.imul(ah8, bh0);
		    lo = (lo + Math.imul(al7, bl1)) | 0;
		    mid = (mid + Math.imul(al7, bh1)) | 0;
		    mid = (mid + Math.imul(ah7, bl1)) | 0;
		    hi = (hi + Math.imul(ah7, bh1)) | 0;
		    lo = (lo + Math.imul(al6, bl2)) | 0;
		    mid = (mid + Math.imul(al6, bh2)) | 0;
		    mid = (mid + Math.imul(ah6, bl2)) | 0;
		    hi = (hi + Math.imul(ah6, bh2)) | 0;
		    lo = (lo + Math.imul(al5, bl3)) | 0;
		    mid = (mid + Math.imul(al5, bh3)) | 0;
		    mid = (mid + Math.imul(ah5, bl3)) | 0;
		    hi = (hi + Math.imul(ah5, bh3)) | 0;
		    lo = (lo + Math.imul(al4, bl4)) | 0;
		    mid = (mid + Math.imul(al4, bh4)) | 0;
		    mid = (mid + Math.imul(ah4, bl4)) | 0;
		    hi = (hi + Math.imul(ah4, bh4)) | 0;
		    lo = (lo + Math.imul(al3, bl5)) | 0;
		    mid = (mid + Math.imul(al3, bh5)) | 0;
		    mid = (mid + Math.imul(ah3, bl5)) | 0;
		    hi = (hi + Math.imul(ah3, bh5)) | 0;
		    lo = (lo + Math.imul(al2, bl6)) | 0;
		    mid = (mid + Math.imul(al2, bh6)) | 0;
		    mid = (mid + Math.imul(ah2, bl6)) | 0;
		    hi = (hi + Math.imul(ah2, bh6)) | 0;
		    lo = (lo + Math.imul(al1, bl7)) | 0;
		    mid = (mid + Math.imul(al1, bh7)) | 0;
		    mid = (mid + Math.imul(ah1, bl7)) | 0;
		    hi = (hi + Math.imul(ah1, bh7)) | 0;
		    lo = (lo + Math.imul(al0, bl8)) | 0;
		    mid = (mid + Math.imul(al0, bh8)) | 0;
		    mid = (mid + Math.imul(ah0, bl8)) | 0;
		    hi = (hi + Math.imul(ah0, bh8)) | 0;
		    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
		    w8 &= 0x3ffffff;
		    /* k = 9 */
		    lo = Math.imul(al9, bl0);
		    mid = Math.imul(al9, bh0);
		    mid = (mid + Math.imul(ah9, bl0)) | 0;
		    hi = Math.imul(ah9, bh0);
		    lo = (lo + Math.imul(al8, bl1)) | 0;
		    mid = (mid + Math.imul(al8, bh1)) | 0;
		    mid = (mid + Math.imul(ah8, bl1)) | 0;
		    hi = (hi + Math.imul(ah8, bh1)) | 0;
		    lo = (lo + Math.imul(al7, bl2)) | 0;
		    mid = (mid + Math.imul(al7, bh2)) | 0;
		    mid = (mid + Math.imul(ah7, bl2)) | 0;
		    hi = (hi + Math.imul(ah7, bh2)) | 0;
		    lo = (lo + Math.imul(al6, bl3)) | 0;
		    mid = (mid + Math.imul(al6, bh3)) | 0;
		    mid = (mid + Math.imul(ah6, bl3)) | 0;
		    hi = (hi + Math.imul(ah6, bh3)) | 0;
		    lo = (lo + Math.imul(al5, bl4)) | 0;
		    mid = (mid + Math.imul(al5, bh4)) | 0;
		    mid = (mid + Math.imul(ah5, bl4)) | 0;
		    hi = (hi + Math.imul(ah5, bh4)) | 0;
		    lo = (lo + Math.imul(al4, bl5)) | 0;
		    mid = (mid + Math.imul(al4, bh5)) | 0;
		    mid = (mid + Math.imul(ah4, bl5)) | 0;
		    hi = (hi + Math.imul(ah4, bh5)) | 0;
		    lo = (lo + Math.imul(al3, bl6)) | 0;
		    mid = (mid + Math.imul(al3, bh6)) | 0;
		    mid = (mid + Math.imul(ah3, bl6)) | 0;
		    hi = (hi + Math.imul(ah3, bh6)) | 0;
		    lo = (lo + Math.imul(al2, bl7)) | 0;
		    mid = (mid + Math.imul(al2, bh7)) | 0;
		    mid = (mid + Math.imul(ah2, bl7)) | 0;
		    hi = (hi + Math.imul(ah2, bh7)) | 0;
		    lo = (lo + Math.imul(al1, bl8)) | 0;
		    mid = (mid + Math.imul(al1, bh8)) | 0;
		    mid = (mid + Math.imul(ah1, bl8)) | 0;
		    hi = (hi + Math.imul(ah1, bh8)) | 0;
		    lo = (lo + Math.imul(al0, bl9)) | 0;
		    mid = (mid + Math.imul(al0, bh9)) | 0;
		    mid = (mid + Math.imul(ah0, bl9)) | 0;
		    hi = (hi + Math.imul(ah0, bh9)) | 0;
		    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
		    w9 &= 0x3ffffff;
		    /* k = 10 */
		    lo = Math.imul(al9, bl1);
		    mid = Math.imul(al9, bh1);
		    mid = (mid + Math.imul(ah9, bl1)) | 0;
		    hi = Math.imul(ah9, bh1);
		    lo = (lo + Math.imul(al8, bl2)) | 0;
		    mid = (mid + Math.imul(al8, bh2)) | 0;
		    mid = (mid + Math.imul(ah8, bl2)) | 0;
		    hi = (hi + Math.imul(ah8, bh2)) | 0;
		    lo = (lo + Math.imul(al7, bl3)) | 0;
		    mid = (mid + Math.imul(al7, bh3)) | 0;
		    mid = (mid + Math.imul(ah7, bl3)) | 0;
		    hi = (hi + Math.imul(ah7, bh3)) | 0;
		    lo = (lo + Math.imul(al6, bl4)) | 0;
		    mid = (mid + Math.imul(al6, bh4)) | 0;
		    mid = (mid + Math.imul(ah6, bl4)) | 0;
		    hi = (hi + Math.imul(ah6, bh4)) | 0;
		    lo = (lo + Math.imul(al5, bl5)) | 0;
		    mid = (mid + Math.imul(al5, bh5)) | 0;
		    mid = (mid + Math.imul(ah5, bl5)) | 0;
		    hi = (hi + Math.imul(ah5, bh5)) | 0;
		    lo = (lo + Math.imul(al4, bl6)) | 0;
		    mid = (mid + Math.imul(al4, bh6)) | 0;
		    mid = (mid + Math.imul(ah4, bl6)) | 0;
		    hi = (hi + Math.imul(ah4, bh6)) | 0;
		    lo = (lo + Math.imul(al3, bl7)) | 0;
		    mid = (mid + Math.imul(al3, bh7)) | 0;
		    mid = (mid + Math.imul(ah3, bl7)) | 0;
		    hi = (hi + Math.imul(ah3, bh7)) | 0;
		    lo = (lo + Math.imul(al2, bl8)) | 0;
		    mid = (mid + Math.imul(al2, bh8)) | 0;
		    mid = (mid + Math.imul(ah2, bl8)) | 0;
		    hi = (hi + Math.imul(ah2, bh8)) | 0;
		    lo = (lo + Math.imul(al1, bl9)) | 0;
		    mid = (mid + Math.imul(al1, bh9)) | 0;
		    mid = (mid + Math.imul(ah1, bl9)) | 0;
		    hi = (hi + Math.imul(ah1, bh9)) | 0;
		    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
		    w10 &= 0x3ffffff;
		    /* k = 11 */
		    lo = Math.imul(al9, bl2);
		    mid = Math.imul(al9, bh2);
		    mid = (mid + Math.imul(ah9, bl2)) | 0;
		    hi = Math.imul(ah9, bh2);
		    lo = (lo + Math.imul(al8, bl3)) | 0;
		    mid = (mid + Math.imul(al8, bh3)) | 0;
		    mid = (mid + Math.imul(ah8, bl3)) | 0;
		    hi = (hi + Math.imul(ah8, bh3)) | 0;
		    lo = (lo + Math.imul(al7, bl4)) | 0;
		    mid = (mid + Math.imul(al7, bh4)) | 0;
		    mid = (mid + Math.imul(ah7, bl4)) | 0;
		    hi = (hi + Math.imul(ah7, bh4)) | 0;
		    lo = (lo + Math.imul(al6, bl5)) | 0;
		    mid = (mid + Math.imul(al6, bh5)) | 0;
		    mid = (mid + Math.imul(ah6, bl5)) | 0;
		    hi = (hi + Math.imul(ah6, bh5)) | 0;
		    lo = (lo + Math.imul(al5, bl6)) | 0;
		    mid = (mid + Math.imul(al5, bh6)) | 0;
		    mid = (mid + Math.imul(ah5, bl6)) | 0;
		    hi = (hi + Math.imul(ah5, bh6)) | 0;
		    lo = (lo + Math.imul(al4, bl7)) | 0;
		    mid = (mid + Math.imul(al4, bh7)) | 0;
		    mid = (mid + Math.imul(ah4, bl7)) | 0;
		    hi = (hi + Math.imul(ah4, bh7)) | 0;
		    lo = (lo + Math.imul(al3, bl8)) | 0;
		    mid = (mid + Math.imul(al3, bh8)) | 0;
		    mid = (mid + Math.imul(ah3, bl8)) | 0;
		    hi = (hi + Math.imul(ah3, bh8)) | 0;
		    lo = (lo + Math.imul(al2, bl9)) | 0;
		    mid = (mid + Math.imul(al2, bh9)) | 0;
		    mid = (mid + Math.imul(ah2, bl9)) | 0;
		    hi = (hi + Math.imul(ah2, bh9)) | 0;
		    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
		    w11 &= 0x3ffffff;
		    /* k = 12 */
		    lo = Math.imul(al9, bl3);
		    mid = Math.imul(al9, bh3);
		    mid = (mid + Math.imul(ah9, bl3)) | 0;
		    hi = Math.imul(ah9, bh3);
		    lo = (lo + Math.imul(al8, bl4)) | 0;
		    mid = (mid + Math.imul(al8, bh4)) | 0;
		    mid = (mid + Math.imul(ah8, bl4)) | 0;
		    hi = (hi + Math.imul(ah8, bh4)) | 0;
		    lo = (lo + Math.imul(al7, bl5)) | 0;
		    mid = (mid + Math.imul(al7, bh5)) | 0;
		    mid = (mid + Math.imul(ah7, bl5)) | 0;
		    hi = (hi + Math.imul(ah7, bh5)) | 0;
		    lo = (lo + Math.imul(al6, bl6)) | 0;
		    mid = (mid + Math.imul(al6, bh6)) | 0;
		    mid = (mid + Math.imul(ah6, bl6)) | 0;
		    hi = (hi + Math.imul(ah6, bh6)) | 0;
		    lo = (lo + Math.imul(al5, bl7)) | 0;
		    mid = (mid + Math.imul(al5, bh7)) | 0;
		    mid = (mid + Math.imul(ah5, bl7)) | 0;
		    hi = (hi + Math.imul(ah5, bh7)) | 0;
		    lo = (lo + Math.imul(al4, bl8)) | 0;
		    mid = (mid + Math.imul(al4, bh8)) | 0;
		    mid = (mid + Math.imul(ah4, bl8)) | 0;
		    hi = (hi + Math.imul(ah4, bh8)) | 0;
		    lo = (lo + Math.imul(al3, bl9)) | 0;
		    mid = (mid + Math.imul(al3, bh9)) | 0;
		    mid = (mid + Math.imul(ah3, bl9)) | 0;
		    hi = (hi + Math.imul(ah3, bh9)) | 0;
		    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
		    w12 &= 0x3ffffff;
		    /* k = 13 */
		    lo = Math.imul(al9, bl4);
		    mid = Math.imul(al9, bh4);
		    mid = (mid + Math.imul(ah9, bl4)) | 0;
		    hi = Math.imul(ah9, bh4);
		    lo = (lo + Math.imul(al8, bl5)) | 0;
		    mid = (mid + Math.imul(al8, bh5)) | 0;
		    mid = (mid + Math.imul(ah8, bl5)) | 0;
		    hi = (hi + Math.imul(ah8, bh5)) | 0;
		    lo = (lo + Math.imul(al7, bl6)) | 0;
		    mid = (mid + Math.imul(al7, bh6)) | 0;
		    mid = (mid + Math.imul(ah7, bl6)) | 0;
		    hi = (hi + Math.imul(ah7, bh6)) | 0;
		    lo = (lo + Math.imul(al6, bl7)) | 0;
		    mid = (mid + Math.imul(al6, bh7)) | 0;
		    mid = (mid + Math.imul(ah6, bl7)) | 0;
		    hi = (hi + Math.imul(ah6, bh7)) | 0;
		    lo = (lo + Math.imul(al5, bl8)) | 0;
		    mid = (mid + Math.imul(al5, bh8)) | 0;
		    mid = (mid + Math.imul(ah5, bl8)) | 0;
		    hi = (hi + Math.imul(ah5, bh8)) | 0;
		    lo = (lo + Math.imul(al4, bl9)) | 0;
		    mid = (mid + Math.imul(al4, bh9)) | 0;
		    mid = (mid + Math.imul(ah4, bl9)) | 0;
		    hi = (hi + Math.imul(ah4, bh9)) | 0;
		    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
		    w13 &= 0x3ffffff;
		    /* k = 14 */
		    lo = Math.imul(al9, bl5);
		    mid = Math.imul(al9, bh5);
		    mid = (mid + Math.imul(ah9, bl5)) | 0;
		    hi = Math.imul(ah9, bh5);
		    lo = (lo + Math.imul(al8, bl6)) | 0;
		    mid = (mid + Math.imul(al8, bh6)) | 0;
		    mid = (mid + Math.imul(ah8, bl6)) | 0;
		    hi = (hi + Math.imul(ah8, bh6)) | 0;
		    lo = (lo + Math.imul(al7, bl7)) | 0;
		    mid = (mid + Math.imul(al7, bh7)) | 0;
		    mid = (mid + Math.imul(ah7, bl7)) | 0;
		    hi = (hi + Math.imul(ah7, bh7)) | 0;
		    lo = (lo + Math.imul(al6, bl8)) | 0;
		    mid = (mid + Math.imul(al6, bh8)) | 0;
		    mid = (mid + Math.imul(ah6, bl8)) | 0;
		    hi = (hi + Math.imul(ah6, bh8)) | 0;
		    lo = (lo + Math.imul(al5, bl9)) | 0;
		    mid = (mid + Math.imul(al5, bh9)) | 0;
		    mid = (mid + Math.imul(ah5, bl9)) | 0;
		    hi = (hi + Math.imul(ah5, bh9)) | 0;
		    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
		    w14 &= 0x3ffffff;
		    /* k = 15 */
		    lo = Math.imul(al9, bl6);
		    mid = Math.imul(al9, bh6);
		    mid = (mid + Math.imul(ah9, bl6)) | 0;
		    hi = Math.imul(ah9, bh6);
		    lo = (lo + Math.imul(al8, bl7)) | 0;
		    mid = (mid + Math.imul(al8, bh7)) | 0;
		    mid = (mid + Math.imul(ah8, bl7)) | 0;
		    hi = (hi + Math.imul(ah8, bh7)) | 0;
		    lo = (lo + Math.imul(al7, bl8)) | 0;
		    mid = (mid + Math.imul(al7, bh8)) | 0;
		    mid = (mid + Math.imul(ah7, bl8)) | 0;
		    hi = (hi + Math.imul(ah7, bh8)) | 0;
		    lo = (lo + Math.imul(al6, bl9)) | 0;
		    mid = (mid + Math.imul(al6, bh9)) | 0;
		    mid = (mid + Math.imul(ah6, bl9)) | 0;
		    hi = (hi + Math.imul(ah6, bh9)) | 0;
		    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
		    w15 &= 0x3ffffff;
		    /* k = 16 */
		    lo = Math.imul(al9, bl7);
		    mid = Math.imul(al9, bh7);
		    mid = (mid + Math.imul(ah9, bl7)) | 0;
		    hi = Math.imul(ah9, bh7);
		    lo = (lo + Math.imul(al8, bl8)) | 0;
		    mid = (mid + Math.imul(al8, bh8)) | 0;
		    mid = (mid + Math.imul(ah8, bl8)) | 0;
		    hi = (hi + Math.imul(ah8, bh8)) | 0;
		    lo = (lo + Math.imul(al7, bl9)) | 0;
		    mid = (mid + Math.imul(al7, bh9)) | 0;
		    mid = (mid + Math.imul(ah7, bl9)) | 0;
		    hi = (hi + Math.imul(ah7, bh9)) | 0;
		    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
		    w16 &= 0x3ffffff;
		    /* k = 17 */
		    lo = Math.imul(al9, bl8);
		    mid = Math.imul(al9, bh8);
		    mid = (mid + Math.imul(ah9, bl8)) | 0;
		    hi = Math.imul(ah9, bh8);
		    lo = (lo + Math.imul(al8, bl9)) | 0;
		    mid = (mid + Math.imul(al8, bh9)) | 0;
		    mid = (mid + Math.imul(ah8, bl9)) | 0;
		    hi = (hi + Math.imul(ah8, bh9)) | 0;
		    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
		    w17 &= 0x3ffffff;
		    /* k = 18 */
		    lo = Math.imul(al9, bl9);
		    mid = Math.imul(al9, bh9);
		    mid = (mid + Math.imul(ah9, bl9)) | 0;
		    hi = Math.imul(ah9, bh9);
		    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
		    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
		    w18 &= 0x3ffffff;
		    o[0] = w0;
		    o[1] = w1;
		    o[2] = w2;
		    o[3] = w3;
		    o[4] = w4;
		    o[5] = w5;
		    o[6] = w6;
		    o[7] = w7;
		    o[8] = w8;
		    o[9] = w9;
		    o[10] = w10;
		    o[11] = w11;
		    o[12] = w12;
		    o[13] = w13;
		    o[14] = w14;
		    o[15] = w15;
		    o[16] = w16;
		    o[17] = w17;
		    o[18] = w18;
		    if (c !== 0) {
		      o[19] = c;
		      out.length++;
		    }
		    return out;
		  };

		  // Polyfill comb
		  if (!Math.imul) {
		    comb10MulTo = smallMulTo;
		  }

		  function bigMulTo (self, num, out) {
		    out.negative = num.negative ^ self.negative;
		    out.length = self.length + num.length;

		    var carry = 0;
		    var hncarry = 0;
		    for (var k = 0; k < out.length - 1; k++) {
		      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
		      // note that ncarry could be >= 0x3ffffff
		      var ncarry = hncarry;
		      hncarry = 0;
		      var rword = carry & 0x3ffffff;
		      var maxJ = Math.min(k, num.length - 1);
		      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
		        var i = k - j;
		        var a = self.words[i] | 0;
		        var b = num.words[j] | 0;
		        var r = a * b;

		        var lo = r & 0x3ffffff;
		        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
		        lo = (lo + rword) | 0;
		        rword = lo & 0x3ffffff;
		        ncarry = (ncarry + (lo >>> 26)) | 0;

		        hncarry += ncarry >>> 26;
		        ncarry &= 0x3ffffff;
		      }
		      out.words[k] = rword;
		      carry = ncarry;
		      ncarry = hncarry;
		    }
		    if (carry !== 0) {
		      out.words[k] = carry;
		    } else {
		      out.length--;
		    }

		    return out.strip();
		  }

		  function jumboMulTo (self, num, out) {
		    var fftm = new FFTM();
		    return fftm.mulp(self, num, out);
		  }

		  BN.prototype.mulTo = function mulTo (num, out) {
		    var res;
		    var len = this.length + num.length;
		    if (this.length === 10 && num.length === 10) {
		      res = comb10MulTo(this, num, out);
		    } else if (len < 63) {
		      res = smallMulTo(this, num, out);
		    } else if (len < 1024) {
		      res = bigMulTo(this, num, out);
		    } else {
		      res = jumboMulTo(this, num, out);
		    }

		    return res;
		  };

		  // Cooley-Tukey algorithm for FFT
		  // slightly revisited to rely on looping instead of recursion

		  function FFTM (x, y) {
		    this.x = x;
		    this.y = y;
		  }

		  FFTM.prototype.makeRBT = function makeRBT (N) {
		    var this$1 = this;

		    var t = new Array(N);
		    var l = BN.prototype._countBits(N) - 1;
		    for (var i = 0; i < N; i++) {
		      t[i] = this$1.revBin(i, l, N);
		    }

		    return t;
		  };

		  // Returns binary-reversed representation of `x`
		  FFTM.prototype.revBin = function revBin (x, l, N) {
		    if (x === 0 || x === N - 1) { return x; }

		    var rb = 0;
		    for (var i = 0; i < l; i++) {
		      rb |= (x & 1) << (l - i - 1);
		      x >>= 1;
		    }

		    return rb;
		  };

		  // Performs "tweedling" phase, therefore 'emulating'
		  // behaviour of the recursive algorithm
		  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
		    for (var i = 0; i < N; i++) {
		      rtws[i] = rws[rbt[i]];
		      itws[i] = iws[rbt[i]];
		    }
		  };

		  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
		    this.permute(rbt, rws, iws, rtws, itws, N);

		    for (var s = 1; s < N; s <<= 1) {
		      var l = s << 1;

		      var rtwdf = Math.cos(2 * Math.PI / l);
		      var itwdf = Math.sin(2 * Math.PI / l);

		      for (var p = 0; p < N; p += l) {
		        var rtwdf_ = rtwdf;
		        var itwdf_ = itwdf;

		        for (var j = 0; j < s; j++) {
		          var re = rtws[p + j];
		          var ie = itws[p + j];

		          var ro = rtws[p + j + s];
		          var io = itws[p + j + s];

		          var rx = rtwdf_ * ro - itwdf_ * io;

		          io = rtwdf_ * io + itwdf_ * ro;
		          ro = rx;

		          rtws[p + j] = re + ro;
		          itws[p + j] = ie + io;

		          rtws[p + j + s] = re - ro;
		          itws[p + j + s] = ie - io;

		          /* jshint maxdepth : false */
		          if (j !== l) {
		            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

		            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
		            rtwdf_ = rx;
		          }
		        }
		      }
		    }
		  };

		  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
		    var N = Math.max(m, n) | 1;
		    var odd = N & 1;
		    var i = 0;
		    for (N = N / 2 | 0; N; N = N >>> 1) {
		      i++;
		    }

		    return 1 << i + 1 + odd;
		  };

		  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
		    if (N <= 1) { return; }

		    for (var i = 0; i < N / 2; i++) {
		      var t = rws[i];

		      rws[i] = rws[N - i - 1];
		      rws[N - i - 1] = t;

		      t = iws[i];

		      iws[i] = -iws[N - i - 1];
		      iws[N - i - 1] = -t;
		    }
		  };

		  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
		    var carry = 0;
		    for (var i = 0; i < N / 2; i++) {
		      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
		        Math.round(ws[2 * i] / N) +
		        carry;

		      ws[i] = w & 0x3ffffff;

		      if (w < 0x4000000) {
		        carry = 0;
		      } else {
		        carry = w / 0x4000000 | 0;
		      }
		    }

		    return ws;
		  };

		  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
		    var carry = 0;
		    for (var i = 0; i < len; i++) {
		      carry = carry + (ws[i] | 0);

		      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
		      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
		    }

		    // Pad with zeroes
		    for (i = 2 * len; i < N; ++i) {
		      rws[i] = 0;
		    }

		    assert(carry === 0);
		    assert((carry & ~0x1fff) === 0);
		  };

		  FFTM.prototype.stub = function stub (N) {
		    var ph = new Array(N);
		    for (var i = 0; i < N; i++) {
		      ph[i] = 0;
		    }

		    return ph;
		  };

		  FFTM.prototype.mulp = function mulp (x, y, out) {
		    var N = 2 * this.guessLen13b(x.length, y.length);

		    var rbt = this.makeRBT(N);

		    var _ = this.stub(N);

		    var rws = new Array(N);
		    var rwst = new Array(N);
		    var iwst = new Array(N);

		    var nrws = new Array(N);
		    var nrwst = new Array(N);
		    var niwst = new Array(N);

		    var rmws = out.words;
		    rmws.length = N;

		    this.convert13b(x.words, x.length, rws, N);
		    this.convert13b(y.words, y.length, nrws, N);

		    this.transform(rws, _, rwst, iwst, N, rbt);
		    this.transform(nrws, _, nrwst, niwst, N, rbt);

		    for (var i = 0; i < N; i++) {
		      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
		      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
		      rwst[i] = rx;
		    }

		    this.conjugate(rwst, iwst, N);
		    this.transform(rwst, iwst, rmws, _, N, rbt);
		    this.conjugate(rmws, _, N);
		    this.normalize13b(rmws, N);

		    out.negative = x.negative ^ y.negative;
		    out.length = x.length + y.length;
		    return out.strip();
		  };

		  // Multiply `this` by `num`
		  BN.prototype.mul = function mul (num) {
		    var out = new BN(null);
		    out.words = new Array(this.length + num.length);
		    return this.mulTo(num, out);
		  };

		  // Multiply employing FFT
		  BN.prototype.mulf = function mulf (num) {
		    var out = new BN(null);
		    out.words = new Array(this.length + num.length);
		    return jumboMulTo(this, num, out);
		  };

		  // In-place Multiplication
		  BN.prototype.imul = function imul (num) {
		    return this.clone().mulTo(num, this);
		  };

		  BN.prototype.imuln = function imuln (num) {
		    var this$1 = this;

		    assert(typeof num === 'number');
		    assert(num < 0x4000000);

		    // Carry
		    var carry = 0;
		    for (var i = 0; i < this.length; i++) {
		      var w = (this$1.words[i] | 0) * num;
		      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
		      carry >>= 26;
		      carry += (w / 0x4000000) | 0;
		      // NOTE: lo is 27bit maximum
		      carry += lo >>> 26;
		      this$1.words[i] = lo & 0x3ffffff;
		    }

		    if (carry !== 0) {
		      this.words[i] = carry;
		      this.length++;
		    }

		    return this;
		  };

		  BN.prototype.muln = function muln (num) {
		    return this.clone().imuln(num);
		  };

		  // `this` * `this`
		  BN.prototype.sqr = function sqr () {
		    return this.mul(this);
		  };

		  // `this` * `this` in-place
		  BN.prototype.isqr = function isqr () {
		    return this.imul(this.clone());
		  };

		  // Math.pow(`this`, `num`)
		  BN.prototype.pow = function pow (num) {
		    var w = toBitArray(num);
		    if (w.length === 0) { return new BN(1); }

		    // Skip leading zeroes
		    var res = this;
		    for (var i = 0; i < w.length; i++, res = res.sqr()) {
		      if (w[i] !== 0) { break; }
		    }

		    if (++i < w.length) {
		      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
		        if (w[i] === 0) { continue; }

		        res = res.mul(q);
		      }
		    }

		    return res;
		  };

		  // Shift-left in-place
		  BN.prototype.iushln = function iushln (bits) {
		    var this$1 = this;

		    assert(typeof bits === 'number' && bits >= 0);
		    var r = bits % 26;
		    var s = (bits - r) / 26;
		    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
		    var i;

		    if (r !== 0) {
		      var carry = 0;

		      for (i = 0; i < this.length; i++) {
		        var newCarry = this$1.words[i] & carryMask;
		        var c = ((this$1.words[i] | 0) - newCarry) << r;
		        this$1.words[i] = c | carry;
		        carry = newCarry >>> (26 - r);
		      }

		      if (carry) {
		        this.words[i] = carry;
		        this.length++;
		      }
		    }

		    if (s !== 0) {
		      for (i = this.length - 1; i >= 0; i--) {
		        this$1.words[i + s] = this$1.words[i];
		      }

		      for (i = 0; i < s; i++) {
		        this$1.words[i] = 0;
		      }

		      this.length += s;
		    }

		    return this.strip();
		  };

		  BN.prototype.ishln = function ishln (bits) {
		    // TODO(indutny): implement me
		    assert(this.negative === 0);
		    return this.iushln(bits);
		  };

		  // Shift-right in-place
		  // NOTE: `hint` is a lowest bit before trailing zeroes
		  // NOTE: if `extended` is present - it will be filled with destroyed bits
		  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
		    var this$1 = this;

		    assert(typeof bits === 'number' && bits >= 0);
		    var h;
		    if (hint) {
		      h = (hint - (hint % 26)) / 26;
		    } else {
		      h = 0;
		    }

		    var r = bits % 26;
		    var s = Math.min((bits - r) / 26, this.length);
		    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
		    var maskedWords = extended;

		    h -= s;
		    h = Math.max(0, h);

		    // Extended mode, copy masked part
		    if (maskedWords) {
		      for (var i = 0; i < s; i++) {
		        maskedWords.words[i] = this$1.words[i];
		      }
		      maskedWords.length = s;
		    }

		    if (s === 0) {
		      // No-op, we should not move anything at all
		    } else if (this.length > s) {
		      this.length -= s;
		      for (i = 0; i < this.length; i++) {
		        this$1.words[i] = this$1.words[i + s];
		      }
		    } else {
		      this.words[0] = 0;
		      this.length = 1;
		    }

		    var carry = 0;
		    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
		      var word = this$1.words[i] | 0;
		      this$1.words[i] = (carry << (26 - r)) | (word >>> r);
		      carry = word & mask;
		    }

		    // Push carried bits as a mask
		    if (maskedWords && carry !== 0) {
		      maskedWords.words[maskedWords.length++] = carry;
		    }

		    if (this.length === 0) {
		      this.words[0] = 0;
		      this.length = 1;
		    }

		    return this.strip();
		  };

		  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
		    // TODO(indutny): implement me
		    assert(this.negative === 0);
		    return this.iushrn(bits, hint, extended);
		  };

		  // Shift-left
		  BN.prototype.shln = function shln (bits) {
		    return this.clone().ishln(bits);
		  };

		  BN.prototype.ushln = function ushln (bits) {
		    return this.clone().iushln(bits);
		  };

		  // Shift-right
		  BN.prototype.shrn = function shrn (bits) {
		    return this.clone().ishrn(bits);
		  };

		  BN.prototype.ushrn = function ushrn (bits) {
		    return this.clone().iushrn(bits);
		  };

		  // Test if n bit is set
		  BN.prototype.testn = function testn (bit) {
		    assert(typeof bit === 'number' && bit >= 0);
		    var r = bit % 26;
		    var s = (bit - r) / 26;
		    var q = 1 << r;

		    // Fast case: bit is much higher than all existing words
		    if (this.length <= s) { return false; }

		    // Check bit and return
		    var w = this.words[s];

		    return !!(w & q);
		  };

		  // Return only lowers bits of number (in-place)
		  BN.prototype.imaskn = function imaskn (bits) {
		    assert(typeof bits === 'number' && bits >= 0);
		    var r = bits % 26;
		    var s = (bits - r) / 26;

		    assert(this.negative === 0, 'imaskn works only with positive numbers');

		    if (this.length <= s) {
		      return this;
		    }

		    if (r !== 0) {
		      s++;
		    }
		    this.length = Math.min(s, this.length);

		    if (r !== 0) {
		      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
		      this.words[this.length - 1] &= mask;
		    }

		    return this.strip();
		  };

		  // Return only lowers bits of number
		  BN.prototype.maskn = function maskn (bits) {
		    return this.clone().imaskn(bits);
		  };

		  // Add plain number `num` to `this`
		  BN.prototype.iaddn = function iaddn (num) {
		    assert(typeof num === 'number');
		    assert(num < 0x4000000);
		    if (num < 0) { return this.isubn(-num); }

		    // Possible sign change
		    if (this.negative !== 0) {
		      if (this.length === 1 && (this.words[0] | 0) < num) {
		        this.words[0] = num - (this.words[0] | 0);
		        this.negative = 0;
		        return this;
		      }

		      this.negative = 0;
		      this.isubn(num);
		      this.negative = 1;
		      return this;
		    }

		    // Add without checks
		    return this._iaddn(num);
		  };

		  BN.prototype._iaddn = function _iaddn (num) {
		    var this$1 = this;

		    this.words[0] += num;

		    // Carry
		    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
		      this$1.words[i] -= 0x4000000;
		      if (i === this$1.length - 1) {
		        this$1.words[i + 1] = 1;
		      } else {
		        this$1.words[i + 1]++;
		      }
		    }
		    this.length = Math.max(this.length, i + 1);

		    return this;
		  };

		  // Subtract plain number `num` from `this`
		  BN.prototype.isubn = function isubn (num) {
		    var this$1 = this;

		    assert(typeof num === 'number');
		    assert(num < 0x4000000);
		    if (num < 0) { return this.iaddn(-num); }

		    if (this.negative !== 0) {
		      this.negative = 0;
		      this.iaddn(num);
		      this.negative = 1;
		      return this;
		    }

		    this.words[0] -= num;

		    if (this.length === 1 && this.words[0] < 0) {
		      this.words[0] = -this.words[0];
		      this.negative = 1;
		    } else {
		      // Carry
		      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
		        this$1.words[i] += 0x4000000;
		        this$1.words[i + 1] -= 1;
		      }
		    }

		    return this.strip();
		  };

		  BN.prototype.addn = function addn (num) {
		    return this.clone().iaddn(num);
		  };

		  BN.prototype.subn = function subn (num) {
		    return this.clone().isubn(num);
		  };

		  BN.prototype.iabs = function iabs () {
		    this.negative = 0;

		    return this;
		  };

		  BN.prototype.abs = function abs () {
		    return this.clone().iabs();
		  };

		  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
		    var this$1 = this;

		    var len = num.length + shift;
		    var i;

		    this._expand(len);

		    var w;
		    var carry = 0;
		    for (i = 0; i < num.length; i++) {
		      w = (this$1.words[i + shift] | 0) + carry;
		      var right = (num.words[i] | 0) * mul;
		      w -= right & 0x3ffffff;
		      carry = (w >> 26) - ((right / 0x4000000) | 0);
		      this$1.words[i + shift] = w & 0x3ffffff;
		    }
		    for (; i < this.length - shift; i++) {
		      w = (this$1.words[i + shift] | 0) + carry;
		      carry = w >> 26;
		      this$1.words[i + shift] = w & 0x3ffffff;
		    }

		    if (carry === 0) { return this.strip(); }

		    // Subtraction overflow
		    assert(carry === -1);
		    carry = 0;
		    for (i = 0; i < this.length; i++) {
		      w = -(this$1.words[i] | 0) + carry;
		      carry = w >> 26;
		      this$1.words[i] = w & 0x3ffffff;
		    }
		    this.negative = 1;

		    return this.strip();
		  };

		  BN.prototype._wordDiv = function _wordDiv (num, mode) {
		    var shift = this.length - num.length;

		    var a = this.clone();
		    var b = num;

		    // Normalize
		    var bhi = b.words[b.length - 1] | 0;
		    var bhiBits = this._countBits(bhi);
		    shift = 26 - bhiBits;
		    if (shift !== 0) {
		      b = b.ushln(shift);
		      a.iushln(shift);
		      bhi = b.words[b.length - 1] | 0;
		    }

		    // Initialize quotient
		    var m = a.length - b.length;
		    var q;

		    if (mode !== 'mod') {
		      q = new BN(null);
		      q.length = m + 1;
		      q.words = new Array(q.length);
		      for (var i = 0; i < q.length; i++) {
		        q.words[i] = 0;
		      }
		    }

		    var diff = a.clone()._ishlnsubmul(b, 1, m);
		    if (diff.negative === 0) {
		      a = diff;
		      if (q) {
		        q.words[m] = 1;
		      }
		    }

		    for (var j = m - 1; j >= 0; j--) {
		      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
		        (a.words[b.length + j - 1] | 0);

		      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
		      // (0x7ffffff)
		      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

		      a._ishlnsubmul(b, qj, j);
		      while (a.negative !== 0) {
		        qj--;
		        a.negative = 0;
		        a._ishlnsubmul(b, 1, j);
		        if (!a.isZero()) {
		          a.negative ^= 1;
		        }
		      }
		      if (q) {
		        q.words[j] = qj;
		      }
		    }
		    if (q) {
		      q.strip();
		    }
		    a.strip();

		    // Denormalize
		    if (mode !== 'div' && shift !== 0) {
		      a.iushrn(shift);
		    }

		    return {
		      div: q || null,
		      mod: a
		    };
		  };

		  // NOTE: 1) `mode` can be set to `mod` to request mod only,
		  //       to `div` to request div only, or be absent to
		  //       request both div & mod
		  //       2) `positive` is true if unsigned mod is requested
		  BN.prototype.divmod = function divmod (num, mode, positive) {
		    assert(!num.isZero());

		    if (this.isZero()) {
		      return {
		        div: new BN(0),
		        mod: new BN(0)
		      };
		    }

		    var div, mod, res;
		    if (this.negative !== 0 && num.negative === 0) {
		      res = this.neg().divmod(num, mode);

		      if (mode !== 'mod') {
		        div = res.div.neg();
		      }

		      if (mode !== 'div') {
		        mod = res.mod.neg();
		        if (positive && mod.negative !== 0) {
		          mod.iadd(num);
		        }
		      }

		      return {
		        div: div,
		        mod: mod
		      };
		    }

		    if (this.negative === 0 && num.negative !== 0) {
		      res = this.divmod(num.neg(), mode);

		      if (mode !== 'mod') {
		        div = res.div.neg();
		      }

		      return {
		        div: div,
		        mod: res.mod
		      };
		    }

		    if ((this.negative & num.negative) !== 0) {
		      res = this.neg().divmod(num.neg(), mode);

		      if (mode !== 'div') {
		        mod = res.mod.neg();
		        if (positive && mod.negative !== 0) {
		          mod.isub(num);
		        }
		      }

		      return {
		        div: res.div,
		        mod: mod
		      };
		    }

		    // Both numbers are positive at this point

		    // Strip both numbers to approximate shift value
		    if (num.length > this.length || this.cmp(num) < 0) {
		      return {
		        div: new BN(0),
		        mod: this
		      };
		    }

		    // Very short reduction
		    if (num.length === 1) {
		      if (mode === 'div') {
		        return {
		          div: this.divn(num.words[0]),
		          mod: null
		        };
		      }

		      if (mode === 'mod') {
		        return {
		          div: null,
		          mod: new BN(this.modn(num.words[0]))
		        };
		      }

		      return {
		        div: this.divn(num.words[0]),
		        mod: new BN(this.modn(num.words[0]))
		      };
		    }

		    return this._wordDiv(num, mode);
		  };

		  // Find `this` / `num`
		  BN.prototype.div = function div (num) {
		    return this.divmod(num, 'div', false).div;
		  };

		  // Find `this` % `num`
		  BN.prototype.mod = function mod (num) {
		    return this.divmod(num, 'mod', false).mod;
		  };

		  BN.prototype.umod = function umod (num) {
		    return this.divmod(num, 'mod', true).mod;
		  };

		  // Find Round(`this` / `num`)
		  BN.prototype.divRound = function divRound (num) {
		    var dm = this.divmod(num);

		    // Fast case - exact division
		    if (dm.mod.isZero()) { return dm.div; }

		    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

		    var half = num.ushrn(1);
		    var r2 = num.andln(1);
		    var cmp = mod.cmp(half);

		    // Round down
		    if (cmp < 0 || r2 === 1 && cmp === 0) { return dm.div; }

		    // Round up
		    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
		  };

		  BN.prototype.modn = function modn (num) {
		    var this$1 = this;

		    assert(num <= 0x3ffffff);
		    var p = (1 << 26) % num;

		    var acc = 0;
		    for (var i = this.length - 1; i >= 0; i--) {
		      acc = (p * acc + (this$1.words[i] | 0)) % num;
		    }

		    return acc;
		  };

		  // In-place division by number
		  BN.prototype.idivn = function idivn (num) {
		    var this$1 = this;

		    assert(num <= 0x3ffffff);

		    var carry = 0;
		    for (var i = this.length - 1; i >= 0; i--) {
		      var w = (this$1.words[i] | 0) + carry * 0x4000000;
		      this$1.words[i] = (w / num) | 0;
		      carry = w % num;
		    }

		    return this.strip();
		  };

		  BN.prototype.divn = function divn (num) {
		    return this.clone().idivn(num);
		  };

		  BN.prototype.egcd = function egcd (p) {
		    assert(p.negative === 0);
		    assert(!p.isZero());

		    var x = this;
		    var y = p.clone();

		    if (x.negative !== 0) {
		      x = x.umod(p);
		    } else {
		      x = x.clone();
		    }

		    // A * x + B * y = x
		    var A = new BN(1);
		    var B = new BN(0);

		    // C * x + D * y = y
		    var C = new BN(0);
		    var D = new BN(1);

		    var g = 0;

		    while (x.isEven() && y.isEven()) {
		      x.iushrn(1);
		      y.iushrn(1);
		      ++g;
		    }

		    var yp = y.clone();
		    var xp = x.clone();

		    while (!x.isZero()) {
		      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1){  }
		      if (i > 0) {
		        x.iushrn(i);
		        while (i-- > 0) {
		          if (A.isOdd() || B.isOdd()) {
		            A.iadd(yp);
		            B.isub(xp);
		          }

		          A.iushrn(1);
		          B.iushrn(1);
		        }
		      }

		      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1){  }
		      if (j > 0) {
		        y.iushrn(j);
		        while (j-- > 0) {
		          if (C.isOdd() || D.isOdd()) {
		            C.iadd(yp);
		            D.isub(xp);
		          }

		          C.iushrn(1);
		          D.iushrn(1);
		        }
		      }

		      if (x.cmp(y) >= 0) {
		        x.isub(y);
		        A.isub(C);
		        B.isub(D);
		      } else {
		        y.isub(x);
		        C.isub(A);
		        D.isub(B);
		      }
		    }

		    return {
		      a: C,
		      b: D,
		      gcd: y.iushln(g)
		    };
		  };

		  // This is reduced incarnation of the binary EEA
		  // above, designated to invert members of the
		  // _prime_ fields F(p) at a maximal speed
		  BN.prototype._invmp = function _invmp (p) {
		    assert(p.negative === 0);
		    assert(!p.isZero());

		    var a = this;
		    var b = p.clone();

		    if (a.negative !== 0) {
		      a = a.umod(p);
		    } else {
		      a = a.clone();
		    }

		    var x1 = new BN(1);
		    var x2 = new BN(0);

		    var delta = b.clone();

		    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
		      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1){  }
		      if (i > 0) {
		        a.iushrn(i);
		        while (i-- > 0) {
		          if (x1.isOdd()) {
		            x1.iadd(delta);
		          }

		          x1.iushrn(1);
		        }
		      }

		      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1){  }
		      if (j > 0) {
		        b.iushrn(j);
		        while (j-- > 0) {
		          if (x2.isOdd()) {
		            x2.iadd(delta);
		          }

		          x2.iushrn(1);
		        }
		      }

		      if (a.cmp(b) >= 0) {
		        a.isub(b);
		        x1.isub(x2);
		      } else {
		        b.isub(a);
		        x2.isub(x1);
		      }
		    }

		    var res;
		    if (a.cmpn(1) === 0) {
		      res = x1;
		    } else {
		      res = x2;
		    }

		    if (res.cmpn(0) < 0) {
		      res.iadd(p);
		    }

		    return res;
		  };

		  BN.prototype.gcd = function gcd (num) {
		    if (this.isZero()) { return num.abs(); }
		    if (num.isZero()) { return this.abs(); }

		    var a = this.clone();
		    var b = num.clone();
		    a.negative = 0;
		    b.negative = 0;

		    // Remove common factor of two
		    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
		      a.iushrn(1);
		      b.iushrn(1);
		    }

		    do {
		      while (a.isEven()) {
		        a.iushrn(1);
		      }
		      while (b.isEven()) {
		        b.iushrn(1);
		      }

		      var r = a.cmp(b);
		      if (r < 0) {
		        // Swap `a` and `b` to make `a` always bigger than `b`
		        var t = a;
		        a = b;
		        b = t;
		      } else if (r === 0 || b.cmpn(1) === 0) {
		        break;
		      }

		      a.isub(b);
		    } while (true);

		    return b.iushln(shift);
		  };

		  // Invert number in the field F(num)
		  BN.prototype.invm = function invm (num) {
		    return this.egcd(num).a.umod(num);
		  };

		  BN.prototype.isEven = function isEven () {
		    return (this.words[0] & 1) === 0;
		  };

		  BN.prototype.isOdd = function isOdd () {
		    return (this.words[0] & 1) === 1;
		  };

		  // And first word and num
		  BN.prototype.andln = function andln (num) {
		    return this.words[0] & num;
		  };

		  // Increment at the bit position in-line
		  BN.prototype.bincn = function bincn (bit) {
		    var this$1 = this;

		    assert(typeof bit === 'number');
		    var r = bit % 26;
		    var s = (bit - r) / 26;
		    var q = 1 << r;

		    // Fast case: bit is much higher than all existing words
		    if (this.length <= s) {
		      this._expand(s + 1);
		      this.words[s] |= q;
		      return this;
		    }

		    // Add bit and propagate, if needed
		    var carry = q;
		    for (var i = s; carry !== 0 && i < this.length; i++) {
		      var w = this$1.words[i] | 0;
		      w += carry;
		      carry = w >>> 26;
		      w &= 0x3ffffff;
		      this$1.words[i] = w;
		    }
		    if (carry !== 0) {
		      this.words[i] = carry;
		      this.length++;
		    }
		    return this;
		  };

		  BN.prototype.isZero = function isZero () {
		    return this.length === 1 && this.words[0] === 0;
		  };

		  BN.prototype.cmpn = function cmpn (num) {
		    var negative = num < 0;

		    if (this.negative !== 0 && !negative) { return -1; }
		    if (this.negative === 0 && negative) { return 1; }

		    this.strip();

		    var res;
		    if (this.length > 1) {
		      res = 1;
		    } else {
		      if (negative) {
		        num = -num;
		      }

		      assert(num <= 0x3ffffff, 'Number is too big');

		      var w = this.words[0] | 0;
		      res = w === num ? 0 : w < num ? -1 : 1;
		    }
		    if (this.negative !== 0) { return -res | 0; }
		    return res;
		  };

		  // Compare two numbers and return:
		  // 1 - if `this` > `num`
		  // 0 - if `this` == `num`
		  // -1 - if `this` < `num`
		  BN.prototype.cmp = function cmp (num) {
		    if (this.negative !== 0 && num.negative === 0) { return -1; }
		    if (this.negative === 0 && num.negative !== 0) { return 1; }

		    var res = this.ucmp(num);
		    if (this.negative !== 0) { return -res | 0; }
		    return res;
		  };

		  // Unsigned comparison
		  BN.prototype.ucmp = function ucmp (num) {
		    var this$1 = this;

		    // At this point both numbers have the same sign
		    if (this.length > num.length) { return 1; }
		    if (this.length < num.length) { return -1; }

		    var res = 0;
		    for (var i = this.length - 1; i >= 0; i--) {
		      var a = this$1.words[i] | 0;
		      var b = num.words[i] | 0;

		      if (a === b) { continue; }
		      if (a < b) {
		        res = -1;
		      } else if (a > b) {
		        res = 1;
		      }
		      break;
		    }
		    return res;
		  };

		  BN.prototype.gtn = function gtn (num) {
		    return this.cmpn(num) === 1;
		  };

		  BN.prototype.gt = function gt (num) {
		    return this.cmp(num) === 1;
		  };

		  BN.prototype.gten = function gten (num) {
		    return this.cmpn(num) >= 0;
		  };

		  BN.prototype.gte = function gte (num) {
		    return this.cmp(num) >= 0;
		  };

		  BN.prototype.ltn = function ltn (num) {
		    return this.cmpn(num) === -1;
		  };

		  BN.prototype.lt = function lt (num) {
		    return this.cmp(num) === -1;
		  };

		  BN.prototype.lten = function lten (num) {
		    return this.cmpn(num) <= 0;
		  };

		  BN.prototype.lte = function lte (num) {
		    return this.cmp(num) <= 0;
		  };

		  BN.prototype.eqn = function eqn (num) {
		    return this.cmpn(num) === 0;
		  };

		  BN.prototype.eq = function eq (num) {
		    return this.cmp(num) === 0;
		  };

		  //
		  // A reduce context, could be using montgomery or something better, depending
		  // on the `m` itself.
		  //
		  BN.red = function red (num) {
		    return new Red(num);
		  };

		  BN.prototype.toRed = function toRed (ctx) {
		    assert(!this.red, 'Already a number in reduction context');
		    assert(this.negative === 0, 'red works only with positives');
		    return ctx.convertTo(this)._forceRed(ctx);
		  };

		  BN.prototype.fromRed = function fromRed () {
		    assert(this.red, 'fromRed works only with numbers in reduction context');
		    return this.red.convertFrom(this);
		  };

		  BN.prototype._forceRed = function _forceRed (ctx) {
		    this.red = ctx;
		    return this;
		  };

		  BN.prototype.forceRed = function forceRed (ctx) {
		    assert(!this.red, 'Already a number in reduction context');
		    return this._forceRed(ctx);
		  };

		  BN.prototype.redAdd = function redAdd (num) {
		    assert(this.red, 'redAdd works only with red numbers');
		    return this.red.add(this, num);
		  };

		  BN.prototype.redIAdd = function redIAdd (num) {
		    assert(this.red, 'redIAdd works only with red numbers');
		    return this.red.iadd(this, num);
		  };

		  BN.prototype.redSub = function redSub (num) {
		    assert(this.red, 'redSub works only with red numbers');
		    return this.red.sub(this, num);
		  };

		  BN.prototype.redISub = function redISub (num) {
		    assert(this.red, 'redISub works only with red numbers');
		    return this.red.isub(this, num);
		  };

		  BN.prototype.redShl = function redShl (num) {
		    assert(this.red, 'redShl works only with red numbers');
		    return this.red.shl(this, num);
		  };

		  BN.prototype.redMul = function redMul (num) {
		    assert(this.red, 'redMul works only with red numbers');
		    this.red._verify2(this, num);
		    return this.red.mul(this, num);
		  };

		  BN.prototype.redIMul = function redIMul (num) {
		    assert(this.red, 'redMul works only with red numbers');
		    this.red._verify2(this, num);
		    return this.red.imul(this, num);
		  };

		  BN.prototype.redSqr = function redSqr () {
		    assert(this.red, 'redSqr works only with red numbers');
		    this.red._verify1(this);
		    return this.red.sqr(this);
		  };

		  BN.prototype.redISqr = function redISqr () {
		    assert(this.red, 'redISqr works only with red numbers');
		    this.red._verify1(this);
		    return this.red.isqr(this);
		  };

		  // Square root over p
		  BN.prototype.redSqrt = function redSqrt () {
		    assert(this.red, 'redSqrt works only with red numbers');
		    this.red._verify1(this);
		    return this.red.sqrt(this);
		  };

		  BN.prototype.redInvm = function redInvm () {
		    assert(this.red, 'redInvm works only with red numbers');
		    this.red._verify1(this);
		    return this.red.invm(this);
		  };

		  // Return negative clone of `this` % `red modulo`
		  BN.prototype.redNeg = function redNeg () {
		    assert(this.red, 'redNeg works only with red numbers');
		    this.red._verify1(this);
		    return this.red.neg(this);
		  };

		  BN.prototype.redPow = function redPow (num) {
		    assert(this.red && !num.red, 'redPow(normalNum)');
		    this.red._verify1(this);
		    return this.red.pow(this, num);
		  };

		  // Prime numbers with efficient reduction
		  var primes = {
		    k256: null,
		    p224: null,
		    p192: null,
		    p25519: null
		  };

		  // Pseudo-Mersenne prime
		  function MPrime (name, p) {
		    // P = 2 ^ N - K
		    this.name = name;
		    this.p = new BN(p, 16);
		    this.n = this.p.bitLength();
		    this.k = new BN(1).iushln(this.n).isub(this.p);

		    this.tmp = this._tmp();
		  }

		  MPrime.prototype._tmp = function _tmp () {
		    var tmp = new BN(null);
		    tmp.words = new Array(Math.ceil(this.n / 13));
		    return tmp;
		  };

		  MPrime.prototype.ireduce = function ireduce (num) {
		    var this$1 = this;

		    // Assumes that `num` is less than `P^2`
		    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
		    var r = num;
		    var rlen;

		    do {
		      this$1.split(r, this$1.tmp);
		      r = this$1.imulK(r);
		      r = r.iadd(this$1.tmp);
		      rlen = r.bitLength();
		    } while (rlen > this.n);

		    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
		    if (cmp === 0) {
		      r.words[0] = 0;
		      r.length = 1;
		    } else if (cmp > 0) {
		      r.isub(this.p);
		    } else {
		      r.strip();
		    }

		    return r;
		  };

		  MPrime.prototype.split = function split (input, out) {
		    input.iushrn(this.n, 0, out);
		  };

		  MPrime.prototype.imulK = function imulK (num) {
		    return num.imul(this.k);
		  };

		  function K256 () {
		    MPrime.call(
		      this,
		      'k256',
		      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
		  }
		  inherits(K256, MPrime);

		  K256.prototype.split = function split (input, output) {
		    // 256 = 9 * 26 + 22
		    var mask = 0x3fffff;

		    var outLen = Math.min(input.length, 9);
		    for (var i = 0; i < outLen; i++) {
		      output.words[i] = input.words[i];
		    }
		    output.length = outLen;

		    if (input.length <= 9) {
		      input.words[0] = 0;
		      input.length = 1;
		      return;
		    }

		    // Shift by 9 limbs
		    var prev = input.words[9];
		    output.words[output.length++] = prev & mask;

		    for (i = 10; i < input.length; i++) {
		      var next = input.words[i] | 0;
		      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
		      prev = next;
		    }
		    prev >>>= 22;
		    input.words[i - 10] = prev;
		    if (prev === 0 && input.length > 10) {
		      input.length -= 10;
		    } else {
		      input.length -= 9;
		    }
		  };

		  K256.prototype.imulK = function imulK (num) {
		    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
		    num.words[num.length] = 0;
		    num.words[num.length + 1] = 0;
		    num.length += 2;

		    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
		    var lo = 0;
		    for (var i = 0; i < num.length; i++) {
		      var w = num.words[i] | 0;
		      lo += w * 0x3d1;
		      num.words[i] = lo & 0x3ffffff;
		      lo = w * 0x40 + ((lo / 0x4000000) | 0);
		    }

		    // Fast length reduction
		    if (num.words[num.length - 1] === 0) {
		      num.length--;
		      if (num.words[num.length - 1] === 0) {
		        num.length--;
		      }
		    }
		    return num;
		  };

		  function P224 () {
		    MPrime.call(
		      this,
		      'p224',
		      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
		  }
		  inherits(P224, MPrime);

		  function P192 () {
		    MPrime.call(
		      this,
		      'p192',
		      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
		  }
		  inherits(P192, MPrime);

		  function P25519 () {
		    // 2 ^ 255 - 19
		    MPrime.call(
		      this,
		      '25519',
		      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
		  }
		  inherits(P25519, MPrime);

		  P25519.prototype.imulK = function imulK (num) {
		    // K = 0x13
		    var carry = 0;
		    for (var i = 0; i < num.length; i++) {
		      var hi = (num.words[i] | 0) * 0x13 + carry;
		      var lo = hi & 0x3ffffff;
		      hi >>>= 26;

		      num.words[i] = lo;
		      carry = hi;
		    }
		    if (carry !== 0) {
		      num.words[num.length++] = carry;
		    }
		    return num;
		  };

		  // Exported mostly for testing purposes, use plain name instead
		  BN._prime = function prime (name) {
		    // Cached version of prime
		    if (primes[name]) { return primes[name]; }

		    var prime;
		    if (name === 'k256') {
		      prime = new K256();
		    } else if (name === 'p224') {
		      prime = new P224();
		    } else if (name === 'p192') {
		      prime = new P192();
		    } else if (name === 'p25519') {
		      prime = new P25519();
		    } else {
		      throw new Error('Unknown prime ' + name);
		    }
		    primes[name] = prime;

		    return prime;
		  };

		  //
		  // Base reduction engine
		  //
		  function Red (m) {
		    if (typeof m === 'string') {
		      var prime = BN._prime(m);
		      this.m = prime.p;
		      this.prime = prime;
		    } else {
		      assert(m.gtn(1), 'modulus must be greater than 1');
		      this.m = m;
		      this.prime = null;
		    }
		  }

		  Red.prototype._verify1 = function _verify1 (a) {
		    assert(a.negative === 0, 'red works only with positives');
		    assert(a.red, 'red works only with red numbers');
		  };

		  Red.prototype._verify2 = function _verify2 (a, b) {
		    assert((a.negative | b.negative) === 0, 'red works only with positives');
		    assert(a.red && a.red === b.red,
		      'red works only with red numbers');
		  };

		  Red.prototype.imod = function imod (a) {
		    if (this.prime) { return this.prime.ireduce(a)._forceRed(this); }
		    return a.umod(this.m)._forceRed(this);
		  };

		  Red.prototype.neg = function neg (a) {
		    if (a.isZero()) {
		      return a.clone();
		    }

		    return this.m.sub(a)._forceRed(this);
		  };

		  Red.prototype.add = function add (a, b) {
		    this._verify2(a, b);

		    var res = a.add(b);
		    if (res.cmp(this.m) >= 0) {
		      res.isub(this.m);
		    }
		    return res._forceRed(this);
		  };

		  Red.prototype.iadd = function iadd (a, b) {
		    this._verify2(a, b);

		    var res = a.iadd(b);
		    if (res.cmp(this.m) >= 0) {
		      res.isub(this.m);
		    }
		    return res;
		  };

		  Red.prototype.sub = function sub (a, b) {
		    this._verify2(a, b);

		    var res = a.sub(b);
		    if (res.cmpn(0) < 0) {
		      res.iadd(this.m);
		    }
		    return res._forceRed(this);
		  };

		  Red.prototype.isub = function isub (a, b) {
		    this._verify2(a, b);

		    var res = a.isub(b);
		    if (res.cmpn(0) < 0) {
		      res.iadd(this.m);
		    }
		    return res;
		  };

		  Red.prototype.shl = function shl (a, num) {
		    this._verify1(a);
		    return this.imod(a.ushln(num));
		  };

		  Red.prototype.imul = function imul (a, b) {
		    this._verify2(a, b);
		    return this.imod(a.imul(b));
		  };

		  Red.prototype.mul = function mul (a, b) {
		    this._verify2(a, b);
		    return this.imod(a.mul(b));
		  };

		  Red.prototype.isqr = function isqr (a) {
		    return this.imul(a, a.clone());
		  };

		  Red.prototype.sqr = function sqr (a) {
		    return this.mul(a, a);
		  };

		  Red.prototype.sqrt = function sqrt (a) {
		    var this$1 = this;

		    if (a.isZero()) { return a.clone(); }

		    var mod3 = this.m.andln(3);
		    assert(mod3 % 2 === 1);

		    // Fast case
		    if (mod3 === 3) {
		      var pow = this.m.add(new BN(1)).iushrn(2);
		      return this.pow(a, pow);
		    }

		    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
		    //
		    // Find Q and S, that Q * 2 ^ S = (P - 1)
		    var q = this.m.subn(1);
		    var s = 0;
		    while (!q.isZero() && q.andln(1) === 0) {
		      s++;
		      q.iushrn(1);
		    }
		    assert(!q.isZero());

		    var one = new BN(1).toRed(this);
		    var nOne = one.redNeg();

		    // Find quadratic non-residue
		    // NOTE: Max is such because of generalized Riemann hypothesis.
		    var lpow = this.m.subn(1).iushrn(1);
		    var z = this.m.bitLength();
		    z = new BN(2 * z * z).toRed(this);

		    while (this.pow(z, lpow).cmp(nOne) !== 0) {
		      z.redIAdd(nOne);
		    }

		    var c = this.pow(z, q);
		    var r = this.pow(a, q.addn(1).iushrn(1));
		    var t = this.pow(a, q);
		    var m = s;
		    while (t.cmp(one) !== 0) {
		      var tmp = t;
		      for (var i = 0; tmp.cmp(one) !== 0; i++) {
		        tmp = tmp.redSqr();
		      }
		      assert(i < m);
		      var b = this$1.pow(c, new BN(1).iushln(m - i - 1));

		      r = r.redMul(b);
		      c = b.redSqr();
		      t = t.redMul(c);
		      m = i;
		    }

		    return r;
		  };

		  Red.prototype.invm = function invm (a) {
		    var inv = a._invmp(this.m);
		    if (inv.negative !== 0) {
		      inv.negative = 0;
		      return this.imod(inv).redNeg();
		    } else {
		      return this.imod(inv);
		    }
		  };

		  Red.prototype.pow = function pow (a, num) {
		    var this$1 = this;

		    if (num.isZero()) { return new BN(1); }
		    if (num.cmpn(1) === 0) { return a.clone(); }

		    var windowSize = 4;
		    var wnd = new Array(1 << windowSize);
		    wnd[0] = new BN(1).toRed(this);
		    wnd[1] = a;
		    for (var i = 2; i < wnd.length; i++) {
		      wnd[i] = this$1.mul(wnd[i - 1], a);
		    }

		    var res = wnd[0];
		    var current = 0;
		    var currentLen = 0;
		    var start = num.bitLength() % 26;
		    if (start === 0) {
		      start = 26;
		    }

		    for (i = num.length - 1; i >= 0; i--) {
		      var word = num.words[i];
		      for (var j = start - 1; j >= 0; j--) {
		        var bit = (word >> j) & 1;
		        if (res !== wnd[0]) {
		          res = this$1.sqr(res);
		        }

		        if (bit === 0 && current === 0) {
		          currentLen = 0;
		          continue;
		        }

		        current <<= 1;
		        current |= bit;
		        currentLen++;
		        if (currentLen !== windowSize && (i !== 0 || j !== 0)) { continue; }

		        res = this$1.mul(res, wnd[current]);
		        currentLen = 0;
		        current = 0;
		      }
		      start = 26;
		    }

		    return res;
		  };

		  Red.prototype.convertTo = function convertTo (num) {
		    var r = num.umod(this.m);

		    return r === num ? r.clone() : r;
		  };

		  Red.prototype.convertFrom = function convertFrom (num) {
		    var res = num.clone();
		    res.red = null;
		    return res;
		  };

		  //
		  // Montgomery method engine
		  //

		  BN.mont = function mont (num) {
		    return new Mont(num);
		  };

		  function Mont (m) {
		    Red.call(this, m);

		    this.shift = this.m.bitLength();
		    if (this.shift % 26 !== 0) {
		      this.shift += 26 - (this.shift % 26);
		    }

		    this.r = new BN(1).iushln(this.shift);
		    this.r2 = this.imod(this.r.sqr());
		    this.rinv = this.r._invmp(this.m);

		    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
		    this.minv = this.minv.umod(this.r);
		    this.minv = this.r.sub(this.minv);
		  }
		  inherits(Mont, Red);

		  Mont.prototype.convertTo = function convertTo (num) {
		    return this.imod(num.ushln(this.shift));
		  };

		  Mont.prototype.convertFrom = function convertFrom (num) {
		    var r = this.imod(num.mul(this.rinv));
		    r.red = null;
		    return r;
		  };

		  Mont.prototype.imul = function imul (a, b) {
		    if (a.isZero() || b.isZero()) {
		      a.words[0] = 0;
		      a.length = 1;
		      return a;
		    }

		    var t = a.imul(b);
		    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
		    var u = t.isub(c).iushrn(this.shift);
		    var res = u;

		    if (u.cmp(this.m) >= 0) {
		      res = u.isub(this.m);
		    } else if (u.cmpn(0) < 0) {
		      res = u.iadd(this.m);
		    }

		    return res._forceRed(this);
		  };

		  Mont.prototype.mul = function mul (a, b) {
		    if (a.isZero() || b.isZero()) { return new BN(0)._forceRed(this); }

		    var t = a.mul(b);
		    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
		    var u = t.isub(c).iushrn(this.shift);
		    var res = u;
		    if (u.cmp(this.m) >= 0) {
		      res = u.isub(this.m);
		    } else if (u.cmpn(0) < 0) {
		      res = u.iadd(this.m);
		    }

		    return res._forceRed(this);
		  };

		  Mont.prototype.invm = function invm (a) {
		    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
		    var res = this.imod(a._invmp(this.m).mul(this.r2));
		    return res._forceRed(this);
		  };
		})(typeof module === 'undefined' || module, this);

		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)));

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		module.exports = function(module) {
			if(!module.webpackPolyfill) {
				module.deprecate = function() {};
				module.paths = [];
				// module.parent = undefined by default
				module.children = [];
				module.webpackPolyfill = 1;
			}
			return module;
		};


	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		module.exports = buffer__default;

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		module.exports = assert;

		function assert(val, msg) {
		  if (!val)
		    { throw new Error(msg || 'Assertion failed'); }
		}

		assert.equal = function assertEqual(l, r, msg) {
		  if (l != r)
		    { throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r)); }
		};


	/***/ },
	/* 8 */
	/***/ function(module, exports) {

		'use strict';

		var utils = exports;

		function toArray(msg, enc) {
		  if (Array.isArray(msg))
		    { return msg.slice(); }
		  if (!msg)
		    { return []; }
		  var res = [];
		  if (typeof msg !== 'string') {
		    for (var i = 0; i < msg.length; i++)
		      { res[i] = msg[i] | 0; }
		    return res;
		  }
		  if (enc === 'hex') {
		    msg = msg.replace(/[^a-z0-9]+/ig, '');
		    if (msg.length % 2 !== 0)
		      { msg = '0' + msg; }
		    for (var i = 0; i < msg.length; i += 2)
		      { res.push(parseInt(msg[i] + msg[i + 1], 16)); }
		  } else {
		    for (var i = 0; i < msg.length; i++) {
		      var c = msg.charCodeAt(i);
		      var hi = c >> 8;
		      var lo = c & 0xff;
		      if (hi)
		        { res.push(hi, lo); }
		      else
		        { res.push(lo); }
		    }
		  }
		  return res;
		}
		utils.toArray = toArray;

		function zero2(word) {
		  if (word.length === 1)
		    { return '0' + word; }
		  else
		    { return word; }
		}
		utils.zero2 = zero2;

		function toHex(msg) {
		  var res = '';
		  for (var i = 0; i < msg.length; i++)
		    { res += zero2(msg[i].toString(16)); }
		  return res;
		}
		utils.toHex = toHex;

		utils.encode = function encode(arr, enc) {
		  if (enc === 'hex')
		    { return toHex(arr); }
		  else
		    { return arr; }
		};


	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		var r;

		module.exports = function rand(len) {
		  if (!r)
		    { r = new Rand(null); }

		  return r.generate(len);
		};

		function Rand(rand) {
		  this.rand = rand;
		}
		module.exports.Rand = Rand;

		Rand.prototype.generate = function generate(len) {
		  return this._rand(len);
		};

		// Emulate crypto API using randy
		Rand.prototype._rand = function _rand(n) {
		  var this$1 = this;

		  if (this.rand.getBytes)
		    { return this.rand.getBytes(n); }

		  var res = new Uint8Array(n);
		  for (var i = 0; i < res.length; i++)
		    { res[i] = this$1.rand.getByte(); }
		  return res;
		};

		if (typeof self === 'object') {
		  if (self.crypto && self.crypto.getRandomValues) {
		    // Modern browsers
		    Rand.prototype._rand = function _rand(n) {
		      var arr = new Uint8Array(n);
		      self.crypto.getRandomValues(arr);
		      return arr;
		    };
		  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
		    // IE
		    Rand.prototype._rand = function _rand(n) {
		      var arr = new Uint8Array(n);
		      self.msCrypto.getRandomValues(arr);
		      return arr;
		    };

		  // Safari's WebWorkers do not have `crypto`
		  } else if (typeof window === 'object') {
		    // Old junk
		    Rand.prototype._rand = function() {
		      throw new Error('Not implemented yet');
		    };
		  }
		} else {
		  // Node.js or Web worker with no crypto support
		  try {
		    var crypto$$1 = __webpack_require__(10);
		    if (typeof crypto$$1.randomBytes !== 'function')
		      { throw new Error('Not supported'); }

		    Rand.prototype._rand = function _rand(n) {
		      return crypto$$1.randomBytes(n);
		    };
		  } catch (e) {
		  }
		}


	/***/ },
	/* 10 */
	/***/ function(module, exports) {

		/* (ignored) */

	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var curve = exports;

		curve.base = __webpack_require__(12);
		curve.short = __webpack_require__(13);
		curve.mont = __webpack_require__(15);
		curve.edwards = __webpack_require__(16);


	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var BN = __webpack_require__(4);
		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var getNAF = utils.getNAF;
		var getJSF = utils.getJSF;
		var assert = utils.assert;

		function BaseCurve(type, conf) {
		  this.type = type;
		  this.p = new BN(conf.p, 16);

		  // Use Montgomery, when there is no fast reduction for the prime
		  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

		  // Useful for many curves
		  this.zero = new BN(0).toRed(this.red);
		  this.one = new BN(1).toRed(this.red);
		  this.two = new BN(2).toRed(this.red);

		  // Curve configuration, optional
		  this.n = conf.n && new BN(conf.n, 16);
		  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

		  // Temporary arrays
		  this._wnafT1 = new Array(4);
		  this._wnafT2 = new Array(4);
		  this._wnafT3 = new Array(4);
		  this._wnafT4 = new Array(4);

		  // Generalized Greg Maxwell's trick
		  var adjustCount = this.n && this.p.div(this.n);
		  if (!adjustCount || adjustCount.cmpn(100) > 0) {
		    this.redN = null;
		  } else {
		    this._maxwellTrick = true;
		    this.redN = this.n.toRed(this.red);
		  }
		}
		module.exports = BaseCurve;

		BaseCurve.prototype.point = function point() {
		  throw new Error('Not implemented');
		};

		BaseCurve.prototype.validate = function validate() {
		  throw new Error('Not implemented');
		};

		BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
		  assert(p.precomputed);
		  var doubles = p._getDoubles();

		  var naf = getNAF(k, 1);
		  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
		  I /= 3;

		  // Translate into more windowed form
		  var repr = [];
		  for (var j = 0; j < naf.length; j += doubles.step) {
		    var nafW = 0;
		    for (var k = j + doubles.step - 1; k >= j; k--)
		      { nafW = (nafW << 1) + naf[k]; }
		    repr.push(nafW);
		  }

		  var a = this.jpoint(null, null, null);
		  var b = this.jpoint(null, null, null);
		  for (var i = I; i > 0; i--) {
		    for (var j = 0; j < repr.length; j++) {
		      var nafW = repr[j];
		      if (nafW === i)
		        { b = b.mixedAdd(doubles.points[j]); }
		      else if (nafW === -i)
		        { b = b.mixedAdd(doubles.points[j].neg()); }
		    }
		    a = a.add(b);
		  }
		  return a.toP();
		};

		BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
		  var w = 4;

		  // Precompute window
		  var nafPoints = p._getNAFPoints(w);
		  w = nafPoints.wnd;
		  var wnd = nafPoints.points;

		  // Get NAF form
		  var naf = getNAF(k, w);

		  // Add `this`*(N+1) for every w-NAF index
		  var acc = this.jpoint(null, null, null);
		  for (var i = naf.length - 1; i >= 0; i--) {
		    // Count zeroes
		    for (var k = 0; i >= 0 && naf[i] === 0; i--)
		      { k++; }
		    if (i >= 0)
		      { k++; }
		    acc = acc.dblp(k);

		    if (i < 0)
		      { break; }
		    var z = naf[i];
		    assert(z !== 0);
		    if (p.type === 'affine') {
		      // J +- P
		      if (z > 0)
		        { acc = acc.mixedAdd(wnd[(z - 1) >> 1]); }
		      else
		        { acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg()); }
		    } else {
		      // J +- J
		      if (z > 0)
		        { acc = acc.add(wnd[(z - 1) >> 1]); }
		      else
		        { acc = acc.add(wnd[(-z - 1) >> 1].neg()); }
		    }
		  }
		  return p.type === 'affine' ? acc.toP() : acc;
		};

		BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
		                                                       points,
		                                                       coeffs,
		                                                       len,
		                                                       jacobianResult) {
		  var wndWidth = this._wnafT1;
		  var wnd = this._wnafT2;
		  var naf = this._wnafT3;

		  // Fill all arrays
		  var max = 0;
		  for (var i = 0; i < len; i++) {
		    var p = points[i];
		    var nafPoints = p._getNAFPoints(defW);
		    wndWidth[i] = nafPoints.wnd;
		    wnd[i] = nafPoints.points;
		  }

		  // Comb small window NAFs
		  for (var i = len - 1; i >= 1; i -= 2) {
		    var a = i - 1;
		    var b = i;
		    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
		      naf[a] = getNAF(coeffs[a], wndWidth[a]);
		      naf[b] = getNAF(coeffs[b], wndWidth[b]);
		      max = Math.max(naf[a].length, max);
		      max = Math.max(naf[b].length, max);
		      continue;
		    }

		    var comb = [
		      points[a], /* 1 */
		      null, /* 3 */
		      null, /* 5 */
		      points[b] /* 7 */
		    ];

		    // Try to avoid Projective points, if possible
		    if (points[a].y.cmp(points[b].y) === 0) {
		      comb[1] = points[a].add(points[b]);
		      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
		    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
		      comb[1] = points[a].toJ().mixedAdd(points[b]);
		      comb[2] = points[a].add(points[b].neg());
		    } else {
		      comb[1] = points[a].toJ().mixedAdd(points[b]);
		      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
		    }

		    var index = [
		      -3, /* -1 -1 */
		      -1, /* -1 0 */
		      -5, /* -1 1 */
		      -7, /* 0 -1 */
		      0, /* 0 0 */
		      7, /* 0 1 */
		      5, /* 1 -1 */
		      1, /* 1 0 */
		      3  /* 1 1 */
		    ];

		    var jsf = getJSF(coeffs[a], coeffs[b]);
		    max = Math.max(jsf[0].length, max);
		    naf[a] = new Array(max);
		    naf[b] = new Array(max);
		    for (var j = 0; j < max; j++) {
		      var ja = jsf[0][j] | 0;
		      var jb = jsf[1][j] | 0;

		      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
		      naf[b][j] = 0;
		      wnd[a] = comb;
		    }
		  }

		  var acc = this.jpoint(null, null, null);
		  var tmp = this._wnafT4;
		  for (var i = max; i >= 0; i--) {
		    var k = 0;

		    while (i >= 0) {
		      var zero = true;
		      for (var j = 0; j < len; j++) {
		        tmp[j] = naf[j][i] | 0;
		        if (tmp[j] !== 0)
		          { zero = false; }
		      }
		      if (!zero)
		        { break; }
		      k++;
		      i--;
		    }
		    if (i >= 0)
		      { k++; }
		    acc = acc.dblp(k);
		    if (i < 0)
		      { break; }

		    for (var j = 0; j < len; j++) {
		      var z = tmp[j];
		      var p;
		      if (z === 0)
		        { continue; }
		      else if (z > 0)
		        { p = wnd[j][(z - 1) >> 1]; }
		      else if (z < 0)
		        { p = wnd[j][(-z - 1) >> 1].neg(); }

		      if (p.type === 'affine')
		        { acc = acc.mixedAdd(p); }
		      else
		        { acc = acc.add(p); }
		    }
		  }
		  // Zeroify references
		  for (var i = 0; i < len; i++)
		    { wnd[i] = null; }

		  if (jacobianResult)
		    { return acc; }
		  else
		    { return acc.toP(); }
		};

		function BasePoint(curve, type) {
		  this.curve = curve;
		  this.type = type;
		  this.precomputed = null;
		}
		BaseCurve.BasePoint = BasePoint;

		BasePoint.prototype.eq = function eq(/*other*/) {
		  throw new Error('Not implemented');
		};

		BasePoint.prototype.validate = function validate() {
		  return this.curve.validate(this);
		};

		BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
		  bytes = utils.toArray(bytes, enc);

		  var len = this.p.byteLength();

		  // uncompressed, hybrid-odd, hybrid-even
		  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
		      bytes.length - 1 === 2 * len) {
		    if (bytes[0] === 0x06)
		      { assert(bytes[bytes.length - 1] % 2 === 0); }
		    else if (bytes[0] === 0x07)
		      { assert(bytes[bytes.length - 1] % 2 === 1); }

		    var res =  this.point(bytes.slice(1, 1 + len),
		                          bytes.slice(1 + len, 1 + 2 * len));

		    return res;
		  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
		              bytes.length - 1 === len) {
		    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
		  }
		  throw new Error('Unknown point format');
		};

		BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
		  return this.encode(enc, true);
		};

		BasePoint.prototype._encode = function _encode(compact) {
		  var len = this.curve.p.byteLength();
		  var x = this.getX().toArray('be', len);

		  if (compact)
		    { return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x); }

		  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
		};

		BasePoint.prototype.encode = function encode(enc, compact) {
		  return utils.encode(this._encode(compact), enc);
		};

		BasePoint.prototype.precompute = function precompute(power) {
		  if (this.precomputed)
		    { return this; }

		  var precomputed = {
		    doubles: null,
		    naf: null,
		    beta: null
		  };
		  precomputed.naf = this._getNAFPoints(8);
		  precomputed.doubles = this._getDoubles(4, power);
		  precomputed.beta = this._getBeta();
		  this.precomputed = precomputed;

		  return this;
		};

		BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
		  if (!this.precomputed)
		    { return false; }

		  var doubles = this.precomputed.doubles;
		  if (!doubles)
		    { return false; }

		  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
		};

		BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
		  if (this.precomputed && this.precomputed.doubles)
		    { return this.precomputed.doubles; }

		  var doubles = [ this ];
		  var acc = this;
		  for (var i = 0; i < power; i += step) {
		    for (var j = 0; j < step; j++)
		      { acc = acc.dbl(); }
		    doubles.push(acc);
		  }
		  return {
		    step: step,
		    points: doubles
		  };
		};

		BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
		  if (this.precomputed && this.precomputed.naf)
		    { return this.precomputed.naf; }

		  var res = [ this ];
		  var max = (1 << wnd) - 1;
		  var dbl = max === 1 ? null : this.dbl();
		  for (var i = 1; i < max; i++)
		    { res[i] = res[i - 1].add(dbl); }
		  return {
		    wnd: wnd,
		    points: res
		  };
		};

		BasePoint.prototype._getBeta = function _getBeta() {
		  return null;
		};

		BasePoint.prototype.dblp = function dblp(k) {
		  var r = this;
		  for (var i = 0; i < k; i++)
		    { r = r.dbl(); }
		  return r;
		};


	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var curve = __webpack_require__(11);
		var elliptic = __webpack_require__(1);
		var BN = __webpack_require__(4);
		var inherits = __webpack_require__(14);
		var Base = curve.base;

		var assert = elliptic.utils.assert;

		function ShortCurve(conf) {
		  Base.call(this, 'short', conf);

		  this.a = new BN(conf.a, 16).toRed(this.red);
		  this.b = new BN(conf.b, 16).toRed(this.red);
		  this.tinv = this.two.redInvm();

		  this.zeroA = this.a.fromRed().cmpn(0) === 0;
		  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

		  // If the curve is endomorphic, precalculate beta and lambda
		  this.endo = this._getEndomorphism(conf);
		  this._endoWnafT1 = new Array(4);
		  this._endoWnafT2 = new Array(4);
		}
		inherits(ShortCurve, Base);
		module.exports = ShortCurve;

		ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
		  // No efficient endomorphism
		  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
		    { return; }

		  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
		  var beta;
		  var lambda;
		  if (conf.beta) {
		    beta = new BN(conf.beta, 16).toRed(this.red);
		  } else {
		    var betas = this._getEndoRoots(this.p);
		    // Choose the smallest beta
		    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
		    beta = beta.toRed(this.red);
		  }
		  if (conf.lambda) {
		    lambda = new BN(conf.lambda, 16);
		  } else {
		    // Choose the lambda that is matching selected beta
		    var lambdas = this._getEndoRoots(this.n);
		    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
		      lambda = lambdas[0];
		    } else {
		      lambda = lambdas[1];
		      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
		    }
		  }

		  // Get basis vectors, used for balanced length-two representation
		  var basis;
		  if (conf.basis) {
		    basis = conf.basis.map(function(vec) {
		      return {
		        a: new BN(vec.a, 16),
		        b: new BN(vec.b, 16)
		      };
		    });
		  } else {
		    basis = this._getEndoBasis(lambda);
		  }

		  return {
		    beta: beta,
		    lambda: lambda,
		    basis: basis
		  };
		};

		ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
		  // Find roots of for x^2 + x + 1 in F
		  // Root = (-1 +- Sqrt(-3)) / 2
		  //
		  var red = num === this.p ? this.red : BN.mont(num);
		  var tinv = new BN(2).toRed(red).redInvm();
		  var ntinv = tinv.redNeg();

		  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

		  var l1 = ntinv.redAdd(s).fromRed();
		  var l2 = ntinv.redSub(s).fromRed();
		  return [ l1, l2 ];
		};

		ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
		  // aprxSqrt >= sqrt(this.n)
		  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

		  // 3.74
		  // Run EGCD, until r(L + 1) < aprxSqrt
		  var u = lambda;
		  var v = this.n.clone();
		  var x1 = new BN(1);
		  var y1 = new BN(0);
		  var x2 = new BN(0);
		  var y2 = new BN(1);

		  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
		  var a0;
		  var b0;
		  // First vector
		  var a1;
		  var b1;
		  // Second vector
		  var a2;
		  var b2;

		  var prevR;
		  var i = 0;
		  var r;
		  var x;
		  while (u.cmpn(0) !== 0) {
		    var q = v.div(u);
		    r = v.sub(q.mul(u));
		    x = x2.sub(q.mul(x1));
		    var y = y2.sub(q.mul(y1));

		    if (!a1 && r.cmp(aprxSqrt) < 0) {
		      a0 = prevR.neg();
		      b0 = x1;
		      a1 = r.neg();
		      b1 = x;
		    } else if (a1 && ++i === 2) {
		      break;
		    }
		    prevR = r;

		    v = u;
		    u = r;
		    x2 = x1;
		    x1 = x;
		    y2 = y1;
		    y1 = y;
		  }
		  a2 = r.neg();
		  b2 = x;

		  var len1 = a1.sqr().add(b1.sqr());
		  var len2 = a2.sqr().add(b2.sqr());
		  if (len2.cmp(len1) >= 0) {
		    a2 = a0;
		    b2 = b0;
		  }

		  // Normalize signs
		  if (a1.negative) {
		    a1 = a1.neg();
		    b1 = b1.neg();
		  }
		  if (a2.negative) {
		    a2 = a2.neg();
		    b2 = b2.neg();
		  }

		  return [
		    { a: a1, b: b1 },
		    { a: a2, b: b2 }
		  ];
		};

		ShortCurve.prototype._endoSplit = function _endoSplit(k) {
		  var basis = this.endo.basis;
		  var v1 = basis[0];
		  var v2 = basis[1];

		  var c1 = v2.b.mul(k).divRound(this.n);
		  var c2 = v1.b.neg().mul(k).divRound(this.n);

		  var p1 = c1.mul(v1.a);
		  var p2 = c2.mul(v2.a);
		  var q1 = c1.mul(v1.b);
		  var q2 = c2.mul(v2.b);

		  // Calculate answer
		  var k1 = k.sub(p1).sub(p2);
		  var k2 = q1.add(q2).neg();
		  return { k1: k1, k2: k2 };
		};

		ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
		  x = new BN(x, 16);
		  if (!x.red)
		    { x = x.toRed(this.red); }

		  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
		  var y = y2.redSqrt();
		  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
		    { throw new Error('invalid point'); }

		  // XXX Is there any way to tell if the number is odd without converting it
		  // to non-red form?
		  var isOdd = y.fromRed().isOdd();
		  if (odd && !isOdd || !odd && isOdd)
		    { y = y.redNeg(); }

		  return this.point(x, y);
		};

		ShortCurve.prototype.validate = function validate(point) {
		  if (point.inf)
		    { return true; }

		  var x = point.x;
		  var y = point.y;

		  var ax = this.a.redMul(x);
		  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
		  return y.redSqr().redISub(rhs).cmpn(0) === 0;
		};

		ShortCurve.prototype._endoWnafMulAdd =
		    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
		  var this$1 = this;

		  var npoints = this._endoWnafT1;
		  var ncoeffs = this._endoWnafT2;
		  for (var i = 0; i < points.length; i++) {
		    var split = this$1._endoSplit(coeffs[i]);
		    var p = points[i];
		    var beta = p._getBeta();

		    if (split.k1.negative) {
		      split.k1.ineg();
		      p = p.neg(true);
		    }
		    if (split.k2.negative) {
		      split.k2.ineg();
		      beta = beta.neg(true);
		    }

		    npoints[i * 2] = p;
		    npoints[i * 2 + 1] = beta;
		    ncoeffs[i * 2] = split.k1;
		    ncoeffs[i * 2 + 1] = split.k2;
		  }
		  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

		  // Clean-up references to points and coefficients
		  for (var j = 0; j < i * 2; j++) {
		    npoints[j] = null;
		    ncoeffs[j] = null;
		  }
		  return res;
		};

		function Point(curve, x, y, isRed) {
		  Base.BasePoint.call(this, curve, 'affine');
		  if (x === null && y === null) {
		    this.x = null;
		    this.y = null;
		    this.inf = true;
		  } else {
		    this.x = new BN(x, 16);
		    this.y = new BN(y, 16);
		    // Force redgomery representation when loading from JSON
		    if (isRed) {
		      this.x.forceRed(this.curve.red);
		      this.y.forceRed(this.curve.red);
		    }
		    if (!this.x.red)
		      { this.x = this.x.toRed(this.curve.red); }
		    if (!this.y.red)
		      { this.y = this.y.toRed(this.curve.red); }
		    this.inf = false;
		  }
		}
		inherits(Point, Base.BasePoint);

		ShortCurve.prototype.point = function point(x, y, isRed) {
		  return new Point(this, x, y, isRed);
		};

		ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
		  return Point.fromJSON(this, obj, red);
		};

		Point.prototype._getBeta = function _getBeta() {
		  if (!this.curve.endo)
		    { return; }

		  var pre = this.precomputed;
		  if (pre && pre.beta)
		    { return pre.beta; }

		  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
		  if (pre) {
		    var curve = this.curve;
		    var endoMul = function(p) {
		      return curve.point(p.x.redMul(curve.endo.beta), p.y);
		    };
		    pre.beta = beta;
		    beta.precomputed = {
		      beta: null,
		      naf: pre.naf && {
		        wnd: pre.naf.wnd,
		        points: pre.naf.points.map(endoMul)
		      },
		      doubles: pre.doubles && {
		        step: pre.doubles.step,
		        points: pre.doubles.points.map(endoMul)
		      }
		    };
		  }
		  return beta;
		};

		Point.prototype.toJSON = function toJSON() {
		  if (!this.precomputed)
		    { return [ this.x, this.y ]; }

		  return [ this.x, this.y, this.precomputed && {
		    doubles: this.precomputed.doubles && {
		      step: this.precomputed.doubles.step,
		      points: this.precomputed.doubles.points.slice(1)
		    },
		    naf: this.precomputed.naf && {
		      wnd: this.precomputed.naf.wnd,
		      points: this.precomputed.naf.points.slice(1)
		    }
		  } ];
		};

		Point.fromJSON = function fromJSON(curve, obj, red) {
		  if (typeof obj === 'string')
		    { obj = JSON.parse(obj); }
		  var res = curve.point(obj[0], obj[1], red);
		  if (!obj[2])
		    { return res; }

		  function obj2point(obj) {
		    return curve.point(obj[0], obj[1], red);
		  }

		  var pre = obj[2];
		  res.precomputed = {
		    beta: null,
		    doubles: pre.doubles && {
		      step: pre.doubles.step,
		      points: [ res ].concat(pre.doubles.points.map(obj2point))
		    },
		    naf: pre.naf && {
		      wnd: pre.naf.wnd,
		      points: [ res ].concat(pre.naf.points.map(obj2point))
		    }
		  };
		  return res;
		};

		Point.prototype.inspect = function inspect() {
		  if (this.isInfinity())
		    { return '<EC Point Infinity>'; }
		  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
		      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
		};

		Point.prototype.isInfinity = function isInfinity() {
		  return this.inf;
		};

		Point.prototype.add = function add(p) {
		  // O + P = P
		  if (this.inf)
		    { return p; }

		  // P + O = P
		  if (p.inf)
		    { return this; }

		  // P + P = 2P
		  if (this.eq(p))
		    { return this.dbl(); }

		  // P + (-P) = O
		  if (this.neg().eq(p))
		    { return this.curve.point(null, null); }

		  // P + Q = O
		  if (this.x.cmp(p.x) === 0)
		    { return this.curve.point(null, null); }

		  var c = this.y.redSub(p.y);
		  if (c.cmpn(0) !== 0)
		    { c = c.redMul(this.x.redSub(p.x).redInvm()); }
		  var nx = c.redSqr().redISub(this.x).redISub(p.x);
		  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
		  return this.curve.point(nx, ny);
		};

		Point.prototype.dbl = function dbl() {
		  if (this.inf)
		    { return this; }

		  // 2P = O
		  var ys1 = this.y.redAdd(this.y);
		  if (ys1.cmpn(0) === 0)
		    { return this.curve.point(null, null); }

		  var a = this.curve.a;

		  var x2 = this.x.redSqr();
		  var dyinv = ys1.redInvm();
		  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

		  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
		  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
		  return this.curve.point(nx, ny);
		};

		Point.prototype.getX = function getX() {
		  return this.x.fromRed();
		};

		Point.prototype.getY = function getY() {
		  return this.y.fromRed();
		};

		Point.prototype.mul = function mul(k) {
		  k = new BN(k, 16);

		  if (this._hasDoubles(k))
		    { return this.curve._fixedNafMul(this, k); }
		  else if (this.curve.endo)
		    { return this.curve._endoWnafMulAdd([ this ], [ k ]); }
		  else
		    { return this.curve._wnafMul(this, k); }
		};

		Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
		  var points = [ this, p2 ];
		  var coeffs = [ k1, k2 ];
		  if (this.curve.endo)
		    { return this.curve._endoWnafMulAdd(points, coeffs); }
		  else
		    { return this.curve._wnafMulAdd(1, points, coeffs, 2); }
		};

		Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
		  var points = [ this, p2 ];
		  var coeffs = [ k1, k2 ];
		  if (this.curve.endo)
		    { return this.curve._endoWnafMulAdd(points, coeffs, true); }
		  else
		    { return this.curve._wnafMulAdd(1, points, coeffs, 2, true); }
		};

		Point.prototype.eq = function eq(p) {
		  return this === p ||
		         this.inf === p.inf &&
		             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
		};

		Point.prototype.neg = function neg(_precompute) {
		  if (this.inf)
		    { return this; }

		  var res = this.curve.point(this.x, this.y.redNeg());
		  if (_precompute && this.precomputed) {
		    var pre = this.precomputed;
		    var negate = function(p) {
		      return p.neg();
		    };
		    res.precomputed = {
		      naf: pre.naf && {
		        wnd: pre.naf.wnd,
		        points: pre.naf.points.map(negate)
		      },
		      doubles: pre.doubles && {
		        step: pre.doubles.step,
		        points: pre.doubles.points.map(negate)
		      }
		    };
		  }
		  return res;
		};

		Point.prototype.toJ = function toJ() {
		  if (this.inf)
		    { return this.curve.jpoint(null, null, null); }

		  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
		  return res;
		};

		function JPoint(curve, x, y, z) {
		  Base.BasePoint.call(this, curve, 'jacobian');
		  if (x === null && y === null && z === null) {
		    this.x = this.curve.one;
		    this.y = this.curve.one;
		    this.z = new BN(0);
		  } else {
		    this.x = new BN(x, 16);
		    this.y = new BN(y, 16);
		    this.z = new BN(z, 16);
		  }
		  if (!this.x.red)
		    { this.x = this.x.toRed(this.curve.red); }
		  if (!this.y.red)
		    { this.y = this.y.toRed(this.curve.red); }
		  if (!this.z.red)
		    { this.z = this.z.toRed(this.curve.red); }

		  this.zOne = this.z === this.curve.one;
		}
		inherits(JPoint, Base.BasePoint);

		ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
		  return new JPoint(this, x, y, z);
		};

		JPoint.prototype.toP = function toP() {
		  if (this.isInfinity())
		    { return this.curve.point(null, null); }

		  var zinv = this.z.redInvm();
		  var zinv2 = zinv.redSqr();
		  var ax = this.x.redMul(zinv2);
		  var ay = this.y.redMul(zinv2).redMul(zinv);

		  return this.curve.point(ax, ay);
		};

		JPoint.prototype.neg = function neg() {
		  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
		};

		JPoint.prototype.add = function add(p) {
		  // O + P = P
		  if (this.isInfinity())
		    { return p; }

		  // P + O = P
		  if (p.isInfinity())
		    { return this; }

		  // 12M + 4S + 7A
		  var pz2 = p.z.redSqr();
		  var z2 = this.z.redSqr();
		  var u1 = this.x.redMul(pz2);
		  var u2 = p.x.redMul(z2);
		  var s1 = this.y.redMul(pz2.redMul(p.z));
		  var s2 = p.y.redMul(z2.redMul(this.z));

		  var h = u1.redSub(u2);
		  var r = s1.redSub(s2);
		  if (h.cmpn(0) === 0) {
		    if (r.cmpn(0) !== 0)
		      { return this.curve.jpoint(null, null, null); }
		    else
		      { return this.dbl(); }
		  }

		  var h2 = h.redSqr();
		  var h3 = h2.redMul(h);
		  var v = u1.redMul(h2);

		  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
		  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
		  var nz = this.z.redMul(p.z).redMul(h);

		  return this.curve.jpoint(nx, ny, nz);
		};

		JPoint.prototype.mixedAdd = function mixedAdd(p) {
		  // O + P = P
		  if (this.isInfinity())
		    { return p.toJ(); }

		  // P + O = P
		  if (p.isInfinity())
		    { return this; }

		  // 8M + 3S + 7A
		  var z2 = this.z.redSqr();
		  var u1 = this.x;
		  var u2 = p.x.redMul(z2);
		  var s1 = this.y;
		  var s2 = p.y.redMul(z2).redMul(this.z);

		  var h = u1.redSub(u2);
		  var r = s1.redSub(s2);
		  if (h.cmpn(0) === 0) {
		    if (r.cmpn(0) !== 0)
		      { return this.curve.jpoint(null, null, null); }
		    else
		      { return this.dbl(); }
		  }

		  var h2 = h.redSqr();
		  var h3 = h2.redMul(h);
		  var v = u1.redMul(h2);

		  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
		  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
		  var nz = this.z.redMul(h);

		  return this.curve.jpoint(nx, ny, nz);
		};

		JPoint.prototype.dblp = function dblp(pow) {
		  if (pow === 0)
		    { return this; }
		  if (this.isInfinity())
		    { return this; }
		  if (!pow)
		    { return this.dbl(); }

		  if (this.curve.zeroA || this.curve.threeA) {
		    var r = this;
		    for (var i = 0; i < pow; i++)
		      { r = r.dbl(); }
		    return r;
		  }

		  // 1M + 2S + 1A + N * (4S + 5M + 8A)
		  // N = 1 => 6M + 6S + 9A
		  var a = this.curve.a;
		  var tinv = this.curve.tinv;

		  var jx = this.x;
		  var jy = this.y;
		  var jz = this.z;
		  var jz4 = jz.redSqr().redSqr();

		  // Reuse results
		  var jyd = jy.redAdd(jy);
		  for (var i = 0; i < pow; i++) {
		    var jx2 = jx.redSqr();
		    var jyd2 = jyd.redSqr();
		    var jyd4 = jyd2.redSqr();
		    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

		    var t1 = jx.redMul(jyd2);
		    var nx = c.redSqr().redISub(t1.redAdd(t1));
		    var t2 = t1.redISub(nx);
		    var dny = c.redMul(t2);
		    dny = dny.redIAdd(dny).redISub(jyd4);
		    var nz = jyd.redMul(jz);
		    if (i + 1 < pow)
		      { jz4 = jz4.redMul(jyd4); }

		    jx = nx;
		    jz = nz;
		    jyd = dny;
		  }

		  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
		};

		JPoint.prototype.dbl = function dbl() {
		  if (this.isInfinity())
		    { return this; }

		  if (this.curve.zeroA)
		    { return this._zeroDbl(); }
		  else if (this.curve.threeA)
		    { return this._threeDbl(); }
		  else
		    { return this._dbl(); }
		};

		JPoint.prototype._zeroDbl = function _zeroDbl() {
		  var nx;
		  var ny;
		  var nz;
		  // Z = 1
		  if (this.zOne) {
		    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
		    //     #doubling-mdbl-2007-bl
		    // 1M + 5S + 14A

		    // XX = X1^2
		    var xx = this.x.redSqr();
		    // YY = Y1^2
		    var yy = this.y.redSqr();
		    // YYYY = YY^2
		    var yyyy = yy.redSqr();
		    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
		    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
		    s = s.redIAdd(s);
		    // M = 3 * XX + a; a = 0
		    var m = xx.redAdd(xx).redIAdd(xx);
		    // T = M ^ 2 - 2*S
		    var t = m.redSqr().redISub(s).redISub(s);

		    // 8 * YYYY
		    var yyyy8 = yyyy.redIAdd(yyyy);
		    yyyy8 = yyyy8.redIAdd(yyyy8);
		    yyyy8 = yyyy8.redIAdd(yyyy8);

		    // X3 = T
		    nx = t;
		    // Y3 = M * (S - T) - 8 * YYYY
		    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
		    // Z3 = 2*Y1
		    nz = this.y.redAdd(this.y);
		  } else {
		    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
		    //     #doubling-dbl-2009-l
		    // 2M + 5S + 13A

		    // A = X1^2
		    var a = this.x.redSqr();
		    // B = Y1^2
		    var b = this.y.redSqr();
		    // C = B^2
		    var c = b.redSqr();
		    // D = 2 * ((X1 + B)^2 - A - C)
		    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
		    d = d.redIAdd(d);
		    // E = 3 * A
		    var e = a.redAdd(a).redIAdd(a);
		    // F = E^2
		    var f = e.redSqr();

		    // 8 * C
		    var c8 = c.redIAdd(c);
		    c8 = c8.redIAdd(c8);
		    c8 = c8.redIAdd(c8);

		    // X3 = F - 2 * D
		    nx = f.redISub(d).redISub(d);
		    // Y3 = E * (D - X3) - 8 * C
		    ny = e.redMul(d.redISub(nx)).redISub(c8);
		    // Z3 = 2 * Y1 * Z1
		    nz = this.y.redMul(this.z);
		    nz = nz.redIAdd(nz);
		  }

		  return this.curve.jpoint(nx, ny, nz);
		};

		JPoint.prototype._threeDbl = function _threeDbl() {
		  var nx;
		  var ny;
		  var nz;
		  // Z = 1
		  if (this.zOne) {
		    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
		    //     #doubling-mdbl-2007-bl
		    // 1M + 5S + 15A

		    // XX = X1^2
		    var xx = this.x.redSqr();
		    // YY = Y1^2
		    var yy = this.y.redSqr();
		    // YYYY = YY^2
		    var yyyy = yy.redSqr();
		    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
		    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
		    s = s.redIAdd(s);
		    // M = 3 * XX + a
		    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
		    // T = M^2 - 2 * S
		    var t = m.redSqr().redISub(s).redISub(s);
		    // X3 = T
		    nx = t;
		    // Y3 = M * (S - T) - 8 * YYYY
		    var yyyy8 = yyyy.redIAdd(yyyy);
		    yyyy8 = yyyy8.redIAdd(yyyy8);
		    yyyy8 = yyyy8.redIAdd(yyyy8);
		    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
		    // Z3 = 2 * Y1
		    nz = this.y.redAdd(this.y);
		  } else {
		    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
		    // 3M + 5S

		    // delta = Z1^2
		    var delta = this.z.redSqr();
		    // gamma = Y1^2
		    var gamma = this.y.redSqr();
		    // beta = X1 * gamma
		    var beta = this.x.redMul(gamma);
		    // alpha = 3 * (X1 - delta) * (X1 + delta)
		    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
		    alpha = alpha.redAdd(alpha).redIAdd(alpha);
		    // X3 = alpha^2 - 8 * beta
		    var beta4 = beta.redIAdd(beta);
		    beta4 = beta4.redIAdd(beta4);
		    var beta8 = beta4.redAdd(beta4);
		    nx = alpha.redSqr().redISub(beta8);
		    // Z3 = (Y1 + Z1)^2 - gamma - delta
		    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
		    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
		    var ggamma8 = gamma.redSqr();
		    ggamma8 = ggamma8.redIAdd(ggamma8);
		    ggamma8 = ggamma8.redIAdd(ggamma8);
		    ggamma8 = ggamma8.redIAdd(ggamma8);
		    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
		  }

		  return this.curve.jpoint(nx, ny, nz);
		};

		JPoint.prototype._dbl = function _dbl() {
		  var a = this.curve.a;

		  // 4M + 6S + 10A
		  var jx = this.x;
		  var jy = this.y;
		  var jz = this.z;
		  var jz4 = jz.redSqr().redSqr();

		  var jx2 = jx.redSqr();
		  var jy2 = jy.redSqr();

		  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

		  var jxd4 = jx.redAdd(jx);
		  jxd4 = jxd4.redIAdd(jxd4);
		  var t1 = jxd4.redMul(jy2);
		  var nx = c.redSqr().redISub(t1.redAdd(t1));
		  var t2 = t1.redISub(nx);

		  var jyd8 = jy2.redSqr();
		  jyd8 = jyd8.redIAdd(jyd8);
		  jyd8 = jyd8.redIAdd(jyd8);
		  jyd8 = jyd8.redIAdd(jyd8);
		  var ny = c.redMul(t2).redISub(jyd8);
		  var nz = jy.redAdd(jy).redMul(jz);

		  return this.curve.jpoint(nx, ny, nz);
		};

		JPoint.prototype.trpl = function trpl() {
		  if (!this.curve.zeroA)
		    { return this.dbl().add(this); }

		  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
		  // 5M + 10S + ...

		  // XX = X1^2
		  var xx = this.x.redSqr();
		  // YY = Y1^2
		  var yy = this.y.redSqr();
		  // ZZ = Z1^2
		  var zz = this.z.redSqr();
		  // YYYY = YY^2
		  var yyyy = yy.redSqr();
		  // M = 3 * XX + a * ZZ2; a = 0
		  var m = xx.redAdd(xx).redIAdd(xx);
		  // MM = M^2
		  var mm = m.redSqr();
		  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
		  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
		  e = e.redIAdd(e);
		  e = e.redAdd(e).redIAdd(e);
		  e = e.redISub(mm);
		  // EE = E^2
		  var ee = e.redSqr();
		  // T = 16*YYYY
		  var t = yyyy.redIAdd(yyyy);
		  t = t.redIAdd(t);
		  t = t.redIAdd(t);
		  t = t.redIAdd(t);
		  // U = (M + E)^2 - MM - EE - T
		  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
		  // X3 = 4 * (X1 * EE - 4 * YY * U)
		  var yyu4 = yy.redMul(u);
		  yyu4 = yyu4.redIAdd(yyu4);
		  yyu4 = yyu4.redIAdd(yyu4);
		  var nx = this.x.redMul(ee).redISub(yyu4);
		  nx = nx.redIAdd(nx);
		  nx = nx.redIAdd(nx);
		  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
		  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
		  ny = ny.redIAdd(ny);
		  ny = ny.redIAdd(ny);
		  ny = ny.redIAdd(ny);
		  // Z3 = (Z1 + E)^2 - ZZ - EE
		  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

		  return this.curve.jpoint(nx, ny, nz);
		};

		JPoint.prototype.mul = function mul(k, kbase) {
		  k = new BN(k, kbase);

		  return this.curve._wnafMul(this, k);
		};

		JPoint.prototype.eq = function eq(p) {
		  if (p.type === 'affine')
		    { return this.eq(p.toJ()); }

		  if (this === p)
		    { return true; }

		  // x1 * z2^2 == x2 * z1^2
		  var z2 = this.z.redSqr();
		  var pz2 = p.z.redSqr();
		  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
		    { return false; }

		  // y1 * z2^3 == y2 * z1^3
		  var z3 = z2.redMul(this.z);
		  var pz3 = pz2.redMul(p.z);
		  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
		};

		JPoint.prototype.eqXToP = function eqXToP(x) {
		  var this$1 = this;

		  var zs = this.z.redSqr();
		  var rx = x.toRed(this.curve.red).redMul(zs);
		  if (this.x.cmp(rx) === 0)
		    { return true; }

		  var xc = x.clone();
		  var t = this.curve.redN.redMul(zs);
		  for (;;) {
		    xc.iadd(this$1.curve.n);
		    if (xc.cmp(this$1.curve.p) >= 0)
		      { return false; }

		    rx.redIAdd(t);
		    if (this$1.x.cmp(rx) === 0)
		      { return true; }
		  }
		  return false;
		};

		JPoint.prototype.inspect = function inspect() {
		  if (this.isInfinity())
		    { return '<EC JPoint Infinity>'; }
		  return '<EC JPoint x: ' + this.x.toString(16, 2) +
		      ' y: ' + this.y.toString(16, 2) +
		      ' z: ' + this.z.toString(16, 2) + '>';
		};

		JPoint.prototype.isInfinity = function isInfinity() {
		  // XXX This code assumes that zero is always zero in red
		  return this.z.cmpn(0) === 0;
		};


	/***/ },
	/* 14 */
	/***/ function(module, exports) {

		if (typeof Object.create === 'function') {
		  // implementation from standard node.js 'util' module
		  module.exports = function inherits(ctor, superCtor) {
		    ctor.super_ = superCtor;
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
		    ctor.super_ = superCtor;
		    var TempCtor = function () {};
		    TempCtor.prototype = superCtor.prototype;
		    ctor.prototype = new TempCtor();
		    ctor.prototype.constructor = ctor;
		  };
		}


	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var curve = __webpack_require__(11);
		var BN = __webpack_require__(4);
		var inherits = __webpack_require__(14);
		var Base = curve.base;

		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;

		function MontCurve(conf) {
		  Base.call(this, 'mont', conf);

		  this.a = new BN(conf.a, 16).toRed(this.red);
		  this.b = new BN(conf.b, 16).toRed(this.red);
		  this.i4 = new BN(4).toRed(this.red).redInvm();
		  this.two = new BN(2).toRed(this.red);
		  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
		}
		inherits(MontCurve, Base);
		module.exports = MontCurve;

		MontCurve.prototype.validate = function validate(point) {
		  var x = point.normalize().x;
		  var x2 = x.redSqr();
		  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
		  var y = rhs.redSqrt();

		  return y.redSqr().cmp(rhs) === 0;
		};

		function Point(curve, x, z) {
		  Base.BasePoint.call(this, curve, 'projective');
		  if (x === null && z === null) {
		    this.x = this.curve.one;
		    this.z = this.curve.zero;
		  } else {
		    this.x = new BN(x, 16);
		    this.z = new BN(z, 16);
		    if (!this.x.red)
		      { this.x = this.x.toRed(this.curve.red); }
		    if (!this.z.red)
		      { this.z = this.z.toRed(this.curve.red); }
		  }
		}
		inherits(Point, Base.BasePoint);

		MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
		  return this.point(utils.toArray(bytes, enc), 1);
		};

		MontCurve.prototype.point = function point(x, z) {
		  return new Point(this, x, z);
		};

		MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
		  return Point.fromJSON(this, obj);
		};

		Point.prototype.precompute = function precompute() {
		  // No-op
		};

		Point.prototype._encode = function _encode() {
		  return this.getX().toArray('be', this.curve.p.byteLength());
		};

		Point.fromJSON = function fromJSON(curve, obj) {
		  return new Point(curve, obj[0], obj[1] || curve.one);
		};

		Point.prototype.inspect = function inspect() {
		  if (this.isInfinity())
		    { return '<EC Point Infinity>'; }
		  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
		      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
		};

		Point.prototype.isInfinity = function isInfinity() {
		  // XXX This code assumes that zero is always zero in red
		  return this.z.cmpn(0) === 0;
		};

		Point.prototype.dbl = function dbl() {
		  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
		  // 2M + 2S + 4A

		  // A = X1 + Z1
		  var a = this.x.redAdd(this.z);
		  // AA = A^2
		  var aa = a.redSqr();
		  // B = X1 - Z1
		  var b = this.x.redSub(this.z);
		  // BB = B^2
		  var bb = b.redSqr();
		  // C = AA - BB
		  var c = aa.redSub(bb);
		  // X3 = AA * BB
		  var nx = aa.redMul(bb);
		  // Z3 = C * (BB + A24 * C)
		  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
		  return this.curve.point(nx, nz);
		};

		Point.prototype.add = function add() {
		  throw new Error('Not supported on Montgomery curve');
		};

		Point.prototype.diffAdd = function diffAdd(p, diff) {
		  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
		  // 4M + 2S + 6A

		  // A = X2 + Z2
		  var a = this.x.redAdd(this.z);
		  // B = X2 - Z2
		  var b = this.x.redSub(this.z);
		  // C = X3 + Z3
		  var c = p.x.redAdd(p.z);
		  // D = X3 - Z3
		  var d = p.x.redSub(p.z);
		  // DA = D * A
		  var da = d.redMul(a);
		  // CB = C * B
		  var cb = c.redMul(b);
		  // X5 = Z1 * (DA + CB)^2
		  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
		  // Z5 = X1 * (DA - CB)^2
		  var nz = diff.x.redMul(da.redISub(cb).redSqr());
		  return this.curve.point(nx, nz);
		};

		Point.prototype.mul = function mul(k) {
		  var t = k.clone();
		  var a = this; // (N / 2) * Q + Q
		  var b = this.curve.point(null, null); // (N / 2) * Q
		  var c = this; // Q

		  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
		    { bits.push(t.andln(1)); }

		  for (var i = bits.length - 1; i >= 0; i--) {
		    if (bits[i] === 0) {
		      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
		      a = a.diffAdd(b, c);
		      // N * Q = 2 * ((N / 2) * Q + Q))
		      b = b.dbl();
		    } else {
		      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
		      b = a.diffAdd(b, c);
		      // N * Q + Q = 2 * ((N / 2) * Q + Q)
		      a = a.dbl();
		    }
		  }
		  return b;
		};

		Point.prototype.mulAdd = function mulAdd() {
		  throw new Error('Not supported on Montgomery curve');
		};

		Point.prototype.jumlAdd = function jumlAdd() {
		  throw new Error('Not supported on Montgomery curve');
		};

		Point.prototype.eq = function eq(other) {
		  return this.getX().cmp(other.getX()) === 0;
		};

		Point.prototype.normalize = function normalize() {
		  this.x = this.x.redMul(this.z.redInvm());
		  this.z = this.curve.one;
		  return this;
		};

		Point.prototype.getX = function getX() {
		  // Normalize coordinates
		  this.normalize();

		  return this.x.fromRed();
		};


	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var curve = __webpack_require__(11);
		var elliptic = __webpack_require__(1);
		var BN = __webpack_require__(4);
		var inherits = __webpack_require__(14);
		var Base = curve.base;

		var assert = elliptic.utils.assert;

		function EdwardsCurve(conf) {
		  // NOTE: Important as we are creating point in Base.call()
		  this.twisted = (conf.a | 0) !== 1;
		  this.mOneA = this.twisted && (conf.a | 0) === -1;
		  this.extended = this.mOneA;

		  Base.call(this, 'edwards', conf);

		  this.a = new BN(conf.a, 16).umod(this.red.m);
		  this.a = this.a.toRed(this.red);
		  this.c = new BN(conf.c, 16).toRed(this.red);
		  this.c2 = this.c.redSqr();
		  this.d = new BN(conf.d, 16).toRed(this.red);
		  this.dd = this.d.redAdd(this.d);

		  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
		  this.oneC = (conf.c | 0) === 1;
		}
		inherits(EdwardsCurve, Base);
		module.exports = EdwardsCurve;

		EdwardsCurve.prototype._mulA = function _mulA(num) {
		  if (this.mOneA)
		    { return num.redNeg(); }
		  else
		    { return this.a.redMul(num); }
		};

		EdwardsCurve.prototype._mulC = function _mulC(num) {
		  if (this.oneC)
		    { return num; }
		  else
		    { return this.c.redMul(num); }
		};

		// Just for compatibility with Short curve
		EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
		  return this.point(x, y, z, t);
		};

		EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
		  x = new BN(x, 16);
		  if (!x.red)
		    { x = x.toRed(this.red); }

		  var x2 = x.redSqr();
		  var rhs = this.c2.redSub(this.a.redMul(x2));
		  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

		  var y2 = rhs.redMul(lhs.redInvm());
		  var y = y2.redSqrt();
		  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
		    { throw new Error('invalid point'); }

		  var isOdd = y.fromRed().isOdd();
		  if (odd && !isOdd || !odd && isOdd)
		    { y = y.redNeg(); }

		  return this.point(x, y);
		};

		EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
		  y = new BN(y, 16);
		  if (!y.red)
		    { y = y.toRed(this.red); }

		  // x^2 = (y^2 - 1) / (d y^2 + 1)
		  var y2 = y.redSqr();
		  var lhs = y2.redSub(this.one);
		  var rhs = y2.redMul(this.d).redAdd(this.one);
		  var x2 = lhs.redMul(rhs.redInvm());

		  if (x2.cmp(this.zero) === 0) {
		    if (odd)
		      { throw new Error('invalid point'); }
		    else
		      { return this.point(this.zero, y); }
		  }

		  var x = x2.redSqrt();
		  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
		    { throw new Error('invalid point'); }

		  if (x.isOdd() !== odd)
		    { x = x.redNeg(); }

		  return this.point(x, y);
		};

		EdwardsCurve.prototype.validate = function validate(point) {
		  if (point.isInfinity())
		    { return true; }

		  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
		  point.normalize();

		  var x2 = point.x.redSqr();
		  var y2 = point.y.redSqr();
		  var lhs = x2.redMul(this.a).redAdd(y2);
		  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

		  return lhs.cmp(rhs) === 0;
		};

		function Point(curve, x, y, z, t) {
		  Base.BasePoint.call(this, curve, 'projective');
		  if (x === null && y === null && z === null) {
		    this.x = this.curve.zero;
		    this.y = this.curve.one;
		    this.z = this.curve.one;
		    this.t = this.curve.zero;
		    this.zOne = true;
		  } else {
		    this.x = new BN(x, 16);
		    this.y = new BN(y, 16);
		    this.z = z ? new BN(z, 16) : this.curve.one;
		    this.t = t && new BN(t, 16);
		    if (!this.x.red)
		      { this.x = this.x.toRed(this.curve.red); }
		    if (!this.y.red)
		      { this.y = this.y.toRed(this.curve.red); }
		    if (!this.z.red)
		      { this.z = this.z.toRed(this.curve.red); }
		    if (this.t && !this.t.red)
		      { this.t = this.t.toRed(this.curve.red); }
		    this.zOne = this.z === this.curve.one;

		    // Use extended coordinates
		    if (this.curve.extended && !this.t) {
		      this.t = this.x.redMul(this.y);
		      if (!this.zOne)
		        { this.t = this.t.redMul(this.z.redInvm()); }
		    }
		  }
		}
		inherits(Point, Base.BasePoint);

		EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
		  return Point.fromJSON(this, obj);
		};

		EdwardsCurve.prototype.point = function point(x, y, z, t) {
		  return new Point(this, x, y, z, t);
		};

		Point.fromJSON = function fromJSON(curve, obj) {
		  return new Point(curve, obj[0], obj[1], obj[2]);
		};

		Point.prototype.inspect = function inspect() {
		  if (this.isInfinity())
		    { return '<EC Point Infinity>'; }
		  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
		      ' y: ' + this.y.fromRed().toString(16, 2) +
		      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
		};

		Point.prototype.isInfinity = function isInfinity() {
		  // XXX This code assumes that zero is always zero in red
		  return this.x.cmpn(0) === 0 &&
		         this.y.cmp(this.z) === 0;
		};

		Point.prototype._extDbl = function _extDbl() {
		  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
		  //     #doubling-dbl-2008-hwcd
		  // 4M + 4S

		  // A = X1^2
		  var a = this.x.redSqr();
		  // B = Y1^2
		  var b = this.y.redSqr();
		  // C = 2 * Z1^2
		  var c = this.z.redSqr();
		  c = c.redIAdd(c);
		  // D = a * A
		  var d = this.curve._mulA(a);
		  // E = (X1 + Y1)^2 - A - B
		  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
		  // G = D + B
		  var g = d.redAdd(b);
		  // F = G - C
		  var f = g.redSub(c);
		  // H = D - B
		  var h = d.redSub(b);
		  // X3 = E * F
		  var nx = e.redMul(f);
		  // Y3 = G * H
		  var ny = g.redMul(h);
		  // T3 = E * H
		  var nt = e.redMul(h);
		  // Z3 = F * G
		  var nz = f.redMul(g);
		  return this.curve.point(nx, ny, nz, nt);
		};

		Point.prototype._projDbl = function _projDbl() {
		  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
		  //     #doubling-dbl-2008-bbjlp
		  //     #doubling-dbl-2007-bl
		  // and others
		  // Generally 3M + 4S or 2M + 4S

		  // B = (X1 + Y1)^2
		  var b = this.x.redAdd(this.y).redSqr();
		  // C = X1^2
		  var c = this.x.redSqr();
		  // D = Y1^2
		  var d = this.y.redSqr();

		  var nx;
		  var ny;
		  var nz;
		  if (this.curve.twisted) {
		    // E = a * C
		    var e = this.curve._mulA(c);
		    // F = E + D
		    var f = e.redAdd(d);
		    if (this.zOne) {
		      // X3 = (B - C - D) * (F - 2)
		      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
		      // Y3 = F * (E - D)
		      ny = f.redMul(e.redSub(d));
		      // Z3 = F^2 - 2 * F
		      nz = f.redSqr().redSub(f).redSub(f);
		    } else {
		      // H = Z1^2
		      var h = this.z.redSqr();
		      // J = F - 2 * H
		      var j = f.redSub(h).redISub(h);
		      // X3 = (B-C-D)*J
		      nx = b.redSub(c).redISub(d).redMul(j);
		      // Y3 = F * (E - D)
		      ny = f.redMul(e.redSub(d));
		      // Z3 = F * J
		      nz = f.redMul(j);
		    }
		  } else {
		    // E = C + D
		    var e = c.redAdd(d);
		    // H = (c * Z1)^2
		    var h = this.curve._mulC(this.c.redMul(this.z)).redSqr();
		    // J = E - 2 * H
		    var j = e.redSub(h).redSub(h);
		    // X3 = c * (B - E) * J
		    nx = this.curve._mulC(b.redISub(e)).redMul(j);
		    // Y3 = c * E * (C - D)
		    ny = this.curve._mulC(e).redMul(c.redISub(d));
		    // Z3 = E * J
		    nz = e.redMul(j);
		  }
		  return this.curve.point(nx, ny, nz);
		};

		Point.prototype.dbl = function dbl() {
		  if (this.isInfinity())
		    { return this; }

		  // Double in extended coordinates
		  if (this.curve.extended)
		    { return this._extDbl(); }
		  else
		    { return this._projDbl(); }
		};

		Point.prototype._extAdd = function _extAdd(p) {
		  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
		  //     #addition-add-2008-hwcd-3
		  // 8M

		  // A = (Y1 - X1) * (Y2 - X2)
		  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
		  // B = (Y1 + X1) * (Y2 + X2)
		  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
		  // C = T1 * k * T2
		  var c = this.t.redMul(this.curve.dd).redMul(p.t);
		  // D = Z1 * 2 * Z2
		  var d = this.z.redMul(p.z.redAdd(p.z));
		  // E = B - A
		  var e = b.redSub(a);
		  // F = D - C
		  var f = d.redSub(c);
		  // G = D + C
		  var g = d.redAdd(c);
		  // H = B + A
		  var h = b.redAdd(a);
		  // X3 = E * F
		  var nx = e.redMul(f);
		  // Y3 = G * H
		  var ny = g.redMul(h);
		  // T3 = E * H
		  var nt = e.redMul(h);
		  // Z3 = F * G
		  var nz = f.redMul(g);
		  return this.curve.point(nx, ny, nz, nt);
		};

		Point.prototype._projAdd = function _projAdd(p) {
		  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
		  //     #addition-add-2008-bbjlp
		  //     #addition-add-2007-bl
		  // 10M + 1S

		  // A = Z1 * Z2
		  var a = this.z.redMul(p.z);
		  // B = A^2
		  var b = a.redSqr();
		  // C = X1 * X2
		  var c = this.x.redMul(p.x);
		  // D = Y1 * Y2
		  var d = this.y.redMul(p.y);
		  // E = d * C * D
		  var e = this.curve.d.redMul(c).redMul(d);
		  // F = B - E
		  var f = b.redSub(e);
		  // G = B + E
		  var g = b.redAdd(e);
		  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
		  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
		  var nx = a.redMul(f).redMul(tmp);
		  var ny;
		  var nz;
		  if (this.curve.twisted) {
		    // Y3 = A * G * (D - a * C)
		    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
		    // Z3 = F * G
		    nz = f.redMul(g);
		  } else {
		    // Y3 = A * G * (D - C)
		    ny = a.redMul(g).redMul(d.redSub(c));
		    // Z3 = c * F * G
		    nz = this.curve._mulC(f).redMul(g);
		  }
		  return this.curve.point(nx, ny, nz);
		};

		Point.prototype.add = function add(p) {
		  if (this.isInfinity())
		    { return p; }
		  if (p.isInfinity())
		    { return this; }

		  if (this.curve.extended)
		    { return this._extAdd(p); }
		  else
		    { return this._projAdd(p); }
		};

		Point.prototype.mul = function mul(k) {
		  if (this._hasDoubles(k))
		    { return this.curve._fixedNafMul(this, k); }
		  else
		    { return this.curve._wnafMul(this, k); }
		};

		Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
		  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
		};

		Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
		  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
		};

		Point.prototype.normalize = function normalize() {
		  if (this.zOne)
		    { return this; }

		  // Normalize coordinates
		  var zi = this.z.redInvm();
		  this.x = this.x.redMul(zi);
		  this.y = this.y.redMul(zi);
		  if (this.t)
		    { this.t = this.t.redMul(zi); }
		  this.z = this.curve.one;
		  this.zOne = true;
		  return this;
		};

		Point.prototype.neg = function neg() {
		  return this.curve.point(this.x.redNeg(),
		                          this.y,
		                          this.z,
		                          this.t && this.t.redNeg());
		};

		Point.prototype.getX = function getX() {
		  this.normalize();
		  return this.x.fromRed();
		};

		Point.prototype.getY = function getY() {
		  this.normalize();
		  return this.y.fromRed();
		};

		Point.prototype.eq = function eq(other) {
		  return this === other ||
		         this.getX().cmp(other.getX()) === 0 &&
		         this.getY().cmp(other.getY()) === 0;
		};

		Point.prototype.eqXToP = function eqXToP(x) {
		  var this$1 = this;

		  var rx = x.toRed(this.curve.red).redMul(this.z);
		  if (this.x.cmp(rx) === 0)
		    { return true; }

		  var xc = x.clone();
		  var t = this.curve.redN.redMul(this.z);
		  for (;;) {
		    xc.iadd(this$1.curve.n);
		    if (xc.cmp(this$1.curve.p) >= 0)
		      { return false; }

		    rx.redIAdd(t);
		    if (this$1.x.cmp(rx) === 0)
		      { return true; }
		  }
		  return false;
		};

		// Compatibility with BaseCurve
		Point.prototype.toP = Point.prototype.normalize;
		Point.prototype.mixedAdd = Point.prototype.add;


	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var curves = exports;

		var hash = __webpack_require__(18);
		var elliptic = __webpack_require__(1);

		var assert = elliptic.utils.assert;

		function PresetCurve(options) {
		  if (options.type === 'short')
		    { this.curve = new elliptic.curve.short(options); }
		  else if (options.type === 'edwards')
		    { this.curve = new elliptic.curve.edwards(options); }
		  else
		    { this.curve = new elliptic.curve.mont(options); }
		  this.g = this.curve.g;
		  this.n = this.curve.n;
		  this.hash = options.hash;

		  assert(this.g.validate(), 'Invalid curve');
		  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
		}
		curves.PresetCurve = PresetCurve;

		function defineCurve(name, options) {
		  Object.defineProperty(curves, name, {
		    configurable: true,
		    enumerable: true,
		    get: function() {
		      var curve = new PresetCurve(options);
		      Object.defineProperty(curves, name, {
		        configurable: true,
		        enumerable: true,
		        value: curve
		      });
		      return curve;
		    }
		  });
		}

		defineCurve('p192', {
		  type: 'short',
		  prime: 'p192',
		  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
		  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
		  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
		  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
		  hash: hash.sha256,
		  gRed: false,
		  g: [
		    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
		    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
		  ]
		});

		defineCurve('p224', {
		  type: 'short',
		  prime: 'p224',
		  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
		  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
		  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
		  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
		  hash: hash.sha256,
		  gRed: false,
		  g: [
		    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
		    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
		  ]
		});

		defineCurve('p256', {
		  type: 'short',
		  prime: null,
		  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
		  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
		  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
		  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
		  hash: hash.sha256,
		  gRed: false,
		  g: [
		    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
		    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
		  ]
		});

		defineCurve('p384', {
		  type: 'short',
		  prime: null,
		  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'fffffffe ffffffff 00000000 00000000 ffffffff',
		  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'fffffffe ffffffff 00000000 00000000 fffffffc',
		  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
		     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
		  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
		     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
		  hash: hash.sha384,
		  gRed: false,
		  g: [
		    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
		    '5502f25d bf55296c 3a545e38 72760ab7',
		    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
		    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
		  ]
		});

		defineCurve('p521', {
		  type: 'short',
		  prime: null,
		  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'ffffffff ffffffff ffffffff ffffffff ffffffff',
		  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'ffffffff ffffffff ffffffff ffffffff fffffffc',
		  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
		     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
		     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
		  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
		     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
		     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
		  hash: hash.sha512,
		  gRed: false,
		  g: [
		    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
		    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
		    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
		    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
		    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
		    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
		  ]
		});

		defineCurve('curve25519', {
		  type: 'mont',
		  prime: 'p25519',
		  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
		  a: '76d06',
		  b: '1',
		  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
		  hash: hash.sha256,
		  gRed: false,
		  g: [
		    '9'
		  ]
		});

		defineCurve('ed25519', {
		  type: 'edwards',
		  prime: 'p25519',
		  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
		  a: '-1',
		  c: '1',
		  // -121665 * (121666^(-1)) (mod P)
		  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
		  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
		  hash: hash.sha256,
		  gRed: false,
		  g: [
		    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

		    // 4/5
		    '6666666666666666666666666666666666666666666666666666666666666658'
		  ]
		});

		var pre;
		try {
		  pre = __webpack_require__(24);
		} catch (e) {
		  pre = undefined;
		}

		defineCurve('secp256k1', {
		  type: 'short',
		  prime: 'k256',
		  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
		  a: '0',
		  b: '7',
		  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
		  h: '1',
		  hash: hash.sha256,

		  // Precomputed endomorphism
		  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
		  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
		  basis: [
		    {
		      a: '3086d221a7d46bcde86c90e49284eb15',
		      b: '-e4437ed6010e88286f547fa90abfe4c3'
		    },
		    {
		      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
		      b: '3086d221a7d46bcde86c90e49284eb15'
		    }
		  ],

		  gRed: false,
		  g: [
		    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
		    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
		    pre
		  ]
		});


	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {

		var hash = exports;

		hash.utils = __webpack_require__(19);
		hash.common = __webpack_require__(20);
		hash.sha = __webpack_require__(21);
		hash.ripemd = __webpack_require__(22);
		hash.hmac = __webpack_require__(23);

		// Proxy hash functions to the main object
		hash.sha1 = hash.sha.sha1;
		hash.sha256 = hash.sha.sha256;
		hash.sha224 = hash.sha.sha224;
		hash.sha384 = hash.sha.sha384;
		hash.sha512 = hash.sha.sha512;
		hash.ripemd160 = hash.ripemd.ripemd160;


	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {

		var utils = exports;
		var inherits = __webpack_require__(14);

		function toArray(msg, enc) {
		  if (Array.isArray(msg))
		    { return msg.slice(); }
		  if (!msg)
		    { return []; }
		  var res = [];
		  if (typeof msg === 'string') {
		    if (!enc) {
		      for (var i = 0; i < msg.length; i++) {
		        var c = msg.charCodeAt(i);
		        var hi = c >> 8;
		        var lo = c & 0xff;
		        if (hi)
		          { res.push(hi, lo); }
		        else
		          { res.push(lo); }
		      }
		    } else if (enc === 'hex') {
		      msg = msg.replace(/[^a-z0-9]+/ig, '');
		      if (msg.length % 2 !== 0)
		        { msg = '0' + msg; }
		      for (var i = 0; i < msg.length; i += 2)
		        { res.push(parseInt(msg[i] + msg[i + 1], 16)); }
		    }
		  } else {
		    for (var i = 0; i < msg.length; i++)
		      { res[i] = msg[i] | 0; }
		  }
		  return res;
		}
		utils.toArray = toArray;

		function toHex(msg) {
		  var res = '';
		  for (var i = 0; i < msg.length; i++)
		    { res += zero2(msg[i].toString(16)); }
		  return res;
		}
		utils.toHex = toHex;

		function htonl(w) {
		  var res = (w >>> 24) |
		            ((w >>> 8) & 0xff00) |
		            ((w << 8) & 0xff0000) |
		            ((w & 0xff) << 24);
		  return res >>> 0;
		}
		utils.htonl = htonl;

		function toHex32(msg, endian) {
		  var res = '';
		  for (var i = 0; i < msg.length; i++) {
		    var w = msg[i];
		    if (endian === 'little')
		      { w = htonl(w); }
		    res += zero8(w.toString(16));
		  }
		  return res;
		}
		utils.toHex32 = toHex32;

		function zero2(word) {
		  if (word.length === 1)
		    { return '0' + word; }
		  else
		    { return word; }
		}
		utils.zero2 = zero2;

		function zero8(word) {
		  if (word.length === 7)
		    { return '0' + word; }
		  else if (word.length === 6)
		    { return '00' + word; }
		  else if (word.length === 5)
		    { return '000' + word; }
		  else if (word.length === 4)
		    { return '0000' + word; }
		  else if (word.length === 3)
		    { return '00000' + word; }
		  else if (word.length === 2)
		    { return '000000' + word; }
		  else if (word.length === 1)
		    { return '0000000' + word; }
		  else
		    { return word; }
		}
		utils.zero8 = zero8;

		function join32(msg, start, end, endian) {
		  var len = end - start;
		  assert(len % 4 === 0);
		  var res = new Array(len / 4);
		  for (var i = 0, k = start; i < res.length; i++, k += 4) {
		    var w;
		    if (endian === 'big')
		      { w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3]; }
		    else
		      { w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k]; }
		    res[i] = w >>> 0;
		  }
		  return res;
		}
		utils.join32 = join32;

		function split32(msg, endian) {
		  var res = new Array(msg.length * 4);
		  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
		    var m = msg[i];
		    if (endian === 'big') {
		      res[k] = m >>> 24;
		      res[k + 1] = (m >>> 16) & 0xff;
		      res[k + 2] = (m >>> 8) & 0xff;
		      res[k + 3] = m & 0xff;
		    } else {
		      res[k + 3] = m >>> 24;
		      res[k + 2] = (m >>> 16) & 0xff;
		      res[k + 1] = (m >>> 8) & 0xff;
		      res[k] = m & 0xff;
		    }
		  }
		  return res;
		}
		utils.split32 = split32;

		function rotr32(w, b) {
		  return (w >>> b) | (w << (32 - b));
		}
		utils.rotr32 = rotr32;

		function rotl32(w, b) {
		  return (w << b) | (w >>> (32 - b));
		}
		utils.rotl32 = rotl32;

		function sum32(a, b) {
		  return (a + b) >>> 0;
		}
		utils.sum32 = sum32;

		function sum32_3(a, b, c) {
		  return (a + b + c) >>> 0;
		}
		utils.sum32_3 = sum32_3;

		function sum32_4(a, b, c, d) {
		  return (a + b + c + d) >>> 0;
		}
		utils.sum32_4 = sum32_4;

		function sum32_5(a, b, c, d, e) {
		  return (a + b + c + d + e) >>> 0;
		}
		utils.sum32_5 = sum32_5;

		function assert(cond, msg) {
		  if (!cond)
		    { throw new Error(msg || 'Assertion failed'); }
		}
		utils.assert = assert;

		utils.inherits = inherits;

		function sum64(buf, pos, ah, al) {
		  var bh = buf[pos];
		  var bl = buf[pos + 1];

		  var lo = (al + bl) >>> 0;
		  var hi = (lo < al ? 1 : 0) + ah + bh;
		  buf[pos] = hi >>> 0;
		  buf[pos + 1] = lo;
		}
		exports.sum64 = sum64;

		function sum64_hi(ah, al, bh, bl) {
		  var lo = (al + bl) >>> 0;
		  var hi = (lo < al ? 1 : 0) + ah + bh;
		  return hi >>> 0;
		}
		exports.sum64_hi = sum64_hi;

		function sum64_lo(ah, al, bh, bl) {
		  var lo = al + bl;
		  return lo >>> 0;
		}
		exports.sum64_lo = sum64_lo;

		function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
		  var carry = 0;
		  var lo = al;
		  lo = (lo + bl) >>> 0;
		  carry += lo < al ? 1 : 0;
		  lo = (lo + cl) >>> 0;
		  carry += lo < cl ? 1 : 0;
		  lo = (lo + dl) >>> 0;
		  carry += lo < dl ? 1 : 0;

		  var hi = ah + bh + ch + dh + carry;
		  return hi >>> 0;
		}
		exports.sum64_4_hi = sum64_4_hi;

		function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
		  var lo = al + bl + cl + dl;
		  return lo >>> 0;
		}
		exports.sum64_4_lo = sum64_4_lo;

		function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
		  var carry = 0;
		  var lo = al;
		  lo = (lo + bl) >>> 0;
		  carry += lo < al ? 1 : 0;
		  lo = (lo + cl) >>> 0;
		  carry += lo < cl ? 1 : 0;
		  lo = (lo + dl) >>> 0;
		  carry += lo < dl ? 1 : 0;
		  lo = (lo + el) >>> 0;
		  carry += lo < el ? 1 : 0;

		  var hi = ah + bh + ch + dh + eh + carry;
		  return hi >>> 0;
		}
		exports.sum64_5_hi = sum64_5_hi;

		function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
		  var lo = al + bl + cl + dl + el;

		  return lo >>> 0;
		}
		exports.sum64_5_lo = sum64_5_lo;

		function rotr64_hi(ah, al, num) {
		  var r = (al << (32 - num)) | (ah >>> num);
		  return r >>> 0;
		}
		exports.rotr64_hi = rotr64_hi;

		function rotr64_lo(ah, al, num) {
		  var r = (ah << (32 - num)) | (al >>> num);
		  return r >>> 0;
		}
		exports.rotr64_lo = rotr64_lo;

		function shr64_hi(ah, al, num) {
		  return ah >>> num;
		}
		exports.shr64_hi = shr64_hi;

		function shr64_lo(ah, al, num) {
		  var r = (ah << (32 - num)) | (al >>> num);
		  return r >>> 0;
		}
		exports.shr64_lo = shr64_lo;


	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {

		var hash = __webpack_require__(18);
		var utils = hash.utils;
		var assert = utils.assert;

		function BlockHash() {
		  this.pending = null;
		  this.pendingTotal = 0;
		  this.blockSize = this.constructor.blockSize;
		  this.outSize = this.constructor.outSize;
		  this.hmacStrength = this.constructor.hmacStrength;
		  this.padLength = this.constructor.padLength / 8;
		  this.endian = 'big';

		  this._delta8 = this.blockSize / 8;
		  this._delta32 = this.blockSize / 32;
		}
		exports.BlockHash = BlockHash;

		BlockHash.prototype.update = function update(msg, enc) {
		  var this$1 = this;

		  // Convert message to array, pad it, and join into 32bit blocks
		  msg = utils.toArray(msg, enc);
		  if (!this.pending)
		    { this.pending = msg; }
		  else
		    { this.pending = this.pending.concat(msg); }
		  this.pendingTotal += msg.length;

		  // Enough data, try updating
		  if (this.pending.length >= this._delta8) {
		    msg = this.pending;

		    // Process pending data in blocks
		    var r = msg.length % this._delta8;
		    this.pending = msg.slice(msg.length - r, msg.length);
		    if (this.pending.length === 0)
		      { this.pending = null; }

		    msg = utils.join32(msg, 0, msg.length - r, this.endian);
		    for (var i = 0; i < msg.length; i += this._delta32)
		      { this$1._update(msg, i, i + this$1._delta32); }
		  }

		  return this;
		};

		BlockHash.prototype.digest = function digest(enc) {
		  this.update(this._pad());
		  assert(this.pending === null);

		  return this._digest(enc);
		};

		BlockHash.prototype._pad = function pad() {
		  var len = this.pendingTotal;
		  var bytes = this._delta8;
		  var k = bytes - ((len + this.padLength) % bytes);
		  var res = new Array(k + this.padLength);
		  res[0] = 0x80;
		  for (var i = 1; i < k; i++)
		    { res[i] = 0; }

		  // Append length
		  len <<= 3;
		  if (this.endian === 'big') {
		    for (var t = 8; t < this.padLength; t++)
		      { res[i++] = 0; }

		    res[i++] = 0;
		    res[i++] = 0;
		    res[i++] = 0;
		    res[i++] = 0;
		    res[i++] = (len >>> 24) & 0xff;
		    res[i++] = (len >>> 16) & 0xff;
		    res[i++] = (len >>> 8) & 0xff;
		    res[i++] = len & 0xff;
		  } else {
		    res[i++] = len & 0xff;
		    res[i++] = (len >>> 8) & 0xff;
		    res[i++] = (len >>> 16) & 0xff;
		    res[i++] = (len >>> 24) & 0xff;
		    res[i++] = 0;
		    res[i++] = 0;
		    res[i++] = 0;
		    res[i++] = 0;

		    for (var t = 8; t < this.padLength; t++)
		      { res[i++] = 0; }
		  }

		  return res;
		};


	/***/ },
	/* 21 */
	/***/ function(module, exports, __webpack_require__) {

		var hash = __webpack_require__(18);
		var utils = hash.utils;
		var assert = utils.assert;

		var rotr32 = utils.rotr32;
		var rotl32 = utils.rotl32;
		var sum32 = utils.sum32;
		var sum32_4 = utils.sum32_4;
		var sum32_5 = utils.sum32_5;
		var rotr64_hi = utils.rotr64_hi;
		var rotr64_lo = utils.rotr64_lo;
		var shr64_hi = utils.shr64_hi;
		var shr64_lo = utils.shr64_lo;
		var sum64 = utils.sum64;
		var sum64_hi = utils.sum64_hi;
		var sum64_lo = utils.sum64_lo;
		var sum64_4_hi = utils.sum64_4_hi;
		var sum64_4_lo = utils.sum64_4_lo;
		var sum64_5_hi = utils.sum64_5_hi;
		var sum64_5_lo = utils.sum64_5_lo;
		var BlockHash = hash.common.BlockHash;

		var sha256_K = [
		  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
		  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
		  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
		  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
		  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
		  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
		  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
		  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
		  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
		  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
		  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
		  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
		  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
		  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
		  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
		  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
		];

		var sha512_K = [
		  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
		  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
		  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
		  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
		  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
		  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
		  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
		  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
		  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
		  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
		  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
		  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
		  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
		  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
		  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
		  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
		  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
		  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
		  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
		  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
		  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
		  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
		  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
		  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
		  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
		  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
		  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
		  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
		  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
		  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
		  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
		  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
		  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
		  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
		  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
		  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
		  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
		  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
		  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
		  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
		];

		var sha1_K = [
		  0x5A827999, 0x6ED9EBA1,
		  0x8F1BBCDC, 0xCA62C1D6
		];

		function SHA256() {
		  if (!(this instanceof SHA256))
		    { return new SHA256(); }

		  BlockHash.call(this);
		  this.h = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
		             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];
		  this.k = sha256_K;
		  this.W = new Array(64);
		}
		utils.inherits(SHA256, BlockHash);
		exports.sha256 = SHA256;

		SHA256.blockSize = 512;
		SHA256.outSize = 256;
		SHA256.hmacStrength = 192;
		SHA256.padLength = 64;

		SHA256.prototype._update = function _update(msg, start) {
		  var this$1 = this;

		  var W = this.W;

		  for (var i = 0; i < 16; i++)
		    { W[i] = msg[start + i]; }
		  for (; i < W.length; i++)
		    { W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]); }

		  var a = this.h[0];
		  var b = this.h[1];
		  var c = this.h[2];
		  var d = this.h[3];
		  var e = this.h[4];
		  var f = this.h[5];
		  var g = this.h[6];
		  var h = this.h[7];

		  assert(this.k.length === W.length);
		  for (var i = 0; i < W.length; i++) {
		    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this$1.k[i], W[i]);
		    var T2 = sum32(s0_256(a), maj32(a, b, c));
		    h = g;
		    g = f;
		    f = e;
		    e = sum32(d, T1);
		    d = c;
		    c = b;
		    b = a;
		    a = sum32(T1, T2);
		  }

		  this.h[0] = sum32(this.h[0], a);
		  this.h[1] = sum32(this.h[1], b);
		  this.h[2] = sum32(this.h[2], c);
		  this.h[3] = sum32(this.h[3], d);
		  this.h[4] = sum32(this.h[4], e);
		  this.h[5] = sum32(this.h[5], f);
		  this.h[6] = sum32(this.h[6], g);
		  this.h[7] = sum32(this.h[7], h);
		};

		SHA256.prototype._digest = function digest(enc) {
		  if (enc === 'hex')
		    { return utils.toHex32(this.h, 'big'); }
		  else
		    { return utils.split32(this.h, 'big'); }
		};

		function SHA224() {
		  if (!(this instanceof SHA224))
		    { return new SHA224(); }

		  SHA256.call(this);
		  this.h = [ 0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
		             0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
		}
		utils.inherits(SHA224, SHA256);
		exports.sha224 = SHA224;

		SHA224.blockSize = 512;
		SHA224.outSize = 224;
		SHA224.hmacStrength = 192;
		SHA224.padLength = 64;

		SHA224.prototype._digest = function digest(enc) {
		  // Just truncate output
		  if (enc === 'hex')
		    { return utils.toHex32(this.h.slice(0, 7), 'big'); }
		  else
		    { return utils.split32(this.h.slice(0, 7), 'big'); }
		};

		function SHA512() {
		  if (!(this instanceof SHA512))
		    { return new SHA512(); }

		  BlockHash.call(this);
		  this.h = [ 0x6a09e667, 0xf3bcc908,
		             0xbb67ae85, 0x84caa73b,
		             0x3c6ef372, 0xfe94f82b,
		             0xa54ff53a, 0x5f1d36f1,
		             0x510e527f, 0xade682d1,
		             0x9b05688c, 0x2b3e6c1f,
		             0x1f83d9ab, 0xfb41bd6b,
		             0x5be0cd19, 0x137e2179 ];
		  this.k = sha512_K;
		  this.W = new Array(160);
		}
		utils.inherits(SHA512, BlockHash);
		exports.sha512 = SHA512;

		SHA512.blockSize = 1024;
		SHA512.outSize = 512;
		SHA512.hmacStrength = 192;
		SHA512.padLength = 128;

		SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
		  var W = this.W;

		  // 32 x 32bit words
		  for (var i = 0; i < 32; i++)
		    { W[i] = msg[start + i]; }
		  for (; i < W.length; i += 2) {
		    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
		    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
		    var c1_hi = W[i - 14];  // i - 7
		    var c1_lo = W[i - 13];
		    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
		    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
		    var c3_hi = W[i - 32];  // i - 16
		    var c3_lo = W[i - 31];

		    W[i] = sum64_4_hi(c0_hi, c0_lo,
		                      c1_hi, c1_lo,
		                      c2_hi, c2_lo,
		                      c3_hi, c3_lo);
		    W[i + 1] = sum64_4_lo(c0_hi, c0_lo,
		                          c1_hi, c1_lo,
		                          c2_hi, c2_lo,
		                          c3_hi, c3_lo);
		  }
		};

		SHA512.prototype._update = function _update(msg, start) {
		  var this$1 = this;

		  this._prepareBlock(msg, start);

		  var W = this.W;

		  var ah = this.h[0];
		  var al = this.h[1];
		  var bh = this.h[2];
		  var bl = this.h[3];
		  var ch = this.h[4];
		  var cl = this.h[5];
		  var dh = this.h[6];
		  var dl = this.h[7];
		  var eh = this.h[8];
		  var el = this.h[9];
		  var fh = this.h[10];
		  var fl = this.h[11];
		  var gh = this.h[12];
		  var gl = this.h[13];
		  var hh = this.h[14];
		  var hl = this.h[15];

		  assert(this.k.length === W.length);
		  for (var i = 0; i < W.length; i += 2) {
		    var c0_hi = hh;
		    var c0_lo = hl;
		    var c1_hi = s1_512_hi(eh, el);
		    var c1_lo = s1_512_lo(eh, el);
		    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
		    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
		    var c3_hi = this$1.k[i];
		    var c3_lo = this$1.k[i + 1];
		    var c4_hi = W[i];
		    var c4_lo = W[i + 1];

		    var T1_hi = sum64_5_hi(c0_hi, c0_lo,
		                           c1_hi, c1_lo,
		                           c2_hi, c2_lo,
		                           c3_hi, c3_lo,
		                           c4_hi, c4_lo);
		    var T1_lo = sum64_5_lo(c0_hi, c0_lo,
		                           c1_hi, c1_lo,
		                           c2_hi, c2_lo,
		                           c3_hi, c3_lo,
		                           c4_hi, c4_lo);

		    var c0_hi = s0_512_hi(ah, al);
		    var c0_lo = s0_512_lo(ah, al);
		    var c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
		    var c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

		    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
		    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

		    hh = gh;
		    hl = gl;

		    gh = fh;
		    gl = fl;

		    fh = eh;
		    fl = el;

		    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
		    el = sum64_lo(dl, dl, T1_hi, T1_lo);

		    dh = ch;
		    dl = cl;

		    ch = bh;
		    cl = bl;

		    bh = ah;
		    bl = al;

		    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
		    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
		  }

		  sum64(this.h, 0, ah, al);
		  sum64(this.h, 2, bh, bl);
		  sum64(this.h, 4, ch, cl);
		  sum64(this.h, 6, dh, dl);
		  sum64(this.h, 8, eh, el);
		  sum64(this.h, 10, fh, fl);
		  sum64(this.h, 12, gh, gl);
		  sum64(this.h, 14, hh, hl);
		};

		SHA512.prototype._digest = function digest(enc) {
		  if (enc === 'hex')
		    { return utils.toHex32(this.h, 'big'); }
		  else
		    { return utils.split32(this.h, 'big'); }
		};

		function SHA384() {
		  if (!(this instanceof SHA384))
		    { return new SHA384(); }

		  SHA512.call(this);
		  this.h = [ 0xcbbb9d5d, 0xc1059ed8,
		             0x629a292a, 0x367cd507,
		             0x9159015a, 0x3070dd17,
		             0x152fecd8, 0xf70e5939,
		             0x67332667, 0xffc00b31,
		             0x8eb44a87, 0x68581511,
		             0xdb0c2e0d, 0x64f98fa7,
		             0x47b5481d, 0xbefa4fa4 ];
		}
		utils.inherits(SHA384, SHA512);
		exports.sha384 = SHA384;

		SHA384.blockSize = 1024;
		SHA384.outSize = 384;
		SHA384.hmacStrength = 192;
		SHA384.padLength = 128;

		SHA384.prototype._digest = function digest(enc) {
		  if (enc === 'hex')
		    { return utils.toHex32(this.h.slice(0, 12), 'big'); }
		  else
		    { return utils.split32(this.h.slice(0, 12), 'big'); }
		};

		function SHA1() {
		  if (!(this instanceof SHA1))
		    { return new SHA1(); }

		  BlockHash.call(this);
		  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe,
		             0x10325476, 0xc3d2e1f0 ];
		  this.W = new Array(80);
		}

		utils.inherits(SHA1, BlockHash);
		exports.sha1 = SHA1;

		SHA1.blockSize = 512;
		SHA1.outSize = 160;
		SHA1.hmacStrength = 80;
		SHA1.padLength = 64;

		SHA1.prototype._update = function _update(msg, start) {
		  var W = this.W;

		  for (var i = 0; i < 16; i++)
		    { W[i] = msg[start + i]; }

		  for(; i < W.length; i++)
		    { W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1); }

		  var a = this.h[0];
		  var b = this.h[1];
		  var c = this.h[2];
		  var d = this.h[3];
		  var e = this.h[4];

		  for (var i = 0; i < W.length; i++) {
		    var s = ~~(i / 20);
		    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
		    e = d;
		    d = c;
		    c = rotl32(b, 30);
		    b = a;
		    a = t;
		  }

		  this.h[0] = sum32(this.h[0], a);
		  this.h[1] = sum32(this.h[1], b);
		  this.h[2] = sum32(this.h[2], c);
		  this.h[3] = sum32(this.h[3], d);
		  this.h[4] = sum32(this.h[4], e);
		};

		SHA1.prototype._digest = function digest(enc) {
		  if (enc === 'hex')
		    { return utils.toHex32(this.h, 'big'); }
		  else
		    { return utils.split32(this.h, 'big'); }
		};

		function ch32(x, y, z) {
		  return (x & y) ^ ((~x) & z);
		}

		function maj32(x, y, z) {
		  return (x & y) ^ (x & z) ^ (y & z);
		}

		function p32(x, y, z) {
		  return x ^ y ^ z;
		}

		function s0_256(x) {
		  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
		}

		function s1_256(x) {
		  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
		}

		function g0_256(x) {
		  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
		}

		function g1_256(x) {
		  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
		}

		function ft_1(s, x, y, z) {
		  if (s === 0)
		    { return ch32(x, y, z); }
		  if (s === 1 || s === 3)
		    { return p32(x, y, z); }
		  if (s === 2)
		    { return maj32(x, y, z); }
		}

		function ch64_hi(xh, xl, yh, yl, zh, zl) {
		  var r = (xh & yh) ^ ((~xh) & zh);
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function ch64_lo(xh, xl, yh, yl, zh, zl) {
		  var r = (xl & yl) ^ ((~xl) & zl);
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function maj64_hi(xh, xl, yh, yl, zh, zl) {
		  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function maj64_lo(xh, xl, yh, yl, zh, zl) {
		  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function s0_512_hi(xh, xl) {
		  var c0_hi = rotr64_hi(xh, xl, 28);
		  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
		  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

		  var r = c0_hi ^ c1_hi ^ c2_hi;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function s0_512_lo(xh, xl) {
		  var c0_lo = rotr64_lo(xh, xl, 28);
		  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
		  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

		  var r = c0_lo ^ c1_lo ^ c2_lo;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function s1_512_hi(xh, xl) {
		  var c0_hi = rotr64_hi(xh, xl, 14);
		  var c1_hi = rotr64_hi(xh, xl, 18);
		  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

		  var r = c0_hi ^ c1_hi ^ c2_hi;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function s1_512_lo(xh, xl) {
		  var c0_lo = rotr64_lo(xh, xl, 14);
		  var c1_lo = rotr64_lo(xh, xl, 18);
		  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

		  var r = c0_lo ^ c1_lo ^ c2_lo;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function g0_512_hi(xh, xl) {
		  var c0_hi = rotr64_hi(xh, xl, 1);
		  var c1_hi = rotr64_hi(xh, xl, 8);
		  var c2_hi = shr64_hi(xh, xl, 7);

		  var r = c0_hi ^ c1_hi ^ c2_hi;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function g0_512_lo(xh, xl) {
		  var c0_lo = rotr64_lo(xh, xl, 1);
		  var c1_lo = rotr64_lo(xh, xl, 8);
		  var c2_lo = shr64_lo(xh, xl, 7);

		  var r = c0_lo ^ c1_lo ^ c2_lo;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function g1_512_hi(xh, xl) {
		  var c0_hi = rotr64_hi(xh, xl, 19);
		  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
		  var c2_hi = shr64_hi(xh, xl, 6);

		  var r = c0_hi ^ c1_hi ^ c2_hi;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}

		function g1_512_lo(xh, xl) {
		  var c0_lo = rotr64_lo(xh, xl, 19);
		  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
		  var c2_lo = shr64_lo(xh, xl, 6);

		  var r = c0_lo ^ c1_lo ^ c2_lo;
		  if (r < 0)
		    { r += 0x100000000; }
		  return r;
		}


	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {

		var hash = __webpack_require__(18);
		var utils = hash.utils;

		var rotl32 = utils.rotl32;
		var sum32 = utils.sum32;
		var sum32_3 = utils.sum32_3;
		var sum32_4 = utils.sum32_4;
		var BlockHash = hash.common.BlockHash;

		function RIPEMD160() {
		  if (!(this instanceof RIPEMD160))
		    { return new RIPEMD160(); }

		  BlockHash.call(this);

		  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
		  this.endian = 'little';
		}
		utils.inherits(RIPEMD160, BlockHash);
		exports.ripemd160 = RIPEMD160;

		RIPEMD160.blockSize = 512;
		RIPEMD160.outSize = 160;
		RIPEMD160.hmacStrength = 192;
		RIPEMD160.padLength = 64;

		RIPEMD160.prototype._update = function update(msg, start) {
		  var A = this.h[0];
		  var B = this.h[1];
		  var C = this.h[2];
		  var D = this.h[3];
		  var E = this.h[4];
		  var Ah = A;
		  var Bh = B;
		  var Ch = C;
		  var Dh = D;
		  var Eh = E;
		  for (var j = 0; j < 80; j++) {
		    var T = sum32(
		      rotl32(
		        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
		        s[j]),
		      E);
		    A = E;
		    E = D;
		    D = rotl32(C, 10);
		    C = B;
		    B = T;
		    T = sum32(
		      rotl32(
		        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
		        sh[j]),
		      Eh);
		    Ah = Eh;
		    Eh = Dh;
		    Dh = rotl32(Ch, 10);
		    Ch = Bh;
		    Bh = T;
		  }
		  T = sum32_3(this.h[1], C, Dh);
		  this.h[1] = sum32_3(this.h[2], D, Eh);
		  this.h[2] = sum32_3(this.h[3], E, Ah);
		  this.h[3] = sum32_3(this.h[4], A, Bh);
		  this.h[4] = sum32_3(this.h[0], B, Ch);
		  this.h[0] = T;
		};

		RIPEMD160.prototype._digest = function digest(enc) {
		  if (enc === 'hex')
		    { return utils.toHex32(this.h, 'little'); }
		  else
		    { return utils.split32(this.h, 'little'); }
		};

		function f(j, x, y, z) {
		  if (j <= 15)
		    { return x ^ y ^ z; }
		  else if (j <= 31)
		    { return (x & y) | ((~x) & z); }
		  else if (j <= 47)
		    { return (x | (~y)) ^ z; }
		  else if (j <= 63)
		    { return (x & z) | (y & (~z)); }
		  else
		    { return x ^ (y | (~z)); }
		}

		function K(j) {
		  if (j <= 15)
		    { return 0x00000000; }
		  else if (j <= 31)
		    { return 0x5a827999; }
		  else if (j <= 47)
		    { return 0x6ed9eba1; }
		  else if (j <= 63)
		    { return 0x8f1bbcdc; }
		  else
		    { return 0xa953fd4e; }
		}

		function Kh(j) {
		  if (j <= 15)
		    { return 0x50a28be6; }
		  else if (j <= 31)
		    { return 0x5c4dd124; }
		  else if (j <= 47)
		    { return 0x6d703ef3; }
		  else if (j <= 63)
		    { return 0x7a6d76e9; }
		  else
		    { return 0x00000000; }
		}

		var r = [
		  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
		  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
		  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
		  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
		  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
		];

		var rh = [
		  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
		  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
		  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
		  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
		  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
		];

		var s = [
		  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
		  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
		  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
		  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
		  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
		];

		var sh = [
		  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
		  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
		  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
		  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
		  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
		];


	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {

		var hmac = exports;

		var hash = __webpack_require__(18);
		var utils = hash.utils;
		var assert = utils.assert;

		function Hmac(hash, key, enc) {
		  if (!(this instanceof Hmac))
		    { return new Hmac(hash, key, enc); }
		  this.Hash = hash;
		  this.blockSize = hash.blockSize / 8;
		  this.outSize = hash.outSize / 8;
		  this.inner = null;
		  this.outer = null;

		  this._init(utils.toArray(key, enc));
		}
		module.exports = Hmac;

		Hmac.prototype._init = function init(key) {
		  // Shorten key, if needed
		  if (key.length > this.blockSize)
		    { key = new this.Hash().update(key).digest(); }
		  assert(key.length <= this.blockSize);

		  // Add padding to key
		  for (var i = key.length; i < this.blockSize; i++)
		    { key.push(0); }

		  for (var i = 0; i < key.length; i++)
		    { key[i] ^= 0x36; }
		  this.inner = new this.Hash().update(key);

		  // 0x36 ^ 0x5c = 0x6a
		  for (var i = 0; i < key.length; i++)
		    { key[i] ^= 0x6a; }
		  this.outer = new this.Hash().update(key);
		};

		Hmac.prototype.update = function update(msg, enc) {
		  this.inner.update(msg, enc);
		  return this;
		};

		Hmac.prototype.digest = function digest(enc) {
		  this.outer.update(this.inner.digest());
		  return this.outer.digest(enc);
		};


	/***/ },
	/* 24 */
	/***/ function(module, exports) {

		module.exports = {
		  doubles: {
		    step: 4,
		    points: [
		      [
		        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
		        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
		      ],
		      [
		        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
		        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
		      ],
		      [
		        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
		        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
		      ],
		      [
		        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
		        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
		      ],
		      [
		        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
		        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
		      ],
		      [
		        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
		        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
		      ],
		      [
		        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
		        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
		      ],
		      [
		        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
		        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
		      ],
		      [
		        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
		        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
		      ],
		      [
		        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
		        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
		      ],
		      [
		        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
		        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
		      ],
		      [
		        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
		        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
		      ],
		      [
		        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
		        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
		      ],
		      [
		        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
		        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
		      ],
		      [
		        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
		        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
		      ],
		      [
		        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
		        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
		      ],
		      [
		        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
		        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
		      ],
		      [
		        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
		        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
		      ],
		      [
		        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
		        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
		      ],
		      [
		        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
		        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
		      ],
		      [
		        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
		        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
		      ],
		      [
		        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
		        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
		      ],
		      [
		        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
		        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
		      ],
		      [
		        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
		        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
		      ],
		      [
		        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
		        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
		      ],
		      [
		        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
		        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
		      ],
		      [
		        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
		        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
		      ],
		      [
		        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
		        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
		      ],
		      [
		        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
		        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
		      ],
		      [
		        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
		        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
		      ],
		      [
		        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
		        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
		      ],
		      [
		        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
		        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
		      ],
		      [
		        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
		        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
		      ],
		      [
		        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
		        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
		      ],
		      [
		        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
		        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
		      ],
		      [
		        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
		        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
		      ],
		      [
		        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
		        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
		      ],
		      [
		        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
		        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
		      ],
		      [
		        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
		        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
		      ],
		      [
		        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
		        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
		      ],
		      [
		        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
		        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
		      ],
		      [
		        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
		        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
		      ],
		      [
		        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
		        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
		      ],
		      [
		        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
		        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
		      ],
		      [
		        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
		        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
		      ],
		      [
		        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
		        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
		      ],
		      [
		        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
		        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
		      ],
		      [
		        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
		        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
		      ],
		      [
		        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
		        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
		      ],
		      [
		        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
		        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
		      ],
		      [
		        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
		        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
		      ],
		      [
		        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
		        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
		      ],
		      [
		        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
		        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
		      ],
		      [
		        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
		        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
		      ],
		      [
		        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
		        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
		      ],
		      [
		        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
		        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
		      ],
		      [
		        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
		        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
		      ],
		      [
		        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
		        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
		      ],
		      [
		        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
		        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
		      ],
		      [
		        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
		        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
		      ],
		      [
		        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
		        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
		      ],
		      [
		        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
		        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
		      ],
		      [
		        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
		        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
		      ],
		      [
		        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
		        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
		      ],
		      [
		        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
		        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
		      ]
		    ]
		  },
		  naf: {
		    wnd: 7,
		    points: [
		      [
		        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
		        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
		      ],
		      [
		        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
		        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
		      ],
		      [
		        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
		        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
		      ],
		      [
		        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
		        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
		      ],
		      [
		        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
		        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
		      ],
		      [
		        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
		        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
		      ],
		      [
		        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
		        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
		      ],
		      [
		        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
		        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
		      ],
		      [
		        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
		        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
		      ],
		      [
		        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
		        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
		      ],
		      [
		        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
		        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
		      ],
		      [
		        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
		        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
		      ],
		      [
		        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
		        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
		      ],
		      [
		        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
		        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
		      ],
		      [
		        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
		        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
		      ],
		      [
		        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
		        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
		      ],
		      [
		        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
		        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
		      ],
		      [
		        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
		        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
		      ],
		      [
		        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
		        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
		      ],
		      [
		        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
		        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
		      ],
		      [
		        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
		        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
		      ],
		      [
		        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
		        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
		      ],
		      [
		        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
		        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
		      ],
		      [
		        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
		        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
		      ],
		      [
		        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
		        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
		      ],
		      [
		        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
		        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
		      ],
		      [
		        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
		        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
		      ],
		      [
		        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
		        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
		      ],
		      [
		        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
		        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
		      ],
		      [
		        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
		        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
		      ],
		      [
		        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
		        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
		      ],
		      [
		        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
		        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
		      ],
		      [
		        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
		        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
		      ],
		      [
		        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
		        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
		      ],
		      [
		        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
		        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
		      ],
		      [
		        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
		        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
		      ],
		      [
		        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
		        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
		      ],
		      [
		        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
		        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
		      ],
		      [
		        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
		        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
		      ],
		      [
		        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
		        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
		      ],
		      [
		        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
		        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
		      ],
		      [
		        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
		        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
		      ],
		      [
		        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
		        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
		      ],
		      [
		        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
		        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
		      ],
		      [
		        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
		        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
		      ],
		      [
		        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
		        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
		      ],
		      [
		        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
		        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
		      ],
		      [
		        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
		        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
		      ],
		      [
		        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
		        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
		      ],
		      [
		        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
		        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
		      ],
		      [
		        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
		        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
		      ],
		      [
		        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
		        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
		      ],
		      [
		        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
		        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
		      ],
		      [
		        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
		        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
		      ],
		      [
		        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
		        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
		      ],
		      [
		        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
		        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
		      ],
		      [
		        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
		        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
		      ],
		      [
		        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
		        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
		      ],
		      [
		        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
		        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
		      ],
		      [
		        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
		        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
		      ],
		      [
		        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
		        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
		      ],
		      [
		        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
		        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
		      ],
		      [
		        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
		        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
		      ],
		      [
		        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
		        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
		      ],
		      [
		        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
		        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
		      ],
		      [
		        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
		        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
		      ],
		      [
		        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
		        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
		      ],
		      [
		        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
		        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
		      ],
		      [
		        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
		        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
		      ],
		      [
		        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
		        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
		      ],
		      [
		        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
		        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
		      ],
		      [
		        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
		        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
		      ],
		      [
		        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
		        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
		      ],
		      [
		        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
		        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
		      ],
		      [
		        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
		        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
		      ],
		      [
		        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
		        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
		      ],
		      [
		        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
		        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
		      ],
		      [
		        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
		        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
		      ],
		      [
		        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
		        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
		      ],
		      [
		        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
		        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
		      ],
		      [
		        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
		        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
		      ],
		      [
		        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
		        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
		      ],
		      [
		        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
		        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
		      ],
		      [
		        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
		        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
		      ],
		      [
		        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
		        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
		      ],
		      [
		        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
		        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
		      ],
		      [
		        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
		        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
		      ],
		      [
		        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
		        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
		      ],
		      [
		        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
		        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
		      ],
		      [
		        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
		        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
		      ],
		      [
		        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
		        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
		      ],
		      [
		        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
		        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
		      ],
		      [
		        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
		        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
		      ],
		      [
		        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
		        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
		      ],
		      [
		        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
		        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
		      ],
		      [
		        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
		        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
		      ],
		      [
		        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
		        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
		      ],
		      [
		        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
		        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
		      ],
		      [
		        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
		        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
		      ],
		      [
		        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
		        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
		      ],
		      [
		        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
		        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
		      ],
		      [
		        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
		        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
		      ],
		      [
		        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
		        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
		      ],
		      [
		        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
		        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
		      ],
		      [
		        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
		        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
		      ],
		      [
		        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
		        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
		      ],
		      [
		        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
		        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
		      ],
		      [
		        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
		        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
		      ],
		      [
		        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
		        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
		      ],
		      [
		        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
		        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
		      ],
		      [
		        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
		        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
		      ],
		      [
		        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
		        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
		      ],
		      [
		        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
		        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
		      ],
		      [
		        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
		        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
		      ],
		      [
		        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
		        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
		      ],
		      [
		        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
		        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
		      ],
		      [
		        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
		        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
		      ],
		      [
		        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
		        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
		      ],
		      [
		        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
		        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
		      ],
		      [
		        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
		        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
		      ],
		      [
		        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
		        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
		      ],
		      [
		        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
		        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
		      ],
		      [
		        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
		        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
		      ],
		      [
		        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
		        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
		      ],
		      [
		        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
		        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
		      ],
		      [
		        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
		        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
		      ],
		      [
		        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
		        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
		      ]
		    ]
		  }
		};


	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var BN = __webpack_require__(4);
		var HmacDRBG$$1 = __webpack_require__(26);
		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var assert = utils.assert;

		var KeyPair = __webpack_require__(27);
		var Signature = __webpack_require__(28);

		function EC(options) {
		  if (!(this instanceof EC))
		    { return new EC(options); }

		  // Shortcut `elliptic.ec(curve-name)`
		  if (typeof options === 'string') {
		    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

		    options = elliptic.curves[options];
		  }

		  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
		  if (options instanceof elliptic.curves.PresetCurve)
		    { options = { curve: options }; }

		  this.curve = options.curve.curve;
		  this.n = this.curve.n;
		  this.nh = this.n.ushrn(1);
		  this.g = this.curve.g;

		  // Point on curve
		  this.g = options.curve.g;
		  this.g.precompute(options.curve.n.bitLength() + 1);

		  // Hash for function for DRBG
		  this.hash = options.hash || options.curve.hash;
		}
		module.exports = EC;

		EC.prototype.keyPair = function keyPair(options) {
		  return new KeyPair(this, options);
		};

		EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
		  return KeyPair.fromPrivate(this, priv, enc);
		};

		EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
		  return KeyPair.fromPublic(this, pub, enc);
		};

		EC.prototype.genKeyPair = function genKeyPair(options) {
		  var this$1 = this;

		  if (!options)
		    { options = {}; }

		  // Instantiate Hmac_DRBG
		  var drbg = new HmacDRBG$$1({
		    hash: this.hash,
		    pers: options.pers,
		    persEnc: options.persEnc || 'utf8',
		    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
		    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
		    nonce: this.n.toArray()
		  });

		  var bytes = this.n.byteLength();
		  var ns2 = this.n.sub(new BN(2));
		  do {
		    var priv = new BN(drbg.generate(bytes));
		    if (priv.cmp(ns2) > 0)
		      { continue; }

		    priv.iaddn(1);
		    return this$1.keyFromPrivate(priv);
		  } while (true);
		};

		EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
		  var delta = msg.byteLength() * 8 - this.n.bitLength();
		  if (delta > 0)
		    { msg = msg.ushrn(delta); }
		  if (!truncOnly && msg.cmp(this.n) >= 0)
		    { return msg.sub(this.n); }
		  else
		    { return msg; }
		};

		EC.prototype.sign = function sign(msg, key, enc, options) {
		  var this$1 = this;

		  if (typeof enc === 'object') {
		    options = enc;
		    enc = null;
		  }
		  if (!options)
		    { options = {}; }

		  key = this.keyFromPrivate(key, enc);
		  msg = this._truncateToN(new BN(msg, 16));

		  // Zero-extend key to provide enough entropy
		  var bytes = this.n.byteLength();
		  var bkey = key.getPrivate().toArray('be', bytes);

		  // Zero-extend nonce to have the same byte size as N
		  var nonce = msg.toArray('be', bytes);

		  // Instantiate Hmac_DRBG
		  var drbg = new HmacDRBG$$1({
		    hash: this.hash,
		    entropy: bkey,
		    nonce: nonce,
		    pers: options.pers,
		    persEnc: options.persEnc || 'utf8'
		  });

		  // Number of bytes to generate
		  var ns1 = this.n.sub(new BN(1));

		  for (var iter = 0; true; iter++) {
		    var k = options.k ?
		        options.k(iter) :
		        new BN(drbg.generate(this$1.n.byteLength()));
		    k = this$1._truncateToN(k, true);
		    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
		      { continue; }

		    var kp = this$1.g.mul(k);
		    if (kp.isInfinity())
		      { continue; }

		    var kpX = kp.getX();
		    var r = kpX.umod(this$1.n);
		    if (r.cmpn(0) === 0)
		      { continue; }

		    var s = k.invm(this$1.n).mul(r.mul(key.getPrivate()).iadd(msg));
		    s = s.umod(this$1.n);
		    if (s.cmpn(0) === 0)
		      { continue; }

		    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
		                        (kpX.cmp(r) !== 0 ? 2 : 0);

		    // Use complement of `s`, if it is > `n / 2`
		    if (options.canonical && s.cmp(this$1.nh) > 0) {
		      s = this$1.n.sub(s);
		      recoveryParam ^= 1;
		    }

		    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
		  }
		};

		EC.prototype.verify = function verify(msg, signature, key, enc) {
		  msg = this._truncateToN(new BN(msg, 16));
		  key = this.keyFromPublic(key, enc);
		  signature = new Signature(signature, 'hex');

		  // Perform primitive values validation
		  var r = signature.r;
		  var s = signature.s;
		  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
		    { return false; }
		  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
		    { return false; }

		  // Validate signature
		  var sinv = s.invm(this.n);
		  var u1 = sinv.mul(msg).umod(this.n);
		  var u2 = sinv.mul(r).umod(this.n);

		  if (!this.curve._maxwellTrick) {
		    var p = this.g.mulAdd(u1, key.getPublic(), u2);
		    if (p.isInfinity())
		      { return false; }

		    return p.getX().umod(this.n).cmp(r) === 0;
		  }

		  // NOTE: Greg Maxwell's trick, inspired by:
		  // https://git.io/vad3K

		  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
		  if (p.isInfinity())
		    { return false; }

		  // Compare `p.x` of Jacobian point with `r`,
		  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
		  // inverse of `p.z^2`
		  return p.eqXToP(r);
		};

		EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
		  assert((3 & j) === j, 'The recovery param is more than two bits');
		  signature = new Signature(signature, enc);

		  var n = this.n;
		  var e = new BN(msg);
		  var r = signature.r;
		  var s = signature.s;

		  // A set LSB signifies that the y-coordinate is odd
		  var isYOdd = j & 1;
		  var isSecondKey = j >> 1;
		  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
		    { throw new Error('Unable to find sencond key candinate'); }

		  // 1.1. Let x = r + jn.
		  if (isSecondKey)
		    { r = this.curve.pointFromX(r.add(this.curve.n), isYOdd); }
		  else
		    { r = this.curve.pointFromX(r, isYOdd); }

		  var rInv = signature.r.invm(n);
		  var s1 = n.sub(e).mul(rInv).umod(n);
		  var s2 = s.mul(rInv).umod(n);

		  // 1.6.1 Compute Q = r^-1 (sR -  eG)
		  //               Q = r^-1 (sR + -eG)
		  return this.g.mulAdd(s1, r, s2);
		};

		EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
		  var this$1 = this;

		  signature = new Signature(signature, enc);
		  if (signature.recoveryParam !== null)
		    { return signature.recoveryParam; }

		  for (var i = 0; i < 4; i++) {
		    var Qprime;
		    try {
		      Qprime = this$1.recoverPubKey(e, signature, i);
		    } catch (e) {
		      continue;
		    }

		    if (Qprime.eq(Q))
		      { return i; }
		  }
		  throw new Error('Unable to find valid recovery factor');
		};


	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var hash = __webpack_require__(18);
		var utils = __webpack_require__(8);
		var assert = __webpack_require__(7);

		function HmacDRBG$$1(options) {
		  if (!(this instanceof HmacDRBG$$1))
		    { return new HmacDRBG$$1(options); }
		  this.hash = options.hash;
		  this.predResist = !!options.predResist;

		  this.outLen = this.hash.outSize;
		  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

		  this.reseed = null;
		  this.reseedInterval = null;
		  this.K = null;
		  this.V = null;

		  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');
		  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');
		  var pers = utils.toArray(options.pers, options.persEnc || 'hex');
		  assert(entropy.length >= (this.minEntropy / 8),
		         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
		  this._init(entropy, nonce, pers);
		}
		module.exports = HmacDRBG$$1;

		HmacDRBG$$1.prototype._init = function init(entropy, nonce, pers) {
		  var this$1 = this;

		  var seed = entropy.concat(nonce).concat(pers);

		  this.K = new Array(this.outLen / 8);
		  this.V = new Array(this.outLen / 8);
		  for (var i = 0; i < this.V.length; i++) {
		    this$1.K[i] = 0x00;
		    this$1.V[i] = 0x01;
		  }

		  this._update(seed);
		  this.reseed = 1;
		  this.reseedInterval = 0x1000000000000;  // 2^48
		};

		HmacDRBG$$1.prototype._hmac = function hmac() {
		  return new hash.hmac(this.hash, this.K);
		};

		HmacDRBG$$1.prototype._update = function update(seed) {
		  var kmac = this._hmac()
		                 .update(this.V)
		                 .update([ 0x00 ]);
		  if (seed)
		    { kmac = kmac.update(seed); }
		  this.K = kmac.digest();
		  this.V = this._hmac().update(this.V).digest();
		  if (!seed)
		    { return; }

		  this.K = this._hmac()
		               .update(this.V)
		               .update([ 0x01 ])
		               .update(seed)
		               .digest();
		  this.V = this._hmac().update(this.V).digest();
		};

		HmacDRBG$$1.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
		  // Optional entropy enc
		  if (typeof entropyEnc !== 'string') {
		    addEnc = add;
		    add = entropyEnc;
		    entropyEnc = null;
		  }

		  entropy = utils.toArray(entropy, entropyEnc);
		  add = utils.toArray(add, addEnc);

		  assert(entropy.length >= (this.minEntropy / 8),
		         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

		  this._update(entropy.concat(add || []));
		  this.reseed = 1;
		};

		HmacDRBG$$1.prototype.generate = function generate(len, enc, add, addEnc) {
		  var this$1 = this;

		  if (this.reseed > this.reseedInterval)
		    { throw new Error('Reseed is required'); }

		  // Optional encoding
		  if (typeof enc !== 'string') {
		    addEnc = add;
		    add = enc;
		    enc = null;
		  }

		  // Optional additional data
		  if (add) {
		    add = utils.toArray(add, addEnc || 'hex');
		    this._update(add);
		  }

		  var temp = [];
		  while (temp.length < len) {
		    this$1.V = this$1._hmac().update(this$1.V).digest();
		    temp = temp.concat(this$1.V);
		  }

		  var res = temp.slice(0, len);
		  this._update(add);
		  this.reseed++;
		  return utils.encode(res, enc);
		};


	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var BN = __webpack_require__(4);
		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var assert = utils.assert;

		function KeyPair(ec, options) {
		  this.ec = ec;
		  this.priv = null;
		  this.pub = null;

		  // KeyPair(ec, { priv: ..., pub: ... })
		  if (options.priv)
		    { this._importPrivate(options.priv, options.privEnc); }
		  if (options.pub)
		    { this._importPublic(options.pub, options.pubEnc); }
		}
		module.exports = KeyPair;

		KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
		  if (pub instanceof KeyPair)
		    { return pub; }

		  return new KeyPair(ec, {
		    pub: pub,
		    pubEnc: enc
		  });
		};

		KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
		  if (priv instanceof KeyPair)
		    { return priv; }

		  return new KeyPair(ec, {
		    priv: priv,
		    privEnc: enc
		  });
		};

		KeyPair.prototype.validate = function validate() {
		  var pub = this.getPublic();

		  if (pub.isInfinity())
		    { return { result: false, reason: 'Invalid public key' }; }
		  if (!pub.validate())
		    { return { result: false, reason: 'Public key is not a point' }; }
		  if (!pub.mul(this.ec.curve.n).isInfinity())
		    { return { result: false, reason: 'Public key * N != O' }; }

		  return { result: true, reason: null };
		};

		KeyPair.prototype.getPublic = function getPublic(compact, enc) {
		  // compact is optional argument
		  if (typeof compact === 'string') {
		    enc = compact;
		    compact = null;
		  }

		  if (!this.pub)
		    { this.pub = this.ec.g.mul(this.priv); }

		  if (!enc)
		    { return this.pub; }

		  return this.pub.encode(enc, compact);
		};

		KeyPair.prototype.getPrivate = function getPrivate(enc) {
		  if (enc === 'hex')
		    { return this.priv.toString(16, 2); }
		  else
		    { return this.priv; }
		};

		KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
		  this.priv = new BN(key, enc || 16);

		  // Ensure that the priv won't be bigger than n, otherwise we may fail
		  // in fixed multiplication method
		  this.priv = this.priv.umod(this.ec.curve.n);
		};

		KeyPair.prototype._importPublic = function _importPublic(key, enc) {
		  if (key.x || key.y) {
		    // Montgomery points only have an `x` coordinate.
		    // Weierstrass/Edwards points on the other hand have both `x` and
		    // `y` coordinates.
		    if (this.ec.curve.type === 'mont') {
		      assert(key.x, 'Need x coordinate');
		    } else if (this.ec.curve.type === 'short' ||
		               this.ec.curve.type === 'edwards') {
		      assert(key.x && key.y, 'Need both x and y coordinate');
		    }
		    this.pub = this.ec.curve.point(key.x, key.y);
		    return;
		  }
		  this.pub = this.ec.curve.decodePoint(key, enc);
		};

		// ECDH
		KeyPair.prototype.derive = function derive(pub) {
		  return pub.mul(this.priv).getX();
		};

		// ECDSA
		KeyPair.prototype.sign = function sign(msg, enc, options) {
		  return this.ec.sign(msg, this, enc, options);
		};

		KeyPair.prototype.verify = function verify(msg, signature) {
		  return this.ec.verify(msg, signature, this);
		};

		KeyPair.prototype.inspect = function inspect() {
		  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
		         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
		};


	/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var BN = __webpack_require__(4);

		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var assert = utils.assert;

		function Signature(options, enc) {
		  if (options instanceof Signature)
		    { return options; }

		  if (this._importDER(options, enc))
		    { return; }

		  assert(options.r && options.s, 'Signature without r or s');
		  this.r = new BN(options.r, 16);
		  this.s = new BN(options.s, 16);
		  if (options.recoveryParam === undefined)
		    { this.recoveryParam = null; }
		  else
		    { this.recoveryParam = options.recoveryParam; }
		}
		module.exports = Signature;

		function Position() {
		  this.place = 0;
		}

		function getLength(buf, p) {
		  var initial = buf[p.place++];
		  if (!(initial & 0x80)) {
		    return initial;
		  }
		  var octetLen = initial & 0xf;
		  var val = 0;
		  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
		    val <<= 8;
		    val |= buf[off];
		  }
		  p.place = off;
		  return val;
		}

		function rmPadding(buf) {
		  var i = 0;
		  var len = buf.length - 1;
		  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
		    i++;
		  }
		  if (i === 0) {
		    return buf;
		  }
		  return buf.slice(i);
		}

		Signature.prototype._importDER = function _importDER(data, enc) {
		  data = utils.toArray(data, enc);
		  var p = new Position();
		  if (data[p.place++] !== 0x30) {
		    return false;
		  }
		  var len = getLength(data, p);
		  if ((len + p.place) !== data.length) {
		    return false;
		  }
		  if (data[p.place++] !== 0x02) {
		    return false;
		  }
		  var rlen = getLength(data, p);
		  var r = data.slice(p.place, rlen + p.place);
		  p.place += rlen;
		  if (data[p.place++] !== 0x02) {
		    return false;
		  }
		  var slen = getLength(data, p);
		  if (data.length !== slen + p.place) {
		    return false;
		  }
		  var s = data.slice(p.place, slen + p.place);
		  if (r[0] === 0 && (r[1] & 0x80)) {
		    r = r.slice(1);
		  }
		  if (s[0] === 0 && (s[1] & 0x80)) {
		    s = s.slice(1);
		  }

		  this.r = new BN(r);
		  this.s = new BN(s);
		  this.recoveryParam = null;

		  return true;
		};

		function constructLength(arr, len) {
		  if (len < 0x80) {
		    arr.push(len);
		    return;
		  }
		  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
		  arr.push(octets | 0x80);
		  while (--octets) {
		    arr.push((len >>> (octets << 3)) & 0xff);
		  }
		  arr.push(len);
		}

		Signature.prototype.toDER = function toDER(enc) {
		  var r = this.r.toArray();
		  var s = this.s.toArray();

		  // Pad values
		  if (r[0] & 0x80)
		    { r = [ 0 ].concat(r); }
		  // Pad values
		  if (s[0] & 0x80)
		    { s = [ 0 ].concat(s); }

		  r = rmPadding(r);
		  s = rmPadding(s);

		  while (!s[0] && !(s[1] & 0x80)) {
		    s = s.slice(1);
		  }
		  var arr = [ 0x02 ];
		  constructLength(arr, r.length);
		  arr = arr.concat(r);
		  arr.push(0x02);
		  constructLength(arr, s.length);
		  var backHalf = arr.concat(s);
		  var res = [ 0x30 ];
		  constructLength(res, backHalf.length);
		  res = res.concat(backHalf);
		  return utils.encode(res, enc);
		};


	/***/ },
	/* 29 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var hash = __webpack_require__(18);
		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var assert = utils.assert;
		var parseBytes = utils.parseBytes;
		var KeyPair = __webpack_require__(30);
		var Signature = __webpack_require__(31);

		function EDDSA(curve) {
		  assert(curve === 'ed25519', 'only tested with ed25519 so far');

		  if (!(this instanceof EDDSA))
		    { return new EDDSA(curve); }

		  var curve = elliptic.curves[curve].curve;
		  this.curve = curve;
		  this.g = curve.g;
		  this.g.precompute(curve.n.bitLength() + 1);

		  this.pointClass = curve.point().constructor;
		  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
		  this.hash = hash.sha512;
		}

		module.exports = EDDSA;

		/**
		* @param {Array|String} message - message bytes
		* @param {Array|String|KeyPair} secret - secret bytes or a keypair
		* @returns {Signature} - signature
		*/
		EDDSA.prototype.sign = function sign(message, secret) {
		  message = parseBytes(message);
		  var key = this.keyFromSecret(secret);
		  var r = this.hashInt(key.messagePrefix(), message);
		  var R = this.g.mul(r);
		  var Rencoded = this.encodePoint(R);
		  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
		               .mul(key.priv());
		  var S = r.add(s_).umod(this.curve.n);
		  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
		};

		/**
		* @param {Array} message - message bytes
		* @param {Array|String|Signature} sig - sig bytes
		* @param {Array|String|Point|KeyPair} pub - public key
		* @returns {Boolean} - true if public key matches sig of message
		*/
		EDDSA.prototype.verify = function verify(message, sig, pub) {
		  message = parseBytes(message);
		  sig = this.makeSignature(sig);
		  var key = this.keyFromPublic(pub);
		  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
		  var SG = this.g.mul(sig.S());
		  var RplusAh = sig.R().add(key.pub().mul(h));
		  return RplusAh.eq(SG);
		};

		EDDSA.prototype.hashInt = function hashInt() {
		  var arguments$1 = arguments;

		  var hash = this.hash();
		  for (var i = 0; i < arguments.length; i++)
		    { hash.update(arguments$1[i]); }
		  return utils.intFromLE(hash.digest()).umod(this.curve.n);
		};

		EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
		  return KeyPair.fromPublic(this, pub);
		};

		EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
		  return KeyPair.fromSecret(this, secret);
		};

		EDDSA.prototype.makeSignature = function makeSignature(sig) {
		  if (sig instanceof Signature)
		    { return sig; }
		  return new Signature(this, sig);
		};

		/**
		* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
		*
		* EDDSA defines methods for encoding and decoding points and integers. These are
		* helper convenience methods, that pass along to utility functions implied
		* parameters.
		*
		*/
		EDDSA.prototype.encodePoint = function encodePoint(point) {
		  var enc = point.getY().toArray('le', this.encodingLength);
		  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
		  return enc;
		};

		EDDSA.prototype.decodePoint = function decodePoint(bytes) {
		  bytes = utils.parseBytes(bytes);

		  var lastIx = bytes.length - 1;
		  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
		  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

		  var y = utils.intFromLE(normed);
		  return this.curve.pointFromY(y, xIsOdd);
		};

		EDDSA.prototype.encodeInt = function encodeInt(num) {
		  return num.toArray('le', this.encodingLength);
		};

		EDDSA.prototype.decodeInt = function decodeInt(bytes) {
		  return utils.intFromLE(bytes);
		};

		EDDSA.prototype.isPoint = function isPoint(val) {
		  return val instanceof this.pointClass;
		};


	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var assert = utils.assert;
		var parseBytes = utils.parseBytes;
		var cachedProperty = utils.cachedProperty;

		/**
		* @param {EDDSA} eddsa - instance
		* @param {Object} params - public/private key parameters
		*
		* @param {Array<Byte>} [params.secret] - secret seed bytes
		* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
		* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
		*
		*/
		function KeyPair(eddsa, params) {
		  this.eddsa = eddsa;
		  this._secret = parseBytes(params.secret);
		  if (eddsa.isPoint(params.pub))
		    { this._pub = params.pub; }
		  else
		    { this._pubBytes = parseBytes(params.pub); }
		}

		KeyPair.fromPublic = function fromPublic(eddsa, pub) {
		  if (pub instanceof KeyPair)
		    { return pub; }
		  return new KeyPair(eddsa, { pub: pub });
		};

		KeyPair.fromSecret = function fromSecret(eddsa, secret) {
		  if (secret instanceof KeyPair)
		    { return secret; }
		  return new KeyPair(eddsa, { secret: secret });
		};

		KeyPair.prototype.secret = function secret() {
		  return this._secret;
		};

		cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
		  return this.eddsa.encodePoint(this.pub());
		});

		cachedProperty(KeyPair, 'pub', function pub() {
		  if (this._pubBytes)
		    { return this.eddsa.decodePoint(this._pubBytes); }
		  return this.eddsa.g.mul(this.priv());
		});

		cachedProperty(KeyPair, 'privBytes', function privBytes() {
		  var eddsa = this.eddsa;
		  var hash = this.hash();
		  var lastIx = eddsa.encodingLength - 1;

		  var a = hash.slice(0, eddsa.encodingLength);
		  a[0] &= 248;
		  a[lastIx] &= 127;
		  a[lastIx] |= 64;

		  return a;
		});

		cachedProperty(KeyPair, 'priv', function priv() {
		  return this.eddsa.decodeInt(this.privBytes());
		});

		cachedProperty(KeyPair, 'hash', function hash() {
		  return this.eddsa.hash().update(this.secret()).digest();
		});

		cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
		  return this.hash().slice(this.eddsa.encodingLength);
		});

		KeyPair.prototype.sign = function sign(message) {
		  assert(this._secret, 'KeyPair can only verify');
		  return this.eddsa.sign(message, this);
		};

		KeyPair.prototype.verify = function verify(message, sig) {
		  return this.eddsa.verify(message, sig, this);
		};

		KeyPair.prototype.getSecret = function getSecret(enc) {
		  assert(this._secret, 'KeyPair is public only');
		  return utils.encode(this.secret(), enc);
		};

		KeyPair.prototype.getPublic = function getPublic(enc) {
		  return utils.encode(this.pubBytes(), enc);
		};

		module.exports = KeyPair;


	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var BN = __webpack_require__(4);
		var elliptic = __webpack_require__(1);
		var utils = elliptic.utils;
		var assert = utils.assert;
		var cachedProperty = utils.cachedProperty;
		var parseBytes = utils.parseBytes;

		/**
		* @param {EDDSA} eddsa - eddsa instance
		* @param {Array<Bytes>|Object} sig -
		* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
		* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
		* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
		* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
		*/
		function Signature(eddsa, sig) {
		  this.eddsa = eddsa;

		  if (typeof sig !== 'object')
		    { sig = parseBytes(sig); }

		  if (Array.isArray(sig)) {
		    sig = {
		      R: sig.slice(0, eddsa.encodingLength),
		      S: sig.slice(eddsa.encodingLength)
		    };
		  }

		  assert(sig.R && sig.S, 'Signature without R or S');

		  if (eddsa.isPoint(sig.R))
		    { this._R = sig.R; }
		  if (sig.S instanceof BN)
		    { this._S = sig.S; }

		  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
		  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
		}

		cachedProperty(Signature, 'S', function S() {
		  return this.eddsa.decodeInt(this.Sencoded());
		});

		cachedProperty(Signature, 'R', function R() {
		  return this.eddsa.decodePoint(this.Rencoded());
		});

		cachedProperty(Signature, 'Rencoded', function Rencoded() {
		  return this.eddsa.encodePoint(this.R());
		});

		cachedProperty(Signature, 'Sencoded', function Sencoded() {
		  return this.eddsa.encodeInt(this.S());
		});

		Signature.prototype.toBytes = function toBytes() {
		  return this.Rencoded().concat(this.Sencoded());
		};

		Signature.prototype.toHex = function toHex() {
		  return utils.encode(this.toBytes(), 'hex').toUpperCase();
		};

		module.exports = Signature;


	/***/ }
	/******/ ])));
	});

	var elliptic = cryptoBundle.elliptic;
	var hashjs = cryptoBundle.hashjs;

	var AesCbc = aesjs.ModeOfOperation.cbc;

	/**
	 * Creates a pseudo-random number generator based on the provided entropy.
	 * This can be used to turn an async random number generator into
	 * a synchronous one.
	 */
	function makeRandomGenerator (entropy) {
	  var rng = new HmacDRBG({
	    hash: hashjs.sha256,
	    entropy: entropy
	  });

	  return function (bytes) { return rng.generate(bytes); }
	}

	/**
	 * @param box an Airbitz JSON encryption box
	 * @param key a key, as an ArrayBuffer
	 */
	function decrypt (box, key) {
	  // Check JSON:
	  if (box['encryptionType'] !== 0) {
	    throw new Error('Unknown encryption type')
	  }
	  var iv = base16.parse(box['iv_hex']);
	  var ciphertext = base64.parse(box['data_base64']);

	  // Decrypt:
	  var cipher = new AesCbc(key, iv);
	  var raw = cipher.decrypt(ciphertext);
	  // Alternative using node.js crypto:
	  // const decipher = crypto.createDecipheriv('AES-256-CBC', key, iv);
	  // let x = decipher.update(box.data_base64, 'base64', 'hex')
	  // x += decipher.final('hex')
	  // const data = base16.parse(x)

	  // Calculate field locations:
	  var headerSize = raw[0];
	  var dataSize =
	    raw[1 + headerSize] << 24 |
	    raw[2 + headerSize] << 16 |
	    raw[3 + headerSize] << 8 |
	    raw[4 + headerSize];
	  var dataStart = 1 + headerSize + 4;
	  var footerSize = raw[dataStart + dataSize];
	  var hashStart = dataStart + dataSize + 1 + footerSize;

	  // Verify SHA-256 checksum:
	  var hash = hashjs.sha256().update(raw.slice(0, hashStart)).digest();
	  var hashSize = hash.length;
	  for (var i = 0; i < hashSize; ++i) {
	    if (raw[hashStart + i] !== hash[i]) {
	      throw new Error('Invalid checksum')
	    }
	  }

	  // Verify pkcs7 padding (if any):
	  var paddingStart = hashStart + hashSize;
	  var paddingSize = raw.length - paddingStart;
	  for (var i$1 = paddingStart; i$1 < raw.length; ++i$1) {
	    if (raw[i$1] !== paddingSize) {
	      throw new Error('Invalid PKCS7 padding')
	    }
	  }

	  // Return the payload:
	  return raw.slice(dataStart, dataStart + dataSize)
	}

	/**
	 * @param payload an ArrayBuffer of data
	 * @param key a key, as an ArrayBuffer
	 */
	function encrypt (io, data, key) {
	  // Calculate sizes and locations:
	  var headerSize = io.random(1)[0] & 0x1f;
	  var dataStart = 1 + headerSize + 4;
	  var dataSize = data.length;
	  var footerStart = dataStart + dataSize + 1;
	  var footerSize = io.random(1)[0] & 0x1f;
	  var hashStart = footerStart + footerSize;
	  var hashSize = 32;
	  var paddingStart = hashStart + hashSize;
	  var paddingSize = 16 - (paddingStart & 0xf);
	  var raw = new buffer.Buffer(paddingStart + paddingSize);

	  // Random header:
	  var header = io.random(headerSize);
	  raw[0] = headerSize;
	  for (var i = 0; i < headerSize; ++i) {
	    raw[1 + i] = header[i];
	  }

	  // Payload data:
	  raw[1 + headerSize] = (dataSize >> 24) & 0xff;
	  raw[2 + headerSize] = (dataSize >> 16) & 0xff;
	  raw[3 + headerSize] = (dataSize >> 8) & 0xff;
	  raw[4 + headerSize] = dataSize & 0xff;
	  for (var i$1 = 0; i$1 < dataSize; ++i$1) {
	    raw[dataStart + i$1] = data[i$1];
	  }

	  // Random footer:
	  var footer = io.random(footerSize);
	  raw[dataStart + dataSize] = footerSize;
	  for (var i$2 = 0; i$2 < footerSize; ++i$2) {
	    raw[footerStart + i$2] = footer[i$2];
	  }

	  // SHA-256 checksum:
	  var hash = hashjs.sha256().update(raw.slice(0, hashStart)).digest();
	  for (var i$3 = 0; i$3 < hashSize; ++i$3) {
	    raw[hashStart + i$3] = hash[i$3];
	  }

	  // Add PKCS7 padding:
	  for (var i$4 = 0; i$4 < paddingSize; ++i$4) {
	    raw[paddingStart + i$4] = paddingSize;
	  }

	  // Encrypt to JSON:
	  var iv = io.random(16);
	  var cipher = new AesCbc(key, iv);
	  var ciphertext = cipher.encrypt(raw); // BUG: requires a `Buffer`
	  return {
	    'encryptionType': 0,
	    'iv_hex': base16.stringify(iv),
	    'data_base64': base64.stringify(ciphertext)
	  }
	}

	function hmacSha256 (data, key) {
	  var hmac = hashjs.hmac(hashjs.sha256, key);
	  return hmac.update(data).digest()
	}

	/**
	 * Converts a promise-returning function into a Node-style function,
	 * but only an extra callback argument is actually passed in.
	 */
	function nodeify (f) {
	  return function () {
	    var rest = [], len = arguments.length;
	    while ( len-- ) rest[ len ] = arguments[ len ];

	    var promise = f.apply(this, rest);

	    // Figure out what to do with the promise:
	    var callback = rest[rest.length - 1];
	    if (f.length < rest.length && typeof callback === 'function') {
	      promise.then(function (reply) { return callback(null, reply); }).catch(function (e) { return callback(e); });
	    } else {
	      return promise
	    }
	  }
	}

	/**
	 * If the function f throws an error, return that as a rejected promise.
	 */
	function rejectify (f) {
	  return function () {
	    var rest = [], len = arguments.length;
	    while ( len-- ) rest[ len ] = arguments[ len ];

	    try {
	      return f.apply(this, rest)
	    } catch (e) {
	      return Promise.reject(e)
	    }
	  }
	}

	/**
	 * Prevents a function from running in parallel.
	 * The currently-running operation must finish before the new one starts.
	 */
	function serialize (f) {
	  var nextTask = Promise.resolve();
	  return function () {
	    var this$1 = this;
	    var rest = [], len = arguments.length;
	    while ( len-- ) rest[ len ] = arguments[ len ];

	    nextTask = nextTask.then(
	      function (win) { return f.apply(this$1, rest); },
	      function (fail) { return f.apply(this$1, rest); }
	    );
	    return nextTask
	  }
	}

	var userIdSnrp = {
	  'salt_hex': 'b5865ffb9fa7b3bfe4b2384d47ce831ee22a4a9d5c34c7ef7d21467cc758f81b',
	  'n': 16384,
	  'r': 1,
	  'p': 1
	};
	var passwordAuthSnrp = userIdSnrp;

	// Holds a `Promise` of an SRNP:
	var snrpCache = null;

	var timerNow = null;
	if (typeof window !== 'undefined' && window.performance) {
	  timerNow = function () {
	    return window.performance.now()
	  };
	} else {
	  timerNow = function () {
	    return Date.now()
	  };
	}

	/**
	 * @param data A string to hash.
	 * @param snrp A JSON SNRP structure.
	 * @return A promise for an object with the hash and elapsed time.
	 */
	var timeScrypt = serialize(function timeScrypt (data, snrp) {
	  var dklen = 32;
	  var salt = base16.parse(snrp.salt_hex);
	  if (typeof data === 'string') {
	    data = utf8.parse(data);
	  }
	  return new Promise(function (resolve, reject) {
	    var startTime = timerNow();
	    scryptJs(data, salt, snrp.n, snrp.r, snrp.p, dklen, function (error, progress, key) {
	      if (error) { return reject(error) }
	      if (key) {
	        return resolve({
	          hash: key,
	          time: timerNow() - startTime
	        })
	      }
	    });
	  })
	});

	function scrypt (data, snrp) {
	  return timeScrypt(data, snrp).then(function (value) { return value.hash; })
	}

	function calcSnrpForTarget (io, targetHashTimeMilliseconds) {
	  var snrp = {
	    'salt_hex': userIdSnrp.salt_hex,
	    'n': 16384,
	    'r': 1,
	    'p': 1
	  };

	  return timeScrypt('', snrp).then(function (value) {
	    var timeElapsed = value.time;
	    var estTargetTimeElapsed = timeElapsed;
	    var nUnPowered = 0;
	    var r = (targetHashTimeMilliseconds / estTargetTimeElapsed);
	    if (r > 8) {
	      snrp.r = 8;

	      estTargetTimeElapsed *= 8;
	      var n = (targetHashTimeMilliseconds / estTargetTimeElapsed);

	      if (n > 4) {
	        nUnPowered = 4;

	        estTargetTimeElapsed *= 4;
	        var p = (targetHashTimeMilliseconds / estTargetTimeElapsed);
	        snrp.p = Math.floor(p);
	      } else {
	        nUnPowered = Math.floor(n);
	      }
	    } else {
	      snrp.r = r > 4 ? Math.floor(r) : 4;
	    }
	    nUnPowered = nUnPowered >= 1 ? nUnPowered : 1;
	    snrp.n = Math.pow(2, nUnPowered + 13);

	    io.log.info(("snrp: " + (snrp.n) + " " + (snrp.r) + " " + (snrp.p) + " based on " + timeElapsed + "ms benchmark"));
	    return snrp
	  })
	}

	function makeSnrp (io) {
	  // Put the calculation in the cache if it isn't already started:
	  if (!snrpCache) {
	    snrpCache = calcSnrpForTarget(io, 2000);
	  }

	  // Return a copy of the timed version with a fresh salt:
	  return snrpCache.then(function (snrp) { return ({
	    'salt_hex': base16.stringify(io.random(32)),
	    'n': snrp.n,
	    'r': snrp.r,
	    'p': snrp.p
	  }); })
	}

	/**
	 * Wraps `LocalStorage` with a namespace and other extra goodies.
	 */
	function ScopedStorage (localStorage, prefix) {
	  this.localStorage = localStorage;
	  this.prefix = prefix + '.';
	}

	ScopedStorage.prototype.getItem = function (key) {
	  return this.localStorage.getItem(this.prefix + key)
	};

	ScopedStorage.prototype.setItem = function (key, value) {
	  return this.localStorage.setItem(this.prefix + key, value)
	};

	ScopedStorage.prototype.removeItem = function (key) {
	  return this.localStorage.removeItem(this.prefix + key)
	};

	ScopedStorage.prototype.getJson = function (key) {
	  var text = this.getItem(key);
	  return text == null ? null : JSON.parse(text)
	};

	ScopedStorage.prototype.setJson = function (key, value) {
	  return this.setItem(key, JSON.stringify(value))
	};

	ScopedStorage.prototype.subStore = function (prefix) {
	  return new ScopedStorage(this.localStorage, this.prefix + prefix)
	};

	ScopedStorage.prototype.keys = function () {
	  var this$1 = this;

	  var keys = [];
	  var search = new RegExp('^' + this.prefix);
	  for (var i = 0; i < this.localStorage.length; ++i) {
	    var key = this$1.localStorage.key(i);
	    if (search.test(key)) {
	      keys.push(key.replace(search, ''));
	    }
	  }
	  return keys
	};

	ScopedStorage.prototype.removeAll = function () {
	  var this$1 = this;

	  this.keys().forEach(function (key) {
	    this$1.removeItem(key);
	  });
	};

	ScopedStorage.prototype.setItems = function (items) {
	  var this$1 = this;

	  Object.keys(items).forEach(function (key) {
	    var item = items[key];
	    if (typeof item === 'string') {
	      this$1.setItem(key, item);
	    } else {
	      this$1.setJson(key, item);
	    }
	  });
	};

	/**
	 * Handles login data storage.
	 * TODO: Make all methods async!
	 */
	var LoginStore = function LoginStore (io) {
	  this.io = io;
	};

	/**
	 * Finds the userId for a particular username.
	 * TODO: Memoize this method.
	 */
	LoginStore.prototype.getUserId = function getUserId (username) {
	  var fixedName = fixUsername(username);
	  var users = this._loadUsers(this.io);
	  if (users[fixedName]) {
	    return Promise.resolve(base64.parse(users[fixedName]))
	  }
	  return scrypt(fixedName, userIdSnrp)
	};

	/**
	 * Loads the loginData matching the given query.
	 * For now, the query only supports the `username` property.
	 */
	LoginStore.prototype.find = function find (query) {
	  var fixedName = fixUsername(query.username);
	  var store = this._findUsername(fixedName);

	  return {
	    username: fixedName,

	    passwordAuthBox: store.getJson('passwordAuthBox'),
	    passwordBox: store.getJson('passwordBox'),
	    passwordKeySnrp: store.getJson('passwordKeySnrp'),

	    pin2Key: store.getItem('pin2Key'),
	    recovery2Key: store.getItem('recovery2Key'),

	    rootKeyBox: store.getJson('rootKeyBox'),
	    syncKeyBox: store.getJson('syncKeyBox'),
	    repos: store.getJson('repos') || []
	  }
	};

	/**
	 * Lists the usernames that have data in the store.
	 */
	LoginStore.prototype.listUsernames = function listUsernames () {
	  var users = this._loadUsers();
	  return Object.keys(users)
	};

	/**
	 * Removes any loginData matching the given query.
	 * For now, the query only supports the `username` property.
	 */
	LoginStore.prototype.remove = function remove (query) {
	  var fixedName = fixUsername(query.username);
	  this._findUsername(fixedName).removeAll();

	  var users = this._loadUsers();
	  delete users[fixedName];
	  this.io.localStorage.setItem('airbitz.users', JSON.stringify(users));
	};

	LoginStore.prototype.update = function update (userId, loginData) {
	  // Find the username:
	  var username;
	  var users = this._loadUsers();
	  if ('username' in loginData) {
	    username = loginData.username;

	    // Add the userId to the table, in case it's new:
	    users[username] = base64.stringify(userId);
	    this.io.localStorage.setItem('airbitz.users', JSON.stringify(users));
	  } else {
	    username = Object.keys(users).find(function (username) {
	      return users[username] === base64.stringify(userId)
	    });
	    if (!username) {
	      throw new Error('Cannot find userId')
	    }
	  }

	  // Actually save:
	  var store = this._findUsername(username);
	  return store.setItems(loginData)
	};

	LoginStore.prototype._findUsername = function _findUsername (username) {
	  var path = 'airbitz.user.' + fixUsername(username);
	  return new ScopedStorage(this.io.localStorage, path)
	};

	LoginStore.prototype._loadUsers = function _loadUsers () {
	  try {
	    var users = JSON.parse(this.io.localStorage.getItem('airbitz.users'));
	    return users || {}
	  } catch (e) {
	    return {}
	  }
	};

	/**
	 * Normalizes a username, and checks for invalid characters.
	 * TODO: Support a wider character range via Unicode normalization.
	 */
	function fixUsername (username) {
	  var out = username
	    .toLowerCase()
	    .replace(/[ \f\r\n\t\v]+/g, ' ')
	    .replace(/ $/, '')
	    .replace(/^ /, '');

	  for (var i = 0; i < out.length; ++i) {
	    var c = out.charCodeAt(i);
	    if (c < 0x20 || c > 0x7e) {
	      throw new Error('Bad characters in username')
	    }
	  }
	  return out
	}

	/**
	 * Creates a blank repo on the sync server.
	 */
	function repoCreate (io, login, keysJson) {
	  keysJson.dataKey = keysJson.dataKey || base16.stringify(io.random(32));
	  keysJson.syncKey = keysJson.syncKey || base16.stringify(io.random(20));

	  var request = {
	    'l1': base64.stringify(login.userId),
	    'lp1': base64.stringify(login.passwordAuth),
	    'repo_wallet_key': keysJson.syncKey
	  };
	  return io.authRequest('POST', '/v1/wallet/create', request).then(function (reply) { return keysJson; })
	}

	/**
	 * Marks a repo as being used.
	 * This should be called after the repo is securely attached
	 * to the login or account.
	 */
	function repoActivate (io, login, keysJson) {
	  var request = {
	    'l1': base64.stringify(login.userId),
	    'lp1': base64.stringify(login.passwordAuth),
	    'repo_wallet_key': keysJson.syncKey
	  };
	  return io.authRequest('POST', '/v1/wallet/activate', request).then(function (reply) { return null; })
	}

	/**
	 * Converts a login reply from the server into the local storage format.
	 */
	function makeLoginData (username, loginReply, dataKey) {
	  var out = {
	    username: fixUsername(username)
	  };

	  // Copy common items:
	  var keys = [
	    'passwordAuthBox', 'passwordBox', 'passwordKeySnrp',
	    'rootKeyBox', 'syncKeyBox', 'repos'
	  ];
	  keys.forEach(function (key) {
	    if (key in loginReply) {
	      out[key] = loginReply[key];
	    }
	  });

	  // Store the pin key unencrypted:
	  if (loginReply.pin2KeyBox != null) {
	    var pin2Key = decrypt(loginReply.pin2KeyBox, dataKey);
	    out.pin2Key = base58.stringify(pin2Key);
	  }

	  // Store the recovery key unencrypted:
	  if (loginReply.recovery2KeyBox != null) {
	    var recovery2Key = decrypt(loginReply.recovery2KeyBox, dataKey);
	    out.recovery2Key = base58.stringify(recovery2Key);
	  }

	  return out
	}

	/**
	 * Access to the logged-in user data.
	 *
	 * This type has following powers:
	 * - Access to the auth server
	 * - A list of account repos
	 * - The legacy BitID rootKey
	 */
	function Login (io, userId, dataKey, loginData) {
	  if (userId.length !== 32) {
	    throw new Error('userId must be a hash')
	  }

	  // Identity:
	  this.username = loginData.username;
	  this.userId = userId;
	  this.dataKey = dataKey;

	  // Return access to the server:
	  if (loginData.passwordAuthBox == null) {
	    throw new Error('Missing passwordAuthBox')
	  }
	  this.passwordAuth = decrypt(loginData.passwordAuthBox, dataKey);

	  // Legacy account repo:
	  if (loginData.syncKeyBox != null) {
	    this.syncKey = decrypt(loginData.syncKeyBox, dataKey);
	  }

	  // Legacy BitID key:
	  if (loginData.rootKeyBox != null) {
	    this.rootKey = decrypt(loginData.rootKeyBox, dataKey);
	  }

	  // TODO: Decrypt these:
	  this.repos = loginData.repos || [];

	  // Local keys:
	  if (loginData.pin2Key != null) {
	    this.pin2Key = base58.parse(loginData.pin2Key);
	  }
	  if (loginData.recovery2Key != null) {
	    this.recovery2Key = base58.parse(loginData.recovery2Key);
	  }
	}

	/**
	 * Returns a new login object, populated with data from the server.
	 */
	Login.online = function (io, username, userId, dataKey, loginReply) {
	  var loginData = makeLoginData(username, loginReply, dataKey);
	  io.loginStore.update(userId, loginData);

	  return new Login(io, userId, dataKey, loginData)
	};

	/**
	 * Returns a new login object, populated with data from the local storage.
	 */
	Login.offline = function (io, username, userId, dataKey) {
	  var loginData = io.loginStore.find({username: username});
	  var out = new Login(io, userId, dataKey, loginData);

	  // Try updating our locally-stored login data (failure is ok):
	  io
	    .authRequest('POST', '/v2/login', out.authJson())
	    .then(function (loginReply) {
	      var loginData = makeLoginData(username, loginReply, dataKey);
	      return io.loginStore.update(userId, loginData)
	    })
	    .catch(function (e) { return io.log.error(e); });

	  return out
	};

	/**
	 * Sets up a login v2 server authorization JSON.
	 */
	Login.prototype.authJson = function () {
	  return {
	    'userId': base64.stringify(this.userId),
	    'passwordAuth': base64.stringify(this.passwordAuth)
	  }
	};

	/**
	 * Searches for the given account type in the provided login object.
	 * Returns the repo keys in the JSON bundle format.
	 */
	Login.prototype.accountFind = function (type) {
	  var this$1 = this;

	  // Search the repos array:
	  for (var i = 0, list = this$1.repos; i < list.length; i += 1) {
	    var repo = list[i];

	    if (repo['type'] === type) {
	      var keysBox = repo['keysBox'] || repo['info'];
	      return JSON.parse(utf8.stringify(decrypt(keysBox, this$1.dataKey)))
	    }
	  }

	  // Handle the legacy Airbitz repo:
	  if (type === 'account:repo:co.airbitz.wallet') {
	    return {
	      'syncKey': base16.stringify(this.syncKey),
	      'dataKey': base16.stringify(this.dataKey)
	    }
	  }

	  throw new Error(("Cannot find a \"" + type + "\" repo"))
	};

	/**
	 * Creates and attaches new account repo.
	 */
	Login.prototype.accountCreate = function (io, type) {
	  var this$1 = this;

	  return repoCreate(io, this, {}).then(function (keysJson) {
	    return this$1.accountAttach(io, type, keysJson).then(function () {
	      return repoActivate(io, this$1, keysJson)
	    })
	  })
	};

	/**
	 * Attaches an account repo to the login.
	 */
	Login.prototype.accountAttach = function (io, type, info) {
	  var this$1 = this;

	  var infoBlob = utf8.parse(JSON.stringify(info));
	  var data = {
	    'type': type,
	    'info': encrypt(io, infoBlob, this.dataKey)
	  };

	  var request = this.authJson();
	  request['data'] = data;
	  return io.authRequest('POST', '/v2/login/repos', request).then(function (reply) {
	    this$1.repos.push(data);
	    io.loginStore.update(this$1.userId, {repos: this$1.repos});
	    return null
	  })
	};

	function makeHashInput (username, password) {
	  return fixUsername(username) + password
	}

	function loginOffline (io, username, userId, password) {
	  // Extract stuff from storage:
	  var loginData = io.loginStore.find({username: username});
	  var passwordKeySnrp = loginData.passwordKeySnrp;
	  var passwordBox = loginData.passwordBox;
	  if (!passwordKeySnrp || !passwordBox) {
	    throw new Error('Missing data for offline login')
	  }

	  // Decrypt the dataKey:
	  var up = makeHashInput(username, password);
	  return scrypt(up, passwordKeySnrp).then(function (passwordKey) {
	    var dataKey = decrypt(passwordBox, passwordKey);
	    return Login.offline(io, username, userId, dataKey)
	  })
	}

	function loginOnline (io, username, userId, password) {
	  var up = makeHashInput(username, password);
	  return scrypt(up, passwordAuthSnrp).then(function (passwordAuth) {
	    // Encode the username:
	    var request = {
	      'userId': base64.stringify(userId),
	      'passwordAuth': base64.stringify(passwordAuth)
	      // "otp": null
	    };
	    return io.authRequest('POST', '/v2/login', request).then(function (reply) {
	      // Password login:
	      var passwordKeySnrp = reply['passwordKeySnrp'];
	      var passwordBox = reply['passwordBox'];
	      if (!passwordKeySnrp || !passwordBox) {
	        throw new Error('Missing data for password login')
	      }

	      // Decrypt the dataKey:
	      return scrypt(up, passwordKeySnrp).then(function (passwordKey) {
	        var dataKey = decrypt(passwordBox, passwordKey);

	        // Build the login object:
	        return Login.online(io, username, userId, dataKey, reply)
	      })
	    })
	  })
	}

	/**
	 * Logs a user in using a password.
	 * @param username string
	 * @param password string
	 * @return `Login` object promise
	 */
	function login (io, username, password) {
	  return io.loginStore.getUserId(username).then(function (userId) {
	    // Race the two login methods, and let the fastest one win:
	    return rejectify(loginOffline)(io, username, userId, password).catch(function (e) { return rejectify(loginOnline)(io, username, userId, password); }
	    )
	  })
	}

	/**
	 * Returns true if the given password is correct.
	 */
	function check (io, login, password) {
	  // Derive passwordAuth:
	  return scrypt(login.username + password, passwordAuthSnrp).then(function (passwordAuth) {
	    // Compare what we derived with what we have:
	    for (var i = 0; i < passwordAuth.length; ++i) {
	      if (passwordAuth[i] !== login.passwordAuth[i]) {
	        return false
	      }
	    }
	    return true
	  })
	}

	/**
	 * Creates the data needed to set up the password on the server.
	 */
	function makeSetup (io, dataKey, username, password) {
	  var up = makeHashInput(username, password);

	  // dataKey chain:
	  var boxPromise = makeSnrp(io).then(function (passwordKeySnrp) {
	    return scrypt(up, passwordKeySnrp).then(function (passwordKey) {
	      var passwordBox = encrypt(io, dataKey, passwordKey);
	      return {passwordKeySnrp: passwordKeySnrp, passwordBox: passwordBox}
	    })
	  });

	  // authKey chain:
	  var authPromise = scrypt(up, passwordAuthSnrp).then(function (passwordAuth) {
	    var passwordAuthBox = encrypt(io, passwordAuth, dataKey);
	    return {passwordAuth: passwordAuth, passwordAuthBox: passwordAuthBox}
	  });

	  return Promise.all([boxPromise, authPromise]).then(function (values) {
	    var values_0 = values[0];
	    var passwordKeySnrp = values_0.passwordKeySnrp;
	    var passwordBox = values_0.passwordBox;
	    var values_1 = values[1];
	    var passwordAuth = values_1.passwordAuth;
	    var passwordAuthBox = values_1.passwordAuthBox;
	    return {
	      server: {
	        'passwordAuth': base64.stringify(passwordAuth),
	        'passwordAuthSnrp': passwordAuthSnrp, // TODO: Not needed
	        'passwordKeySnrp': passwordKeySnrp,
	        'passwordBox': passwordBox,
	        'passwordAuthBox': passwordAuthBox
	      },
	      storage: {
	        'passwordKeySnrp': passwordKeySnrp,
	        'passwordBox': passwordBox,
	        'passwordAuthBox': passwordAuthBox
	      },
	      passwordAuth: passwordAuth
	    }
	  })
	}

	/**
	 * Sets up a password for the login.
	 */
	function setup (io, login, password) {
	  return makeSetup(io, login.dataKey, login.username, password).then(function (setup) {
	    var request = login.authJson();
	    request['data'] = setup.server;
	    return io.authRequest('POST', '/v2/login/password', request).then(function (reply) {
	      io.loginStore.update(login.userId, setup.storage);
	      login.passwordAuth = setup.passwordAuth;
	      return null
	    })
	  })
	}

	function pin2Id (pin2Key, username) {
	  return hmacSha256(fixUsername(username), pin2Key)
	}

	function pin2Auth (pin2Key, pin) {
	  return hmacSha256(pin, pin2Key)
	}

	/**
	 * Returns a copy of the PIN login key if one exists on the local device.
	 */
	function getKey (io, username) {
	  var loginData = io.loginStore.find({username: username});
	  return loginData.pin2Key
	}

	/**
	 * Logs a user in using their PIN.
	 * @param username string
	 * @param pin2Key the recovery key, as a base58 string.
	 * @param pin the PIN, as a string.
	 * @param `Login` object promise
	 */
	function login$1 (io, pin2Key, username, pin) {
	  pin2Key = base58.parse(pin2Key);

	  var request = {
	    'pin2Id': base64.stringify(pin2Id(pin2Key, username)),
	    'pin2Auth': base64.stringify(pin2Auth(pin2Key, pin))
	    // "otp": null
	  };
	  return io.authRequest('POST', '/v2/login', request).then(function (reply) {
	    // PIN login:
	    var pin2Box = reply['pin2Box'];
	    if (!pin2Box) {
	      throw new Error('Missing data for PIN v2 login')
	    }

	    // Decrypt the dataKey:
	    var dataKey = decrypt(pin2Box, pin2Key);

	    // Build the login object:
	    return io.loginStore.getUserId(username).then(function (userId) {
	      return Login.online(io, username, userId, dataKey, reply)
	    })
	  })
	}

	/**
	 * Creates the data needed to set up a PIN on the account.
	 */
	function makeSetup$1 (io, login, pin) {
	  var pin2Key = login.pin2Key || io.random(32);

	  var pin2Box = encrypt(io, login.dataKey, pin2Key);
	  var pin2KeyBox = encrypt(io, pin2Key, login.dataKey);

	  return {
	    server: {
	      'pin2Id': base64.stringify(pin2Id(pin2Key, login.username)),
	      'pin2Auth': base64.stringify(pin2Auth(pin2Key, pin)),
	      'pin2Box': pin2Box,
	      'pin2KeyBox': pin2KeyBox
	    },
	    storage: {
	      'pin2Key': base58.stringify(pin2Key)
	    },
	    pin2Key: pin2Key
	  }
	}

	/**
	 * Sets up PIN login v2.
	 */
	function setup$1 (io, login, pin) {
	  var setup = makeSetup$1(io, login, pin);

	  var request = login.authJson();
	  request['data'] = setup.server;
	  return io.authRequest('POST', '/v2/login/pin2', request).then(function (reply) {
	    io.loginStore.update(login.userId, setup.storage);
	    return base58.stringify(setup.pin2Key)
	  })
	}

	function recovery2Id (recovery2Key, username) {
	  return hmacSha256(fixUsername(username), recovery2Key)
	}

	function recovery2Auth (recovery2Key, answers) {
	  return answers.map(function (answer) {
	    var data = utf8.parse(answer);
	    return base64.stringify(hmacSha256(data, recovery2Key))
	  })
	}

	/**
	 * Returns a copy of the recovery key if one exists on the local device.
	 */
	function getKey$1 (io, username) {
	  var loginData = io.loginStore.find({username: username});
	  return loginData.recovery2Key
	}

	/**
	 * Logs a user in using recovery answers.
	 * @param username string
	 * @param recovery2Key an ArrayBuffer recovery key
	 * @param array of answer strings
	 * @param `Login` object promise
	 */
	function login$2 (io, recovery2Key, username, answers) {
	  recovery2Key = base58.parse(recovery2Key);

	  var request = {
	    'recovery2Id': base64.stringify(recovery2Id(recovery2Key, username)),
	    'recovery2Auth': recovery2Auth(recovery2Key, answers)
	    // "otp": null
	  };
	  return io.authRequest('POST', '/v2/login', request).then(function (reply) {
	    // Recovery login:
	    var recovery2Box = reply['recovery2Box'];
	    if (recovery2Box == null) {
	      throw new Error('Missing data for recovery v2 login')
	    }

	    // Decrypt the dataKey:
	    var dataKey = decrypt(recovery2Box, recovery2Key);

	    // Build the login object:
	    return io.loginStore.getUserId(username).then(function (userId) {
	      return Login.online(io, username, userId, dataKey, reply)
	    })
	  })
	}

	/**
	 * Fetches the questions for a login
	 * @param username string
	 * @param recovery2Key an ArrayBuffer recovery key
	 * @param Question array promise
	 */
	function questions (io, recovery2Key, username) {
	  recovery2Key = base58.parse(recovery2Key);

	  var request = {
	    'recovery2Id': base64.stringify(recovery2Id(recovery2Key, username))
	    // "otp": null
	  };
	  return io.authRequest('POST', '/v2/login', request).then(function (reply) {
	    // Recovery login:
	    var question2Box = reply['question2Box'];
	    if (question2Box == null) {
	      throw new Error('Login has no recovery questions')
	    }

	    // Decrypt the questions:
	    var questions = decrypt(question2Box, recovery2Key);
	    return JSON.parse(utf8.stringify(questions))
	  })
	}

	/**
	 * Creates the data needed to set up recovery questions on the account.
	 */
	function makeSetup$2 (io, login, questions, answers) {
	  if (!(Object.prototype.toString.call(questions) === '[object Array]')) {
	    throw new TypeError('Questions must be an array of strings')
	  }
	  if (!(Object.prototype.toString.call(answers) === '[object Array]')) {
	    throw new TypeError('Answers must be an array of strings')
	  }

	  var recovery2Key = login.recovery2Key || io.random(32);

	  var question2Box = encrypt(io, utf8.parse(JSON.stringify(questions), 'utf8'), recovery2Key);
	  var recovery2Box = encrypt(io, login.dataKey, recovery2Key);
	  var recovery2KeyBox = encrypt(io, recovery2Key, login.dataKey);

	  return {
	    server: {
	      'recovery2Id': base64.stringify(recovery2Id(recovery2Key, login.username)),
	      'recovery2Auth': recovery2Auth(recovery2Key, answers),
	      'recovery2Box': recovery2Box,
	      'recovery2KeyBox': recovery2KeyBox,
	      'question2Box': question2Box
	    },
	    storage: {
	      'recovery2Key': base58.stringify(recovery2Key)
	    },
	    recovery2Key: recovery2Key
	  }
	}

	/**
	 * Sets up recovery questions for the login.
	 */
	function setup$2 (io, login, questions, answers) {
	  var setup = makeSetup$2(io, login, questions, answers);

	  var request = login.authJson();
	  request['data'] = setup.server;
	  return io.authRequest('POST', '/v2/login/recovery2', request).then(function (reply) {
	    io.loginStore.update(login.userId, setup.storage);
	    return base58.stringify(setup.recovery2Key)
	  })
	}

	var listRecoveryQuestionChoices = function listRecoveryQuestionChoices (io) {
	  return io.authRequest('POST', '/v1/questions', '')
	};

	var syncServers = [
	  'https://git-js.airbitz.co',
	  'https://git4-js.airbitz.co'
	];

	/**
	 * Fetches some resource from a sync server.
	 */
	function syncRequest (io, method, uri, body) {
	  return syncRequestInner(io, method, uri, body, 0)
	}

	function syncRequestInner (io, method, uri, body, serverIndex) {
	  uri = syncServers[serverIndex] + uri;
	  io.log.info(("sync: " + method + " " + uri));
	  var headers = {
	    method: method,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    }
	  };
	  if (method !== 'GET') {
	    headers.body = JSON.stringify(body);
	  }

	  return io.fetch(uri, headers).then(function (response) {
	    return response.json().catch(function (jsonError) {
	      throw new Error('Non-JSON reply, HTTP status ' + response.status)
	    })
	  }, function (networkError) {
	    if (serverIndex + 1 < syncServers.length) {
	      return syncRequestInner(io, method, uri, body, serverIndex + 1)
	    }
	    throw new Error('NetworkError: Could not connect to sync server')
	  })
	}

	/**
	 * Normalizes a path, returning its components as an array.
	 */
	function pathSplit (path) {
	  // TODO: Handle dots (escapes, `.`, and `..`).
	  return path.split('/')
	}

	/**
	 * Converts a server-format path to our internal format.
	 */
	function pathFix (path) {
	  if (path.slice(-5) !== '.json') {
	    return null
	  }
	  return pathSplit(path.slice(0, -5)).join('.')
	}

	/**
	 * This will merge a changeset into the local storage.
	 * This function ignores folder-level deletes and overwrites,
	 * but those can't happen under the current rules anyhow.
	 */
	function mergeChanges (store, changes) {
	  Object.keys(changes).forEach(function (key) {
	    var path = pathFix(key);
	    if (path != null) {
	      store.setJson(path, changes[key]);
	    }
	  });
	}

	/**
	 * Creates an ID string from a repo's dataKey.
	 */
	function repoId (dataKey) {
	  return base58.stringify(hmacSha256(dataKey, dataKey))
	}

	/**
	 * Creates a data storage and syncing object.
	 * The data inside the repo is encrypted with `dataKey`.
	 */
	function Repo (io, dataKey, syncKey) {
	  this.io = io;
	  this.dataKey = dataKey;
	  this.syncKey = syncKey;

	  var prefix = 'airbitz.repo.' + repoId(dataKey);
	  this.store = new ScopedStorage(io.localStorage, prefix);
	  this.changeStore = this.store.subStore('changes');
	  this.dataStore = this.store.subStore('data');
	}

	/**
	 * Creates a secure file name by hashing
	 * the provided binary data with the repo's dataKey.
	 */
	Repo.prototype.secureFilename = function (data) {
	  return base58.stringify(hmacSha256(data, this.dataKey))
	};

	/**
	 * Decrypts and returns the file at the given path.
	 * The return value will either be a byte buffer or null.
	 */
	Repo.prototype.getData = function (path) {
	  path = pathSplit(path).join('.');

	  var box =
	    this.changeStore.getJson(path) ||
	    this.dataStore.getJson(path);
	  return box ? decrypt(box, this.dataKey) : null
	};

	/**
	 * Decrypts and returns the file at the given path,
	 * treating the contents as text.
	 */
	Repo.prototype.getText = function (path) {
	  var data = this.getData(path);
	  if (data == null) {
	    return null
	  }
	  // Due to a legacy bug, some Airbitz data contains trailing nulls:
	  if (data.length && data[data.length - 1] === 0) {
	    data = data.slice(0, data.length - 1);
	  }
	  return utf8.stringify(data)
	};

	/**
	 * Decrypts and returns the file at the given path,
	 * treating the contents as JSON.
	 */
	Repo.prototype.getJson = function (path) {
	  var text = this.getText(path);
	  return text == null ? null : JSON.parse(text)
	};

	/**
	 * Lists the files (not folders) contained in the given path.
	 */
	Repo.prototype.keys = function (path) {
	  path = path ? pathSplit(path).join('.') + '.' : '';
	  var search = new RegExp('^' + path + '([^\\.]+)$');
	  function filter (key) {
	    return search.test(key)
	  }
	  function strip (key) {
	    return key.replace(search, '$1')
	  }

	  var changeKeys = this.changeStore.keys().filter(filter).map(strip);
	  var dataKeys = this.dataStore.keys().filter(filter).map(strip);
	  var keys = changeKeys.concat(dataKeys);

	  // Remove duplicates:
	  return keys.sort().filter(function (item, i, array) {
	    return !i || item !== array[i - 1]
	  })
	};

	/**
	 * Deletes a particular file path.
	 */
	Repo.prototype.removeItem = function (path) {
	  this.set(path, null);
	};

	/**
	 * Encrypts a value and saves it at the provided file path.
	 * The value must be either a byte buffer or null.
	 */
	Repo.prototype.setData = function (path, value) {
	  if (/\./.test(path)) {
	    throw new Error('Dots are not allowed in paths')
	  }
	  path += '.json';

	  var changes = {};
	  changes[path] = value ? encrypt(this.io, value, this.dataKey) : null;
	  mergeChanges(this.changeStore, changes);
	};

	/**
	 * Encrypts a text string and saves it as the provided file path.
	 */
	Repo.prototype.setText = function (path, value) {
	  return this.setData(path, utf8.parse(value))
	};

	/**
	 * Encrypts a JSON object and saves it as the provided file path.
	 */
	Repo.prototype.setJson = function (path, value) {
	  return this.setText(path, JSON.stringify(value))
	};

	/**
	 * Synchronizes the local store with the remote server.
	 */
	Repo.prototype.sync = function () {
	  var this$1 = this;

	  var self = this;

	  // If we have local changes, we need to bundle those:
	  var request = {};
	  var changeKeys = this.changeStore.keys();
	  if (changeKeys.length > 0) {
	    request.changes = {};
	    changeKeys.forEach(function (key) {
	      var path = key.replace(/\./g, '/') + '.json';
	      request.changes[path] = this$1.changeStore.getJson(key);
	    });
	  }

	  // Calculate the URI:
	  var uri = '/api/v2/store/' + base16.stringify(this.syncKey);
	  var lastHash = this.store.getItem('lastHash');
	  if (lastHash != null) {
	    uri = uri + '/' + lastHash;
	  }

	  // Make the request:
	  return syncRequest(this.io, request.changes ? 'POST' : 'GET', uri, request).then(function (reply) {
	    var changed = false;

	    // Delete any changed keys (since the upload is done):
	    changeKeys.forEach(function (key) {
	      self.changeStore.removeItem(key);
	    });

	    // Process the change list:
	    var changes = reply['changes'];
	    if (changes != null) {
	      if (Object.keys(changes).length > 0) {
	        changed = true;
	      }
	      mergeChanges(self.dataStore, changes);
	    }

	    // Save the current hash:
	    var hash = reply['hash'];
	    if (hash != null) {
	      self.store.setItem('lastHash', hash);
	    }

	    return changed
	  })
	};

	function Wallet (type, keysJson) {
	  this.type = type;
	  this.keys = keysJson;
	}

	function walletType (walletJson) {
	  return walletJson['type'] || 'wallet:repo:bitcoin:bip32'
	}

	function walletKeys (walletJson) {
	  return walletJson['keys'] || {
	    dataKey: walletJson['MK'],
	    syncKey: walletJson['SyncKey'],
	    bitcoinKey: walletJson['BitcoinSeed']
	  }
	}

	function walletId (walletJson) {
	  return repoId(base16.parse(walletKeys(walletJson)['dataKey']))
	}

	/**
	 * An list of wallets stored in a repo.
	 * Uses a write-through cache to avoid repeated encryption and decryption.
	 */
	function WalletList (repo, folder) {
	  this.folder = folder || 'Wallets';
	  this.repo = repo;

	  this.wallets = {};
	  this.load();
	}

	/**
	 * Loads the list of wallets into the cache.
	 */
	WalletList.prototype.load = function () {
	  var this$1 = this;

	  this.repo.keys(this.folder).forEach(function (key) {
	    var walletJson = this$1.repo.getJson(this$1.folder + '/' + key);
	    this$1.wallets[walletId(walletJson)] = walletJson;
	  });
	};

	/**
	 * Lists the wallets id's in the repo, sorted by index.
	 */
	WalletList.prototype.listIds = function () {
	  var this$1 = this;

	  // Load the ids and their sort indices:
	  var ids = [];
	  var indices = {};
	  Object.keys(this.wallets).forEach(function (id) {
	    ids.push(id);
	    indices[id] = this$1.wallets[id]['SortIndex'];
	  });

	  // Do the sort:
	  return ids.sort(function (a, b) {
	    return indices[a] < indices[b]
	  })
	};

	/**
	 * Returns the type of a particular wallet.
	 */
	WalletList.prototype.getType = function (id) {
	  var walletJson = this.wallets[id];
	  if (!walletJson) { throw new Error('No such wallet ' + id) }

	  return walletType(walletJson)
	};

	/**
	 * Obtains the keys JSON for a particular wallet.
	 */
	WalletList.prototype.getKeys = function (id) {
	  var walletJson = this.wallets[id];
	  if (!walletJson) { throw new Error('No such wallet ' + id) }

	  return walletKeys(walletJson)
	};

	/**
	 * Inserts a wallet into the list.
	 * @param type: The data type for the wallet, like 'wallet:repo:bitcoin.bip32'
	 * @param keys: A JSON object with arbitrary keys to the wallet.
	 * This will typically include `dataKey`, `syncKey`,
	 * and some type of crytpocurrency key.
	 */
	WalletList.prototype.addWallet = function (type, keysJson) {
	  var walletJson = {
	    'type': type,
	    'keys': keysJson,
	    'Archived': false,
	    'SortIndex': 0
	  };

	  var dataKey = base16.parse(keysJson['dataKey']);
	  var filename = this.repo.secureFilename(dataKey);
	  this.repo.setJson(this.folder + '/' + filename, walletJson);

	  var id = walletId(walletJson);
	  this.wallets[id] = walletJson;
	  return id
	};

	/**
	 * This is a thin shim object,
	 * which wraps the core implementation in a more OOP-style API.
	 */
	function Account (ctx, login$$1) {
	  this.io = ctx.io;
	  this.login = login$$1;
	  this.keys = login$$1.accountFind(ctx.accountType);
	  this.repoInfo = this.keys; // Deprecated name
	  this.loggedIn = true;
	  this.edgeLogin = false;
	  this.pinLogin = false;
	  this.passwordLogin = false;
	  this.newAccount = false;
	  this.recoveryLogin = false;
	  this.username = login$$1.username;

	  this.repo = new Repo(this.io, base16.parse(this.keys.dataKey), base16.parse(this.keys.syncKey));
	  this.walletList = new WalletList(this.repo);
	}

	Account.prototype.logout = function () {
	  this.login = null;
	  this.loggedIn = false;
	};

	Account.prototype.passwordOk = nodeify(function (password) {
	  return check(this.io, this.login, password)
	});
	Account.prototype.checkPassword = Account.prototype.passwordOk;

	Account.prototype.passwordSetup = nodeify(function (password) {
	  return setup(this.io, this.login, password)
	});
	Account.prototype.changePassword = Account.prototype.passwordSetup;

	Account.prototype.pinSetup = nodeify(function (pin) {
	  return setup$1(this.io, this.login, pin)
	});
	Account.prototype.changePIN = Account.prototype.pinSetup;

	Account.prototype.recovery2Set = nodeify(function (questions$$1, answers) {
	  return setup$2(this.io, this.login, questions$$1, answers)
	});

	Account.prototype.setupRecovery2Questions = Account.prototype.recovery2Set;

	Account.prototype.isLoggedIn = function () {
	  return this.loggedIn
	};

	Account.prototype.sync = nodeify(function () {
	  var this$1 = this;

	  return this.repo.sync().then(function (changed) {
	    if (changed) {
	      this$1.walletList.load();
	    }
	    return changed
	  })
	});

	Account.prototype.listWalletIds = function () {
	  return this.walletList.listIds()
	};

	Account.prototype.getWallet = function (id) {
	  return new Wallet(this.walletList.getType(id), this.walletList.getKeys(id))
	};

	/**
	 * Gets the first wallet in an account (the first by sort order).
	 * If type is a string, finds the first wallet with the same type.
	 * Might return null if there are no wallets.
	 */
	Account.prototype.getFirstWallet = function (type) {
	  var this$1 = this;

	  var id = this.walletList.listIds().find(
	    function (id) { return type == null || this$1.walletList.getType(id) === type; }
	  );
	  return id ? this.getWallet(id) : null
	};

	/**
	 * Creates a new wallet repo, and attaches it to the account.
	 * @param keysJson An object with any user-provided keys
	 * that should be stored along with the wallet. For example,
	 * Airbitz Bitcoin wallets would place their `bitcoinKey` here.
	 */
	Account.prototype.createWallet = nodeify(function (type, keysJson) {
	  var this$1 = this;

	  return repoCreate(this.io, this.login, keysJson).then(function (keysJson) {
	    var id = this$1.walletList.addWallet(type, keysJson);
	    return this$1.sync().then(function (dirty) {
	      return repoActivate(this$1.io, this$1.login, keysJson).then(function () { return id; })
	    })
	  })
	});

	/**
	 * Merges the keys from several objects into one.
	 * Can also be used to copy a single object.
	 */
	function mergeObjects () {
	  var args = [], len = arguments.length;
	  while ( len-- ) args[ len ] = arguments[ len ];

	  var out = {};

	  args.forEach(function (arg) {
	    Object.keys(arg).forEach(function (key) {
	      out[key] = arg[key];
	    });
	  });

	  return out
	}

	/**
	 * Determines whether or not a username is available.
	 */
	function usernameAvailable (io, username) {
	  return io.loginStore.getUserId(username).then(function (userId) {
	    var request = {
	      'l1': base64.stringify(userId)
	    };
	    return io.authRequest('POST', '/v1/account/available', request)
	  })
	}

	/**
	 * Creates a new login on the auth server.
	 */
	function create (io, username, password, opts) {
	  // Create account repo info:
	  var dataKey = io.random(32);
	  var syncKey = opts.syncKey || io.random(20);
	  var syncKeyBox = encrypt(io, syncKey, dataKey);

	  return Promise.all([
	    io.loginStore.getUserId(username),
	    makeSetup(io, dataKey, username, password)
	  ]).then(function (values) {
	    var userId = values[0];
	    var passwordSetup = values[1];

	    // Package:
	    var carePackage = {
	      'SNRP2': passwordSetup.server.passwordKeySnrp
	    };
	    var loginPackage = {
	      'EMK_LP2': passwordSetup.server.passwordBox,
	      'ESyncKey': syncKeyBox,
	      'ELP1': passwordSetup.server.passwordAuthBox
	    };
	    var request = {
	      'l1': base64.stringify(userId),
	      'lp1': passwordSetup.server.passwordAuth,
	      'care_package': JSON.stringify(carePackage),
	      'login_package': JSON.stringify(loginPackage),
	      'repo_account_key': base16.stringify(syncKey)
	    };
	    var loginData = mergeObjects({
	      username: fixUsername(username), syncKeyBox: syncKeyBox
	    }, passwordSetup.storage);

	    return io.authRequest('POST', '/v1/account/create', request).then(function (reply) {
	      // Cache everything for future logins:
	      io.loginStore.update(userId, loginData);

	      var login$$1 = Login.offline(io, username, userId, dataKey);

	      // Now activate:
	      var auth = login$$1.authJson();
	      var request = {
	        l1: auth.userId,
	        lp1: auth.passwordAuth
	      };
	      return io.authRequest('POST', '/v1/account/activate', request).then(function (reply) { return login$$1; })
	    })
	  })
	}

	var EllipticCurve = elliptic.ec;
	var secp256k1 = new EllipticCurve('secp256k1');

	function ABCEdgeLoginRequest (id) {
	  this.id = id;
	  this.done_ = false;
	}

	ABCEdgeLoginRequest.prototype.cancelRequest = function () {
	  this.done_ = true;
	};

	/**
	 * Creates a new login object, and attaches the account repo info to it.
	 */
	function createLogin (io, accountReply) {
	  var username = accountReply.username + '-' + base58.stringify(io.random(4));
	  var password = base58.stringify(io.random(24));
	  var pin = accountReply.pinString;

	  var opts = {};
	  if (accountReply.type === 'account:repo:co.airbitz.wallet') {
	    opts.syncKey = base16.parse(accountReply.info['syncKey']);
	  }

	  return create(io, username, password, opts).then(function (login$$1) {
	    return login$$1.accountAttach(io, accountReply.type, accountReply.info).then(function () {
	      if (typeof pin === 'string' && pin.length === 4) {
	        if (getKey(io, username) == null) {
	          return setup$1(io, login$$1, pin).then(function () { return login$$1; }, function () { return login$$1; })
	        }
	      }
	      return login$$1
	    })
	  })
	}

	/**
	 * Opens a lobby object to determine if it contains a resolved account request.
	 * Returns the account info if so, or null otherwise.
	 */
	function decodeAccountReply (keys, lobby) {
	  var accountRequest = lobby['accountRequest'];
	  var replyBox = accountRequest['replyBox'];
	  var replyKey = accountRequest['replyKey'];

	  // If the reply is missing, just return false:
	  if (replyBox == null || replyKey == null) {
	    return null
	  }

	  var replyPubkey = secp256k1.keyFromPublic(replyKey, 'hex').getPublic();
	  var secret = keys.derive(replyPubkey).toArray('be');
	  var dataKey = hmacSha256('dataKey', new Uint8Array(secret));
	  var reply = JSON.parse(utf8.stringify(decrypt(replyBox, dataKey)));

	  var returnObj = {
	    type: accountRequest['type'],
	    info: reply['keys'] || reply['info'],
	    username: reply['username']
	  };
	  if (typeof reply.pinString === 'string') {
	    returnObj.pinString = reply['pinString'];
	  }

	  return returnObj
	}

	/**
	 * Polls the lobby every second or so,
	 * looking for a reply to our account request.
	 */
	function pollServer (io, edgeLogin, keys, onLogin, onProcessLogin) {
	  // Don't do anything if the user has cancelled this request:
	  if (edgeLogin.done_) {
	    return
	  }

	  setTimeout(function () {
	    io.authRequest('GET', '/v2/lobby/' + edgeLogin.id, '').then(function (reply) {
	      var accountReply = decodeAccountReply(keys, reply);
	      if (accountReply == null) {
	        return pollServer(io, edgeLogin, keys, onLogin, onProcessLogin)
	      }
	      if (onProcessLogin != null) {
	        onProcessLogin(accountReply.username);
	      }
	      return createLogin(io, accountReply).then(
	        function (login$$1) { return onLogin(null, login$$1); }, function (e) { return onLogin(e); }
	      )
	    }).catch(function (e) {
	      return onLogin(e)
	    });
	  }, 1000);
	}

	/**
	 * Creates a new account request lobby on the server.
	 */
	function create$1 (io, opts) {
	  var keys = secp256k1.genKeyPair({entropy: io.random(32)});

	  var data = {
	    'accountRequest': {
	      'displayName': opts['displayName'] || '',
	      'requestKey': keys.getPublic().encodeCompressed('hex'),
	      'type': opts.type
	    }
	  };

	  if (typeof opts.displayImageUrl === 'string') {
	    data.accountRequest.displayImageUrl = opts.displayImageUrl;
	  } else {
	    data.accountRequest.displayImageUrl = '';
	  }

	  var request = {
	    'expires': 300,
	    'data': data
	  };

	  return io.authRequest('POST', '/v2/lobby', request).then(function (reply) {
	    var edgeLogin = new ABCEdgeLoginRequest(reply.id);
	    var onProcessLogin = null;
	    if (opts.onProcessLogin != null) {
	      onProcessLogin = opts.onProcessLogin;
	    }
	    pollServer(io, edgeLogin, keys, opts.onLogin, onProcessLogin);
	    return edgeLogin
	  })
	}

	/**
	 * @param opts An object containing optional arguments.
	 */
	function Context (io, opts) {
	  this.io = io;
	  this.accountType = opts.accountType || 'account:repo:co.airbitz.wallet';
	}

	Context.prototype.usernameList = function () {
	  return this.io.loginStore.listUsernames()
	};
	Context.prototype.listUsernames = Context.prototype.usernameList;

	Context.prototype.fixUsername = fixUsername;

	Context.prototype.removeUsername = function (username) {
	  this.io.loginStore.remove({username: username});
	};

	Context.prototype.usernameAvailable = nodeify(function (username) {
	  return usernameAvailable(this.io, username)
	});

	/**
	 * Creates a login, then creates and attaches an account to it.
	 */
	Context.prototype.createAccount = nodeify(function (username, password, pin) {
	  var this$1 = this;

	  return create(this.io, username, password, {}).then(function (login$$1) {
	    try {
	      login$$1.accountFind(this$1.accountType);
	    } catch (e) {
	      // If the login doesn't have the correct account type, add it first:
	      return login$$1.accountCreate(this$1.io, this$1.accountType).then(function () {
	        return setup$1(this$1.io, login$$1, pin).then(function () {
	          var account = new Account(this$1, login$$1);
	          account.newAccount = true;
	          return account.sync().then(function () { return account; })
	        })
	      })
	    }

	    // Otherwise, we have the correct account type, and can simply return:
	    return setup$1(this$1.io, login$$1, pin).then(function () {
	      var account = new Account(this$1, login$$1);
	      account.newAccount = true;
	      return account.sync().then(function () { return account; })
	    })
	  })
	});

	Context.prototype.loginWithPassword = nodeify(function (username, password, otp, opts) {
	  var this$1 = this;

	  return login(this.io, username, password).then(function (login$$1) {
	    var account = new Account(this$1, login$$1);
	    account.passwordLogin = true;
	    return account.sync().then(function () { return account; })
	  })
	});

	Context.prototype.pinExists = function (username) {
	  return getKey(this.io, username) != null
	};
	Context.prototype.pinLoginEnabled = function (username) {
	  return getKey(this.io, username) != null
	};

	Context.prototype.loginWithPIN = nodeify(function (username, pin) {
	  var this$1 = this;

	  var pin2Key = getKey(this.io, username);
	  if (pin2Key == null) {
	    throw new Error('No PIN set locally for this account')
	  }
	  return login$1(this.io, pin2Key, username, pin).then(function (login$$1) {
	    var account = new Account(this$1, login$$1);
	    account.pinLogin = true;
	    return account.sync().then(function () { return account; })
	  })
	});

	Context.prototype.getRecovery2Key = nodeify(function (username) {
	  var recovery2Key = getKey$1(this.io, username);
	  if (recovery2Key == null) {
	    return Promise.reject(new Error('No recovery key stored locally.'))
	  }
	  return Promise.resolve(recovery2Key)
	});

	Context.prototype.loginWithRecovery2 = nodeify(function (recovery2Key, username, answers, otp, options) {
	  var this$1 = this;

	  return login$2(this.io, recovery2Key, username, answers).then(function (login$$1) {
	    var account = new Account(this$1, login$$1);
	    account.recoveryLogin = true;
	    return account.sync().then(function () { return account; })
	  })
	});

	Context.prototype.fetchRecovery2Questions = nodeify(function (recovery2Key, username) {
	  return questions(this.io, recovery2Key, username)
	});

	Context.prototype.checkPasswordRules = function (password) {
	  var tooShort = password.length < 10;
	  var noNumber = password.match(/\d/) == null;
	  var noUpperCase = password.match(/[A-Z]/) == null;
	  var noLowerCase = password.match(/[a-z]/) == null;
	  var extraLong = password.length >= 16;

	  return {
	    'tooShort': tooShort,
	    'noNumber': noNumber,
	    'noUpperCase': noUpperCase,
	    'noLowerCase': noLowerCase,
	    'passed': extraLong || !(tooShort || noNumber || noUpperCase || noLowerCase)
	  }
	};

	Context.prototype.requestEdgeLogin = nodeify(function (opts) {
	  var this$1 = this;

	  var onLogin = opts.onLogin;
	  opts.onLogin = function (err, login$$1) {
	    if (err) { return onLogin(err) }
	    var account = new Account(this$1, login$$1);
	    account.edgeLogin = true;
	    account.sync().then(function (dirty) { return onLogin(null, account); }, function (err) { return onLogin(err); });
	  };
	  opts.type = opts.type || this.accountType;
	  return create$1(this.io, opts)
	});

	Context.prototype.listRecoveryQuestionChoices = nodeify(function () {
	  return listRecoveryQuestionChoices(this)
	});

	/*
	 * These are errors the core knows about.
	 *
	 * The GUI should handle these errors in an "intelligent" way, such as by
	 * displaying a localized error message or asking the user for more info.
	 * All these errors have a `type` field, which the GUI can use to select
	 * the appropriate response.
	 *
	 * Other errors are possible, of course, since the Javascript language
	 * itself can generate exceptions. Those errors won't have a `type` field,
	 * and the GUI should just show them with a stack trace & generic message,
	 * since the program has basically crashed at that point.
	 */

	/**
	 * Creates an error constructor with the given type and default message.
	 */
	function defineError (type, defaultMessage) {
	  var f = function ConstructError (message) {
	    var e = new Error(message || defaultMessage);
	    e.type = type;
	    return e
	  };
	  f.type = type;
	  return f
	}

	/**
	 * Could not reach the server at all.
	 */
	var NetworkError =
	  defineError('NetworkError', 'Cannot reach the network');

	/**
	 * The endpoint on the server is obsolete, and the app needs to be upgraded.
	 */
	var ObsoleteApiError =
	  defineError('ObsoleteApiError', 'The application is too old. Please upgrade.');

	/**
	 * Cannot find a login with that id.
	 *
	 * Reasons could include:
	 * - Password login: wrong username
	 * - PIN login: wrong PIN key
	 * - Recovery login: wrong username, or wrong recovery key
	 */
	var UsernameError =
	  defineError('UsernameError', 'Invaid username');

	/**
	 * The provided authentication is incorrect.
	 *
	 * Reasons could include:
	 * - Password login: wrong password
	 * - PIN login: wrong PIN
	 * - Recovery login: wrong answers
	 *
	 * The error object may include a `wait` member,
	 * which is the number of seconds the user must wait before trying again.
	 */
	function PasswordError (resultsJson, message) {
	  if ( resultsJson === void 0 ) resultsJson = {};

	  var e = new Error(message || 'Invalid password');
	  e.type = PasswordError.name;
	  e.wait = resultsJson['wait_seconds'];
	  return e
	}
	PasswordError.type = PasswordError.name;

	/**
	 * The OTP token was missing / incorrect.
	 *
	 * The error object should include a `resetToken` member,
	 * which can be used to reset OTP protection on the account.
	 *
	 * The error object may include a `resetDate` member,
	 * which indicates that an OTP reset is already pending,
	 * and when it will complete.
	 */
	function OtpError (resultsJson, message) {
	  if ( resultsJson === void 0 ) resultsJson = {};

	  var e = new Error(message || 'Invalid OTP token');
	  e.type = OtpError.name;
	  e.resetToken = resultsJson['otp_reset_auth'];
	  if (resultsJson.otp_timeout_date != null) {
	    e.resetDate = new Date(resultsJson.otp_timeout_date);
	  }
	  return e
	}
	OtpError.type = OtpError.name;

	/**
	 * Waits for the first successful promise.
	 * If no promise succeeds, returns the last failure.
	 */


	/**
	 * If the promise doesn't resolve in the given time,
	 * reject it with the provided error, or a generic error if none is provided.
	 */
	function timeout (promise, ms, error) {
	  error = error || new Error(("Timeout of " + ms + "ms exceeded"));
	  return Promise.race([
	    promise,
	    new Promise(function (resolve, reject) {
	      var timer = setTimeout(function () { return reject(error); }, ms);
	      var onDone = function () { return clearTimeout(timer); };
	      promise.then(onDone, onDone);
	    })
	  ])
	}

	var serverRoot = 'https://auth.airbitz.co/api';
	// const serverRoot = 'https://test-auth.airbitz.co/api'

	function parseReply (json) {
	  switch (json['status_code']) {
	    case 0: // Success
	      return json['results']

	    case 2: // Account exists
	      throw new UsernameError('Account already exists on server')

	    case 3: // Account does not exist
	      throw new UsernameError('Account does not exist on server')

	    case 4: // Invalid password
	    case 5: // Invalid answers
	      throw new PasswordError(json['results'])

	    case 6: // Invalid API key
	      throw new Error('Invalid API key')

	    case 8: // Invalid OTP
	      throw new OtpError(json['results'])

	    case 1000: // Endpoint obsolete
	      throw new ObsoleteApiError()

	    case 1: // Error
	    case 7: // Pin expired
	    default:
	      var message = json['message'] || json['detail'] || JSON.stringify(json);
	      throw new Error(("Server error: " + message))
	  }
	}

	var AuthServer = function AuthServer (io, apiKey) {
	  // if (!apiKey) throw new TypeError('No API key provided')

	  this.io = io;
	  this.apiKey = apiKey;
	};

	/**
	 * Wraps the raw `fetch` API with the headers and error processing needed
	 * to talk to the auth server.
	 * @param body JSON object to send
	 * @return a promise of the server's JSON reply
	 */
	AuthServer.prototype.request = function request (method, uri, body) {
	  var opts = {
	    method: method,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	      'Authorization': 'Token ' + this.apiKey
	    }
	  };
	  if (method !== 'GET') {
	    opts.body = JSON.stringify(body);
	  }

	  this.io.log.info(("auth: " + method + " " + uri));
	  return timeout(this.io.fetch(serverRoot + uri, opts).then(function (response) {
	    return response.json().then(parseReply, function (jsonError) {
	      throw new Error('Non-JSON reply, HTTP status ' + response.status)
	    })
	  }, function (networkError) {
	    throw new NetworkError('Could not reach the auth server')
	  }), 10000, new NetworkError('Could not reach the auth server: timeout'))
	};

	/**
	 * Constructs an object containing the io resources used in this library,
	 * along with the wrappers and caches needed to make use of them.
	 */
	var IoContext = function IoContext (nativeIo, opts) {
	  var this$1 = this;
	  if ( opts === void 0 ) opts = {};

	  // Copy native io resources:
	  var keys = ['console', 'fetch', 'localStorage', 'random'];
	  keys.forEach(function (key) {
	    if (opts[key] != null) {
	      this$1[key] = opts[key];
	    } else if (nativeIo[key] != null) {
	      this$1[key] = nativeIo[key];
	    } else {
	      throw new Error(("Could not find \"" + key + "\" in the environment"))
	    }
	  });

	  // Set up wrapper objects:
	  this.authServer = new AuthServer(this, opts.apiKey);
	  this.log = this.console;
	  this.loginStore = new LoginStore(this);
	};

	IoContext.prototype.authRequest = function authRequest () {
	    var rest = [], len = arguments.length;
	    while ( len-- ) rest[ len ] = arguments[ len ];

	  return (ref = this.authServer).request.apply(ref, rest)
	    var ref;
	};

	/**
	 * Extracts the io functions we need from the browser.
	 */
	function makeBrowserIo (opts) {
	  if ( opts === void 0 ) opts = {};

	  var native = {};

	  if (typeof console !== 'undefined') {
	    native.console = console;
	  }

	  if (typeof window !== 'undefined') {
	    native.fetch = function () {
	      var rest = [], len = arguments.length;
	      while ( len-- ) rest[ len ] = arguments[ len ];

	      return window.fetch.apply(window, rest);
	    };
	    native.localStorage = window.localStorage;

	    if (window.crypto != null && window.crypto.getRandomValues != null) {
	      native.random = function (size) {
	        var out = new Uint8Array(size);
	        window.crypto.getRandomValues(out);
	        return out
	      };
	    }
	  }

	  return new IoContext(native, opts)
	}

	var routes = [];

	/**
	 * Wires one or more handlers into the routing table.
	 */
	function addRoute (method, path) {
	  var handlers = [], len = arguments.length - 2;
	  while ( len-- > 0 ) handlers[ len ] = arguments[ len + 2 ];

	  handlers.forEach(function (handler) {
	    routes.push({
	      method: method,
	      path: new RegExp(("^" + path + "$")),
	      handler: handler
	    });
	  });
	}

	/**
	 * Finds all matching handlers in the routing table.
	 */
	function findRoute (method, path) {
	  return routes.filter(function (route) {
	    return route.method === method && route.path.test(path)
	  }).map(function (route) { return route.handler; })
	}

	var errorCodes = {
	  success: 0,
	  error: 1,
	  accountExists: 2,
	  noAccount: 3,
	  invalidPassword: 4,
	  invalidAnswers: 5,
	  invalidApiKey: 6,
	  invalidOtp: 8,
	  conflict: 10,
	  obsolete: 1000
	};

	var FakeResponse = function FakeResponse (body, opts) {
	  if ( body === void 0 ) body = '';
	  if ( opts === void 0 ) opts = {};

	  this.body = body;
	  this.status = opts.status || 200;
	  this.statusText = opts.statusText || 'OK';
	  this.ok = this.status >= 200 && this.status < 300;
	};

	FakeResponse.prototype.json = function json () {
	  try {
	    return Promise.resolve(JSON.parse(this.body))
	  } catch (e) {
	    return Promise.reject(e)
	  }
	};

	FakeResponse.prototype.text = function text () {
	  return Promise.resolve(this.body)
	};

	function makeResponse (results) {
	  var reply = {
	    'status_code': 0
	  };
	  if (results != null) {
	    reply['results'] = results;
	  }
	  return new FakeResponse(JSON.stringify(reply))
	}

	function makeErrorResponse (code, message, status) {
	  if ( message === void 0 ) message = '';
	  if ( status === void 0 ) status = 500;

	  var body = {
	    status_code: code,
	    message: message || 'Server error'
	  };
	  return new FakeResponse(JSON.stringify(body), {status: status})
	}

	// Authentication middleware: ----------------------------------------------

	/**
	 * Verifies that the request contains valid v1 authenticaion.
	 */
	function authHandler1 (req) {
	  // Password login:
	  if (req.body.l1 != null && req.body.lp1 != null) {
	    if (req.body.l1 !== this.db.userId) {
	      return makeErrorResponse(errorCodes.noAccount)
	    }
	    if (req.body.lp1 !== this.db.passwordAuth) {
	      return makeErrorResponse(errorCodes.invalidPassword)
	    }
	    return null
	  }
	  return makeErrorResponse(errorCodes.error)
	}

	/**
	 * Verifies that the request contains valid v2 authenticaion.
	 */
	function authHandler (req) {
	  // Password login:
	  if (req.body.userId != null && req.body.passwordAuth != null) {
	    if (req.body.userId !== this.db.userId) {
	      return makeErrorResponse(errorCodes.noAccount)
	    }
	    if (req.body.passwordAuth !== this.db.passwordAuth) {
	      return makeErrorResponse(errorCodes.invalidPassword)
	    }
	    return null
	  }

	  // PIN2 login:
	  if (req.body.pin2Id != null && req.body.pin2Auth != null) {
	    if (req.body.pin2Id !== this.db.pin2Id) {
	      return makeErrorResponse(errorCodes.noAccount)
	    }
	    if (req.body.pin2Auth !== this.db.pin2Auth) {
	      return makeErrorResponse(errorCodes.invalidPassword)
	    }
	    return null
	  }

	  // Recovery2 login:
	  if (req.body.recovery2Id != null && req.body.recovery2Auth != null) {
	    if (req.body.recovery2Id !== this.db.recovery2Id) {
	      return makeErrorResponse(errorCodes.noAccount)
	    }
	    var serverAuth = this.db.recovery2Auth;
	    var clientAuth = req.body.recovery2Auth;
	    if (clientAuth.length !== serverAuth.length) {
	      return makeErrorResponse(errorCodes.invalidAnswers)
	    }
	    for (var i = 0; i < clientAuth.length; ++i) {
	      if (clientAuth[i] !== serverAuth[i]) {
	        return makeErrorResponse(errorCodes.invalidAnswers)
	      }
	    }
	    return null
	  }
	  return makeErrorResponse(errorCodes.error)
	}

	// Account lifetime v1: ----------------------------------------------------

	addRoute('POST', '/api/v1/account/available', function (req) {
	  if (req.body.l1 != null && req.body.l1 === this.db.userId) {
	    return makeErrorResponse(errorCodes.accountExists)
	  }
	  return makeResponse()
	});

	addRoute('POST', '/api/v1/account/create', function (req) {
	  this.db.userId = req.body['l1'];
	  this.db.passwordAuth = req.body['lp1'];

	  var carePackage = JSON.parse(req.body['care_package']);
	  this.db.passwordKeySnrp = carePackage['SNRP2'];

	  var loginPackage = JSON.parse(req.body['login_package']);
	  this.db.passwordAuthBox = loginPackage['ELP1'];
	  this.db.passwordBox = loginPackage['EMK_LP2'];
	  this.db.syncKeyBox = loginPackage['ESyncKey'];
	  this.repos[req.body['repo_account_key']] = {};

	  return makeResponse()
	});

	addRoute('POST', '/api/v1/account/activate', authHandler1, function (req) {
	  return makeResponse()
	});

	// Login v1: ---------------------------------------------------------------

	addRoute('POST', '/api/v1/account/carepackage/get', function (req) {
	  if (req.body.l1 == null || req.body.l1 !== this.db.userId) {
	    return makeErrorResponse(errorCodes.noAccount)
	  }

	  return makeResponse({
	    'care_package': JSON.stringify({
	      'SNRP2': this.db.passwordKeySnrp
	    })
	  })
	});

	addRoute('POST', '/api/v1/account/loginpackage/get', authHandler1, function (req) {
	  var results = {
	    'login_package': JSON.stringify({
	      'ELP1': this.db.passwordAuthBox,
	      'EMK_LP2': this.db.passwordBox,
	      'ESyncKey': this.db.syncKeyBox
	    })
	  };
	  if (this.db.rootKeyBox != null) {
	    results['rootKeyBox'] = this.db.rootKeyBox;
	  }
	  return makeResponse(results)
	});

	// PIN login v1: -----------------------------------------------------------

	addRoute('POST', '/api/v1/account/pinpackage/update', authHandler1, function (req) {
	  this.db.pinKeyBox = JSON.parse(req.body['pin_package']);
	  return makeResponse()
	});

	addRoute('POST', '/api/v1/account/pinpackage/get', function (req) {
	  if (this.db.pinKeyBox == null) {
	    return makeErrorResponse(errorCodes.noAccount)
	  }
	  return makeResponse({
	    'pin_package': JSON.stringify(this.db.pinKeyBox)
	  })
	});

	// Repo server v1: ---------------------------------------------------------

	addRoute('POST', '/api/v1/wallet/create', authHandler1, function (req) {
	  this.repos[req.body['repo_wallet_key']] = {};
	  return makeResponse()
	});

	addRoute('POST', '/api/v1/wallet/activate', authHandler1, function (req) {
	  return makeResponse()
	});

	// login v2: ---------------------------------------------------------------

	addRoute('POST', '/api/v2/login', function (req) {
	  if (req.body.recovery2Id != null && req.body.recovery2Auth == null) {
	    if (req.body.recovery2Id !== this.db.recovery2Id) {
	      return makeErrorResponse(errorCodes.noAccount)
	    }
	    return makeResponse({
	      'question2Box': this.db.question2Box
	    })
	  }
	  return null
	}, authHandler, function (req) {
	  var this$1 = this;

	  var results = {};
	  var keys = [
	    'passwordAuthBox',
	    'passwordBox',
	    'passwordKeySnrp',
	    'pin2Box',
	    'pin2KeyBox',
	    'recovery2Box',
	    'recovery2KeyBox',
	    'rootKeyBox',
	    'syncKeyBox',
	    'repos'
	  ];
	  keys.forEach(function (key) {
	    if (key in this$1.db) {
	      results[key] = this$1.db[key];
	    }
	  });
	  return makeResponse(results)
	});

	addRoute('POST', '/api/v2/login/create', function (req) {
	  var this$1 = this;

	  var data = req.body['data'];

	  // Set up repos:
	  if (data.newSyncKeys != null) {
	    data.newSyncKeys.forEach(function (syncKey) {
	      this$1.repos[syncKey] = {};
	    });
	  }

	  // Set up login object:
	  var keys = [
	    'userId',
	    'passwordAuth',
	    'passwordAuthBox',
	    'passwordBox',
	    'passwordKeySnrp',
	    'pin2Auth',
	    'pin2Box',
	    'pin2Id',
	    'pin2KeyBox',
	    'question2Box',
	    'recovery2Auth',
	    'recovery2Box',
	    'recovery2Id',
	    'recovery2KeyBox',
	    'rootKeyBox',
	    'syncKeyBox',
	    'repos'
	  ];
	  keys.forEach(function (key) {
	    if (key in data) {
	      this$1.db[key] = data[key];
	    }
	  });

	  return makeResponse()
	});

	addRoute('POST', '/api/v2/login/password', authHandler, function (req) {
	  var data = req.body['data'];
	  if (data.passwordAuth == null || data.passwordKeySnrp == null ||
	      data.passwordBox == null || data.passwordAuthBox == null) {
	    return makeErrorResponse(errorCodes.error)
	  }

	  this.db.passwordAuth = data['passwordAuth'];
	  this.db.passwordKeySnrp = data['passwordKeySnrp'];
	  this.db.passwordBox = data['passwordBox'];
	  this.db.passwordAuthBox = data['passwordAuthBox'];

	  return makeResponse()
	});

	addRoute('POST', '/api/v2/login/pin2', authHandler, function (req) {
	  var data = req.body['data'];
	  if (data.pin2Id == null || data.pin2Auth == null ||
	      data.pin2Box == null || data.pin2KeyBox == null) {
	    return makeErrorResponse(errorCodes.error)
	  }

	  this.db.pin2Id = data['pin2Id'];
	  this.db.pin2Auth = data['pin2Auth'];
	  this.db.pin2Box = data['pin2Box'];
	  this.db.pin2KeyBox = data['pin2KeyBox'];

	  return makeResponse()
	});

	addRoute('POST', '/api/v2/login/recovery2', authHandler, function (req) {
	  var data = req.body['data'];
	  if (data.recovery2Id == null || data.recovery2Auth == null ||
	      data.question2Box == null || data.recovery2Box == null ||
	      data.recovery2KeyBox == null) {
	    return makeErrorResponse(errorCodes.error)
	  }

	  this.db.recovery2Id = data['recovery2Id'];
	  this.db.recovery2Auth = data['recovery2Auth'];
	  this.db.question2Box = data['question2Box'];
	  this.db.recovery2Box = data['recovery2Box'];
	  this.db.recovery2KeyBox = data['recovery2KeyBox'];

	  return makeResponse()
	});

	addRoute('POST', '/api/v2/login/repos', authHandler, function (req) {
	  var data = req.body['data'];
	  if (data.type == null || data.info == null) {
	    return makeErrorResponse(errorCodes.error)
	  }

	  if (this.db.repos != null) {
	    this.db.repos.push(data);
	  } else {
	    this.db.repos = [data];
	  }

	  return makeResponse()
	});

	// lobby: ------------------------------------------------------------------

	addRoute('POST', '/api/v2/lobby', function (req) {
	  this.db.lobby = req.body['data'];
	  return makeResponse({
	    'id': 'IMEDGELOGIN'
	  })
	});

	addRoute('GET', '/api/v2/lobby/IMEDGELOGIN', function (req) {
	  return makeResponse(this.db.lobby)
	});

	addRoute('PUT', '/api/v2/lobby/IMEDGELOGIN', function (req) {
	  this.db.lobby = req.body['data'];
	  return makeResponse()
	});

	// sync: -------------------------------------------------------------------

	function storeRoute (req) {
	  var elements = req.path.split('/');
	  var syncKey = elements[4];
	  // const hash = elements[5]

	  var repo = this.repos[syncKey];
	  if (repo == null) {
	    return new FakeResponse('Cannot find repo ' + syncKey, {status: 404})
	  }

	  switch (req.method) {
	    case 'POST':
	      var changes = req.body['changes'];
	      Object.keys(changes).forEach(function (change) {
	        repo[change] = changes[change];
	      });
	      return new FakeResponse(JSON.stringify({
	        'changes': changes,
	        'hash': '1111111111111111111111111111111111111111'
	      }))

	    case 'GET':
	      return new FakeResponse(JSON.stringify({'changes': repo}))
	  }
	}

	addRoute('GET', '/api/v2/store/.*', storeRoute);
	addRoute('POST', '/api/v2/store/.*', storeRoute);

	/**
	 * Emulates the Airbitz login server.
	 */
	var FakeServer = function FakeServer () {
	  var this$1 = this;

	  this.db = {};
	  this.repos = {};
	  this.fetch = function (uri, opts) {
	    if ( opts === void 0 ) opts = {};

	    try {
	      return Promise.resolve(this$1.request(uri, opts))
	    } catch (e) {
	      return Promise.reject(e)
	    }
	  };
	};

	FakeServer.prototype.request = function request (uri, opts) {
	    var this$1 = this;

	  var req = {
	    method: opts.method || 'GET',
	    body: opts.body ? JSON.parse(opts.body) : null,
	    path: url.parse(uri).pathname
	  };

	  var handlers = findRoute(req.method, req.path);
	  for (var i = 0, list = handlers; i < list.length; i += 1) {
	    var handler = list[i];

	      var out = handler.call(this$1, req);
	    if (out != null) {
	      return out
	    }
	  }
	  return makeErrorResponse(errorCodes.error, ("Unknown API endpoint " + (req.path)), 404)
	};

	/**
	 * Emulates the `localStorage` browser API.
	 */
	function FakeStorage () {
	  this.items = {};
	}
	FakeStorage.prototype.getItem = function (key) {
	  return key in this.items ? this.items[key] : null
	};
	FakeStorage.prototype.setItem = function (key, value) {
	  this.items[key] = value;
	};
	FakeStorage.prototype.removeItem = function (key) {
	  delete this.items[key];
	};
	FakeStorage.prototype.key = function (n) {
	  return Object.keys(this.items)[n]
	};
	Object.defineProperty(FakeStorage.prototype, 'length', {
	  get: function () {
	    return Object.keys(this.items).length
	  }
	});

	/**
	 * Empties the `FakeStorage` instance.
	 */
	FakeStorage.prototype.clear = function () {
	  this.items = {};
	};

	/**
	 * Silences all logging.
	 */
	var fakeConsole = {
	  info: function () {},
	  warn: function () {},
	  error: function () {}
	};

	/**
	 * Generates deterministic "random" data for unit-testing.
	 */
	function fakeRandom (bytes) {
	  var out = [];
	  var x = 0;
	  for (var i = 0; i < bytes; ++i) {
	    // Simplest numbers that give a full-period generator with
	    // a good mix of high & low values within the first few bytes:
	    x = ((5 * x) + 3) & 0xff;
	    out[i] = x;
	  }
	  return out
	}

	/**
	 * Creates an array of io context objects.
	 * Each object has its own storage, but all contexts share a server.
	 * @param {number} count number of io contexts to create
	 */
	function makeFakeIos (count, opts) {
	  if ( opts === void 0 ) opts = {};

	  // The common server used by all contexts:
	  var server = new FakeServer();

	  // Make the io objects:
	  var out = [];
	  for (var i = 0; i < count; ++i) {
	    var native = {
	      console: fakeConsole,
	      fetch: server.fetch,
	      localStorage: new FakeStorage(),
	      random: fakeRandom
	    };
	    out[i] = new IoContext(native, opts);
	  }

	  return out
	}

	function makeNodeIo (path, opts) {
	  if ( opts === void 0 ) opts = {};

	  var native = {
	    console: console,
	    fetch: fetch,
	    localStorage: new nodeLocalstorage.LocalStorage(path),
	    random: function (bytes) { return crypto.randomBytes(bytes); }
	  };

	  return new IoContext(native, opts)
	}

	/**
	 * ABCConditionCode
	 * Error codes for ABCError object
	 */

	var abcc = {
	  ABCConditionCodeOk: 0,
	  ABCConditionCodeError: 1,
	  ABCConditionCodeNULLPtr: 2,
	  ABCConditionCodeNoAvailAccountSpace: 3,
	  ABCConditionCodeDirReadError: 4,
	  ABCConditionCodeFileOpenError: 5,
	  ABCConditionCodeFileReadError: 6,
	  ABCConditionCodeFileWriteError: 7,
	  ABCConditionCodeFileDoesNotExist: 8,
	  ABCConditionCodeUnknownCryptoType: 9,
	  ABCConditionCodeInvalidCryptoType: 10,
	  ABCConditionCodeDecryptError: 11,
	  ABCConditionCodeDecryptFailure: 12,
	  ABCConditionCodeEncryptError: 13,
	  ABCConditionCodeScryptError: 14,
	  ABCConditionCodeAccountAlreadyExists: 15,
	  ABCConditionCodeAccountDoesNotExist: 16,
	  ABCConditionCodeJSONError: 17,
	  ABCConditionCodeBadPassword: 18,
	  ABCConditionCodeWalletAlreadyExists: 19,
	  ABCConditionCodeURLError: 20,
	  ABCConditionCodeSysError: 21,
	  ABCConditionCodeNotInitialized: 22,
	  ABCConditionCodeReinitialization: 23,
	  ABCConditionCodeServerError: 24,
	  ABCConditionCodeNoRecoveryQuestions: 25,
	  ABCConditionCodeNotSupported: 26,
	  ABCConditionCodeMutexError: 27,
	  ABCConditionCodeNoTransaction: 28,
	  ABCConditionCodeEmpty_Wallet: 28,
	  ABCConditionCodeParseError: 29,
	  ABCConditionCodeInvalidWalletID: 30,
	  ABCConditionCodeNoRequest: 31,
	  ABCConditionCodeInsufficientFunds: 32,
	  ABCConditionCodeSynchronizing: 33,
	  ABCConditionCodeNonNumericPin: 34,
	  ABCConditionCodeNoAvailableAddress: 35,
	  ABCConditionCodeInvalidPinWait: 36,
	  ABCConditionCodePinExpired: 36,
	  ABCConditionCodeInvalidOTP: 37,
	  ABCConditionCodeSpendDust: 38,
	  ABCConditionCodeObsolete: 1000
	};

	/**
	 * ABCError
	 *
	 * Error structure returned in all ABC callbacks
	 *   code: ABCConditionCode
	 *   message: Error message
	 *   message2 (optional):
	 *   message3 (optional):
	 */

	function errorMap (cc) {
	  if (cc === abcc.ABCConditionCodeOk) { return 'The function completed without an error' }
	  if (cc === abcc.ABCConditionCodeError) { return 'An error occured' }
	  if (cc === abcc.ABCConditionCodeNULLPtr) { return 'Unexpected NULL pointer' }
	  if (cc === abcc.ABCConditionCodeNoAvailAccountSpace) { return 'Max number of accounts have been created' }
	  if (cc === abcc.ABCConditionCodeDirReadError) { return 'Could not read directory' }
	  if (cc === abcc.ABCConditionCodeFileOpenError) { return 'Could not open file' }
	  if (cc === abcc.ABCConditionCodeFileReadError) { return 'Could not read from file' }
	  if (cc === abcc.ABCConditionCodeFileWriteError) { return 'Could not write to file' }
	  if (cc === abcc.ABCConditionCodeFileDoesNotExist) { return 'No such file' }
	  if (cc === abcc.ABCConditionCodeUnknownCryptoType) { return 'Unknown crypto type' }
	  if (cc === abcc.ABCConditionCodeInvalidCryptoType) { return 'Invalid crypto type' }
	  if (cc === abcc.ABCConditionCodeDecryptError) { return 'Decryption error' }
	  if (cc === abcc.ABCConditionCodeDecryptFailure) { return 'Decryption failure due to incorrect key' }
	  if (cc === abcc.ABCConditionCodeEncryptError) { return 'Encryption error' }
	  if (cc === abcc.ABCConditionCodeScryptError) { return 'Scrypt error' }
	  if (cc === abcc.ABCConditionCodeAccountAlreadyExists) { return 'Account already exists' }
	  if (cc === abcc.ABCConditionCodeAccountDoesNotExist) { return 'Account does not exist' }
	  if (cc === abcc.ABCConditionCodeJSONError) { return 'JSON parsing error' }
	  if (cc === abcc.ABCConditionCodeBadPassword) { return 'Incorrect password' }
	  if (cc === abcc.ABCConditionCodeWalletAlreadyExists) { return 'Wallet already exists' }
	  if (cc === abcc.ABCConditionCodeURLError) { return 'URL call failure' }
	  if (cc === abcc.ABCConditionCodeSysError) { return 'An call to an external API failed' }
	  if (cc === abcc.ABCConditionCodeNotInitialized) { return 'No required initialization made' }
	  if (cc === abcc.ABCConditionCodeReinitialization) { return 'Initialization after already initializing' }
	  if (cc === abcc.ABCConditionCodeServerError) { return 'Server error' }
	  if (cc === abcc.ABCConditionCodeNoRecoveryQuestions) { return 'The user has not set recovery questions' }
	  if (cc === abcc.ABCConditionCodeNotSupported) { return 'Functionality not supported' }
	  if (cc === abcc.ABCConditionCodeMutexError) { return 'Mutex error if some type' }
	  if (cc === abcc.ABCConditionCodeNoTransaction) { return 'Transaction not found' }
	  if (cc === abcc.ABCConditionCodeEmpty_Wallet) { return 'Wallet is Empty' }
	  if (cc === abcc.ABCConditionCodeParseError) { return 'Failed to parse input text' }
	  if (cc === abcc.ABCConditionCodeInvalidWalletID) { return 'Invalid wallet ID' }
	  if (cc === abcc.ABCConditionCodeNoRequest) { return 'Request (address) not found' }
	  if (cc === abcc.ABCConditionCodeInsufficientFunds) { return 'Not enough money to send transaction' }
	  if (cc === abcc.ABCConditionCodeSynchronizing) { return 'We are still sync-ing' }
	  if (cc === abcc.ABCConditionCodeNonNumericPin) { return 'Problem with the PIN' }
	  if (cc === abcc.ABCConditionCodeNoAvailableAddress) { return 'Unable to find an address' }
	  if (cc === abcc.ABCConditionCodeInvalidPinWait) { return 'The user has entered a bad PIN, and must wait.' }
	  if (cc === abcc.ABCConditionCodePinExpired) { return 'Server expired PIN. (Deprecated)' }
	  if (cc === abcc.ABCConditionCodeInvalidOTP) { return 'Two Factor required' }
	  if (cc === abcc.ABCConditionCodeSpendDust) { return 'Trying to send too little money.' }
	  if (cc === abcc.ABCConditionCodeObsolete) { return 'The server says app is obsolete and needs to be upgraded.' }
	  return null
	}

	function ABCErrorObject (code, message) {
	  this.code = code;
	  this.message = message;
	}

	function ABCError (code, message) {
	  var conditionCode = 1;
	  var msg = null;
	  var json = null;
	  if (code === null) {
	    return null
	  } else if (typeof code.message === 'string') {
	    try {
	      json = JSON.parse(code.message);
	      conditionCode = json.status_code;
	      msg = json.message;
	    } catch (e) {
	      conditionCode = 1;
	      msg = message;
	    }
	  } else if (typeof code === 'number') {
	    conditionCode = code;
	  } else {
	    conditionCode = 1;
	    msg = message;
	  }

	  if (msg === null) {
	    msg = errorMap(conditionCode);
	  }

	  if (msg === null) {
	    msg = message;
	  }
	  return new ABCErrorObject(conditionCode, msg)
	  // return {'code': conditionCode, 'message': msg}
	}

	/**
	 * Initializes the Airbitz core library for use in a browser.
	 * @return An Airbitz core library instance.
	 */
	function makeBrowserContext (opts) {
	  if ( opts === void 0 ) opts = {};

	  return new Context(makeBrowserIo(opts), opts)
	}

	/**
	 * Creates mock Airbitz contexts for use in unit tests.
	 * All the contexts share a fake in-memory server,
	 * so accounts created on one context can be loaded from another context.
	 * This makes it possible to unit-test various peer-to-peer scenarios.
	 * @return An Airbitz core library instance.
	 */
	function makeFakeContexts (count, opts) {
	  if ( opts === void 0 ) opts = {};

	  return makeFakeIos(count, opts).map(function (io) { return new Context(io, opts); })
	}

	/**
	 * Initializes the Airbitz core library for use on node.js.
	 * @param workDir The path to a directory where the core can save information.
	 * @return An Airbitz core library instance.
	 */
	function makeNodeContext (path, opts) {
	  if ( opts === void 0 ) opts = {};

	  return new Context(makeNodeIo(path, opts), opts)
	}

	exports.makeBrowserContext = makeBrowserContext;
	exports.makeFakeContexts = makeFakeContexts;
	exports.makeNodeContext = makeNodeContext;
	exports.Context = Context;
	exports.makeABCContext = makeBrowserContext;
	exports.makeContext = makeBrowserContext;
	exports.makeRandomGenerator = makeRandomGenerator;
	exports.ABCConditionCode = abcc;
	exports.ABCError = ABCError;
	exports.usernameFix = fixUsername;
	exports.NetworkError = NetworkError;
	exports.ObsoleteApiError = ObsoleteApiError;
	exports.UsernameError = UsernameError;
	exports.PasswordError = PasswordError;
	exports.OtpError = OtpError;
	//# sourceMappingURL=abc.cjs.js.map


/***/ },
/* 2 */
/***/ function(module, exports) {

	// base-x encoding
	// Forked from https://github.com/cryptocoinjs/bs58
	// Originally written by Mike Hearn for BitcoinJ
	// Copyright (c) 2011 Google Inc
	// Ported to JavaScript by Stefan Thomas
	// Merged Buffer refactorings from base58-native by Stephen Pair
	// Copyright (c) 2013 BitPay Inc

	module.exports = function base (ALPHABET) {
	  var ALPHABET_MAP = {}
	  var BASE = ALPHABET.length
	  var LEADER = ALPHABET.charAt(0)

	  // pre-compute lookup table
	  for (var i = 0; i < ALPHABET.length; i++) {
	    ALPHABET_MAP[ALPHABET.charAt(i)] = i
	  }

	  function encode (source) {
	    if (source.length === 0) return ''

	    var digits = [0]
	    for (var i = 0; i < source.length; ++i) {
	      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
	        carry += digits[j] << 8
	        digits[j] = carry % BASE
	        carry = (carry / BASE) | 0
	      }

	      while (carry > 0) {
	        digits.push(carry % BASE)
	        carry = (carry / BASE) | 0
	      }
	    }

	    var string = ''

	    // deal with leading zeros
	    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += ALPHABET[0]
	    // convert digits to a string
	    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

	    return string
	  }

	  function decodeUnsafe (string) {
	    if (string.length === 0) return []

	    var bytes = [0]
	    for (var i = 0; i < string.length; i++) {
	      var value = ALPHABET_MAP[string[i]]
	      if (value === undefined) return

	      for (var j = 0, carry = value; j < bytes.length; ++j) {
	        carry += bytes[j] * BASE
	        bytes[j] = carry & 0xff
	        carry >>= 8
	      }

	      while (carry > 0) {
	        bytes.push(carry & 0xff)
	        carry >>= 8
	      }
	    }

	    // deal with leading zeros
	    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
	      bytes.push(0)
	    }

	    return bytes.reverse()
	  }

	  function decode (string) {
	    var array = decodeUnsafe(string)
	    if (array) return array

	    throw new Error('Non-base' + BASE + ' character')
	  }

	  return {
	    encode: encode,
	    decodeUnsafe: decodeUnsafe,
	    decode: decode
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	(function(root) {

	    var createBuffer = null, copyBuffer = null, convertBytesToString, convertStringToBytes = null;

	    var slowCreateBuffer = function(arg) {

	        // Passed in a single number, the length to pre-allocate
	        if (typeof arg === 'number') {
	            var result = [];
	            for (var i = 0; i < arg; i++) {
	                result.push(0);
	            }
	            return result;

	        } else  {
	            // Make sure they are passing sensible data
	            for (var i = 0; i < arg.length; i++) {
	                if (arg[i] < 0 || arg[i] >= 256 || typeof arg[i] !== 'number') {
	                    throw new Error('invalid byte (' + arg[i] + ':' + i + ')');
	                }
	            }

	            // Most array-like things should support this
	            if (arg.slice) {
	                return arg.slice(0);
	            }

	            // Something *weird*; copy it into an array (see PR#2)
	            var result = [];
	            for (var i = 0; i < arg.length; i++) {
	                result.push(arg[i]);
	            }
	            return result;
	        }
	    }

	    if (typeof(Buffer) === 'undefined') {
	        createBuffer = slowCreateBuffer;

	        copyBuffer = function(sourceBuffer, targetBuffer, targetStart, sourceStart, sourceEnd) {
	            if (targetStart == null) { targetStart = 0; }
	            if (sourceStart == null) { sourceStart = 0; }
	            if (sourceEnd == null) { sourceEnd = sourceBuffer.length; }
	            for (var i = sourceStart; i < sourceEnd; i++) {
	                targetBuffer[targetStart++] = sourceBuffer[i];
	            }
	        }

	        convertStringToBytes = function(text, encoding) {

	            // "utf8", "utf-8", "utf 8", etc
	            if (encoding == null || encoding.toLowerCase().replace(/ |-/g, "") == 'utf8') {
	                var result = [], i = 0;
	                text = encodeURI(text);
	                while (i < text.length) {
	                    var c = text.charCodeAt(i++);

	                    // if it is a % sign, encode the following 2 bytes as a hex value
	                    if (c === 37) {
	                        result.push(parseInt(text.substr(i, 2), 16))
	                        i += 2;

	                    // otherwise, just the actual byte
	                    } else {
	                        result.push(c)
	                    }
	                }

	                return result;

	            // "hex"
	            } else if (encoding.toLowerCase() == 'hex') {
	                var result = [];
	                for (var i = 0; i < text.length; i += 2) {
	                    result.push(parseInt(text.substr(i, 2), 16));
	                }

	                return result;
	            }

	            // @TODO: Base64...

	            return null;
	        }

	        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
	        var Hex = '0123456789abcdef';
	        convertBytesToString = function(bytes, encoding) {

	            // "utf8", "utf-8", "utf 8", etc
	            if (encoding == null || encoding.toLowerCase().replace(/ |-/g, "") == 'utf8') {
	                var result = [], i = 0;

	                while (i < bytes.length) {
	                    var c = bytes[i];

	                    if (c < 128) {
	                        result.push(String.fromCharCode(c));
	                        i++;
	                    } else if (c > 191 && c < 224) {
	                        result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
	                        i += 2;
	                    } else {
	                        result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
	                        i += 3;
	                    }
	                }

	                return result.join('');

	            // "hex"
	            } else if (encoding.toLowerCase() == 'hex') {
	                var result = [];
	                for (var i = 0; i < bytes.length; i++) {
	                    var v = bytes[i];
	                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
	                }
	                return result.join('');
	            }

	            return result
	        }

	    } else {
	        createBuffer = function(arg) { return new Buffer(arg); }

	        copyBuffer = function(sourceBuffer, targetBuffer, targetStart, sourceStart, sourceEnd) {
	            sourceBuffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd);
	        }

	        convertStringToBytes = function(text, encoding) {
	            return new Buffer(text, encoding);
	        }

	        convertBytesToString = function(bytes, encoding) {
	            return (new Buffer(bytes)).toString(encoding);
	        }
	    }


	    // Number of rounds by keysize
	    var numberOfRounds = {16: 10, 24: 12, 32: 14}

	    // Round constant words
	    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

	    // S-box and Inverse S-box (S is for Substitution)
	    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
	    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

	    // Transformations for encryption
	    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
	    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
	    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
	    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

	    // Transformations for decryption
	    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
	    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
	    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
	    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

	    // Transformations for decryption key expansion
	    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
	    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
	    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
	    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];


	    function convertToInt32(bytes) {
	        var result = [];
	        for (var i = 0; i < bytes.length; i += 4) {
	            result.push(
	                (bytes[i    ] << 24) |
	                (bytes[i + 1] << 16) |
	                (bytes[i + 2] <<  8) |
	                 bytes[i + 3]
	            );
	        }
	        return result;
	    }




	    var AES = function(key) {
	        if (!(this instanceof AES)) {
	            throw Error('AES must be instanitated with `new`');
	        }

	        this.key = createBuffer(key);
	        this._prepare();
	    }


	    AES.prototype._prepare = function() {

	        var rounds = numberOfRounds[this.key.length];
	        if (rounds == null) {
	            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
	        }

	        // encryption round keys
	        this._Ke = [];

	        // decryption round keys
	        this._Kd = [];

	        for (var i = 0; i <= rounds; i++) {
	            this._Ke.push([0, 0, 0, 0]);
	            this._Kd.push([0, 0, 0, 0]);
	        }

	        var roundKeyCount = (rounds + 1) * 4;
	        var KC = this.key.length / 4;

	        // convert the key into ints
	        var tk = convertToInt32(this.key);

	        // copy values into round key arrays
	        var index;
	        for (var i = 0; i < KC; i++) {
	            index = i >> 2;
	            this._Ke[index][i % 4] = tk[i];
	            this._Kd[rounds - index][i % 4] = tk[i];
	        }

	        // key expansion (fips-197 section 5.2)
	        var rconpointer = 0;
	        var t = KC, tt;
	        while (t < roundKeyCount) {
	            tt = tk[KC - 1];
	            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
	                      (S[(tt >>  8) & 0xFF] << 16) ^
	                      (S[ tt        & 0xFF] <<  8) ^
	                       S[(tt >> 24) & 0xFF]        ^
	                      (rcon[rconpointer] << 24));
	            rconpointer += 1;

	            // key expansion (for non-256 bit)
	            if (KC != 8) {
	                for (var i = 1; i < KC; i++) {
	                    tk[i] ^= tk[i - 1];
	                }

	            // key expansion for 256-bit keys is "slightly different" (fips-197)
	            } else {
	                for (var i = 1; i < (KC / 2); i++) {
	                    tk[i] ^= tk[i - 1];
	                }
	                tt = tk[(KC / 2) - 1];

	                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
	                              (S[(tt >>  8) & 0xFF] <<  8) ^
	                              (S[(tt >> 16) & 0xFF] << 16) ^
	                              (S[(tt >> 24) & 0xFF] << 24));

	                for (var i = (KC / 2) + 1; i < KC; i++) {
	                    tk[i] ^= tk[i - 1];
	                }
	            }

	            // copy values into round key arrays
	            var i = 0, r, c;
	            while (i < KC && t < roundKeyCount) {
	                r = t >> 2;
	                c = t % 4;
	                this._Ke[r][c] = tk[i];
	                this._Kd[rounds - r][c] = tk[i++];
	                t++;
	            }
	        }

	        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
	        for (var r = 1; r < rounds; r++) {
	            for (var c = 0; c < 4; c++) {
	                tt = this._Kd[r][c];
	                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
	                                  U2[(tt >> 16) & 0xFF] ^
	                                  U3[(tt >>  8) & 0xFF] ^
	                                  U4[ tt        & 0xFF]);
	            }
	        }
	    }

	    AES.prototype.encrypt = function(plaintext) {
	        if (plaintext.length != 16) {
	            throw new Error('invalid plaintext size (must be 16 bytes)');
	        }

	        var rounds = this._Ke.length - 1;
	        var a = [0, 0, 0, 0];

	        // convert plaintext to (ints ^ key)
	        var t = convertToInt32(plaintext);
	        for (var i = 0; i < 4; i++) {
	            t[i] ^= this._Ke[0][i];
	        }

	        // apply round transforms
	        for (var r = 1; r < rounds; r++) {
	            for (var i = 0; i < 4; i++) {
	                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
	                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
	                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
	                        T4[ t[(i + 3) % 4]        & 0xff] ^
	                        this._Ke[r][i]);
	            }
	            t = a.slice(0);
	        }

	        // the last round is special
	        var result = createBuffer(16), tt;
	        for (var i = 0; i < 4; i++) {
	            tt = this._Ke[rounds][i];
	            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
	            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
	            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
	            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
	        }

	        return result;
	    }

	    AES.prototype.decrypt = function(ciphertext) {
	        if (ciphertext.length != 16) {
	            throw new Error('invalid ciphertext size (must be 16 bytes)');
	        }

	        var rounds = this._Kd.length - 1;
	        var a = [0, 0, 0, 0];

	        // convert plaintext to (ints ^ key)
	        var t = convertToInt32(ciphertext);
	        for (var i = 0; i < 4; i++) {
	            t[i] ^= this._Kd[0][i];
	        }

	        // apply round transforms
	        for (var r = 1; r < rounds; r++) {
	            for (var i = 0; i < 4; i++) {
	                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
	                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
	                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
	                        T8[ t[(i + 1) % 4]        & 0xff] ^
	                        this._Kd[r][i]);
	            }
	            t = a.slice(0);
	        }

	        // the last round is special
	        var result = createBuffer(16), tt;
	        for (var i = 0; i < 4; i++) {
	            tt = this._Kd[rounds][i];
	            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
	            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
	            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
	            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
	        }

	        return result;
	    }


	    /**
	     *  Mode Of Operation - Electonic Codebook (ECB)
	     */
	    var ModeOfOperationECB = function(key) {
	        if (!(this instanceof ModeOfOperationECB)) {
	            throw Error('AES must be instanitated with `new`');
	        }

	        this.description = "Electronic Code Block";
	        this.name = "ecb";

	        this._aes = new AES(key);
	    }

	    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
	        if ((plaintext.length % 16) !== 0) {
	            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
	        }

	        var ciphertext = createBuffer(plaintext.length);
	        var block = createBuffer(16);

	        for (var i = 0; i < plaintext.length; i += 16) {
	            copyBuffer(plaintext, block, 0, i, i + 16);
	            block = this._aes.encrypt(block);
	            copyBuffer(block, ciphertext, i, 0, 16);
	        }

	        return ciphertext;
	    }

	    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
	        if ((ciphertext.length % 16) !== 0) {
	            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
	        }

	        var plaintext = createBuffer(ciphertext.length);
	        var block = createBuffer(16);

	        for (var i = 0; i < ciphertext.length; i += 16) {
	            copyBuffer(ciphertext, block, 0, i, i + 16);
	            block = this._aes.decrypt(block);
	            copyBuffer(block, plaintext, i, 0, 16);
	        }

	        return plaintext;
	    }


	    /**
	     *  Mode Of Operation - Cipher Block Chaining (CBC)
	     */
	    var ModeOfOperationCBC = function(key, iv) {
	        if (!(this instanceof ModeOfOperationCBC)) {
	            throw Error('AES must be instanitated with `new`');
	        }

	        this.description = "Cipher Block Chaining";
	        this.name = "cbc";

	        if (!iv) {
	            iv = createBuffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

	        } else if (iv.length != 16) {
	            throw new Error('invalid initialation vector size (must be 16 bytes)');
	        }

	        this._lastCipherblock = createBuffer(iv);

	        this._aes = new AES(key);
	    }

	    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
	        if ((plaintext.length % 16) !== 0) {
	            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
	        }

	        var ciphertext = createBuffer(plaintext.length);
	        var block = createBuffer(16);

	        for (var i = 0; i < plaintext.length; i += 16) {
	            copyBuffer(plaintext, block, 0, i, i + 16);

	            for (var j = 0; j < 16; j++) {
	                block[j] ^= this._lastCipherblock[j];
	            }

	            this._lastCipherblock = this._aes.encrypt(block);
	            copyBuffer(this._lastCipherblock, ciphertext, i, 0, 16);
	        }

	        return ciphertext;
	    }

	    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
	        if ((ciphertext.length % 16) !== 0) {
	            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
	        }

	        var plaintext = createBuffer(ciphertext.length);
	        var block = createBuffer(16);

	        for (var i = 0; i < ciphertext.length; i += 16) {
	            copyBuffer(ciphertext, block, 0, i, i + 16);
	            block = this._aes.decrypt(block);

	            for (var j = 0; j < 16; j++) {
	                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
	            }

	            copyBuffer(ciphertext, this._lastCipherblock, 0, i, i + 16);
	        }

	        return plaintext;
	    }


	    /**
	     *  Mode Of Operation - Cipher Feedback (CFB)
	     */
	    var ModeOfOperationCFB = function(key, iv, segmentSize) {
	        if (!(this instanceof ModeOfOperationCFB)) {
	            throw Error('AES must be instanitated with `new`');
	        }

	        this.description = "Cipher Feedback";
	        this.name = "cfb";

	        if (!iv) {
	            iv = createBuffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

	        } else if (iv.length != 16) {
	            throw new Error('invalid initialation vector size (must be 16 size)');
	        }

	        if (!segmentSize) { segmentSize = 1; }

	        this.segmentSize = segmentSize;

	        this._shiftRegister = createBuffer(iv);

	        this._aes = new AES(key);
	    }

	    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
	        if ((plaintext.length % this.segmentSize) != 0) {
	            throw new Error('invalid plaintext size (must be segmentSize bytes)');
	        }

	        var encrypted = createBuffer(plaintext);

	        var xorSegment;
	        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
	            xorSegment = this._aes.encrypt(this._shiftRegister);
	            for (var j = 0; j < this.segmentSize; j++) {
	                encrypted[i + j] ^= xorSegment[j];
	            }

	            // Shift the register
	            copyBuffer(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
	            copyBuffer(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
	        }

	        return encrypted;
	    }

	    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
	        if ((ciphertext.length % this.segmentSize) != 0) {
	            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
	        }

	        var plaintext = createBuffer(ciphertext);

	        var xorSegment;
	        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
	            xorSegment = this._aes.encrypt(this._shiftRegister);

	            for (var j = 0; j < this.segmentSize; j++) {
	                plaintext[i + j] ^= xorSegment[j];
	            }

	            // Shift the register
	            copyBuffer(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
	            copyBuffer(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
	        }

	        return plaintext;
	    }

	    /**
	     *  Mode Of Operation - Output Feedback (OFB)
	     */
	    var ModeOfOperationOFB = function(key, iv) {
	        if (!(this instanceof ModeOfOperationOFB)) {
	            throw Error('AES must be instanitated with `new`');
	        }

	        this.description = "Output Feedback";
	        this.name = "ofb";

	        if (!iv) {
	            iv = createBuffer([0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

	        } else if (iv.length != 16) {
	            throw new Error('invalid initialation vector size (must be 16 bytes)');
	        }

	        this._lastPrecipher = createBuffer(iv);
	        this._lastPrecipherIndex = 16;

	        this._aes = new AES(key);
	    }

	    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
	        var encrypted = createBuffer(plaintext);

	        for (var i = 0; i < encrypted.length; i++) {
	            if (this._lastPrecipherIndex === 16) {
	                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
	                this._lastPrecipherIndex = 0;
	            }
	            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
	        }

	        return encrypted;
	    }

	    // Decryption is symetric
	    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


	    /**
	     *  Counter object for CTR common mode of operation
	     */
	    var Counter = function(initialValue) {
	        if (!(this instanceof Counter)) {
	            throw Error('Counter must be instanitated with `new`');
	        }

	        // We allow 0, but anything false-ish uses the default 1
	        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

	        if (typeof(initialValue) === 'number') {
	            this._counter = createBuffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	            this.setValue(initialValue);

	        } else {
	            this.setBytes(initialValue);
	        }
	    }

	    Counter.prototype.setValue = function(value) {
	        if (typeof(value) !== 'number' || parseInt(value) != value) {
	            throw new Error('invalid counter value (must be an integer)');
	        }

	        for (var index = 15; index >= 0; --index) {
	            this._counter[index] = value % 256;
	            value = value >> 8;
	        }
	    }

	    Counter.prototype.setBytes = function(bytes) {
	        if (bytes.length != 16) {
	            throw new Error('invalid counter bytes size (must be 16 bytes)');
	        }
	        this._counter = createBuffer(bytes);
	    };

	    Counter.prototype.increment = function() {
	        for (var i = 15; i >= 0; i--) {
	            if (this._counter[i] === 255) {
	                this._counter[i] = 0;
	            } else {
	                this._counter[i]++;
	                break;
	            }
	        }
	    }


	    /**
	     *  Mode Of Operation - Counter (CTR)
	     */
	    var ModeOfOperationCTR = function(key, counter) {
	        if (!(this instanceof ModeOfOperationCTR)) {
	            throw Error('AES must be instanitated with `new`');
	        }

	        this.description = "Counter";
	        this.name = "ctr";

	        if (!(counter instanceof Counter)) {
	            counter = new Counter(counter)
	        }

	        this._counter = counter;

	        this._remainingCounter = null;
	        this._remainingCounterIndex = 16;

	        this._aes = new AES(key);
	    }

	    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
	        var encrypted = createBuffer(plaintext);

	        for (var i = 0; i < encrypted.length; i++) {
	            if (this._remainingCounterIndex === 16) {
	                this._remainingCounter = this._aes.encrypt(this._counter._counter);
	                this._remainingCounterIndex = 0;
	                this._counter.increment();
	            }
	            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
	        }

	        return encrypted;
	    }

	    // Decryption is symetric
	    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


	    // The basic modes of operation as a map
	    var ModeOfOperation = {
	        ecb: ModeOfOperationECB,
	        cbc: ModeOfOperationCBC,
	        cfb: ModeOfOperationCFB,
	        ofb: ModeOfOperationOFB,
	        ctr: ModeOfOperationCTR
	    };


	    ///////////////////////
	    // Exporting


	    // The block cipher
	    var aesjs = {
	        AES: AES,
	        Counter: Counter,
	        ModeOfOperation: ModeOfOperation,
	        util: {
	            convertBytesToString: convertBytesToString,
	            convertStringToBytes: convertStringToBytes,
	            _slowCreateBuffer: slowCreateBuffer
	        }
	    };


	    // node.js
	    if (true) {
	        module.exports = aesjs

	    // RequireJS/AMD
	    // http://www.requirejs.org/docs/api.html
	    // https://github.com/amdjs/amdjs-api/wiki/AMD
	    } else if (typeof(define) === 'function' && define.amd) {
	        define(aesjs);

	    // Web Browsers
	    } else {

	        // If there was an existing library at "aes" make sure it's still available
	        if (root.aes) {
	            aesjs._aes = root.aes;
	        }

	        root.aesjs = aesjs;
	    }


	})(this);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hash = __webpack_require__(6);
	var utils = __webpack_require__(15);
	var assert = __webpack_require__(16);

	function HmacDRBG(options) {
	  if (!(this instanceof HmacDRBG))
	    return new HmacDRBG(options);
	  this.hash = options.hash;
	  this.predResist = !!options.predResist;

	  this.outLen = this.hash.outSize;
	  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

	  this.reseed = null;
	  this.reseedInterval = null;
	  this.K = null;
	  this.V = null;

	  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');
	  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');
	  var pers = utils.toArray(options.pers, options.persEnc || 'hex');
	  assert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
	  this._init(entropy, nonce, pers);
	}
	module.exports = HmacDRBG;

	HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
	  var seed = entropy.concat(nonce).concat(pers);

	  this.K = new Array(this.outLen / 8);
	  this.V = new Array(this.outLen / 8);
	  for (var i = 0; i < this.V.length; i++) {
	    this.K[i] = 0x00;
	    this.V[i] = 0x01;
	  }

	  this._update(seed);
	  this.reseed = 1;
	  this.reseedInterval = 0x1000000000000;  // 2^48
	};

	HmacDRBG.prototype._hmac = function hmac() {
	  return new hash.hmac(this.hash, this.K);
	};

	HmacDRBG.prototype._update = function update(seed) {
	  var kmac = this._hmac()
	                 .update(this.V)
	                 .update([ 0x00 ]);
	  if (seed)
	    kmac = kmac.update(seed);
	  this.K = kmac.digest();
	  this.V = this._hmac().update(this.V).digest();
	  if (!seed)
	    return;

	  this.K = this._hmac()
	               .update(this.V)
	               .update([ 0x01 ])
	               .update(seed)
	               .digest();
	  this.V = this._hmac().update(this.V).digest();
	};

	HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
	  // Optional entropy enc
	  if (typeof entropyEnc !== 'string') {
	    addEnc = add;
	    add = entropyEnc;
	    entropyEnc = null;
	  }

	  entropy = utils.toArray(entropy, entropyEnc);
	  add = utils.toArray(add, addEnc);

	  assert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

	  this._update(entropy.concat(add || []));
	  this.reseed = 1;
	};

	HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
	  if (this.reseed > this.reseedInterval)
	    throw new Error('Reseed is required');

	  // Optional encoding
	  if (typeof enc !== 'string') {
	    addEnc = add;
	    add = enc;
	    enc = null;
	  }

	  // Optional additional data
	  if (add) {
	    add = utils.toArray(add, addEnc || 'hex');
	    this._update(add);
	  }

	  var temp = [];
	  while (temp.length < len) {
	    this.V = this._hmac().update(this.V).digest();
	    temp = temp.concat(this.V);
	  }

	  var res = temp.slice(0, len);
	  this._update(add);
	  this.reseed++;
	  return utils.encode(res, enc);
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var hash = exports;

	hash.utils = __webpack_require__(7);
	hash.common = __webpack_require__(11);
	hash.sha = __webpack_require__(12);
	hash.ripemd = __webpack_require__(13);
	hash.hmac = __webpack_require__(14);

	// Proxy hash functions to the main object
	hash.sha1 = hash.sha.sha1;
	hash.sha256 = hash.sha.sha256;
	hash.sha224 = hash.sha.sha224;
	hash.sha384 = hash.sha.sha384;
	hash.sha512 = hash.sha.sha512;
	hash.ripemd160 = hash.ripemd.ripemd160;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var utils = exports;
	var inherits = __webpack_require__(8);

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg === 'string') {
	    if (!enc) {
	      for (var i = 0; i < msg.length; i++) {
	        var c = msg.charCodeAt(i);
	        var hi = c >> 8;
	        var lo = c & 0xff;
	        if (hi)
	          res.push(hi, lo);
	        else
	          res.push(lo);
	      }
	    } else if (enc === 'hex') {
	      msg = msg.replace(/[^a-z0-9]+/ig, '');
	      if (msg.length % 2 !== 0)
	        msg = '0' + msg;
	      for (var i = 0; i < msg.length; i += 2)
	        res.push(parseInt(msg[i] + msg[i + 1], 16));
	    }
	  } else {
	    for (var i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	  }
	  return res;
	}
	utils.toArray = toArray;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils.toHex = toHex;

	function htonl(w) {
	  var res = (w >>> 24) |
	            ((w >>> 8) & 0xff00) |
	            ((w << 8) & 0xff0000) |
	            ((w & 0xff) << 24);
	  return res >>> 0;
	}
	utils.htonl = htonl;

	function toHex32(msg, endian) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++) {
	    var w = msg[i];
	    if (endian === 'little')
	      w = htonl(w);
	    res += zero8(w.toString(16));
	  }
	  return res;
	}
	utils.toHex32 = toHex32;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils.zero2 = zero2;

	function zero8(word) {
	  if (word.length === 7)
	    return '0' + word;
	  else if (word.length === 6)
	    return '00' + word;
	  else if (word.length === 5)
	    return '000' + word;
	  else if (word.length === 4)
	    return '0000' + word;
	  else if (word.length === 3)
	    return '00000' + word;
	  else if (word.length === 2)
	    return '000000' + word;
	  else if (word.length === 1)
	    return '0000000' + word;
	  else
	    return word;
	}
	utils.zero8 = zero8;

	function join32(msg, start, end, endian) {
	  var len = end - start;
	  assert(len % 4 === 0);
	  var res = new Array(len / 4);
	  for (var i = 0, k = start; i < res.length; i++, k += 4) {
	    var w;
	    if (endian === 'big')
	      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
	    else
	      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
	    res[i] = w >>> 0;
	  }
	  return res;
	}
	utils.join32 = join32;

	function split32(msg, endian) {
	  var res = new Array(msg.length * 4);
	  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
	    var m = msg[i];
	    if (endian === 'big') {
	      res[k] = m >>> 24;
	      res[k + 1] = (m >>> 16) & 0xff;
	      res[k + 2] = (m >>> 8) & 0xff;
	      res[k + 3] = m & 0xff;
	    } else {
	      res[k + 3] = m >>> 24;
	      res[k + 2] = (m >>> 16) & 0xff;
	      res[k + 1] = (m >>> 8) & 0xff;
	      res[k] = m & 0xff;
	    }
	  }
	  return res;
	}
	utils.split32 = split32;

	function rotr32(w, b) {
	  return (w >>> b) | (w << (32 - b));
	}
	utils.rotr32 = rotr32;

	function rotl32(w, b) {
	  return (w << b) | (w >>> (32 - b));
	}
	utils.rotl32 = rotl32;

	function sum32(a, b) {
	  return (a + b) >>> 0;
	}
	utils.sum32 = sum32;

	function sum32_3(a, b, c) {
	  return (a + b + c) >>> 0;
	}
	utils.sum32_3 = sum32_3;

	function sum32_4(a, b, c, d) {
	  return (a + b + c + d) >>> 0;
	}
	utils.sum32_4 = sum32_4;

	function sum32_5(a, b, c, d, e) {
	  return (a + b + c + d + e) >>> 0;
	}
	utils.sum32_5 = sum32_5;

	function assert(cond, msg) {
	  if (!cond)
	    throw new Error(msg || 'Assertion failed');
	}
	utils.assert = assert;

	utils.inherits = inherits;

	function sum64(buf, pos, ah, al) {
	  var bh = buf[pos];
	  var bl = buf[pos + 1];

	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  buf[pos] = hi >>> 0;
	  buf[pos + 1] = lo;
	}
	exports.sum64 = sum64;

	function sum64_hi(ah, al, bh, bl) {
	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  return hi >>> 0;
	};
	exports.sum64_hi = sum64_hi;

	function sum64_lo(ah, al, bh, bl) {
	  var lo = al + bl;
	  return lo >>> 0;
	};
	exports.sum64_lo = sum64_lo;

	function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;

	  var hi = ah + bh + ch + dh + carry;
	  return hi >>> 0;
	};
	exports.sum64_4_hi = sum64_4_hi;

	function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
	  var lo = al + bl + cl + dl;
	  return lo >>> 0;
	};
	exports.sum64_4_lo = sum64_4_lo;

	function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;
	  lo = (lo + el) >>> 0;
	  carry += lo < el ? 1 : 0;

	  var hi = ah + bh + ch + dh + eh + carry;
	  return hi >>> 0;
	};
	exports.sum64_5_hi = sum64_5_hi;

	function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var lo = al + bl + cl + dl + el;

	  return lo >>> 0;
	};
	exports.sum64_5_lo = sum64_5_lo;

	function rotr64_hi(ah, al, num) {
	  var r = (al << (32 - num)) | (ah >>> num);
	  return r >>> 0;
	};
	exports.rotr64_hi = rotr64_hi;

	function rotr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	};
	exports.rotr64_lo = rotr64_lo;

	function shr64_hi(ah, al, num) {
	  return ah >>> num;
	};
	exports.shr64_hi = shr64_hi;

	function shr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	};
	exports.shr64_lo = shr64_lo;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	try {
	  var util = __webpack_require__(9);
	  if (typeof util.inherits !== 'function') throw '';
	  module.exports = util.inherits;
	} catch (e) {
	  module.exports = __webpack_require__(10);
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 10 */
/***/ function(module, exports) {

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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var hash = __webpack_require__(6);
	var utils = hash.utils;
	var assert = utils.assert;

	function BlockHash() {
	  this.pending = null;
	  this.pendingTotal = 0;
	  this.blockSize = this.constructor.blockSize;
	  this.outSize = this.constructor.outSize;
	  this.hmacStrength = this.constructor.hmacStrength;
	  this.padLength = this.constructor.padLength / 8;
	  this.endian = 'big';

	  this._delta8 = this.blockSize / 8;
	  this._delta32 = this.blockSize / 32;
	}
	exports.BlockHash = BlockHash;

	BlockHash.prototype.update = function update(msg, enc) {
	  // Convert message to array, pad it, and join into 32bit blocks
	  msg = utils.toArray(msg, enc);
	  if (!this.pending)
	    this.pending = msg;
	  else
	    this.pending = this.pending.concat(msg);
	  this.pendingTotal += msg.length;

	  // Enough data, try updating
	  if (this.pending.length >= this._delta8) {
	    msg = this.pending;

	    // Process pending data in blocks
	    var r = msg.length % this._delta8;
	    this.pending = msg.slice(msg.length - r, msg.length);
	    if (this.pending.length === 0)
	      this.pending = null;

	    msg = utils.join32(msg, 0, msg.length - r, this.endian);
	    for (var i = 0; i < msg.length; i += this._delta32)
	      this._update(msg, i, i + this._delta32);
	  }

	  return this;
	};

	BlockHash.prototype.digest = function digest(enc) {
	  this.update(this._pad());
	  assert(this.pending === null);

	  return this._digest(enc);
	};

	BlockHash.prototype._pad = function pad() {
	  var len = this.pendingTotal;
	  var bytes = this._delta8;
	  var k = bytes - ((len + this.padLength) % bytes);
	  var res = new Array(k + this.padLength);
	  res[0] = 0x80;
	  for (var i = 1; i < k; i++)
	    res[i] = 0;

	  // Append length
	  len <<= 3;
	  if (this.endian === 'big') {
	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;

	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = len & 0xff;
	  } else {
	    res[i++] = len & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;

	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;
	  }

	  return res;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var hash = __webpack_require__(6);
	var utils = hash.utils;
	var assert = utils.assert;

	var rotr32 = utils.rotr32;
	var rotl32 = utils.rotl32;
	var sum32 = utils.sum32;
	var sum32_4 = utils.sum32_4;
	var sum32_5 = utils.sum32_5;
	var rotr64_hi = utils.rotr64_hi;
	var rotr64_lo = utils.rotr64_lo;
	var shr64_hi = utils.shr64_hi;
	var shr64_lo = utils.shr64_lo;
	var sum64 = utils.sum64;
	var sum64_hi = utils.sum64_hi;
	var sum64_lo = utils.sum64_lo;
	var sum64_4_hi = utils.sum64_4_hi;
	var sum64_4_lo = utils.sum64_4_lo;
	var sum64_5_hi = utils.sum64_5_hi;
	var sum64_5_lo = utils.sum64_5_lo;
	var BlockHash = hash.common.BlockHash;

	var sha256_K = [
	  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	var sha512_K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	var sha1_K = [
	  0x5A827999, 0x6ED9EBA1,
	  0x8F1BBCDC, 0xCA62C1D6
	];

	function SHA256() {
	  if (!(this instanceof SHA256))
	    return new SHA256();

	  BlockHash.call(this);
	  this.h = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];
	  this.k = sha256_K;
	  this.W = new Array(64);
	}
	utils.inherits(SHA256, BlockHash);
	exports.sha256 = SHA256;

	SHA256.blockSize = 512;
	SHA256.outSize = 256;
	SHA256.hmacStrength = 192;
	SHA256.padLength = 64;

	SHA256.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i++)
	    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];
	  var f = this.h[5];
	  var g = this.h[6];
	  var h = this.h[7];

	  assert(this.k.length === W.length);
	  for (var i = 0; i < W.length; i++) {
	    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
	    var T2 = sum32(s0_256(a), maj32(a, b, c));
	    h = g;
	    g = f;
	    f = e;
	    e = sum32(d, T1);
	    d = c;
	    c = b;
	    b = a;
	    a = sum32(T1, T2);
	  }

	  this.h[0] = sum32(this.h[0], a);
	  this.h[1] = sum32(this.h[1], b);
	  this.h[2] = sum32(this.h[2], c);
	  this.h[3] = sum32(this.h[3], d);
	  this.h[4] = sum32(this.h[4], e);
	  this.h[5] = sum32(this.h[5], f);
	  this.h[6] = sum32(this.h[6], g);
	  this.h[7] = sum32(this.h[7], h);
	};

	SHA256.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'big');
	  else
	    return utils.split32(this.h, 'big');
	};

	function SHA224() {
	  if (!(this instanceof SHA224))
	    return new SHA224();

	  SHA256.call(this);
	  this.h = [ 0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	             0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
	}
	utils.inherits(SHA224, SHA256);
	exports.sha224 = SHA224;

	SHA224.blockSize = 512;
	SHA224.outSize = 224;
	SHA224.hmacStrength = 192;
	SHA224.padLength = 64;

	SHA224.prototype._digest = function digest(enc) {
	  // Just truncate output
	  if (enc === 'hex')
	    return utils.toHex32(this.h.slice(0, 7), 'big');
	  else
	    return utils.split32(this.h.slice(0, 7), 'big');
	};

	function SHA512() {
	  if (!(this instanceof SHA512))
	    return new SHA512();

	  BlockHash.call(this);
	  this.h = [ 0x6a09e667, 0xf3bcc908,
	             0xbb67ae85, 0x84caa73b,
	             0x3c6ef372, 0xfe94f82b,
	             0xa54ff53a, 0x5f1d36f1,
	             0x510e527f, 0xade682d1,
	             0x9b05688c, 0x2b3e6c1f,
	             0x1f83d9ab, 0xfb41bd6b,
	             0x5be0cd19, 0x137e2179 ];
	  this.k = sha512_K;
	  this.W = new Array(160);
	}
	utils.inherits(SHA512, BlockHash);
	exports.sha512 = SHA512;

	SHA512.blockSize = 1024;
	SHA512.outSize = 512;
	SHA512.hmacStrength = 192;
	SHA512.padLength = 128;

	SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
	  var W = this.W;

	  // 32 x 32bit words
	  for (var i = 0; i < 32; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i += 2) {
	    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
	    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
	    var c1_hi = W[i - 14];  // i - 7
	    var c1_lo = W[i - 13];
	    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
	    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
	    var c3_hi = W[i - 32];  // i - 16
	    var c3_lo = W[i - 31];

	    W[i] = sum64_4_hi(c0_hi, c0_lo,
	                      c1_hi, c1_lo,
	                      c2_hi, c2_lo,
	                      c3_hi, c3_lo);
	    W[i + 1] = sum64_4_lo(c0_hi, c0_lo,
	                          c1_hi, c1_lo,
	                          c2_hi, c2_lo,
	                          c3_hi, c3_lo);
	  }
	};

	SHA512.prototype._update = function _update(msg, start) {
	  this._prepareBlock(msg, start);

	  var W = this.W;

	  var ah = this.h[0];
	  var al = this.h[1];
	  var bh = this.h[2];
	  var bl = this.h[3];
	  var ch = this.h[4];
	  var cl = this.h[5];
	  var dh = this.h[6];
	  var dl = this.h[7];
	  var eh = this.h[8];
	  var el = this.h[9];
	  var fh = this.h[10];
	  var fl = this.h[11];
	  var gh = this.h[12];
	  var gl = this.h[13];
	  var hh = this.h[14];
	  var hl = this.h[15];

	  assert(this.k.length === W.length);
	  for (var i = 0; i < W.length; i += 2) {
	    var c0_hi = hh;
	    var c0_lo = hl;
	    var c1_hi = s1_512_hi(eh, el);
	    var c1_lo = s1_512_lo(eh, el);
	    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
	    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
	    var c3_hi = this.k[i];
	    var c3_lo = this.k[i + 1];
	    var c4_hi = W[i];
	    var c4_lo = W[i + 1];

	    var T1_hi = sum64_5_hi(c0_hi, c0_lo,
	                           c1_hi, c1_lo,
	                           c2_hi, c2_lo,
	                           c3_hi, c3_lo,
	                           c4_hi, c4_lo);
	    var T1_lo = sum64_5_lo(c0_hi, c0_lo,
	                           c1_hi, c1_lo,
	                           c2_hi, c2_lo,
	                           c3_hi, c3_lo,
	                           c4_hi, c4_lo);

	    var c0_hi = s0_512_hi(ah, al);
	    var c0_lo = s0_512_lo(ah, al);
	    var c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
	    var c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

	    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
	    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

	    hh = gh;
	    hl = gl;

	    gh = fh;
	    gl = fl;

	    fh = eh;
	    fl = el;

	    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
	    el = sum64_lo(dl, dl, T1_hi, T1_lo);

	    dh = ch;
	    dl = cl;

	    ch = bh;
	    cl = bl;

	    bh = ah;
	    bl = al;

	    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
	    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
	  }

	  sum64(this.h, 0, ah, al);
	  sum64(this.h, 2, bh, bl);
	  sum64(this.h, 4, ch, cl);
	  sum64(this.h, 6, dh, dl);
	  sum64(this.h, 8, eh, el);
	  sum64(this.h, 10, fh, fl);
	  sum64(this.h, 12, gh, gl);
	  sum64(this.h, 14, hh, hl);
	};

	SHA512.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'big');
	  else
	    return utils.split32(this.h, 'big');
	};

	function SHA384() {
	  if (!(this instanceof SHA384))
	    return new SHA384();

	  SHA512.call(this);
	  this.h = [ 0xcbbb9d5d, 0xc1059ed8,
	             0x629a292a, 0x367cd507,
	             0x9159015a, 0x3070dd17,
	             0x152fecd8, 0xf70e5939,
	             0x67332667, 0xffc00b31,
	             0x8eb44a87, 0x68581511,
	             0xdb0c2e0d, 0x64f98fa7,
	             0x47b5481d, 0xbefa4fa4 ];
	}
	utils.inherits(SHA384, SHA512);
	exports.sha384 = SHA384;

	SHA384.blockSize = 1024;
	SHA384.outSize = 384;
	SHA384.hmacStrength = 192;
	SHA384.padLength = 128;

	SHA384.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h.slice(0, 12), 'big');
	  else
	    return utils.split32(this.h.slice(0, 12), 'big');
	};

	function SHA1() {
	  if (!(this instanceof SHA1))
	    return new SHA1();

	  BlockHash.call(this);
	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe,
	             0x10325476, 0xc3d2e1f0 ];
	  this.W = new Array(80);
	}

	utils.inherits(SHA1, BlockHash);
	exports.sha1 = SHA1;

	SHA1.blockSize = 512;
	SHA1.outSize = 160;
	SHA1.hmacStrength = 80;
	SHA1.padLength = 64;

	SHA1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];

	  for(; i < W.length; i++)
	    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];

	  for (var i = 0; i < W.length; i++) {
	    var s = ~~(i / 20);
	    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
	    e = d;
	    d = c;
	    c = rotl32(b, 30);
	    b = a;
	    a = t;
	  }

	  this.h[0] = sum32(this.h[0], a);
	  this.h[1] = sum32(this.h[1], b);
	  this.h[2] = sum32(this.h[2], c);
	  this.h[3] = sum32(this.h[3], d);
	  this.h[4] = sum32(this.h[4], e);
	};

	SHA1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'big');
	  else
	    return utils.split32(this.h, 'big');
	};

	function ch32(x, y, z) {
	  return (x & y) ^ ((~x) & z);
	}

	function maj32(x, y, z) {
	  return (x & y) ^ (x & z) ^ (y & z);
	}

	function p32(x, y, z) {
	  return x ^ y ^ z;
	}

	function s0_256(x) {
	  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
	}

	function s1_256(x) {
	  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
	}

	function g0_256(x) {
	  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
	}

	function g1_256(x) {
	  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
	}

	function ft_1(s, x, y, z) {
	  if (s === 0)
	    return ch32(x, y, z);
	  if (s === 1 || s === 3)
	    return p32(x, y, z);
	  if (s === 2)
	    return maj32(x, y, z);
	}

	function ch64_hi(xh, xl, yh, yl, zh, zl) {
	  var r = (xh & yh) ^ ((~xh) & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function ch64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ ((~xl) & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_hi(xh, xl, yh, yl, zh, zl) {
	  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 28);
	  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
	  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 28);
	  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
	  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 14);
	  var c1_hi = rotr64_hi(xh, xl, 18);
	  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 14);
	  var c1_lo = rotr64_lo(xh, xl, 18);
	  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 1);
	  var c1_hi = rotr64_hi(xh, xl, 8);
	  var c2_hi = shr64_hi(xh, xl, 7);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 1);
	  var c1_lo = rotr64_lo(xh, xl, 8);
	  var c2_lo = shr64_lo(xh, xl, 7);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 19);
	  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
	  var c2_hi = shr64_hi(xh, xl, 6);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 19);
	  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
	  var c2_lo = shr64_lo(xh, xl, 6);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var hash = __webpack_require__(6);
	var utils = hash.utils;

	var rotl32 = utils.rotl32;
	var sum32 = utils.sum32;
	var sum32_3 = utils.sum32_3;
	var sum32_4 = utils.sum32_4;
	var BlockHash = hash.common.BlockHash;

	function RIPEMD160() {
	  if (!(this instanceof RIPEMD160))
	    return new RIPEMD160();

	  BlockHash.call(this);

	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
	  this.endian = 'little';
	}
	utils.inherits(RIPEMD160, BlockHash);
	exports.ripemd160 = RIPEMD160;

	RIPEMD160.blockSize = 512;
	RIPEMD160.outSize = 160;
	RIPEMD160.hmacStrength = 192;
	RIPEMD160.padLength = 64;

	RIPEMD160.prototype._update = function update(msg, start) {
	  var A = this.h[0];
	  var B = this.h[1];
	  var C = this.h[2];
	  var D = this.h[3];
	  var E = this.h[4];
	  var Ah = A;
	  var Bh = B;
	  var Ch = C;
	  var Dh = D;
	  var Eh = E;
	  for (var j = 0; j < 80; j++) {
	    var T = sum32(
	      rotl32(
	        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
	        s[j]),
	      E);
	    A = E;
	    E = D;
	    D = rotl32(C, 10);
	    C = B;
	    B = T;
	    T = sum32(
	      rotl32(
	        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
	        sh[j]),
	      Eh);
	    Ah = Eh;
	    Eh = Dh;
	    Dh = rotl32(Ch, 10);
	    Ch = Bh;
	    Bh = T;
	  }
	  T = sum32_3(this.h[1], C, Dh);
	  this.h[1] = sum32_3(this.h[2], D, Eh);
	  this.h[2] = sum32_3(this.h[3], E, Ah);
	  this.h[3] = sum32_3(this.h[4], A, Bh);
	  this.h[4] = sum32_3(this.h[0], B, Ch);
	  this.h[0] = T;
	};

	RIPEMD160.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'little');
	  else
	    return utils.split32(this.h, 'little');
	};

	function f(j, x, y, z) {
	  if (j <= 15)
	    return x ^ y ^ z;
	  else if (j <= 31)
	    return (x & y) | ((~x) & z);
	  else if (j <= 47)
	    return (x | (~y)) ^ z;
	  else if (j <= 63)
	    return (x & z) | (y & (~z));
	  else
	    return x ^ (y | (~z));
	}

	function K(j) {
	  if (j <= 15)
	    return 0x00000000;
	  else if (j <= 31)
	    return 0x5a827999;
	  else if (j <= 47)
	    return 0x6ed9eba1;
	  else if (j <= 63)
	    return 0x8f1bbcdc;
	  else
	    return 0xa953fd4e;
	}

	function Kh(j) {
	  if (j <= 15)
	    return 0x50a28be6;
	  else if (j <= 31)
	    return 0x5c4dd124;
	  else if (j <= 47)
	    return 0x6d703ef3;
	  else if (j <= 63)
	    return 0x7a6d76e9;
	  else
	    return 0x00000000;
	}

	var r = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
	  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
	  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
	  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
	];

	var rh = [
	  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
	  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
	  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
	  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
	  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
	];

	var s = [
	  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
	  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
	  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
	  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
	  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
	];

	var sh = [
	  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
	  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
	  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
	  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
	  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
	];


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var hmac = exports;

	var hash = __webpack_require__(6);
	var utils = hash.utils;
	var assert = utils.assert;

	function Hmac(hash, key, enc) {
	  if (!(this instanceof Hmac))
	    return new Hmac(hash, key, enc);
	  this.Hash = hash;
	  this.blockSize = hash.blockSize / 8;
	  this.outSize = hash.outSize / 8;
	  this.inner = null;
	  this.outer = null;

	  this._init(utils.toArray(key, enc));
	}
	module.exports = Hmac;

	Hmac.prototype._init = function init(key) {
	  // Shorten key, if needed
	  if (key.length > this.blockSize)
	    key = new this.Hash().update(key).digest();
	  assert(key.length <= this.blockSize);

	  // Add padding to key
	  for (var i = key.length; i < this.blockSize; i++)
	    key.push(0);

	  for (var i = 0; i < key.length; i++)
	    key[i] ^= 0x36;
	  this.inner = new this.Hash().update(key);

	  // 0x36 ^ 0x5c = 0x6a
	  for (var i = 0; i < key.length; i++)
	    key[i] ^= 0x6a;
	  this.outer = new this.Hash().update(key);
	};

	Hmac.prototype.update = function update(msg, enc) {
	  this.inner.update(msg, enc);
	  return this;
	};

	Hmac.prototype.digest = function digest(enc) {
	  this.outer.update(this.inner.digest());
	  return this.outer.digest(enc);
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var utils = exports;

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg !== 'string') {
	    for (var i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	    return res;
	  }
	  if (enc === 'hex') {
	    msg = msg.replace(/[^a-z0-9]+/ig, '');
	    if (msg.length % 2 !== 0)
	      msg = '0' + msg;
	    for (var i = 0; i < msg.length; i += 2)
	      res.push(parseInt(msg[i] + msg[i + 1], 16));
	  } else {
	    for (var i = 0; i < msg.length; i++) {
	      var c = msg.charCodeAt(i);
	      var hi = c >> 8;
	      var lo = c & 0xff;
	      if (hi)
	        res.push(hi, lo);
	      else
	        res.push(lo);
	    }
	  }
	  return res;
	}
	utils.toArray = toArray;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils.zero2 = zero2;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils.toHex = toHex;

	utils.encode = function encode(arr, enc) {
	  if (enc === 'hex')
	    return toHex(arr);
	  else
	    return arr;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = assert;

	function assert(val, msg) {
	  if (!val)
	    throw new Error(msg || 'Assertion failed');
	}

	assert.equal = function assertEqual(l, r, msg) {
	  if (l != r)
	    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	(function(root) {
	    var MAX_VALUE = 0x7fffffff;

	    // The SHA256 and PBKDF2 implementation are from scrypt-async-js:
	    // See: https://github.com/dchest/scrypt-async-js
	    function SHA256(m) {
	        var K = [
	           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
	           0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
	           0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
	           0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
	           0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
	           0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
	           0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
	           0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
	           0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
	           0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	       ];

	        var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
	        var h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
	        var w = new Array(64);

	        function blocks(p) {
	            var off = 0, len = p.length;
	            while (len >= 64) {
	                var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i, j, t1, t2;

	                for (i = 0; i < 16; i++) {
	                    j = off + i*4;
	                    w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
	                    ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
	                }

	                for (i = 16; i < 64; i++) {
	                    u = w[i-2];
	                    t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

	                    u = w[i-15];
	                    t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

	                    w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
	                }

	                for (i = 0; i < 64; i++) {
	                    t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
	                             ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
	                          ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

	                    t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
	                           ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

	                    h = g;
	                    g = f;
	                    f = e;
	                    e = (d + t1) | 0;
	                    d = c;
	                    c = b;
	                    b = a;
	                    a = (t1 + t2) | 0;
	                }

	                h0 = (h0 + a) | 0;
	                h1 = (h1 + b) | 0;
	                h2 = (h2 + c) | 0;
	                h3 = (h3 + d) | 0;
	                h4 = (h4 + e) | 0;
	                h5 = (h5 + f) | 0;
	                h6 = (h6 + g) | 0;
	                h7 = (h7 + h) | 0;

	                off += 64;
	                len -= 64;
	            }
	        }

	        blocks(m);

	        var i, bytesLeft = m.length % 64,
	        bitLenHi = (m.length / 0x20000000) | 0,
	        bitLenLo = m.length << 3,
	        numZeros = (bytesLeft < 56) ? 56 : 120,
	        p = m.slice(m.length - bytesLeft, m.length);

	        p.push(0x80);
	        for (i = bytesLeft + 1; i < numZeros; i++) { p.push(0); }
	        p.push((bitLenHi>>>24) & 0xff);
	        p.push((bitLenHi>>>16) & 0xff);
	        p.push((bitLenHi>>>8)  & 0xff);
	        p.push((bitLenHi>>>0)  & 0xff);
	        p.push((bitLenLo>>>24) & 0xff);
	        p.push((bitLenLo>>>16) & 0xff);
	        p.push((bitLenLo>>>8)  & 0xff);
	        p.push((bitLenLo>>>0)  & 0xff);

	        blocks(p);

	        return [
	            (h0>>>24) & 0xff, (h0>>>16) & 0xff, (h0>>>8) & 0xff, (h0>>>0) & 0xff,
	            (h1>>>24) & 0xff, (h1>>>16) & 0xff, (h1>>>8) & 0xff, (h1>>>0) & 0xff,
	            (h2>>>24) & 0xff, (h2>>>16) & 0xff, (h2>>>8) & 0xff, (h2>>>0) & 0xff,
	            (h3>>>24) & 0xff, (h3>>>16) & 0xff, (h3>>>8) & 0xff, (h3>>>0) & 0xff,
	            (h4>>>24) & 0xff, (h4>>>16) & 0xff, (h4>>>8) & 0xff, (h4>>>0) & 0xff,
	            (h5>>>24) & 0xff, (h5>>>16) & 0xff, (h5>>>8) & 0xff, (h5>>>0) & 0xff,
	            (h6>>>24) & 0xff, (h6>>>16) & 0xff, (h6>>>8) & 0xff, (h6>>>0) & 0xff,
	            (h7>>>24) & 0xff, (h7>>>16) & 0xff, (h7>>>8) & 0xff, (h7>>>0) & 0xff
	        ];
	    }

	    function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
	        // compress password if it's longer than hash block length
	        password = password.length <= 64 ? password : SHA256(password);

	        var i;
	        var innerLen = 64 + salt.length + 4;
	        var inner = new Array(innerLen);
	        var outerKey = new Array(64);
	        var dk = [];

	        // inner = (password ^ ipad) || salt || counter
	        for (i = 0; i < 64; i++) inner[i] = 0x36;
	        for (i = 0; i < password.length; i++) inner[i] ^= password[i];
	        for (i = 0; i < salt.length; i++) inner[64+i] = salt[i];
	        for (i = innerLen - 4; i < innerLen; i++) inner[i] = 0;

	        // outerKey = password ^ opad
	        for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
	        for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

	        // increments counter inside inner
	        function incrementCounter() {
	            for (var i = innerLen-1; i >= innerLen-4; i--) {
	                inner[i]++;
	                if (inner[i] <= 0xff) return;
	                inner[i] = 0;
	            }
	        }

	        // output blocks = SHA256(outerKey || SHA256(inner)) ...
	        while (dkLen >= 32) {
	            incrementCounter();
	            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
	            dkLen -= 32;
	        }
	        if (dkLen > 0) {
	            incrementCounter();
	            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
	        }

	        return dk;
	    }

	    // The following is an adaptation of scryptsy
	    // See: https://www.npmjs.com/package/scryptsy
	    function blockmix_salsa8(BY, Yi, r, x, _X) {
	        var i;

	        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
	        for (i = 0; i < 2 * r; i++) {
	            blockxor(BY, i * 16, _X, 16);
	            salsa20_8(_X, x);
	            arraycopy(_X, 0, BY, Yi + (i * 16), 16);
	        }

	        for (i = 0; i < r; i++) {
	            arraycopy(BY, Yi + (i * 2) * 16, BY, (i * 16), 16);
	        }

	        for (i = 0; i < r; i++) {
	            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
	        }
	    }

	    function R(a, b) {
	        return (a << b) | (a >>> (32 - b));
	    }

	    function salsa20_8(B, x) {
	        arraycopy(B, 0, x, 0, 16);

	        for (var i = 8; i > 0; i -= 2) {
	            x[ 4] ^= R(x[ 0] + x[12], 7);
	            x[ 8] ^= R(x[ 4] + x[ 0], 9);
	            x[12] ^= R(x[ 8] + x[ 4], 13);
	            x[ 0] ^= R(x[12] + x[ 8], 18);
	            x[ 9] ^= R(x[ 5] + x[ 1], 7);
	            x[13] ^= R(x[ 9] + x[ 5], 9);
	            x[ 1] ^= R(x[13] + x[ 9], 13);
	            x[ 5] ^= R(x[ 1] + x[13], 18);
	            x[14] ^= R(x[10] + x[ 6], 7);
	            x[ 2] ^= R(x[14] + x[10], 9);
	            x[ 6] ^= R(x[ 2] + x[14], 13);
	            x[10] ^= R(x[ 6] + x[ 2], 18);
	            x[ 3] ^= R(x[15] + x[11], 7);
	            x[ 7] ^= R(x[ 3] + x[15], 9);
	            x[11] ^= R(x[ 7] + x[ 3], 13);
	            x[15] ^= R(x[11] + x[ 7], 18);
	            x[ 1] ^= R(x[ 0] + x[ 3], 7);
	            x[ 2] ^= R(x[ 1] + x[ 0], 9);
	            x[ 3] ^= R(x[ 2] + x[ 1], 13);
	            x[ 0] ^= R(x[ 3] + x[ 2], 18);
	            x[ 6] ^= R(x[ 5] + x[ 4], 7);
	            x[ 7] ^= R(x[ 6] + x[ 5], 9);
	            x[ 4] ^= R(x[ 7] + x[ 6], 13);
	            x[ 5] ^= R(x[ 4] + x[ 7], 18);
	            x[11] ^= R(x[10] + x[ 9], 7);
	            x[ 8] ^= R(x[11] + x[10], 9);
	            x[ 9] ^= R(x[ 8] + x[11], 13);
	            x[10] ^= R(x[ 9] + x[ 8], 18);
	            x[12] ^= R(x[15] + x[14], 7);
	            x[13] ^= R(x[12] + x[15], 9);
	            x[14] ^= R(x[13] + x[12], 13);
	            x[15] ^= R(x[14] + x[13], 18);
	        }

	        for (i = 0; i < 16; ++i) {
	            B[i] += x[i];
	        }
	    }

	    // naive approach... going back to loop unrolling may yield additional performance
	    function blockxor(S, Si, D, len) {
	        for (var i = 0; i < len; i++) {
	            D[i] ^= S[Si + i]
	        }
	    }

	    function arraycopy(src, srcPos, dest, destPos, length) {
	        while (length--) {
	            dest[destPos++] = src[srcPos++];
	        }
	    }

	    function checkBufferish(o) {
	        if (!o || typeof(o.length) !== 'number') {
	            return false;
	        }
	        for (var i = 0; i < o.length; i++) {
	            if (typeof(o[i]) !== 'number') { return false; }

	            var v = parseInt(o[i]);
	            if (v != o[i] || v < 0 || v >= 256) {
	                return false;
	            }
	        }
	        return true;
	    }

	    function ensureInteger(value, name) {
	        var intValue = parseInt(value);
	        if (value != intValue) { throw new Error('invalid ' + name); }
	        return intValue;
	    }

	    // N = Cpu cost, r = Memory cost, p = parallelization cost
	    // callback(error, progress, key)
	    function scrypt(password, salt, N, r, p, dkLen, callback) {

	        if (!callback) { throw new Error('missing callback'); }

	        N = ensureInteger(N, 'N');
	        r = ensureInteger(r, 'r');
	        p = ensureInteger(p, 'p');

	        dkLen = ensureInteger(dkLen, 'dkLen');

	        if (N === 0 || (N & (N - 1)) !== 0) { throw new Error('N must be power of 2'); }

	        if (N > MAX_VALUE / 128 / r) { throw new Error('N too large'); }
	        if (r > MAX_VALUE / 128 / p) { throw new Error('r too large'); }

	        if (!checkBufferish(password)) {
	            throw new Error('password must be an array or buffer');
	        }

	        if (!checkBufferish(salt)) {
	            throw new Error('salt must be an array or buffer');
	        }

	        var b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
	        var B = new Uint32Array(p * 32 * r)
	        for (var i = 0; i < B.length; i++) {
	            var j = i * 4;
	            B[i] = ((b[j + 3] & 0xff) << 24) |
	                   ((b[j + 2] & 0xff) << 16) |
	                   ((b[j + 1] & 0xff) << 8) |
	                   ((b[j + 0] & 0xff) << 0);
	        }

	        var XY = new Uint32Array(64 * r);
	        var V = new Uint32Array(32 * r * N);

	        var Yi = 32 * r;

	        // scratch space
	        var x = new Uint32Array(16);       // salsa20_8
	        var _X = new Uint32Array(16);      // blockmix_salsa8

	        var totalOps = p * N * 2;
	        var currentOp = 0;
	        var lastPercent10 = null;

	        // Set this to true to abandon the scrypt on the next step
	        var stop = false;

	        // State information
	        var state = 0;
	        var i0 = 0, i1;
	        var Bi;

	        // How many blockmix_salsa8 can we do per step?
	        var limit = parseInt(1000 / r);

	        // Trick from scrypt-async; if there is a setImmediate shim in place, use it
	        var nextTick = (typeof(setImmediate) !== 'undefined') ? setImmediate : setTimeout;

	        // This is really all I changed; making scryptsy a state machine so we occasionally
	        // stop and give other evnts on the evnt loop a chance to run. ~RicMoo
	        var incrementalSMix = function() {
	            if (stop) {
	                return callback(new Error('cancelled'), currentOp / totalOps);
	            }

	            switch (state) {
	                case 0:
	                    // for (var i = 0; i < p; i++)...
	                    Bi = i0 * 32 * r;

	                    arraycopy(B, Bi, XY, 0, Yi);                       // ROMix - 1

	                    state = 1;                                         // Move to ROMix 2
	                    i1 = 0;

	                    // Fall through

	                case 1:

	                    // Run up to 1000 steps of the first inner smix loop
	                    var steps = N - i1;
	                    if (steps > limit) { steps = limit; }
	                    for (var i = 0; i < steps; i++) {                  // ROMix - 2
	                        arraycopy(XY, 0, V, (i1 + i) * Yi, Yi)         // ROMix - 3
	                        blockmix_salsa8(XY, Yi, r, x, _X);             // ROMix - 4
	                    }

	                    // for (var i = 0; i < N; i++)
	                    i1 += steps;
	                    currentOp += steps;

	                    // Call the callback with the progress (optionally stopping us)
	                    var percent10 = parseInt(1000 * currentOp / totalOps);
	                    if (percent10 !== lastPercent10) {
	                        stop = callback(null, currentOp / totalOps);
	                        if (stop) { break; }
	                        lastPercent10 = percent10;
	                    }

	                    if (i1 < N) {
	                        break;
	                    }

	                    i1 = 0;                                          // Move to ROMix 6
	                    state = 2;

	                    // Fall through

	                case 2:

	                    // Run up to 1000 steps of the second inner smix loop
	                    var steps = N - i1;
	                    if (steps > limit) { steps = limit; }
	                    for (var i = 0; i < steps; i++) {                // ROMix - 6
	                        var offset = (2 * r - 1) * 16;               // ROMix - 7
	                        var j = XY[offset] & (N - 1);
	                        blockxor(V, j * Yi, XY, Yi);                 // ROMix - 8 (inner)
	                        blockmix_salsa8(XY, Yi, r, x, _X);           // ROMix - 9 (outer)
	                    }

	                    // for (var i = 0; i < N; i++)...
	                    i1 += steps;
	                    currentOp += steps;

	                    // Call the callback with the progress (optionally stopping us)
	                    var percent10 = parseInt(1000 * currentOp / totalOps);
	                    if (percent10 !== lastPercent10) {
	                        stop = callback(null, currentOp / totalOps);
	                        if (stop) { break; }
	                        lastPercent10 = percent10;
	                    }

	                    if (i1 < N) {
	                        break;
	                    }

	                    arraycopy(XY, 0, B, Bi, Yi);                     // ROMix - 10

	                    // for (var i = 0; i < p; i++)...
	                    i0++;
	                    if (i0 < p) {
	                        state = 0;
	                        break;
	                    }

	                    b = [];
	                    for (var i = 0; i < B.length; i++) {
	                        b.push((B[i] >>  0) & 0xff);
	                        b.push((B[i] >>  8) & 0xff);
	                        b.push((B[i] >> 16) & 0xff);
	                        b.push((B[i] >> 24) & 0xff);
	                    }

	                    var derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);

	                    // Done; don't break (which would reschedule)
	                    return callback(null, 1.0, derivedKey);
	                }

	                // Schedule the next steps
	                nextTick(incrementalSMix);
	            }

	            // Bootstrap the incremental smix
	            incrementalSMix();
	    }

	    // node.js
	    if (true) {
	       module.exports = scrypt;

	    // RequireJS/AMD
	    // http://www.requirejs.org/docs/api.html
	    // https://github.com/amdjs/amdjs-api/wiki/AMD
	    } else if (typeof(define) === 'function' && define.amd) {
	        define(scrypt);

	    // Web Browsers
	    } else if (root) {

	        // If there was an existing library "scrypt", make sure it is still available
	        if (root.scrypt) {
	            root._scrypt = root.scrypt;
	        }

	        root.scrypt = scrypt;
	    }

	})(this);


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * index.js
	 *
	 * a request API compatible with window.fetch
	 */

	var parse_url = __webpack_require__(18).parse;
	var resolve_url = __webpack_require__(18).resolve;
	var http = __webpack_require__(21);
	var https = __webpack_require__(22);
	var zlib = __webpack_require__(23);
	var stream = __webpack_require__(24);

	var Body = __webpack_require__(25);
	var Response = __webpack_require__(53);
	var Headers = __webpack_require__(54);
	var Request = __webpack_require__(55);
	var FetchError = __webpack_require__(52);

	// commonjs
	module.exports = Fetch;
	// es6 default export compatibility
	module.exports.default = module.exports;

	/**
	 * Fetch class
	 *
	 * @param   Mixed    url   Absolute url or Request instance
	 * @param   Object   opts  Fetch options
	 * @return  Promise
	 */
	function Fetch(url, opts) {

		// allow call as function
		if (!(this instanceof Fetch))
			return new Fetch(url, opts);

		// allow custom promise
		if (!Fetch.Promise) {
			throw new Error('native promise missing, set Fetch.Promise to your favorite alternative');
		}

		Body.Promise = Fetch.Promise;

		var self = this;

		// wrap http.request into fetch
		return new Fetch.Promise(function(resolve, reject) {
			// build request object
			var options = new Request(url, opts);

			if (!options.protocol || !options.hostname) {
				throw new Error('only absolute urls are supported');
			}

			if (options.protocol !== 'http:' && options.protocol !== 'https:') {
				throw new Error('only http(s) protocols are supported');
			}

			var send;
			if (options.protocol === 'https:') {
				send = https.request;
			} else {
				send = http.request;
			}

			// normalize headers
			var headers = new Headers(options.headers);

			if (options.compress) {
				headers.set('accept-encoding', 'gzip,deflate');
			}

			if (!headers.has('user-agent')) {
				headers.set('user-agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
			}

			if (!headers.has('connection') && !options.agent) {
				headers.set('connection', 'close');
			}

			if (!headers.has('accept')) {
				headers.set('accept', '*/*');
			}

			// detect form data input from form-data module, this hack avoid the need to pass multipart header manually
			if (!headers.has('content-type') && options.body && typeof options.body.getBoundary === 'function') {
				headers.set('content-type', 'multipart/form-data; boundary=' + options.body.getBoundary());
			}

			// bring node-fetch closer to browser behavior by setting content-length automatically
			if (!headers.has('content-length') && /post|put|patch|delete/i.test(options.method)) {
				if (typeof options.body === 'string') {
					headers.set('content-length', Buffer.byteLength(options.body));
				// detect form data input from form-data module, this hack avoid the need to add content-length header manually
				} else if (options.body && typeof options.body.getLengthSync === 'function') {
					// for form-data 1.x
					if (options.body._lengthRetrievers && options.body._lengthRetrievers.length == 0) {
						headers.set('content-length', options.body.getLengthSync().toString());
					// for form-data 2.x
					} else if (options.body.hasKnownLength && options.body.hasKnownLength()) {
						headers.set('content-length', options.body.getLengthSync().toString());
					}
				// this is only necessary for older nodejs releases (before iojs merge)
				} else if (options.body === undefined || options.body === null) {
					headers.set('content-length', '0');
				}
			}

			options.headers = headers.raw();

			// http.request only support string as host header, this hack make custom host header possible
			if (options.headers.host) {
				options.headers.host = options.headers.host[0];
			}

			// send request
			var req = send(options);
			var reqTimeout;

			if (options.timeout) {
				req.once('socket', function(socket) {
					reqTimeout = setTimeout(function() {
						req.abort();
						reject(new FetchError('network timeout at: ' + options.url, 'request-timeout'));
					}, options.timeout);
				});
			}

			req.on('error', function(err) {
				clearTimeout(reqTimeout);
				reject(new FetchError('request to ' + options.url + ' failed, reason: ' + err.message, 'system', err));
			});

			req.on('response', function(res) {
				clearTimeout(reqTimeout);

				// handle redirect
				if (self.isRedirect(res.statusCode) && options.redirect !== 'manual') {
					if (options.redirect === 'error') {
						reject(new FetchError('redirect mode is set to error: ' + options.url, 'no-redirect'));
						return;
					}

					if (options.counter >= options.follow) {
						reject(new FetchError('maximum redirect reached at: ' + options.url, 'max-redirect'));
						return;
					}

					if (!res.headers.location) {
						reject(new FetchError('redirect location header missing at: ' + options.url, 'invalid-redirect'));
						return;
					}

					// per fetch spec, for POST request with 301/302 response, or any request with 303 response, use GET when following redirect
					if (res.statusCode === 303
						|| ((res.statusCode === 301 || res.statusCode === 302) && options.method === 'POST'))
					{
						options.method = 'GET';
						delete options.body;
						delete options.headers['content-length'];
					}

					options.counter++;

					resolve(Fetch(resolve_url(options.url, res.headers.location), options));
					return;
				}

				// normalize location header for manual redirect mode
				var headers = new Headers(res.headers);
				if (options.redirect === 'manual' && headers.has('location')) {
					headers.set('location', resolve_url(options.url, headers.get('location')));
				}

				// prepare response
				var body = res.pipe(new stream.PassThrough());
				var response_options = {
					url: options.url
					, status: res.statusCode
					, statusText: res.statusMessage
					, headers: headers
					, size: options.size
					, timeout: options.timeout
				};

				// response object
				var output;

				// in following scenarios we ignore compression support
				// 1. compression support is disabled
				// 2. HEAD request
				// 3. no content-encoding header
				// 4. no content response (204)
				// 5. content not modified response (304)
				if (!options.compress || options.method === 'HEAD' || !headers.has('content-encoding') || res.statusCode === 204 || res.statusCode === 304) {
					output = new Response(body, response_options);
					resolve(output);
					return;
				}

				// otherwise, check for gzip or deflate
				var name = headers.get('content-encoding');

				// for gzip
				if (name == 'gzip' || name == 'x-gzip') {
					body = body.pipe(zlib.createGunzip());
					output = new Response(body, response_options);
					resolve(output);
					return;

				// for deflate
				} else if (name == 'deflate' || name == 'x-deflate') {
					// handle the infamous raw deflate response from old servers
					// a hack for old IIS and Apache servers
					var raw = res.pipe(new stream.PassThrough());
					raw.once('data', function(chunk) {
						// see http://stackoverflow.com/questions/37519828
						if ((chunk[0] & 0x0F) === 0x08) {
							body = body.pipe(zlib.createInflate());
						} else {
							body = body.pipe(zlib.createInflateRaw());
						}
						output = new Response(body, response_options);
						resolve(output);
					});
					return;
				}

				// otherwise, use response as-is
				output = new Response(body, response_options);
				resolve(output);
				return;
			});

			// accept string, buffer or readable stream as body
			// per spec we will call tostring on non-stream objects
			if (typeof options.body === 'string') {
				req.write(options.body);
				req.end();
			} else if (options.body instanceof Buffer) {
				req.write(options.body);
				req.end()
			} else if (typeof options.body === 'object' && options.body.pipe) {
				options.body.pipe(req);
			} else if (typeof options.body === 'object') {
				req.write(options.body.toString());
				req.end();
			} else {
				req.end();
			}
		});

	};

	/**
	 * Redirect code matching
	 *
	 * @param   Number   code  Status code
	 * @return  Boolean
	 */
	Fetch.prototype.isRedirect = function(code) {
		return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
	}

	// expose Promise
	Fetch.Promise = global.Promise;
	Fetch.Response = Response;
	Fetch.Headers = Headers;
	Fetch.Request = Request;


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("zlib");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * body.js
	 *
	 * Body interface provides common methods for Request and Response
	 */

	var convert = __webpack_require__(26).convert;
	var bodyStream = __webpack_require__(51);
	var PassThrough = __webpack_require__(24).PassThrough;
	var FetchError = __webpack_require__(52);

	module.exports = Body;

	/**
	 * Body class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	function Body(body, opts) {

		opts = opts || {};

		this.body = body;
		this.bodyUsed = false;
		this.size = opts.size || 0;
		this.timeout = opts.timeout || 0;
		this._raw = [];
		this._abort = false;

	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	Body.prototype.json = function() {

		// for 204 No Content response, buffer will be empty, parsing it will throw error
		if (this.status === 204) {
			return Body.Promise.resolve({});
		}

		return this._decode().then(function(buffer) {
			return JSON.parse(buffer.toString());
		});

	};

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	Body.prototype.text = function() {

		return this._decode().then(function(buffer) {
			return buffer.toString();
		});

	};

	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	Body.prototype.buffer = function() {

		return this._decode();

	};

	/**
	 * Decode buffers into utf-8 string
	 *
	 * @return  Promise
	 */
	Body.prototype._decode = function() {

		var self = this;

		if (this.bodyUsed) {
			return Body.Promise.reject(new Error('body used already for: ' + this.url));
		}

		this.bodyUsed = true;
		this._bytes = 0;
		this._abort = false;
		this._raw = [];

		return new Body.Promise(function(resolve, reject) {
			var resTimeout;

			// body is string
			if (typeof self.body === 'string') {
				self._bytes = self.body.length;
				self._raw = [new Buffer(self.body)];
				return resolve(self._convert());
			}

			// body is buffer
			if (self.body instanceof Buffer) {
				self._bytes = self.body.length;
				self._raw = [self.body];
				return resolve(self._convert());
			}

			// allow timeout on slow response body
			if (self.timeout) {
				resTimeout = setTimeout(function() {
					self._abort = true;
					reject(new FetchError('response timeout at ' + self.url + ' over limit: ' + self.timeout, 'body-timeout'));
				}, self.timeout);
			}

			// handle stream error, such as incorrect content-encoding
			self.body.on('error', function(err) {
				reject(new FetchError('invalid response body at: ' + self.url + ' reason: ' + err.message, 'system', err));
			});

			// body is stream
			self.body.on('data', function(chunk) {
				if (self._abort || chunk === null) {
					return;
				}

				if (self.size && self._bytes + chunk.length > self.size) {
					self._abort = true;
					reject(new FetchError('content size at ' + self.url + ' over limit: ' + self.size, 'max-size'));
					return;
				}

				self._bytes += chunk.length;
				self._raw.push(chunk);
			});

			self.body.on('end', function() {
				if (self._abort) {
					return;
				}

				clearTimeout(resTimeout);
				resolve(self._convert());
			});
		});

	};

	/**
	 * Detect buffer encoding and convert to target encoding
	 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
	 *
	 * @param   String  encoding  Target encoding
	 * @return  String
	 */
	Body.prototype._convert = function(encoding) {

		encoding = encoding || 'utf-8';

		var ct = this.headers.get('content-type');
		var charset = 'utf-8';
		var res, str;

		// header
		if (ct) {
			// skip encoding detection altogether if not html/xml/plain text
			if (!/text\/html|text\/plain|\+xml|\/xml/i.test(ct)) {
				return Buffer.concat(this._raw);
			}

			res = /charset=([^;]*)/i.exec(ct);
		}

		// no charset in content type, peek at response body for at most 1024 bytes
		if (!res && this._raw.length > 0) {
			for (var i = 0; i < this._raw.length; i++) {
				str += this._raw[i].toString()
				if (str.length > 1024) {
					break;
				}
			}
			str = str.substr(0, 1024);
		}

		// html5
		if (!res && str) {
			res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
		}

		// html4
		if (!res && str) {
			res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

			if (res) {
				res = /charset=(.*)/i.exec(res.pop());
			}
		}

		// xml
		if (!res && str) {
			res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
		}

		// found charset
		if (res) {
			charset = res.pop();

			// prevent decode issues when sites use incorrect encoding
			// ref: https://hsivonen.fi/encoding-menu/
			if (charset === 'gb2312' || charset === 'gbk') {
				charset = 'gb18030';
			}
		}

		// turn raw buffers into a single utf-8 buffer
		return convert(
			Buffer.concat(this._raw)
			, encoding
			, charset
		);

	};

	/**
	 * Clone body given Res/Req instance
	 *
	 * @param   Mixed  instance  Response or Request instance
	 * @return  Mixed
	 */
	Body.prototype._clone = function(instance) {
		var p1, p2;
		var body = instance.body;

		// don't allow cloning a used body
		if (instance.bodyUsed) {
			throw new Error('cannot clone body after it is used');
		}

		// check that body is a stream and not form-data object
		// note: we can't clone the form-data object without having it as a dependency
		if (bodyStream(body) && typeof body.getBoundary !== 'function') {
			// tee instance body
			p1 = new PassThrough();
			p2 = new PassThrough();
			body.pipe(p1);
			body.pipe(p2);
			// set instance body to teed body and return the other teed body
			instance.body = p1;
			body = p2;
		}

		return body;
	}

	// expose Promise
	Body.Promise = global.Promise;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var iconvLite = __webpack_require__(27);
	// Load Iconv from an external file to be able to disable Iconv for webpack
	// Add /\/iconv-loader$/ to webpack.IgnorePlugin to ignore it
	var Iconv = __webpack_require__(49);

	// Expose to the world
	module.exports.convert = convert;

	/**
	 * Convert encoding of an UTF-8 string or a buffer
	 *
	 * @param {String|Buffer} str String to be converted
	 * @param {String} to Encoding to be converted to
	 * @param {String} [from='UTF-8'] Encoding to be converted from
	 * @param {Boolean} useLite If set to ture, force to use iconvLite
	 * @return {Buffer} Encoded string
	 */
	function convert(str, to, from, useLite) {
	    from = checkEncoding(from || 'UTF-8');
	    to = checkEncoding(to || 'UTF-8');
	    str = str || '';

	    var result;

	    if (from !== 'UTF-8' && typeof str === 'string') {
	        str = new Buffer(str, 'binary');
	    }

	    if (from === to) {
	        if (typeof str === 'string') {
	            result = new Buffer(str);
	        } else {
	            result = str;
	        }
	    } else if (Iconv && !useLite) {
	        try {
	            result = convertIconv(str, to, from);
	        } catch (E) {
	            console.error(E);
	            try {
	                result = convertIconvLite(str, to, from);
	            } catch (E) {
	                console.error(E);
	                result = str;
	            }
	        }
	    } else {
	        try {
	            result = convertIconvLite(str, to, from);
	        } catch (E) {
	            console.error(E);
	            result = str;
	        }
	    }


	    if (typeof result === 'string') {
	        result = new Buffer(result, 'utf-8');
	    }

	    return result;
	}

	/**
	 * Convert encoding of a string with node-iconv (if available)
	 *
	 * @param {String|Buffer} str String to be converted
	 * @param {String} to Encoding to be converted to
	 * @param {String} [from='UTF-8'] Encoding to be converted from
	 * @return {Buffer} Encoded string
	 */
	function convertIconv(str, to, from) {
	    var response, iconv;
	    iconv = new Iconv(from, to + '//TRANSLIT//IGNORE');
	    response = iconv.convert(str);
	    return response.slice(0, response.length);
	}

	/**
	 * Convert encoding of astring with iconv-lite
	 *
	 * @param {String|Buffer} str String to be converted
	 * @param {String} to Encoding to be converted to
	 * @param {String} [from='UTF-8'] Encoding to be converted from
	 * @return {Buffer} Encoded string
	 */
	function convertIconvLite(str, to, from) {
	    if (to === 'UTF-8') {
	        return iconvLite.decode(str, from);
	    } else if (from === 'UTF-8') {
	        return iconvLite.encode(str, to);
	    } else {
	        return iconvLite.encode(iconvLite.decode(str, from), to);
	    }
	}

	/**
	 * Converts charset name if needed
	 *
	 * @param {String} name Character set
	 * @return {String} Character set name
	 */
	function checkEncoding(name) {
	    return (name || '').toString().trim().
	    replace(/^latin[\-_]?(\d+)$/i, 'ISO-8859-$1').
	    replace(/^win(?:dows)?[\-_]?(\d+)$/i, 'WINDOWS-$1').
	    replace(/^utf[\-_]?(\d+)$/i, 'UTF-$1').
	    replace(/^ks_c_5601\-1987$/i, 'CP949').
	    replace(/^us[\-_]?ascii$/i, 'ASCII').
	    toUpperCase();
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var bomHandling = __webpack_require__(28),
	    iconv = module.exports;

	// All codecs and aliases are kept here, keyed by encoding name/alias.
	// They are lazy loaded in `iconv.getCodec` from `encodings/index.js`.
	iconv.encodings = null;

	// Characters emitted in case of error.
	iconv.defaultCharUnicode = '�';
	iconv.defaultCharSingleByte = '?';

	// Public API.
	iconv.encode = function encode(str, encoding, options) {
	    str = "" + (str || ""); // Ensure string.

	    var encoder = iconv.getEncoder(encoding, options);

	    var res = encoder.write(str);
	    var trail = encoder.end();
	    
	    return (trail && trail.length > 0) ? Buffer.concat([res, trail]) : res;
	}

	iconv.decode = function decode(buf, encoding, options) {
	    if (typeof buf === 'string') {
	        if (!iconv.skipDecodeWarning) {
	            console.error('Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding');
	            iconv.skipDecodeWarning = true;
	        }

	        buf = new Buffer("" + (buf || ""), "binary"); // Ensure buffer.
	    }

	    var decoder = iconv.getDecoder(encoding, options);

	    var res = decoder.write(buf);
	    var trail = decoder.end();

	    return trail ? (res + trail) : res;
	}

	iconv.encodingExists = function encodingExists(enc) {
	    try {
	        iconv.getCodec(enc);
	        return true;
	    } catch (e) {
	        return false;
	    }
	}

	// Legacy aliases to convert functions
	iconv.toEncoding = iconv.encode;
	iconv.fromEncoding = iconv.decode;

	// Search for a codec in iconv.encodings. Cache codec data in iconv._codecDataCache.
	iconv._codecDataCache = {};
	iconv.getCodec = function getCodec(encoding) {
	    if (!iconv.encodings)
	        iconv.encodings = __webpack_require__(29); // Lazy load all encoding definitions.
	    
	    // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
	    var enc = (''+encoding).toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, "");

	    // Traverse iconv.encodings to find actual codec.
	    var codecOptions = {};
	    while (true) {
	        var codec = iconv._codecDataCache[enc];
	        if (codec)
	            return codec;

	        var codecDef = iconv.encodings[enc];

	        switch (typeof codecDef) {
	            case "string": // Direct alias to other encoding.
	                enc = codecDef;
	                break;

	            case "object": // Alias with options. Can be layered.
	                for (var key in codecDef)
	                    codecOptions[key] = codecDef[key];

	                if (!codecOptions.encodingName)
	                    codecOptions.encodingName = enc;
	                
	                enc = codecDef.type;
	                break;

	            case "function": // Codec itself.
	                if (!codecOptions.encodingName)
	                    codecOptions.encodingName = enc;

	                // The codec function must load all tables and return object with .encoder and .decoder methods.
	                // It'll be called only once (for each different options object).
	                codec = new codecDef(codecOptions, iconv);

	                iconv._codecDataCache[codecOptions.encodingName] = codec; // Save it to be reused later.
	                return codec;

	            default:
	                throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '"+enc+"')");
	        }
	    }
	}

	iconv.getEncoder = function getEncoder(encoding, options) {
	    var codec = iconv.getCodec(encoding),
	        encoder = new codec.encoder(options, codec);

	    if (codec.bomAware && options && options.addBOM)
	        encoder = new bomHandling.PrependBOM(encoder, options);

	    return encoder;
	}

	iconv.getDecoder = function getDecoder(encoding, options) {
	    var codec = iconv.getCodec(encoding),
	        decoder = new codec.decoder(options, codec);

	    if (codec.bomAware && !(options && options.stripBOM === false))
	        decoder = new bomHandling.StripBOM(decoder, options);

	    return decoder;
	}


	// Load extensions in Node. All of them are omitted in Browserify build via 'browser' field in package.json.
	var nodeVer = typeof process !== 'undefined' && process.versions && process.versions.node;
	if (nodeVer) {

	    // Load streaming support in Node v0.10+
	    var nodeVerArr = nodeVer.split(".").map(Number);
	    if (nodeVerArr[0] > 0 || nodeVerArr[1] >= 10) {
	        __webpack_require__(47)(iconv);
	    }

	    // Load Node primitive extensions.
	    __webpack_require__(48)(iconv);
	}



/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict"

	var BOMChar = '\uFEFF';

	exports.PrependBOM = PrependBOMWrapper
	function PrependBOMWrapper(encoder, options) {
	    this.encoder = encoder;
	    this.addBOM = true;
	}

	PrependBOMWrapper.prototype.write = function(str) {
	    if (this.addBOM) {
	        str = BOMChar + str;
	        this.addBOM = false;
	    }

	    return this.encoder.write(str);
	}

	PrependBOMWrapper.prototype.end = function() {
	    return this.encoder.end();
	}


	//------------------------------------------------------------------------------

	exports.StripBOM = StripBOMWrapper;
	function StripBOMWrapper(decoder, options) {
	    this.decoder = decoder;
	    this.pass = false;
	    this.options = options || {};
	}

	StripBOMWrapper.prototype.write = function(buf) {
	    var res = this.decoder.write(buf);
	    if (this.pass || !res)
	        return res;

	    if (res[0] === BOMChar) {
	        res = res.slice(1);
	        if (typeof this.options.stripBOM === 'function')
	            this.options.stripBOM();
	    }

	    this.pass = true;
	    return res;
	}

	StripBOMWrapper.prototype.end = function() {
	    return this.decoder.end();
	}



/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	// Update this array if you add/rename/remove files in this directory.
	// We support Browserify by skipping automatic module discovery and requiring modules directly.
	var modules = [
	    __webpack_require__(30),
	    __webpack_require__(32),
	    __webpack_require__(33),
	    __webpack_require__(34),
	    __webpack_require__(35),
	    __webpack_require__(36),
	    __webpack_require__(37),
	    __webpack_require__(38),
	];

	// Put all encoding/alias/codec definitions to single object and export it. 
	for (var i = 0; i < modules.length; i++) {
	    var module = modules[i];
	    for (var enc in module)
	        if (Object.prototype.hasOwnProperty.call(module, enc))
	            exports[enc] = module[enc];
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	// Export Node.js internal encodings.

	module.exports = {
	    // Encodings
	    utf8:   { type: "_internal", bomAware: true},
	    cesu8:  { type: "_internal", bomAware: true},
	    unicode11utf8: "utf8",

	    ucs2:   { type: "_internal", bomAware: true},
	    utf16le: "ucs2",

	    binary: { type: "_internal" },
	    base64: { type: "_internal" },
	    hex:    { type: "_internal" },

	    // Codec.
	    _internal: InternalCodec,
	};

	//------------------------------------------------------------------------------

	function InternalCodec(codecOptions, iconv) {
	    this.enc = codecOptions.encodingName;
	    this.bomAware = codecOptions.bomAware;

	    if (this.enc === "base64")
	        this.encoder = InternalEncoderBase64;
	    else if (this.enc === "cesu8") {
	        this.enc = "utf8"; // Use utf8 for decoding.
	        this.encoder = InternalEncoderCesu8;

	        // Add decoder for versions of Node not supporting CESU-8
	        if (new Buffer("eda080", 'hex').toString().length == 3) {
	            this.decoder = InternalDecoderCesu8;
	            this.defaultCharUnicode = iconv.defaultCharUnicode;
	        }
	    }
	}

	InternalCodec.prototype.encoder = InternalEncoder;
	InternalCodec.prototype.decoder = InternalDecoder;

	//------------------------------------------------------------------------------

	// We use node.js internal decoder. Its signature is the same as ours.
	var StringDecoder = __webpack_require__(31).StringDecoder;

	if (!StringDecoder.prototype.end) // Node v0.8 doesn't have this method.
	    StringDecoder.prototype.end = function() {};


	function InternalDecoder(options, codec) {
	    StringDecoder.call(this, codec.enc);
	}

	InternalDecoder.prototype = StringDecoder.prototype;


	//------------------------------------------------------------------------------
	// Encoder is mostly trivial

	function InternalEncoder(options, codec) {
	    this.enc = codec.enc;
	}

	InternalEncoder.prototype.write = function(str) {
	    return new Buffer(str, this.enc);
	}

	InternalEncoder.prototype.end = function() {
	}


	//------------------------------------------------------------------------------
	// Except base64 encoder, which must keep its state.

	function InternalEncoderBase64(options, codec) {
	    this.prevStr = '';
	}

	InternalEncoderBase64.prototype.write = function(str) {
	    str = this.prevStr + str;
	    var completeQuads = str.length - (str.length % 4);
	    this.prevStr = str.slice(completeQuads);
	    str = str.slice(0, completeQuads);

	    return new Buffer(str, "base64");
	}

	InternalEncoderBase64.prototype.end = function() {
	    return new Buffer(this.prevStr, "base64");
	}


	//------------------------------------------------------------------------------
	// CESU-8 encoder is also special.

	function InternalEncoderCesu8(options, codec) {
	}

	InternalEncoderCesu8.prototype.write = function(str) {
	    var buf = new Buffer(str.length * 3), bufIdx = 0;
	    for (var i = 0; i < str.length; i++) {
	        var charCode = str.charCodeAt(i);
	        // Naive implementation, but it works because CESU-8 is especially easy
	        // to convert from UTF-16 (which all JS strings are encoded in).
	        if (charCode < 0x80)
	            buf[bufIdx++] = charCode;
	        else if (charCode < 0x800) {
	            buf[bufIdx++] = 0xC0 + (charCode >>> 6);
	            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
	        }
	        else { // charCode will always be < 0x10000 in javascript.
	            buf[bufIdx++] = 0xE0 + (charCode >>> 12);
	            buf[bufIdx++] = 0x80 + ((charCode >>> 6) & 0x3f);
	            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
	        }
	    }
	    return buf.slice(0, bufIdx);
	}

	InternalEncoderCesu8.prototype.end = function() {
	}

	//------------------------------------------------------------------------------
	// CESU-8 decoder is not implemented in Node v4.0+

	function InternalDecoderCesu8(options, codec) {
	    this.acc = 0;
	    this.contBytes = 0;
	    this.accBytes = 0;
	    this.defaultCharUnicode = codec.defaultCharUnicode;
	}

	InternalDecoderCesu8.prototype.write = function(buf) {
	    var acc = this.acc, contBytes = this.contBytes, accBytes = this.accBytes, 
	        res = '';
	    for (var i = 0; i < buf.length; i++) {
	        var curByte = buf[i];
	        if ((curByte & 0xC0) !== 0x80) { // Leading byte
	            if (contBytes > 0) { // Previous code is invalid
	                res += this.defaultCharUnicode;
	                contBytes = 0;
	            }

	            if (curByte < 0x80) { // Single-byte code
	                res += String.fromCharCode(curByte);
	            } else if (curByte < 0xE0) { // Two-byte code
	                acc = curByte & 0x1F;
	                contBytes = 1; accBytes = 1;
	            } else if (curByte < 0xF0) { // Three-byte code
	                acc = curByte & 0x0F;
	                contBytes = 2; accBytes = 1;
	            } else { // Four or more are not supported for CESU-8.
	                res += this.defaultCharUnicode;
	            }
	        } else { // Continuation byte
	            if (contBytes > 0) { // We're waiting for it.
	                acc = (acc << 6) | (curByte & 0x3f);
	                contBytes--; accBytes++;
	                if (contBytes === 0) {
	                    // Check for overlong encoding, but support Modified UTF-8 (encoding NULL as C0 80)
	                    if (accBytes === 2 && acc < 0x80 && acc > 0)
	                        res += this.defaultCharUnicode;
	                    else if (accBytes === 3 && acc < 0x800)
	                        res += this.defaultCharUnicode;
	                    else
	                        // Actually add character.
	                        res += String.fromCharCode(acc);
	                }
	            } else { // Unexpected continuation byte
	                res += this.defaultCharUnicode;
	            }
	        }
	    }
	    this.acc = acc; this.contBytes = contBytes; this.accBytes = accBytes;
	    return res;
	}

	InternalDecoderCesu8.prototype.end = function() {
	    var res = 0;
	    if (this.contBytes > 0)
	        res += this.defaultCharUnicode;
	    return res;
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("string_decoder");

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict"

	// Note: UTF16-LE (or UCS2) codec is Node.js native. See encodings/internal.js

	// == UTF16-BE codec. ==========================================================

	exports.utf16be = Utf16BECodec;
	function Utf16BECodec() {
	}

	Utf16BECodec.prototype.encoder = Utf16BEEncoder;
	Utf16BECodec.prototype.decoder = Utf16BEDecoder;
	Utf16BECodec.prototype.bomAware = true;


	// -- Encoding

	function Utf16BEEncoder() {
	}

	Utf16BEEncoder.prototype.write = function(str) {
	    var buf = new Buffer(str, 'ucs2');
	    for (var i = 0; i < buf.length; i += 2) {
	        var tmp = buf[i]; buf[i] = buf[i+1]; buf[i+1] = tmp;
	    }
	    return buf;
	}

	Utf16BEEncoder.prototype.end = function() {
	}


	// -- Decoding

	function Utf16BEDecoder() {
	    this.overflowByte = -1;
	}

	Utf16BEDecoder.prototype.write = function(buf) {
	    if (buf.length == 0)
	        return '';

	    var buf2 = new Buffer(buf.length + 1),
	        i = 0, j = 0;

	    if (this.overflowByte !== -1) {
	        buf2[0] = buf[0];
	        buf2[1] = this.overflowByte;
	        i = 1; j = 2;
	    }

	    for (; i < buf.length-1; i += 2, j+= 2) {
	        buf2[j] = buf[i+1];
	        buf2[j+1] = buf[i];
	    }

	    this.overflowByte = (i == buf.length-1) ? buf[buf.length-1] : -1;

	    return buf2.slice(0, j).toString('ucs2');
	}

	Utf16BEDecoder.prototype.end = function() {
	}


	// == UTF-16 codec =============================================================
	// Decoder chooses automatically from UTF-16LE and UTF-16BE using BOM and space-based heuristic.
	// Defaults to UTF-16LE, as it's prevalent and default in Node.
	// http://en.wikipedia.org/wiki/UTF-16 and http://encoding.spec.whatwg.org/#utf-16le
	// Decoder default can be changed: iconv.decode(buf, 'utf16', {defaultEncoding: 'utf-16be'});

	// Encoder uses UTF-16LE and prepends BOM (which can be overridden with addBOM: false).

	exports.utf16 = Utf16Codec;
	function Utf16Codec(codecOptions, iconv) {
	    this.iconv = iconv;
	}

	Utf16Codec.prototype.encoder = Utf16Encoder;
	Utf16Codec.prototype.decoder = Utf16Decoder;


	// -- Encoding (pass-through)

	function Utf16Encoder(options, codec) {
	    options = options || {};
	    if (options.addBOM === undefined)
	        options.addBOM = true;
	    this.encoder = codec.iconv.getEncoder('utf-16le', options);
	}

	Utf16Encoder.prototype.write = function(str) {
	    return this.encoder.write(str);
	}

	Utf16Encoder.prototype.end = function() {
	    return this.encoder.end();
	}


	// -- Decoding

	function Utf16Decoder(options, codec) {
	    this.decoder = null;
	    this.initialBytes = [];
	    this.initialBytesLen = 0;

	    this.options = options || {};
	    this.iconv = codec.iconv;
	}

	Utf16Decoder.prototype.write = function(buf) {
	    if (!this.decoder) {
	        // Codec is not chosen yet. Accumulate initial bytes.
	        this.initialBytes.push(buf);
	        this.initialBytesLen += buf.length;
	        
	        if (this.initialBytesLen < 16) // We need more bytes to use space heuristic (see below)
	            return '';

	        // We have enough bytes -> detect endianness.
	        var buf = Buffer.concat(this.initialBytes),
	            encoding = detectEncoding(buf, this.options.defaultEncoding);
	        this.decoder = this.iconv.getDecoder(encoding, this.options);
	        this.initialBytes.length = this.initialBytesLen = 0;
	    }

	    return this.decoder.write(buf);
	}

	Utf16Decoder.prototype.end = function() {
	    if (!this.decoder) {
	        var buf = Buffer.concat(this.initialBytes),
	            encoding = detectEncoding(buf, this.options.defaultEncoding);
	        this.decoder = this.iconv.getDecoder(encoding, this.options);

	        var res = this.decoder.write(buf),
	            trail = this.decoder.end();

	        return trail ? (res + trail) : res;
	    }
	    return this.decoder.end();
	}

	function detectEncoding(buf, defaultEncoding) {
	    var enc = defaultEncoding || 'utf-16le';

	    if (buf.length >= 2) {
	        // Check BOM.
	        if (buf[0] == 0xFE && buf[1] == 0xFF) // UTF-16BE BOM
	            enc = 'utf-16be';
	        else if (buf[0] == 0xFF && buf[1] == 0xFE) // UTF-16LE BOM
	            enc = 'utf-16le';
	        else {
	            // No BOM found. Try to deduce encoding from initial content.
	            // Most of the time, the content has ASCII chars (U+00**), but the opposite (U+**00) is uncommon.
	            // So, we count ASCII as if it was LE or BE, and decide from that.
	            var asciiCharsLE = 0, asciiCharsBE = 0, // Counts of chars in both positions
	                _len = Math.min(buf.length - (buf.length % 2), 64); // Len is always even.

	            for (var i = 0; i < _len; i += 2) {
	                if (buf[i] === 0 && buf[i+1] !== 0) asciiCharsBE++;
	                if (buf[i] !== 0 && buf[i+1] === 0) asciiCharsLE++;
	            }

	            if (asciiCharsBE > asciiCharsLE)
	                enc = 'utf-16be';
	            else if (asciiCharsBE < asciiCharsLE)
	                enc = 'utf-16le';
	        }
	    }

	    return enc;
	}




/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict"

	// UTF-7 codec, according to https://tools.ietf.org/html/rfc2152
	// See also below a UTF-7-IMAP codec, according to http://tools.ietf.org/html/rfc3501#section-5.1.3

	exports.utf7 = Utf7Codec;
	exports.unicode11utf7 = 'utf7'; // Alias UNICODE-1-1-UTF-7
	function Utf7Codec(codecOptions, iconv) {
	    this.iconv = iconv;
	};

	Utf7Codec.prototype.encoder = Utf7Encoder;
	Utf7Codec.prototype.decoder = Utf7Decoder;
	Utf7Codec.prototype.bomAware = true;


	// -- Encoding

	var nonDirectChars = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;

	function Utf7Encoder(options, codec) {
	    this.iconv = codec.iconv;
	}

	Utf7Encoder.prototype.write = function(str) {
	    // Naive implementation.
	    // Non-direct chars are encoded as "+<base64>-"; single "+" char is encoded as "+-".
	    return new Buffer(str.replace(nonDirectChars, function(chunk) {
	        return "+" + (chunk === '+' ? '' : 
	            this.iconv.encode(chunk, 'utf16-be').toString('base64').replace(/=+$/, '')) 
	            + "-";
	    }.bind(this)));
	}

	Utf7Encoder.prototype.end = function() {
	}


	// -- Decoding

	function Utf7Decoder(options, codec) {
	    this.iconv = codec.iconv;
	    this.inBase64 = false;
	    this.base64Accum = '';
	}

	var base64Regex = /[A-Za-z0-9\/+]/;
	var base64Chars = [];
	for (var i = 0; i < 256; i++)
	    base64Chars[i] = base64Regex.test(String.fromCharCode(i));

	var plusChar = '+'.charCodeAt(0), 
	    minusChar = '-'.charCodeAt(0),
	    andChar = '&'.charCodeAt(0);

	Utf7Decoder.prototype.write = function(buf) {
	    var res = "", lastI = 0,
	        inBase64 = this.inBase64,
	        base64Accum = this.base64Accum;

	    // The decoder is more involved as we must handle chunks in stream.

	    for (var i = 0; i < buf.length; i++) {
	        if (!inBase64) { // We're in direct mode.
	            // Write direct chars until '+'
	            if (buf[i] == plusChar) {
	                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
	                lastI = i+1;
	                inBase64 = true;
	            }
	        } else { // We decode base64.
	            if (!base64Chars[buf[i]]) { // Base64 ended.
	                if (i == lastI && buf[i] == minusChar) {// "+-" -> "+"
	                    res += "+";
	                } else {
	                    var b64str = base64Accum + buf.slice(lastI, i).toString();
	                    res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	                }

	                if (buf[i] != minusChar) // Minus is absorbed after base64.
	                    i--;

	                lastI = i+1;
	                inBase64 = false;
	                base64Accum = '';
	            }
	        }
	    }

	    if (!inBase64) {
	        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
	    } else {
	        var b64str = base64Accum + buf.slice(lastI).toString();

	        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
	        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
	        b64str = b64str.slice(0, canBeDecoded);

	        res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	    }

	    this.inBase64 = inBase64;
	    this.base64Accum = base64Accum;

	    return res;
	}

	Utf7Decoder.prototype.end = function() {
	    var res = "";
	    if (this.inBase64 && this.base64Accum.length > 0)
	        res = this.iconv.decode(new Buffer(this.base64Accum, 'base64'), "utf16-be");

	    this.inBase64 = false;
	    this.base64Accum = '';
	    return res;
	}


	// UTF-7-IMAP codec.
	// RFC3501 Sec. 5.1.3 Modified UTF-7 (http://tools.ietf.org/html/rfc3501#section-5.1.3)
	// Differences:
	//  * Base64 part is started by "&" instead of "+"
	//  * Direct characters are 0x20-0x7E, except "&" (0x26)
	//  * In Base64, "," is used instead of "/"
	//  * Base64 must not be used to represent direct characters.
	//  * No implicit shift back from Base64 (should always end with '-')
	//  * String must end in non-shifted position.
	//  * "-&" while in base64 is not allowed.


	exports.utf7imap = Utf7IMAPCodec;
	function Utf7IMAPCodec(codecOptions, iconv) {
	    this.iconv = iconv;
	};

	Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
	Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
	Utf7IMAPCodec.prototype.bomAware = true;


	// -- Encoding

	function Utf7IMAPEncoder(options, codec) {
	    this.iconv = codec.iconv;
	    this.inBase64 = false;
	    this.base64Accum = new Buffer(6);
	    this.base64AccumIdx = 0;
	}

	Utf7IMAPEncoder.prototype.write = function(str) {
	    var inBase64 = this.inBase64,
	        base64Accum = this.base64Accum,
	        base64AccumIdx = this.base64AccumIdx,
	        buf = new Buffer(str.length*5 + 10), bufIdx = 0;

	    for (var i = 0; i < str.length; i++) {
	        var uChar = str.charCodeAt(i);
	        if (0x20 <= uChar && uChar <= 0x7E) { // Direct character or '&'.
	            if (inBase64) {
	                if (base64AccumIdx > 0) {
	                    bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
	                    base64AccumIdx = 0;
	                }

	                buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
	                inBase64 = false;
	            }

	            if (!inBase64) {
	                buf[bufIdx++] = uChar; // Write direct character

	                if (uChar === andChar)  // Ampersand -> '&-'
	                    buf[bufIdx++] = minusChar;
	            }

	        } else { // Non-direct character
	            if (!inBase64) {
	                buf[bufIdx++] = andChar; // Write '&', then go to base64 mode.
	                inBase64 = true;
	            }
	            if (inBase64) {
	                base64Accum[base64AccumIdx++] = uChar >> 8;
	                base64Accum[base64AccumIdx++] = uChar & 0xFF;

	                if (base64AccumIdx == base64Accum.length) {
	                    bufIdx += buf.write(base64Accum.toString('base64').replace(/\//g, ','), bufIdx);
	                    base64AccumIdx = 0;
	                }
	            }
	        }
	    }

	    this.inBase64 = inBase64;
	    this.base64AccumIdx = base64AccumIdx;

	    return buf.slice(0, bufIdx);
	}

	Utf7IMAPEncoder.prototype.end = function() {
	    var buf = new Buffer(10), bufIdx = 0;
	    if (this.inBase64) {
	        if (this.base64AccumIdx > 0) {
	            bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
	            this.base64AccumIdx = 0;
	        }

	        buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
	        this.inBase64 = false;
	    }

	    return buf.slice(0, bufIdx);
	}


	// -- Decoding

	function Utf7IMAPDecoder(options, codec) {
	    this.iconv = codec.iconv;
	    this.inBase64 = false;
	    this.base64Accum = '';
	}

	var base64IMAPChars = base64Chars.slice();
	base64IMAPChars[','.charCodeAt(0)] = true;

	Utf7IMAPDecoder.prototype.write = function(buf) {
	    var res = "", lastI = 0,
	        inBase64 = this.inBase64,
	        base64Accum = this.base64Accum;

	    // The decoder is more involved as we must handle chunks in stream.
	    // It is forgiving, closer to standard UTF-7 (for example, '-' is optional at the end).

	    for (var i = 0; i < buf.length; i++) {
	        if (!inBase64) { // We're in direct mode.
	            // Write direct chars until '&'
	            if (buf[i] == andChar) {
	                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
	                lastI = i+1;
	                inBase64 = true;
	            }
	        } else { // We decode base64.
	            if (!base64IMAPChars[buf[i]]) { // Base64 ended.
	                if (i == lastI && buf[i] == minusChar) { // "&-" -> "&"
	                    res += "&";
	                } else {
	                    var b64str = base64Accum + buf.slice(lastI, i).toString().replace(/,/g, '/');
	                    res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	                }

	                if (buf[i] != minusChar) // Minus may be absorbed after base64.
	                    i--;

	                lastI = i+1;
	                inBase64 = false;
	                base64Accum = '';
	            }
	        }
	    }

	    if (!inBase64) {
	        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
	    } else {
	        var b64str = base64Accum + buf.slice(lastI).toString().replace(/,/g, '/');

	        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
	        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
	        b64str = b64str.slice(0, canBeDecoded);

	        res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
	    }

	    this.inBase64 = inBase64;
	    this.base64Accum = base64Accum;

	    return res;
	}

	Utf7IMAPDecoder.prototype.end = function() {
	    var res = "";
	    if (this.inBase64 && this.base64Accum.length > 0)
	        res = this.iconv.decode(new Buffer(this.base64Accum, 'base64'), "utf16-be");

	    this.inBase64 = false;
	    this.base64Accum = '';
	    return res;
	}




/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict"

	// Single-byte codec. Needs a 'chars' string parameter that contains 256 or 128 chars that
	// correspond to encoded bytes (if 128 - then lower half is ASCII). 

	exports._sbcs = SBCSCodec;
	function SBCSCodec(codecOptions, iconv) {
	    if (!codecOptions)
	        throw new Error("SBCS codec is called without the data.")
	    
	    // Prepare char buffer for decoding.
	    if (!codecOptions.chars || (codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256))
	        throw new Error("Encoding '"+codecOptions.type+"' has incorrect 'chars' (must be of len 128 or 256)");
	    
	    if (codecOptions.chars.length === 128) {
	        var asciiString = "";
	        for (var i = 0; i < 128; i++)
	            asciiString += String.fromCharCode(i);
	        codecOptions.chars = asciiString + codecOptions.chars;
	    }

	    this.decodeBuf = new Buffer(codecOptions.chars, 'ucs2');
	    
	    // Encoding buffer.
	    var encodeBuf = new Buffer(65536);
	    encodeBuf.fill(iconv.defaultCharSingleByte.charCodeAt(0));

	    for (var i = 0; i < codecOptions.chars.length; i++)
	        encodeBuf[codecOptions.chars.charCodeAt(i)] = i;

	    this.encodeBuf = encodeBuf;
	}

	SBCSCodec.prototype.encoder = SBCSEncoder;
	SBCSCodec.prototype.decoder = SBCSDecoder;


	function SBCSEncoder(options, codec) {
	    this.encodeBuf = codec.encodeBuf;
	}

	SBCSEncoder.prototype.write = function(str) {
	    var buf = new Buffer(str.length);
	    for (var i = 0; i < str.length; i++)
	        buf[i] = this.encodeBuf[str.charCodeAt(i)];
	    
	    return buf;
	}

	SBCSEncoder.prototype.end = function() {
	}


	function SBCSDecoder(options, codec) {
	    this.decodeBuf = codec.decodeBuf;
	}

	SBCSDecoder.prototype.write = function(buf) {
	    // Strings are immutable in JS -> we use ucs2 buffer to speed up computations.
	    var decodeBuf = this.decodeBuf;
	    var newBuf = new Buffer(buf.length*2);
	    var idx1 = 0, idx2 = 0;
	    for (var i = 0; i < buf.length; i++) {
	        idx1 = buf[i]*2; idx2 = i*2;
	        newBuf[idx2] = decodeBuf[idx1];
	        newBuf[idx2+1] = decodeBuf[idx1+1];
	    }
	    return newBuf.toString('ucs2');
	}

	SBCSDecoder.prototype.end = function() {
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict"

	// Manually added data to be used by sbcs codec in addition to generated one.

	module.exports = {
	    // Not supported by iconv, not sure why.
	    "10029": "maccenteuro",
	    "maccenteuro": {
	        "type": "_sbcs",
	        "chars": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
	    },

	    "808": "cp808",
	    "ibm808": "cp808",
	    "cp808": {
	        "type": "_sbcs",
	        "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
	    },

	    // Aliases of generated encodings.
	    "ascii8bit": "ascii",
	    "usascii": "ascii",
	    "ansix34": "ascii",
	    "ansix341968": "ascii",
	    "ansix341986": "ascii",
	    "csascii": "ascii",
	    "cp367": "ascii",
	    "ibm367": "ascii",
	    "isoir6": "ascii",
	    "iso646us": "ascii",
	    "iso646irv": "ascii",
	    "us": "ascii",

	    "latin1": "iso88591",
	    "latin2": "iso88592",
	    "latin3": "iso88593",
	    "latin4": "iso88594",
	    "latin5": "iso88599",
	    "latin6": "iso885910",
	    "latin7": "iso885913",
	    "latin8": "iso885914",
	    "latin9": "iso885915",
	    "latin10": "iso885916",

	    "csisolatin1": "iso88591",
	    "csisolatin2": "iso88592",
	    "csisolatin3": "iso88593",
	    "csisolatin4": "iso88594",
	    "csisolatincyrillic": "iso88595",
	    "csisolatinarabic": "iso88596",
	    "csisolatingreek" : "iso88597",
	    "csisolatinhebrew": "iso88598",
	    "csisolatin5": "iso88599",
	    "csisolatin6": "iso885910",

	    "l1": "iso88591",
	    "l2": "iso88592",
	    "l3": "iso88593",
	    "l4": "iso88594",
	    "l5": "iso88599",
	    "l6": "iso885910",
	    "l7": "iso885913",
	    "l8": "iso885914",
	    "l9": "iso885915",
	    "l10": "iso885916",

	    "isoir14": "iso646jp",
	    "isoir57": "iso646cn",
	    "isoir100": "iso88591",
	    "isoir101": "iso88592",
	    "isoir109": "iso88593",
	    "isoir110": "iso88594",
	    "isoir144": "iso88595",
	    "isoir127": "iso88596",
	    "isoir126": "iso88597",
	    "isoir138": "iso88598",
	    "isoir148": "iso88599",
	    "isoir157": "iso885910",
	    "isoir166": "tis620",
	    "isoir179": "iso885913",
	    "isoir199": "iso885914",
	    "isoir203": "iso885915",
	    "isoir226": "iso885916",

	    "cp819": "iso88591",
	    "ibm819": "iso88591",

	    "cyrillic": "iso88595",

	    "arabic": "iso88596",
	    "arabic8": "iso88596",
	    "ecma114": "iso88596",
	    "asmo708": "iso88596",

	    "greek" : "iso88597",
	    "greek8" : "iso88597",
	    "ecma118" : "iso88597",
	    "elot928" : "iso88597",

	    "hebrew": "iso88598",
	    "hebrew8": "iso88598",

	    "turkish": "iso88599",
	    "turkish8": "iso88599",

	    "thai": "iso885911",
	    "thai8": "iso885911",

	    "celtic": "iso885914",
	    "celtic8": "iso885914",
	    "isoceltic": "iso885914",

	    "tis6200": "tis620",
	    "tis62025291": "tis620",
	    "tis62025330": "tis620",

	    "10000": "macroman",
	    "10006": "macgreek",
	    "10007": "maccyrillic",
	    "10079": "maciceland",
	    "10081": "macturkish",

	    "cspc8codepage437": "cp437",
	    "cspc775baltic": "cp775",
	    "cspc850multilingual": "cp850",
	    "cspcp852": "cp852",
	    "cspc862latinhebrew": "cp862",
	    "cpgr": "cp869",

	    "msee": "cp1250",
	    "mscyrl": "cp1251",
	    "msansi": "cp1252",
	    "msgreek": "cp1253",
	    "msturk": "cp1254",
	    "mshebr": "cp1255",
	    "msarab": "cp1256",
	    "winbaltrim": "cp1257",

	    "cp20866": "koi8r",
	    "20866": "koi8r",
	    "ibm878": "koi8r",
	    "cskoi8r": "koi8r",

	    "cp21866": "koi8u",
	    "21866": "koi8u",
	    "ibm1168": "koi8u",

	    "strk10482002": "rk1048",

	    "tcvn5712": "tcvn",
	    "tcvn57121": "tcvn",

	    "gb198880": "iso646cn",
	    "cn": "iso646cn",

	    "csiso14jisc6220ro": "iso646jp",
	    "jisc62201969ro": "iso646jp",
	    "jp": "iso646jp",

	    "cshproman8": "hproman8",
	    "r8": "hproman8",
	    "roman8": "hproman8",
	    "xroman8": "hproman8",
	    "ibm1051": "hproman8",

	    "mac": "macintosh",
	    "csmacintosh": "macintosh",
	};



/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict"

	// Generated data for sbcs codec. Don't edit manually. Regenerate using generation/gen-sbcs.js script.
	module.exports = {
	  "437": "cp437",
	  "737": "cp737",
	  "775": "cp775",
	  "850": "cp850",
	  "852": "cp852",
	  "855": "cp855",
	  "856": "cp856",
	  "857": "cp857",
	  "858": "cp858",
	  "860": "cp860",
	  "861": "cp861",
	  "862": "cp862",
	  "863": "cp863",
	  "864": "cp864",
	  "865": "cp865",
	  "866": "cp866",
	  "869": "cp869",
	  "874": "windows874",
	  "922": "cp922",
	  "1046": "cp1046",
	  "1124": "cp1124",
	  "1125": "cp1125",
	  "1129": "cp1129",
	  "1133": "cp1133",
	  "1161": "cp1161",
	  "1162": "cp1162",
	  "1163": "cp1163",
	  "1250": "windows1250",
	  "1251": "windows1251",
	  "1252": "windows1252",
	  "1253": "windows1253",
	  "1254": "windows1254",
	  "1255": "windows1255",
	  "1256": "windows1256",
	  "1257": "windows1257",
	  "1258": "windows1258",
	  "28591": "iso88591",
	  "28592": "iso88592",
	  "28593": "iso88593",
	  "28594": "iso88594",
	  "28595": "iso88595",
	  "28596": "iso88596",
	  "28597": "iso88597",
	  "28598": "iso88598",
	  "28599": "iso88599",
	  "28600": "iso885910",
	  "28601": "iso885911",
	  "28603": "iso885913",
	  "28604": "iso885914",
	  "28605": "iso885915",
	  "28606": "iso885916",
	  "windows874": {
	    "type": "_sbcs",
	    "chars": "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  },
	  "win874": "windows874",
	  "cp874": "windows874",
	  "windows1250": {
	    "type": "_sbcs",
	    "chars": "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
	  },
	  "win1250": "windows1250",
	  "cp1250": "windows1250",
	  "windows1251": {
	    "type": "_sbcs",
	    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	  },
	  "win1251": "windows1251",
	  "cp1251": "windows1251",
	  "windows1252": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "win1252": "windows1252",
	  "cp1252": "windows1252",
	  "windows1253": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
	  },
	  "win1253": "windows1253",
	  "cp1253": "windows1253",
	  "windows1254": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
	  },
	  "win1254": "windows1254",
	  "cp1254": "windows1254",
	  "windows1255": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹ�ֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
	  },
	  "win1255": "windows1255",
	  "cp1255": "windows1255",
	  "windows1256": {
	    "type": "_sbcs",
	    "chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
	  },
	  "win1256": "windows1256",
	  "cp1256": "windows1256",
	  "windows1257": {
	    "type": "_sbcs",
	    "chars": "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
	  },
	  "win1257": "windows1257",
	  "cp1257": "windows1257",
	  "windows1258": {
	    "type": "_sbcs",
	    "chars": "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	  },
	  "win1258": "windows1258",
	  "cp1258": "windows1258",
	  "iso88591": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "cp28591": "iso88591",
	  "iso88592": {
	    "type": "_sbcs",
	    "chars": " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
	  },
	  "cp28592": "iso88592",
	  "iso88593": {
	    "type": "_sbcs",
	    "chars": " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
	  },
	  "cp28593": "iso88593",
	  "iso88594": {
	    "type": "_sbcs",
	    "chars": " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
	  },
	  "cp28594": "iso88594",
	  "iso88595": {
	    "type": "_sbcs",
	    "chars": " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
	  },
	  "cp28595": "iso88595",
	  "iso88596": {
	    "type": "_sbcs",
	    "chars": " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
	  },
	  "cp28596": "iso88596",
	  "iso88597": {
	    "type": "_sbcs",
	    "chars": " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
	  },
	  "cp28597": "iso88597",
	  "iso88598": {
	    "type": "_sbcs",
	    "chars": " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
	  },
	  "cp28598": "iso88598",
	  "iso88599": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
	  },
	  "cp28599": "iso88599",
	  "iso885910": {
	    "type": "_sbcs",
	    "chars": " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
	  },
	  "cp28600": "iso885910",
	  "iso885911": {
	    "type": "_sbcs",
	    "chars": " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  },
	  "cp28601": "iso885911",
	  "iso885913": {
	    "type": "_sbcs",
	    "chars": " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
	  },
	  "cp28603": "iso885913",
	  "iso885914": {
	    "type": "_sbcs",
	    "chars": " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
	  },
	  "cp28604": "iso885914",
	  "iso885915": {
	    "type": "_sbcs",
	    "chars": " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "cp28605": "iso885915",
	  "iso885916": {
	    "type": "_sbcs",
	    "chars": " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
	  },
	  "cp28606": "iso885916",
	  "cp437": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm437": "cp437",
	  "csibm437": "cp437",
	  "cp737": {
	    "type": "_sbcs",
	    "chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
	  },
	  "ibm737": "cp737",
	  "csibm737": "cp737",
	  "cp775": {
	    "type": "_sbcs",
	    "chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
	  },
	  "ibm775": "cp775",
	  "csibm775": "cp775",
	  "cp850": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm850": "cp850",
	  "csibm850": "cp850",
	  "cp852": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
	  },
	  "ibm852": "cp852",
	  "csibm852": "cp852",
	  "cp855": {
	    "type": "_sbcs",
	    "chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
	  },
	  "ibm855": "cp855",
	  "csibm855": "cp855",
	  "cp856": {
	    "type": "_sbcs",
	    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm856": "cp856",
	  "csibm856": "cp856",
	  "cp857": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm857": "cp857",
	  "csibm857": "cp857",
	  "cp858": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
	  },
	  "ibm858": "cp858",
	  "csibm858": "cp858",
	  "cp860": {
	    "type": "_sbcs",
	    "chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm860": "cp860",
	  "csibm860": "cp860",
	  "cp861": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm861": "cp861",
	  "csibm861": "cp861",
	  "cp862": {
	    "type": "_sbcs",
	    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm862": "cp862",
	  "csibm862": "cp862",
	  "cp863": {
	    "type": "_sbcs",
	    "chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm863": "cp863",
	  "csibm863": "cp863",
	  "cp864": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
	  },
	  "ibm864": "cp864",
	  "csibm864": "cp864",
	  "cp865": {
	    "type": "_sbcs",
	    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
	  },
	  "ibm865": "cp865",
	  "csibm865": "cp865",
	  "cp866": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
	  },
	  "ibm866": "cp866",
	  "csibm866": "cp866",
	  "cp869": {
	    "type": "_sbcs",
	    "chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
	  },
	  "ibm869": "cp869",
	  "csibm869": "cp869",
	  "cp922": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
	  },
	  "ibm922": "cp922",
	  "csibm922": "cp922",
	  "cp1046": {
	    "type": "_sbcs",
	    "chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
	  },
	  "ibm1046": "cp1046",
	  "csibm1046": "cp1046",
	  "cp1124": {
	    "type": "_sbcs",
	    "chars": " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
	  },
	  "ibm1124": "cp1124",
	  "csibm1124": "cp1124",
	  "cp1125": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
	  },
	  "ibm1125": "cp1125",
	  "csibm1125": "cp1125",
	  "cp1129": {
	    "type": "_sbcs",
	    "chars": " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	  },
	  "ibm1129": "cp1129",
	  "csibm1129": "cp1129",
	  "cp1133": {
	    "type": "_sbcs",
	    "chars": " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
	  },
	  "ibm1133": "cp1133",
	  "csibm1133": "cp1133",
	  "cp1161": {
	    "type": "_sbcs",
	    "chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
	  },
	  "ibm1161": "cp1161",
	  "csibm1161": "cp1161",
	  "cp1162": {
	    "type": "_sbcs",
	    "chars": "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  },
	  "ibm1162": "cp1162",
	  "csibm1162": "cp1162",
	  "cp1163": {
	    "type": "_sbcs",
	    "chars": " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	  },
	  "ibm1163": "cp1163",
	  "csibm1163": "cp1163",
	  "maccroatian": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
	  },
	  "maccyrillic": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
	  },
	  "macgreek": {
	    "type": "_sbcs",
	    "chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
	  },
	  "maciceland": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macroman": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macromania": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macthai": {
	    "type": "_sbcs",
	    "chars": "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู﻿​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
	  },
	  "macturkish": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "macukraine": {
	    "type": "_sbcs",
	    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
	  },
	  "koi8r": {
	    "type": "_sbcs",
	    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "koi8u": {
	    "type": "_sbcs",
	    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "koi8ru": {
	    "type": "_sbcs",
	    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "koi8t": {
	    "type": "_sbcs",
	    "chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	  },
	  "armscii8": {
	    "type": "_sbcs",
	    "chars": " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
	  },
	  "rk1048": {
	    "type": "_sbcs",
	    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	  },
	  "tcvn": {
	    "type": "_sbcs",
	    "chars": "\u0000ÚỤ\u0003ỪỬỮ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010ỨỰỲỶỸÝỴ\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
	  },
	  "georgianacademy": {
	    "type": "_sbcs",
	    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "georgianps": {
	    "type": "_sbcs",
	    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	  },
	  "pt154": {
	    "type": "_sbcs",
	    "chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	  },
	  "viscii": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001Ẳ\u0003\u0004ẴẪ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013Ỷ\u0015\u0016\u0017\u0018Ỹ\u001a\u001b\u001c\u001dỴ\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
	  },
	  "iso646cn": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
	  },
	  "iso646jp": {
	    "type": "_sbcs",
	    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
	  },
	  "hproman8": {
	    "type": "_sbcs",
	    "chars": " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
	  },
	  "macintosh": {
	    "type": "_sbcs",
	    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	  },
	  "ascii": {
	    "type": "_sbcs",
	    "chars": "��������������������������������������������������������������������������������������������������������������������������������"
	  },
	  "tis620": {
	    "type": "_sbcs",
	    "chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	  }
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict"

	// Multibyte codec. In this scheme, a character is represented by 1 or more bytes.
	// Our codec supports UTF-16 surrogates, extensions for GB18030 and unicode sequences.
	// To save memory and loading time, we read table files only when requested.

	exports._dbcs = DBCSCodec;

	var UNASSIGNED = -1,
	    GB18030_CODE = -2,
	    SEQ_START  = -10,
	    NODE_START = -1000,
	    UNASSIGNED_NODE = new Array(0x100),
	    DEF_CHAR = -1;

	for (var i = 0; i < 0x100; i++)
	    UNASSIGNED_NODE[i] = UNASSIGNED;


	// Class DBCSCodec reads and initializes mapping tables.
	function DBCSCodec(codecOptions, iconv) {
	    this.encodingName = codecOptions.encodingName;
	    if (!codecOptions)
	        throw new Error("DBCS codec is called without the data.")
	    if (!codecOptions.table)
	        throw new Error("Encoding '" + this.encodingName + "' has no data.");

	    // Load tables.
	    var mappingTable = codecOptions.table();


	    // Decode tables: MBCS -> Unicode.

	    // decodeTables is a trie, encoded as an array of arrays of integers. Internal arrays are trie nodes and all have len = 256.
	    // Trie root is decodeTables[0].
	    // Values: >=  0 -> unicode character code. can be > 0xFFFF
	    //         == UNASSIGNED -> unknown/unassigned sequence.
	    //         == GB18030_CODE -> this is the end of a GB18030 4-byte sequence.
	    //         <= NODE_START -> index of the next node in our trie to process next byte.
	    //         <= SEQ_START  -> index of the start of a character code sequence, in decodeTableSeq.
	    this.decodeTables = [];
	    this.decodeTables[0] = UNASSIGNED_NODE.slice(0); // Create root node.

	    // Sometimes a MBCS char corresponds to a sequence of unicode chars. We store them as arrays of integers here. 
	    this.decodeTableSeq = [];

	    // Actual mapping tables consist of chunks. Use them to fill up decode tables.
	    for (var i = 0; i < mappingTable.length; i++)
	        this._addDecodeChunk(mappingTable[i]);

	    this.defaultCharUnicode = iconv.defaultCharUnicode;

	    
	    // Encode tables: Unicode -> DBCS.

	    // `encodeTable` is array mapping from unicode char to encoded char. All its values are integers for performance.
	    // Because it can be sparse, it is represented as array of buckets by 256 chars each. Bucket can be null.
	    // Values: >=  0 -> it is a normal char. Write the value (if <=256 then 1 byte, if <=65536 then 2 bytes, etc.).
	    //         == UNASSIGNED -> no conversion found. Output a default char.
	    //         <= SEQ_START  -> it's an index in encodeTableSeq, see below. The character starts a sequence.
	    this.encodeTable = [];
	    
	    // `encodeTableSeq` is used when a sequence of unicode characters is encoded as a single code. We use a tree of
	    // objects where keys correspond to characters in sequence and leafs are the encoded dbcs values. A special DEF_CHAR key
	    // means end of sequence (needed when one sequence is a strict subsequence of another).
	    // Objects are kept separately from encodeTable to increase performance.
	    this.encodeTableSeq = [];

	    // Some chars can be decoded, but need not be encoded.
	    var skipEncodeChars = {};
	    if (codecOptions.encodeSkipVals)
	        for (var i = 0; i < codecOptions.encodeSkipVals.length; i++) {
	            var val = codecOptions.encodeSkipVals[i];
	            if (typeof val === 'number')
	                skipEncodeChars[val] = true;
	            else
	                for (var j = val.from; j <= val.to; j++)
	                    skipEncodeChars[j] = true;
	        }
	        
	    // Use decode trie to recursively fill out encode tables.
	    this._fillEncodeTable(0, 0, skipEncodeChars);

	    // Add more encoding pairs when needed.
	    if (codecOptions.encodeAdd) {
	        for (var uChar in codecOptions.encodeAdd)
	            if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar))
	                this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
	    }

	    this.defCharSB  = this.encodeTable[0][iconv.defaultCharSingleByte.charCodeAt(0)];
	    if (this.defCharSB === UNASSIGNED) this.defCharSB = this.encodeTable[0]['?'];
	    if (this.defCharSB === UNASSIGNED) this.defCharSB = "?".charCodeAt(0);


	    // Load & create GB18030 tables when needed.
	    if (typeof codecOptions.gb18030 === 'function') {
	        this.gb18030 = codecOptions.gb18030(); // Load GB18030 ranges.

	        // Add GB18030 decode tables.
	        var thirdByteNodeIdx = this.decodeTables.length;
	        var thirdByteNode = this.decodeTables[thirdByteNodeIdx] = UNASSIGNED_NODE.slice(0);

	        var fourthByteNodeIdx = this.decodeTables.length;
	        var fourthByteNode = this.decodeTables[fourthByteNodeIdx] = UNASSIGNED_NODE.slice(0);

	        for (var i = 0x81; i <= 0xFE; i++) {
	            var secondByteNodeIdx = NODE_START - this.decodeTables[0][i];
	            var secondByteNode = this.decodeTables[secondByteNodeIdx];
	            for (var j = 0x30; j <= 0x39; j++)
	                secondByteNode[j] = NODE_START - thirdByteNodeIdx;
	        }
	        for (var i = 0x81; i <= 0xFE; i++)
	            thirdByteNode[i] = NODE_START - fourthByteNodeIdx;
	        for (var i = 0x30; i <= 0x39; i++)
	            fourthByteNode[i] = GB18030_CODE
	    }        
	}

	DBCSCodec.prototype.encoder = DBCSEncoder;
	DBCSCodec.prototype.decoder = DBCSDecoder;

	// Decoder helpers
	DBCSCodec.prototype._getDecodeTrieNode = function(addr) {
	    var bytes = [];
	    for (; addr > 0; addr >>= 8)
	        bytes.push(addr & 0xFF);
	    if (bytes.length == 0)
	        bytes.push(0);

	    var node = this.decodeTables[0];
	    for (var i = bytes.length-1; i > 0; i--) { // Traverse nodes deeper into the trie.
	        var val = node[bytes[i]];

	        if (val == UNASSIGNED) { // Create new node.
	            node[bytes[i]] = NODE_START - this.decodeTables.length;
	            this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
	        }
	        else if (val <= NODE_START) { // Existing node.
	            node = this.decodeTables[NODE_START - val];
	        }
	        else
	            throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
	    }
	    return node;
	}


	DBCSCodec.prototype._addDecodeChunk = function(chunk) {
	    // First element of chunk is the hex mbcs code where we start.
	    var curAddr = parseInt(chunk[0], 16);

	    // Choose the decoding node where we'll write our chars.
	    var writeTable = this._getDecodeTrieNode(curAddr);
	    curAddr = curAddr & 0xFF;

	    // Write all other elements of the chunk to the table.
	    for (var k = 1; k < chunk.length; k++) {
	        var part = chunk[k];
	        if (typeof part === "string") { // String, write as-is.
	            for (var l = 0; l < part.length;) {
	                var code = part.charCodeAt(l++);
	                if (0xD800 <= code && code < 0xDC00) { // Decode surrogate
	                    var codeTrail = part.charCodeAt(l++);
	                    if (0xDC00 <= codeTrail && codeTrail < 0xE000)
	                        writeTable[curAddr++] = 0x10000 + (code - 0xD800) * 0x400 + (codeTrail - 0xDC00);
	                    else
	                        throw new Error("Incorrect surrogate pair in "  + this.encodingName + " at chunk " + chunk[0]);
	                }
	                else if (0x0FF0 < code && code <= 0x0FFF) { // Character sequence (our own encoding used)
	                    var len = 0xFFF - code + 2;
	                    var seq = [];
	                    for (var m = 0; m < len; m++)
	                        seq.push(part.charCodeAt(l++)); // Simple variation: don't support surrogates or subsequences in seq.

	                    writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
	                    this.decodeTableSeq.push(seq);
	                }
	                else
	                    writeTable[curAddr++] = code; // Basic char
	            }
	        } 
	        else if (typeof part === "number") { // Integer, meaning increasing sequence starting with prev character.
	            var charCode = writeTable[curAddr - 1] + 1;
	            for (var l = 0; l < part; l++)
	                writeTable[curAddr++] = charCode++;
	        }
	        else
	            throw new Error("Incorrect type '" + typeof part + "' given in "  + this.encodingName + " at chunk " + chunk[0]);
	    }
	    if (curAddr > 0xFF)
	        throw new Error("Incorrect chunk in "  + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
	}

	// Encoder helpers
	DBCSCodec.prototype._getEncodeBucket = function(uCode) {
	    var high = uCode >> 8; // This could be > 0xFF because of astral characters.
	    if (this.encodeTable[high] === undefined)
	        this.encodeTable[high] = UNASSIGNED_NODE.slice(0); // Create bucket on demand.
	    return this.encodeTable[high];
	}

	DBCSCodec.prototype._setEncodeChar = function(uCode, dbcsCode) {
	    var bucket = this._getEncodeBucket(uCode);
	    var low = uCode & 0xFF;
	    if (bucket[low] <= SEQ_START)
	        this.encodeTableSeq[SEQ_START-bucket[low]][DEF_CHAR] = dbcsCode; // There's already a sequence, set a single-char subsequence of it.
	    else if (bucket[low] == UNASSIGNED)
	        bucket[low] = dbcsCode;
	}

	DBCSCodec.prototype._setEncodeSequence = function(seq, dbcsCode) {
	    
	    // Get the root of character tree according to first character of the sequence.
	    var uCode = seq[0];
	    var bucket = this._getEncodeBucket(uCode);
	    var low = uCode & 0xFF;

	    var node;
	    if (bucket[low] <= SEQ_START) {
	        // There's already a sequence with  - use it.
	        node = this.encodeTableSeq[SEQ_START-bucket[low]];
	    }
	    else {
	        // There was no sequence object - allocate a new one.
	        node = {};
	        if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low]; // If a char was set before - make it a single-char subsequence.
	        bucket[low] = SEQ_START - this.encodeTableSeq.length;
	        this.encodeTableSeq.push(node);
	    }

	    // Traverse the character tree, allocating new nodes as needed.
	    for (var j = 1; j < seq.length-1; j++) {
	        var oldVal = node[uCode];
	        if (typeof oldVal === 'object')
	            node = oldVal;
	        else {
	            node = node[uCode] = {}
	            if (oldVal !== undefined)
	                node[DEF_CHAR] = oldVal
	        }
	    }

	    // Set the leaf to given dbcsCode.
	    uCode = seq[seq.length-1];
	    node[uCode] = dbcsCode;
	}

	DBCSCodec.prototype._fillEncodeTable = function(nodeIdx, prefix, skipEncodeChars) {
	    var node = this.decodeTables[nodeIdx];
	    for (var i = 0; i < 0x100; i++) {
	        var uCode = node[i];
	        var mbCode = prefix + i;
	        if (skipEncodeChars[mbCode])
	            continue;

	        if (uCode >= 0)
	            this._setEncodeChar(uCode, mbCode);
	        else if (uCode <= NODE_START)
	            this._fillEncodeTable(NODE_START - uCode, mbCode << 8, skipEncodeChars);
	        else if (uCode <= SEQ_START)
	            this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);
	    }
	}



	// == Encoder ==================================================================

	function DBCSEncoder(options, codec) {
	    // Encoder state
	    this.leadSurrogate = -1;
	    this.seqObj = undefined;
	    
	    // Static data
	    this.encodeTable = codec.encodeTable;
	    this.encodeTableSeq = codec.encodeTableSeq;
	    this.defaultCharSingleByte = codec.defCharSB;
	    this.gb18030 = codec.gb18030;
	}

	DBCSEncoder.prototype.write = function(str) {
	    var newBuf = new Buffer(str.length * (this.gb18030 ? 4 : 3)), 
	        leadSurrogate = this.leadSurrogate,
	        seqObj = this.seqObj, nextChar = -1,
	        i = 0, j = 0;

	    while (true) {
	        // 0. Get next character.
	        if (nextChar === -1) {
	            if (i == str.length) break;
	            var uCode = str.charCodeAt(i++);
	        }
	        else {
	            var uCode = nextChar;
	            nextChar = -1;    
	        }

	        // 1. Handle surrogates.
	        if (0xD800 <= uCode && uCode < 0xE000) { // Char is one of surrogates.
	            if (uCode < 0xDC00) { // We've got lead surrogate.
	                if (leadSurrogate === -1) {
	                    leadSurrogate = uCode;
	                    continue;
	                } else {
	                    leadSurrogate = uCode;
	                    // Double lead surrogate found.
	                    uCode = UNASSIGNED;
	                }
	            } else { // We've got trail surrogate.
	                if (leadSurrogate !== -1) {
	                    uCode = 0x10000 + (leadSurrogate - 0xD800) * 0x400 + (uCode - 0xDC00);
	                    leadSurrogate = -1;
	                } else {
	                    // Incomplete surrogate pair - only trail surrogate found.
	                    uCode = UNASSIGNED;
	                }
	                
	            }
	        }
	        else if (leadSurrogate !== -1) {
	            // Incomplete surrogate pair - only lead surrogate found.
	            nextChar = uCode; uCode = UNASSIGNED; // Write an error, then current char.
	            leadSurrogate = -1;
	        }

	        // 2. Convert uCode character.
	        var dbcsCode = UNASSIGNED;
	        if (seqObj !== undefined && uCode != UNASSIGNED) { // We are in the middle of the sequence
	            var resCode = seqObj[uCode];
	            if (typeof resCode === 'object') { // Sequence continues.
	                seqObj = resCode;
	                continue;

	            } else if (typeof resCode == 'number') { // Sequence finished. Write it.
	                dbcsCode = resCode;

	            } else if (resCode == undefined) { // Current character is not part of the sequence.

	                // Try default character for this sequence
	                resCode = seqObj[DEF_CHAR];
	                if (resCode !== undefined) {
	                    dbcsCode = resCode; // Found. Write it.
	                    nextChar = uCode; // Current character will be written too in the next iteration.

	                } else {
	                    // TODO: What if we have no default? (resCode == undefined)
	                    // Then, we should write first char of the sequence as-is and try the rest recursively.
	                    // Didn't do it for now because no encoding has this situation yet.
	                    // Currently, just skip the sequence and write current char.
	                }
	            }
	            seqObj = undefined;
	        }
	        else if (uCode >= 0) {  // Regular character
	            var subtable = this.encodeTable[uCode >> 8];
	            if (subtable !== undefined)
	                dbcsCode = subtable[uCode & 0xFF];
	            
	            if (dbcsCode <= SEQ_START) { // Sequence start
	                seqObj = this.encodeTableSeq[SEQ_START-dbcsCode];
	                continue;
	            }

	            if (dbcsCode == UNASSIGNED && this.gb18030) {
	                // Use GB18030 algorithm to find character(s) to write.
	                var idx = findIdx(this.gb18030.uChars, uCode);
	                if (idx != -1) {
	                    var dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
	                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 12600); dbcsCode = dbcsCode % 12600;
	                    newBuf[j++] = 0x30 + Math.floor(dbcsCode / 1260); dbcsCode = dbcsCode % 1260;
	                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 10); dbcsCode = dbcsCode % 10;
	                    newBuf[j++] = 0x30 + dbcsCode;
	                    continue;
	                }
	            }
	        }

	        // 3. Write dbcsCode character.
	        if (dbcsCode === UNASSIGNED)
	            dbcsCode = this.defaultCharSingleByte;
	        
	        if (dbcsCode < 0x100) {
	            newBuf[j++] = dbcsCode;
	        }
	        else if (dbcsCode < 0x10000) {
	            newBuf[j++] = dbcsCode >> 8;   // high byte
	            newBuf[j++] = dbcsCode & 0xFF; // low byte
	        }
	        else {
	            newBuf[j++] = dbcsCode >> 16;
	            newBuf[j++] = (dbcsCode >> 8) & 0xFF;
	            newBuf[j++] = dbcsCode & 0xFF;
	        }
	    }

	    this.seqObj = seqObj;
	    this.leadSurrogate = leadSurrogate;
	    return newBuf.slice(0, j);
	}

	DBCSEncoder.prototype.end = function() {
	    if (this.leadSurrogate === -1 && this.seqObj === undefined)
	        return; // All clean. Most often case.

	    var newBuf = new Buffer(10), j = 0;

	    if (this.seqObj) { // We're in the sequence.
	        var dbcsCode = this.seqObj[DEF_CHAR];
	        if (dbcsCode !== undefined) { // Write beginning of the sequence.
	            if (dbcsCode < 0x100) {
	                newBuf[j++] = dbcsCode;
	            }
	            else {
	                newBuf[j++] = dbcsCode >> 8;   // high byte
	                newBuf[j++] = dbcsCode & 0xFF; // low byte
	            }
	        } else {
	            // See todo above.
	        }
	        this.seqObj = undefined;
	    }

	    if (this.leadSurrogate !== -1) {
	        // Incomplete surrogate pair - only lead surrogate found.
	        newBuf[j++] = this.defaultCharSingleByte;
	        this.leadSurrogate = -1;
	    }
	    
	    return newBuf.slice(0, j);
	}

	// Export for testing
	DBCSEncoder.prototype.findIdx = findIdx;


	// == Decoder ==================================================================

	function DBCSDecoder(options, codec) {
	    // Decoder state
	    this.nodeIdx = 0;
	    this.prevBuf = new Buffer(0);

	    // Static data
	    this.decodeTables = codec.decodeTables;
	    this.decodeTableSeq = codec.decodeTableSeq;
	    this.defaultCharUnicode = codec.defaultCharUnicode;
	    this.gb18030 = codec.gb18030;
	}

	DBCSDecoder.prototype.write = function(buf) {
	    var newBuf = new Buffer(buf.length*2),
	        nodeIdx = this.nodeIdx, 
	        prevBuf = this.prevBuf, prevBufOffset = this.prevBuf.length,
	        seqStart = -this.prevBuf.length, // idx of the start of current parsed sequence.
	        uCode;

	    if (prevBufOffset > 0) // Make prev buf overlap a little to make it easier to slice later.
	        prevBuf = Buffer.concat([prevBuf, buf.slice(0, 10)]);
	    
	    for (var i = 0, j = 0; i < buf.length; i++) {
	        var curByte = (i >= 0) ? buf[i] : prevBuf[i + prevBufOffset];

	        // Lookup in current trie node.
	        var uCode = this.decodeTables[nodeIdx][curByte];

	        if (uCode >= 0) { 
	            // Normal character, just use it.
	        }
	        else if (uCode === UNASSIGNED) { // Unknown char.
	            // TODO: Callback with seq.
	            //var curSeq = (seqStart >= 0) ? buf.slice(seqStart, i+1) : prevBuf.slice(seqStart + prevBufOffset, i+1 + prevBufOffset);
	            i = seqStart; // Try to parse again, after skipping first byte of the sequence ('i' will be incremented by 'for' cycle).
	            uCode = this.defaultCharUnicode.charCodeAt(0);
	        }
	        else if (uCode === GB18030_CODE) {
	            var curSeq = (seqStart >= 0) ? buf.slice(seqStart, i+1) : prevBuf.slice(seqStart + prevBufOffset, i+1 + prevBufOffset);
	            var ptr = (curSeq[0]-0x81)*12600 + (curSeq[1]-0x30)*1260 + (curSeq[2]-0x81)*10 + (curSeq[3]-0x30);
	            var idx = findIdx(this.gb18030.gbChars, ptr);
	            uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
	        }
	        else if (uCode <= NODE_START) { // Go to next trie node.
	            nodeIdx = NODE_START - uCode;
	            continue;
	        }
	        else if (uCode <= SEQ_START) { // Output a sequence of chars.
	            var seq = this.decodeTableSeq[SEQ_START - uCode];
	            for (var k = 0; k < seq.length - 1; k++) {
	                uCode = seq[k];
	                newBuf[j++] = uCode & 0xFF;
	                newBuf[j++] = uCode >> 8;
	            }
	            uCode = seq[seq.length-1];
	        }
	        else
	            throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte);

	        // Write the character to buffer, handling higher planes using surrogate pair.
	        if (uCode > 0xFFFF) { 
	            uCode -= 0x10000;
	            var uCodeLead = 0xD800 + Math.floor(uCode / 0x400);
	            newBuf[j++] = uCodeLead & 0xFF;
	            newBuf[j++] = uCodeLead >> 8;

	            uCode = 0xDC00 + uCode % 0x400;
	        }
	        newBuf[j++] = uCode & 0xFF;
	        newBuf[j++] = uCode >> 8;

	        // Reset trie node.
	        nodeIdx = 0; seqStart = i+1;
	    }

	    this.nodeIdx = nodeIdx;
	    this.prevBuf = (seqStart >= 0) ? buf.slice(seqStart) : prevBuf.slice(seqStart + prevBufOffset);
	    return newBuf.slice(0, j).toString('ucs2');
	}

	DBCSDecoder.prototype.end = function() {
	    var ret = '';

	    // Try to parse all remaining chars.
	    while (this.prevBuf.length > 0) {
	        // Skip 1 character in the buffer.
	        ret += this.defaultCharUnicode;
	        var buf = this.prevBuf.slice(1);

	        // Parse remaining as usual.
	        this.prevBuf = new Buffer(0);
	        this.nodeIdx = 0;
	        if (buf.length > 0)
	            ret += this.write(buf);
	    }

	    this.nodeIdx = 0;
	    return ret;
	}

	// Binary search for GB18030. Returns largest i such that table[i] <= val.
	function findIdx(table, val) {
	    if (table[0] > val)
	        return -1;

	    var l = 0, r = table.length;
	    while (l < r-1) { // always table[l] <= val < table[r]
	        var mid = l + Math.floor((r-l+1)/2);
	        if (table[mid] <= val)
	            l = mid;
	        else
	            r = mid;
	    }
	    return l;
	}



/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	// Description of supported double byte encodings and aliases.
	// Tables are not require()-d until they are needed to speed up library load.
	// require()-s are direct to support Browserify.

	module.exports = {
	    
	    // == Japanese/ShiftJIS ====================================================
	    // All japanese encodings are based on JIS X set of standards:
	    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
	    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
	    //              Has several variations in 1978, 1983, 1990 and 1997.
	    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
	    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
	    //              2 planes, first is superset of 0208, second - revised 0212.
	    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)

	    // Byte encodings are:
	    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
	    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
	    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
	    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
	    //               0x00-0x7F       - lower part of 0201
	    //               0x8E, 0xA1-0xDF - upper part of 0201
	    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
	    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
	    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
	    //               Used as-is in ISO2022 family.
	    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
	    //                0201-1976 Roman, 0208-1978, 0208-1983.
	    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
	    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
	    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
	    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
	    //
	    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
	    //
	    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html

	    'shiftjis': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(39) },
	        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
	        encodeSkipVals: [{from: 0xED40, to: 0xF940}],
	    },
	    'csshiftjis': 'shiftjis',
	    'mskanji': 'shiftjis',
	    'sjis': 'shiftjis',
	    'windows31j': 'shiftjis',
	    'ms31j': 'shiftjis',
	    'xsjis': 'shiftjis',
	    'windows932': 'shiftjis',
	    'ms932': 'shiftjis',
	    '932': 'shiftjis',
	    'cp932': 'shiftjis',

	    'eucjp': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(40) },
	        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
	    },

	    // TODO: KDDI extension to Shift_JIS
	    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
	    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.


	    // == Chinese/GBK ==========================================================
	    // http://en.wikipedia.org/wiki/GBK
	    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder

	    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
	    'gb2312': 'cp936',
	    'gb231280': 'cp936',
	    'gb23121980': 'cp936',
	    'csgb2312': 'cp936',
	    'csiso58gb231280': 'cp936',
	    'euccn': 'cp936',

	    // Microsoft's CP936 is a subset and approximation of GBK.
	    'windows936': 'cp936',
	    'ms936': 'cp936',
	    '936': 'cp936',
	    'cp936': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(41) },
	    },

	    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
	    'gbk': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(41).concat(__webpack_require__(42)) },
	    },
	    'xgbk': 'gbk',
	    'isoir58': 'gbk',

	    // GB18030 is an algorithmic extension of GBK.
	    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
	    // http://icu-project.org/docs/papers/gb18030.html
	    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
	    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
	    'gb18030': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(41).concat(__webpack_require__(42)) },
	        gb18030: function() { return __webpack_require__(43) },
	        encodeSkipVals: [0x80],
	        encodeAdd: {'€': 0xA2E3},
	    },

	    'chinese': 'gb18030',


	    // == Korean ===============================================================
	    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
	    'windows949': 'cp949',
	    'ms949': 'cp949',
	    '949': 'cp949',
	    'cp949': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(44) },
	    },

	    'cseuckr': 'cp949',
	    'csksc56011987': 'cp949',
	    'euckr': 'cp949',
	    'isoir149': 'cp949',
	    'korean': 'cp949',
	    'ksc56011987': 'cp949',
	    'ksc56011989': 'cp949',
	    'ksc5601': 'cp949',


	    // == Big5/Taiwan/Hong Kong ================================================
	    // There are lots of tables for Big5 and cp950. Please see the following links for history:
	    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
	    // Variations, in roughly number of defined chars:
	    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
	    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
	    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
	    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
	    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
	    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
	    //    Plus, it has 4 combining sequences.
	    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
	    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
	    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
	    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
	    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
	    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
	    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
	    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
	    // 
	    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
	    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.

	    'windows950': 'cp950',
	    'ms950': 'cp950',
	    '950': 'cp950',
	    'cp950': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(45) },
	    },

	    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
	    'big5': 'big5hkscs',
	    'big5hkscs': {
	        type: '_dbcs',
	        table: function() { return __webpack_require__(45).concat(__webpack_require__(46)) },
	        encodeSkipVals: [0xa2cc],
	    },

	    'cnbig5': 'big5hkscs',
	    'csbig5': 'big5hkscs',
	    'xxbig5': 'big5hkscs',
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			128
		],
		[
			"a1",
			"｡",
			62
		],
		[
			"8140",
			"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
			9,
			"＋－±×"
		],
		[
			"8180",
			"÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
		],
		[
			"81b8",
			"∈∋⊆⊇⊂⊃∪∩"
		],
		[
			"81c8",
			"∧∨￢⇒⇔∀∃"
		],
		[
			"81da",
			"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
		],
		[
			"81f0",
			"Å‰♯♭♪†‡¶"
		],
		[
			"81fc",
			"◯"
		],
		[
			"824f",
			"０",
			9
		],
		[
			"8260",
			"Ａ",
			25
		],
		[
			"8281",
			"ａ",
			25
		],
		[
			"829f",
			"ぁ",
			82
		],
		[
			"8340",
			"ァ",
			62
		],
		[
			"8380",
			"ム",
			22
		],
		[
			"839f",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"83bf",
			"α",
			16,
			"σ",
			6
		],
		[
			"8440",
			"А",
			5,
			"ЁЖ",
			25
		],
		[
			"8470",
			"а",
			5,
			"ёж",
			7
		],
		[
			"8480",
			"о",
			17
		],
		[
			"849f",
			"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
		],
		[
			"8740",
			"①",
			19,
			"Ⅰ",
			9
		],
		[
			"875f",
			"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
		],
		[
			"877e",
			"㍻"
		],
		[
			"8780",
			"〝〟№㏍℡㊤",
			4,
			"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
		],
		[
			"889f",
			"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
		],
		[
			"8940",
			"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
		],
		[
			"8980",
			"園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
		],
		[
			"8a40",
			"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
		],
		[
			"8a80",
			"橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
		],
		[
			"8b40",
			"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
		],
		[
			"8b80",
			"朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
		],
		[
			"8c40",
			"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
		],
		[
			"8c80",
			"劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
		],
		[
			"8d40",
			"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
		],
		[
			"8d80",
			"項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
		],
		[
			"8e40",
			"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
		],
		[
			"8e80",
			"死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
		],
		[
			"8f40",
			"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
		],
		[
			"8f80",
			"準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
		],
		[
			"9040",
			"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
		],
		[
			"9080",
			"逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
		],
		[
			"9140",
			"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
		],
		[
			"9180",
			"操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
		],
		[
			"9240",
			"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
		],
		[
			"9280",
			"逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
		],
		[
			"9340",
			"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
		],
		[
			"9380",
			"凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
		],
		[
			"9440",
			"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
		],
		[
			"9480",
			"楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
		],
		[
			"9540",
			"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
		],
		[
			"9580",
			"斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
		],
		[
			"9640",
			"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
		],
		[
			"9680",
			"摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
		],
		[
			"9740",
			"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
		],
		[
			"9780",
			"沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
		],
		[
			"9840",
			"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
		],
		[
			"989f",
			"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
		],
		[
			"9940",
			"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
		],
		[
			"9980",
			"凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
		],
		[
			"9a40",
			"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
		],
		[
			"9a80",
			"噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
		],
		[
			"9b40",
			"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
		],
		[
			"9b80",
			"它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
		],
		[
			"9c40",
			"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
		],
		[
			"9c80",
			"怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
		],
		[
			"9d40",
			"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
		],
		[
			"9d80",
			"捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
		],
		[
			"9e40",
			"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
		],
		[
			"9e80",
			"梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
		],
		[
			"9f40",
			"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
		],
		[
			"9f80",
			"麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
		],
		[
			"e040",
			"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
		],
		[
			"e080",
			"烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
		],
		[
			"e140",
			"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
		],
		[
			"e180",
			"痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
		],
		[
			"e240",
			"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
		],
		[
			"e280",
			"窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
		],
		[
			"e340",
			"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
		],
		[
			"e380",
			"縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
		],
		[
			"e440",
			"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
		],
		[
			"e480",
			"艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
		],
		[
			"e540",
			"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
		],
		[
			"e580",
			"蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
		],
		[
			"e640",
			"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
		],
		[
			"e680",
			"諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
		],
		[
			"e740",
			"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
		],
		[
			"e780",
			"轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
		],
		[
			"e840",
			"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
		],
		[
			"e880",
			"閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
		],
		[
			"e940",
			"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
		],
		[
			"e980",
			"騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
		],
		[
			"ea40",
			"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
		],
		[
			"ea80",
			"黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
		],
		[
			"ed40",
			"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
		],
		[
			"ed80",
			"塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
		],
		[
			"ee40",
			"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
		],
		[
			"ee80",
			"蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
		],
		[
			"eeef",
			"ⅰ",
			9,
			"￢￤＇＂"
		],
		[
			"f040",
			"",
			62
		],
		[
			"f080",
			"",
			124
		],
		[
			"f140",
			"",
			62
		],
		[
			"f180",
			"",
			124
		],
		[
			"f240",
			"",
			62
		],
		[
			"f280",
			"",
			124
		],
		[
			"f340",
			"",
			62
		],
		[
			"f380",
			"",
			124
		],
		[
			"f440",
			"",
			62
		],
		[
			"f480",
			"",
			124
		],
		[
			"f540",
			"",
			62
		],
		[
			"f580",
			"",
			124
		],
		[
			"f640",
			"",
			62
		],
		[
			"f680",
			"",
			124
		],
		[
			"f740",
			"",
			62
		],
		[
			"f780",
			"",
			124
		],
		[
			"f840",
			"",
			62
		],
		[
			"f880",
			"",
			124
		],
		[
			"f940",
			""
		],
		[
			"fa40",
			"ⅰ",
			9,
			"Ⅰ",
			9,
			"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
		],
		[
			"fa80",
			"兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
		],
		[
			"fb40",
			"涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
		],
		[
			"fb80",
			"祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
		],
		[
			"fc40",
			"髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
		]
	];

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127
		],
		[
			"8ea1",
			"｡",
			62
		],
		[
			"a1a1",
			"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
			9,
			"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
		],
		[
			"a2a1",
			"◆□■△▲▽▼※〒→←↑↓〓"
		],
		[
			"a2ba",
			"∈∋⊆⊇⊂⊃∪∩"
		],
		[
			"a2ca",
			"∧∨￢⇒⇔∀∃"
		],
		[
			"a2dc",
			"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
		],
		[
			"a2f2",
			"Å‰♯♭♪†‡¶"
		],
		[
			"a2fe",
			"◯"
		],
		[
			"a3b0",
			"０",
			9
		],
		[
			"a3c1",
			"Ａ",
			25
		],
		[
			"a3e1",
			"ａ",
			25
		],
		[
			"a4a1",
			"ぁ",
			82
		],
		[
			"a5a1",
			"ァ",
			85
		],
		[
			"a6a1",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"a6c1",
			"α",
			16,
			"σ",
			6
		],
		[
			"a7a1",
			"А",
			5,
			"ЁЖ",
			25
		],
		[
			"a7d1",
			"а",
			5,
			"ёж",
			25
		],
		[
			"a8a1",
			"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
		],
		[
			"ada1",
			"①",
			19,
			"Ⅰ",
			9
		],
		[
			"adc0",
			"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
		],
		[
			"addf",
			"㍻〝〟№㏍℡㊤",
			4,
			"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
		],
		[
			"b0a1",
			"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
		],
		[
			"b1a1",
			"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
		],
		[
			"b2a1",
			"押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
		],
		[
			"b3a1",
			"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
		],
		[
			"b4a1",
			"粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
		],
		[
			"b5a1",
			"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
		],
		[
			"b6a1",
			"供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
		],
		[
			"b7a1",
			"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
		],
		[
			"b8a1",
			"検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
		],
		[
			"b9a1",
			"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
		],
		[
			"baa1",
			"此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
		],
		[
			"bba1",
			"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
		],
		[
			"bca1",
			"次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
		],
		[
			"bda1",
			"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
		],
		[
			"bea1",
			"勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
		],
		[
			"bfa1",
			"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
		],
		[
			"c0a1",
			"澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
		],
		[
			"c1a1",
			"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
		],
		[
			"c2a1",
			"臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
		],
		[
			"c3a1",
			"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
		],
		[
			"c4a1",
			"帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
		],
		[
			"c5a1",
			"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
		],
		[
			"c6a1",
			"董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
		],
		[
			"c7a1",
			"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
		],
		[
			"c8a1",
			"函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
		],
		[
			"c9a1",
			"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
		],
		[
			"caa1",
			"福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
		],
		[
			"cba1",
			"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
		],
		[
			"cca1",
			"漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
		],
		[
			"cda1",
			"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
		],
		[
			"cea1",
			"痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
		],
		[
			"cfa1",
			"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
		],
		[
			"d0a1",
			"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
		],
		[
			"d1a1",
			"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
		],
		[
			"d2a1",
			"辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
		],
		[
			"d3a1",
			"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
		],
		[
			"d4a1",
			"圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
		],
		[
			"d5a1",
			"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
		],
		[
			"d6a1",
			"屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
		],
		[
			"d7a1",
			"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
		],
		[
			"d8a1",
			"悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
		],
		[
			"d9a1",
			"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
		],
		[
			"daa1",
			"據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
		],
		[
			"dba1",
			"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
		],
		[
			"dca1",
			"棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
		],
		[
			"dda1",
			"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
		],
		[
			"dea1",
			"沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
		],
		[
			"dfa1",
			"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
		],
		[
			"e0a1",
			"燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
		],
		[
			"e1a1",
			"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
		],
		[
			"e2a1",
			"癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
		],
		[
			"e3a1",
			"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
		],
		[
			"e4a1",
			"筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
		],
		[
			"e5a1",
			"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
		],
		[
			"e6a1",
			"罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
		],
		[
			"e7a1",
			"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
		],
		[
			"e8a1",
			"茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
		],
		[
			"e9a1",
			"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
		],
		[
			"eaa1",
			"蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
		],
		[
			"eba1",
			"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
		],
		[
			"eca1",
			"譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
		],
		[
			"eda1",
			"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
		],
		[
			"eea1",
			"遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
		],
		[
			"efa1",
			"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
		],
		[
			"f0a1",
			"陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
		],
		[
			"f1a1",
			"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
		],
		[
			"f2a1",
			"髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
		],
		[
			"f3a1",
			"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
		],
		[
			"f4a1",
			"堯槇遙瑤凜熙"
		],
		[
			"f9a1",
			"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
		],
		[
			"faa1",
			"忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
		],
		[
			"fba1",
			"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
		],
		[
			"fca1",
			"釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
		],
		[
			"fcf1",
			"ⅰ",
			9,
			"￢￤＇＂"
		],
		[
			"8fa2af",
			"˘ˇ¸˙˝¯˛˚～΄΅"
		],
		[
			"8fa2c2",
			"¡¦¿"
		],
		[
			"8fa2eb",
			"ºª©®™¤№"
		],
		[
			"8fa6e1",
			"ΆΈΉΊΪ"
		],
		[
			"8fa6e7",
			"Ό"
		],
		[
			"8fa6e9",
			"ΎΫ"
		],
		[
			"8fa6ec",
			"Ώ"
		],
		[
			"8fa6f1",
			"άέήίϊΐόςύϋΰώ"
		],
		[
			"8fa7c2",
			"Ђ",
			10,
			"ЎЏ"
		],
		[
			"8fa7f2",
			"ђ",
			10,
			"ўџ"
		],
		[
			"8fa9a1",
			"ÆĐ"
		],
		[
			"8fa9a4",
			"Ħ"
		],
		[
			"8fa9a6",
			"Ĳ"
		],
		[
			"8fa9a8",
			"ŁĿ"
		],
		[
			"8fa9ab",
			"ŊØŒ"
		],
		[
			"8fa9af",
			"ŦÞ"
		],
		[
			"8fa9c1",
			"æđðħıĳĸłŀŉŋøœßŧþ"
		],
		[
			"8faaa1",
			"ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
		],
		[
			"8faaba",
			"ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
		],
		[
			"8faba1",
			"áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
		],
		[
			"8fabbd",
			"ġĥíìïîǐ"
		],
		[
			"8fabc5",
			"īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
		],
		[
			"8fb0a1",
			"丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
		],
		[
			"8fb1a1",
			"侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
		],
		[
			"8fb2a1",
			"傒傓傔傖傛傜傞",
			4,
			"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
		],
		[
			"8fb3a1",
			"凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
		],
		[
			"8fb4a1",
			"匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
		],
		[
			"8fb5a1",
			"咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
		],
		[
			"8fb6a1",
			"嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
			5,
			"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
			4,
			"囱囫园"
		],
		[
			"8fb7a1",
			"囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
			4,
			"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
		],
		[
			"8fb8a1",
			"堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
		],
		[
			"8fb9a1",
			"奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
		],
		[
			"8fbaa1",
			"嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
			4,
			"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
		],
		[
			"8fbba1",
			"屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
		],
		[
			"8fbca1",
			"巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
			4,
			"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
		],
		[
			"8fbda1",
			"彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
			4,
			"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
		],
		[
			"8fbea1",
			"悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
			4,
			"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
		],
		[
			"8fbfa1",
			"懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
		],
		[
			"8fc0a1",
			"捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
		],
		[
			"8fc1a1",
			"擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
		],
		[
			"8fc2a1",
			"昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
		],
		[
			"8fc3a1",
			"杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
			4,
			"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
		],
		[
			"8fc4a1",
			"棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
		],
		[
			"8fc5a1",
			"樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
		],
		[
			"8fc6a1",
			"歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
		],
		[
			"8fc7a1",
			"泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
		],
		[
			"8fc8a1",
			"湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
		],
		[
			"8fc9a1",
			"濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
			4,
			"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
			4,
			"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
		],
		[
			"8fcaa1",
			"煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
		],
		[
			"8fcba1",
			"狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
		],
		[
			"8fcca1",
			"珿琀琁琄琇琊琑琚琛琤琦琨",
			9,
			"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
		],
		[
			"8fcda1",
			"甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
			5,
			"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
		],
		[
			"8fcea1",
			"瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
			6,
			"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
		],
		[
			"8fcfa1",
			"睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
		],
		[
			"8fd0a1",
			"碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
		],
		[
			"8fd1a1",
			"秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
		],
		[
			"8fd2a1",
			"笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
			5
		],
		[
			"8fd3a1",
			"籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
		],
		[
			"8fd4a1",
			"綞綦綧綪綳綶綷綹緂",
			4,
			"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
		],
		[
			"8fd5a1",
			"罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
		],
		[
			"8fd6a1",
			"胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
		],
		[
			"8fd7a1",
			"艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
		],
		[
			"8fd8a1",
			"荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
		],
		[
			"8fd9a1",
			"蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
			4,
			"蕖蕙蕜",
			6,
			"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
		],
		[
			"8fdaa1",
			"藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
			4,
			"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
		],
		[
			"8fdba1",
			"蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
			6,
			"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
		],
		[
			"8fdca1",
			"蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
			4,
			"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
		],
		[
			"8fdda1",
			"襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
			4,
			"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
		],
		[
			"8fdea1",
			"誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
			4,
			"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
		],
		[
			"8fdfa1",
			"貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
		],
		[
			"8fe0a1",
			"踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
		],
		[
			"8fe1a1",
			"轃轇轏轑",
			4,
			"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
		],
		[
			"8fe2a1",
			"郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
		],
		[
			"8fe3a1",
			"釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
			5,
			"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
			4,
			"鉻鉼鉽鉿銈銉銊銍銎銒銗"
		],
		[
			"8fe4a1",
			"銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
			4,
			"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
		],
		[
			"8fe5a1",
			"鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
			4,
			"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
		],
		[
			"8fe6a1",
			"镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
		],
		[
			"8fe7a1",
			"霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
		],
		[
			"8fe8a1",
			"頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
			4,
			"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
		],
		[
			"8fe9a1",
			"馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
			4
		],
		[
			"8feaa1",
			"鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
			4,
			"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
		],
		[
			"8feba1",
			"鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
			4,
			"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
		],
		[
			"8feca1",
			"鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
		],
		[
			"8feda1",
			"黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
			4,
			"齓齕齖齗齘齚齝齞齨齩齭",
			4,
			"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
		]
	];

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127,
			"€"
		],
		[
			"8140",
			"丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
			5,
			"乲乴",
			9,
			"乿",
			6,
			"亇亊"
		],
		[
			"8180",
			"亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
			6,
			"伋伌伒",
			4,
			"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
			4,
			"佄佅佇",
			5,
			"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
		],
		[
			"8240",
			"侤侫侭侰",
			4,
			"侶",
			8,
			"俀俁係俆俇俈俉俋俌俍俒",
			4,
			"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
			11
		],
		[
			"8280",
			"個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
			10,
			"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
			4,
			"偖偗偘偙偛偝",
			7,
			"偦",
			5,
			"偭",
			8,
			"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
			20,
			"傤傦傪傫傭",
			4,
			"傳",
			6,
			"傼"
		],
		[
			"8340",
			"傽",
			17,
			"僐",
			5,
			"僗僘僙僛",
			10,
			"僨僩僪僫僯僰僱僲僴僶",
			4,
			"僼",
			9,
			"儈"
		],
		[
			"8380",
			"儉儊儌",
			5,
			"儓",
			13,
			"儢",
			28,
			"兂兇兊兌兎兏児兒兓兗兘兙兛兝",
			4,
			"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
			4,
			"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
			5
		],
		[
			"8440",
			"凘凙凚凜凞凟凢凣凥",
			5,
			"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
			5,
			"剋剎剏剒剓剕剗剘"
		],
		[
			"8480",
			"剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
			9,
			"剾劀劃",
			4,
			"劉",
			6,
			"劑劒劔",
			6,
			"劜劤劥劦劧劮劯劰労",
			9,
			"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
			5,
			"勠勡勢勣勥",
			10,
			"勱",
			7,
			"勻勼勽匁匂匃匄匇匉匊匋匌匎"
		],
		[
			"8540",
			"匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
			9,
			"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
		],
		[
			"8580",
			"厐",
			4,
			"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
			6,
			"厷厸厹厺厼厽厾叀參",
			4,
			"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
			4,
			"呣呥呧呩",
			7,
			"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
		],
		[
			"8640",
			"咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
			4,
			"哫哬哯哰哱哴",
			5,
			"哻哾唀唂唃唄唅唈唊",
			4,
			"唒唓唕",
			5,
			"唜唝唞唟唡唥唦"
		],
		[
			"8680",
			"唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
			4,
			"啑啒啓啔啗",
			4,
			"啝啞啟啠啢啣啨啩啫啯",
			5,
			"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
			6,
			"喨",
			8,
			"喲喴営喸喺喼喿",
			4,
			"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
			4,
			"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
			4,
			"嗿嘂嘃嘄嘅"
		],
		[
			"8740",
			"嘆嘇嘊嘋嘍嘐",
			7,
			"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
			11,
			"噏",
			4,
			"噕噖噚噛噝",
			4
		],
		[
			"8780",
			"噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
			7,
			"嚇",
			6,
			"嚐嚑嚒嚔",
			14,
			"嚤",
			10,
			"嚰",
			6,
			"嚸嚹嚺嚻嚽",
			12,
			"囋",
			8,
			"囕囖囘囙囜団囥",
			5,
			"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
			6
		],
		[
			"8840",
			"園",
			9,
			"圝圞圠圡圢圤圥圦圧圫圱圲圴",
			4,
			"圼圽圿坁坃坄坅坆坈坉坋坒",
			4,
			"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
		],
		[
			"8880",
			"垁垇垈垉垊垍",
			4,
			"垔",
			6,
			"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
			8,
			"埄",
			6,
			"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
			7,
			"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
			4,
			"堫",
			4,
			"報堲堳場堶",
			7
		],
		[
			"8940",
			"堾",
			5,
			"塅",
			6,
			"塎塏塐塒塓塕塖塗塙",
			4,
			"塟",
			5,
			"塦",
			4,
			"塭",
			16,
			"塿墂墄墆墇墈墊墋墌"
		],
		[
			"8980",
			"墍",
			4,
			"墔",
			4,
			"墛墜墝墠",
			7,
			"墪",
			17,
			"墽墾墿壀壂壃壄壆",
			10,
			"壒壓壔壖",
			13,
			"壥",
			5,
			"壭壯壱売壴壵壷壸壺",
			7,
			"夃夅夆夈",
			4,
			"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
		],
		[
			"8a40",
			"夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
			4,
			"奡奣奤奦",
			12,
			"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
		],
		[
			"8a80",
			"妧妬妭妰妱妳",
			5,
			"妺妼妽妿",
			6,
			"姇姈姉姌姍姎姏姕姖姙姛姞",
			4,
			"姤姦姧姩姪姫姭",
			11,
			"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
			6,
			"娳娵娷",
			4,
			"娽娾娿婁",
			4,
			"婇婈婋",
			9,
			"婖婗婘婙婛",
			5
		],
		[
			"8b40",
			"婡婣婤婥婦婨婩婫",
			8,
			"婸婹婻婼婽婾媀",
			17,
			"媓",
			6,
			"媜",
			13,
			"媫媬"
		],
		[
			"8b80",
			"媭",
			4,
			"媴媶媷媹",
			4,
			"媿嫀嫃",
			5,
			"嫊嫋嫍",
			4,
			"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
			4,
			"嫲",
			22,
			"嬊",
			11,
			"嬘",
			25,
			"嬳嬵嬶嬸",
			7,
			"孁",
			6
		],
		[
			"8c40",
			"孈",
			7,
			"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
		],
		[
			"8c80",
			"寑寔",
			8,
			"寠寢寣實寧審",
			4,
			"寯寱",
			6,
			"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
			6,
			"屰屲",
			6,
			"屻屼屽屾岀岃",
			4,
			"岉岊岋岎岏岒岓岕岝",
			4,
			"岤",
			4
		],
		[
			"8d40",
			"岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
			5,
			"峌",
			5,
			"峓",
			5,
			"峚",
			6,
			"峢峣峧峩峫峬峮峯峱",
			9,
			"峼",
			4
		],
		[
			"8d80",
			"崁崄崅崈",
			5,
			"崏",
			4,
			"崕崗崘崙崚崜崝崟",
			4,
			"崥崨崪崫崬崯",
			4,
			"崵",
			7,
			"崿",
			7,
			"嵈嵉嵍",
			10,
			"嵙嵚嵜嵞",
			10,
			"嵪嵭嵮嵰嵱嵲嵳嵵",
			12,
			"嶃",
			21,
			"嶚嶛嶜嶞嶟嶠"
		],
		[
			"8e40",
			"嶡",
			21,
			"嶸",
			12,
			"巆",
			6,
			"巎",
			12,
			"巜巟巠巣巤巪巬巭"
		],
		[
			"8e80",
			"巰巵巶巸",
			4,
			"巿帀帄帇帉帊帋帍帎帒帓帗帞",
			7,
			"帨",
			4,
			"帯帰帲",
			4,
			"帹帺帾帿幀幁幃幆",
			5,
			"幍",
			6,
			"幖",
			4,
			"幜幝幟幠幣",
			14,
			"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
			4,
			"庮",
			4,
			"庴庺庻庼庽庿",
			6
		],
		[
			"8f40",
			"廆廇廈廋",
			5,
			"廔廕廗廘廙廚廜",
			11,
			"廩廫",
			8,
			"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
		],
		[
			"8f80",
			"弨弫弬弮弰弲",
			6,
			"弻弽弾弿彁",
			14,
			"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
			5,
			"復徫徬徯",
			5,
			"徶徸徹徺徻徾",
			4,
			"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
		],
		[
			"9040",
			"怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
			4,
			"怶",
			4,
			"怽怾恀恄",
			6,
			"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
		],
		[
			"9080",
			"悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
			7,
			"惇惈惉惌",
			4,
			"惒惓惔惖惗惙惛惞惡",
			4,
			"惪惱惲惵惷惸惻",
			4,
			"愂愃愄愅愇愊愋愌愐",
			4,
			"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
			18,
			"慀",
			6
		],
		[
			"9140",
			"慇慉態慍慏慐慒慓慔慖",
			6,
			"慞慟慠慡慣慤慥慦慩",
			6,
			"慱慲慳慴慶慸",
			18,
			"憌憍憏",
			4,
			"憕"
		],
		[
			"9180",
			"憖",
			6,
			"憞",
			8,
			"憪憫憭",
			9,
			"憸",
			5,
			"憿懀懁懃",
			4,
			"應懌",
			4,
			"懓懕",
			16,
			"懧",
			13,
			"懶",
			8,
			"戀",
			5,
			"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
			4,
			"扂扄扅扆扊"
		],
		[
			"9240",
			"扏扐払扖扗扙扚扜",
			6,
			"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
			5,
			"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
		],
		[
			"9280",
			"拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
			5,
			"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
			7,
			"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
			6,
			"採掤掦掫掯掱掲掵掶掹掻掽掿揀"
		],
		[
			"9340",
			"揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
			6,
			"揟揢揤",
			4,
			"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
			4,
			"損搎搑搒搕",
			5,
			"搝搟搢搣搤"
		],
		[
			"9380",
			"搥搧搨搩搫搮",
			5,
			"搵",
			4,
			"搻搼搾摀摂摃摉摋",
			6,
			"摓摕摖摗摙",
			4,
			"摟",
			7,
			"摨摪摫摬摮",
			9,
			"摻",
			6,
			"撃撆撈",
			8,
			"撓撔撗撘撚撛撜撝撟",
			4,
			"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
			6,
			"擏擑擓擔擕擖擙據"
		],
		[
			"9440",
			"擛擜擝擟擠擡擣擥擧",
			24,
			"攁",
			7,
			"攊",
			7,
			"攓",
			4,
			"攙",
			8
		],
		[
			"9480",
			"攢攣攤攦",
			4,
			"攬攭攰攱攲攳攷攺攼攽敀",
			4,
			"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
			14,
			"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
			7,
			"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
			7,
			"旡旣旤旪旫"
		],
		[
			"9540",
			"旲旳旴旵旸旹旻",
			4,
			"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
			4,
			"昽昿晀時晄",
			6,
			"晍晎晐晑晘"
		],
		[
			"9580",
			"晙晛晜晝晞晠晢晣晥晧晩",
			4,
			"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
			4,
			"暞",
			8,
			"暩",
			4,
			"暯",
			4,
			"暵暶暷暸暺暻暼暽暿",
			25,
			"曚曞",
			7,
			"曧曨曪",
			5,
			"曱曵曶書曺曻曽朁朂會"
		],
		[
			"9640",
			"朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
			5,
			"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
			4,
			"杝杢杣杤杦杧杫杬杮東杴杶"
		],
		[
			"9680",
			"杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
			7,
			"柂柅",
			9,
			"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
			7,
			"柾栁栂栃栄栆栍栐栒栔栕栘",
			4,
			"栞栟栠栢",
			6,
			"栫",
			6,
			"栴栵栶栺栻栿桇桋桍桏桒桖",
			5
		],
		[
			"9740",
			"桜桝桞桟桪桬",
			7,
			"桵桸",
			8,
			"梂梄梇",
			7,
			"梐梑梒梔梕梖梘",
			9,
			"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
		],
		[
			"9780",
			"梹",
			6,
			"棁棃",
			5,
			"棊棌棎棏棐棑棓棔棖棗棙棛",
			4,
			"棡棢棤",
			9,
			"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
			4,
			"椌椏椑椓",
			11,
			"椡椢椣椥",
			7,
			"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
			16,
			"楕楖楘楙楛楜楟"
		],
		[
			"9840",
			"楡楢楤楥楧楨楩楪楬業楯楰楲",
			4,
			"楺楻楽楾楿榁榃榅榊榋榌榎",
			5,
			"榖榗榙榚榝",
			9,
			"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
		],
		[
			"9880",
			"榾榿槀槂",
			7,
			"構槍槏槑槒槓槕",
			5,
			"槜槝槞槡",
			11,
			"槮槯槰槱槳",
			9,
			"槾樀",
			9,
			"樋",
			11,
			"標",
			5,
			"樠樢",
			5,
			"権樫樬樭樮樰樲樳樴樶",
			6,
			"樿",
			4,
			"橅橆橈",
			7,
			"橑",
			6,
			"橚"
		],
		[
			"9940",
			"橜",
			4,
			"橢橣橤橦",
			10,
			"橲",
			6,
			"橺橻橽橾橿檁檂檃檅",
			8,
			"檏檒",
			4,
			"檘",
			7,
			"檡",
			5
		],
		[
			"9980",
			"檧檨檪檭",
			114,
			"欥欦欨",
			6
		],
		[
			"9a40",
			"欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
			11,
			"歚",
			7,
			"歨歩歫",
			13,
			"歺歽歾歿殀殅殈"
		],
		[
			"9a80",
			"殌殎殏殐殑殔殕殗殘殙殜",
			4,
			"殢",
			7,
			"殫",
			7,
			"殶殸",
			6,
			"毀毃毄毆",
			4,
			"毌毎毐毑毘毚毜",
			4,
			"毢",
			7,
			"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
			6,
			"氈",
			4,
			"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
			4,
			"汑汒汓汖汘"
		],
		[
			"9b40",
			"汙汚汢汣汥汦汧汫",
			4,
			"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
		],
		[
			"9b80",
			"泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
			5,
			"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
			4,
			"涃涄涆涇涊涋涍涏涐涒涖",
			4,
			"涜涢涥涬涭涰涱涳涴涶涷涹",
			5,
			"淁淂淃淈淉淊"
		],
		[
			"9c40",
			"淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
			7,
			"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
		],
		[
			"9c80",
			"渶渷渹渻",
			7,
			"湅",
			7,
			"湏湐湑湒湕湗湙湚湜湝湞湠",
			10,
			"湬湭湯",
			14,
			"満溁溂溄溇溈溊",
			4,
			"溑",
			6,
			"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
			5
		],
		[
			"9d40",
			"滰滱滲滳滵滶滷滸滺",
			7,
			"漃漄漅漇漈漊",
			4,
			"漐漑漒漖",
			9,
			"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
			6,
			"漿潀潁潂"
		],
		[
			"9d80",
			"潃潄潅潈潉潊潌潎",
			9,
			"潙潚潛潝潟潠潡潣潤潥潧",
			5,
			"潯潰潱潳潵潶潷潹潻潽",
			6,
			"澅澆澇澊澋澏",
			12,
			"澝澞澟澠澢",
			4,
			"澨",
			10,
			"澴澵澷澸澺",
			5,
			"濁濃",
			5,
			"濊",
			6,
			"濓",
			10,
			"濟濢濣濤濥"
		],
		[
			"9e40",
			"濦",
			7,
			"濰",
			32,
			"瀒",
			7,
			"瀜",
			6,
			"瀤",
			6
		],
		[
			"9e80",
			"瀫",
			9,
			"瀶瀷瀸瀺",
			17,
			"灍灎灐",
			13,
			"灟",
			11,
			"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
			12,
			"炰炲炴炵炶為炾炿烄烅烆烇烉烋",
			12,
			"烚"
		],
		[
			"9f40",
			"烜烝烞烠烡烢烣烥烪烮烰",
			6,
			"烸烺烻烼烾",
			10,
			"焋",
			4,
			"焑焒焔焗焛",
			10,
			"焧",
			7,
			"焲焳焴"
		],
		[
			"9f80",
			"焵焷",
			13,
			"煆煇煈煉煋煍煏",
			12,
			"煝煟",
			4,
			"煥煩",
			4,
			"煯煰煱煴煵煶煷煹煻煼煾",
			5,
			"熅",
			4,
			"熋熌熍熎熐熑熒熓熕熖熗熚",
			4,
			"熡",
			6,
			"熩熪熫熭",
			5,
			"熴熶熷熸熺",
			8,
			"燄",
			9,
			"燏",
			4
		],
		[
			"a040",
			"燖",
			9,
			"燡燢燣燤燦燨",
			5,
			"燯",
			9,
			"燺",
			11,
			"爇",
			19
		],
		[
			"a080",
			"爛爜爞",
			9,
			"爩爫爭爮爯爲爳爴爺爼爾牀",
			6,
			"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
			4,
			"犌犎犐犑犓",
			11,
			"犠",
			11,
			"犮犱犲犳犵犺",
			6,
			"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
		],
		[
			"a1a1",
			"　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
			7,
			"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
		],
		[
			"a2a1",
			"ⅰ",
			9
		],
		[
			"a2b1",
			"⒈",
			19,
			"⑴",
			19,
			"①",
			9
		],
		[
			"a2e5",
			"㈠",
			9
		],
		[
			"a2f1",
			"Ⅰ",
			11
		],
		[
			"a3a1",
			"！＂＃￥％",
			88,
			"￣"
		],
		[
			"a4a1",
			"ぁ",
			82
		],
		[
			"a5a1",
			"ァ",
			85
		],
		[
			"a6a1",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"a6c1",
			"α",
			16,
			"σ",
			6
		],
		[
			"a6e0",
			"︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
		],
		[
			"a6ee",
			"︻︼︷︸︱"
		],
		[
			"a6f4",
			"︳︴"
		],
		[
			"a7a1",
			"А",
			5,
			"ЁЖ",
			25
		],
		[
			"a7d1",
			"а",
			5,
			"ёж",
			25
		],
		[
			"a840",
			"ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
			35,
			"▁",
			6
		],
		[
			"a880",
			"█",
			7,
			"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
		],
		[
			"a8a1",
			"āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
		],
		[
			"a8bd",
			"ńň"
		],
		[
			"a8c0",
			"ɡ"
		],
		[
			"a8c5",
			"ㄅ",
			36
		],
		[
			"a940",
			"〡",
			8,
			"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
		],
		[
			"a959",
			"℡㈱"
		],
		[
			"a95c",
			"‐"
		],
		[
			"a960",
			"ー゛゜ヽヾ〆ゝゞ﹉",
			9,
			"﹔﹕﹖﹗﹙",
			8
		],
		[
			"a980",
			"﹢",
			4,
			"﹨﹩﹪﹫"
		],
		[
			"a996",
			"〇"
		],
		[
			"a9a4",
			"─",
			75
		],
		[
			"aa40",
			"狜狝狟狢",
			5,
			"狪狫狵狶狹狽狾狿猀猂猄",
			5,
			"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
			8
		],
		[
			"aa80",
			"獉獊獋獌獎獏獑獓獔獕獖獘",
			7,
			"獡",
			10,
			"獮獰獱"
		],
		[
			"ab40",
			"獲",
			11,
			"獿",
			4,
			"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
			5,
			"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
			4
		],
		[
			"ab80",
			"珋珌珎珒",
			6,
			"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
			4
		],
		[
			"ac40",
			"珸",
			10,
			"琄琇琈琋琌琍琎琑",
			8,
			"琜",
			5,
			"琣琤琧琩琫琭琯琱琲琷",
			4,
			"琽琾琿瑀瑂",
			11
		],
		[
			"ac80",
			"瑎",
			6,
			"瑖瑘瑝瑠",
			12,
			"瑮瑯瑱",
			4,
			"瑸瑹瑺"
		],
		[
			"ad40",
			"瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
			10,
			"璝璟",
			7,
			"璪",
			15,
			"璻",
			12
		],
		[
			"ad80",
			"瓈",
			9,
			"瓓",
			8,
			"瓝瓟瓡瓥瓧",
			6,
			"瓰瓱瓲"
		],
		[
			"ae40",
			"瓳瓵瓸",
			6,
			"甀甁甂甃甅",
			7,
			"甎甐甒甔甕甖甗甛甝甞甠",
			4,
			"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
		],
		[
			"ae80",
			"畝",
			7,
			"畧畨畩畫",
			6,
			"畳畵當畷畺",
			4,
			"疀疁疂疄疅疇"
		],
		[
			"af40",
			"疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
			4,
			"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
		],
		[
			"af80",
			"瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
		],
		[
			"b040",
			"癅",
			6,
			"癎",
			5,
			"癕癗",
			4,
			"癝癟癠癡癢癤",
			6,
			"癬癭癮癰",
			7,
			"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
		],
		[
			"b080",
			"皜",
			7,
			"皥",
			8,
			"皯皰皳皵",
			9,
			"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
		],
		[
			"b140",
			"盄盇盉盋盌盓盕盙盚盜盝盞盠",
			4,
			"盦",
			7,
			"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
			10,
			"眛眜眝眞眡眣眤眥眧眪眫"
		],
		[
			"b180",
			"眬眮眰",
			4,
			"眹眻眽眾眿睂睄睅睆睈",
			7,
			"睒",
			7,
			"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
		],
		[
			"b240",
			"睝睞睟睠睤睧睩睪睭",
			11,
			"睺睻睼瞁瞂瞃瞆",
			5,
			"瞏瞐瞓",
			11,
			"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
			4
		],
		[
			"b280",
			"瞼瞾矀",
			12,
			"矎",
			8,
			"矘矙矚矝",
			4,
			"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
		],
		[
			"b340",
			"矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
			5,
			"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
		],
		[
			"b380",
			"硛硜硞",
			11,
			"硯",
			7,
			"硸硹硺硻硽",
			6,
			"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
		],
		[
			"b440",
			"碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
			7,
			"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
			9
		],
		[
			"b480",
			"磤磥磦磧磩磪磫磭",
			4,
			"磳磵磶磸磹磻",
			5,
			"礂礃礄礆",
			6,
			"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
		],
		[
			"b540",
			"礍",
			5,
			"礔",
			9,
			"礟",
			4,
			"礥",
			14,
			"礵",
			4,
			"礽礿祂祃祄祅祇祊",
			8,
			"祔祕祘祙祡祣"
		],
		[
			"b580",
			"祤祦祩祪祫祬祮祰",
			6,
			"祹祻",
			4,
			"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
		],
		[
			"b640",
			"禓",
			6,
			"禛",
			11,
			"禨",
			10,
			"禴",
			4,
			"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
			5,
			"秠秡秢秥秨秪"
		],
		[
			"b680",
			"秬秮秱",
			6,
			"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
			4,
			"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
		],
		[
			"b740",
			"稝稟稡稢稤",
			14,
			"稴稵稶稸稺稾穀",
			5,
			"穇",
			9,
			"穒",
			4,
			"穘",
			16
		],
		[
			"b780",
			"穩",
			6,
			"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
		],
		[
			"b840",
			"窣窤窧窩窪窫窮",
			4,
			"窴",
			10,
			"竀",
			10,
			"竌",
			9,
			"竗竘竚竛竜竝竡竢竤竧",
			5,
			"竮竰竱竲竳"
		],
		[
			"b880",
			"竴",
			4,
			"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
		],
		[
			"b940",
			"笯笰笲笴笵笶笷笹笻笽笿",
			5,
			"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
			10,
			"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
			6,
			"箎箏"
		],
		[
			"b980",
			"箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
			7,
			"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
		],
		[
			"ba40",
			"篅篈築篊篋篍篎篏篐篒篔",
			4,
			"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
			4,
			"篸篹篺篻篽篿",
			7,
			"簈簉簊簍簎簐",
			5,
			"簗簘簙"
		],
		[
			"ba80",
			"簚",
			4,
			"簠",
			5,
			"簨簩簫",
			12,
			"簹",
			5,
			"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
		],
		[
			"bb40",
			"籃",
			9,
			"籎",
			36,
			"籵",
			5,
			"籾",
			9
		],
		[
			"bb80",
			"粈粊",
			6,
			"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
			4,
			"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
		],
		[
			"bc40",
			"粿糀糂糃糄糆糉糋糎",
			6,
			"糘糚糛糝糞糡",
			6,
			"糩",
			5,
			"糰",
			7,
			"糹糺糼",
			13,
			"紋",
			5
		],
		[
			"bc80",
			"紑",
			14,
			"紡紣紤紥紦紨紩紪紬紭紮細",
			6,
			"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
		],
		[
			"bd40",
			"紷",
			54,
			"絯",
			7
		],
		[
			"bd80",
			"絸",
			32,
			"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
		],
		[
			"be40",
			"継",
			12,
			"綧",
			6,
			"綯",
			42
		],
		[
			"be80",
			"線",
			32,
			"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
		],
		[
			"bf40",
			"緻",
			62
		],
		[
			"bf80",
			"縺縼",
			4,
			"繂",
			4,
			"繈",
			21,
			"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
		],
		[
			"c040",
			"繞",
			35,
			"纃",
			23,
			"纜纝纞"
		],
		[
			"c080",
			"纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
			6,
			"罃罆",
			9,
			"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
		],
		[
			"c140",
			"罖罙罛罜罝罞罠罣",
			4,
			"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
			7,
			"羋羍羏",
			4,
			"羕",
			4,
			"羛羜羠羢羣羥羦羨",
			6,
			"羱"
		],
		[
			"c180",
			"羳",
			4,
			"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
			4,
			"翖翗翙",
			5,
			"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
		],
		[
			"c240",
			"翤翧翨翪翫翬翭翯翲翴",
			6,
			"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
			5,
			"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
		],
		[
			"c280",
			"聙聛",
			13,
			"聫",
			5,
			"聲",
			11,
			"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
		],
		[
			"c340",
			"聾肁肂肅肈肊肍",
			5,
			"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
			4,
			"胏",
			6,
			"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
		],
		[
			"c380",
			"脌脕脗脙脛脜脝脟",
			12,
			"脭脮脰脳脴脵脷脹",
			4,
			"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
		],
		[
			"c440",
			"腀",
			5,
			"腇腉腍腎腏腒腖腗腘腛",
			4,
			"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
			4,
			"膉膋膌膍膎膐膒",
			5,
			"膙膚膞",
			4,
			"膤膥"
		],
		[
			"c480",
			"膧膩膫",
			7,
			"膴",
			5,
			"膼膽膾膿臄臅臇臈臉臋臍",
			6,
			"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
		],
		[
			"c540",
			"臔",
			14,
			"臤臥臦臨臩臫臮",
			4,
			"臵",
			5,
			"臽臿舃與",
			4,
			"舎舏舑舓舕",
			5,
			"舝舠舤舥舦舧舩舮舲舺舼舽舿"
		],
		[
			"c580",
			"艀艁艂艃艅艆艈艊艌艍艎艐",
			7,
			"艙艛艜艝艞艠",
			7,
			"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
		],
		[
			"c640",
			"艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
		],
		[
			"c680",
			"苺苼",
			4,
			"茊茋茍茐茒茓茖茘茙茝",
			9,
			"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
		],
		[
			"c740",
			"茾茿荁荂荄荅荈荊",
			4,
			"荓荕",
			4,
			"荝荢荰",
			6,
			"荹荺荾",
			6,
			"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
			6,
			"莬莭莮"
		],
		[
			"c780",
			"莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
		],
		[
			"c840",
			"菮華菳",
			4,
			"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
			5,
			"萙萚萛萞",
			5,
			"萩",
			7,
			"萲",
			5,
			"萹萺萻萾",
			7,
			"葇葈葉"
		],
		[
			"c880",
			"葊",
			6,
			"葒",
			4,
			"葘葝葞葟葠葢葤",
			4,
			"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
		],
		[
			"c940",
			"葽",
			4,
			"蒃蒄蒅蒆蒊蒍蒏",
			7,
			"蒘蒚蒛蒝蒞蒟蒠蒢",
			12,
			"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
		],
		[
			"c980",
			"蓘",
			4,
			"蓞蓡蓢蓤蓧",
			4,
			"蓭蓮蓯蓱",
			10,
			"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
		],
		[
			"ca40",
			"蔃",
			8,
			"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
			8,
			"蔭",
			9,
			"蔾",
			4,
			"蕄蕅蕆蕇蕋",
			10
		],
		[
			"ca80",
			"蕗蕘蕚蕛蕜蕝蕟",
			4,
			"蕥蕦蕧蕩",
			8,
			"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
		],
		[
			"cb40",
			"薂薃薆薈",
			6,
			"薐",
			10,
			"薝",
			6,
			"薥薦薧薩薫薬薭薱",
			5,
			"薸薺",
			6,
			"藂",
			6,
			"藊",
			4,
			"藑藒"
		],
		[
			"cb80",
			"藔藖",
			5,
			"藝",
			6,
			"藥藦藧藨藪",
			14,
			"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
		],
		[
			"cc40",
			"藹藺藼藽藾蘀",
			4,
			"蘆",
			10,
			"蘒蘓蘔蘕蘗",
			15,
			"蘨蘪",
			13,
			"蘹蘺蘻蘽蘾蘿虀"
		],
		[
			"cc80",
			"虁",
			11,
			"虒虓處",
			4,
			"虛虜虝號虠虡虣",
			7,
			"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
		],
		[
			"cd40",
			"虭虯虰虲",
			6,
			"蚃",
			6,
			"蚎",
			4,
			"蚔蚖",
			5,
			"蚞",
			4,
			"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
			4,
			"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
		],
		[
			"cd80",
			"蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
		],
		[
			"ce40",
			"蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
			6,
			"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
			5,
			"蝡蝢蝦",
			7,
			"蝯蝱蝲蝳蝵"
		],
		[
			"ce80",
			"蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
			4,
			"螔螕螖螘",
			6,
			"螠",
			4,
			"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
		],
		[
			"cf40",
			"螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
			4,
			"蟇蟈蟉蟌",
			4,
			"蟔",
			6,
			"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
			9
		],
		[
			"cf80",
			"蟺蟻蟼蟽蟿蠀蠁蠂蠄",
			5,
			"蠋",
			7,
			"蠔蠗蠘蠙蠚蠜",
			4,
			"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
		],
		[
			"d040",
			"蠤",
			13,
			"蠳",
			5,
			"蠺蠻蠽蠾蠿衁衂衃衆",
			5,
			"衎",
			5,
			"衕衖衘衚",
			6,
			"衦衧衪衭衯衱衳衴衵衶衸衹衺"
		],
		[
			"d080",
			"衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
			4,
			"袝",
			4,
			"袣袥",
			5,
			"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
		],
		[
			"d140",
			"袬袮袯袰袲",
			4,
			"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
			4,
			"裠裡裦裧裩",
			6,
			"裲裵裶裷裺裻製裿褀褁褃",
			5
		],
		[
			"d180",
			"褉褋",
			4,
			"褑褔",
			4,
			"褜",
			4,
			"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
		],
		[
			"d240",
			"褸",
			8,
			"襂襃襅",
			24,
			"襠",
			5,
			"襧",
			19,
			"襼"
		],
		[
			"d280",
			"襽襾覀覂覄覅覇",
			26,
			"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
		],
		[
			"d340",
			"覢",
			30,
			"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
			6
		],
		[
			"d380",
			"觻",
			4,
			"訁",
			5,
			"計",
			21,
			"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
		],
		[
			"d440",
			"訞",
			31,
			"訿",
			8,
			"詉",
			21
		],
		[
			"d480",
			"詟",
			25,
			"詺",
			6,
			"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
		],
		[
			"d540",
			"誁",
			7,
			"誋",
			7,
			"誔",
			46
		],
		[
			"d580",
			"諃",
			32,
			"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
		],
		[
			"d640",
			"諤",
			34,
			"謈",
			27
		],
		[
			"d680",
			"謤謥謧",
			30,
			"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
		],
		[
			"d740",
			"譆",
			31,
			"譧",
			4,
			"譭",
			25
		],
		[
			"d780",
			"讇",
			24,
			"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
		],
		[
			"d840",
			"谸",
			8,
			"豂豃豄豅豈豊豋豍",
			7,
			"豖豗豘豙豛",
			5,
			"豣",
			6,
			"豬",
			6,
			"豴豵豶豷豻",
			6,
			"貃貄貆貇"
		],
		[
			"d880",
			"貈貋貍",
			6,
			"貕貖貗貙",
			20,
			"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
		],
		[
			"d940",
			"貮",
			62
		],
		[
			"d980",
			"賭",
			32,
			"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
		],
		[
			"da40",
			"贎",
			14,
			"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
			8,
			"趂趃趆趇趈趉趌",
			4,
			"趒趓趕",
			9,
			"趠趡"
		],
		[
			"da80",
			"趢趤",
			12,
			"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
		],
		[
			"db40",
			"跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
			6,
			"踆踇踈踋踍踎踐踑踒踓踕",
			7,
			"踠踡踤",
			4,
			"踫踭踰踲踳踴踶踷踸踻踼踾"
		],
		[
			"db80",
			"踿蹃蹅蹆蹌",
			4,
			"蹓",
			5,
			"蹚",
			11,
			"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
		],
		[
			"dc40",
			"蹳蹵蹷",
			4,
			"蹽蹾躀躂躃躄躆躈",
			6,
			"躑躒躓躕",
			6,
			"躝躟",
			11,
			"躭躮躰躱躳",
			6,
			"躻",
			7
		],
		[
			"dc80",
			"軃",
			10,
			"軏",
			21,
			"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
		],
		[
			"dd40",
			"軥",
			62
		],
		[
			"dd80",
			"輤",
			32,
			"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
		],
		[
			"de40",
			"轅",
			32,
			"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
		],
		[
			"de80",
			"迉",
			4,
			"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
		],
		[
			"df40",
			"這逜連逤逥逧",
			5,
			"逰",
			4,
			"逷逹逺逽逿遀遃遅遆遈",
			4,
			"過達違遖遙遚遜",
			5,
			"遤遦遧適遪遫遬遯",
			4,
			"遶",
			6,
			"遾邁"
		],
		[
			"df80",
			"還邅邆邇邉邊邌",
			4,
			"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
		],
		[
			"e040",
			"郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
			19,
			"鄚鄛鄜"
		],
		[
			"e080",
			"鄝鄟鄠鄡鄤",
			10,
			"鄰鄲",
			6,
			"鄺",
			8,
			"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
		],
		[
			"e140",
			"酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
			4,
			"醆醈醊醎醏醓",
			6,
			"醜",
			5,
			"醤",
			5,
			"醫醬醰醱醲醳醶醷醸醹醻"
		],
		[
			"e180",
			"醼",
			10,
			"釈釋釐釒",
			9,
			"針",
			8,
			"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
		],
		[
			"e240",
			"釦",
			62
		],
		[
			"e280",
			"鈥",
			32,
			"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
			5,
			"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
		],
		[
			"e340",
			"鉆",
			45,
			"鉵",
			16
		],
		[
			"e380",
			"銆",
			7,
			"銏",
			24,
			"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
		],
		[
			"e440",
			"銨",
			5,
			"銯",
			24,
			"鋉",
			31
		],
		[
			"e480",
			"鋩",
			32,
			"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
		],
		[
			"e540",
			"錊",
			51,
			"錿",
			10
		],
		[
			"e580",
			"鍊",
			31,
			"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
		],
		[
			"e640",
			"鍬",
			34,
			"鎐",
			27
		],
		[
			"e680",
			"鎬",
			29,
			"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
		],
		[
			"e740",
			"鏎",
			7,
			"鏗",
			54
		],
		[
			"e780",
			"鐎",
			32,
			"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
			6,
			"缪缫缬缭缯",
			4,
			"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
		],
		[
			"e840",
			"鐯",
			14,
			"鐿",
			43,
			"鑬鑭鑮鑯"
		],
		[
			"e880",
			"鑰",
			20,
			"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
		],
		[
			"e940",
			"锧锳锽镃镈镋镕镚镠镮镴镵長",
			7,
			"門",
			42
		],
		[
			"e980",
			"閫",
			32,
			"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
		],
		[
			"ea40",
			"闌",
			27,
			"闬闿阇阓阘阛阞阠阣",
			6,
			"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
		],
		[
			"ea80",
			"陘陙陚陜陝陞陠陣陥陦陫陭",
			4,
			"陳陸",
			12,
			"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
		],
		[
			"eb40",
			"隌階隑隒隓隕隖隚際隝",
			9,
			"隨",
			7,
			"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
			9,
			"雡",
			6,
			"雫"
		],
		[
			"eb80",
			"雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
			4,
			"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
		],
		[
			"ec40",
			"霡",
			8,
			"霫霬霮霯霱霳",
			4,
			"霺霻霼霽霿",
			18,
			"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
			7
		],
		[
			"ec80",
			"靲靵靷",
			4,
			"靽",
			7,
			"鞆",
			4,
			"鞌鞎鞏鞐鞓鞕鞖鞗鞙",
			4,
			"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
		],
		[
			"ed40",
			"鞞鞟鞡鞢鞤",
			6,
			"鞬鞮鞰鞱鞳鞵",
			46
		],
		[
			"ed80",
			"韤韥韨韮",
			4,
			"韴韷",
			23,
			"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
		],
		[
			"ee40",
			"頏",
			62
		],
		[
			"ee80",
			"顎",
			32,
			"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
			4,
			"钼钽钿铄铈",
			6,
			"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
		],
		[
			"ef40",
			"顯",
			5,
			"颋颎颒颕颙颣風",
			37,
			"飏飐飔飖飗飛飜飝飠",
			4
		],
		[
			"ef80",
			"飥飦飩",
			30,
			"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
			4,
			"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
			8,
			"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
		],
		[
			"f040",
			"餈",
			4,
			"餎餏餑",
			28,
			"餯",
			26
		],
		[
			"f080",
			"饊",
			9,
			"饖",
			12,
			"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
			4,
			"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
			6,
			"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
		],
		[
			"f140",
			"馌馎馚",
			10,
			"馦馧馩",
			47
		],
		[
			"f180",
			"駙",
			32,
			"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
		],
		[
			"f240",
			"駺",
			62
		],
		[
			"f280",
			"騹",
			32,
			"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
		],
		[
			"f340",
			"驚",
			17,
			"驲骃骉骍骎骔骕骙骦骩",
			6,
			"骲骳骴骵骹骻骽骾骿髃髄髆",
			4,
			"髍髎髏髐髒體髕髖髗髙髚髛髜"
		],
		[
			"f380",
			"髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
			8,
			"髺髼",
			6,
			"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
		],
		[
			"f440",
			"鬇鬉",
			5,
			"鬐鬑鬒鬔",
			10,
			"鬠鬡鬢鬤",
			10,
			"鬰鬱鬳",
			7,
			"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
			5
		],
		[
			"f480",
			"魛",
			32,
			"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
		],
		[
			"f540",
			"魼",
			62
		],
		[
			"f580",
			"鮻",
			32,
			"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
		],
		[
			"f640",
			"鯜",
			62
		],
		[
			"f680",
			"鰛",
			32,
			"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
			5,
			"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
			5,
			"鲥",
			4,
			"鲫鲭鲮鲰",
			7,
			"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
		],
		[
			"f740",
			"鰼",
			62
		],
		[
			"f780",
			"鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
			4,
			"鳈鳉鳑鳒鳚鳛鳠鳡鳌",
			4,
			"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
		],
		[
			"f840",
			"鳣",
			62
		],
		[
			"f880",
			"鴢",
			32
		],
		[
			"f940",
			"鵃",
			62
		],
		[
			"f980",
			"鶂",
			32
		],
		[
			"fa40",
			"鶣",
			62
		],
		[
			"fa80",
			"鷢",
			32
		],
		[
			"fb40",
			"鸃",
			27,
			"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
			9,
			"麀"
		],
		[
			"fb80",
			"麁麃麄麅麆麉麊麌",
			5,
			"麔",
			8,
			"麞麠",
			5,
			"麧麨麩麪"
		],
		[
			"fc40",
			"麫",
			8,
			"麵麶麷麹麺麼麿",
			4,
			"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
			8,
			"黺黽黿",
			6
		],
		[
			"fc80",
			"鼆",
			4,
			"鼌鼏鼑鼒鼔鼕鼖鼘鼚",
			5,
			"鼡鼣",
			8,
			"鼭鼮鼰鼱"
		],
		[
			"fd40",
			"鼲",
			4,
			"鼸鼺鼼鼿",
			4,
			"齅",
			10,
			"齒",
			38
		],
		[
			"fd80",
			"齹",
			5,
			"龁龂龍",
			11,
			"龜龝龞龡",
			4,
			"郎凉秊裏隣"
		],
		[
			"fe40",
			"兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
		]
	];

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = [
		[
			"a140",
			"",
			62
		],
		[
			"a180",
			"",
			32
		],
		[
			"a240",
			"",
			62
		],
		[
			"a280",
			"",
			32
		],
		[
			"a2ab",
			"",
			5
		],
		[
			"a2e3",
			"€"
		],
		[
			"a2ef",
			""
		],
		[
			"a2fd",
			""
		],
		[
			"a340",
			"",
			62
		],
		[
			"a380",
			"",
			31,
			"　"
		],
		[
			"a440",
			"",
			62
		],
		[
			"a480",
			"",
			32
		],
		[
			"a4f4",
			"",
			10
		],
		[
			"a540",
			"",
			62
		],
		[
			"a580",
			"",
			32
		],
		[
			"a5f7",
			"",
			7
		],
		[
			"a640",
			"",
			62
		],
		[
			"a680",
			"",
			32
		],
		[
			"a6b9",
			"",
			7
		],
		[
			"a6d9",
			"",
			6
		],
		[
			"a6ec",
			""
		],
		[
			"a6f3",
			""
		],
		[
			"a6f6",
			"",
			8
		],
		[
			"a740",
			"",
			62
		],
		[
			"a780",
			"",
			32
		],
		[
			"a7c2",
			"",
			14
		],
		[
			"a7f2",
			"",
			12
		],
		[
			"a896",
			"",
			10
		],
		[
			"a8bc",
			""
		],
		[
			"a8bf",
			"ǹ"
		],
		[
			"a8c1",
			""
		],
		[
			"a8ea",
			"",
			20
		],
		[
			"a958",
			""
		],
		[
			"a95b",
			""
		],
		[
			"a95d",
			""
		],
		[
			"a989",
			"〾⿰",
			11
		],
		[
			"a997",
			"",
			12
		],
		[
			"a9f0",
			"",
			14
		],
		[
			"aaa1",
			"",
			93
		],
		[
			"aba1",
			"",
			93
		],
		[
			"aca1",
			"",
			93
		],
		[
			"ada1",
			"",
			93
		],
		[
			"aea1",
			"",
			93
		],
		[
			"afa1",
			"",
			93
		],
		[
			"d7fa",
			"",
			4
		],
		[
			"f8a1",
			"",
			93
		],
		[
			"f9a1",
			"",
			93
		],
		[
			"faa1",
			"",
			93
		],
		[
			"fba1",
			"",
			93
		],
		[
			"fca1",
			"",
			93
		],
		[
			"fda1",
			"",
			93
		],
		[
			"fe50",
			"⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
		],
		[
			"fe80",
			"䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
			6,
			"䶮",
			93
		]
	];

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {
		"uChars": [
			128,
			165,
			169,
			178,
			184,
			216,
			226,
			235,
			238,
			244,
			248,
			251,
			253,
			258,
			276,
			284,
			300,
			325,
			329,
			334,
			364,
			463,
			465,
			467,
			469,
			471,
			473,
			475,
			477,
			506,
			594,
			610,
			712,
			716,
			730,
			930,
			938,
			962,
			970,
			1026,
			1104,
			1106,
			8209,
			8215,
			8218,
			8222,
			8231,
			8241,
			8244,
			8246,
			8252,
			8365,
			8452,
			8454,
			8458,
			8471,
			8482,
			8556,
			8570,
			8596,
			8602,
			8713,
			8720,
			8722,
			8726,
			8731,
			8737,
			8740,
			8742,
			8748,
			8751,
			8760,
			8766,
			8777,
			8781,
			8787,
			8802,
			8808,
			8816,
			8854,
			8858,
			8870,
			8896,
			8979,
			9322,
			9372,
			9548,
			9588,
			9616,
			9622,
			9634,
			9652,
			9662,
			9672,
			9676,
			9680,
			9702,
			9735,
			9738,
			9793,
			9795,
			11906,
			11909,
			11913,
			11917,
			11928,
			11944,
			11947,
			11951,
			11956,
			11960,
			11964,
			11979,
			12284,
			12292,
			12312,
			12319,
			12330,
			12351,
			12436,
			12447,
			12535,
			12543,
			12586,
			12842,
			12850,
			12964,
			13200,
			13215,
			13218,
			13253,
			13263,
			13267,
			13270,
			13384,
			13428,
			13727,
			13839,
			13851,
			14617,
			14703,
			14801,
			14816,
			14964,
			15183,
			15471,
			15585,
			16471,
			16736,
			17208,
			17325,
			17330,
			17374,
			17623,
			17997,
			18018,
			18212,
			18218,
			18301,
			18318,
			18760,
			18811,
			18814,
			18820,
			18823,
			18844,
			18848,
			18872,
			19576,
			19620,
			19738,
			19887,
			40870,
			59244,
			59336,
			59367,
			59413,
			59417,
			59423,
			59431,
			59437,
			59443,
			59452,
			59460,
			59478,
			59493,
			63789,
			63866,
			63894,
			63976,
			63986,
			64016,
			64018,
			64021,
			64025,
			64034,
			64037,
			64042,
			65074,
			65093,
			65107,
			65112,
			65127,
			65132,
			65375,
			65510,
			65536
		],
		"gbChars": [
			0,
			36,
			38,
			45,
			50,
			81,
			89,
			95,
			96,
			100,
			103,
			104,
			105,
			109,
			126,
			133,
			148,
			172,
			175,
			179,
			208,
			306,
			307,
			308,
			309,
			310,
			311,
			312,
			313,
			341,
			428,
			443,
			544,
			545,
			558,
			741,
			742,
			749,
			750,
			805,
			819,
			820,
			7922,
			7924,
			7925,
			7927,
			7934,
			7943,
			7944,
			7945,
			7950,
			8062,
			8148,
			8149,
			8152,
			8164,
			8174,
			8236,
			8240,
			8262,
			8264,
			8374,
			8380,
			8381,
			8384,
			8388,
			8390,
			8392,
			8393,
			8394,
			8396,
			8401,
			8406,
			8416,
			8419,
			8424,
			8437,
			8439,
			8445,
			8482,
			8485,
			8496,
			8521,
			8603,
			8936,
			8946,
			9046,
			9050,
			9063,
			9066,
			9076,
			9092,
			9100,
			9108,
			9111,
			9113,
			9131,
			9162,
			9164,
			9218,
			9219,
			11329,
			11331,
			11334,
			11336,
			11346,
			11361,
			11363,
			11366,
			11370,
			11372,
			11375,
			11389,
			11682,
			11686,
			11687,
			11692,
			11694,
			11714,
			11716,
			11723,
			11725,
			11730,
			11736,
			11982,
			11989,
			12102,
			12336,
			12348,
			12350,
			12384,
			12393,
			12395,
			12397,
			12510,
			12553,
			12851,
			12962,
			12973,
			13738,
			13823,
			13919,
			13933,
			14080,
			14298,
			14585,
			14698,
			15583,
			15847,
			16318,
			16434,
			16438,
			16481,
			16729,
			17102,
			17122,
			17315,
			17320,
			17402,
			17418,
			17859,
			17909,
			17911,
			17915,
			17916,
			17936,
			17939,
			17961,
			18664,
			18703,
			18814,
			18962,
			19043,
			33469,
			33470,
			33471,
			33484,
			33485,
			33490,
			33497,
			33501,
			33505,
			33513,
			33520,
			33536,
			33550,
			37845,
			37921,
			37948,
			38029,
			38038,
			38064,
			38065,
			38066,
			38069,
			38075,
			38076,
			38078,
			39108,
			39109,
			39113,
			39114,
			39115,
			39116,
			39265,
			39394,
			189000
		]
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127
		],
		[
			"8141",
			"갂갃갅갆갋",
			4,
			"갘갞갟갡갢갣갥",
			6,
			"갮갲갳갴"
		],
		[
			"8161",
			"갵갶갷갺갻갽갾갿걁",
			9,
			"걌걎",
			5,
			"걕"
		],
		[
			"8181",
			"걖걗걙걚걛걝",
			18,
			"걲걳걵걶걹걻",
			4,
			"겂겇겈겍겎겏겑겒겓겕",
			6,
			"겞겢",
			5,
			"겫겭겮겱",
			6,
			"겺겾겿곀곂곃곅곆곇곉곊곋곍",
			7,
			"곖곘",
			7,
			"곢곣곥곦곩곫곭곮곲곴곷",
			4,
			"곾곿괁괂괃괅괇",
			4,
			"괎괐괒괓"
		],
		[
			"8241",
			"괔괕괖괗괙괚괛괝괞괟괡",
			7,
			"괪괫괮",
			5
		],
		[
			"8261",
			"괶괷괹괺괻괽",
			6,
			"굆굈굊",
			5,
			"굑굒굓굕굖굗"
		],
		[
			"8281",
			"굙",
			7,
			"굢굤",
			7,
			"굮굯굱굲굷굸굹굺굾궀궃",
			4,
			"궊궋궍궎궏궑",
			10,
			"궞",
			5,
			"궥",
			17,
			"궸",
			7,
			"귂귃귅귆귇귉",
			6,
			"귒귔",
			7,
			"귝귞귟귡귢귣귥",
			18
		],
		[
			"8341",
			"귺귻귽귾긂",
			5,
			"긊긌긎",
			5,
			"긕",
			7
		],
		[
			"8361",
			"긝",
			18,
			"긲긳긵긶긹긻긼"
		],
		[
			"8381",
			"긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
			4,
			"깞깢깣깤깦깧깪깫깭깮깯깱",
			6,
			"깺깾",
			5,
			"꺆",
			5,
			"꺍",
			46,
			"꺿껁껂껃껅",
			6,
			"껎껒",
			5,
			"껚껛껝",
			8
		],
		[
			"8441",
			"껦껧껩껪껬껮",
			5,
			"껵껶껷껹껺껻껽",
			8
		],
		[
			"8461",
			"꼆꼉꼊꼋꼌꼎꼏꼑",
			18
		],
		[
			"8481",
			"꼤",
			7,
			"꼮꼯꼱꼳꼵",
			6,
			"꼾꽀꽄꽅꽆꽇꽊",
			5,
			"꽑",
			10,
			"꽞",
			5,
			"꽦",
			18,
			"꽺",
			5,
			"꾁꾂꾃꾅꾆꾇꾉",
			6,
			"꾒꾓꾔꾖",
			5,
			"꾝",
			26,
			"꾺꾻꾽꾾"
		],
		[
			"8541",
			"꾿꿁",
			5,
			"꿊꿌꿏",
			4,
			"꿕",
			6,
			"꿝",
			4
		],
		[
			"8561",
			"꿢",
			5,
			"꿪",
			5,
			"꿲꿳꿵꿶꿷꿹",
			6,
			"뀂뀃"
		],
		[
			"8581",
			"뀅",
			6,
			"뀍뀎뀏뀑뀒뀓뀕",
			6,
			"뀞",
			9,
			"뀩",
			26,
			"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
			29,
			"끾끿낁낂낃낅",
			6,
			"낎낐낒",
			5,
			"낛낝낞낣낤"
		],
		[
			"8641",
			"낥낦낧낪낰낲낶낷낹낺낻낽",
			6,
			"냆냊",
			5,
			"냒"
		],
		[
			"8661",
			"냓냕냖냗냙",
			6,
			"냡냢냣냤냦",
			10
		],
		[
			"8681",
			"냱",
			22,
			"넊넍넎넏넑넔넕넖넗넚넞",
			4,
			"넦넧넩넪넫넭",
			6,
			"넶넺",
			5,
			"녂녃녅녆녇녉",
			6,
			"녒녓녖녗녙녚녛녝녞녟녡",
			22,
			"녺녻녽녾녿놁놃",
			4,
			"놊놌놎놏놐놑놕놖놗놙놚놛놝"
		],
		[
			"8741",
			"놞",
			9,
			"놩",
			15
		],
		[
			"8761",
			"놹",
			18,
			"뇍뇎뇏뇑뇒뇓뇕"
		],
		[
			"8781",
			"뇖",
			5,
			"뇞뇠",
			7,
			"뇪뇫뇭뇮뇯뇱",
			7,
			"뇺뇼뇾",
			5,
			"눆눇눉눊눍",
			6,
			"눖눘눚",
			5,
			"눡",
			18,
			"눵",
			6,
			"눽",
			26,
			"뉙뉚뉛뉝뉞뉟뉡",
			6,
			"뉪",
			4
		],
		[
			"8841",
			"뉯",
			4,
			"뉶",
			5,
			"뉽",
			6,
			"늆늇늈늊",
			4
		],
		[
			"8861",
			"늏늒늓늕늖늗늛",
			4,
			"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
		],
		[
			"8881",
			"늸",
			15,
			"닊닋닍닎닏닑닓",
			4,
			"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
			6,
			"댒댖",
			5,
			"댝",
			54,
			"덗덙덚덝덠덡덢덣"
		],
		[
			"8941",
			"덦덨덪덬덭덯덲덳덵덶덷덹",
			6,
			"뎂뎆",
			5,
			"뎍"
		],
		[
			"8961",
			"뎎뎏뎑뎒뎓뎕",
			10,
			"뎢",
			5,
			"뎩뎪뎫뎭"
		],
		[
			"8981",
			"뎮",
			21,
			"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
			18,
			"돽",
			18,
			"됑",
			6,
			"됙됚됛됝됞됟됡",
			6,
			"됪됬",
			7,
			"됵",
			15
		],
		[
			"8a41",
			"둅",
			10,
			"둒둓둕둖둗둙",
			6,
			"둢둤둦"
		],
		[
			"8a61",
			"둧",
			4,
			"둭",
			18,
			"뒁뒂"
		],
		[
			"8a81",
			"뒃",
			4,
			"뒉",
			19,
			"뒞",
			5,
			"뒥뒦뒧뒩뒪뒫뒭",
			7,
			"뒶뒸뒺",
			5,
			"듁듂듃듅듆듇듉",
			6,
			"듑듒듓듔듖",
			5,
			"듞듟듡듢듥듧",
			4,
			"듮듰듲",
			5,
			"듹",
			26,
			"딖딗딙딚딝"
		],
		[
			"8b41",
			"딞",
			5,
			"딦딫",
			4,
			"딲딳딵딶딷딹",
			6,
			"땂땆"
		],
		[
			"8b61",
			"땇땈땉땊땎땏땑땒땓땕",
			6,
			"땞땢",
			8
		],
		[
			"8b81",
			"땫",
			52,
			"떢떣떥떦떧떩떬떭떮떯떲떶",
			4,
			"떾떿뗁뗂뗃뗅",
			6,
			"뗎뗒",
			5,
			"뗙",
			18,
			"뗭",
			18
		],
		[
			"8c41",
			"똀",
			15,
			"똒똓똕똖똗똙",
			4
		],
		[
			"8c61",
			"똞",
			6,
			"똦",
			5,
			"똭",
			6,
			"똵",
			5
		],
		[
			"8c81",
			"똻",
			12,
			"뙉",
			26,
			"뙥뙦뙧뙩",
			50,
			"뚞뚟뚡뚢뚣뚥",
			5,
			"뚭뚮뚯뚰뚲",
			16
		],
		[
			"8d41",
			"뛃",
			16,
			"뛕",
			8
		],
		[
			"8d61",
			"뛞",
			17,
			"뛱뛲뛳뛵뛶뛷뛹뛺"
		],
		[
			"8d81",
			"뛻",
			4,
			"뜂뜃뜄뜆",
			33,
			"뜪뜫뜭뜮뜱",
			6,
			"뜺뜼",
			7,
			"띅띆띇띉띊띋띍",
			6,
			"띖",
			9,
			"띡띢띣띥띦띧띩",
			6,
			"띲띴띶",
			5,
			"띾띿랁랂랃랅",
			6,
			"랎랓랔랕랚랛랝랞"
		],
		[
			"8e41",
			"랟랡",
			6,
			"랪랮",
			5,
			"랶랷랹",
			8
		],
		[
			"8e61",
			"럂",
			4,
			"럈럊",
			19
		],
		[
			"8e81",
			"럞",
			13,
			"럮럯럱럲럳럵",
			6,
			"럾렂",
			4,
			"렊렋렍렎렏렑",
			6,
			"렚렜렞",
			5,
			"렦렧렩렪렫렭",
			6,
			"렶렺",
			5,
			"롁롂롃롅",
			11,
			"롒롔",
			7,
			"롞롟롡롢롣롥",
			6,
			"롮롰롲",
			5,
			"롹롺롻롽",
			7
		],
		[
			"8f41",
			"뢅",
			7,
			"뢎",
			17
		],
		[
			"8f61",
			"뢠",
			7,
			"뢩",
			6,
			"뢱뢲뢳뢵뢶뢷뢹",
			4
		],
		[
			"8f81",
			"뢾뢿룂룄룆",
			5,
			"룍룎룏룑룒룓룕",
			7,
			"룞룠룢",
			5,
			"룪룫룭룮룯룱",
			6,
			"룺룼룾",
			5,
			"뤅",
			18,
			"뤙",
			6,
			"뤡",
			26,
			"뤾뤿륁륂륃륅",
			6,
			"륍륎륐륒",
			5
		],
		[
			"9041",
			"륚륛륝륞륟륡",
			6,
			"륪륬륮",
			5,
			"륶륷륹륺륻륽"
		],
		[
			"9061",
			"륾",
			5,
			"릆릈릋릌릏",
			15
		],
		[
			"9081",
			"릟",
			12,
			"릮릯릱릲릳릵",
			6,
			"릾맀맂",
			5,
			"맊맋맍맓",
			4,
			"맚맜맟맠맢맦맧맩맪맫맭",
			6,
			"맶맻",
			4,
			"먂",
			5,
			"먉",
			11,
			"먖",
			33,
			"먺먻먽먾먿멁멃멄멅멆"
		],
		[
			"9141",
			"멇멊멌멏멐멑멒멖멗멙멚멛멝",
			6,
			"멦멪",
			5
		],
		[
			"9161",
			"멲멳멵멶멷멹",
			9,
			"몆몈몉몊몋몍",
			5
		],
		[
			"9181",
			"몓",
			20,
			"몪몭몮몯몱몳",
			4,
			"몺몼몾",
			5,
			"뫅뫆뫇뫉",
			14,
			"뫚",
			33,
			"뫽뫾뫿묁묂묃묅",
			7,
			"묎묐묒",
			5,
			"묙묚묛묝묞묟묡",
			6
		],
		[
			"9241",
			"묨묪묬",
			7,
			"묷묹묺묿",
			4,
			"뭆뭈뭊뭋뭌뭎뭑뭒"
		],
		[
			"9261",
			"뭓뭕뭖뭗뭙",
			7,
			"뭢뭤",
			7,
			"뭭",
			4
		],
		[
			"9281",
			"뭲",
			21,
			"뮉뮊뮋뮍뮎뮏뮑",
			18,
			"뮥뮦뮧뮩뮪뮫뮭",
			6,
			"뮵뮶뮸",
			7,
			"믁믂믃믅믆믇믉",
			6,
			"믑믒믔",
			35,
			"믺믻믽믾밁"
		],
		[
			"9341",
			"밃",
			4,
			"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
		],
		[
			"9361",
			"밶밷밹",
			6,
			"뱂뱆뱇뱈뱊뱋뱎뱏뱑",
			8
		],
		[
			"9381",
			"뱚뱛뱜뱞",
			37,
			"벆벇벉벊벍벏",
			4,
			"벖벘벛",
			4,
			"벢벣벥벦벩",
			6,
			"벲벶",
			5,
			"벾벿볁볂볃볅",
			7,
			"볎볒볓볔볖볗볙볚볛볝",
			22,
			"볷볹볺볻볽"
		],
		[
			"9441",
			"볾",
			5,
			"봆봈봊",
			5,
			"봑봒봓봕",
			8
		],
		[
			"9461",
			"봞",
			5,
			"봥",
			6,
			"봭",
			12
		],
		[
			"9481",
			"봺",
			5,
			"뵁",
			6,
			"뵊뵋뵍뵎뵏뵑",
			6,
			"뵚",
			9,
			"뵥뵦뵧뵩",
			22,
			"붂붃붅붆붋",
			4,
			"붒붔붖붗붘붛붝",
			6,
			"붥",
			10,
			"붱",
			6,
			"붹",
			24
		],
		[
			"9541",
			"뷒뷓뷖뷗뷙뷚뷛뷝",
			11,
			"뷪",
			5,
			"뷱"
		],
		[
			"9561",
			"뷲뷳뷵뷶뷷뷹",
			6,
			"븁븂븄븆",
			5,
			"븎븏븑븒븓"
		],
		[
			"9581",
			"븕",
			6,
			"븞븠",
			35,
			"빆빇빉빊빋빍빏",
			4,
			"빖빘빜빝빞빟빢빣빥빦빧빩빫",
			4,
			"빲빶",
			4,
			"빾빿뺁뺂뺃뺅",
			6,
			"뺎뺒",
			5,
			"뺚",
			13,
			"뺩",
			14
		],
		[
			"9641",
			"뺸",
			23,
			"뻒뻓"
		],
		[
			"9661",
			"뻕뻖뻙",
			6,
			"뻡뻢뻦",
			5,
			"뻭",
			8
		],
		[
			"9681",
			"뻶",
			10,
			"뼂",
			5,
			"뼊",
			13,
			"뼚뼞",
			33,
			"뽂뽃뽅뽆뽇뽉",
			6,
			"뽒뽓뽔뽖",
			44
		],
		[
			"9741",
			"뾃",
			16,
			"뾕",
			8
		],
		[
			"9761",
			"뾞",
			17,
			"뾱",
			7
		],
		[
			"9781",
			"뾹",
			11,
			"뿆",
			5,
			"뿎뿏뿑뿒뿓뿕",
			6,
			"뿝뿞뿠뿢",
			89,
			"쀽쀾쀿"
		],
		[
			"9841",
			"쁀",
			16,
			"쁒",
			5,
			"쁙쁚쁛"
		],
		[
			"9861",
			"쁝쁞쁟쁡",
			6,
			"쁪",
			15
		],
		[
			"9881",
			"쁺",
			21,
			"삒삓삕삖삗삙",
			6,
			"삢삤삦",
			5,
			"삮삱삲삷",
			4,
			"삾샂샃샄샆샇샊샋샍샎샏샑",
			6,
			"샚샞",
			5,
			"샦샧샩샪샫샭",
			6,
			"샶샸샺",
			5,
			"섁섂섃섅섆섇섉",
			6,
			"섑섒섓섔섖",
			5,
			"섡섢섥섨섩섪섫섮"
		],
		[
			"9941",
			"섲섳섴섵섷섺섻섽섾섿셁",
			6,
			"셊셎",
			5,
			"셖셗"
		],
		[
			"9961",
			"셙셚셛셝",
			6,
			"셦셪",
			5,
			"셱셲셳셵셶셷셹셺셻"
		],
		[
			"9981",
			"셼",
			8,
			"솆",
			5,
			"솏솑솒솓솕솗",
			4,
			"솞솠솢솣솤솦솧솪솫솭솮솯솱",
			11,
			"솾",
			5,
			"쇅쇆쇇쇉쇊쇋쇍",
			6,
			"쇕쇖쇙",
			6,
			"쇡쇢쇣쇥쇦쇧쇩",
			6,
			"쇲쇴",
			7,
			"쇾쇿숁숂숃숅",
			6,
			"숎숐숒",
			5,
			"숚숛숝숞숡숢숣"
		],
		[
			"9a41",
			"숤숥숦숧숪숬숮숰숳숵",
			16
		],
		[
			"9a61",
			"쉆쉇쉉",
			6,
			"쉒쉓쉕쉖쉗쉙",
			6,
			"쉡쉢쉣쉤쉦"
		],
		[
			"9a81",
			"쉧",
			4,
			"쉮쉯쉱쉲쉳쉵",
			6,
			"쉾슀슂",
			5,
			"슊",
			5,
			"슑",
			6,
			"슙슚슜슞",
			5,
			"슦슧슩슪슫슮",
			5,
			"슶슸슺",
			33,
			"싞싟싡싢싥",
			5,
			"싮싰싲싳싴싵싷싺싽싾싿쌁",
			6,
			"쌊쌋쌎쌏"
		],
		[
			"9b41",
			"쌐쌑쌒쌖쌗쌙쌚쌛쌝",
			6,
			"쌦쌧쌪",
			8
		],
		[
			"9b61",
			"쌳",
			17,
			"썆",
			7
		],
		[
			"9b81",
			"썎",
			25,
			"썪썫썭썮썯썱썳",
			4,
			"썺썻썾",
			5,
			"쎅쎆쎇쎉쎊쎋쎍",
			50,
			"쏁",
			22,
			"쏚"
		],
		[
			"9c41",
			"쏛쏝쏞쏡쏣",
			4,
			"쏪쏫쏬쏮",
			5,
			"쏶쏷쏹",
			5
		],
		[
			"9c61",
			"쏿",
			8,
			"쐉",
			6,
			"쐑",
			9
		],
		[
			"9c81",
			"쐛",
			8,
			"쐥",
			6,
			"쐭쐮쐯쐱쐲쐳쐵",
			6,
			"쐾",
			9,
			"쑉",
			26,
			"쑦쑧쑩쑪쑫쑭",
			6,
			"쑶쑷쑸쑺",
			5,
			"쒁",
			18,
			"쒕",
			6,
			"쒝",
			12
		],
		[
			"9d41",
			"쒪",
			13,
			"쒹쒺쒻쒽",
			8
		],
		[
			"9d61",
			"쓆",
			25
		],
		[
			"9d81",
			"쓠",
			8,
			"쓪",
			5,
			"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
			9,
			"씍씎씏씑씒씓씕",
			6,
			"씝",
			10,
			"씪씫씭씮씯씱",
			6,
			"씺씼씾",
			5,
			"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
			6,
			"앲앶",
			5,
			"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
		],
		[
			"9e41",
			"얖얙얚얛얝얞얟얡",
			7,
			"얪",
			9,
			"얶"
		],
		[
			"9e61",
			"얷얺얿",
			4,
			"엋엍엏엒엓엕엖엗엙",
			6,
			"엢엤엦엧"
		],
		[
			"9e81",
			"엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
			6,
			"옚옝",
			6,
			"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
			6,
			"왒왖",
			5,
			"왞왟왡",
			10,
			"왭왮왰왲",
			5,
			"왺왻왽왾왿욁",
			6,
			"욊욌욎",
			5,
			"욖욗욙욚욛욝",
			6,
			"욦"
		],
		[
			"9f41",
			"욨욪",
			5,
			"욲욳욵욶욷욻",
			4,
			"웂웄웆",
			5,
			"웎"
		],
		[
			"9f61",
			"웏웑웒웓웕",
			6,
			"웞웟웢",
			5,
			"웪웫웭웮웯웱웲"
		],
		[
			"9f81",
			"웳",
			4,
			"웺웻웼웾",
			5,
			"윆윇윉윊윋윍",
			6,
			"윖윘윚",
			5,
			"윢윣윥윦윧윩",
			6,
			"윲윴윶윸윹윺윻윾윿읁읂읃읅",
			4,
			"읋읎읐읙읚읛읝읞읟읡",
			6,
			"읩읪읬",
			7,
			"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
			4,
			"잢잧",
			4,
			"잮잯잱잲잳잵잶잷"
		],
		[
			"a041",
			"잸잹잺잻잾쟂",
			5,
			"쟊쟋쟍쟏쟑",
			6,
			"쟙쟚쟛쟜"
		],
		[
			"a061",
			"쟞",
			5,
			"쟥쟦쟧쟩쟪쟫쟭",
			13
		],
		[
			"a081",
			"쟻",
			4,
			"젂젃젅젆젇젉젋",
			4,
			"젒젔젗",
			4,
			"젞젟젡젢젣젥",
			6,
			"젮젰젲",
			5,
			"젹젺젻젽젾젿졁",
			6,
			"졊졋졎",
			5,
			"졕",
			26,
			"졲졳졵졶졷졹졻",
			4,
			"좂좄좈좉좊좎",
			5,
			"좕",
			7,
			"좞좠좢좣좤"
		],
		[
			"a141",
			"좥좦좧좩",
			18,
			"좾좿죀죁"
		],
		[
			"a161",
			"죂죃죅죆죇죉죊죋죍",
			6,
			"죖죘죚",
			5,
			"죢죣죥"
		],
		[
			"a181",
			"죦",
			14,
			"죶",
			5,
			"죾죿줁줂줃줇",
			4,
			"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
			9,
			"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
		],
		[
			"a241",
			"줐줒",
			5,
			"줙",
			18
		],
		[
			"a261",
			"줭",
			6,
			"줵",
			18
		],
		[
			"a281",
			"쥈",
			7,
			"쥒쥓쥕쥖쥗쥙",
			6,
			"쥢쥤",
			7,
			"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
		],
		[
			"a341",
			"쥱쥲쥳쥵",
			6,
			"쥽",
			10,
			"즊즋즍즎즏"
		],
		[
			"a361",
			"즑",
			6,
			"즚즜즞",
			16
		],
		[
			"a381",
			"즯",
			16,
			"짂짃짅짆짉짋",
			4,
			"짒짔짗짘짛！",
			58,
			"￦］",
			32,
			"￣"
		],
		[
			"a441",
			"짞짟짡짣짥짦짨짩짪짫짮짲",
			5,
			"짺짻짽짾짿쨁쨂쨃쨄"
		],
		[
			"a461",
			"쨅쨆쨇쨊쨎",
			5,
			"쨕쨖쨗쨙",
			12
		],
		[
			"a481",
			"쨦쨧쨨쨪",
			28,
			"ㄱ",
			93
		],
		[
			"a541",
			"쩇",
			4,
			"쩎쩏쩑쩒쩓쩕",
			6,
			"쩞쩢",
			5,
			"쩩쩪"
		],
		[
			"a561",
			"쩫",
			17,
			"쩾",
			5,
			"쪅쪆"
		],
		[
			"a581",
			"쪇",
			16,
			"쪙",
			14,
			"ⅰ",
			9
		],
		[
			"a5b0",
			"Ⅰ",
			9
		],
		[
			"a5c1",
			"Α",
			16,
			"Σ",
			6
		],
		[
			"a5e1",
			"α",
			16,
			"σ",
			6
		],
		[
			"a641",
			"쪨",
			19,
			"쪾쪿쫁쫂쫃쫅"
		],
		[
			"a661",
			"쫆",
			5,
			"쫎쫐쫒쫔쫕쫖쫗쫚",
			5,
			"쫡",
			6
		],
		[
			"a681",
			"쫨쫩쫪쫫쫭",
			6,
			"쫵",
			18,
			"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
			7
		],
		[
			"a741",
			"쬋",
			4,
			"쬑쬒쬓쬕쬖쬗쬙",
			6,
			"쬢",
			7
		],
		[
			"a761",
			"쬪",
			22,
			"쭂쭃쭄"
		],
		[
			"a781",
			"쭅쭆쭇쭊쭋쭍쭎쭏쭑",
			6,
			"쭚쭛쭜쭞",
			5,
			"쭥",
			7,
			"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
			9,
			"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
			9,
			"㎀",
			4,
			"㎺",
			5,
			"㎐",
			4,
			"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
		],
		[
			"a841",
			"쭭",
			10,
			"쭺",
			14
		],
		[
			"a861",
			"쮉",
			18,
			"쮝",
			6
		],
		[
			"a881",
			"쮤",
			19,
			"쮹",
			11,
			"ÆÐªĦ"
		],
		[
			"a8a6",
			"Ĳ"
		],
		[
			"a8a8",
			"ĿŁØŒºÞŦŊ"
		],
		[
			"a8b1",
			"㉠",
			27,
			"ⓐ",
			25,
			"①",
			14,
			"½⅓⅔¼¾⅛⅜⅝⅞"
		],
		[
			"a941",
			"쯅",
			14,
			"쯕",
			10
		],
		[
			"a961",
			"쯠쯡쯢쯣쯥쯦쯨쯪",
			18
		],
		[
			"a981",
			"쯽",
			14,
			"찎찏찑찒찓찕",
			6,
			"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
			27,
			"⒜",
			25,
			"⑴",
			14,
			"¹²³⁴ⁿ₁₂₃₄"
		],
		[
			"aa41",
			"찥찦찪찫찭찯찱",
			6,
			"찺찿",
			4,
			"챆챇챉챊챋챍챎"
		],
		[
			"aa61",
			"챏",
			4,
			"챖챚",
			5,
			"챡챢챣챥챧챩",
			6,
			"챱챲"
		],
		[
			"aa81",
			"챳챴챶",
			29,
			"ぁ",
			82
		],
		[
			"ab41",
			"첔첕첖첗첚첛첝첞첟첡",
			6,
			"첪첮",
			5,
			"첶첷첹"
		],
		[
			"ab61",
			"첺첻첽",
			6,
			"쳆쳈쳊",
			5,
			"쳑쳒쳓쳕",
			5
		],
		[
			"ab81",
			"쳛",
			8,
			"쳥",
			6,
			"쳭쳮쳯쳱",
			12,
			"ァ",
			85
		],
		[
			"ac41",
			"쳾쳿촀촂",
			5,
			"촊촋촍촎촏촑",
			6,
			"촚촜촞촟촠"
		],
		[
			"ac61",
			"촡촢촣촥촦촧촩촪촫촭",
			11,
			"촺",
			4
		],
		[
			"ac81",
			"촿",
			28,
			"쵝쵞쵟А",
			5,
			"ЁЖ",
			25
		],
		[
			"acd1",
			"а",
			5,
			"ёж",
			25
		],
		[
			"ad41",
			"쵡쵢쵣쵥",
			6,
			"쵮쵰쵲",
			5,
			"쵹",
			7
		],
		[
			"ad61",
			"춁",
			6,
			"춉",
			10,
			"춖춗춙춚춛춝춞춟"
		],
		[
			"ad81",
			"춠춡춢춣춦춨춪",
			5,
			"춱",
			18,
			"췅"
		],
		[
			"ae41",
			"췆",
			5,
			"췍췎췏췑",
			16
		],
		[
			"ae61",
			"췢",
			5,
			"췩췪췫췭췮췯췱",
			6,
			"췺췼췾",
			4
		],
		[
			"ae81",
			"츃츅츆츇츉츊츋츍",
			6,
			"츕츖츗츘츚",
			5,
			"츢츣츥츦츧츩츪츫"
		],
		[
			"af41",
			"츬츭츮츯츲츴츶",
			19
		],
		[
			"af61",
			"칊",
			13,
			"칚칛칝칞칢",
			5,
			"칪칬"
		],
		[
			"af81",
			"칮",
			5,
			"칶칷칹칺칻칽",
			6,
			"캆캈캊",
			5,
			"캒캓캕캖캗캙"
		],
		[
			"b041",
			"캚",
			5,
			"캢캦",
			5,
			"캮",
			12
		],
		[
			"b061",
			"캻",
			5,
			"컂",
			19
		],
		[
			"b081",
			"컖",
			13,
			"컦컧컩컪컭",
			6,
			"컶컺",
			5,
			"가각간갇갈갉갊감",
			7,
			"같",
			4,
			"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
		],
		[
			"b141",
			"켂켃켅켆켇켉",
			6,
			"켒켔켖",
			5,
			"켝켞켟켡켢켣"
		],
		[
			"b161",
			"켥",
			6,
			"켮켲",
			5,
			"켹",
			11
		],
		[
			"b181",
			"콅",
			14,
			"콖콗콙콚콛콝",
			6,
			"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
		],
		[
			"b241",
			"콭콮콯콲콳콵콶콷콹",
			6,
			"쾁쾂쾃쾄쾆",
			5,
			"쾍"
		],
		[
			"b261",
			"쾎",
			18,
			"쾢",
			5,
			"쾩"
		],
		[
			"b281",
			"쾪",
			5,
			"쾱",
			18,
			"쿅",
			6,
			"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
		],
		[
			"b341",
			"쿌",
			19,
			"쿢쿣쿥쿦쿧쿩"
		],
		[
			"b361",
			"쿪",
			5,
			"쿲쿴쿶",
			5,
			"쿽쿾쿿퀁퀂퀃퀅",
			5
		],
		[
			"b381",
			"퀋",
			5,
			"퀒",
			5,
			"퀙",
			19,
			"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
			4,
			"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
		],
		[
			"b441",
			"퀮",
			5,
			"퀶퀷퀹퀺퀻퀽",
			6,
			"큆큈큊",
			5
		],
		[
			"b461",
			"큑큒큓큕큖큗큙",
			6,
			"큡",
			10,
			"큮큯"
		],
		[
			"b481",
			"큱큲큳큵",
			6,
			"큾큿킀킂",
			18,
			"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
			4,
			"닳담답닷",
			4,
			"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
		],
		[
			"b541",
			"킕",
			14,
			"킦킧킩킪킫킭",
			5
		],
		[
			"b561",
			"킳킶킸킺",
			5,
			"탂탃탅탆탇탊",
			5,
			"탒탖",
			4
		],
		[
			"b581",
			"탛탞탟탡탢탣탥",
			6,
			"탮탲",
			5,
			"탹",
			11,
			"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
		],
		[
			"b641",
			"턅",
			7,
			"턎",
			17
		],
		[
			"b661",
			"턠",
			15,
			"턲턳턵턶턷턹턻턼턽턾"
		],
		[
			"b681",
			"턿텂텆",
			5,
			"텎텏텑텒텓텕",
			6,
			"텞텠텢",
			5,
			"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
		],
		[
			"b741",
			"텮",
			13,
			"텽",
			6,
			"톅톆톇톉톊"
		],
		[
			"b761",
			"톋",
			20,
			"톢톣톥톦톧"
		],
		[
			"b781",
			"톩",
			6,
			"톲톴톶톷톸톹톻톽톾톿퇁",
			14,
			"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
		],
		[
			"b841",
			"퇐",
			7,
			"퇙",
			17
		],
		[
			"b861",
			"퇫",
			8,
			"퇵퇶퇷퇹",
			13
		],
		[
			"b881",
			"툈툊",
			5,
			"툑",
			24,
			"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
			4,
			"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
		],
		[
			"b941",
			"툪툫툮툯툱툲툳툵",
			6,
			"툾퉀퉂",
			5,
			"퉉퉊퉋퉌"
		],
		[
			"b961",
			"퉍",
			14,
			"퉝",
			6,
			"퉥퉦퉧퉨"
		],
		[
			"b981",
			"퉩",
			22,
			"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
			4,
			"받",
			4,
			"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
		],
		[
			"ba41",
			"튍튎튏튒튓튔튖",
			5,
			"튝튞튟튡튢튣튥",
			6,
			"튭"
		],
		[
			"ba61",
			"튮튯튰튲",
			5,
			"튺튻튽튾틁틃",
			4,
			"틊틌",
			5
		],
		[
			"ba81",
			"틒틓틕틖틗틙틚틛틝",
			6,
			"틦",
			9,
			"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
		],
		[
			"bb41",
			"틻",
			4,
			"팂팄팆",
			5,
			"팏팑팒팓팕팗",
			4,
			"팞팢팣"
		],
		[
			"bb61",
			"팤팦팧팪팫팭팮팯팱",
			6,
			"팺팾",
			5,
			"퍆퍇퍈퍉"
		],
		[
			"bb81",
			"퍊",
			31,
			"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
		],
		[
			"bc41",
			"퍪",
			17,
			"퍾퍿펁펂펃펅펆펇"
		],
		[
			"bc61",
			"펈펉펊펋펎펒",
			5,
			"펚펛펝펞펟펡",
			6,
			"펪펬펮"
		],
		[
			"bc81",
			"펯",
			4,
			"펵펶펷펹펺펻펽",
			6,
			"폆폇폊",
			5,
			"폑",
			5,
			"샥샨샬샴샵샷샹섀섄섈섐섕서",
			4,
			"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
		],
		[
			"bd41",
			"폗폙",
			7,
			"폢폤",
			7,
			"폮폯폱폲폳폵폶폷"
		],
		[
			"bd61",
			"폸폹폺폻폾퐀퐂",
			5,
			"퐉",
			13
		],
		[
			"bd81",
			"퐗",
			5,
			"퐞",
			25,
			"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
		],
		[
			"be41",
			"퐸",
			7,
			"푁푂푃푅",
			14
		],
		[
			"be61",
			"푔",
			7,
			"푝푞푟푡푢푣푥",
			7,
			"푮푰푱푲"
		],
		[
			"be81",
			"푳",
			4,
			"푺푻푽푾풁풃",
			4,
			"풊풌풎",
			5,
			"풕",
			8,
			"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
			6,
			"엌엎"
		],
		[
			"bf41",
			"풞",
			10,
			"풪",
			14
		],
		[
			"bf61",
			"풹",
			18,
			"퓍퓎퓏퓑퓒퓓퓕"
		],
		[
			"bf81",
			"퓖",
			5,
			"퓝퓞퓠",
			7,
			"퓩퓪퓫퓭퓮퓯퓱",
			6,
			"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
			5,
			"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
		],
		[
			"c041",
			"퓾",
			5,
			"픅픆픇픉픊픋픍",
			6,
			"픖픘",
			5
		],
		[
			"c061",
			"픞",
			25
		],
		[
			"c081",
			"픸픹픺픻픾픿핁핂핃핅",
			6,
			"핎핐핒",
			5,
			"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
			7,
			"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
		],
		[
			"c141",
			"핤핦핧핪핬핮",
			5,
			"핶핷핹핺핻핽",
			6,
			"햆햊햋"
		],
		[
			"c161",
			"햌햍햎햏햑",
			19,
			"햦햧"
		],
		[
			"c181",
			"햨",
			31,
			"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
		],
		[
			"c241",
			"헊헋헍헎헏헑헓",
			4,
			"헚헜헞",
			5,
			"헦헧헩헪헫헭헮"
		],
		[
			"c261",
			"헯",
			4,
			"헶헸헺",
			5,
			"혂혃혅혆혇혉",
			6,
			"혒"
		],
		[
			"c281",
			"혖",
			5,
			"혝혞혟혡혢혣혥",
			7,
			"혮",
			9,
			"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
		],
		[
			"c341",
			"혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
			4
		],
		[
			"c361",
			"홢",
			4,
			"홨홪",
			5,
			"홲홳홵",
			11
		],
		[
			"c381",
			"횁횂횄횆",
			5,
			"횎횏횑횒횓횕",
			7,
			"횞횠횢",
			5,
			"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
		],
		[
			"c441",
			"횫횭횮횯횱",
			7,
			"횺횼",
			7,
			"훆훇훉훊훋"
		],
		[
			"c461",
			"훍훎훏훐훒훓훕훖훘훚",
			5,
			"훡훢훣훥훦훧훩",
			4
		],
		[
			"c481",
			"훮훯훱훲훳훴훶",
			5,
			"훾훿휁휂휃휅",
			11,
			"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
		],
		[
			"c541",
			"휕휖휗휚휛휝휞휟휡",
			6,
			"휪휬휮",
			5,
			"휶휷휹"
		],
		[
			"c561",
			"휺휻휽",
			6,
			"흅흆흈흊",
			5,
			"흒흓흕흚",
			4
		],
		[
			"c581",
			"흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
			6,
			"흾흿힀힂",
			5,
			"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
		],
		[
			"c641",
			"힍힎힏힑",
			6,
			"힚힜힞",
			5
		],
		[
			"c6a1",
			"퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
		],
		[
			"c7a1",
			"퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
		],
		[
			"c8a1",
			"혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
		],
		[
			"caa1",
			"伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
		],
		[
			"cba1",
			"匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
		],
		[
			"cca1",
			"瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
		],
		[
			"cda1",
			"棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
		],
		[
			"cea1",
			"科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
		],
		[
			"cfa1",
			"區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
		],
		[
			"d0a1",
			"鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
		],
		[
			"d1a1",
			"朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
			5,
			"那樂",
			4,
			"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
		],
		[
			"d2a1",
			"納臘蠟衲囊娘廊",
			4,
			"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
			5,
			"駑魯",
			10,
			"濃籠聾膿農惱牢磊腦賂雷尿壘",
			7,
			"嫩訥杻紐勒",
			5,
			"能菱陵尼泥匿溺多茶"
		],
		[
			"d3a1",
			"丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
		],
		[
			"d4a1",
			"棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
		],
		[
			"d5a1",
			"蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
		],
		[
			"d6a1",
			"煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
		],
		[
			"d7a1",
			"遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
		],
		[
			"d8a1",
			"立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
		],
		[
			"d9a1",
			"蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
		],
		[
			"daa1",
			"汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
		],
		[
			"dba1",
			"發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
		],
		[
			"dca1",
			"碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
		],
		[
			"dda1",
			"孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
		],
		[
			"dea1",
			"脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
		],
		[
			"dfa1",
			"傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
		],
		[
			"e0a1",
			"胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
		],
		[
			"e1a1",
			"聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
		],
		[
			"e2a1",
			"戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
		],
		[
			"e3a1",
			"嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
		],
		[
			"e4a1",
			"沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
		],
		[
			"e5a1",
			"櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
		],
		[
			"e6a1",
			"旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
		],
		[
			"e7a1",
			"簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
		],
		[
			"e8a1",
			"烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
		],
		[
			"e9a1",
			"窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
		],
		[
			"eaa1",
			"運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
		],
		[
			"eba1",
			"濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
		],
		[
			"eca1",
			"議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
		],
		[
			"eda1",
			"立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
		],
		[
			"eea1",
			"障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
		],
		[
			"efa1",
			"煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
		],
		[
			"f0a1",
			"靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
		],
		[
			"f1a1",
			"踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
		],
		[
			"f2a1",
			"咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
		],
		[
			"f3a1",
			"鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
		],
		[
			"f4a1",
			"責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
		],
		[
			"f5a1",
			"椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
		],
		[
			"f6a1",
			"贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
		],
		[
			"f7a1",
			"鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
		],
		[
			"f8a1",
			"阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
		],
		[
			"f9a1",
			"品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
		],
		[
			"faa1",
			"行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
		],
		[
			"fba1",
			"形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
		],
		[
			"fca1",
			"禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
		],
		[
			"fda1",
			"爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
		]
	];

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = [
		[
			"0",
			"\u0000",
			127
		],
		[
			"a140",
			"　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
		],
		[
			"a1a1",
			"﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
			4,
			"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
		],
		[
			"a240",
			"＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
			7,
			"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
		],
		[
			"a2a1",
			"╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
			9,
			"Ⅰ",
			9,
			"〡",
			8,
			"十卄卅Ａ",
			25,
			"ａ",
			21
		],
		[
			"a340",
			"ｗｘｙｚΑ",
			16,
			"Σ",
			6,
			"α",
			16,
			"σ",
			6,
			"ㄅ",
			10
		],
		[
			"a3a1",
			"ㄐ",
			25,
			"˙ˉˊˇˋ"
		],
		[
			"a3e1",
			"€"
		],
		[
			"a440",
			"一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
		],
		[
			"a4a1",
			"丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
		],
		[
			"a540",
			"世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
		],
		[
			"a5a1",
			"央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
		],
		[
			"a640",
			"共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
		],
		[
			"a6a1",
			"式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
		],
		[
			"a740",
			"作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
		],
		[
			"a7a1",
			"均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
		],
		[
			"a840",
			"杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
		],
		[
			"a8a1",
			"芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
		],
		[
			"a940",
			"咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
		],
		[
			"a9a1",
			"屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
		],
		[
			"aa40",
			"昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
		],
		[
			"aaa1",
			"炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
		],
		[
			"ab40",
			"陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
		],
		[
			"aba1",
			"哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
		],
		[
			"ac40",
			"拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
		],
		[
			"aca1",
			"活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
		],
		[
			"ad40",
			"耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
		],
		[
			"ada1",
			"迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
		],
		[
			"ae40",
			"哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
		],
		[
			"aea1",
			"恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
		],
		[
			"af40",
			"浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
		],
		[
			"afa1",
			"砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
		],
		[
			"b040",
			"虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
		],
		[
			"b0a1",
			"陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
		],
		[
			"b140",
			"娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
		],
		[
			"b1a1",
			"情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
		],
		[
			"b240",
			"毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
		],
		[
			"b2a1",
			"瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
		],
		[
			"b340",
			"莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
		],
		[
			"b3a1",
			"部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
		],
		[
			"b440",
			"婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
		],
		[
			"b4a1",
			"插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
		],
		[
			"b540",
			"溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
		],
		[
			"b5a1",
			"窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
		],
		[
			"b640",
			"詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
		],
		[
			"b6a1",
			"間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
		],
		[
			"b740",
			"媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
		],
		[
			"b7a1",
			"楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
		],
		[
			"b840",
			"睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
		],
		[
			"b8a1",
			"腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
		],
		[
			"b940",
			"辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
		],
		[
			"b9a1",
			"飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
		],
		[
			"ba40",
			"愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
		],
		[
			"baa1",
			"滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
		],
		[
			"bb40",
			"罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
		],
		[
			"bba1",
			"說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
		],
		[
			"bc40",
			"劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
		],
		[
			"bca1",
			"慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
		],
		[
			"bd40",
			"瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
		],
		[
			"bda1",
			"翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
		],
		[
			"be40",
			"輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
		],
		[
			"bea1",
			"鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
		],
		[
			"bf40",
			"濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
		],
		[
			"bfa1",
			"縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
		],
		[
			"c040",
			"錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
		],
		[
			"c0a1",
			"嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
		],
		[
			"c140",
			"瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
		],
		[
			"c1a1",
			"薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
		],
		[
			"c240",
			"駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
		],
		[
			"c2a1",
			"癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
		],
		[
			"c340",
			"鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
		],
		[
			"c3a1",
			"獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
		],
		[
			"c440",
			"願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
		],
		[
			"c4a1",
			"纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
		],
		[
			"c540",
			"護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
		],
		[
			"c5a1",
			"禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
		],
		[
			"c640",
			"讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
		],
		[
			"c940",
			"乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
		],
		[
			"c9a1",
			"氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
		],
		[
			"ca40",
			"汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
		],
		[
			"caa1",
			"吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
		],
		[
			"cb40",
			"杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
		],
		[
			"cba1",
			"芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
		],
		[
			"cc40",
			"坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
		],
		[
			"cca1",
			"怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
		],
		[
			"cd40",
			"泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
		],
		[
			"cda1",
			"矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
		],
		[
			"ce40",
			"哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
		],
		[
			"cea1",
			"峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
		],
		[
			"cf40",
			"柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
		],
		[
			"cfa1",
			"洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
		],
		[
			"d040",
			"穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
		],
		[
			"d0a1",
			"苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
		],
		[
			"d140",
			"唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
		],
		[
			"d1a1",
			"恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
		],
		[
			"d240",
			"毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
		],
		[
			"d2a1",
			"牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
		],
		[
			"d340",
			"笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
		],
		[
			"d3a1",
			"荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
		],
		[
			"d440",
			"酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
		],
		[
			"d4a1",
			"唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
		],
		[
			"d540",
			"崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
		],
		[
			"d5a1",
			"捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
		],
		[
			"d640",
			"淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
		],
		[
			"d6a1",
			"痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
		],
		[
			"d740",
			"耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
		],
		[
			"d7a1",
			"蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
		],
		[
			"d840",
			"釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
		],
		[
			"d8a1",
			"堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
		],
		[
			"d940",
			"惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
		],
		[
			"d9a1",
			"晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
		],
		[
			"da40",
			"湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
		],
		[
			"daa1",
			"琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
		],
		[
			"db40",
			"罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
		],
		[
			"dba1",
			"菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
		],
		[
			"dc40",
			"軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
		],
		[
			"dca1",
			"隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
		],
		[
			"dd40",
			"媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
		],
		[
			"dda1",
			"搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
		],
		[
			"de40",
			"毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
		],
		[
			"dea1",
			"煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
		],
		[
			"df40",
			"稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
		],
		[
			"dfa1",
			"腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
		],
		[
			"e040",
			"觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
		],
		[
			"e0a1",
			"遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
		],
		[
			"e140",
			"凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
		],
		[
			"e1a1",
			"寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
		],
		[
			"e240",
			"榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
		],
		[
			"e2a1",
			"漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
		],
		[
			"e340",
			"禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
		],
		[
			"e3a1",
			"耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
		],
		[
			"e440",
			"裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
		],
		[
			"e4a1",
			"銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
		],
		[
			"e540",
			"噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
		],
		[
			"e5a1",
			"憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
		],
		[
			"e640",
			"澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
		],
		[
			"e6a1",
			"獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
		],
		[
			"e740",
			"膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
		],
		[
			"e7a1",
			"蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
		],
		[
			"e840",
			"踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
		],
		[
			"e8a1",
			"銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
		],
		[
			"e940",
			"噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
		],
		[
			"e9a1",
			"憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
		],
		[
			"ea40",
			"澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
		],
		[
			"eaa1",
			"瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
		],
		[
			"eb40",
			"蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
		],
		[
			"eba1",
			"諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
		],
		[
			"ec40",
			"錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
		],
		[
			"eca1",
			"魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
		],
		[
			"ed40",
			"檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
		],
		[
			"eda1",
			"瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
		],
		[
			"ee40",
			"蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
		],
		[
			"eea1",
			"謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
		],
		[
			"ef40",
			"鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
		],
		[
			"efa1",
			"鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
		],
		[
			"f040",
			"璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
		],
		[
			"f0a1",
			"臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
		],
		[
			"f140",
			"蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
		],
		[
			"f1a1",
			"鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
		],
		[
			"f240",
			"徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
		],
		[
			"f2a1",
			"礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
		],
		[
			"f340",
			"譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
		],
		[
			"f3a1",
			"鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
		],
		[
			"f440",
			"嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
		],
		[
			"f4a1",
			"禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
		],
		[
			"f540",
			"鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
		],
		[
			"f5a1",
			"鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
		],
		[
			"f640",
			"蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
		],
		[
			"f6a1",
			"騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
		],
		[
			"f740",
			"糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
		],
		[
			"f7a1",
			"驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
		],
		[
			"f840",
			"讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
		],
		[
			"f8a1",
			"齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
		],
		[
			"f940",
			"纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
		],
		[
			"f9a1",
			"龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
		]
	];

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = [
		[
			"8740",
			"䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
		],
		[
			"8767",
			"綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
		],
		[
			"87a1",
			"𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
		],
		[
			"8840",
			"㇀",
			4,
			"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
		],
		[
			"88a1",
			"ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
		],
		[
			"8940",
			"𪎩𡅅"
		],
		[
			"8943",
			"攊"
		],
		[
			"8946",
			"丽滝鵎釟"
		],
		[
			"894c",
			"𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
		],
		[
			"89a1",
			"琑糼緍楆竉刧"
		],
		[
			"89ab",
			"醌碸酞肼"
		],
		[
			"89b0",
			"贋胶𠧧"
		],
		[
			"89b5",
			"肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
		],
		[
			"89c1",
			"溚舾甙"
		],
		[
			"89c5",
			"䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
		],
		[
			"8a40",
			"𧶄唥"
		],
		[
			"8a43",
			"𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
		],
		[
			"8a64",
			"𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
		],
		[
			"8a76",
			"䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
		],
		[
			"8aa1",
			"𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
		],
		[
			"8aac",
			"䠋𠆩㿺塳𢶍"
		],
		[
			"8ab2",
			"𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
		],
		[
			"8abb",
			"䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
		],
		[
			"8ac9",
			"𪘁𠸉𢫏𢳉"
		],
		[
			"8ace",
			"𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
		],
		[
			"8adf",
			"𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
		],
		[
			"8af6",
			"𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
		],
		[
			"8b40",
			"𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
		],
		[
			"8b55",
			"𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
		],
		[
			"8ba1",
			"𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
		],
		[
			"8bde",
			"𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
		],
		[
			"8c40",
			"倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
		],
		[
			"8ca1",
			"𣏹椙橃𣱣泿"
		],
		[
			"8ca7",
			"爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
		],
		[
			"8cc9",
			"顨杫䉶圽"
		],
		[
			"8cce",
			"藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
		],
		[
			"8ce6",
			"峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
		],
		[
			"8d40",
			"𠮟"
		],
		[
			"8d42",
			"𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
		],
		[
			"8da1",
			"㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
		],
		[
			"8e40",
			"𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
		],
		[
			"8ea1",
			"繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
		],
		[
			"8f40",
			"蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
		],
		[
			"8fa1",
			"𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
		],
		[
			"9040",
			"趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
		],
		[
			"90a1",
			"𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
		],
		[
			"9140",
			"𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
		],
		[
			"91a1",
			"鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
		],
		[
			"9240",
			"𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
		],
		[
			"92a1",
			"働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
		],
		[
			"9340",
			"媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
		],
		[
			"93a1",
			"摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
		],
		[
			"9440",
			"銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
		],
		[
			"94a1",
			"㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
		],
		[
			"9540",
			"𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
		],
		[
			"95a1",
			"衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
		],
		[
			"9640",
			"桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
		],
		[
			"96a1",
			"𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
		],
		[
			"9740",
			"愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
		],
		[
			"97a1",
			"𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
		],
		[
			"9840",
			"𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
		],
		[
			"98a1",
			"咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
		],
		[
			"9940",
			"䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
		],
		[
			"99a1",
			"䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
		],
		[
			"9a40",
			"鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
		],
		[
			"9aa1",
			"黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
		],
		[
			"9b40",
			"𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
		],
		[
			"9b62",
			"𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
		],
		[
			"9ba1",
			"椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
		],
		[
			"9c40",
			"嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
		],
		[
			"9ca1",
			"㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
		],
		[
			"9d40",
			"𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
		],
		[
			"9da1",
			"辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
		],
		[
			"9e40",
			"𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
		],
		[
			"9ea1",
			"鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
		],
		[
			"9ead",
			"𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
		],
		[
			"9ec5",
			"㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
		],
		[
			"9ef5",
			"噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
		],
		[
			"9f40",
			"籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
		],
		[
			"9f4f",
			"凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
		],
		[
			"9fa1",
			"椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
		],
		[
			"9fae",
			"酙隁酜"
		],
		[
			"9fb2",
			"酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
		],
		[
			"9fc1",
			"𤤙盖鮝个𠳔莾衂"
		],
		[
			"9fc9",
			"届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
		],
		[
			"9fdb",
			"歒酼龥鮗頮颴骺麨麄煺笔"
		],
		[
			"9fe7",
			"毺蠘罸"
		],
		[
			"9feb",
			"嘠𪙊蹷齓"
		],
		[
			"9ff0",
			"跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
		],
		[
			"a040",
			"𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
		],
		[
			"a055",
			"𡠻𦸅"
		],
		[
			"a058",
			"詾𢔛"
		],
		[
			"a05b",
			"惽癧髗鵄鍮鮏蟵"
		],
		[
			"a063",
			"蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
		],
		[
			"a073",
			"坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
		],
		[
			"a0a1",
			"嵗𨯂迚𨸹"
		],
		[
			"a0a6",
			"僙𡵆礆匲阸𠼻䁥"
		],
		[
			"a0ae",
			"矾"
		],
		[
			"a0b0",
			"糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
		],
		[
			"a0d4",
			"覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
		],
		[
			"a0e2",
			"罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
		],
		[
			"a3c0",
			"␀",
			31,
			"␡"
		],
		[
			"c6a1",
			"①",
			9,
			"⑴",
			9,
			"ⅰ",
			9,
			"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
			23
		],
		[
			"c740",
			"す",
			58,
			"ァアィイ"
		],
		[
			"c7a1",
			"ゥ",
			81,
			"А",
			5,
			"ЁЖ",
			4
		],
		[
			"c840",
			"Л",
			26,
			"ёж",
			25,
			"⇧↸↹㇏𠃌乚𠂊刂䒑"
		],
		[
			"c8a1",
			"龰冈龱𧘇"
		],
		[
			"c8cd",
			"￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
		],
		[
			"c8f5",
			"ʃɐɛɔɵœøŋʊɪ"
		],
		[
			"f9fe",
			"￭"
		],
		[
			"fa40",
			"𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
		],
		[
			"faa1",
			"鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
		],
		[
			"fb40",
			"𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
		],
		[
			"fba1",
			"𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
		],
		[
			"fc40",
			"廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
		],
		[
			"fca1",
			"𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
		],
		[
			"fd40",
			"𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
		],
		[
			"fda1",
			"𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
		],
		[
			"fe40",
			"鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
		],
		[
			"fea1",
			"𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
		]
	];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Transform = __webpack_require__(24).Transform;


	// == Exports ==================================================================
	module.exports = function(iconv) {
	    
	    // Additional Public API.
	    iconv.encodeStream = function encodeStream(encoding, options) {
	        return new IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
	    }

	    iconv.decodeStream = function decodeStream(encoding, options) {
	        return new IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
	    }

	    iconv.supportsStreams = true;


	    // Not published yet.
	    iconv.IconvLiteEncoderStream = IconvLiteEncoderStream;
	    iconv.IconvLiteDecoderStream = IconvLiteDecoderStream;
	    iconv._collect = IconvLiteDecoderStream.prototype.collect;
	};


	// == Encoder stream =======================================================
	function IconvLiteEncoderStream(conv, options) {
	    this.conv = conv;
	    options = options || {};
	    options.decodeStrings = false; // We accept only strings, so we don't need to decode them.
	    Transform.call(this, options);
	}

	IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
	    constructor: { value: IconvLiteEncoderStream }
	});

	IconvLiteEncoderStream.prototype._transform = function(chunk, encoding, done) {
	    if (typeof chunk != 'string')
	        return done(new Error("Iconv encoding stream needs strings as its input."));
	    try {
	        var res = this.conv.write(chunk);
	        if (res && res.length) this.push(res);
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}

	IconvLiteEncoderStream.prototype._flush = function(done) {
	    try {
	        var res = this.conv.end();
	        if (res && res.length) this.push(res);
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}

	IconvLiteEncoderStream.prototype.collect = function(cb) {
	    var chunks = [];
	    this.on('error', cb);
	    this.on('data', function(chunk) { chunks.push(chunk); });
	    this.on('end', function() {
	        cb(null, Buffer.concat(chunks));
	    });
	    return this;
	}


	// == Decoder stream =======================================================
	function IconvLiteDecoderStream(conv, options) {
	    this.conv = conv;
	    options = options || {};
	    options.encoding = this.encoding = 'utf8'; // We output strings.
	    Transform.call(this, options);
	}

	IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
	    constructor: { value: IconvLiteDecoderStream }
	});

	IconvLiteDecoderStream.prototype._transform = function(chunk, encoding, done) {
	    if (!Buffer.isBuffer(chunk))
	        return done(new Error("Iconv decoding stream needs buffers as its input."));
	    try {
	        var res = this.conv.write(chunk);
	        if (res && res.length) this.push(res, this.encoding);
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}

	IconvLiteDecoderStream.prototype._flush = function(done) {
	    try {
	        var res = this.conv.end();
	        if (res && res.length) this.push(res, this.encoding);                
	        done();
	    }
	    catch (e) {
	        done(e);
	    }
	}

	IconvLiteDecoderStream.prototype.collect = function(cb) {
	    var res = '';
	    this.on('error', cb);
	    this.on('data', function(chunk) { res += chunk; });
	    this.on('end', function() {
	        cb(null, res);
	    });
	    return this;
	}



/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	// == Extend Node primitives to use iconv-lite =================================

	module.exports = function (iconv) {
	    var original = undefined; // Place to keep original methods.

	    // Node authors rewrote Buffer internals to make it compatible with
	    // Uint8Array and we cannot patch key functions since then.
	    iconv.supportsNodeEncodingsExtension = !(new Buffer(0) instanceof Uint8Array);

	    iconv.extendNodeEncodings = function extendNodeEncodings() {
	        if (original) return;
	        original = {};

	        if (!iconv.supportsNodeEncodingsExtension) {
	            console.error("ACTION NEEDED: require('iconv-lite').extendNodeEncodings() is not supported in your version of Node");
	            console.error("See more info at https://github.com/ashtuchkin/iconv-lite/wiki/Node-v4-compatibility");
	            return;
	        }

	        var nodeNativeEncodings = {
	            'hex': true, 'utf8': true, 'utf-8': true, 'ascii': true, 'binary': true, 
	            'base64': true, 'ucs2': true, 'ucs-2': true, 'utf16le': true, 'utf-16le': true,
	        };

	        Buffer.isNativeEncoding = function(enc) {
	            return enc && nodeNativeEncodings[enc.toLowerCase()];
	        }

	        // -- SlowBuffer -----------------------------------------------------------
	        var SlowBuffer = __webpack_require__(3).SlowBuffer;

	        original.SlowBufferToString = SlowBuffer.prototype.toString;
	        SlowBuffer.prototype.toString = function(encoding, start, end) {
	            encoding = String(encoding || 'utf8').toLowerCase();

	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.SlowBufferToString.call(this, encoding, start, end);

	            // Otherwise, use our decoding method.
	            if (typeof start == 'undefined') start = 0;
	            if (typeof end == 'undefined') end = this.length;
	            return iconv.decode(this.slice(start, end), encoding);
	        }

	        original.SlowBufferWrite = SlowBuffer.prototype.write;
	        SlowBuffer.prototype.write = function(string, offset, length, encoding) {
	            // Support both (string, offset, length, encoding)
	            // and the legacy (string, encoding, offset, length)
	            if (isFinite(offset)) {
	                if (!isFinite(length)) {
	                    encoding = length;
	                    length = undefined;
	                }
	            } else {  // legacy
	                var swap = encoding;
	                encoding = offset;
	                offset = length;
	                length = swap;
	            }

	            offset = +offset || 0;
	            var remaining = this.length - offset;
	            if (!length) {
	                length = remaining;
	            } else {
	                length = +length;
	                if (length > remaining) {
	                    length = remaining;
	                }
	            }
	            encoding = String(encoding || 'utf8').toLowerCase();

	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.SlowBufferWrite.call(this, string, offset, length, encoding);

	            if (string.length > 0 && (length < 0 || offset < 0))
	                throw new RangeError('attempt to write beyond buffer bounds');

	            // Otherwise, use our encoding method.
	            var buf = iconv.encode(string, encoding);
	            if (buf.length < length) length = buf.length;
	            buf.copy(this, offset, 0, length);
	            return length;
	        }

	        // -- Buffer ---------------------------------------------------------------

	        original.BufferIsEncoding = Buffer.isEncoding;
	        Buffer.isEncoding = function(encoding) {
	            return Buffer.isNativeEncoding(encoding) || iconv.encodingExists(encoding);
	        }

	        original.BufferByteLength = Buffer.byteLength;
	        Buffer.byteLength = SlowBuffer.byteLength = function(str, encoding) {
	            encoding = String(encoding || 'utf8').toLowerCase();

	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.BufferByteLength.call(this, str, encoding);

	            // Slow, I know, but we don't have a better way yet.
	            return iconv.encode(str, encoding).length;
	        }

	        original.BufferToString = Buffer.prototype.toString;
	        Buffer.prototype.toString = function(encoding, start, end) {
	            encoding = String(encoding || 'utf8').toLowerCase();

	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.BufferToString.call(this, encoding, start, end);

	            // Otherwise, use our decoding method.
	            if (typeof start == 'undefined') start = 0;
	            if (typeof end == 'undefined') end = this.length;
	            return iconv.decode(this.slice(start, end), encoding);
	        }

	        original.BufferWrite = Buffer.prototype.write;
	        Buffer.prototype.write = function(string, offset, length, encoding) {
	            var _offset = offset, _length = length, _encoding = encoding;
	            // Support both (string, offset, length, encoding)
	            // and the legacy (string, encoding, offset, length)
	            if (isFinite(offset)) {
	                if (!isFinite(length)) {
	                    encoding = length;
	                    length = undefined;
	                }
	            } else {  // legacy
	                var swap = encoding;
	                encoding = offset;
	                offset = length;
	                length = swap;
	            }

	            encoding = String(encoding || 'utf8').toLowerCase();

	            // Use native conversion when possible
	            if (Buffer.isNativeEncoding(encoding))
	                return original.BufferWrite.call(this, string, _offset, _length, _encoding);

	            offset = +offset || 0;
	            var remaining = this.length - offset;
	            if (!length) {
	                length = remaining;
	            } else {
	                length = +length;
	                if (length > remaining) {
	                    length = remaining;
	                }
	            }

	            if (string.length > 0 && (length < 0 || offset < 0))
	                throw new RangeError('attempt to write beyond buffer bounds');

	            // Otherwise, use our encoding method.
	            var buf = iconv.encode(string, encoding);
	            if (buf.length < length) length = buf.length;
	            buf.copy(this, offset, 0, length);
	            return length;

	            // TODO: Set _charsWritten.
	        }


	        // -- Readable -------------------------------------------------------------
	        if (iconv.supportsStreams) {
	            var Readable = __webpack_require__(24).Readable;

	            original.ReadableSetEncoding = Readable.prototype.setEncoding;
	            Readable.prototype.setEncoding = function setEncoding(enc, options) {
	                // Use our own decoder, it has the same interface.
	                // We cannot use original function as it doesn't handle BOM-s.
	                this._readableState.decoder = iconv.getDecoder(enc, options);
	                this._readableState.encoding = enc;
	            }

	            Readable.prototype.collect = iconv._collect;
	        }
	    }

	    // Remove iconv-lite Node primitive extensions.
	    iconv.undoExtendNodeEncodings = function undoExtendNodeEncodings() {
	        if (!iconv.supportsNodeEncodingsExtension)
	            return;
	        if (!original)
	            throw new Error("require('iconv-lite').undoExtendNodeEncodings(): Nothing to undo; extendNodeEncodings() is not called.")

	        delete Buffer.isNativeEncoding;

	        var SlowBuffer = __webpack_require__(3).SlowBuffer;

	        SlowBuffer.prototype.toString = original.SlowBufferToString;
	        SlowBuffer.prototype.write = original.SlowBufferWrite;

	        Buffer.isEncoding = original.BufferIsEncoding;
	        Buffer.byteLength = original.BufferByteLength;
	        Buffer.prototype.toString = original.BufferToString;
	        Buffer.prototype.write = original.BufferWrite;

	        if (iconv.supportsStreams) {
	            var Readable = __webpack_require__(24).Readable;

	            Readable.prototype.setEncoding = original.ReadableSetEncoding;
	            delete Readable.prototype.collect;
	        }

	        original = undefined;
	    }
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var iconv_package;
	var Iconv;

	try {
	    // this is to fool browserify so it doesn't try (in vain) to install iconv.
	    iconv_package = 'iconv';
	    Iconv = __webpack_require__(50)(iconv_package).Iconv;
	} catch (E) {
	    // node-iconv not present
	}

	module.exports = Iconv;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./encoding": 26,
		"./encoding.js": 26,
		"./iconv-loader": 49,
		"./iconv-loader.js": 49
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 50;


/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	var isStream = module.exports = function (stream) {
		return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
	};

	isStream.writable = function (stream) {
		return isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
	};

	isStream.readable = function (stream) {
		return isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
	};

	isStream.duplex = function (stream) {
		return isStream.writable(stream) && isStream.readable(stream);
	};

	isStream.transform = function (stream) {
		return isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * fetch-error.js
	 *
	 * FetchError interface for operational errors
	 */

	module.exports = FetchError;

	/**
	 * Create FetchError instance
	 *
	 * @param   String      message      Error message for human
	 * @param   String      type         Error type for machine
	 * @param   String      systemError  For Node.js system error
	 * @return  FetchError
	 */
	function FetchError(message, type, systemError) {

		// hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;
		this.message = message;
		this.type = type;

		// when err.type is `system`, err.code contains system error code
		if (systemError) {
			this.code = this.errno = systemError.code;
		}

	}

	__webpack_require__(9).inherits(FetchError, Error);


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * response.js
	 *
	 * Response class provides content decoding
	 */

	var http = __webpack_require__(21);
	var Headers = __webpack_require__(54);
	var Body = __webpack_require__(25);

	module.exports = Response;

	/**
	 * Response class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	function Response(body, opts) {

		opts = opts || {};

		this.url = opts.url;
		this.status = opts.status || 200;
		this.statusText = opts.statusText || http.STATUS_CODES[this.status];
		this.headers = new Headers(opts.headers);
		this.ok = this.status >= 200 && this.status < 300;

		Body.call(this, body, opts);

	}

	Response.prototype = Object.create(Body.prototype);

	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	Response.prototype.clone = function() {
		return new Response(this._clone(this), {
			url: this.url
			, status: this.status
			, statusText: this.statusText
			, headers: this.headers
			, ok: this.ok
		});
	};


/***/ },
/* 54 */
/***/ function(module, exports) {

	
	/**
	 * headers.js
	 *
	 * Headers class offers convenient helpers
	 */

	module.exports = Headers;

	/**
	 * Headers class
	 *
	 * @param   Object  headers  Response headers
	 * @return  Void
	 */
	function Headers(headers) {

		var self = this;
		this._headers = {};

		// Headers
		if (headers instanceof Headers) {
			headers = headers.raw();
		}

		// plain object
		for (var prop in headers) {
			if (!headers.hasOwnProperty(prop)) {
				continue;
			}

			if (typeof headers[prop] === 'string') {
				this.set(prop, headers[prop]);

			} else if (typeof headers[prop] === 'number' && !isNaN(headers[prop])) {
				this.set(prop, headers[prop].toString());

			} else if (headers[prop] instanceof Array) {
				headers[prop].forEach(function(item) {
					self.append(prop, item.toString());
				});
			}
		}

	}

	/**
	 * Return first header value given name
	 *
	 * @param   String  name  Header name
	 * @return  Mixed
	 */
	Headers.prototype.get = function(name) {
		var list = this._headers[name.toLowerCase()];
		return list ? list[0] : null;
	};

	/**
	 * Return all header values given name
	 *
	 * @param   String  name  Header name
	 * @return  Array
	 */
	Headers.prototype.getAll = function(name) {
		if (!this.has(name)) {
			return [];
		}

		return this._headers[name.toLowerCase()];
	};

	/**
	 * Iterate over all headers
	 *
	 * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
	 * @param   Boolean   thisArg   `this` context for callback function
	 * @return  Void
	 */
	Headers.prototype.forEach = function(callback, thisArg) {
		Object.getOwnPropertyNames(this._headers).forEach(function(name) {
			this._headers[name].forEach(function(value) {
				callback.call(thisArg, value, name, this)
			}, this)
		}, this)
	}

	/**
	 * Overwrite header values given name
	 *
	 * @param   String  name   Header name
	 * @param   String  value  Header value
	 * @return  Void
	 */
	Headers.prototype.set = function(name, value) {
		this._headers[name.toLowerCase()] = [value];
	};

	/**
	 * Append a value onto existing header
	 *
	 * @param   String  name   Header name
	 * @param   String  value  Header value
	 * @return  Void
	 */
	Headers.prototype.append = function(name, value) {
		if (!this.has(name)) {
			this.set(name, value);
			return;
		}

		this._headers[name.toLowerCase()].push(value);
	};

	/**
	 * Check for header name existence
	 *
	 * @param   String   name  Header name
	 * @return  Boolean
	 */
	Headers.prototype.has = function(name) {
		return this._headers.hasOwnProperty(name.toLowerCase());
	};

	/**
	 * Delete all header values given name
	 *
	 * @param   String  name  Header name
	 * @return  Void
	 */
	Headers.prototype['delete'] = function(name) {
		delete this._headers[name.toLowerCase()];
	};

	/**
	 * Return raw headers (non-spec api)
	 *
	 * @return  Object
	 */
	Headers.prototype.raw = function() {
		return this._headers;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * request.js
	 *
	 * Request class contains server only options
	 */

	var parse_url = __webpack_require__(18).parse;
	var Headers = __webpack_require__(54);
	var Body = __webpack_require__(25);

	module.exports = Request;

	/**
	 * Request class
	 *
	 * @param   Mixed   input  Url or Request instance
	 * @param   Object  init   Custom options
	 * @return  Void
	 */
	function Request(input, init) {
		var url, url_parsed;

		// normalize input
		if (!(input instanceof Request)) {
			url = input;
			url_parsed = parse_url(url);
			input = {};
		} else {
			url = input.url;
			url_parsed = parse_url(url);
		}

		// normalize init
		init = init || {};

		// fetch spec options
		this.method = init.method || input.method || 'GET';
		this.redirect = init.redirect || input.redirect || 'follow';
		this.headers = new Headers(init.headers || input.headers || {});
		this.url = url;

		// server only options
		this.follow = init.follow !== undefined ?
			init.follow : input.follow !== undefined ?
			input.follow : 20;
		this.compress = init.compress !== undefined ?
			init.compress : input.compress !== undefined ?
			input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;

		Body.call(this, init.body || this._clone(input), {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		// server request options
		this.protocol = url_parsed.protocol;
		this.hostname = url_parsed.hostname;
		this.port = url_parsed.port;
		this.path = url_parsed.path;
		this.auth = url_parsed.auth;
	}

	Request.prototype = Object.create(Body.prototype);

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	Request.prototype.clone = function() {
		return new Request(this);
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, events, fs, path, writeSync,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  path = __webpack_require__(57);

	  fs = __webpack_require__(58);

	  events = __webpack_require__(59);

	  writeSync = __webpack_require__(60).sync;

	  KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---';

	  _emptyDirectory = function(target) {
	    var i, len, p, ref, results;
	    ref = fs.readdirSync(target);
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      p = ref[i];
	      results.push(_rm(path.join(target, p)));
	    }
	    return results;
	  };

	  _rm = function(target) {
	    if (fs.statSync(target).isDirectory()) {
	      _emptyDirectory(target);
	      return fs.rmdirSync(target);
	    } else {
	      return fs.unlinkSync(target);
	    }
	  };

	  _escapeKey = function(key) {
	    var newKey;
	    if (key === '') {
	      newKey = KEY_FOR_EMPTY_STRING;
	    } else {
	      newKey = key.toString();
	    }
	    return newKey;
	  };

	  QUOTA_EXCEEDED_ERR = (function(superClass) {
	    extend(QUOTA_EXCEEDED_ERR, superClass);

	    function QUOTA_EXCEEDED_ERR(message) {
	      this.message = message != null ? message : 'Unknown error.';
	      if (Error.captureStackTrace != null) {
	        Error.captureStackTrace(this, this.constructor);
	      }
	      this.name = this.constructor.name;
	    }

	    QUOTA_EXCEEDED_ERR.prototype.toString = function() {
	      return this.name + ": " + this.message;
	    };

	    return QUOTA_EXCEEDED_ERR;

	  })(Error);

	  StorageEvent = (function() {
	    function StorageEvent(key1, oldValue1, newValue1, url, storageArea) {
	      this.key = key1;
	      this.oldValue = oldValue1;
	      this.newValue = newValue1;
	      this.url = url;
	      this.storageArea = storageArea != null ? storageArea : 'localStorage';
	    }

	    return StorageEvent;

	  })();

	  MetaKey = (function() {
	    function MetaKey(key1, index1) {
	      this.key = key1;
	      this.index = index1;
	      if (!(this instanceof MetaKey)) {
	        return new MetaKey(this.key, this.index);
	      }
	    }

	    return MetaKey;

	  })();

	  createMap = function() {
	    var Map;
	    Map = function() {};
	    Map.prototype = Object.create(null);
	    return new Map();
	  };

	  LocalStorage = (function(superClass) {
	    var instanceMap;

	    extend(LocalStorage, superClass);

	    instanceMap = {};

	    function LocalStorage(_location, quota) {
	      this._location = _location;
	      this.quota = quota != null ? quota : 5 * 1024 * 1024;
	      if (!(this instanceof LocalStorage)) {
	        return new LocalStorage(this._location, this.quota);
	      }
	      this._location = path.resolve(this._location);
	      if (instanceMap[this._location] != null) {
	        return instanceMap[this._location];
	      }
	      this.length = 0;
	      this._bytesInUse = 0;
	      this._keys = [];
	      this._metaKeyMap = createMap();
	      this._eventUrl = "pid:" + process.pid;
	      this._init();
	      this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
	      instanceMap[this._location] = this;
	      return instanceMap[this._location];
	    }

	    LocalStorage.prototype._init = function() {
	      var _MetaKey, _decodedKey, _keys, error, i, index, k, len, stat;
	      try {
	        stat = fs.statSync(this._location);
	        if ((stat != null) && !stat.isDirectory()) {
	          throw new Error("A file exists at the location '" + this._location + "' when trying to create/open localStorage");
	        }
	        this._bytesInUse = 0;
	        this.length = 0;
	        _keys = fs.readdirSync(this._location);
	        for (index = i = 0, len = _keys.length; i < len; index = ++i) {
	          k = _keys[index];
	          _decodedKey = decodeURIComponent(k);
	          this._keys.push(_decodedKey);
	          _MetaKey = new MetaKey(k, index);
	          this._metaKeyMap[_decodedKey] = _MetaKey;
	          stat = this._getStat(k);
	          if ((stat != null ? stat.size : void 0) != null) {
	            _MetaKey.size = stat.size;
	            this._bytesInUse += stat.size;
	          }
	        }
	        this.length = _keys.length;
	      } catch (error) {
	        fs.mkdirSync(this._location);
	      }
	    };

	    LocalStorage.prototype.setItem = function(key, value) {
	      var encodedKey, evnt, existsBeforeSet, filename, hasListeners, metaKey, oldLength, oldValue, valueString, valueStringLength;
	      hasListeners = events.EventEmitter.listenerCount(this, 'storage');
	      oldValue = null;
	      if (hasListeners) {
	        oldValue = this.getItem(key);
	      }
	      key = _escapeKey(key);
	      encodedKey = encodeURIComponent(key);
	      filename = path.join(this._location, encodedKey);
	      valueString = value.toString();
	      valueStringLength = valueString.length;
	      metaKey = this._metaKeyMap[key];
	      existsBeforeSet = !!metaKey;
	      if (existsBeforeSet) {
	        oldLength = metaKey.size;
	      } else {
	        oldLength = 0;
	      }
	      if (this._bytesInUse - oldLength + valueStringLength > this.quota) {
	        throw new QUOTA_EXCEEDED_ERR();
	      }
	      writeSync(filename, valueString, 'utf8');
	      if (!existsBeforeSet) {
	        metaKey = new MetaKey(encodedKey, (this._keys.push(key)) - 1);
	        metaKey.size = valueStringLength;
	        this._metaKeyMap[key] = metaKey;
	        this.length += 1;
	        this._bytesInUse += valueStringLength;
	      }
	      if (hasListeners) {
	        evnt = new StorageEvent(key, oldValue, value, this._eventUrl);
	        return this.emit('storage', evnt);
	      }
	    };

	    LocalStorage.prototype.getItem = function(key) {
	      var filename, metaKey;
	      key = _escapeKey(key);
	      metaKey = this._metaKeyMap[key];
	      if (!!metaKey) {
	        filename = path.join(this._location, metaKey.key);
	        return fs.readFileSync(filename, 'utf8');
	      } else {
	        return null;
	      }
	    };

	    LocalStorage.prototype._getStat = function(key) {
	      var error, filename;
	      key = _escapeKey(key);
	      filename = path.join(this._location, encodeURIComponent(key));
	      try {
	        return fs.statSync(filename);
	      } catch (error) {
	        return null;
	      }
	    };

	    LocalStorage.prototype.removeItem = function(key) {
	      var evnt, filename, hasListeners, k, meta, metaKey, oldValue, ref, v;
	      key = _escapeKey(key);
	      metaKey = this._metaKeyMap[key];
	      if (!!metaKey) {
	        hasListeners = events.EventEmitter.listenerCount(this, 'storage');
	        oldValue = null;
	        if (hasListeners) {
	          oldValue = this.getItem(key);
	        }
	        delete this._metaKeyMap[key];
	        this.length -= 1;
	        this._bytesInUse -= metaKey.size;
	        filename = path.join(this._location, metaKey.key);
	        this._keys.splice(metaKey.index, 1);
	        ref = this._metaKeyMap;
	        for (k in ref) {
	          v = ref[k];
	          meta = this._metaKeyMap[k];
	          if (meta.index > metaKey.index) {
	            meta.index -= 1;
	          }
	        }
	        _rm(filename);
	        if (hasListeners) {
	          evnt = new StorageEvent(key, oldValue, null, this._eventUrl);
	          return this.emit('storage', evnt);
	        }
	      }
	    };

	    LocalStorage.prototype.key = function(n) {
	      return this._keys[n];
	    };

	    LocalStorage.prototype.clear = function() {
	      var evnt;
	      _emptyDirectory(this._location);
	      this._metaKeyMap = createMap();
	      this._keys = [];
	      this.length = 0;
	      this._bytesInUse = 0;
	      if (events.EventEmitter.listenerCount(this, 'storage')) {
	        evnt = new StorageEvent(null, null, null, this._eventUrl);
	        return this.emit('storage', evnt);
	      }
	    };

	    LocalStorage.prototype._getBytesInUse = function() {
	      return this._bytesInUse;
	    };

	    LocalStorage.prototype._deleteLocation = function() {
	      delete instanceMap[this._location];
	      _rm(this._location);
	      this._metaKeyMap = {};
	      this._keys = [];
	      this.length = 0;
	      return this._bytesInUse = 0;
	    };

	    return LocalStorage;

	  })(events.EventEmitter);

	  JSONStorage = (function(superClass) {
	    extend(JSONStorage, superClass);

	    function JSONStorage() {
	      return JSONStorage.__super__.constructor.apply(this, arguments);
	    }

	    JSONStorage.prototype.setItem = function(key, value) {
	      var newValue;
	      newValue = JSON.stringify(value);
	      return JSONStorage.__super__.setItem.call(this, key, newValue);
	    };

	    JSONStorage.prototype.getItem = function(key) {
	      return JSON.parse(JSONStorage.__super__.getItem.call(this, key));
	    };

	    return JSONStorage;

	  })(LocalStorage);

	  exports.LocalStorage = LocalStorage;

	  exports.JSONStorage = JSONStorage;

	  exports.QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;

	}).call(this);


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict'
	module.exports = writeFile
	module.exports.sync = writeFileSync
	module.exports._getTmpname = getTmpname // for testing

	var fs = __webpack_require__(61)
	var chain = __webpack_require__(67).chain
	var MurmurHash3 = __webpack_require__(71)
	var extend = Object.assign || __webpack_require__(9)._extend

	var invocations = 0
	function getTmpname (filename) {
	  return filename + '.' +
	    MurmurHash3(__filename)
	      .hash(String(process.pid))
	      .hash(String(++invocations))
	      .result()
	}

	function writeFile (filename, data, options, callback) {
	  if (options instanceof Function) {
	    callback = options
	    options = null
	  }
	  if (!options) options = {}
	  fs.realpath(filename, function (_, realname) {
	    _writeFile(realname || filename, data, options, callback)
	  })
	}
	function _writeFile (filename, data, options, callback) {
	  var tmpfile = getTmpname(filename)

	  if (options.mode && options.chown) {
	    return thenWriteFile()
	  } else {
	    // Either mode or chown is not explicitly set
	    // Default behavior is to copy it from original file
	    return fs.stat(filename, function (err, stats) {
	      if (err || !stats) return thenWriteFile()

	      options = extend({}, options)
	      if (!options.mode) {
	        options.mode = stats.mode
	      }
	      if (!options.chown && process.getuid) {
	        options.chown = { uid: stats.uid, gid: stats.gid }
	      }
	      return thenWriteFile()
	    })
	  }

	  function thenWriteFile () {
	    chain([
	      [fs, fs.writeFile, tmpfile, data, options.encoding || 'utf8'],
	      options.mode && [fs, fs.chmod, tmpfile, options.mode],
	      options.chown && [fs, fs.chown, tmpfile, options.chown.uid, options.chown.gid],
	      [fs, fs.rename, tmpfile, filename]
	    ], function (err) {
	      err ? fs.unlink(tmpfile, function () { callback(err) })
	        : callback()
	    })
	  }
	}

	function writeFileSync (filename, data, options) {
	  if (!options) options = {}
	  try {
	    filename = fs.realpathSync(filename)
	  } catch (ex) {
	    // it's ok, it'll happen on a not yet existing file
	  }
	  var tmpfile = getTmpname(filename)

	  try {
	    if (!options.mode || !options.chown) {
	      // Either mode or chown is not explicitly set
	      // Default behavior is to copy it from original file
	      try {
	        var stats = fs.statSync(filename)
	        options = extend({}, options)
	        if (!options.mode) {
	          options.mode = stats.mode
	        }
	        if (!options.chown && process.getuid) {
	          options.chown = { uid: stats.uid, gid: stats.gid }
	        }
	      } catch (ex) {
	        // ignore stat errors
	      }
	    }

	    fs.writeFileSync(tmpfile, data, options.encoding || 'utf8')
	    if (options.chown) fs.chownSync(tmpfile, options.chown.uid, options.chown.gid)
	    if (options.mode) fs.chmodSync(tmpfile, options.mode)
	    fs.renameSync(tmpfile, filename)
	  } catch (err) {
	    try { fs.unlinkSync(tmpfile) } catch (e) {}
	    throw err
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(58)
	var polyfills = __webpack_require__(62)
	var legacy = __webpack_require__(65)
	var queue = []

	var util = __webpack_require__(9)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs4')
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
	    console.error(m)
	  }

	if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug(queue)
	    __webpack_require__(66).equal(queue.length, 0)
	  })
	}

	module.exports = patch(__webpack_require__(63))
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
	  module.exports = patch(fs)
	}

	// Always patch fs.close/closeSync, because we want to
	// retry() whenever a close happens *anywhere* in the program.
	// This is essential when multiple graceful-fs instances are
	// in play at the same time.
	module.exports.close =
	fs.close = (function (fs$close) { return function (fd, cb) {
	  return fs$close.call(fs, fd, function (err) {
	    if (!err)
	      retry()

	    if (typeof cb === 'function')
	      cb.apply(this, arguments)
	  })
	}})(fs.close)

	module.exports.closeSync =
	fs.closeSync = (function (fs$closeSync) { return function (fd) {
	  // Note that graceful-fs also retries when fs.closeSync() fails.
	  // Looks like a bug to me, although it's probably a harmless one.
	  var rval = fs$closeSync.apply(fs, arguments)
	  retry()
	  return rval
	}})(fs.closeSync)

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs)
	  fs.gracefulify = patch
	  fs.FileReadStream = ReadStream;  // Legacy name.
	  fs.FileWriteStream = WriteStream;  // Legacy name.
	  fs.createReadStream = createReadStream
	  fs.createWriteStream = createWriteStream
	  var fs$readFile = fs.readFile
	  fs.readFile = readFile
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile
	  fs.writeFile = writeFile
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile
	  if (fs$appendFile)
	    fs.appendFile = appendFile
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir
	  fs.readdir = readdir
	  function readdir (path, options, cb) {
	    var args = [path]
	    if (typeof options !== 'function') {
	      args.push(options)
	    } else {
	      cb = options
	    }
	    args.push(go$readdir$cb)

	    return go$readdir(args)

	    function go$readdir$cb (err, files) {
	      if (files && files.sort)
	        files.sort()

	      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	        enqueue([go$readdir, [args]])
	      else {
	        if (typeof cb === 'function')
	          cb.apply(this, arguments)
	        retry()
	      }
	    }
	  }

	  function go$readdir (args) {
	    return fs$readdir.apply(fs, args)
	  }

	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs)
	    ReadStream = legStreams.ReadStream
	    WriteStream = legStreams.WriteStream
	  }

	  var fs$ReadStream = fs.ReadStream
	  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
	  ReadStream.prototype.open = ReadStream$open

	  var fs$WriteStream = fs.WriteStream
	  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
	  WriteStream.prototype.open = WriteStream$open

	  fs.ReadStream = ReadStream
	  fs.WriteStream = WriteStream

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy()

	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	        that.read()
	      }
	    })
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy()
	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	      }
	    })
	  }

	  function createReadStream (path, options) {
	    return new ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new WriteStream(path, options)
	  }

	  var fs$open = fs.open
	  fs.open = open
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1])
	  queue.push(elem)
	}

	function retry () {
	  var elem = queue.shift()
	  if (elem) {
	    debug('RETRY', elem[0].name, elem[1])
	    elem[0].apply(null, elem[1])
	  }
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(63)
	var constants = __webpack_require__(64)

	var origCwd = process.cwd
	var cwd = null

	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	try {
	  process.cwd()
	} catch (er) {}

	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	module.exports = patch

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs)
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs)
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown)
	  fs.fchown = chownFix(fs.fchown)
	  fs.lchown = chownFix(fs.lchown)

	  fs.chmod = chmodFix(fs.chmod)
	  fs.fchmod = chmodFix(fs.fchmod)
	  fs.lchmod = chmodFix(fs.lchmod)

	  fs.chownSync = chownFixSync(fs.chownSync)
	  fs.fchownSync = chownFixSync(fs.fchownSync)
	  fs.lchownSync = chownFixSync(fs.lchownSync)

	  fs.chmodSync = chmodFixSync(fs.chmodSync)
	  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
	  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

	  fs.stat = statFix(fs.stat)
	  fs.fstat = statFix(fs.fstat)
	  fs.lstat = statFix(fs.lstat)

	  fs.statSync = statFixSync(fs.statSync)
	  fs.fstatSync = statFixSync(fs.fstatSync)
	  fs.lstatSync = statFixSync(fs.lstatSync)

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (!fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchmodSync = function () {}
	  }
	  if (!fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchownSync = function () {}
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 60 seconds.

	  // Set the timeout this long because some Windows Anti-Virus, such as Parity
	  // bit9, may lock files for up to a minute, causing npm package install
	  // failures. Also, take care to yield the scheduler. Windows scheduling gives
	  // CPU to a busy looping process, which can cause the program causing the lock
	  // contention to be starved of CPU by node, so the contention doesn't resolve.
	  if (platform === "win32") {
	    fs.rename = (function (fs$rename) { return function (from, to, cb) {
	      var start = Date.now()
	      var backoff = 0;
	      fs$rename(from, to, function CB (er) {
	        if (er
	            && (er.code === "EACCES" || er.code === "EPERM")
	            && Date.now() - start < 60000) {
	          setTimeout(function() {
	            fs.stat(to, function (stater, st) {
	              if (stater && stater.code === "ENOENT")
	                fs$rename(from, to, CB);
	              else
	                cb(er)
	            })
	          }, backoff)
	          if (backoff < 100)
	            backoff += 10;
	          return;
	        }
	        if (cb) cb(er)
	      })
	    }})(fs.rename)
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
	    var callback
	    if (callback_ && typeof callback_ === 'function') {
	      var eagCounter = 0
	      callback = function (er, _, __) {
	        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	        }
	        callback_.apply(this, arguments)
	      }
	    }
	    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	  }})(fs.read)

	  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync)
	}

	function patchLchmod (fs) {
	  fs.lchmod = function (path, mode, callback) {
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        if (callback) callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          if (callback) callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var threw = true
	    var ret
	    try {
	      ret = fs.fchmodSync(fd, mode)
	      threw = false
	    } finally {
	      if (threw) {
	        try {
	          fs.closeSync(fd)
	        } catch (er) {}
	      } else {
	        fs.closeSync(fd)
	      }
	    }
	    return ret
	  }
	}

	function patchLutimes (fs) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        if (er) {
	          if (cb) cb(er)
	          return
	        }
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            if (cb) cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	      var ret
	      var threw = true
	      try {
	        ret = fs.futimesSync(fd, at, mt)
	        threw = false
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd)
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd)
	        }
	      }
	      return ret
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}

	function chmodFix (orig) {
	  if (!orig) return orig
	  return function (target, mode, cb) {
	    return orig.call(fs, target, mode, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chmodFixSync (orig) {
	  if (!orig) return orig
	  return function (target, mode) {
	    try {
	      return orig.call(fs, target, mode)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function statFix (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target, cb) {
	    return orig.call(fs, target, function (er, stats) {
	      if (!stats) return cb.apply(this, arguments)
	      if (stats.uid < 0) stats.uid += 0x100000000
	      if (stats.gid < 0) stats.gid += 0x100000000
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function statFixSync (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target) {
	    var stats = orig.call(fs, target)
	    if (stats.uid < 0) stats.uid += 0x100000000
	    if (stats.gid < 0) stats.gid += 0x100000000
	    return stats;
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(58)

	module.exports = clone(fs)

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: obj.__proto__ }
	  else
	    var copy = Object.create(null)

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
	  })

	  return copy
	}


/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("constants");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(24).Stream

	module.exports = legacy

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    })
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	exports.asyncMap = __webpack_require__(68)
	exports.bindActor = __webpack_require__(69)
	exports.chain = __webpack_require__(70)


/***/ },
/* 68 */
/***/ function(module, exports) {

	
	/*
	usage:

	// do something to a list of things
	asyncMap(myListOfStuff, function (thing, cb) { doSomething(thing.foo, cb) }, cb)
	// do more than one thing to each item
	asyncMap(list, fooFn, barFn, cb)

	*/

	module.exports = asyncMap

	function asyncMap () {
	  var steps = Array.prototype.slice.call(arguments)
	    , list = steps.shift() || []
	    , cb_ = steps.pop()
	  if (typeof cb_ !== "function") throw new Error(
	    "No callback provided to asyncMap")
	  if (!list) return cb_(null, [])
	  if (!Array.isArray(list)) list = [list]
	  var n = steps.length
	    , data = [] // 2d array
	    , errState = null
	    , l = list.length
	    , a = l * n
	  if (!a) return cb_(null, [])
	  function cb (er) {
	    if (er && !errState) errState = er

	    var argLen = arguments.length
	    for (var i = 1; i < argLen; i ++) if (arguments[i] !== undefined) {
	      data[i - 1] = (data[i - 1] || []).concat(arguments[i])
	    }
	    // see if any new things have been added.
	    if (list.length > l) {
	      var newList = list.slice(l)
	      a += (list.length - l) * n
	      l = list.length
	      process.nextTick(function () {
	        newList.forEach(function (ar) {
	          steps.forEach(function (fn) { fn(ar, cb) })
	        })
	      })
	    }

	    if (--a === 0) cb_.apply(null, [errState].concat(data))
	  }
	  // expect the supplied cb function to be called
	  // "n" times for each thing in the array.
	  list.forEach(function (ar) {
	    steps.forEach(function (fn) { fn(ar, cb) })
	  })
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = bindActor
	function bindActor () {
	  var args = 
	        Array.prototype.slice.call
	        (arguments) // jswtf.
	    , obj = null
	    , fn
	  if (typeof args[0] === "object") {
	    obj = args.shift()
	    fn = args.shift()
	    if (typeof fn === "string")
	      fn = obj[ fn ]
	  } else fn = args.shift()
	  return function (cb) {
	    fn.apply(obj, args.concat(cb)) }
	}


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = chain
	var bindActor = __webpack_require__(69)
	chain.first = {} ; chain.last = {}
	function chain (things, cb) {
	  var res = []
	  ;(function LOOP (i, len) {
	    if (i >= len) return cb(null,res)
	    if (Array.isArray(things[i]))
	      things[i] = bindActor.apply(null,
	        things[i].map(function(i){
	          return (i===chain.first) ? res[0]
	           : (i===chain.last)
	             ? res[res.length - 1] : i }))
	    if (!things[i]) return LOOP(i + 1, len)
	    things[i](function (er, data) {
	      if (er) return cb(er, res)
	      if (data !== undefined) res = res.concat(data)
	      LOOP(i + 1, len)
	    })
	  })(0, things.length) }


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @preserve
	 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
	 *
	 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
	 * @see http://github.com/homebrewing/brauhaus-diff
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	 * @see http://sites.google.com/site/murmurhash/
	 */
	(function(){
	    var cache;

	    // Call this function without `new` to use the cached object (good for
	    // single-threaded environments), or with `new` to create a new object.
	    //
	    // @param {string} key A UTF-16 or ASCII string
	    // @param {number} seed An optional positive integer
	    // @return {object} A MurmurHash3 object for incremental hashing
	    function MurmurHash3(key, seed) {
	        var m = this instanceof MurmurHash3 ? this : cache;
	        m.reset(seed)
	        if (typeof key === 'string' && key.length > 0) {
	            m.hash(key);
	        }

	        if (m !== this) {
	            return m;
	        }
	    };

	    // Incrementally add a string to this hash
	    //
	    // @param {string} key A UTF-16 or ASCII string
	    // @return {object} this
	    MurmurHash3.prototype.hash = function(key) {
	        var h1, k1, i, top, len;

	        len = key.length;
	        this.len += len;

	        k1 = this.k1;
	        i = 0;
	        switch (this.rem) {
	            case 0: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) : 0;
	            case 1: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 8 : 0;
	            case 2: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 16 : 0;
	            case 3:
	                k1 ^= len > i ? (key.charCodeAt(i) & 0xff) << 24 : 0;
	                k1 ^= len > i ? (key.charCodeAt(i++) & 0xff00) >> 8 : 0;
	        }

	        this.rem = (len + this.rem) & 3; // & 3 is same as % 4
	        len -= this.rem;
	        if (len > 0) {
	            h1 = this.h1;
	            while (1) {
	                k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
	                k1 = (k1 << 15) | (k1 >>> 17);
	                k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;

	                h1 ^= k1;
	                h1 = (h1 << 13) | (h1 >>> 19);
	                h1 = (h1 * 5 + 0xe6546b64) & 0xffffffff;

	                if (i >= len) {
	                    break;
	                }

	                k1 = ((key.charCodeAt(i++) & 0xffff)) ^
	                     ((key.charCodeAt(i++) & 0xffff) << 8) ^
	                     ((key.charCodeAt(i++) & 0xffff) << 16);
	                top = key.charCodeAt(i++);
	                k1 ^= ((top & 0xff) << 24) ^
	                      ((top & 0xff00) >> 8);
	            }

	            k1 = 0;
	            switch (this.rem) {
	                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xffff) << 16;
	                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xffff) << 8;
	                case 1: k1 ^= (key.charCodeAt(i) & 0xffff);
	            }

	            this.h1 = h1;
	        }

	        this.k1 = k1;
	        return this;
	    };

	    // Get the result of this hash
	    //
	    // @return {number} The 32-bit hash
	    MurmurHash3.prototype.result = function() {
	        var k1, h1;
	        
	        k1 = this.k1;
	        h1 = this.h1;

	        if (k1 > 0) {
	            k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
	            k1 = (k1 << 15) | (k1 >>> 17);
	            k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;
	            h1 ^= k1;
	        }

	        h1 ^= this.len;

	        h1 ^= h1 >>> 16;
	        h1 = (h1 * 0xca6b + (h1 & 0xffff) * 0x85eb0000) & 0xffffffff;
	        h1 ^= h1 >>> 13;
	        h1 = (h1 * 0xae35 + (h1 & 0xffff) * 0xc2b20000) & 0xffffffff;
	        h1 ^= h1 >>> 16;

	        return h1 >>> 0;
	    };

	    // Reset the hash object for reuse
	    //
	    // @param {number} seed An optional positive integer
	    MurmurHash3.prototype.reset = function(seed) {
	        this.h1 = typeof seed === 'number' ? seed : 0;
	        this.rem = this.k1 = this.len = 0;
	        return this;
	    };

	    // A cached object to use. This can be safely used if you're in a single-
	    // threaded environment, otherwise you need to create new hashes to use.
	    cache = new MurmurHash3();

	    if (true) {
	        module.exports = MurmurHash3;
	    } else {
	        this.MurmurHash3 = MurmurHash3;
	    }
	}());


/***/ }
/******/ ]);