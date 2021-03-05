'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var clientJs = require('@open-rpc/client-js');
var EthUtil = require('ethereumjs-util');
var EtherWallet = _interopDefault(require('ethereumjs-wallet'));
var ethers = require('ethers');
var elliptic = _interopDefault(require('elliptic'));
var jsSha3 = require('js-sha3');
var BN$1 = _interopDefault(require('bn.js'));
var utf8 = _interopDefault(require('utf8'));
var numberToBN = _interopDefault(require('number-to-bn'));
var lodash = require('lodash');
var abiJs = _interopDefault(require('ethereumjs-abi'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

// This was ported from https://github.com/emn178/js-sha3, with some minor
// modifications and pruning. It is licensed under MIT:
//
// Copyright 2015-2016 Chen, Yi-Cyuan
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var HEX_CHARS = /*#__PURE__*/'0123456789abcdef'.split('');
var KECCAK_PADDING = [1, 256, 65536, 16777216];
var SHIFT = [0, 8, 16, 24];
var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

var Keccak = function Keccak(bits) {
  return {
    blocks: [],
    reset: true,
    block: 0,
    start: 0,
    blockCount: 1600 - (bits << 1) >> 5,
    outputBlocks: bits >> 5,
    s: function (s) {
      return [].concat(s, s, s, s, s);
    }([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  };
};

var update = function update(state, message) {
  var length = message.length,
      blocks = state.blocks,
      byteCount = state.blockCount << 2,
      blockCount = state.blockCount,
      outputBlocks = state.outputBlocks,
      s = state.s;
  var index = 0,
      i,
      code; // update

  while (index < length) {
    if (state.reset) {
      state.reset = false;
      blocks[0] = state.block;

      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }

    if (typeof message !== 'string') {
      for (i = state.start; index < length && i < byteCount; ++index) {
        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
      }
    } else {
      for (i = state.start; index < length && i < byteCount; ++index) {
        code = message.charCodeAt(index);

        if (code < 0x80) {
          blocks[i >> 2] |= code << SHIFT[i++ & 3];
        } else if (code < 0x800) {
          blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        } else if (code < 0xd800 || code >= 0xe000) {
          blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
          blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        }
      }
    }

    state.lastByteIndex = i;

    if (i >= byteCount) {
      state.start = i - byteCount;
      state.block = blocks[blockCount];

      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }

      f(s);
      state.reset = true;
    } else {
      state.start = i;
    }
  } // finalize


  i = state.lastByteIndex;
  blocks[i >> 2] |= KECCAK_PADDING[i & 3];

  if (state.lastByteIndex === byteCount) {
    blocks[0] = blocks[blockCount];

    for (i = 1; i < blockCount + 1; ++i) {
      blocks[i] = 0;
    }
  }

  blocks[blockCount - 1] |= 0x80000000;

  for (i = 0; i < blockCount; ++i) {
    s[i] ^= blocks[i];
  }

  f(s); // toString

  var hex = '',
      j = 0,
      block;
  i = 0;

  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      block = s[i];
      hex += HEX_CHARS[block >> 4 & 0x0f] + HEX_CHARS[block & 0x0f] + HEX_CHARS[block >> 12 & 0x0f] + HEX_CHARS[block >> 8 & 0x0f] + HEX_CHARS[block >> 20 & 0x0f] + HEX_CHARS[block >> 16 & 0x0f] + HEX_CHARS[block >> 28 & 0x0f] + HEX_CHARS[block >> 24 & 0x0f];
    }

    if (j % blockCount === 0) {
      f(s);
      i = 0;
    }
  }

  return '0x' + hex;
};

var f = function f(s) {
  var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

  for (n = 0; n < 48; n += 2) {
    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
    h = c8 ^ (c2 << 1 | c3 >>> 31);
    l = c9 ^ (c3 << 1 | c2 >>> 31);
    s[0] ^= h;
    s[1] ^= l;
    s[10] ^= h;
    s[11] ^= l;
    s[20] ^= h;
    s[21] ^= l;
    s[30] ^= h;
    s[31] ^= l;
    s[40] ^= h;
    s[41] ^= l;
    h = c0 ^ (c4 << 1 | c5 >>> 31);
    l = c1 ^ (c5 << 1 | c4 >>> 31);
    s[2] ^= h;
    s[3] ^= l;
    s[12] ^= h;
    s[13] ^= l;
    s[22] ^= h;
    s[23] ^= l;
    s[32] ^= h;
    s[33] ^= l;
    s[42] ^= h;
    s[43] ^= l;
    h = c2 ^ (c6 << 1 | c7 >>> 31);
    l = c3 ^ (c7 << 1 | c6 >>> 31);
    s[4] ^= h;
    s[5] ^= l;
    s[14] ^= h;
    s[15] ^= l;
    s[24] ^= h;
    s[25] ^= l;
    s[34] ^= h;
    s[35] ^= l;
    s[44] ^= h;
    s[45] ^= l;
    h = c4 ^ (c8 << 1 | c9 >>> 31);
    l = c5 ^ (c9 << 1 | c8 >>> 31);
    s[6] ^= h;
    s[7] ^= l;
    s[16] ^= h;
    s[17] ^= l;
    s[26] ^= h;
    s[27] ^= l;
    s[36] ^= h;
    s[37] ^= l;
    s[46] ^= h;
    s[47] ^= l;
    h = c6 ^ (c0 << 1 | c1 >>> 31);
    l = c7 ^ (c1 << 1 | c0 >>> 31);
    s[8] ^= h;
    s[9] ^= l;
    s[18] ^= h;
    s[19] ^= l;
    s[28] ^= h;
    s[29] ^= l;
    s[38] ^= h;
    s[39] ^= l;
    s[48] ^= h;
    s[49] ^= l;
    b0 = s[0];
    b1 = s[1];
    b32 = s[11] << 4 | s[10] >>> 28;
    b33 = s[10] << 4 | s[11] >>> 28;
    b14 = s[20] << 3 | s[21] >>> 29;
    b15 = s[21] << 3 | s[20] >>> 29;
    b46 = s[31] << 9 | s[30] >>> 23;
    b47 = s[30] << 9 | s[31] >>> 23;
    b28 = s[40] << 18 | s[41] >>> 14;
    b29 = s[41] << 18 | s[40] >>> 14;
    b20 = s[2] << 1 | s[3] >>> 31;
    b21 = s[3] << 1 | s[2] >>> 31;
    b2 = s[13] << 12 | s[12] >>> 20;
    b3 = s[12] << 12 | s[13] >>> 20;
    b34 = s[22] << 10 | s[23] >>> 22;
    b35 = s[23] << 10 | s[22] >>> 22;
    b16 = s[33] << 13 | s[32] >>> 19;
    b17 = s[32] << 13 | s[33] >>> 19;
    b48 = s[42] << 2 | s[43] >>> 30;
    b49 = s[43] << 2 | s[42] >>> 30;
    b40 = s[5] << 30 | s[4] >>> 2;
    b41 = s[4] << 30 | s[5] >>> 2;
    b22 = s[14] << 6 | s[15] >>> 26;
    b23 = s[15] << 6 | s[14] >>> 26;
    b4 = s[25] << 11 | s[24] >>> 21;
    b5 = s[24] << 11 | s[25] >>> 21;
    b36 = s[34] << 15 | s[35] >>> 17;
    b37 = s[35] << 15 | s[34] >>> 17;
    b18 = s[45] << 29 | s[44] >>> 3;
    b19 = s[44] << 29 | s[45] >>> 3;
    b10 = s[6] << 28 | s[7] >>> 4;
    b11 = s[7] << 28 | s[6] >>> 4;
    b42 = s[17] << 23 | s[16] >>> 9;
    b43 = s[16] << 23 | s[17] >>> 9;
    b24 = s[26] << 25 | s[27] >>> 7;
    b25 = s[27] << 25 | s[26] >>> 7;
    b6 = s[36] << 21 | s[37] >>> 11;
    b7 = s[37] << 21 | s[36] >>> 11;
    b38 = s[47] << 24 | s[46] >>> 8;
    b39 = s[46] << 24 | s[47] >>> 8;
    b30 = s[8] << 27 | s[9] >>> 5;
    b31 = s[9] << 27 | s[8] >>> 5;
    b12 = s[18] << 20 | s[19] >>> 12;
    b13 = s[19] << 20 | s[18] >>> 12;
    b44 = s[29] << 7 | s[28] >>> 25;
    b45 = s[28] << 7 | s[29] >>> 25;
    b26 = s[38] << 8 | s[39] >>> 24;
    b27 = s[39] << 8 | s[38] >>> 24;
    b8 = s[48] << 14 | s[49] >>> 18;
    b9 = s[49] << 14 | s[48] >>> 18;
    s[0] = b0 ^ ~b2 & b4;
    s[1] = b1 ^ ~b3 & b5;
    s[10] = b10 ^ ~b12 & b14;
    s[11] = b11 ^ ~b13 & b15;
    s[20] = b20 ^ ~b22 & b24;
    s[21] = b21 ^ ~b23 & b25;
    s[30] = b30 ^ ~b32 & b34;
    s[31] = b31 ^ ~b33 & b35;
    s[40] = b40 ^ ~b42 & b44;
    s[41] = b41 ^ ~b43 & b45;
    s[2] = b2 ^ ~b4 & b6;
    s[3] = b3 ^ ~b5 & b7;
    s[12] = b12 ^ ~b14 & b16;
    s[13] = b13 ^ ~b15 & b17;
    s[22] = b22 ^ ~b24 & b26;
    s[23] = b23 ^ ~b25 & b27;
    s[32] = b32 ^ ~b34 & b36;
    s[33] = b33 ^ ~b35 & b37;
    s[42] = b42 ^ ~b44 & b46;
    s[43] = b43 ^ ~b45 & b47;
    s[4] = b4 ^ ~b6 & b8;
    s[5] = b5 ^ ~b7 & b9;
    s[14] = b14 ^ ~b16 & b18;
    s[15] = b15 ^ ~b17 & b19;
    s[24] = b24 ^ ~b26 & b28;
    s[25] = b25 ^ ~b27 & b29;
    s[34] = b34 ^ ~b36 & b38;
    s[35] = b35 ^ ~b37 & b39;
    s[44] = b44 ^ ~b46 & b48;
    s[45] = b45 ^ ~b47 & b49;
    s[6] = b6 ^ ~b8 & b0;
    s[7] = b7 ^ ~b9 & b1;
    s[16] = b16 ^ ~b18 & b10;
    s[17] = b17 ^ ~b19 & b11;
    s[26] = b26 ^ ~b28 & b20;
    s[27] = b27 ^ ~b29 & b21;
    s[36] = b36 ^ ~b38 & b30;
    s[37] = b37 ^ ~b39 & b31;
    s[46] = b46 ^ ~b48 & b40;
    s[47] = b47 ^ ~b49 & b41;
    s[8] = b8 ^ ~b0 & b2;
    s[9] = b9 ^ ~b1 & b3;
    s[18] = b18 ^ ~b10 & b12;
    s[19] = b19 ^ ~b11 & b13;
    s[28] = b28 ^ ~b20 & b22;
    s[29] = b29 ^ ~b21 & b23;
    s[38] = b38 ^ ~b30 & b32;
    s[39] = b39 ^ ~b31 & b33;
    s[48] = b48 ^ ~b40 & b42;
    s[49] = b49 ^ ~b41 & b43;
    s[0] ^= RC[n];
    s[1] ^= RC[n + 1];
  }
};

var keccak = function keccak(bits) {
  return function (str) {
    var msg;

    if (str.slice(0, 2) === '0x') {
      msg = [];

      for (var i = 2, l = str.length; i < l; i += 2) {
        msg.push(parseInt(str.slice(i, i + 2), 16));
      }
    } else {
      msg = str;
    }

    return update(Keccak(bits), msg);
  };
};

var keccak256 = /*#__PURE__*/keccak(256);
var keccak256s = /*#__PURE__*/keccak(256);

var BN = /*#__PURE__*/require('bn.js');

var fromString = function fromString(str) {
  var bn = '0x' + (str.slice(0, 2) === '0x' ? new BN(str.slice(2), 16) : new BN(str, 10)).toString('hex');
  return bn === '0x0' ? '0x' : bn;
};

var fromNumber = function fromNumber(a) {
  return typeof a === 'string' ? /^0x/.test(a) ? a : '0x' + a : '0x' + new BN(a).toString('hex');
};

var at = function at(bytes, index) {
  return parseInt(bytes.slice(index * 2 + 2, index * 2 + 4), 16);
};

var random = function random(bytes) {
  var rnd;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) rnd = window.crypto.getRandomValues(new Uint8Array(bytes));else if (typeof require !== 'undefined') rnd = require('crypto').randomBytes(bytes);else throw new Error('Safe random numbers not available.');
  var hex = '0x';

  for (var i = 0; i < bytes; ++i) {
    hex += ('00' + rnd[i].toString(16)).slice(-2);
  }

  return hex;
};

var length = function length(a) {
  return (a.length - 2) / 2;
};

var flatten = function flatten(a) {
  return '0x' + a.reduce(function (r, s) {
    return r + s.slice(2);
  }, '');
};

var slice = function slice(i, j, bs) {
  return '0x' + bs.slice(i * 2 + 2, j * 2 + 2);
};

var reverse = function reverse(hex) {
  var rev = '0x';

  for (var i = 0, l = length(hex); i < l; ++i) {
    rev += hex.slice((l - i) * 2, (l - i + 1) * 2);
  }

  return rev;
};

var pad = function pad(l, hex) {
  return hex.length === l * 2 + 2 ? hex : pad(l, "0x0" + hex.slice(2));
};

var padRight = function padRight(l, hex) {
  return hex.length === l * 2 + 2 ? hex : padRight(l, hex + '0');
};

var toArray = function toArray(hex) {
  var arr = [];

  for (var i = 2, l = hex.length; i < l; i += 2) {
    arr.push(parseInt(hex.slice(i, i + 2), 16));
  }

  return arr;
};

var fromArray = function fromArray(arr) {
  var hex = '0x';

  for (var i = 0, l = arr.length; i < l; ++i) {
    var b = arr[i];
    hex += (b < 16 ? '0' : '') + b.toString(16);
  }

  return hex;
};

var toUint8Array = function toUint8Array(hex) {
  return new Uint8Array(toArray(hex));
};

var fromUint8Array = function fromUint8Array(arr) {
  return fromArray([].slice.call(arr, 0));
};

var fromNumber$1 = function fromNumber(num) {
  var hex = num.toString(16);
  return hex.length % 2 === 0 ? '0x' + hex : '0x0' + hex;
};

var toNumber = function toNumber(hex) {
  return parseInt(hex.slice(2), 16);
};

var concat = function concat(a, b) {
  return a.concat(b.slice(2));
};

var fromNat = function fromNat(bn) {
  return bn === '0x0' ? '0x' : bn.length % 2 === 0 ? bn : '0x0' + bn.slice(2);
};

var toNat = function toNat(bn) {
  return bn[2] === '0' ? '0x' + bn.slice(3) : bn;
};

var fromAscii = function fromAscii(ascii) {
  var hex = '0x';

  for (var i = 0; i < ascii.length; ++i) {
    hex += ('00' + ascii.charCodeAt(i).toString(16)).slice(-2);
  }

  return hex;
};

var toAscii = function toAscii(hex) {
  var ascii = '';

  for (var i = 2; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }

  return ascii;
}; // From https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330


var fromString$1 = function fromString(s) {
  var makeByte = function makeByte(uint8) {
    var b = uint8.toString(16);
    return b.length < 2 ? '0' + b : b;
  };

  var bytes = '0x';

  for (var ci = 0; ci !== s.length; ci++) {
    var c = s.charCodeAt(ci);

    if (c < 128) {
      bytes += makeByte(c);
      continue;
    }

    if (c < 2048) {
      bytes += makeByte(c >> 6 | 192);
    } else {
      if (c > 0xd7ff && c < 0xdc00) {
        if (++ci === s.length) return null;
        var c2 = s.charCodeAt(ci);
        if (c2 < 0xdc00 || c2 > 0xdfff) return null;
        c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
        bytes += makeByte(c >> 18 | 240);
        bytes += makeByte(c >> 12 & 63 | 128);
      } else {
        // c <= 0xffff
        bytes += makeByte(c >> 12 | 224);
      }

      bytes += makeByte(c >> 6 & 63 | 128);
    }

    bytes += makeByte(c & 63 | 128);
  }

  return bytes;
};

var toString = function toString(bytes) {
  var s = '';
  var i = 0;
  var l = length(bytes);

  while (i < l) {
    var c = at(bytes, i++);

    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= l) return null;
        c = (c & 31) << 6 | at(bytes, i) & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= l) return null;
        c = (c & 15) << 12 | (at(bytes, i) & 63) << 6 | at(bytes, ++i) & 63;
      } else if (c > 239 && c < 248) {
        if (i + 2 >= l) return null;
        c = (c & 7) << 18 | (at(bytes, i) & 63) << 12 | (at(bytes, ++i) & 63) << 6 | at(bytes, ++i) & 63;
      } else return null;

      ++i;
    }

    if (c <= 0xffff) s += String.fromCharCode(c);else if (c <= 0x10ffff) {
      c -= 0x10000;
      s += String.fromCharCode(c >> 10 | 0xd800);
      s += String.fromCharCode(c & 0x3ff | 0xdc00);
    } else return null;
  }

  return s;
};
var Bytes = {
  random: random,
  length: length,
  concat: concat,
  flatten: flatten,
  slice: slice,
  reverse: reverse,
  pad: pad,
  padRight: padRight,
  fromAscii: fromAscii,
  toAscii: toAscii,
  fromString: fromString$1,
  toString: toString,
  fromNumber: fromNumber$1,
  toNumber: toNumber,
  fromNat: fromNat,
  toNat: toNat,
  fromArray: fromArray,
  toArray: toArray,
  fromUint8Array: fromUint8Array,
  toUint8Array: toUint8Array
};

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */

var intToBuffer = function intToBuffer(i) {
  var hex = intToHex(i);
  return Buffer.from(padToEven(hex.slice(2)), 'hex');
};
/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */

var intToHex = function intToHex(i) {
  var hex = i.toString(16); // eslint-disable-line

  return "0x" + hex;
};

/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */

var isHexString = function isHexString(value, length) {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
};
var isHexStrict = function isHexStrict(hex) {
  return (lodash.isString(hex) || lodash.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};
var isHexPrefixed = function isHexPrefixed(str) {
  if (typeof str !== 'string') {
    return false;
  }

  return str.slice(0, 2) === '0x';
};
var stripHexPrefix = function stripHexPrefix(str) {
  return isHexPrefixed(str) ? str.slice(2) : str;
};

var toBuffer = function toBuffer(v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN$1.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }

  return v;
};

var padToEven = function padToEven(value) {
  if (typeof value !== 'string') {
    throw new Error("while padding to even, value must be string, is currently [" + typeof value + "], while padToEven.");
  }

  if (value.length % 2) {
    return "0" + value;
  }

  return value;
};

var zeros = function zeros(bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
};

var setLength = function setLength(msg, length, right) {
  var buf = zeros(length);
  msg = toBuffer(msg);

  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }

    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }

    return msg.slice(-length);
  }
};

var setLengthRight = function setLengthRight(msg, length) {
  return setLength(msg, length, true);
};
var SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
var sha3 = function sha3(value) {
  if (isBN(value)) {
    value = value.toString();
  }

  if (isHexStrict(value) && /^0x/i.test(value.toString())) {
    value = hexToBytes(value);
  }

  var returnValue = jsSha3.keccak256(value); // jshint ignore:line

  if (returnValue === SHA3_NULL_S) {
    return null;
  } else {
    return returnValue;
  }
};
/**
 * Convert a hex string to a byte array
 *
 * Note: Implementation from crypto-js
 *
 * @method hexToBytes
 * @param {string} hex
 * @return {Array} the byte array
 */

var hexToBytes = function hexToBytes(hex) {
  hex = hex.toString(16);

  if (!isHexStrict(hex)) {
    throw new Error('Given value "' + hex + '" is not a valid hex string.');
  }

  hex = hex.replace(/^0x/i, '');
  var bytes = [];

  for (var c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }

  return bytes;
};

var isBN = function isBN(object) {
  return object instanceof BN$1 || object && object.constructor && object.constructor.name === 'BN';
};

var isBigNumber = function isBigNumber(object) {
  return object && (object instanceof BN$1 || object.constructor && object.constructor.name === 'BigNumber');
};

var utf8ToHex = function utf8ToHex(str) {
  str = utf8.encode(str);
  var hex = ''; // remove \u0000 padding from either side

  str = str.replace(/^(?:\u0000)*/, '');
  str = str.split('').reverse().join('');
  str = str.replace(/^(?:\u0000)*/, '');
  str = str.split('').reverse().join('');

  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i); // if (code !== 0) {

    var n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n; // }
  }

  return '0x' + hex;
};
var toBN = function toBN(number) {
  try {
    return numberToBN(number);
  } catch (e) {
    throw new Error(e + ' Given value: "' + number + '"');
  }
};
var numberToHex = function numberToHex(value) {
  if (value === null || value === undefined) {
    return value;
  }

  if (!isFinite(value) && !isHexStrict(value)) {
    throw new Error('Given input "' + value + '" is not a number.');
  }

  var number = toBN(value);
  var result = number.toString(16);
  return number.lt(new BN$1(0)) ? '-0x' + result.substr(1) : '0x' + result;
};
var toHex = function toHex(value, returnType) {
  if (returnType === void 0) {
    returnType = false;
  }

  /*jshint maxcomplexity: false */
  if (isAddress(value)) {
    return returnType ? 'address' : '0x' + value.toLowerCase().replace(/^0x/i, '');
  }

  if (lodash.isBoolean(value)) {
    return returnType ? 'bool' : value ? '0x01' : '0x00';
  }

  if (lodash.isObject(value) && !isBigNumber(value) && !isBN(value)) {
    return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
  } // if its a negative number, pass it through numberToHex


  if (lodash.isString(value)) {
    if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
      return returnType ? 'int256' : numberToHex(value);
    } else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
      return returnType ? 'bytes' : value;
    }
  }

  return returnType ? value < 0 ? 'int256' : 'uint256' : numberToHex(value);
};
var removeTrailingZeros = function removeTrailingZeros(value) {
  var regEx1 = /^[0]+/;
  var regEx2 = /[0]+$/;
  var regEx3 = /[.]$/;
  var valueInString = value.toString();
  var after = valueInString.replace(regEx1, ''); // Remove leading 0's

  if (after.indexOf('.') > -1) {
    after = after.replace(regEx2, ''); // Remove trailing 0's
  }

  after = after.replace(regEx3, ''); // Remove trailing decimal

  if (after.indexOf('.') === 0) {
    after = '0' + after;
  }

  return after ? after : 0;
};
var numberToString = function numberToString(arg) {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error("while converting number to string, invalid number value '" + arg + "', should be a number matching (^-?[0-9.]+).");
    }

    return arg;
  } else if (typeof arg === 'number') {
    return String(arg);
  } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else {
      return arg.toString(10);
    }
  }

  throw new Error("while converting number to string, invalid number value '" + arg + "' type " + typeof arg + ".");
};

var secp256k1 = /*#__PURE__*/new elliptic.ec('secp256k1');
var toChecksum = function toChecksum(address) {
  if (typeof address === 'undefined') return '';

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error('Given address "' + address + '" is not a valid Kardiachain address.');
  }

  address = address.toLowerCase().replace(/^0x/i, '');
  var addressHash = keccak256(address).replace(/^0x/i, '');
  var checksumAddress = '0x';

  for (var i = 0; i < address.length; i++) {
    checksumAddress += parseInt(addressHash[i], 16) > 7 ? address[i].toUpperCase() : address[i];
  }

  return checksumAddress;
};
var checkAddressChecksum = function checkAddressChecksum(address) {
  try {
    // Check each case
    address = address.replace(/^0x/i, '');
    var sha3Result = sha3(address.toLowerCase());
    if (sha3Result === null) return false;
    var addressHash = sha3Result.replace(/^0x/i, '');

    for (var i = 0; i < 40; i++) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i] || parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i]) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
};
var isAddress = function isAddress(address) {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false; // If it's ALL lowercase or ALL upppercase
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
    return true; // Otherwise check each case
  } else {
    return checkAddressChecksum(address);
  }
};
var fromPrivate = function fromPrivate(privateKey) {
  var buffer = Buffer.from(privateKey.slice(2), 'hex');
  var ecKey = secp256k1.keyFromPrivate(buffer);
  var publicKey = '0x' + ecKey.getPublic(false, 'hex').slice(2);
  var publicHash = keccak256(publicKey);
  var address = toChecksum('0x' + publicHash.slice(-40));
  return {
    address: address,
    privateKey: privateKey
  };
};

var encodeSignature = function encodeSignature(_ref) {
  var v = _ref[0],
      r = _ref[1],
      s = _ref[2];
  return Bytes.flatten([r, s, v]);
};

var decodeSignature = function decodeSignature(hex) {
  return [Bytes.slice(64, Bytes.length(hex), hex), Bytes.slice(0, 32, hex), Bytes.slice(32, 64, hex)];
};

var makeSigner = function makeSigner(addToV) {
  return function (hash, privateKey) {
    var signature = secp256k1.keyFromPrivate(Buffer.from(privateKey.slice(2), 'hex')).sign(Buffer.from(hash.slice(2), 'hex'), {
      canonical: true
    });
    var number = 0;
    if (signature) number = signature.recoveryParam;
    return encodeSignature([fromString(Bytes.fromNumber(addToV + number)), Bytes.pad(32, Bytes.fromNat('0x' + signature.r.toString(16))), Bytes.pad(32, Bytes.fromNat('0x' + signature.s.toString(16)))]);
  };
};

var trimLeadingZero = function trimLeadingZero(hex) {
  while (hex && hex.startsWith('0x0')) {
    hex = '0x' + hex.slice(3);
  }

  return hex;
};
var makeEven = function makeEven(hex) {
  if (hex.length % 2 === 1) {
    hex = hex.replace('0x', '0x0');
  }

  return hex;
};
var sign = /*#__PURE__*/makeSigner(27);

var KardiaAccount = /*#__PURE__*/function () {
  function KardiaAccount(_ref) {
    var client = _ref.client;
    this._rpcClient = client;
  }

  var _proto = KardiaAccount.prototype;

  _proto.getBalance = /*#__PURE__*/function () {
    var _getBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(address, options) {
      var params;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = [address];

              if (options && options.blockHash) {
                params.push(options.blockHash);
              } else if (options && options.blockHeight) {
                params.push(options.blockHeight);
              } else {
                params.push('latest');
              }

              _context.next = 4;
              return this._rpcClient.request({
                method: 'account_balance',
                params: params
              });

            case 4:
              return _context.abrupt("return", _context.sent);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getBalance(_x, _x2) {
      return _getBalance.apply(this, arguments);
    }

    return getBalance;
  }();

  _proto.getNonce = /*#__PURE__*/function () {
    var _getNonce = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(address) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this._rpcClient.request({
                method: 'account_nonce',
                params: [address]
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getNonce(_x3) {
      return _getNonce.apply(this, arguments);
    }

    return getNonce;
  }() // Static utility method
  ;

  KardiaAccount.getWalletFromPK = function getWalletFromPK(privateKey) {
    var privateKeyBuffer = EthUtil.toBuffer(privateKey);
    var wallet = EtherWallet.fromPrivateKey(privateKeyBuffer);
    var addressStr = wallet.getChecksumAddressString();
    return {
      address: addressStr,
      privateKey: privateKey,
      balance: 0
    };
  };

  KardiaAccount.getWalletFromMnemonic = /*#__PURE__*/function () {
    var _getWalletFromMnemonic = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(mnemonic) {
      var wallet, privateKey, addressStr;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              wallet = ethers.ethers.Wallet.fromMnemonic(mnemonic.trim());
              privateKey = wallet.privateKey;
              addressStr = wallet.address;
              return _context3.abrupt("return", {
                address: addressStr,
                privateKey: privateKey,
                balance: 0
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getWalletFromMnemonic(_x4) {
      return _getWalletFromMnemonic.apply(this, arguments);
    }

    return getWalletFromMnemonic;
  }();

  KardiaAccount.isAddress = function isAddress$1(address) {
    return isAddress(address);
  };

  KardiaAccount.generateWallet = function generateWallet() {
    var wallet = ethers.ethers.Wallet.createRandom();
    var privateKey = wallet.privateKey;
    var addressStr = wallet.address;
    return {
      address: addressStr,
      privateKey: privateKey,
      balance: 0
    };
  };

  return KardiaAccount;
}();

var zero = /*#__PURE__*/new BN$1(0);
var negative1 = /*#__PURE__*/new BN$1(-1);
var unitMap = {
  hydro: '1',
  oxy: '1000000000',
  kai: '1000000000000000000'
};

var getValueOfUnit = function getValueOfUnit(unitInput) {
  var unit = unitInput ? unitInput.toLowerCase() : 'kai';
  var unitValue = unitMap[unit];

  if (typeof unitValue !== 'string') {
    throw new Error("The unit provided " + unitInput + " doesn't exists, please use the one of the following units " + JSON.stringify(unitMap, null, 2));
  }

  return new BN$1(unitValue, 10);
};
/**
 * Using for convert from hydro unit to OXY or KAI
 * @return value type: string
 *
 * @param input
 * @param unit
 *
 */


var fromHydro = function fromHydro(input, unit) {
  try {
    var oxy = numberToBN(input);
    var negative = oxy.lt(zero);
    var base = getValueOfUnit(unit);
    var baseLength = unitMap[unit].length - 1 || 1;

    if (negative) {
      oxy = oxy.mul(negative1);
    }

    var fraction = oxy.mod(base).toString(10);

    while (fraction.length < baseLength) {
      fraction = "0" + fraction;
    }

    var whole = oxy.div(base).toString(10);
    var value = "" + whole + (fraction === '0' ? '' : "." + fraction);

    if (negative) {
      value = "-" + value;
    }

    return removeTrailingZeros(value);
  } catch (error) {
    throw new Error("While converting number " + input + " to " + unit + ", " + error.message);
  }
};
/**
 * Using for convert OXY or KAI unit to Hydro unit
 * @return value type: string
 *
 * @param input
 * @param unit
 */

var toHydro = function toHydro(input, unit) {
  try {
    var kai = numberToString(input);
    var base = getValueOfUnit(unit);
    var baseLength = unitMap[unit].length - 1 || 1; // Is it negative?

    var negative = kai.substring(0, 1) === '-';

    if (negative) {
      kai = kai.substring(1);
    }

    if (kai === '.') {
      throw new Error("While converting number " + input + " to hydro, invalid value");
    } // Split it into a whole and fractional part


    var comps = kai.split('.');

    if (comps.length > 2) {
      throw new Error("While converting number " + input + " to hydro,  too many decimal points");
    }

    var whole = comps[0],
        fraction = comps[1];

    if (!whole) {
      whole = '0';
    }

    if (!fraction) {
      fraction = '0';
    }

    if (fraction.length > baseLength) {
      throw new Error("While converting number " + input + " to hydro, too many decimal places");
    }

    while (fraction.length < baseLength) {
      fraction += '0';
    }

    whole = new BN$1(whole);
    fraction = new BN$1(fraction);
    var hydro = whole.mul(base).add(fraction);

    if (negative) {
      hydro = hydro.mul(negative1);
    }

    return hydro.toString(10);
  } catch (error) {
    throw new Error("While converting number " + input + " to hydro, " + error.message);
  }
};

var KAIChain = /*#__PURE__*/function () {
  function KAIChain(_ref) {
    var client = _ref.client;
    this._rpcClient = client;
  }

  var _proto = KAIChain.prototype;

  _proto.getBlockNumber = /*#__PURE__*/function () {
    var _getBlockNumber = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._rpcClient.request({
                method: 'kai_blockNumber',
                params: []
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getBlockNumber() {
      return _getBlockNumber.apply(this, arguments);
    }

    return getBlockNumber;
  }();

  _proto.isValidator = /*#__PURE__*/function () {
    var _isValidator = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(address) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this._rpcClient.request({
                method: 'kai_validator',
                params: [address, false]
              });

            case 3:
              return _context2.abrupt("return", true);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", false);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 6]]);
    }));

    function isValidator(_x) {
      return _isValidator.apply(this, arguments);
    }

    return isValidator;
  }();

  _proto.getValidators = /*#__PURE__*/function () {
    var _getValidators = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(withDelegators) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (withDelegators === void 0) {
                withDelegators = false;
              }

              _context3.next = 3;
              return this._rpcClient.request({
                method: 'kai_validators',
                params: [withDelegators]
              });

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getValidators(_x2) {
      return _getValidators.apply(this, arguments);
    }

    return getValidators;
  }();

  _proto.getBlockByBlockNumber = /*#__PURE__*/function () {
    var _getBlockByBlockNumber = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(blockNumber) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(blockNumber < 0)) {
                _context4.next = 2;
                break;
              }

              throw new Error('Invalid block number');

            case 2:
              _context4.next = 4;
              return this._rpcClient.request({
                method: 'kai_getBlockByNumber',
                params: [blockNumber]
              });

            case 4:
              return _context4.abrupt("return", _context4.sent);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getBlockByBlockNumber(_x3) {
      return _getBlockByBlockNumber.apply(this, arguments);
    }

    return getBlockByBlockNumber;
  }();

  _proto.getBlockByHash = /*#__PURE__*/function () {
    var _getBlockByHash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(blockHash) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this._rpcClient.request({
                method: 'kai_getBlockByHash',
                params: [blockHash]
              });

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getBlockByHash(_x4) {
      return _getBlockByHash.apply(this, arguments);
    }

    return getBlockByHash;
  }();

  _proto.getBlockHeaderByBlockNumber = /*#__PURE__*/function () {
    var _getBlockHeaderByBlockNumber = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(blockNumber) {
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(blockNumber < 0)) {
                _context6.next = 2;
                break;
              }

              throw new Error('Invalid block number');

            case 2:
              _context6.next = 4;
              return this._rpcClient.request({
                method: 'kai_getBlockHeaderByNumber',
                params: [blockNumber]
              });

            case 4:
              return _context6.abrupt("return", _context6.sent);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getBlockHeaderByBlockNumber(_x5) {
      return _getBlockHeaderByBlockNumber.apply(this, arguments);
    }

    return getBlockHeaderByBlockNumber;
  }();

  _proto.getBlockHeaderByHash = /*#__PURE__*/function () {
    var _getBlockHeaderByHash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(blockHash) {
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this._rpcClient.request({
                method: 'kai_getBlockHeaderByHash',
                params: [blockHash]
              });

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getBlockHeaderByHash(_x6) {
      return _getBlockHeaderByHash.apply(this, arguments);
    }

    return getBlockHeaderByHash;
  }() // Static utility method
  ;

  KAIChain.KAIFromHydro = function KAIFromHydro(hydroValue) {
    return fromHydro(hydroValue, 'kai');
  };

  KAIChain.HydroFromKAI = function HydroFromKAI(kaiValue) {
    return toHydro(kaiValue, 'kai');
  };

  return KAIChain;
}();

// The RLP format
// Serialization and deserialization for the BytesTree type, under the following grammar:
// | First byte | Meaning                                                                    |
// | ---------- | -------------------------------------------------------------------------- |
// | 0   to 127 | HEX(leaf)                                                                  |
// | 128 to 183 | HEX(length_of_leaf + 128) + HEX(leaf)                                      |
// | 184 to 191 | HEX(length_of_length_of_leaf + 128 + 55) + HEX(length_of_leaf) + HEX(leaf) |
// | 192 to 247 | HEX(length_of_node + 192) + HEX(node)                                      |
// | 248 to 255 | HEX(length_of_length_of_node + 128 + 55) + HEX(length_of_node) + HEX(node) |
var encode = function encode(tree) {
  var padEven = function padEven(str) {
    return str.length % 2 === 0 ? str : '0' + str;
  };

  var uint = function uint(num) {
    return padEven(num.toString(16));
  };

  var length = function length(len, add) {
    return len < 56 ? uint(add + len) : uint(add + uint(len).length / 2 + 55) + uint(len);
  };

  var dataTree = function dataTree(tree) {
    if (typeof tree === 'string') {
      var hex = tree.slice(2);
      var pre = hex.length !== 2 || hex >= '80' ? length(hex.length / 2, 128) : '';
      return pre + hex;
    } else {
      var _hex = tree.map(dataTree).join('');

      var _pre = length(_hex.length / 2, 192);

      return _pre + _hex;
    }
  };

  return '0x' + dataTree(tree);
};

var decode = function decode(hex) {
  var i = 2;

  var parseTree = function parseTree() {
    if (i >= hex.length) throw new Error('');
    var head = hex.slice(i, i + 2);
    return head < '80' ? (i += 2, '0x' + head) : head < 'c0' ? parseHex() : parseList();
  };

  var parseLength = function parseLength() {
    var len = parseInt(hex.slice(i, i += 2), 16) % 64;
    return len < 56 ? len : parseInt(hex.slice(i, i += (len - 55) * 2), 16);
  };

  var parseHex = function parseHex() {
    var len = parseLength();
    return '0x' + hex.slice(i, i += len * 2);
  };

  var parseList = function parseList() {
    var lim = parseLength() * 2 + i;
    var list = [];

    while (i < lim) {
      list.push(parseTree());
    }

    return list;
  };

  try {
    return parseTree();
  } catch (e) {
    return [];
  }
};

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var WAIT_TIMEOUT = 60000;
var DEFAULT_GAS_PRICE = 1000000000;

var KardiaTransaction = /*#__PURE__*/function () {
  function KardiaTransaction(_ref) {
    var client = _ref.client,
        provider = _ref.provider;

    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      var transport = new clientJs.HTTPTransport(provider);
      this._rpcClient = new clientJs.Client(new clientJs.RequestManager([transport]));
    } else {
      throw new Error('Either [client] or [provider] must be provided');
    }
  }

  var _proto = KardiaTransaction.prototype;

  _proto.getTransaction = /*#__PURE__*/function () {
    var _getTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(txHash) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._rpcClient.request({
                method: 'tx_getTransaction',
                params: [txHash]
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getTransaction(_x) {
      return _getTransaction.apply(this, arguments);
    }

    return getTransaction;
  }();

  _proto.getPendingTransaction = /*#__PURE__*/function () {
    var _getPendingTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this._rpcClient.request({
                method: 'tx_pendingTransactions',
                params: []
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getPendingTransaction() {
      return _getPendingTransaction.apply(this, arguments);
    }

    return getPendingTransaction;
  }();

  _proto.getTransactionReceipt = /*#__PURE__*/function () {
    var _getTransactionReceipt = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(txHash) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this._rpcClient.request({
                method: 'tx_getTransactionReceipt',
                params: [txHash]
              });

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getTransactionReceipt(_x2) {
      return _getTransactionReceipt.apply(this, arguments);
    }

    return getTransactionReceipt;
  }();

  _proto.signTransaction = /*#__PURE__*/function () {
    var _signTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(tx, privateKey) {
      var _privateKey, transaction, rlpEncoded, hash, signature, decodeSign, rawTx, rawTransaction, values, result;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _privateKey = "0x" + privateKey.replace('0x', '');

              if (tx.gas) {
                _context4.next = 3;
                break;
              }

              throw new Error('"gas" is missing');

            case 3:
              if (!(tx.nonce < 0 || tx.gas < 0 || tx.gasPrice < 0)) {
                _context4.next = 5;
                break;
              }

              throw new Error('Gas, gasPrice, nonce is lower than 0');

            case 5:
              transaction = {
                nonce: tx.nonce,
                gasPrice: tx.gasPrice,
                gas: tx.gas,
                to: '0x' + tx.to.toLowerCase().replace('0x', ''),
                value: tx.value,
                data: '0x' + tx.data.toLowerCase().replace('0x', '')
              };
              rlpEncoded = encode([fromNat(transaction.nonce), fromNat(transaction.gasPrice), fromNat(transaction.gas), transaction.to.toLowerCase(), fromNat(transaction.value), transaction.data]);
              hash = keccak256(rlpEncoded);
              signature = sign(hash, _privateKey);
              decodeSign = decodeSignature(signature);
              rawTx = decode(rlpEncoded).concat(decodeSign);
              rawTx[6] = makeEven(trimLeadingZero(decodeSign[0]));
              rawTx[7] = makeEven(trimLeadingZero(decodeSign[1]));
              rawTx[8] = makeEven(trimLeadingZero(decodeSign[2]));
              rawTransaction = encode(rawTx);
              values = decode(rawTransaction);
              result = {
                messageHash: hash,
                v: trimLeadingZero(values[6].toString()),
                r: trimLeadingZero(values[7].toString()),
                s: trimLeadingZero(values[8].toString()),
                rawTransaction: rawTransaction
              };
              return _context4.abrupt("return", result);

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function signTransaction(_x3, _x4) {
      return _signTransaction.apply(this, arguments);
    }

    return signTransaction;
  }();

  _proto.generateTransaction = function generateTransaction(_ref2) {
    var _ref2$receiver = _ref2.receiver,
        receiver = _ref2$receiver === void 0 ? '0x' : _ref2$receiver,
        _ref2$to = _ref2.to,
        to = _ref2$to === void 0 ? '0x' : _ref2$to,
        _ref2$amount = _ref2.amount,
        amount = _ref2$amount === void 0 ? '0x0' : _ref2$amount,
        _ref2$value = _ref2.value,
        value = _ref2$value === void 0 ? '0x0' : _ref2$value,
        _ref2$nonce = _ref2.nonce,
        nonce = _ref2$nonce === void 0 ? '0x0' : _ref2$nonce,
        _ref2$gasPrice = _ref2.gasPrice,
        gasPrice = _ref2$gasPrice === void 0 ? '0xff' : _ref2$gasPrice,
        _ref2$gas = _ref2.gas,
        gas = _ref2$gas === void 0 ? '0xff' : _ref2$gas,
        _ref2$gasLimit = _ref2.gasLimit,
        gasLimit = _ref2$gasLimit === void 0 ? '0xff' : _ref2$gasLimit,
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? '0x' : _ref2$data;

    var _gasLimit = gas === '0xff' ? gasLimit : gas;

    var _value = amount === '0x0' ? value : amount;

    var _receiver = receiver === '0x' ? to : receiver;

    return {
      nonce: isHexStrict(nonce) ? nonce : toHex(nonce),
      to: _receiver,
      gasPrice: isHexStrict(gasPrice) ? gasPrice : toHex(gasPrice),
      gas: isHexStrict(_gasLimit) ? _gasLimit : toHex(_gasLimit),
      value: isHexStrict(_value) ? _value : toHex(_value),
      data: '0x' + data.toLowerCase().replace(/^0x/i, '')
    };
  }
  /**
   *
   * @param data transaction params
   * @param privateKey Private key used to sign transaction
   * @param waitUntilMined wait for transaction to complete or not
   * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
   */
  ;

  _proto.sendTransaction =
  /*#__PURE__*/
  function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(data, privateKey, waitUntilMined, waitTimeOut) {
      var estimatedGas, generatedTx, signedTx, txHash, _waitTimeOut, breakTimeout, receipt;

      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (waitUntilMined === void 0) {
                waitUntilMined = false;
              }

              if (waitTimeOut === void 0) {
                waitTimeOut = 0;
              }

              if (data.gas) {
                _context5.next = 7;
                break;
              }

              _context5.next = 5;
              return this.estimateGas(data, data.data);

            case 5:
              estimatedGas = _context5.sent;
              data.gas = estimatedGas * 10;

            case 7:
              _context5.next = 9;
              return this.generateTransaction(data);

            case 9:
              generatedTx = _context5.sent;
              _context5.next = 12;
              return this.signTransaction(generatedTx, privateKey);

            case 12:
              signedTx = _context5.sent;
              _context5.next = 15;
              return this._rpcClient.request({
                method: 'tx_sendRawTransaction',
                params: [signedTx.rawTransaction]
              });

            case 15:
              txHash = _context5.sent;

              if (waitUntilMined) {
                _context5.next = 18;
                break;
              }

              return _context5.abrupt("return", txHash);

            case 18:
              _waitTimeOut = waitTimeOut || WAIT_TIMEOUT;
              breakTimeout = Date.now() + _waitTimeOut;

            case 20:
              if (!(Date.now() < breakTimeout)) {
                _context5.next = 39;
                break;
              }

              _context5.prev = 21;
              _context5.next = 24;
              return this.getTransactionReceipt(txHash);

            case 24:
              receipt = _context5.sent;

              if (!receipt) {
                _context5.next = 29;
                break;
              }

              return _context5.abrupt("return", receipt);

            case 29:
              _context5.next = 31;
              return sleep(1000);

            case 31:
              _context5.next = 37;
              break;

            case 33:
              _context5.prev = 33;
              _context5.t0 = _context5["catch"](21);
              _context5.next = 37;
              return sleep(1000);

            case 37:
              _context5.next = 20;
              break;

            case 39:
              throw new Error("Timeout: cannot get receipt after " + WAIT_TIMEOUT + "ms");

            case 40:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[21, 33]]);
    }));

    function sendTransaction(_x5, _x6, _x7, _x8) {
      return _sendTransaction.apply(this, arguments);
    }

    return sendTransaction;
  }();

  _proto.estimateGas = /*#__PURE__*/function () {
    var _estimateGas = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(txPayload, data) {
      var txObject;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              txObject = {
                from: txPayload.from || '0x',
                to: txPayload.to || '0x',
                data: data,
                value: txPayload.value || 0,
                gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE
              };
              _context6.next = 3;
              return this._rpcClient.request({
                method: 'kai_estimateGas',
                params: [txObject, "latest"]
              });

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function estimateGas(_x9, _x10) {
      return _estimateGas.apply(this, arguments);
    }

    return estimateGas;
  }();

  return KardiaTransaction;
}();

var parseOutput = function parseOutput(outputs, result) {
  var outputTypes = outputs.map(function (output) {
    return output.type;
  });
  var outputBuffer = Buffer.from(result.replace('0x', ''), 'hex');
  var decodeResult = abiJs.rawDecode(outputTypes, outputBuffer);
  var rawOutput = decodeResult.map(function (decode, index) {
    if (outputTypes[index].endsWith(']')) {
      var resultItems = decode.map(function (item) {
        if (outputTypes[index].startsWith('byte')) {
          return item.toString('hex');
        }

        return item.toString();
      });
      return resultItems;
    }

    if (outputTypes[index].startsWith('byte')) {
      return decode.toString('hex');
    }

    return decode.toString();
  });
  return decodeOutput(outputs, rawOutput);
};
var parseNumber = function parseNumber(arg) {
  var type = typeof arg;

  if (type === 'string') {
    if (isHexPrefixed(arg)) {
      return new BN$1(stripHexPrefix(arg), 16);
    } else {
      return new BN$1(arg, 10);
    }
  } else if (type === 'number') {
    return new BN$1(arg);
  } else if (arg.toArray) {
    // assume this is a BN for the moment, replace with BN.isBN soon
    return arg;
  } else {
    throw new Error('Argument is not a number');
  }
}; // Parse N in type[<N>] where "type" can itself be an array type.

var parseTypeArray = function parseTypeArray(type) {
  var tmp = type.match(/(.*)\[(.*?)\]$/);

  if (tmp) {
    return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
  }

  return null;
};
var parseTypeNxM = function parseTypeNxM(type) {
  var tmp = /^\D+(\d+)x(\d+)$/.exec(type);
  if (!tmp) throw new Error('Invalid [type]');
  return [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
};

// @returns: String

var encodeSingle = function encodeSingle(type, arg) {
  var size, num, i;

  if (type === 'address') {
    return encodeSingle('uint160', parseNumber(arg));
  } else if (type === 'bool') {
    return encodeSingle('uint8', arg ? 1 : 0);
  } else if (type === 'string') {
    return encodeSingle('bytes', Buffer.from(arg, 'utf8'));
  } else if (isArray(type)) {
    // this part handles fixed-length ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    if (typeof arg.length === 'undefined') {
      throw new Error('Not an array?');
    }

    size = parseTypeArray(type);
    if (!size) throw new Error('Invalid [type]');

    if (size !== 'dynamic' && size !== 0 && arg.length > size) {
      throw new Error('Elements exceed array size: ' + size);
    }

    var result = '';
    type = type.slice(0, type.lastIndexOf('['));

    if (typeof arg === 'string') {
      arg = JSON.parse(arg);
    }

    if (size === 'dynamic') {
      var length = encodeSingle('uint256', arg.length);
      result = length;
    }

    for (i in arg) {
      result = result + encodeSingle(type, arg[i]).replace('0x', '');
    }

    return result;
  } else if (type === 'bytes') {
    var _length = Bytes.length(arg);

    var nextMul32 = (((_length - 1) / 32 | 0) + 1) * 32;
    var lengthEncoded = encode$1('uint256', fromNumber(_length)).data;
    var bytesEncoded = Bytes.padRight(nextMul32, arg);
    return Bytes.concat(lengthEncoded, bytesEncoded);
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);

    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size);
    }

    var _result = '0x' + setLengthRight(arg, 32).toString('hex');

    return _result;
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid uint<N> width: ' + size);
    }

    num = parseNumber(arg);

    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    if (num < 0) {
      throw new Error('Supplied uint is negative');
    } // const bytes32 = zeros(size === 256 ? 31 : 32);
    // return Buffer.concat([bytes32, num.toArrayLike(Buffer, 'be')]);


    var buf = '0x' + num.toArrayLike(Buffer, 'be', 32).toString('hex');
    return buf;
  } else if (type.startsWith('int')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid int<N> width: ' + size);
    }

    num = parseNumber(arg);

    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    var _buf = num.toTwos(256).toArrayLike(Buffer, 'be', 32);

    return '0x' + _buf.toString('hex');
  } else if (type.startsWith('ufixed')) {
    size = parseTypeNxM(type);
    num = parseNumber(arg);

    if (num < 0) {
      throw new Error('Supplied ufixed is negative');
    }

    return encodeSingle('uint256', num.mul(new BN$1(2).pow(new BN$1(size[1]))));
  } else if (type.startsWith('fixed')) {
    size = parseTypeNxM(type);
    return encodeSingle('int256', parseNumber(arg).mul(new BN$1(2).pow(new BN$1(size[1]))));
  }

  throw new Error('Unsupported or invalid type: ' + type);
};

var methodData = function methodData(method, params) {
  var methodSig = method.name + '(' + method.inputs.map(function (i) {
    return i.type;
  }).join(',') + ')';
  var methodHash = keccak256s(methodSig).slice(0, 10);
  var encodedParams = params.map(function (param, i) {
    return encode$1(method.inputs[i].type, param);
  });
  var headBlock = '0x';
  var dataBlock = '0x';

  for (var i = 0; i < encodedParams.length; ++i) {
    if (encodedParams[i].dynamic) {
      var dataLoc = encodedParams.length * 32 + Bytes.length(dataBlock);
      headBlock = Bytes.concat(headBlock, Bytes.pad(32, fromNumber(dataLoc)));
      dataBlock = Bytes.concat(dataBlock, encodedParams[i].data);
    } else {
      headBlock = Bytes.concat(headBlock, encodedParams[i].data);
    }
  }

  return Bytes.flatten([methodHash, headBlock, dataBlock]);
};
var decodeOutput = function decodeOutput(outputTypes, outputData) {
  if (outputTypes.length === 1) {
    var type = outputTypes[0].type;
    return decodeSingleOutput(type, outputData[0]);
  }

  return outputTypes.reduce(function (obj, data, index) {
    var key = data.name || index.toString();
    var type = data.type;
    obj[key] = decodeSingleOutput(type, outputData[index]);
    return obj;
  }, {});
};

var decodeSingleOutput = function decodeSingleOutput(outputType, outputData) {
  if (!outputData || outputData === '0x') {
    return outputData;
  }

  if (isArray(outputType)) {
    var type = outputType.replace(/\[\]/g, '');
    var arrayData = Array.isArray(outputData) ? outputData : outputData.split(',');
    return arrayData.map(function (data) {
      return decodeSingleOutput(type, data);
    });
  }

  if (outputType === 'address') {
    return "0x" + outputData.replace('0x', '');
  }

  if (outputType.startsWith('uint') || outputType.startsWith('int')) {
    return parseInt(outputData);
  }

  if (outputType === 'bool') {
    return outputData === 'true';
  }

  if (outputType.startsWith('byte')) {
    return "0x" + outputData.replace('0x', '');
  }

  return outputData;
};

var parseEvent = function parseEvent(currentAbi, eventObject) {
  if (currentAbi.length === 0) {
    throw new Error('ABI is require for paser');
  }

  var filterEvents = filterEventFromAbi(currentAbi);
  var eventAbi = filterEvents.find(function (item) {
    return item.signature === eventObject.topics[0];
  });

  if (eventAbi) {
    var notIndexInputs = eventAbi.inputs.filter(function (item) {
      return item.indexed === false;
    });
    var indexInputs = eventAbi.inputs.filter(function (item) {
      return item.indexed === true;
    });
    var orderedInputs = [].concat(notIndexInputs, indexInputs);
    var outputTypes = orderedInputs.map(function (item) {
      return item.type;
    });
    var outputBuffer = Buffer.from(eventObject.data.replace('0x', ''), 'hex');

    for (var i = 1; i < eventObject.topics.length; i++) {
      var indexedBuffer = Buffer.from(eventObject.topics[i].replace('0x', ''), 'hex');
      outputBuffer = Buffer.concat([outputBuffer, indexedBuffer]);
    }

    var decodeResult = abiJs.rawDecode(outputTypes, outputBuffer);
    var rawOutput = decodeResult.map(function (decode, index) {
      if (outputTypes[index].startsWith('byte')) {
        return decode.toString('hex');
      }

      return decode.toString();
    });
    var decodeObject = decodeOutput(eventAbi.inputs, rawOutput);
    return _extends({
      event: _extends({
        name: eventAbi.name
      }, decodeObject)
    }, eventObject);
  }

  return eventObject;
};

var filterEventFromAbi = function filterEventFromAbi(abi) {
  var filteredAbi = abi.filter(function (item) {
    return item.type === 'event';
  });
  return filteredAbi.map(function (item) {
    return _extends({
      signature: methodSignature(item)
    }, item);
  });
};

var methodSignature = function methodSignature(method) {
  var methodSig = method.name + '(' + method.inputs.map(function (i) {
    return i.type;
  }).join(',') + ')';
  return keccak256s(methodSig);
};

var encodeArray = function encodeArray(params) {
  return params.map(function (param) {
    if (isHexStrict(param)) {
      return param;
    } else {
      return toHex(param);
    }
  });
}; // Parse N from type<N>

var parseTypeN = function parseTypeN(type) {
  var v = /^\D+(\d+)$/.exec(type);
  if (!v) throw new Error('Invalid type');
  return parseInt(v[1], 10);
}; // Is a type an array?


var isArray = function isArray(type) {
  return type.lastIndexOf(']') === type.length - 1;
};

var isDynamic = function isDynamic(type) {
  if (type === 'bytes' || type === 'string') return true;
  if (isArray(type)) return true;
  return false;
};

var encode$1 = function encode(type, value) {
  if (type === 'uint256' || type === 'bytes32' || type === 'address') {
    return {
      data: Bytes.pad(32, value),
      dynamic: false
    };
  } else {
    return {
      data: encodeSingle(type, value),
      dynamic: isDynamic(type)
    };
  }
};

var deployData = function deployData(bytecode, method, params) {
  var headBlock = '0x';
  var dataBlock = '0x';

  if (params && method) {
    var encodedParams = params.map(function (param, i) {
      return encode$1(method.inputs[i].type, param);
    });

    for (var i = 0; i < encodedParams.length; ++i) {
      if (encodedParams[i].dynamic) {
        var dataLoc = encodedParams.length * 32 + Bytes.length(dataBlock);
        headBlock = Bytes.concat(headBlock, Bytes.pad(32, fromNumber(dataLoc)));
        dataBlock = Bytes.concat(dataBlock, encodedParams[i].data);
      } else {
        headBlock = Bytes.concat(headBlock, encodedParams[i].data);
      }
    }
  }

  return Bytes.flatten([bytecode, headBlock, dataBlock]);
};
var findFunctionFromAbi = function findFunctionFromAbi(abi, type, name) {
  if (type === void 0) {
    type = 'function';
  }

  if (name === void 0) {
    name = '';
  }

  if (type !== 'constructor') {
    return abi.find(function (item) {
      return item.type === type && item.name === name;
    }); // return find(abi, (item) => item.type === type && item.name === name);
  } // return find(abi, (item) => item.type === type);


  return abi.find(function (item) {
    return item.type === type;
  });
};

var DEFAULT_GAS = 900000;
var DEFAULT_GAS_PRICE$1 = 1000000000;

var KardiaContract = /*#__PURE__*/function () {
  function KardiaContract(_ref) {
    var client = _ref.client,
        bytecodes = _ref.bytecodes,
        abi = _ref.abi,
        provider = _ref.provider;

    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      var transport = new clientJs.HTTPTransport(provider);
      this._rpcClient = new clientJs.Client(new clientJs.RequestManager([transport]));
    } else {
      throw new Error('Either [client] or [provider] must be provided');
    }

    this.txModule = new KardiaTransaction({
      client: this._rpcClient
    });
    this.bytecodes = bytecodes || '';
    if (abi && !Array.isArray(abi)) throw new Error('Invalid [abi]');
    this.abi = abi || [];
  }

  var _proto = KardiaContract.prototype;

  _proto.updateAbi = function updateAbi(abi) {
    this.abi = abi;
  };

  _proto.updateByteCode = function updateByteCode(bytecodes) {
    this.bytecodes = bytecodes;
  };

  _proto.info = function info() {
    return {
      byteCode: this.bytecodes,
      abi: this.abi
    };
  };

  _proto.deploy = function deploy(_ref2) {
    var _this = this;

    var params = _ref2.params;
    var bytecode = this.bytecodes;
    var abi = this.abi;
    var constructorAbi = findFunctionFromAbi(abi, 'constructor');
    var decorBycode = '0x' + bytecode.replace('0x', '');
    var paramsDecorate = params.map(function (param) {
      if (Array.isArray(param)) {
        return encodeArray(param);
      } else if (isHexStrict(param)) {
        return param;
      } else {
        return toHex(param);
      }
    });
    var data = deployData(decorBycode, constructorAbi, paramsDecorate);
    return {
      txData: function txData() {
        return data;
      },
      getDefaultTxPayload: function getDefaultTxPayload() {
        return {
          amount: 0,
          data: data,
          gasPrice: DEFAULT_GAS_PRICE$1,
          gas: DEFAULT_GAS
        };
      },
      estimateGas: function () {
        var _estimateGas = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(txPayload) {
          return runtime_1.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (txPayload === void 0) {
                    txPayload = {};
                  }

                  _context.next = 3;
                  return _this.txModule.estimateGas(txPayload, data);

                case 3:
                  return _context.abrupt("return", _context.sent);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function estimateGas(_x) {
          return _estimateGas.apply(this, arguments);
        }

        return estimateGas;
      }(),
      send: function () {
        var _send = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(privateKey, txPayload) {
          var senderAccount, account, accountNonce, transaction, result;
          return runtime_1.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (txPayload === void 0) {
                    txPayload = {};
                  }

                  senderAccount = fromPrivate(privateKey);
                  account = new KardiaAccount({
                    client: _this._rpcClient
                  });
                  _context2.next = 5;
                  return account.getNonce(senderAccount.address);

                case 5:
                  accountNonce = _context2.sent;
                  transaction = new KardiaTransaction({
                    client: _this._rpcClient
                  });
                  _context2.next = 9;
                  return transaction.sendTransaction({
                    receiver: '0x',
                    amount: txPayload.amount || 0,
                    nonce: txPayload.nonce || accountNonce,
                    gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE$1,
                    gas: txPayload.gas || DEFAULT_GAS,
                    data: data
                  }, privateKey, true);

                case 9:
                  result = _context2.sent;
                  return _context2.abrupt("return", result);

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function send(_x2, _x3) {
          return _send.apply(this, arguments);
        }

        return send;
      }()
    };
  };

  _proto.invokeContract = function invokeContract(name, params) {
    var _this2 = this;

    var functionFromAbi = findFunctionFromAbi(this.abi, 'function', name);
    var paramsDecorate = params.map(function (param) {
      if (Array.isArray(param)) {
        return encodeArray(param);
      } else if (isHexStrict(param)) {
        return param;
      } else {
        return toHex(param);
      }
    });
    var data = methodData(functionFromAbi, paramsDecorate);
    return {
      txData: function txData() {
        return data;
      },
      getDefaultTxPayload: function getDefaultTxPayload() {
        return {
          amount: 0,
          gasPrice: DEFAULT_GAS_PRICE$1,
          gas: DEFAULT_GAS,
          data: data
        };
      },
      estimateGas: function () {
        var _estimateGas2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(txPayload) {
          return runtime_1.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this2.txModule.estimateGas(txPayload, data);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function estimateGas(_x4) {
          return _estimateGas2.apply(this, arguments);
        }

        return estimateGas;
      }(),
      send: function () {
        var _send2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(privateKey, contractAddress, txPayload) {
          var senderAccount, account, accountNonce, transaction, txResult, events, result;
          return runtime_1.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (txPayload === void 0) {
                    txPayload = {};
                  }

                  senderAccount = fromPrivate(privateKey);
                  account = new KardiaAccount({
                    client: _this2._rpcClient
                  });
                  _context4.next = 5;
                  return account.getNonce(senderAccount.address);

                case 5:
                  accountNonce = _context4.sent;
                  transaction = new KardiaTransaction({
                    client: _this2._rpcClient
                  });
                  _context4.next = 9;
                  return transaction.sendTransaction({
                    receiver: contractAddress,
                    amount: txPayload.amount || 0,
                    nonce: txPayload.nonce || accountNonce,
                    gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE$1,
                    gas: txPayload.gas || DEFAULT_GAS,
                    data: data
                  }, privateKey, true);

                case 9:
                  txResult = _context4.sent;
                  events = txResult.logs ? txResult.logs.map(function (item) {
                    return parseEvent(_this2.abi, item);
                  }) : [];
                  result = _extends({
                    events: events
                  }, txResult);
                  return _context4.abrupt("return", result);

                case 13:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function send(_x5, _x6, _x7) {
          return _send2.apply(this, arguments);
        }

        return send;
      }(),
      call: function () {
        var _call = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(contractAddress, txPayload, blockHeight) {
          var callObject, result;
          return runtime_1.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (txPayload === void 0) {
                    txPayload = {};
                  }

                  if (blockHeight === void 0) {
                    blockHeight = 0;
                  }

                  callObject = {
                    from: txPayload.from || '0x',
                    to: contractAddress,
                    data: data,
                    value: txPayload.amount || 0,
                    gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE$1,
                    gas: txPayload.gas || DEFAULT_GAS
                  }; // const result = await api.callSmartContract(callObject, blockHeight);

                  _context5.next = 5;
                  return _this2._rpcClient.request({
                    method: 'kai_kardiaCall',
                    params: [callObject, blockHeight]
                  });

                case 5:
                  result = _context5.sent;
                  return _context5.abrupt("return", parseOutput(functionFromAbi.outputs, result));

                case 7:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function call(_x8, _x9, _x10) {
          return _call.apply(this, arguments);
        }

        return call;
      }()
    };
  };

  _proto.parseEvent = /*#__PURE__*/function () {
    var _parseEvent2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(txHash) {
      var _this3 = this;

      var transaction, tx;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              // Get Tx receipt
              transaction = new KardiaTransaction({
                client: this._rpcClient
              });
              _context6.next = 3;
              return transaction.getTransactionReceipt(txHash);

            case 3:
              tx = _context6.sent;
              return _context6.abrupt("return", tx.logs ? tx.logs.map(function (item) {
                return parseEvent(_this3.abi, item);
              }) : []);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function parseEvent$1(_x11) {
      return _parseEvent2.apply(this, arguments);
    }

    return parseEvent$1;
  }();

  return KardiaContract;
}();

var KardiaClient = function KardiaClient(_ref) {
  var endpoint = _ref.endpoint;
  // Init RPC client
  var transport = new clientJs.HTTPTransport(endpoint);
  this._rpcClient = new clientJs.Client(new clientJs.RequestManager([transport])); // Init sub module

  this.account = new KardiaAccount({
    client: this._rpcClient
  });
  this.transaction = new KardiaTransaction({
    client: this._rpcClient
  });
  this.kaiChain = new KAIChain({
    client: this._rpcClient
  });
  this.contract = new KardiaContract({
    client: this._rpcClient
  });
};

exports.KAIChain = KAIChain;
exports.KardiaAccount = KardiaAccount;
exports.KardiaTransaction = KardiaTransaction;
exports.default = KardiaClient;
//# sourceMappingURL=kardia-dx.cjs.development.js.map
