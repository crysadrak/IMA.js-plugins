export interface Configuration {
  silentMode: boolean;
}

/**
 * A configuration.
 *
 * @type {Configuration}
 */
const _config = {
  silentMode: false,
};

/**
 * Configure the logger.
 *
 * @param {Configuration} config Some or all of configuration
 *        properties, which overwrites the current values.
 */
function configureLogger(config: Configuration) {
  if (!config || typeof config !== 'object') {
    error(new TypeError('Argument config must be an object.'));

    return;
  }

  if ('silentMode' in config) {
    _config.silentMode = !!config.silentMode;
  }
}

/**
 * Activates the silent mode. It's useful for unit testing.
 *
 * @example
 * import * as logger from '@ima/plugin-logger';
 *
 * describe('some class with the logger', () => {
 *   // Shortcut for configureLogger({ silentMode: true });
 *   logger.beSilent();
 * });
 */
function beSilent() {
  configureLogger({ silentMode: true });
}

/**
 * Checks if the logging is in the silent mode.
 *
 * @returns {boolean} TRUE = when it's active, otherwise FALSE.
 */
function isSilent() {
  return _config.silentMode;
}

/**
 * Outputs a message.
 *
 * @param {...*} message A message.
 */
function log(...message: any[]) {
  if (!isSilent()) {
		console.log(...message); // eslint-disable-line
  }
}

/**
 * Outputs an informational message.
 *
 * @param {...*} message An informational message.
 */
function info(...message: any[]) {
  if (!isSilent()) {
		console.info(...message); //eslint-disable-line
  }
}

/**
 * Outputs a warning message.
 *
 * @param {...*} message A warning message.
 */
function warn(...message: any[]) {
  if (!isSilent()) {
		console.warn(...message); //eslint-disable-line
  }
}

/**
 * Outputs an error message.
 *
 * @param {...*} message An error message.
 */
function error(...message: any[]) {
  if (!isSilent()) {
		console.error(...message); //eslint-disable-line
  }
}

/**
 * Outputs a debug message.
 *
 * @param {...*} message A debug message.
 */
function debug(...message: any[]) {
  if (!isSilent()) {
		if (typeof console.debug === 'function') { //eslint-disable-line
			console.debug(...message); //eslint-disable-line
    } else {
			console.log(...message); //eslint-disable-line
    }
  }
}

/**
 * An expression that is evaluated as a boolean value.
 *
 * @typedef {*} Condition
 */

/**
 * Outputs a message if a condition is met.
 *
 * @param {*} condition A condition.
 * @param {...*} message A message.
 * @returns {booolean} TRUE when the condition is met, otherwise FALSE.
 */
function logIf(condition: any, ...message: any[]) {
  if (condition) {
    log(...message);
  }

  return !!condition;
}

/**
 * Outputs an informational message if a condition is met.
 *
 * @param {*} condition A condition.
 * @param {...*} message An informational message.
 * @returns {booolean} TRUE when the condition is met, otherwise FALSE.
 */
function infoIf(condition: any, ...message: any[]) {
  if (condition) {
    info(...message);
  }

  return !!condition;
}

/**
 * Outputs a warning message if a condition is met.
 *
 * @param {*} condition A condition.
 * @param {...*} message A warning message.
 * @returns {booolean} TRUE when the condition is met, otherwise FALSE.
 */
function warnIf(condition: any, ...message: any[]) {
  if (condition) {
    warn(...message);
  }

  return !!condition;
}

/**
 * Outputs an error message if a condition is met.
 *
 * @example
 * function foo(num, str) {
 *   if (
 *     errorIf(typeof num !== 'number', new TypeError('Argument num must be a number.')) ||
 *     errorIf(typeof str !== 'string', new TypeError('Argument str must be a string.'))
 *   ) {
 *     // One or both of previous errors have been logged.
 *     return;
 *   }
 *   ...
 * }
 * @param {*} condition A condition.
 * @param {...*} message An error message.
 * @returns {booolean} TRUE when the condition is met, otherwise FALSE.
 */
function errorIf(condition: any, ...message: any[]) {
  if (condition) {
    error(...message);
  }

  return !!condition;
}

/**
 * Outputs a debug message if a condition is met.
 *
 * @param {*} condition A condition.
 * @param {...*} message A debug message.
 * @returns {booolean} TRUE when the condition is met, otherwise FALSE.
 */
function debugIf(condition: any, ...message: any[]) {
  if (condition) {
    debug(...message);
  }

  return !!condition;
}

/**
 * Throws a user-defined exception if a condition is met.
 *
 * @example
 * function _foo(num) {
 *   throwIf(typeof num !== 'number', new TypeError('Argument num must be a number.'));
 *   ...
 * }
 * @param {*} condition A condition.
 * @param {string|number|boolean|object} expression An expression to throw
 *        (please prefer an instance of Error, because it contains an original
 *        location, where it was created).
 */
function throwIf(
  condition: any,
  expression: string | number | boolean | object
) {
  if (condition) {
    throw expression;
  }
}

/**
 * Returns a rejected promise if a condition is met.
 *
 * @example
 * function asyncFoo(num, str) {
 *   let rejected;
 *
 *   if (
 *     (rejected = rejectIf(typeof num !== 'number', new TypeError('Argument num must be a number.'))) ||
 *     (rejected = rejectIf(typeof str !== 'string', new TypeError('Argument str must be a number.')))
 *   ) {
 *     return rejected;
 *   }
 *   ...
 * }
 * @param {*} condition A condition.
 * @param {string|number|boolean|object} reason A reason of rejecting (please
 *        prefer an instance of Error, because it contains an original location,
 *        where it was created).
 * @returns {?Promise} A promise that is rejected with the given reason or null.
 */
function rejectIf(condition: any, reason: string | number | boolean | object) {
  if (condition) {
    return Promise.reject(reason);
  }

  return null;
}

export {
  configureLogger,
  beSilent,
  isSilent,
  log,
  info,
  warn,
  error,
  debug,
  logIf,
  infoIf,
  warnIf,
  errorIf,
  debugIf,
  throwIf,
  rejectIf,
};