(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("nbd/View"), require("nbd/util/extend"), require("nbd/util/async"));
	else if(typeof define === 'function' && define.amd)
		define(["nbd/View", "nbd/util/extend", "nbd/util/async"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("nbd/View"), require("nbd/util/extend"), require("nbd/util/async")) : factory(root["nbd/View"], root["nbd/util/extend"], root["nbd/util/async"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__) {
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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _nbdView = __webpack_require__(13);

	var _nbdView2 = _interopRequireDefault(_nbdView);

	var _nbdUtilExtend = __webpack_require__(14);

	var _nbdUtilExtend2 = _interopRequireDefault(_nbdUtilExtend);

	var _nbdUtilAsync = __webpack_require__(15);

	var _nbdUtilAsync2 = _interopRequireDefault(_nbdUtilAsync);

	var _sax = __webpack_require__(16);

	var _sax2 = _interopRequireDefault(_sax);

	var _transformTag = __webpack_require__(40);

	var _transformTag2 = _interopRequireDefault(_transformTag);

	var _virtualDomVdomCreateElement = __webpack_require__(1);

	var _virtualDomVdomCreateElement2 = _interopRequireDefault(_virtualDomVdomCreateElement);

	var _virtualDomVdomPatch = __webpack_require__(41);

	var _virtualDomVdomPatch2 = _interopRequireDefault(_virtualDomVdomPatch);

	var _virtualDomVtreeDiff = __webpack_require__(47);

	var _virtualDomVtreeDiff2 = _interopRequireDefault(_virtualDomVtreeDiff);

	var _virtualDomVirtualHyperscriptIndex = __webpack_require__(49);

	var _virtualDomVirtualHyperscriptIndex2 = _interopRequireDefault(_virtualDomVirtualHyperscriptIndex);

	var _virtualDomVirtualHyperscriptSvg = __webpack_require__(59);

	var _virtualDomVirtualHyperscriptSvg2 = _interopRequireDefault(_virtualDomVirtualHyperscriptSvg);

	var _parser = _sax2['default'].parser(true, {
	  html5: true,
	  trim: false,
	  normalize: true,
	  lowercase: true
	});
	var tagstack = [];

	function debounce(callback, ctxt) {
	  return function wrapper() {
	    if (!wrapper._called) {
	      wrapper._called = (0, _nbdUtilAsync2['default'])(function () {
	        wrapper._called = false;
	        callback.call(ctxt);
	      });
	    }
	  };
	}

	var isEvent = /^:(.*)/;

	var EventHandler = (function () {
	  function EventHandler(handler) {
	    _classCallCheck(this, EventHandler);

	    this.handler = handler;
	    this.listener = this.listener.bind(this);
	  }

	  _createClass(EventHandler, [{
	    key: 'listener',
	    value: function listener(event) {
	      this.caller(this.handler.events[event.type], event);
	    }
	  }, {
	    key: 'caller',
	    value: function caller(spec, event) {
	      var _this = this;

	      if (!spec) {
	        return;
	      }
	      var eventName = undefined;
	      switch (typeof spec) {
	        case 'function':
	          spec.call(event.delegateTarget || event.currentTarget, event);
	          break;
	        case 'string':
	          if (this.handler[spec]) {
	            this.handler[spec](event);
	          } else if (eventName = isEvent.exec(spec)) {
	            this.handler.trigger(eventName[1], event);
	          } else {
	            throw new Error('Method "' + spec + '" not found');
	          }
	          break;
	        case 'object':
	          if (Array.isArray(spec)) {
	            spec.forEach(function (s) {
	              return _this.caller(s, event);
	            });
	          } else {
	            for (var selector in spec) {
	              // Find all matching elements
	              var matches = event.currentTarget.querySelectorAll(selector);

	              // If event.target is, or is a child of matching element
	              var found = this.find(matches, event.target);
	              if (found) {
	                event.delegateTarget = found;
	                this.caller(spec[selector], event);
	                delete event.delegateTarget;
	              }
	            }
	          }
	          break;
	      }
	    }
	  }, {
	    key: 'find',
	    value: function find(matches, target) {
	      for (var i = 0; i < matches.length; ++i) {
	        var match = matches[i];
	        // Is the target itself or contains the target
	        if (match === target || match.contains(target)) {
	          return match;
	        }
	      }
	    }
	  }, {
	    key: 'hook',
	    value: function hook(node) {
	      for (var _event in this.handler.events) {
	        node.addEventListener(_event, this.listener, false);
	      }
	    }
	  }, {
	    key: 'unhook',
	    value: function unhook(node) {
	      for (var _event2 in this.handler.events) {
	        node.removeEventListener(_event2, this.listener, false);
	      }
	    }
	  }]);

	  return EventHandler;
	})();

	var tree = undefined,
	    handler = undefined;

	(0, _nbdUtilExtend2['default'])(_parser, {
	  onopentag: function onopentag(_ref) {
	    var name = _ref.name;
	    var attributes = _ref.attributes;

	    if (name.toLowerCase() === 'svg') {
	      _parser.svg = true;
	    }

	    var tag = { name: name, attributes: attributes, children: [], svg: _parser.svg };
	    (0, _transformTag2['default'])(tag);

	    if (tagstack[tagstack.length - 1]) {
	      tagstack[tagstack.length - 1].children.push(tag);
	    } else if (handler && handler.events) {
	      tag.properties['event-mappable'] = new EventHandler(handler);
	    }
	    tagstack.push(tag);
	  },
	  onclosetag: function onclosetag() {
	    var tag = tagstack.pop();

	    // switch to svg() when in svg mode
	    var vnode = (tag.svg ? _virtualDomVirtualHyperscriptSvg2['default'] : _virtualDomVirtualHyperscriptIndex2['default'])(tag.name, tag.properties, tag.children);

	    if (tag.name.toLowerCase() === 'svg') {
	      _parser.svg = false;
	    }
	    var last = tagstack[tagstack.length - 1];
	    if (last) {
	      last.children.splice(last.children.lastIndexOf(tag), 1, vnode);
	    } else {
	      tree = vnode;
	    }
	  },
	  ontext: function ontext(text) {
	    if (!text.trim()) {
	      return;
	    }
	    if (tagstack[tagstack.length - 1]) {
	      tagstack[tagstack.length - 1].children.push(text);
	    }
	  },
	  onend: function onend() {
	    tagstack.length = 0;
	  }
	});

	exports['default'] = _nbdView2['default'].extend({
	  init: function init() {
	    this._super.apply(this, arguments);
	    if (this._model.on) {
	      this.listenTo(this._model, 'all', debounce(this.render, this));
	    }

	    this.on({
	      prerender: function prerender() {
	        handler = this;
	      },
	      postrender: function postrender() {
	        handler = null;
	      }
	    });
	  }
	}, {
	  domify: function domify(html) {
	    tree = null;
	    _parser.write(html).close();
	    return tree;
	  },

	  appendTo: function appendTo(tree, $context) {
	    tree._el = (0, _virtualDomVdomCreateElement2['default'])(tree);
	    return _nbdView2['default'].appendTo(tree._el, $context);
	  },

	  replace: function replace(oldtree, newtree) {
	    var p = (0, _virtualDomVtreeDiff2['default'])(oldtree, newtree);
	    if (newtree) {
	      newtree._el = oldtree._el;
	    }
	    (0, _virtualDomVdomPatch2['default'])(oldtree._el, p);
	  },

	  find: function find($root, selector) {
	    if (!selector) {
	      return $root._el || $root;
	    }
	    return _nbdView2['default'].find($root._el || $root, selector);
	  },

	  remove: function remove(tree) {
	    this.replace(tree);
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(4)

	var applyProperties = __webpack_require__(6)

	var isVNode = __webpack_require__(9)
	var isVText = __webpack_require__(2)
	var isWidget = __webpack_require__(10)
	var handleThunk = __webpack_require__(11)

	module.exports = createElement

	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null

	    vnode = handleThunk(vnode).a

	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }

	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)

	    var props = vnode.properties
	    applyProperties(node, props)

	    var children = vnode.children

	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }

	    return node
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(3)

	module.exports = isVirtualText

	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "2"


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(5);

	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }

	    module.exports = doccy;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7)
	var isHook = __webpack_require__(8)

	module.exports = applyProperties

	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]

	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}

	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]

	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}

	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined

	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]

	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }

	        return
	    }

	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }

	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }

	    var replacer = propName === "style" ? "" : undefined

	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = isHook

	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(3)

	module.exports = isVirtualNode

	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = isWidget

	function isWidget(w) {
	    return w && w.type === "Widget"
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isVNode = __webpack_require__(9)
	var isVText = __webpack_require__(2)
	var isWidget = __webpack_require__(10)
	var isThunk = __webpack_require__(12)

	module.exports = handleThunk

	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b

	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }

	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }

	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}

	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode

	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }

	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }

	    return renderedThunk
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = isThunk

	function isThunk(t) {
	    return t && t.type === "Thunk"
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sax = {
	  parser: function parser(strict, opt) {
	    return new SAXParser(strict, opt);
	  },
	  SAXParser: SAXParser,
	  SAXStream: SAXStream,
	  createStream: createStream
	};

	sax.VOID_ELEMENTS = {
	  area: 1,
	  base: 1,
	  br: 1,
	  col: 1,
	  embed: 1,
	  hr: 1,
	  img: 1,
	  input: 1,
	  keygen: 1,
	  link: 1,
	  meta: 1,
	  param: 1,
	  source: 1,
	  track: 1,
	  wbr: 1
	};

	// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
	// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
	// since that's the earliest that a buffer overrun could occur.  This way, checks are
	// as rare as required, but as often as necessary to ensure never crossing this bound.
	// Furthermore, buffers are only tested at most once per write(), so passing a very
	// large string into write() might have undesirable effects, but this is manageable by
	// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
	// edge case, result in creating at most one complete copy of the string passed in.
	// Set to Infinity to have unlimited buffers.
	sax.MAX_BUFFER_LENGTH = 64 * 1024;

	var buffers = ["comment", "sgmlDecl", "textNode", "tagName", "doctype", "procInstName", "procInstBody", "entity", "attribName", "attribValue", "cdata", "script"];

	sax.EVENTS = // for discoverability.
	["text", "processinginstruction", "sgmldeclaration", "doctype", "comment", "attribute", "opentag", "closetag", "opencdata", "cdata", "closecdata", "error", "end", "ready", "script", "opennamespace", "closenamespace"];

	function SAXParser(strict, opt) {
	  if (!(this instanceof SAXParser)) return new SAXParser(strict, opt);

	  var parser = this;
	  clearBuffers(parser);
	  parser.q = parser.c = "";
	  parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
	  parser.opt = opt || {};
	  parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
	  parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
	  parser.tags = [];
	  parser.closed = parser.closedRoot = parser.sawRoot = false;
	  parser.tag = parser.error = null;
	  parser.strict = !!strict;
	  parser.noscript = !!(strict || parser.opt.noscript);
	  parser.state = S.BEGIN;
	  parser.strictEntities = parser.opt.strictEntities;
	  parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
	  parser.attribList = [];

	  // namespaces form a prototype chain.
	  // it always points at the current tag,
	  // which protos to its parent tag.
	  if (parser.opt.xmlns) parser.ns = Object.create(rootNS);

	  // mostly just for error reporting
	  parser.trackPosition = parser.opt.position !== false;
	  if (parser.trackPosition) {
	    parser.position = parser.line = parser.column = 0;
	  }
	  emit(parser, "onready");
	}

	if (!Object.create) Object.create = function (o) {
	  function f() {
	    this.__proto__ = o;
	  }
	  f.prototype = o;
	  return new f();
	};

	if (!Object.getPrototypeOf) Object.getPrototypeOf = function (o) {
	  return o.__proto__;
	};

	if (!Object.keys) Object.keys = function (o) {
	  var a = [];
	  for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
	  return a;
	};

	function checkBufferLength(parser) {
	  var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10),
	      maxActual = 0;
	  for (var i = 0, l = buffers.length; i < l; i++) {
	    var len = parser[buffers[i]].length;
	    if (len > maxAllowed) {
	      // Text/cdata nodes can get big, and since they're buffered,
	      // we can get here under normal conditions.
	      // Avoid issues by emitting the text node now,
	      // so at least it won't get any bigger.
	      switch (buffers[i]) {
	        case "textNode":
	          closeText(parser);
	          break;

	        case "cdata":
	          emitNode(parser, "oncdata", parser.cdata);
	          parser.cdata = "";
	          break;

	        case "script":
	          emitNode(parser, "onscript", parser.script);
	          parser.script = "";
	          break;

	        default:
	          error(parser, "Max buffer length exceeded: " + buffers[i]);
	      }
	    }
	    maxActual = Math.max(maxActual, len);
	  }
	  // schedule the next check for the earliest possible buffer overrun.
	  parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH - maxActual + parser.position;
	}

	function clearBuffers(parser) {
	  for (var i = 0, l = buffers.length; i < l; i++) {
	    parser[buffers[i]] = "";
	  }
	}

	function flushBuffers(parser) {
	  closeText(parser);
	  if (parser.cdata !== "") {
	    emitNode(parser, "oncdata", parser.cdata);
	    parser.cdata = "";
	  }
	  if (parser.script !== "") {
	    emitNode(parser, "onscript", parser.script);
	    parser.script = "";
	  }
	}

	SAXParser.prototype = { end: (function (_end) {
	    function end() {
	      return _end.apply(this, arguments);
	    }

	    end.toString = function () {
	      return _end.toString();
	    };

	    return end;
	  })(function () {
	    end(this);
	  }),
	  write: write,
	  resume: function resume() {
	    this.error = null;return this;
	  },
	  close: function close() {
	    return this.write(null);
	  },
	  flush: function flush() {
	    flushBuffers(this);
	  }
	};

	try {
	  var Stream = __webpack_require__(21).Stream;
	} catch (ex) {
	  var Stream = function Stream() {};
	}

	var streamWraps = sax.EVENTS.filter(function (ev) {
	  return ev !== "error" && ev !== "end";
	});

	function createStream(strict, opt) {
	  return new SAXStream(strict, opt);
	}

	function SAXStream(strict, opt) {
	  if (!(this instanceof SAXStream)) return new SAXStream(strict, opt);

	  Stream.apply(this);

	  this._parser = new SAXParser(strict, opt);
	  this.writable = true;
	  this.readable = true;

	  var me = this;

	  this._parser.onend = function () {
	    me.emit("end");
	  };

	  this._parser.onerror = function (er) {
	    me.emit("error", er);

	    // if didn't throw, then means error was handled.
	    // go ahead and clear error, so we can write again.
	    me._parser.error = null;
	  };

	  this._decoder = null;

	  streamWraps.forEach(function (ev) {
	    Object.defineProperty(me, "on" + ev, {
	      get: function get() {
	        return me._parser["on" + ev];
	      },
	      set: function set(h) {
	        if (!h) {
	          me.removeAllListeners(ev);
	          return me._parser["on" + ev] = h;
	        }
	        me.on(ev, h);
	      },
	      enumerable: true,
	      configurable: false
	    });
	  });
	}

	SAXStream.prototype = Object.create(Stream.prototype, { constructor: { value: SAXStream } });

	SAXStream.prototype.write = function (data) {
	  if (typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(data)) {
	    if (!this._decoder) {
	      var SD = __webpack_require__(32).StringDecoder;
	      this._decoder = new SD('utf8');
	    }
	    data = this._decoder.write(data);
	  }

	  this._parser.write(data.toString());
	  this.emit("data", data);
	  return true;
	};

	SAXStream.prototype.end = function (chunk) {
	  if (chunk && chunk.length) this.write(chunk);
	  this._parser.end();
	  return true;
	};

	SAXStream.prototype.on = function (ev, handler) {
	  var me = this;
	  if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
	    me._parser["on" + ev] = function () {
	      var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
	      args.splice(0, 0, ev);
	      me.emit.apply(me, args);
	    };
	  }

	  return Stream.prototype.on.call(me, ev, handler);
	};

	// character classes and tokens
	var whitespace = "\r\n\t ",

	// this really needs to be replaced with character classes.
	// XML allows all manner of ridiculous numbers and digits.
	number = "0124356789",
	    letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",

	// (Letter | "_" | ":")
	quote = "'\"",
	    entity = number + letter + "#",
	    attribEnd = whitespace + ">",
	    CDATA = "[CDATA[",
	    DOCTYPE = "DOCTYPE",
	    XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace",
	    XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/",
	    rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };

	// turn all the string character sets into character class objects.
	whitespace = charClass(whitespace);
	number = charClass(number);
	letter = charClass(letter);

	// http://www.w3.org/TR/REC-xml/#NT-NameStartChar
	// This implementation works on strings, a single character at a time
	// as such, it cannot ever support astral-plane characters (10000-EFFFF)
	// without a significant breaking change to either this  parser, or the
	// JavaScript language.  Implementation of an emoji-capable xml parser
	// is left as an exercise for the reader.
	var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;

	var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/;

	quote = charClass(quote);
	entity = charClass(entity);
	attribEnd = charClass(attribEnd);

	function charClass(str) {
	  return str.split("").reduce(function (s, c) {
	    s[c] = true;
	    return s;
	  }, {});
	}

	function isRegExp(c) {
	  return Object.prototype.toString.call(c) === '[object RegExp]';
	}

	function is(charclass, c) {
	  return isRegExp(charclass) ? !!c.match(charclass) : charclass[c];
	}

	function not(charclass, c) {
	  return !is(charclass, c);
	}

	var S = 0;
	sax.STATE = { BEGIN: S++, // leading byte order mark or whitespace
	  BEGIN_WHITESPACE: S++, // leading whitespace
	  TEXT: S++, // general stuff
	  TEXT_ENTITY: S++, // &amp and such.
	  OPEN_WAKA: S++, // <
	  SGML_DECL: S++, // <!BLARG
	  SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
	  DOCTYPE: S++, // <!DOCTYPE
	  DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
	  DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
	  DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
	  COMMENT_STARTING: S++, // <!-
	  COMMENT: S++, // <!--
	  COMMENT_ENDING: S++, // <!-- blah -
	  COMMENT_ENDED: S++, // <!-- blah --
	  CDATA: S++, // <![CDATA[ something
	  CDATA_ENDING: S++, // ]
	  CDATA_ENDING_2: S++, // ]]
	  PROC_INST: S++, // <?hi
	  PROC_INST_BODY: S++, // <?hi there
	  PROC_INST_ENDING: S++, // <?hi "there" ?
	  OPEN_TAG: S++, // <strong
	  OPEN_TAG_SLASH: S++, // <strong /
	  ATTRIB: S++, // <a
	  ATTRIB_NAME: S++, // <a foo
	  ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
	  ATTRIB_VALUE: S++, // <a foo=
	  ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
	  ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
	  ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
	  ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
	  ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot;
	  CLOSE_TAG: S++, // </a
	  CLOSE_TAG_SAW_WHITE: S++, // </a   >
	  SCRIPT: S++, // <script> ...
	  SCRIPT_ENDING: S++ // <script> ... <
	};

	sax.XML_ENTITIES = { "amp": "&",
	  "gt": ">",
	  "lt": "<",
	  "quot": "\"",
	  "apos": "'"
	};

	sax.ENTITIES = { "amp": "&",
	  "gt": ">",
	  "lt": "<",
	  "quot": "\"",
	  "apos": "'",
	  "AElig": 198,
	  "Aacute": 193,
	  "Acirc": 194,
	  "Agrave": 192,
	  "Aring": 197,
	  "Atilde": 195,
	  "Auml": 196,
	  "Ccedil": 199,
	  "ETH": 208,
	  "Eacute": 201,
	  "Ecirc": 202,
	  "Egrave": 200,
	  "Euml": 203,
	  "Iacute": 205,
	  "Icirc": 206,
	  "Igrave": 204,
	  "Iuml": 207,
	  "Ntilde": 209,
	  "Oacute": 211,
	  "Ocirc": 212,
	  "Ograve": 210,
	  "Oslash": 216,
	  "Otilde": 213,
	  "Ouml": 214,
	  "THORN": 222,
	  "Uacute": 218,
	  "Ucirc": 219,
	  "Ugrave": 217,
	  "Uuml": 220,
	  "Yacute": 221,
	  "aacute": 225,
	  "acirc": 226,
	  "aelig": 230,
	  "agrave": 224,
	  "aring": 229,
	  "atilde": 227,
	  "auml": 228,
	  "ccedil": 231,
	  "eacute": 233,
	  "ecirc": 234,
	  "egrave": 232,
	  "eth": 240,
	  "euml": 235,
	  "iacute": 237,
	  "icirc": 238,
	  "igrave": 236,
	  "iuml": 239,
	  "ntilde": 241,
	  "oacute": 243,
	  "ocirc": 244,
	  "ograve": 242,
	  "oslash": 248,
	  "otilde": 245,
	  "ouml": 246,
	  "szlig": 223,
	  "thorn": 254,
	  "uacute": 250,
	  "ucirc": 251,
	  "ugrave": 249,
	  "uuml": 252,
	  "yacute": 253,
	  "yuml": 255,
	  "copy": 169,
	  "reg": 174,
	  "nbsp": 160,
	  "iexcl": 161,
	  "cent": 162,
	  "pound": 163,
	  "curren": 164,
	  "yen": 165,
	  "brvbar": 166,
	  "sect": 167,
	  "uml": 168,
	  "ordf": 170,
	  "laquo": 171,
	  "not": 172,
	  "shy": 173,
	  "macr": 175,
	  "deg": 176,
	  "plusmn": 177,
	  "sup1": 185,
	  "sup2": 178,
	  "sup3": 179,
	  "acute": 180,
	  "micro": 181,
	  "para": 182,
	  "middot": 183,
	  "cedil": 184,
	  "ordm": 186,
	  "raquo": 187,
	  "frac14": 188,
	  "frac12": 189,
	  "frac34": 190,
	  "iquest": 191,
	  "times": 215,
	  "divide": 247,
	  "OElig": 338,
	  "oelig": 339,
	  "Scaron": 352,
	  "scaron": 353,
	  "Yuml": 376,
	  "fnof": 402,
	  "circ": 710,
	  "tilde": 732,
	  "Alpha": 913,
	  "Beta": 914,
	  "Gamma": 915,
	  "Delta": 916,
	  "Epsilon": 917,
	  "Zeta": 918,
	  "Eta": 919,
	  "Theta": 920,
	  "Iota": 921,
	  "Kappa": 922,
	  "Lambda": 923,
	  "Mu": 924,
	  "Nu": 925,
	  "Xi": 926,
	  "Omicron": 927,
	  "Pi": 928,
	  "Rho": 929,
	  "Sigma": 931,
	  "Tau": 932,
	  "Upsilon": 933,
	  "Phi": 934,
	  "Chi": 935,
	  "Psi": 936,
	  "Omega": 937,
	  "alpha": 945,
	  "beta": 946,
	  "gamma": 947,
	  "delta": 948,
	  "epsilon": 949,
	  "zeta": 950,
	  "eta": 951,
	  "theta": 952,
	  "iota": 953,
	  "kappa": 954,
	  "lambda": 955,
	  "mu": 956,
	  "nu": 957,
	  "xi": 958,
	  "omicron": 959,
	  "pi": 960,
	  "rho": 961,
	  "sigmaf": 962,
	  "sigma": 963,
	  "tau": 964,
	  "upsilon": 965,
	  "phi": 966,
	  "chi": 967,
	  "psi": 968,
	  "omega": 969,
	  "thetasym": 977,
	  "upsih": 978,
	  "piv": 982,
	  "ensp": 8194,
	  "emsp": 8195,
	  "thinsp": 8201,
	  "zwnj": 8204,
	  "zwj": 8205,
	  "lrm": 8206,
	  "rlm": 8207,
	  "ndash": 8211,
	  "mdash": 8212,
	  "lsquo": 8216,
	  "rsquo": 8217,
	  "sbquo": 8218,
	  "ldquo": 8220,
	  "rdquo": 8221,
	  "bdquo": 8222,
	  "dagger": 8224,
	  "Dagger": 8225,
	  "bull": 8226,
	  "hellip": 8230,
	  "permil": 8240,
	  "prime": 8242,
	  "Prime": 8243,
	  "lsaquo": 8249,
	  "rsaquo": 8250,
	  "oline": 8254,
	  "frasl": 8260,
	  "euro": 8364,
	  "image": 8465,
	  "weierp": 8472,
	  "real": 8476,
	  "trade": 8482,
	  "alefsym": 8501,
	  "larr": 8592,
	  "uarr": 8593,
	  "rarr": 8594,
	  "darr": 8595,
	  "harr": 8596,
	  "crarr": 8629,
	  "lArr": 8656,
	  "uArr": 8657,
	  "rArr": 8658,
	  "dArr": 8659,
	  "hArr": 8660,
	  "forall": 8704,
	  "part": 8706,
	  "exist": 8707,
	  "empty": 8709,
	  "nabla": 8711,
	  "isin": 8712,
	  "notin": 8713,
	  "ni": 8715,
	  "prod": 8719,
	  "sum": 8721,
	  "minus": 8722,
	  "lowast": 8727,
	  "radic": 8730,
	  "prop": 8733,
	  "infin": 8734,
	  "ang": 8736,
	  "and": 8743,
	  "or": 8744,
	  "cap": 8745,
	  "cup": 8746,
	  "int": 8747,
	  "there4": 8756,
	  "sim": 8764,
	  "cong": 8773,
	  "asymp": 8776,
	  "ne": 8800,
	  "equiv": 8801,
	  "le": 8804,
	  "ge": 8805,
	  "sub": 8834,
	  "sup": 8835,
	  "nsub": 8836,
	  "sube": 8838,
	  "supe": 8839,
	  "oplus": 8853,
	  "otimes": 8855,
	  "perp": 8869,
	  "sdot": 8901,
	  "lceil": 8968,
	  "rceil": 8969,
	  "lfloor": 8970,
	  "rfloor": 8971,
	  "lang": 9001,
	  "rang": 9002,
	  "loz": 9674,
	  "spades": 9824,
	  "clubs": 9827,
	  "hearts": 9829,
	  "diams": 9830
	};

	Object.keys(sax.ENTITIES).forEach(function (key) {
	  var e = sax.ENTITIES[key];
	  var s = typeof e === 'number' ? String.fromCharCode(e) : e;
	  sax.ENTITIES[key] = s;
	});

	for (var S in sax.STATE) sax.STATE[sax.STATE[S]] = S;

	// shorthand
	S = sax.STATE;

	function emit(parser, event, data) {
	  parser[event] && parser[event](data);
	}

	function emitNode(parser, nodeType, data) {
	  if (parser.textNode) closeText(parser);
	  emit(parser, nodeType, data);
	}

	function closeText(parser) {
	  parser.textNode = textopts(parser.opt, parser.textNode);
	  if (parser.textNode) emit(parser, "ontext", parser.textNode);
	  parser.textNode = "";
	}

	function textopts(opt, text) {
	  if (opt.trim) text = text.trim();
	  if (opt.normalize) text = text.replace(/\s+/g, " ");
	  return text;
	}

	function error(parser, er) {
	  closeText(parser);
	  if (parser.trackPosition) {
	    er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
	  }
	  er = new Error(er);
	  parser.error = er;
	  emit(parser, "onerror", er);
	  return parser;
	}

	function end(parser) {
	  if (parser.sawRoot && !parser.closedRoot) strictFail(parser, "Unclosed root tag");
	  if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) error(parser, "Unexpected end");
	  closeText(parser);
	  parser.c = "";
	  parser.closed = true;
	  emit(parser, "onend");
	  SAXParser.call(parser, parser.strict, parser.opt);
	  return parser;
	}

	function strictFail(parser, message) {
	  if (typeof parser !== 'object' || !(parser instanceof SAXParser)) throw new Error('bad call to strictFail');
	  if (parser.strict) error(parser, message);
	}

	function newTag(parser) {
	  if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
	  var parent = parser.tags[parser.tags.length - 1] || parser,
	      tag = parser.tag = { name: parser.tagName, attributes: {} };

	  // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
	  if (parser.opt.xmlns) tag.ns = parent.ns;
	  parser.attribList.length = 0;
	}

	function qname(name, attribute) {
	  var i = name.indexOf(":"),
	      qualName = i < 0 ? ["", name] : name.split(":"),
	      prefix = qualName[0],
	      local = qualName[1];

	  // <x "xmlns"="http://foo">
	  if (attribute && name === "xmlns") {
	    prefix = "xmlns";
	    local = "";
	  }

	  return { prefix: prefix, local: local };
	}

	function attrib(parser) {
	  if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]();

	  if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
	    return parser.attribName = parser.attribValue = "";
	  }

	  if (parser.opt.xmlns) {
	    var qn = qname(parser.attribName, true),
	        prefix = qn.prefix,
	        local = qn.local;

	    if (prefix === "xmlns") {
	      // namespace binding attribute; push the binding into scope
	      if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
	        strictFail(parser, "xml: prefix must be bound to " + XML_NAMESPACE + "\n" + "Actual: " + parser.attribValue);
	      } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
	        strictFail(parser, "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\n" + "Actual: " + parser.attribValue);
	      } else {
	        var tag = parser.tag,
	            parent = parser.tags[parser.tags.length - 1] || parser;
	        if (tag.ns === parent.ns) {
	          tag.ns = Object.create(parent.ns);
	        }
	        tag.ns[local] = parser.attribValue;
	      }
	    }

	    // defer onattribute events until all attributes have been seen
	    // so any new bindings can take effect; preserve attribute order
	    // so deferred events can be emitted in document order
	    parser.attribList.push([parser.attribName, parser.attribValue]);
	  } else {
	    // in non-xmlns mode, we can emit the event right away
	    parser.tag.attributes[parser.attribName] = parser.attribValue;
	    emitNode(parser, "onattribute", { name: parser.attribName,
	      value: parser.attribValue });
	  }

	  parser.attribName = parser.attribValue = "";
	}

	function openTag(parser, selfClosing) {
	  if (parser.opt.xmlns) {
	    // emit namespace binding events
	    var tag = parser.tag;

	    // add namespace info to tag
	    var qn = qname(parser.tagName);
	    tag.prefix = qn.prefix;
	    tag.local = qn.local;
	    tag.uri = tag.ns[qn.prefix] || "";

	    if (tag.prefix && !tag.uri) {
	      strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
	      tag.uri = qn.prefix;
	    }

	    var parent = parser.tags[parser.tags.length - 1] || parser;
	    if (tag.ns && parent.ns !== tag.ns) {
	      Object.keys(tag.ns).forEach(function (p) {
	        emitNode(parser, "onopennamespace", { prefix: p, uri: tag.ns[p] });
	      });
	    }

	    // handle deferred onattribute events
	    // Note: do not apply default ns to attributes:
	    //   http://www.w3.org/TR/REC-xml-names/#defaulting
	    for (var i = 0, l = parser.attribList.length; i < l; i++) {
	      var nv = parser.attribList[i];
	      var name = nv[0],
	          value = nv[1],
	          qualName = qname(name, true),
	          prefix = qualName.prefix,
	          local = qualName.local,
	          uri = prefix == "" ? "" : tag.ns[prefix] || "",
	          a = { name: name,
	        value: value,
	        prefix: prefix,
	        local: local,
	        uri: uri
	      };

	      // if there's any attributes with an undefined namespace,
	      // then fail on them now.
	      if (prefix && prefix != "xmlns" && !uri) {
	        strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
	        a.uri = prefix;
	      }
	      parser.tag.attributes[name] = a;
	      emitNode(parser, "onattribute", a);
	    }
	    parser.attribList.length = 0;
	  }

	  parser.tag.isSelfClosing = !!selfClosing;

	  // process the tag
	  parser.sawRoot = true;
	  parser.tags.push(parser.tag);
	  emitNode(parser, "onopentag", parser.tag);
	  if (!selfClosing) {
	    // special case for <script> in non-strict mode.
	    if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
	      parser.state = S.SCRIPT;
	    } else {
	      parser.state = S.TEXT;
	    }
	    parser.tag = null;
	    parser.tagName = "";
	  }
	  parser.attribName = parser.attribValue = "";
	  parser.attribList.length = 0;
	}

	function closeTag(parser) {
	  if (!parser.tagName) {
	    strictFail(parser, "Weird empty close tag.");
	    parser.textNode += "</>";
	    parser.state = S.TEXT;
	    return;
	  }

	  if (parser.script) {
	    if (parser.tagName !== "script") {
	      parser.script += "</" + parser.tagName + ">";
	      parser.tagName = "";
	      parser.state = S.SCRIPT;
	      return;
	    }
	    emitNode(parser, "onscript", parser.script);
	    parser.script = "";
	  }

	  // first make sure that the closing tag actually exists.
	  // <a><b></c></b></a> will close everything, otherwise.
	  var t = parser.tags.length;
	  var tagName = parser.tagName;
	  if (!parser.strict) tagName = tagName[parser.looseCase]();
	  var closeTo = tagName;
	  while (t--) {
	    var close = parser.tags[t];
	    if (close.name !== closeTo) {
	      // fail the first time in strict mode
	      strictFail(parser, "Unexpected close tag");
	    } else break;
	  }

	  // didn't find it.  we already failed for strict, so just abort.
	  if (t < 0) {
	    strictFail(parser, "Unmatched closing tag: " + parser.tagName);
	    parser.textNode += "</" + parser.tagName + ">";
	    parser.state = S.TEXT;
	    return;
	  }
	  parser.tagName = tagName;
	  var s = parser.tags.length;
	  while (s-- > t) {
	    var tag = parser.tag = parser.tags.pop();
	    parser.tagName = parser.tag.name;
	    emitNode(parser, "onclosetag", parser.tagName);

	    var x = {};
	    for (var i in tag.ns) x[i] = tag.ns[i];

	    var parent = parser.tags[parser.tags.length - 1] || parser;
	    if (parser.opt.xmlns && tag.ns !== parent.ns) {
	      // remove namespace bindings introduced by tag
	      Object.keys(tag.ns).forEach(function (p) {
	        var n = tag.ns[p];
	        emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
	      });
	    }
	  }
	  if (t === 0) parser.closedRoot = true;
	  parser.tagName = parser.attribValue = parser.attribName = "";
	  parser.attribList.length = 0;
	  parser.state = S.TEXT;
	}

	function parseEntity(parser) {
	  var entity = parser.entity,
	      entityLC = entity.toLowerCase(),
	      num,
	      numStr = "";
	  if (parser.ENTITIES[entity]) return parser.ENTITIES[entity];
	  if (parser.ENTITIES[entityLC]) return parser.ENTITIES[entityLC];
	  entity = entityLC;
	  if (entity.charAt(0) === "#") {
	    if (entity.charAt(1) === "x") {
	      entity = entity.slice(2);
	      num = parseInt(entity, 16);
	      numStr = num.toString(16);
	    } else {
	      entity = entity.slice(1);
	      num = parseInt(entity, 10);
	      numStr = num.toString(10);
	    }
	  }
	  entity = entity.replace(/^0+/, "");
	  if (numStr.toLowerCase() !== entity) {
	    strictFail(parser, "Invalid character entity");
	    return "&" + parser.entity + ";";
	  }

	  return String.fromCodePoint(num);
	}

	function write(chunk) {
	  var parser = this;
	  if (this.error) throw this.error;
	  if (parser.closed) return error(parser, "Cannot write after close. Assign an onready handler.");
	  if (chunk === null) return end(parser);
	  var i = 0,
	      c = "";
	  while (parser.c = c = chunk.charAt(i++)) {
	    if (parser.trackPosition) {
	      parser.position++;
	      if (c === "\n") {
	        parser.line++;
	        parser.column = 0;
	      } else parser.column++;
	    }
	    switch (parser.state) {

	      case S.BEGIN:
	        parser.state = S.BEGIN_WHITESPACE;
	        if (c === "﻿") {
	          continue;
	        }
	      // no continue - fall through

	      case S.BEGIN_WHITESPACE:
	        if (c === "<") {
	          parser.state = S.OPEN_WAKA;
	          parser.startTagPosition = parser.position;
	        } else if (not(whitespace, c)) {
	          // have to process this as a text node.
	          // weird, but happens.
	          strictFail(parser, "Non-whitespace before first tag.");
	          parser.textNode = c;
	          parser.state = S.TEXT;
	        }
	        continue;

	      case S.TEXT:
	        if (parser.sawRoot && !parser.closedRoot) {
	          var starti = i - 1;
	          while (c && c !== "<" && c !== "&") {
	            c = chunk.charAt(i++);
	            if (c && parser.trackPosition) {
	              parser.position++;
	              if (c === "\n") {
	                parser.line++;
	                parser.column = 0;
	              } else parser.column++;
	            }
	          }
	          parser.textNode += chunk.substring(starti, i - 1);
	        }
	        if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
	          parser.state = S.OPEN_WAKA;
	          parser.startTagPosition = parser.position;
	        } else {
	          if (not(whitespace, c) && (!parser.sawRoot || parser.closedRoot)) strictFail(parser, "Text data outside of root node.");
	          if (c === "&") parser.state = S.TEXT_ENTITY;else parser.textNode += c;
	        }
	        continue;

	      case S.SCRIPT:
	        // only non-strict
	        if (c === "<") {
	          parser.state = S.SCRIPT_ENDING;
	        } else parser.script += c;
	        continue;

	      case S.SCRIPT_ENDING:
	        if (c === "/") {
	          parser.state = S.CLOSE_TAG;
	        } else {
	          parser.script += "<" + c;
	          parser.state = S.SCRIPT;
	        }
	        continue;

	      case S.OPEN_WAKA:
	        // either a /, ?, !, or text is coming next.
	        if (c === "!") {
	          parser.state = S.SGML_DECL;
	          parser.sgmlDecl = "";
	        } else if (is(whitespace, c)) {
	          // wait for it...
	        } else if (is(nameStart, c)) {
	            parser.state = S.OPEN_TAG;
	            parser.tagName = c;
	          } else if (c === "/") {
	            parser.state = S.CLOSE_TAG;
	            parser.tagName = "";
	          } else if (c === "?") {
	            parser.state = S.PROC_INST;
	            parser.procInstName = parser.procInstBody = "";
	          } else {
	            strictFail(parser, "Unencoded <");
	            // if there was some whitespace, then add that in.
	            if (parser.startTagPosition + 1 < parser.position) {
	              var pad = parser.position - parser.startTagPosition;
	              c = new Array(pad).join(" ") + c;
	            }
	            parser.textNode += "<" + c;
	            parser.state = S.TEXT;
	          }
	        continue;

	      case S.SGML_DECL:
	        if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
	          emitNode(parser, "onopencdata");
	          parser.state = S.CDATA;
	          parser.sgmlDecl = "";
	          parser.cdata = "";
	        } else if (parser.sgmlDecl + c === "--") {
	          parser.state = S.COMMENT;
	          parser.comment = "";
	          parser.sgmlDecl = "";
	        } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
	          parser.state = S.DOCTYPE;
	          if (parser.doctype || parser.sawRoot) strictFail(parser, "Inappropriately located doctype declaration");
	          parser.doctype = "";
	          parser.sgmlDecl = "";
	        } else if (c === ">") {
	          emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
	          parser.sgmlDecl = "";
	          parser.state = S.TEXT;
	        } else if (is(quote, c)) {
	          parser.state = S.SGML_DECL_QUOTED;
	          parser.sgmlDecl += c;
	        } else parser.sgmlDecl += c;
	        continue;

	      case S.SGML_DECL_QUOTED:
	        if (c === parser.q) {
	          parser.state = S.SGML_DECL;
	          parser.q = "";
	        }
	        parser.sgmlDecl += c;
	        continue;

	      case S.DOCTYPE:
	        if (c === ">") {
	          parser.state = S.TEXT;
	          emitNode(parser, "ondoctype", parser.doctype);
	          parser.doctype = true; // just remember that we saw it.
	        } else {
	            parser.doctype += c;
	            if (c === "[") parser.state = S.DOCTYPE_DTD;else if (is(quote, c)) {
	              parser.state = S.DOCTYPE_QUOTED;
	              parser.q = c;
	            }
	          }
	        continue;

	      case S.DOCTYPE_QUOTED:
	        parser.doctype += c;
	        if (c === parser.q) {
	          parser.q = "";
	          parser.state = S.DOCTYPE;
	        }
	        continue;

	      case S.DOCTYPE_DTD:
	        parser.doctype += c;
	        if (c === "]") parser.state = S.DOCTYPE;else if (is(quote, c)) {
	          parser.state = S.DOCTYPE_DTD_QUOTED;
	          parser.q = c;
	        }
	        continue;

	      case S.DOCTYPE_DTD_QUOTED:
	        parser.doctype += c;
	        if (c === parser.q) {
	          parser.state = S.DOCTYPE_DTD;
	          parser.q = "";
	        }
	        continue;

	      case S.COMMENT:
	        if (c === "-") parser.state = S.COMMENT_ENDING;else parser.comment += c;
	        continue;

	      case S.COMMENT_ENDING:
	        if (c === "-") {
	          parser.state = S.COMMENT_ENDED;
	          parser.comment = textopts(parser.opt, parser.comment);
	          if (parser.comment) emitNode(parser, "oncomment", parser.comment);
	          parser.comment = "";
	        } else {
	          parser.comment += "-" + c;
	          parser.state = S.COMMENT;
	        }
	        continue;

	      case S.COMMENT_ENDED:
	        if (c !== ">") {
	          strictFail(parser, "Malformed comment");
	          // allow <!-- blah -- bloo --> in non-strict mode,
	          // which is a comment of " blah -- bloo "
	          parser.comment += "--" + c;
	          parser.state = S.COMMENT;
	        } else parser.state = S.TEXT;
	        continue;

	      case S.CDATA:
	        if (c === "]") parser.state = S.CDATA_ENDING;else parser.cdata += c;
	        continue;

	      case S.CDATA_ENDING:
	        if (c === "]") parser.state = S.CDATA_ENDING_2;else {
	          parser.cdata += "]" + c;
	          parser.state = S.CDATA;
	        }
	        continue;

	      case S.CDATA_ENDING_2:
	        if (c === ">") {
	          if (parser.cdata) emitNode(parser, "oncdata", parser.cdata);
	          emitNode(parser, "onclosecdata");
	          parser.cdata = "";
	          parser.state = S.TEXT;
	        } else if (c === "]") {
	          parser.cdata += "]";
	        } else {
	          parser.cdata += "]]" + c;
	          parser.state = S.CDATA;
	        }
	        continue;

	      case S.PROC_INST:
	        if (c === "?") parser.state = S.PROC_INST_ENDING;else if (is(whitespace, c)) parser.state = S.PROC_INST_BODY;else parser.procInstName += c;
	        continue;

	      case S.PROC_INST_BODY:
	        if (!parser.procInstBody && is(whitespace, c)) continue;else if (c === "?") parser.state = S.PROC_INST_ENDING;else parser.procInstBody += c;
	        continue;

	      case S.PROC_INST_ENDING:
	        if (c === ">") {
	          emitNode(parser, "onprocessinginstruction", {
	            name: parser.procInstName,
	            body: parser.procInstBody
	          });
	          parser.procInstName = parser.procInstBody = "";
	          parser.state = S.TEXT;
	        } else {
	          parser.procInstBody += "?" + c;
	          parser.state = S.PROC_INST_BODY;
	        }
	        continue;

	      case S.OPEN_TAG:
	        if (is(nameBody, c)) parser.tagName += c;else {
	          newTag(parser);
	          if (c === ">") {
	            if (parser.opt.html5 && parser.tagName.toLowerCase() in sax.VOID_ELEMENTS) {
	              openTag(parser, true);
	              closeTag(parser);
	            } else openTag(parser);
	          } else if (c === "/") parser.state = S.OPEN_TAG_SLASH;else {
	            if (not(whitespace, c)) strictFail(parser, "Invalid character in tag name");
	            parser.state = S.ATTRIB;
	          }
	        }
	        continue;

	      case S.OPEN_TAG_SLASH:
	        if (c === ">") {
	          openTag(parser, true);
	          closeTag(parser);
	        } else {
	          strictFail(parser, "Forward-slash in opening tag not followed by >");
	          parser.state = S.ATTRIB;
	        }
	        continue;

	      case S.ATTRIB:
	        // haven't read the attribute name yet.
	        if (is(whitespace, c)) continue;else if (c === ">") openTag(parser);else if (c === "/") parser.state = S.OPEN_TAG_SLASH;else if (is(nameStart, c)) {
	          parser.attribName = c;
	          parser.attribValue = "";
	          parser.state = S.ATTRIB_NAME;
	        } else strictFail(parser, "Invalid attribute name");
	        continue;

	      case S.ATTRIB_NAME:
	        if (c === "=") parser.state = S.ATTRIB_VALUE;else if (c === ">") {
	          strictFail(parser, "Attribute without value");
	          parser.attribValue = parser.attribName;
	          attrib(parser);
	          openTag(parser);
	        } else if (is(whitespace, c)) parser.state = S.ATTRIB_NAME_SAW_WHITE;else if (is(nameBody, c)) parser.attribName += c;else strictFail(parser, "Invalid attribute name");
	        continue;

	      case S.ATTRIB_NAME_SAW_WHITE:
	        if (c === "=") parser.state = S.ATTRIB_VALUE;else if (is(whitespace, c)) continue;else {
	          strictFail(parser, "Attribute without value");
	          parser.tag.attributes[parser.attribName] = "";
	          parser.attribValue = "";
	          emitNode(parser, "onattribute", { name: parser.attribName, value: "" });
	          parser.attribName = "";
	          if (c === ">") openTag(parser);else if (is(nameStart, c)) {
	            parser.attribName = c;
	            parser.state = S.ATTRIB_NAME;
	          } else {
	            strictFail(parser, "Invalid attribute name");
	            parser.state = S.ATTRIB;
	          }
	        }
	        continue;

	      case S.ATTRIB_VALUE:
	        if (is(whitespace, c)) continue;else if (is(quote, c)) {
	          parser.q = c;
	          parser.state = S.ATTRIB_VALUE_QUOTED;
	        } else {
	          strictFail(parser, "Unquoted attribute value");
	          parser.state = S.ATTRIB_VALUE_UNQUOTED;
	          parser.attribValue = c;
	        }
	        continue;

	      case S.ATTRIB_VALUE_QUOTED:
	        if (c !== parser.q) {
	          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q;else parser.attribValue += c;
	          continue;
	        }
	        attrib(parser);
	        parser.q = "";
	        parser.state = S.ATTRIB_VALUE_CLOSED;
	        continue;

	      case S.ATTRIB_VALUE_CLOSED:
	        if (is(whitespace, c)) {
	          parser.state = S.ATTRIB;
	        } else if (c === ">") openTag(parser);else if (c === "/") parser.state = S.OPEN_TAG_SLASH;else if (is(nameStart, c)) {
	          strictFail(parser, "No whitespace between attributes");
	          parser.attribName = c;
	          parser.attribValue = "";
	          parser.state = S.ATTRIB_NAME;
	        } else strictFail(parser, "Invalid attribute name");
	        continue;

	      case S.ATTRIB_VALUE_UNQUOTED:
	        if (not(attribEnd, c)) {
	          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U;else parser.attribValue += c;
	          continue;
	        }
	        attrib(parser);
	        if (c === ">") openTag(parser);else parser.state = S.ATTRIB;
	        continue;

	      case S.CLOSE_TAG:
	        if (!parser.tagName) {
	          if (is(whitespace, c)) continue;else if (not(nameStart, c)) {
	            if (parser.script) {
	              parser.script += "</" + c;
	              parser.state = S.SCRIPT;
	            } else {
	              strictFail(parser, "Invalid tagname in closing tag.");
	            }
	          } else parser.tagName = c;
	        } else if (c === ">") closeTag(parser);else if (is(nameBody, c)) parser.tagName += c;else if (parser.script) {
	          parser.script += "</" + parser.tagName;
	          parser.tagName = "";
	          parser.state = S.SCRIPT;
	        } else {
	          if (not(whitespace, c)) strictFail(parser, "Invalid tagname in closing tag");
	          parser.state = S.CLOSE_TAG_SAW_WHITE;
	        }
	        continue;

	      case S.CLOSE_TAG_SAW_WHITE:
	        if (is(whitespace, c)) continue;
	        if (c === ">") closeTag(parser);else strictFail(parser, "Invalid characters in closing tag");
	        continue;

	      case S.TEXT_ENTITY:
	      case S.ATTRIB_VALUE_ENTITY_Q:
	      case S.ATTRIB_VALUE_ENTITY_U:
	        switch (parser.state) {
	          case S.TEXT_ENTITY:
	            var returnState = S.TEXT,
	                buffer = "textNode";
	            break;

	          case S.ATTRIB_VALUE_ENTITY_Q:
	            var returnState = S.ATTRIB_VALUE_QUOTED,
	                buffer = "attribValue";
	            break;

	          case S.ATTRIB_VALUE_ENTITY_U:
	            var returnState = S.ATTRIB_VALUE_UNQUOTED,
	                buffer = "attribValue";
	            break;
	        }
	        if (c === ";") {
	          parser[buffer] += parseEntity(parser);
	          parser.entity = "";
	          parser.state = returnState;
	        } else if (is(entity, c)) parser.entity += c;else {
	          strictFail(parser, "Invalid character entity");
	          parser[buffer] += "&" + parser.entity + c;
	          parser.entity = "";
	          parser.state = returnState;
	        }
	        continue;

	      default:
	        throw new Error(parser, "Unknown state: " + parser.state);
	    }
	  } // while
	  // cdata blocks can get very big under normal conditions. emit and move on.
	  // if (parser.state === S.CDATA && parser.cdata) {
	  //   emitNode(parser, "oncdata", parser.cdata)
	  //   parser.cdata = ""
	  // }
	  if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser);
	  return parser;
	}

	/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
	if (!String.fromCodePoint) {
	  (function () {
	    var stringFromCharCode = String.fromCharCode;
	    var floor = Math.floor;
	    var fromCodePoint = function fromCodePoint() {
	      var MAX_SIZE = 0x4000;
	      var codeUnits = [];
	      var highSurrogate;
	      var lowSurrogate;
	      var index = -1;
	      var length = arguments.length;
	      if (!length) {
	        return '';
	      }
	      var result = '';
	      while (++index < length) {
	        var codePoint = Number(arguments[index]);
	        if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
	        codePoint < 0 || // not a valid Unicode code point
	        codePoint > 0x10FFFF || // not a valid Unicode code point
	        floor(codePoint) != codePoint // not an integer
	        ) {
	            throw RangeError('Invalid code point: ' + codePoint);
	          }
	        if (codePoint <= 0xFFFF) {
	          // BMP code point
	          codeUnits.push(codePoint);
	        } else {
	          // Astral code point; split in surrogate halves
	          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	          codePoint -= 0x10000;
	          highSurrogate = (codePoint >> 10) + 0xD800;
	          lowSurrogate = codePoint % 0x400 + 0xDC00;
	          codeUnits.push(highSurrogate, lowSurrogate);
	        }
	        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
	          result += stringFromCharCode.apply(null, codeUnits);
	          codeUnits.length = 0;
	        }
	      }
	      return result;
	    };
	    if (Object.defineProperty) {
	      Object.defineProperty(String, 'fromCodePoint', {
	        'value': fromCodePoint,
	        'configurable': true,
	        'writable': true
	      });
	    } else {
	      String.fromCodePoint = fromCodePoint;
	    }
	  })();
	}

	exports["default"] = sax;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).Buffer))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(18)
	var ieee754 = __webpack_require__(19)
	var isArray = __webpack_require__(20)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  function Foo () {}
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    arr.constructor = Foo
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Foo && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).Buffer))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 19 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = Stream;

	var EE = __webpack_require__(22).EventEmitter;
	var inherits = __webpack_require__(23);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(24);
	Stream.Writable = __webpack_require__(36);
	Stream.Duplex = __webpack_require__(37);
	Stream.Transform = __webpack_require__(38);
	Stream.PassThrough = __webpack_require__(39);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

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

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29);
	exports.Stream = __webpack_require__(21);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(33);
	exports.Duplex = __webpack_require__(25);
	exports.Transform = __webpack_require__(34);
	exports.PassThrough = __webpack_require__(35);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(27);
	util.inherits = __webpack_require__(28);
	/*</replacement>*/

	var Readable = __webpack_require__(29);
	var Writable = __webpack_require__(33);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
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

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).Buffer))

/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(30);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(17).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(22).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(21);

	/*<replacement>*/
	var util = __webpack_require__(27);
	util.inherits = __webpack_require__(28);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(31);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(25);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(32).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(25);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(32).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

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

	var Buffer = __webpack_require__(17).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(17).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(27);
	util.inherits = __webpack_require__(28);
	/*</replacement>*/

	var Stream = __webpack_require__(21);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(25);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(25);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

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


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(25);

	/*<replacement>*/
	var util = __webpack_require__(27);
	util.inherits = __webpack_require__(28);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

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

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(34);

	/*<replacement>*/
	var util = __webpack_require__(27);
	util.inherits = __webpack_require__(28);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33)


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(34)


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35)


/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var propMap = {
	  id: 'id',
	  name: 'name',
	  'class': 'className',
	  title: 'title',
	  value: 'value',
	  tabindex: 'tabIndex'
	};

	function transformAttributes(attributes) {
	  var properties = {};
	  properties.attributes = attributes;

	  for (var prop in attributes) {
	    if (attributes.hasOwnProperty(prop)) {
	      if (propMap[prop]) {
	        properties[propMap[prop]] = attributes[prop];
	        delete attributes[prop];
	      }
	    }
	  }

	  return properties;
	}

	function transformTag(tag) {
	  tag.properties = tag.svg ? { attributes: tag.attributes } : transformAttributes(tag.attributes);
	  delete tag.attributes;
	}

	exports['default'] = transformTag;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(4)
	var isArray = __webpack_require__(42)

	var render = __webpack_require__(1)
	var domIndex = __webpack_require__(43)
	var patchOp = __webpack_require__(44)
	module.exports = patch

	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {}
	    renderOptions.patch = renderOptions.patch || patchRecursive
	    renderOptions.render = renderOptions.render || render

	    return renderOptions.patch(rootNode, patches, renderOptions)
	}

	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches)

	    if (indices.length === 0) {
	        return rootNode
	    }

	    var index = domIndex(rootNode, patches.a, indices)
	    var ownerDocument = rootNode.ownerDocument

	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument
	    }

	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i]
	        rootNode = applyPatch(rootNode,
	            index[nodeIndex],
	            patches[nodeIndex],
	            renderOptions)
	    }

	    return rootNode
	}

	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode
	    }

	    var newNode

	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions)

	            if (domNode === rootNode) {
	                rootNode = newNode
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions)

	        if (domNode === rootNode) {
	            rootNode = newNode
	        }
	    }

	    return rootNode
	}

	function patchIndices(patches) {
	    var indices = []

	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key))
	        }
	    }

	    return indices
	}


/***/ },
/* 42 */
/***/ function(module, exports) {

	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString

	module.exports = nativeIsArray || isArray

	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}


/***/ },
/* 43 */
/***/ function(module, exports) {

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.

	var noChild = {}

	module.exports = domIndex

	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {}
	    } else {
	        indices.sort(ascending)
	        return recurse(rootNode, tree, indices, nodes, 0)
	    }
	}

	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {}


	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode
	        }

	        var vChildren = tree.children

	        if (vChildren) {

	            var childNodes = rootNode.childNodes

	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1

	                var vChild = vChildren[i] || noChild
	                var nextIndex = rootIndex + (vChild.count || 0)

	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
	                }

	                rootIndex = nextIndex
	            }
	        }
	    }

	    return nodes
	}

	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false
	    }

	    var minIndex = 0
	    var maxIndex = indices.length - 1
	    var currentIndex
	    var currentItem

	    while (minIndex <= maxIndex) {
	        currentIndex = ((maxIndex + minIndex) / 2) >> 0
	        currentItem = indices[currentIndex]

	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1
	        } else  if (currentItem > right) {
	            maxIndex = currentIndex - 1
	        } else {
	            return true
	        }
	    }

	    return false;
	}

	function ascending(a, b) {
	    return a > b ? 1 : -1
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var applyProperties = __webpack_require__(6)

	var isWidget = __webpack_require__(10)
	var VPatch = __webpack_require__(45)

	var updateWidget = __webpack_require__(46)

	module.exports = applyPatch

	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type
	    var vNode = vpatch.vNode
	    var patch = vpatch.patch

	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode)
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions)
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions)
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch)
	            return domNode
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties)
	            return domNode
	        case VPatch.THUNK:
	            return replaceRoot(domNode,
	                renderOptions.patch(domNode, patch, renderOptions))
	        default:
	            return domNode
	    }
	}

	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode

	    if (parentNode) {
	        parentNode.removeChild(domNode)
	    }

	    destroyWidget(domNode, vNode);

	    return null
	}

	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions)

	    if (parentNode) {
	        parentNode.appendChild(newNode)
	    }

	    return parentNode
	}

	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode

	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text)
	        newNode = domNode
	    } else {
	        var parentNode = domNode.parentNode
	        newNode = renderOptions.render(vText, renderOptions)

	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode)
	        }
	    }

	    return newNode
	}

	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget)
	    var newNode

	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode
	    } else {
	        newNode = renderOptions.render(widget, renderOptions)
	    }

	    var parentNode = domNode.parentNode

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }

	    if (!updating) {
	        destroyWidget(domNode, leftVNode)
	    }

	    return newNode
	}

	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode
	    var newNode = renderOptions.render(vNode, renderOptions)

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }

	    return newNode
	}

	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode)
	    }
	}

	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes
	    var keyMap = {}
	    var node
	    var remove
	    var insert

	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i]
	        node = childNodes[remove.from]
	        if (remove.key) {
	            keyMap[remove.key] = node
	        }
	        domNode.removeChild(node)
	    }

	    var length = childNodes.length
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j]
	        node = keyMap[insert.key]
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
	    }
	}

	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
	    }

	    return newRoot;
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(3)

	VirtualPatch.NONE = 0
	VirtualPatch.VTEXT = 1
	VirtualPatch.VNODE = 2
	VirtualPatch.WIDGET = 3
	VirtualPatch.PROPS = 4
	VirtualPatch.ORDER = 5
	VirtualPatch.INSERT = 6
	VirtualPatch.REMOVE = 7
	VirtualPatch.THUNK = 8

	module.exports = VirtualPatch

	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type)
	    this.vNode = vNode
	    this.patch = patch
	}

	VirtualPatch.prototype.version = version
	VirtualPatch.prototype.type = "VirtualPatch"


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isWidget = __webpack_require__(10)

	module.exports = updateWidget

	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id
	        } else {
	            return a.init === b.init
	        }
	    }

	    return false
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(42)

	var VPatch = __webpack_require__(45)
	var isVNode = __webpack_require__(9)
	var isVText = __webpack_require__(2)
	var isWidget = __webpack_require__(10)
	var isThunk = __webpack_require__(12)
	var handleThunk = __webpack_require__(11)

	var diffProps = __webpack_require__(48)

	module.exports = diff

	function diff(a, b) {
	    var patch = { a: a }
	    walk(a, b, patch, 0)
	    return patch
	}

	function walk(a, b, patch, index) {
	    if (a === b) {
	        return
	    }

	    var apply = patch[index]
	    var applyClear = false

	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index)
	    } else if (b == null) {

	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index)
	            apply = patch[index]
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName &&
	                a.namespace === b.namespace &&
	                a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties)
	                if (propsPatch) {
	                    apply = appendPatch(apply,
	                        new VPatch(VPatch.PROPS, a, propsPatch))
	                }
	                apply = diffChildren(a, b, patch, apply, index)
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	                applyClear = true
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	            applyClear = true
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	            applyClear = true
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
	    }

	    if (apply) {
	        patch[index] = apply
	    }

	    if (applyClear) {
	        clearState(a, patch, index)
	    }
	}

	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children
	    var orderedSet = reorder(aChildren, b.children)
	    var bChildren = orderedSet.children

	    var aLen = aChildren.length
	    var bLen = bChildren.length
	    var len = aLen > bLen ? aLen : bLen

	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i]
	        var rightNode = bChildren[i]
	        index += 1

	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply,
	                    new VPatch(VPatch.INSERT, null, rightNode))
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index)
	        }

	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count
	        }
	    }

	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(
	            VPatch.ORDER,
	            a,
	            orderedSet.moves
	        ))
	    }

	    return apply
	}

	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index)
	    destroyWidgets(vNode, patch, index)
	}

	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(VPatch.REMOVE, vNode, null)
	            )
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children
	        var len = children.length
	        for (var i = 0; i < len; i++) {
	            var child = children[i]
	            index += 1

	            destroyWidgets(child, patch, index)

	            if (isVNode(child) && child.count) {
	                index += child.count
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}

	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b)
	    var thunkPatch = diff(nodes.a, nodes.b)
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
	    }
	}

	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true
	        }
	    }

	    return false
	}

	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(
	                    VPatch.PROPS,
	                    vNode,
	                    undefinedKeys(vNode.hooks)
	                )
	            )
	        }

	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children
	            var len = children.length
	            for (var i = 0; i < len; i++) {
	                var child = children[i]
	                index += 1

	                unhook(child, patch, index)

	                if (isVNode(child) && child.count) {
	                    index += child.count
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}

	function undefinedKeys(obj) {
	    var result = {}

	    for (var key in obj) {
	        result[key] = undefined
	    }

	    return result
	}

	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren)
	    var bKeys = bChildIndex.keys
	    var bFree = bChildIndex.free

	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }

	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren)
	    var aKeys = aChildIndex.keys
	    var aFree = aChildIndex.free

	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }

	    // O(MAX(N, M)) memory
	    var newChildren = []

	    var freeIndex = 0
	    var freeCount = bFree.length
	    var deletedItems = 0

	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0 ; i < aChildren.length; i++) {
	        var aItem = aChildren[i]
	        var itemIndex

	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key]
	                newChildren.push(bChildren[itemIndex])

	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++]
	                newChildren.push(bChildren[itemIndex])
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        }
	    }

	    var lastFreeIndex = freeIndex >= bFree.length ?
	        bChildren.length :
	        bFree[freeIndex]

	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j]

	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem)
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem)
	        }
	    }

	    var simulate = newChildren.slice()
	    var simulateIndex = 0
	    var removes = []
	    var inserts = []
	    var simulateItem

	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k]
	        simulateItem = simulate[simulateIndex]

	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null))
	            simulateItem = simulate[simulateIndex]
	        }

	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
	                        simulateItem = simulate[simulateIndex]
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({key: wantedItem.key, to: k})
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                            simulateIndex++
	                        }
	                    }
	                    else {
	                        inserts.push({key: wantedItem.key, to: k})
	                    }
	                }
	                else {
	                    inserts.push({key: wantedItem.key, to: k})
	                }
	                k++
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                removes.push(remove(simulate, simulateIndex, simulateItem.key))
	            }
	        }
	        else {
	            simulateIndex++
	            k++
	        }
	    }

	    // remove all the remaining nodes from simulate
	    while(simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex]
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
	    }

	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        }
	    }

	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    }
	}

	function remove(arr, index, key) {
	    arr.splice(index, 1)

	    return {
	        from: index,
	        key: key
	    }
	}

	function keyIndex(children) {
	    var keys = {}
	    var free = []
	    var length = children.length

	    for (var i = 0; i < length; i++) {
	        var child = children[i]

	        if (child.key) {
	            keys[child.key] = i
	        } else {
	            free.push(i)
	        }
	    }

	    return {
	        keys: keys,     // A hash of key name to index
	        free: free      // An array of unkeyed item indices
	    }
	}

	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch)
	        } else {
	            apply = [apply, patch]
	        }

	        return apply
	    } else {
	        return patch
	    }
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7)
	var isHook = __webpack_require__(8)

	module.exports = diffProps

	function diffProps(a, b) {
	    var diff

	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {}
	            diff[aKey] = undefined
	        }

	        var aValue = a[aKey]
	        var bValue = b[aKey]

	        if (aValue === bValue) {
	            continue
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {}
	                diff[aKey] = bValue
	            } else if (isHook(bValue)) {
	                 diff = diff || {}
	                 diff[aKey] = bValue
	            } else {
	                var objectDiff = diffProps(aValue, bValue)
	                if (objectDiff) {
	                    diff = diff || {}
	                    diff[aKey] = objectDiff
	                }
	            }
	        } else {
	            diff = diff || {}
	            diff[aKey] = bValue
	        }
	    }

	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {}
	            diff[bKey] = b[bKey]
	        }
	    }

	    return diff
	}

	function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value)
	  } else if (value.__proto__) {
	    return value.__proto__
	  } else if (value.constructor) {
	    return value.constructor.prototype
	  }
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(42);

	var VNode = __webpack_require__(50);
	var VText = __webpack_require__(51);
	var isVNode = __webpack_require__(9);
	var isVText = __webpack_require__(2);
	var isWidget = __webpack_require__(10);
	var isHook = __webpack_require__(8);
	var isVThunk = __webpack_require__(12);

	var parseTag = __webpack_require__(52);
	var softSetHook = __webpack_require__(54);
	var evHook = __webpack_require__(55);

	module.exports = h;

	function h(tagName, properties, children) {
	    var childNodes = [];
	    var tag, props, key, namespace;

	    if (!children && isChildren(properties)) {
	        children = properties;
	        props = {};
	    }

	    props = props || properties || {};
	    tag = parseTag(tagName, props);

	    // support keys
	    if (props.hasOwnProperty('key')) {
	        key = props.key;
	        props.key = undefined;
	    }

	    // support namespace
	    if (props.hasOwnProperty('namespace')) {
	        namespace = props.namespace;
	        props.namespace = undefined;
	    }

	    // fix cursor bug
	    if (tag === 'INPUT' &&
	        !namespace &&
	        props.hasOwnProperty('value') &&
	        props.value !== undefined &&
	        !isHook(props.value)
	    ) {
	        props.value = softSetHook(props.value);
	    }

	    transformProperties(props);

	    if (children !== undefined && children !== null) {
	        addChild(children, childNodes, tag, props);
	    }


	    return new VNode(tag, props, childNodes, key, namespace);
	}

	function addChild(c, childNodes, tag, props) {
	    if (typeof c === 'string') {
	        childNodes.push(new VText(c));
	    } else if (typeof c === 'number') {
	        childNodes.push(new VText(String(c)));
	    } else if (isChild(c)) {
	        childNodes.push(c);
	    } else if (isArray(c)) {
	        for (var i = 0; i < c.length; i++) {
	            addChild(c[i], childNodes, tag, props);
	        }
	    } else if (c === null || c === undefined) {
	        return;
	    } else {
	        throw UnexpectedVirtualElement({
	            foreignObject: c,
	            parentVnode: {
	                tagName: tag,
	                properties: props
	            }
	        });
	    }
	}

	function transformProperties(props) {
	    for (var propName in props) {
	        if (props.hasOwnProperty(propName)) {
	            var value = props[propName];

	            if (isHook(value)) {
	                continue;
	            }

	            if (propName.substr(0, 3) === 'ev-') {
	                // add ev-foo support
	                props[propName] = evHook(value);
	            }
	        }
	    }
	}

	function isChild(x) {
	    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
	}

	function isChildren(x) {
	    return typeof x === 'string' || isArray(x) || isChild(x);
	}

	function UnexpectedVirtualElement(data) {
	    var err = new Error();

	    err.type = 'virtual-hyperscript.unexpected.virtual-element';
	    err.message = 'Unexpected virtual child passed to h().\n' +
	        'Expected a VNode / Vthunk / VWidget / string but:\n' +
	        'got:\n' +
	        errorString(data.foreignObject) +
	        '.\n' +
	        'The parent vnode is:\n' +
	        errorString(data.parentVnode)
	        '\n' +
	        'Suggested fix: change your `h(..., [ ... ])` callsite.';
	    err.foreignObject = data.foreignObject;
	    err.parentVnode = data.parentVnode;

	    return err;
	}

	function errorString(obj) {
	    try {
	        return JSON.stringify(obj, null, '    ');
	    } catch (e) {
	        return String(obj);
	    }
	}


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(3)
	var isVNode = __webpack_require__(9)
	var isWidget = __webpack_require__(10)
	var isThunk = __webpack_require__(12)
	var isVHook = __webpack_require__(8)

	module.exports = VirtualNode

	var noProperties = {}
	var noChildren = []

	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null

	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks

	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }

	                hooks[propName] = property
	            }
	        }
	    }

	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0

	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }

	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }

	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }

	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}

	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(3)

	module.exports = VirtualText

	function VirtualText(text) {
	    this.text = String(text)
	}

	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var split = __webpack_require__(53);

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	module.exports = parseTag;

	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }

	    var noId = !(props.hasOwnProperty('id'));

	    var tagParts = split(tag, classIdSplit);
	    var tagName = null;

	    if (notClassId.test(tagParts[1])) {
	        tagName = 'DIV';
	    }

	    var classes, part, type, i;

	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i];

	        if (!part) {
	            continue;
	        }

	        type = part.charAt(0);

	        if (!tagName) {
	            tagName = part;
	        } else if (type === '.') {
	            classes = classes || [];
	            classes.push(part.substring(1, part.length));
	        } else if (type === '#' && noId) {
	            props.id = part.substring(1, part.length);
	        }
	    }

	    if (classes) {
	        if (props.className) {
	            classes.push(props.className);
	        }

	        props.className = classes.join(' ');
	    }

	    return props.namespace ? tagName : tagName.toUpperCase();
	}


/***/ },
/* 53 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */

	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {

	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;

	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };

	  return self;
	})();


/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	module.exports = SoftSetHook;

	function SoftSetHook(value) {
	    if (!(this instanceof SoftSetHook)) {
	        return new SoftSetHook(value);
	    }

	    this.value = value;
	}

	SoftSetHook.prototype.hook = function (node, propertyName) {
	    if (node[propertyName] !== this.value) {
	        node[propertyName] = this.value;
	    }
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EvStore = __webpack_require__(56);

	module.exports = EvHook;

	function EvHook(value) {
	    if (!(this instanceof EvHook)) {
	        return new EvHook(value);
	    }

	    this.value = value;
	}

	EvHook.prototype.hook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);

	    es[propName] = this.value;
	};

	EvHook.prototype.unhook = function(node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);

	    es[propName] = undefined;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var OneVersionConstraint = __webpack_require__(57);

	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);

	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

	module.exports = EvStore;

	function EvStore(elem) {
	    var hash = elem[hashKey];

	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }

	    return hash;
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Individual = __webpack_require__(58);

	module.exports = OneVersion;

	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';

	    var versionValue = Individual(enforceKey, version);

	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' +
	            moduleName + '.\n' +
	            'You already have version ' + versionValue +
	            ' installed.\n' +
	            'This means you cannot install version ' + version);
	    }

	    return Individual(key, defaultValue);
	}


/***/ },
/* 58 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/*global window, global*/

	var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};

	module.exports = Individual;

	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }

	    root[key] = value;

	    return value;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(42);

	var h = __webpack_require__(49);


	var SVGAttributeNamespace = __webpack_require__(60);
	var attributeHook = __webpack_require__(61);

	var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

	module.exports = svg;

	function svg(tagName, properties, children) {
	    if (!children && isChildren(properties)) {
	        children = properties;
	        properties = {};
	    }

	    properties = properties || {};

	    // set namespace for svg
	    properties.namespace = SVG_NAMESPACE;

	    var attributes = properties.attributes || (properties.attributes = {});

	    for (var key in properties) {
	        if (!properties.hasOwnProperty(key)) {
	            continue;
	        }

	        var namespace = SVGAttributeNamespace(key);

	        if (namespace === undefined) { // not a svg attribute
	            continue;
	        }

	        var value = properties[key];

	        if (typeof value !== 'string' &&
	            typeof value !== 'number' &&
	            typeof value !== 'boolean'
	        ) {
	            continue;
	        }

	        if (namespace !== null) { // namespaced attribute
	            properties[key] = attributeHook(namespace, value);
	            continue;
	        }

	        attributes[key] = value
	        properties[key] = undefined
	    }

	    return h(tagName, properties, children);
	}

	function isChildren(x) {
	    return typeof x === 'string' || isArray(x);
	}


/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	var DEFAULT_NAMESPACE = null;
	var EV_NAMESPACE = 'http://www.w3.org/2001/xml-events';
	var XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
	var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';

	// http://www.w3.org/TR/SVGTiny12/attributeTable.html
	// http://www.w3.org/TR/SVG/attindex.html
	var SVG_PROPERTIES = {
	    'about': DEFAULT_NAMESPACE,
	    'accent-height': DEFAULT_NAMESPACE,
	    'accumulate': DEFAULT_NAMESPACE,
	    'additive': DEFAULT_NAMESPACE,
	    'alignment-baseline': DEFAULT_NAMESPACE,
	    'alphabetic': DEFAULT_NAMESPACE,
	    'amplitude': DEFAULT_NAMESPACE,
	    'arabic-form': DEFAULT_NAMESPACE,
	    'ascent': DEFAULT_NAMESPACE,
	    'attributeName': DEFAULT_NAMESPACE,
	    'attributeType': DEFAULT_NAMESPACE,
	    'azimuth': DEFAULT_NAMESPACE,
	    'bandwidth': DEFAULT_NAMESPACE,
	    'baseFrequency': DEFAULT_NAMESPACE,
	    'baseProfile': DEFAULT_NAMESPACE,
	    'baseline-shift': DEFAULT_NAMESPACE,
	    'bbox': DEFAULT_NAMESPACE,
	    'begin': DEFAULT_NAMESPACE,
	    'bias': DEFAULT_NAMESPACE,
	    'by': DEFAULT_NAMESPACE,
	    'calcMode': DEFAULT_NAMESPACE,
	    'cap-height': DEFAULT_NAMESPACE,
	    'class': DEFAULT_NAMESPACE,
	    'clip': DEFAULT_NAMESPACE,
	    'clip-path': DEFAULT_NAMESPACE,
	    'clip-rule': DEFAULT_NAMESPACE,
	    'clipPathUnits': DEFAULT_NAMESPACE,
	    'color': DEFAULT_NAMESPACE,
	    'color-interpolation': DEFAULT_NAMESPACE,
	    'color-interpolation-filters': DEFAULT_NAMESPACE,
	    'color-profile': DEFAULT_NAMESPACE,
	    'color-rendering': DEFAULT_NAMESPACE,
	    'content': DEFAULT_NAMESPACE,
	    'contentScriptType': DEFAULT_NAMESPACE,
	    'contentStyleType': DEFAULT_NAMESPACE,
	    'cursor': DEFAULT_NAMESPACE,
	    'cx': DEFAULT_NAMESPACE,
	    'cy': DEFAULT_NAMESPACE,
	    'd': DEFAULT_NAMESPACE,
	    'datatype': DEFAULT_NAMESPACE,
	    'defaultAction': DEFAULT_NAMESPACE,
	    'descent': DEFAULT_NAMESPACE,
	    'diffuseConstant': DEFAULT_NAMESPACE,
	    'direction': DEFAULT_NAMESPACE,
	    'display': DEFAULT_NAMESPACE,
	    'divisor': DEFAULT_NAMESPACE,
	    'dominant-baseline': DEFAULT_NAMESPACE,
	    'dur': DEFAULT_NAMESPACE,
	    'dx': DEFAULT_NAMESPACE,
	    'dy': DEFAULT_NAMESPACE,
	    'edgeMode': DEFAULT_NAMESPACE,
	    'editable': DEFAULT_NAMESPACE,
	    'elevation': DEFAULT_NAMESPACE,
	    'enable-background': DEFAULT_NAMESPACE,
	    'end': DEFAULT_NAMESPACE,
	    'ev:event': EV_NAMESPACE,
	    'event': DEFAULT_NAMESPACE,
	    'exponent': DEFAULT_NAMESPACE,
	    'externalResourcesRequired': DEFAULT_NAMESPACE,
	    'fill': DEFAULT_NAMESPACE,
	    'fill-opacity': DEFAULT_NAMESPACE,
	    'fill-rule': DEFAULT_NAMESPACE,
	    'filter': DEFAULT_NAMESPACE,
	    'filterRes': DEFAULT_NAMESPACE,
	    'filterUnits': DEFAULT_NAMESPACE,
	    'flood-color': DEFAULT_NAMESPACE,
	    'flood-opacity': DEFAULT_NAMESPACE,
	    'focusHighlight': DEFAULT_NAMESPACE,
	    'focusable': DEFAULT_NAMESPACE,
	    'font-family': DEFAULT_NAMESPACE,
	    'font-size': DEFAULT_NAMESPACE,
	    'font-size-adjust': DEFAULT_NAMESPACE,
	    'font-stretch': DEFAULT_NAMESPACE,
	    'font-style': DEFAULT_NAMESPACE,
	    'font-variant': DEFAULT_NAMESPACE,
	    'font-weight': DEFAULT_NAMESPACE,
	    'format': DEFAULT_NAMESPACE,
	    'from': DEFAULT_NAMESPACE,
	    'fx': DEFAULT_NAMESPACE,
	    'fy': DEFAULT_NAMESPACE,
	    'g1': DEFAULT_NAMESPACE,
	    'g2': DEFAULT_NAMESPACE,
	    'glyph-name': DEFAULT_NAMESPACE,
	    'glyph-orientation-horizontal': DEFAULT_NAMESPACE,
	    'glyph-orientation-vertical': DEFAULT_NAMESPACE,
	    'glyphRef': DEFAULT_NAMESPACE,
	    'gradientTransform': DEFAULT_NAMESPACE,
	    'gradientUnits': DEFAULT_NAMESPACE,
	    'handler': DEFAULT_NAMESPACE,
	    'hanging': DEFAULT_NAMESPACE,
	    'height': DEFAULT_NAMESPACE,
	    'horiz-adv-x': DEFAULT_NAMESPACE,
	    'horiz-origin-x': DEFAULT_NAMESPACE,
	    'horiz-origin-y': DEFAULT_NAMESPACE,
	    'id': DEFAULT_NAMESPACE,
	    'ideographic': DEFAULT_NAMESPACE,
	    'image-rendering': DEFAULT_NAMESPACE,
	    'in': DEFAULT_NAMESPACE,
	    'in2': DEFAULT_NAMESPACE,
	    'initialVisibility': DEFAULT_NAMESPACE,
	    'intercept': DEFAULT_NAMESPACE,
	    'k': DEFAULT_NAMESPACE,
	    'k1': DEFAULT_NAMESPACE,
	    'k2': DEFAULT_NAMESPACE,
	    'k3': DEFAULT_NAMESPACE,
	    'k4': DEFAULT_NAMESPACE,
	    'kernelMatrix': DEFAULT_NAMESPACE,
	    'kernelUnitLength': DEFAULT_NAMESPACE,
	    'kerning': DEFAULT_NAMESPACE,
	    'keyPoints': DEFAULT_NAMESPACE,
	    'keySplines': DEFAULT_NAMESPACE,
	    'keyTimes': DEFAULT_NAMESPACE,
	    'lang': DEFAULT_NAMESPACE,
	    'lengthAdjust': DEFAULT_NAMESPACE,
	    'letter-spacing': DEFAULT_NAMESPACE,
	    'lighting-color': DEFAULT_NAMESPACE,
	    'limitingConeAngle': DEFAULT_NAMESPACE,
	    'local': DEFAULT_NAMESPACE,
	    'marker-end': DEFAULT_NAMESPACE,
	    'marker-mid': DEFAULT_NAMESPACE,
	    'marker-start': DEFAULT_NAMESPACE,
	    'markerHeight': DEFAULT_NAMESPACE,
	    'markerUnits': DEFAULT_NAMESPACE,
	    'markerWidth': DEFAULT_NAMESPACE,
	    'mask': DEFAULT_NAMESPACE,
	    'maskContentUnits': DEFAULT_NAMESPACE,
	    'maskUnits': DEFAULT_NAMESPACE,
	    'mathematical': DEFAULT_NAMESPACE,
	    'max': DEFAULT_NAMESPACE,
	    'media': DEFAULT_NAMESPACE,
	    'mediaCharacterEncoding': DEFAULT_NAMESPACE,
	    'mediaContentEncodings': DEFAULT_NAMESPACE,
	    'mediaSize': DEFAULT_NAMESPACE,
	    'mediaTime': DEFAULT_NAMESPACE,
	    'method': DEFAULT_NAMESPACE,
	    'min': DEFAULT_NAMESPACE,
	    'mode': DEFAULT_NAMESPACE,
	    'name': DEFAULT_NAMESPACE,
	    'nav-down': DEFAULT_NAMESPACE,
	    'nav-down-left': DEFAULT_NAMESPACE,
	    'nav-down-right': DEFAULT_NAMESPACE,
	    'nav-left': DEFAULT_NAMESPACE,
	    'nav-next': DEFAULT_NAMESPACE,
	    'nav-prev': DEFAULT_NAMESPACE,
	    'nav-right': DEFAULT_NAMESPACE,
	    'nav-up': DEFAULT_NAMESPACE,
	    'nav-up-left': DEFAULT_NAMESPACE,
	    'nav-up-right': DEFAULT_NAMESPACE,
	    'numOctaves': DEFAULT_NAMESPACE,
	    'observer': DEFAULT_NAMESPACE,
	    'offset': DEFAULT_NAMESPACE,
	    'opacity': DEFAULT_NAMESPACE,
	    'operator': DEFAULT_NAMESPACE,
	    'order': DEFAULT_NAMESPACE,
	    'orient': DEFAULT_NAMESPACE,
	    'orientation': DEFAULT_NAMESPACE,
	    'origin': DEFAULT_NAMESPACE,
	    'overflow': DEFAULT_NAMESPACE,
	    'overlay': DEFAULT_NAMESPACE,
	    'overline-position': DEFAULT_NAMESPACE,
	    'overline-thickness': DEFAULT_NAMESPACE,
	    'panose-1': DEFAULT_NAMESPACE,
	    'path': DEFAULT_NAMESPACE,
	    'pathLength': DEFAULT_NAMESPACE,
	    'patternContentUnits': DEFAULT_NAMESPACE,
	    'patternTransform': DEFAULT_NAMESPACE,
	    'patternUnits': DEFAULT_NAMESPACE,
	    'phase': DEFAULT_NAMESPACE,
	    'playbackOrder': DEFAULT_NAMESPACE,
	    'pointer-events': DEFAULT_NAMESPACE,
	    'points': DEFAULT_NAMESPACE,
	    'pointsAtX': DEFAULT_NAMESPACE,
	    'pointsAtY': DEFAULT_NAMESPACE,
	    'pointsAtZ': DEFAULT_NAMESPACE,
	    'preserveAlpha': DEFAULT_NAMESPACE,
	    'preserveAspectRatio': DEFAULT_NAMESPACE,
	    'primitiveUnits': DEFAULT_NAMESPACE,
	    'propagate': DEFAULT_NAMESPACE,
	    'property': DEFAULT_NAMESPACE,
	    'r': DEFAULT_NAMESPACE,
	    'radius': DEFAULT_NAMESPACE,
	    'refX': DEFAULT_NAMESPACE,
	    'refY': DEFAULT_NAMESPACE,
	    'rel': DEFAULT_NAMESPACE,
	    'rendering-intent': DEFAULT_NAMESPACE,
	    'repeatCount': DEFAULT_NAMESPACE,
	    'repeatDur': DEFAULT_NAMESPACE,
	    'requiredExtensions': DEFAULT_NAMESPACE,
	    'requiredFeatures': DEFAULT_NAMESPACE,
	    'requiredFonts': DEFAULT_NAMESPACE,
	    'requiredFormats': DEFAULT_NAMESPACE,
	    'resource': DEFAULT_NAMESPACE,
	    'restart': DEFAULT_NAMESPACE,
	    'result': DEFAULT_NAMESPACE,
	    'rev': DEFAULT_NAMESPACE,
	    'role': DEFAULT_NAMESPACE,
	    'rotate': DEFAULT_NAMESPACE,
	    'rx': DEFAULT_NAMESPACE,
	    'ry': DEFAULT_NAMESPACE,
	    'scale': DEFAULT_NAMESPACE,
	    'seed': DEFAULT_NAMESPACE,
	    'shape-rendering': DEFAULT_NAMESPACE,
	    'slope': DEFAULT_NAMESPACE,
	    'snapshotTime': DEFAULT_NAMESPACE,
	    'spacing': DEFAULT_NAMESPACE,
	    'specularConstant': DEFAULT_NAMESPACE,
	    'specularExponent': DEFAULT_NAMESPACE,
	    'spreadMethod': DEFAULT_NAMESPACE,
	    'startOffset': DEFAULT_NAMESPACE,
	    'stdDeviation': DEFAULT_NAMESPACE,
	    'stemh': DEFAULT_NAMESPACE,
	    'stemv': DEFAULT_NAMESPACE,
	    'stitchTiles': DEFAULT_NAMESPACE,
	    'stop-color': DEFAULT_NAMESPACE,
	    'stop-opacity': DEFAULT_NAMESPACE,
	    'strikethrough-position': DEFAULT_NAMESPACE,
	    'strikethrough-thickness': DEFAULT_NAMESPACE,
	    'string': DEFAULT_NAMESPACE,
	    'stroke': DEFAULT_NAMESPACE,
	    'stroke-dasharray': DEFAULT_NAMESPACE,
	    'stroke-dashoffset': DEFAULT_NAMESPACE,
	    'stroke-linecap': DEFAULT_NAMESPACE,
	    'stroke-linejoin': DEFAULT_NAMESPACE,
	    'stroke-miterlimit': DEFAULT_NAMESPACE,
	    'stroke-opacity': DEFAULT_NAMESPACE,
	    'stroke-width': DEFAULT_NAMESPACE,
	    'surfaceScale': DEFAULT_NAMESPACE,
	    'syncBehavior': DEFAULT_NAMESPACE,
	    'syncBehaviorDefault': DEFAULT_NAMESPACE,
	    'syncMaster': DEFAULT_NAMESPACE,
	    'syncTolerance': DEFAULT_NAMESPACE,
	    'syncToleranceDefault': DEFAULT_NAMESPACE,
	    'systemLanguage': DEFAULT_NAMESPACE,
	    'tableValues': DEFAULT_NAMESPACE,
	    'target': DEFAULT_NAMESPACE,
	    'targetX': DEFAULT_NAMESPACE,
	    'targetY': DEFAULT_NAMESPACE,
	    'text-anchor': DEFAULT_NAMESPACE,
	    'text-decoration': DEFAULT_NAMESPACE,
	    'text-rendering': DEFAULT_NAMESPACE,
	    'textLength': DEFAULT_NAMESPACE,
	    'timelineBegin': DEFAULT_NAMESPACE,
	    'title': DEFAULT_NAMESPACE,
	    'to': DEFAULT_NAMESPACE,
	    'transform': DEFAULT_NAMESPACE,
	    'transformBehavior': DEFAULT_NAMESPACE,
	    'type': DEFAULT_NAMESPACE,
	    'typeof': DEFAULT_NAMESPACE,
	    'u1': DEFAULT_NAMESPACE,
	    'u2': DEFAULT_NAMESPACE,
	    'underline-position': DEFAULT_NAMESPACE,
	    'underline-thickness': DEFAULT_NAMESPACE,
	    'unicode': DEFAULT_NAMESPACE,
	    'unicode-bidi': DEFAULT_NAMESPACE,
	    'unicode-range': DEFAULT_NAMESPACE,
	    'units-per-em': DEFAULT_NAMESPACE,
	    'v-alphabetic': DEFAULT_NAMESPACE,
	    'v-hanging': DEFAULT_NAMESPACE,
	    'v-ideographic': DEFAULT_NAMESPACE,
	    'v-mathematical': DEFAULT_NAMESPACE,
	    'values': DEFAULT_NAMESPACE,
	    'version': DEFAULT_NAMESPACE,
	    'vert-adv-y': DEFAULT_NAMESPACE,
	    'vert-origin-x': DEFAULT_NAMESPACE,
	    'vert-origin-y': DEFAULT_NAMESPACE,
	    'viewBox': DEFAULT_NAMESPACE,
	    'viewTarget': DEFAULT_NAMESPACE,
	    'visibility': DEFAULT_NAMESPACE,
	    'width': DEFAULT_NAMESPACE,
	    'widths': DEFAULT_NAMESPACE,
	    'word-spacing': DEFAULT_NAMESPACE,
	    'writing-mode': DEFAULT_NAMESPACE,
	    'x': DEFAULT_NAMESPACE,
	    'x-height': DEFAULT_NAMESPACE,
	    'x1': DEFAULT_NAMESPACE,
	    'x2': DEFAULT_NAMESPACE,
	    'xChannelSelector': DEFAULT_NAMESPACE,
	    'xlink:actuate': XLINK_NAMESPACE,
	    'xlink:arcrole': XLINK_NAMESPACE,
	    'xlink:href': XLINK_NAMESPACE,
	    'xlink:role': XLINK_NAMESPACE,
	    'xlink:show': XLINK_NAMESPACE,
	    'xlink:title': XLINK_NAMESPACE,
	    'xlink:type': XLINK_NAMESPACE,
	    'xml:base': XML_NAMESPACE,
	    'xml:id': XML_NAMESPACE,
	    'xml:lang': XML_NAMESPACE,
	    'xml:space': XML_NAMESPACE,
	    'y': DEFAULT_NAMESPACE,
	    'y1': DEFAULT_NAMESPACE,
	    'y2': DEFAULT_NAMESPACE,
	    'yChannelSelector': DEFAULT_NAMESPACE,
	    'z': DEFAULT_NAMESPACE,
	    'zoomAndPan': DEFAULT_NAMESPACE
	};

	module.exports = SVGAttributeNamespace;

	function SVGAttributeNamespace(value) {
	  if (SVG_PROPERTIES.hasOwnProperty(value)) {
	    return SVG_PROPERTIES[value];
	  }
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	module.exports = AttributeHook;

	function AttributeHook(namespace, value) {
	    if (!(this instanceof AttributeHook)) {
	        return new AttributeHook(namespace, value);
	    }

	    this.namespace = namespace;
	    this.value = value;
	}

	AttributeHook.prototype.hook = function (node, prop, prev) {
	    if (prev && prev.type === 'AttributeHook' &&
	        prev.value === this.value &&
	        prev.namespace === this.namespace) {
	        return;
	    }

	    node.setAttributeNS(this.namespace, prop, this.value);
	};

	AttributeHook.prototype.unhook = function (node, prop, next) {
	    if (next && next.type === 'AttributeHook' &&
	        next.namespace === this.namespace) {
	        return;
	    }

	    var colonPosition = prop.indexOf(':');
	    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
	    node.removeAttributeNS(this.namespace, localName);
	};

	AttributeHook.prototype.type = 'AttributeHook';


/***/ }
/******/ ])
});
;