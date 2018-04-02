(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define("react-keyboard-event-handler", ["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["react-keyboard-event-handler"] = factory(require("react"), require("prop-types"));
	else
		root["react-keyboard-event-handler"] = factory(root["react"], root["prop-types"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KeyboardEventHandler = __webpack_require__(1);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_KeyboardEventHandler).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keyEvents = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var exclusiveHandlers = [];

var KeyboardEventHandler = function (_React$Component) {
  _inherits(KeyboardEventHandler, _React$Component);

  function KeyboardEventHandler(props) {
    _classCallCheck(this, KeyboardEventHandler);

    var _this = _possibleConstructorReturn(this, (KeyboardEventHandler.__proto__ || Object.getPrototypeOf(KeyboardEventHandler)).call(this, props));

    _this.handleKeyboardEvent = _this.handleKeyboardEvent.bind(_this);
    _this.registerExclusiveHandler = _this.registerExclusiveHandler.bind(_this);
    _this.deregisterExclusiveHandler = _this.deregisterExclusiveHandler.bind(_this);
    return _this;
  }

  _createClass(KeyboardEventHandler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.handleKeyboardEvent, false);
      document.addEventListener('keyup', this.handleKeyboardEvent, false);
      document.addEventListener('keypress', this.handleKeyboardEvent, false);

      var _props = this.props,
          isExclusive = _props.isExclusive,
          isDisabled = _props.isDisabled;

      if (isExclusive && !isDisabled) {
        this.registerExclusiveHandler();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyboardEvent, false);
      document.removeEventListener('keyup', this.handleKeyboardEvent, false);
      document.removeEventListener('keypress', this.handleKeyboardEvent, false);

      this.deregisterExclusiveHandler();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isExclusive = nextProps.isExclusive,
          isDisabled = nextProps.isDisabled;

      var hasChanged = this.props.isExclusive !== isExclusive || this.props.isDisabled !== isDisabled;

      if (hasChanged) {
        if (isExclusive && !isDisabled) {
          this.registerExclusiveHandler();
        } else {
          this.deregisterExclusiveHandler();
        }
      }
    }
  }, {
    key: 'registerExclusiveHandler',
    value: function registerExclusiveHandler() {
      this.deregisterExclusiveHandler();
      exclusiveHandlers.unshift(this);
    }
  }, {
    key: 'deregisterExclusiveHandler',
    value: function deregisterExclusiveHandler() {
      var _this2 = this;

      if (exclusiveHandlers.includes(this)) {
        exclusiveHandlers = exclusiveHandlers.filter(function (h) {
          return h !== _this2;
        });
      }
    }
  }, {
    key: 'handleKeyboardEvent',
    value: function handleKeyboardEvent(event) {
      var _props2 = this.props,
          isDisabled = _props2.isDisabled,
          handleKeys = _props2.handleKeys,
          onKeyEvent = _props2.onKeyEvent,
          handleEventType = _props2.handleEventType,
          children = _props2.children,
          handleFocusableElements = _props2.handleFocusableElements;


      if (isDisabled) {
        return false;
      }

      var isEventTypeMatched = handleEventType === event.type;

      if (!isEventTypeMatched) {
        return false;
      }

      var exclusiveHandlerInPlace = exclusiveHandlers.length > 0;
      var isExcluded = exclusiveHandlerInPlace && exclusiveHandlers[0] !== this;

      if (isExcluded) {
        return false;
      }

      var isEligibleEvent = event.target === document.body || handleFocusableElements;
      var isChildrenEvent = this.childrenContainer && this.childrenContainer.contains(event.target);
      var isValidSource = children ? isChildrenEvent : isEligibleEvent;

      if (!isValidSource) {
        return false;
      }

      var matchedKey = (0, _keyEvents.findMatchedKey)(event, handleKeys);

      if (matchedKey) {
        onKeyEvent(matchedKey, event);
        return true;
      }

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;

      return children ? _react2.default.createElement(
        'span',
        { ref: function ref(e) {
            _this3.childrenContainer = e;
          } },
        children
      ) : null;
    }
  }]);

  return KeyboardEventHandler;
}(_react2.default.Component);

exports.default = KeyboardEventHandler;


KeyboardEventHandler.propTypes = {
  handleKeys: _propTypes2.default.array,
  handleEventType: _propTypes2.default.oneOf(['keydown', 'keyup', 'keypress']),
  handleFocusableElements: _propTypes2.default.bool,
  onKeyEvent: _propTypes2.default.func,
  isDisabled: _propTypes2.default.bool,
  isExclusive: _propTypes2.default.bool,
  children: _propTypes2.default.any
};

KeyboardEventHandler.defaultProps = {
  handleKeys: [],
  handleFocusableElements: false,
  handleEventType: 'keydown',
  onKeyEvent: function onKeyEvent() {
    return null;
  }
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchKeyEvent = matchKeyEvent;
exports.findMatchedKey = findMatchedKey;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commonKeys = {
  backspace: 8,
  del: 46,
  delete: 46,
  tab: 9,
  enter: 13,
  return: 13,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221
};

var commonKeysInUpperCases = Object.keys(commonKeys).reduce(function (accumulator, current) {
  return Object.assign(accumulator, _defineProperty({}, current.toUpperCase(), commonKeys[current]));
}, {});

var numberKeys = '0123456789'.split('').reduce(function (accumulator, current, index) {
  return Object.assign(accumulator, _defineProperty({}, current, index + 48));
}, {});

var letterKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce(function (accumulator, current, index) {
  return Object.assign(accumulator, _defineProperty({}, current.toLowerCase(), index + 65), _defineProperty({}, current, index + 65));
}, {});

var modifierKeys = {
  control: 'ctrl',
  ctrl: 'ctrl',
  shift: 'shift',
  meta: 'meta',
  cmd: 'meta',
  command: 'meta',
  option: 'alt',
  alt: 'alt'
};

var AllKeys = exports.AllKeys = Object.assign({}, commonKeys, commonKeysInUpperCases, numberKeys, letterKeys);
var alphanumericKeys = Object.assign({}, numberKeys, letterKeys);

var aliasKeys = {
  all: Object.keys(AllKeys),
  alphanumeric: Object.keys(alphanumericKeys),
  numeric: Object.keys(numberKeys),
  alphabetic: Object.keys(letterKeys)
};

function matchKeyEvent(event, keyName) {
  var eventKeyCode = event.which || event.keyCode;
  var eventType = event.type;
  var eventModifiers = Object.keys(modifierKeys).filter(function (modKey) {
    return event[modKey + 'Key'];
  }).sort();
  var cleanKeyName = keyName.toLowerCase().trim();
  var keyNameParts = cleanKeyName.split(/\s?\+\s?/); // e.g. 'crtl + a'
  var mainKeyName = keyNameParts.pop();
  var mainKeyCode = AllKeys[mainKeyName];
  var modifierKeyNames = keyNameParts;

  if (eventType === 'keypress') {
    var eventKeyCodeString = String.fromCharCode(eventKeyCode);
    return keyName == eventKeyCodeString.toLowerCase();
  }

  if (modifierKeyNames.length === 0 && eventModifiers.length === 0) {
    return eventKeyCode === mainKeyCode;
  }

  if (modifierKeyNames.length > 0 && eventModifiers.length > 0) {
    var modifiers = modifierKeyNames.map(function (modKey) {
      return modifierKeys[modKey];
    }).sort();
    var modifiersMatched = modifiers.length === eventModifiers.length && modifiers.every(function (modKey, index) {
      return eventModifiers[index] === modKey;
    });

    return eventKeyCode === mainKeyCode && modifiersMatched;
  }

  return false;
}

function findMatchedKey(event, keys) {
  var lookupAlias = function lookupAlias(k) {
    var found = aliasKeys[k.toLowerCase()];
    return found ? [].concat(_toConsumableArray(found), [k.toLowerCase()]) : k;
  };

  var expandedKeys = keys.map(lookupAlias).reduce(function (a, b) {
    return a.concat(b);
  }, []);

  var matchedKey = expandedKeys.find(function (k) {
    return matchKeyEvent(event, k);
  });

  if (!matchedKey && expandedKeys.includes('all')) {
    matchedKey = 'other';
  }

  return matchedKey;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-keyboard-event-handler.js.map