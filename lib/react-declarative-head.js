(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom/server"), require("shallowequal"));
	else if(typeof define === 'function' && define.amd)
		define("ReactDeclarativeHead", ["react", "react-dom/server", "shallowequal"], factory);
	else if(typeof exports === 'object')
		exports["ReactDeclarativeHead"] = factory(require("react"), require("react-dom/server"), require("shallowequal"));
	else
		root["ReactDeclarativeHead"] = factory(root["react"], root["react-dom/server"], root["shallowequal"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(3);

	var _server2 = _interopRequireDefault(_server);

	var _sideEffect = __webpack_require__(4);

	var _sideEffect2 = _interopRequireDefault(_sideEffect);

	var _shallowequal = __webpack_require__(5);

	var _shallowequal2 = _interopRequireDefault(_shallowequal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Plain empty component;
	var Head = function Head(props) {
	  return null;
	};
	var HEAD_ATTR = 'data-head-react';

	var REACT_CUSTOM_TAGS = {
	  charSet: 'charset',
	  httpEquiv: 'http-equiv'
	};

	var generateComponents = function generateComponents(components) {
	  var buffer = components.map(function (comp) {
	    switch (comp.type) {
	      case 'title':
	        return comp;
	      case 'style':
	      case 'script':
	      case 'noscript':
	        return comp.props.children ? _react2.default.createElement(comp.type, _extends({}, comp.props, {
	          dangerouslySetInnerHTML: { __html: comp.props.children },
	          'data-head-react': true
	        })) : comp;
	        break;
	      default:
	        return _react2.default.createElement(comp.type, _extends({}, comp.props, {
	          'data-head-react': true
	        }));
	    }
	  });

	  buffer.reverse();
	  // TODO: refactor this loop
	  var filteredTags = [];

	  var _loop = function _loop(i) {
	    var element = buffer[i];
	    // if (filteredTags.length === 0) {
	    //   filteredTags.push(element);
	    // } else {
	    var canTitle = element.type === 'title' && !filteredTags.some(function (obj) {
	      return obj.type === 'title';
	    });
	    var canBase = element.type === 'base' && !filteredTags.some(function (obj) {
	      return obj.type === 'base';
	    });
	    if (canTitle) {
	      filteredTags.push(element);
	    } else if (canBase) {
	      filteredTags.push(element);
	    } else if (element.type !== 'title' && element.type !== 'base' && !filteredTags.some(function (obj) {
	      return (0, _shallowequal2.default)(element.props, obj.props);
	    })) {
	      filteredTags.push(element);
	    }
	    // }
	  };

	  for (var i = 0; i < buffer.length; i += 1) {
	    _loop(i);
	  }
	  filteredTags.reverse();
	  return filteredTags;
	};

	// TODO: move compare method outside
	var virtualHead = void 0;
	function headDiff(comps) {
	  var addedTags = [];
	  var removedTags = [];
	  if (virtualHead) {
	    addedTags = comps.filter(function (comp) {
	      if (!comp.props.dangerouslySetInnerHTML) {
	        var notSameProps = !virtualHead.some(function (item) {
	          return (0, _shallowequal2.default)(comp.props, item.props);
	        });
	        return notSameProps ? comp : null;
	      } else {
	        var notSameChilds = !virtualHead.some(function (item) {
	          return (0, _shallowequal2.default)(comp.props.dangerouslySetInnerHTML, item.props.dangerouslySetInnerHTML);
	        });
	        return notSameChilds ? comp : null;
	      }
	    });
	    removedTags = virtualHead.filter(function (comp) {
	      if (!comp.props.dangerouslySetInnerHTML) {
	        var notSameProps = !comps.some(function (item) {
	          return (0, _shallowequal2.default)(comp.props, item.props);
	        });
	        return notSameProps ? comp : null;
	      } else {
	        var notSameChilds = !comps.some(function (item) {
	          return (0, _shallowequal2.default)(comp.props.dangerouslySetInnerHTML, item.props.dangerouslySetInnerHTML);
	        });
	        return notSameChilds ? comp : null;
	      }
	    });
	  } else {
	    addedTags = comps;
	  }
	  virtualHead = comps;
	  return { addedTags: addedTags, removedTags: removedTags };
	}

	function updateTag(comp, remove) {
	  var headEl = document.head;
	  var genericTag = comp.props.dangerouslySetInnerHTML;
	  var query = void 0;
	  for (var key in comp.props) {
	    if (key !== 'children' && key !== 'dangerouslySetInnerHTML' && key !== 'data-head-react') {
	      if (comp.props.hasOwnProperty(key)) {
	        var htmlKey = REACT_CUSTOM_TAGS[key] ? REACT_CUSTOM_TAGS[key] : key;
	        query = query ? query + '[' + htmlKey + '=\'' + comp.props[key] + '\']' : '[' + htmlKey + '=\'' + comp.props[key] + '\']';
	      }
	    }
	  }
	  var el = headEl.querySelectorAll(query)[0];
	  if (remove) {
	    el.parentNode.removeChild(el);
	    return;
	  }
	  if (el && el.hasAttribute(HEAD_ATTR)) {
	    el.removeAttribute(HEAD_ATTR);
	  } else {
	    var newTag = document.createElement(comp.type);
	    for (var _key in comp.props) {
	      if (comp.props.hasOwnProperty(_key) && _key !== 'children' && _key !== 'dangerouslySetInnerHTML') {
	        newTag[_key] = comp.props[_key];
	      }
	    }
	    if (genericTag) {
	      newTag.innerHTML = genericTag.__html;
	    }
	    headEl.appendChild(newTag);
	  }
	}

	function toStatic(comp) {
	  return _server2.default.renderToStaticMarkup(comp);
	}

	function getHeadStatic(comps) {
	  var head = void 0;
	  for (var i = 0; i < comps.length; i += 1) {
	    head = !head ? toStatic(comps[i]) : head + toStatic(comps[i]);
	  }
	  return head;
	}

	function reduceComponentsToState(headMountedInstances) {
	  var headTags = headMountedInstances // Array of mounted instances
	  .map(function (child) {
	    return child.props.children;
	  }) // Return each instance with children
	  .filter(function (child) {
	    return !!child;
	  }) // Check each child to be an object
	  .map(function (child) {
	    return _react.Children.toArray(child);
	  }) // If child is only one convert to array
	  .reduce(function (a, b) {
	    return a.concat(b);
	  }, []); // Generate an unique array

	  return generateComponents(headTags); // Remove duplicated tags and filter unique tags like title
	}

	function handleClientChange(comps) {
	  var diff = headDiff(comps); // Get components diff
	  diff.addedTags.forEach(function (comp) {
	    // Update each diff tag
	    if (comp.type === 'title') {
	      document.title = comp.props.children;
	    } else {
	      updateTag(comp);
	    }
	  });
	  diff.removedTags.forEach(function (comp) {
	    // Remove unused tags
	    if (comp.type !== 'title') {
	      updateTag(comp, true);
	    }
	  });
	}

	// What returns when I call rewind()
	function mapStateOnServer(comps) {
	  return {
	    toStatic: function toStatic() {
	      return getHeadStatic(comps);
	    }
	  };
	}

	exports.default = (0, _sideEffect2.default)(reduceComponentsToState, handleClientChange, mapStateOnServer)(Head);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = withSideEffect;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function withSideEffect(reduceComponentsToState, handleStateChangeOnClient, mapStateOnServer) {
	  if (typeof reduceComponentsToState !== 'function') {
	    throw new Error('Expected reduceComponentsToState to be a function.');
	  }

	  if (typeof handleStateChangeOnClient !== 'function') {
	    throw new Error('Expected handleStateChangeOnClient to be a function.');
	  }

	  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
	    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
	  }

	  function getDisplayName(WrappedComp) {
	    return WrappedComp.displayName || WrappedComp.name || 'Component';
	  }

	  return function (WrappedComp) {
	    if (typeof WrappedComp !== 'function') {
	      throw new Error('Expected WrappedComp to be a React component.');
	    }
	    var mountedInstances = [];
	    var state = void 0;

	    function emitChange(component) {
	      state = reduceComponentsToState([].concat(_toConsumableArray(mountedInstances)));

	      if (SideEffect.canUseDOM) {
	        handleStateChangeOnClient.call(component, state);
	      } else if (mapStateOnServer) {
	        state = mapStateOnServer(state);
	      }
	    }

	    var SideEffect = function (_Component) {
	      _inherits(SideEffect, _Component);

	      function SideEffect() {
	        _classCallCheck(this, SideEffect);

	        return _possibleConstructorReturn(this, (SideEffect.__proto__ || Object.getPrototypeOf(SideEffect)).apply(this, arguments));
	      }

	      _createClass(SideEffect, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          mountedInstances.push(this);
	          emitChange(this);
	        }
	      }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	          emitChange(this);
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          var ind = mountedInstances.indexOf(this);
	          mountedInstances.splice(ind, 1);
	          emitChange(this);
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return _react2.default.createElement(
	            WrappedComp,
	            null,
	            this.props.children
	          );
	        }
	      }], [{
	        key: 'peek',
	        value: function peek() {
	          return state;
	        }
	      }, {
	        key: 'rewind',
	        value: function rewind() {
	          if (SideEffect.canUseDOM) {
	            throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
	          }

	          var recordedState = state;
	          state = undefined;
	          mountedInstances = [];
	          return recordedState;
	        }
	      }]);

	      return SideEffect;
	    }(_react.Component);

	    SideEffect.canUseDOM = typeof window !== 'undefined';
	    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComp) + ')';

	    return SideEffect;
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("shallowequal");

/***/ }
/******/ ])
});
;