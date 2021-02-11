// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graph = exports.worstTimeS = exports.bestTimeS = exports.average10 = exports.average5 = exports.averageS = exports.timeList = exports.scrambleScreen = exports.timeScreen = exports.mainDisplay = void 0;
var mainDisplay = document.querySelector('.display');
exports.mainDisplay = mainDisplay;
var timeScreen = document.querySelector('.time');
exports.timeScreen = timeScreen;
var scrambleScreen = document.querySelector('.scramble');
exports.scrambleScreen = scrambleScreen;
var timeList = document.querySelector('.timeList ul');
exports.timeList = timeList;
var averageS = document.querySelector('.avg span');
exports.averageS = averageS;
var average5 = document.querySelector('.avg5 span');
exports.average5 = average5;
var average10 = document.querySelector('.avg10 span');
exports.average10 = average10;
var bestTimeS = document.querySelector('.best span');
exports.bestTimeS = bestTimeS;
var worstTimeS = document.querySelector('.worst span');
exports.worstTimeS = worstTimeS;
var graph = document.querySelector('.figure canvas');
exports.graph = graph;
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeString = getTimeString;
exports.generateScramble = generateScramble;
exports.getAllTime = getAllTime;
exports.getMaxMin = getMaxMin;
exports.reCount = reCount;

var _elements = require("./elements");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getTimeString(time) {
  var minutes = Math.floor(time / 60000);
  var seconds = Math.floor(time / 1000 - minutes * 60);
  var miliseconds = Math.floor(time % 1000 / 10);
  return "".concat(minutes > 9 ? minutes : "0".concat(minutes), ":").concat(seconds > 9 ? seconds : "0".concat(seconds), ":").concat(miliseconds > 9 ? miliseconds : "0".concat(miliseconds));
}

function generateScramble(length) {
  var moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  var lastMove = "";
  var scramble = "";

  for (var _ = 0; _ < length; _++) {
    var move = moves[Math.floor(Math.random() * moves.length)];

    if (move === lastMove) {
      _--;
      continue;
    }

    lastMove = move;
    move += Math.floor(Math.random() * 2) === 1 ? "2 " : Math.floor(Math.random() * 2) === 1 ? "' " : ' ';
    scramble += move;
  }

  return scramble;
}

function getAllTime(timeList) {
  // const times = Array.from(timeList.querySelectorAll('li')).map( el => parseInt(el.dataset.time));
  var times = Object.values(timeList).map(function (ob) {
    return ob.time;
  }).reverse();
  console.log(times);
  return times;
}

function getMaxMin(times) {
  var min = Math.min.apply(Math, _toConsumableArray(times));
  var max = Math.max.apply(Math, _toConsumableArray(times));
  return [min, max];
}

function reCount() {
  var timesEl = Array.from(_elements.timeList.querySelectorAll('li span.count')).reverse();

  for (var i = 0; i < timesEl.length; i++) {
    timesEl[i].textContent = "".concat(i + 1);
  }
}
},{"./elements":"elements.js"}],"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incrementId = incrementId;
exports.currentId = exports.timesData = void 0;
var timesData = {};
exports.timesData = timesData;
var currentId = 0;
exports.currentId = currentId;

function incrementId() {
  exports.currentId = currentId = currentId + 1;
}
},{}],"lib.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayStats = displayStats;
exports.startSolve = startSolve;
exports.stopSolve = stopSolve;
exports.init = init;

var _elements = require("./elements");

var _utils = require("./utils");

var _handlers = require("./handlers");

var _data = require("./data");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var currentTime = 0;
var currentScramble;
var intervalId;

function displayTime(time) {
  _elements.timeScreen.textContent = (0, _utils.getTimeString)(currentTime);
}

function updateTime() {
  currentTime += 10;
  displayTime(currentTime);
}

function displayStats() {
  var times = (0, _utils.getAllTime)(_data.timesData);
  console.log(times);
  var avg = times.reduce(function (a, b) {
    return a + b;
  }, 0) / times.length;
  var avg5 = times.slice(0, 5).reduce(function (a, b) {
    return a + b;
  }, 0) / 5;
  var avg10 = times.slice(0, 10).reduce(function (a, b) {
    return a + b;
  }, 0) / 10;
  _elements.averageS.textContent = times.length > 0 ? (0, _utils.getTimeString)(avg) : '00:00:00';
  _elements.average5.textContent = times.length >= 5 ? (0, _utils.getTimeString)(avg5) : '-';
  _elements.average10.textContent = times.length >= 10 ? (0, _utils.getTimeString)(avg10) : '-';
  drawGraph(times);
  setBestWorst(times);
}

function drawGraph(times) {
  var allTimes = times.reverse();

  var _getMaxMin = (0, _utils.getMaxMin)(allTimes),
      _getMaxMin2 = _slicedToArray(_getMaxMin, 2),
      min = _getMaxMin2[0],
      max = _getMaxMin2[1];

  var height = _elements.graph.height;
  var width = _elements.graph.width;
  var yOffset = height / (max - min);
  var xOffset = width / (allTimes.length - 1);
  console.log("max: ".concat(max, "  min: ").concat(min, "  yOffset: ").concat(xOffset));

  var ctx = _elements.graph.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(0, (max - allTimes[0]) * yOffset);
  ctx.clearRect(0, 0, width, height);
  var x = 0;
  allTimes.forEach(function (time) {
    ctx.lineTo(x, (max - time) * yOffset);
    x += xOffset;
  });
  ctx.stroke();
}

function setBestWorst(times) {
  if (times.length > 0) {
    var _getMaxMin3 = (0, _utils.getMaxMin)(times),
        _getMaxMin4 = _slicedToArray(_getMaxMin3, 2),
        best = _getMaxMin4[0],
        worst = _getMaxMin4[1];

    _elements.bestTimeS.textContent = (0, _utils.getTimeString)(best);
    _elements.worstTimeS.textContent = (0, _utils.getTimeString)(worst);

    var bestEl = _elements.timeList.querySelector('.bestTime');

    bestEl && bestEl.classList.remove('bestTime');

    _elements.timeList.querySelector("[data-time=\"".concat(best, "\"]")).classList.add('bestTime');

    var worstEl = _elements.timeList.querySelector('.worstTime');

    worstEl && worstEl.classList.remove('worstTime');

    _elements.timeList.querySelector("[data-time=\"".concat(worst, "\"]")).classList.add('worstTime');

    _elements.bestTimeS.textContent = (0, _utils.getTimeString)(best);
    _elements.worstTimeS.textContent = (0, _utils.getTimeString)(worst);
  } else {
    _elements.bestTimeS.textContent = '-';
    _elements.worstTimeS.textContent = '-';
  }
}

function addTime(time) {
  var lastTimeCount = _elements.timeList.querySelector('li span.count');

  var timeCount = "<span class=\"count\">".concat(lastTimeCount ? parseInt(lastTimeCount.textContent) + 1 : '1', "</span>");
  var timeButtons = "<span class=\"buttons clearfix\"><button class=\"deleteTime\">X</button><button>+2</button><button>DNF</button></span>";
  var timeHtml = "<li data-time=\"".concat(currentTime, "\" data-id=\"").concat(_data.currentId, "\">").concat(timeCount).concat((0, _utils.getTimeString)(time)).concat(timeButtons, "</li>");

  _elements.timeList.insertAdjacentHTML('afterbegin', timeHtml);

  var timeEl = _elements.timeList.querySelector('.deleteTime');

  timeEl.addEventListener('click', _handlers.handleDeleteTime);
  _data.timesData["".concat(_data.currentId)] = {
    'time': currentTime,
    'scramble': currentScramble
  };
  (0, _data.incrementId)();
  console.table(_data.timesData);
}

function startSolve() {
  currentTime = 0;
  intervalId = setInterval(updateTime, 10);
  _elements.mainDisplay.style.backgroundColor = 'var(--startColor)';
}

function stopSolve() {
  clearInterval(intervalId);
  addTime(currentTime);
  displayStats();
  currentScramble = (0, _utils.generateScramble)(15);
  _elements.scrambleScreen.textContent = currentScramble;
  _elements.mainDisplay.style.backgroundColor = 'var(--defaultColor)';
}

function init() {
  currentScramble = (0, _utils.generateScramble)(15);
  _elements.scrambleScreen.textContent = currentScramble;
}
},{"./elements":"elements.js","./utils":"utils.js","./handlers":"handlers.js","./data":"data.js"}],"handlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClickStart = handleClickStart;
exports.handleClickStop = handleClickStop;
exports.handleDeleteTime = handleDeleteTime;

var _lib = require("./lib");

var _elements = require("./elements");

var _utils = require("./utils");

var _data = require("./data");

var isStart = false;
var isPossiblyNextSolve = true;
var timeOffset = 400;
var timeOffsetHandler = false;
var isTimeOffset = false;

function prepareToSolve() {
  isTimeOffset = true;
  _elements.mainDisplay.style.backgroundColor = 'var(--readyColor)';
}

function handleClickStart(e) {
  e.preventDefault();

  if (e.code == 'Space' || e.type == 'mouseup') {
    if (!isStart && isTimeOffset && isPossiblyNextSolve) {
      isStart = true;
      (0, _lib.startSolve)();
    }

    if (!isTimeOffset) {
      clearTimeout(timeOffsetHandler);
      _elements.mainDisplay.style.backgroundColor = 'var(--defaultColor)';
      isTimeOffset = false;
    }

    isPossiblyNextSolve = true;
  }
}

function handleClickStop(e) {
  e.preventDefault();

  if (isStart && (e.code == 'Space' || e.type == 'mousedown')) {
    (0, _lib.stopSolve)();
    isStart = false;
    isPossiblyNextSolve = false;
    isTimeOffset = false;
  } else if (!isTimeOffset && isPossiblyNextSolve && (e.code == 'Space' || e.type == 'mousedown')) {
    _elements.mainDisplay.style.backgroundColor = 'var(--waitColor)';
    timeOffsetHandler = setTimeout(prepareToSolve, timeOffset);
  }
}

function handleDeleteTime(e) {
  var el = e.currentTarget.closest('li');
  delete _data.timesData[el.dataset.id];
  el.remove();
  (0, _utils.reCount)();
  (0, _lib.displayStats)();
}
},{"./lib":"lib.js","./elements":"elements.js","./utils":"utils.js","./data":"data.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _handlers = require("./handlers");

var _elements = require("./elements");

var _lib = require("./lib");

(0, _lib.init)();

_elements.timeScreen.addEventListener('mouseup', _handlers.handleClickStart);

window.addEventListener('keyup', _handlers.handleClickStart);
$('.time').mousedown(_handlers.handleClickStop);
window.addEventListener('keydown', _handlers.handleClickStop);
},{"./handlers":"handlers.js","./elements":"elements.js","./lib":"lib.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40215" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map