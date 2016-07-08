/* eslint no-new: 0, no-console: 0,  */
import { module, test } from 'qunit';
import logger from 'shopify-buy/logger';
import { wrapConsole } from 'shopify-buy/logger';

const testOutput = 'test output';

module('Unit | Logger');

test('it should wrap a valid console method', function (assert) {
  assert.expect(2);
  /* eslint-disable no-console */
  const oldLog = console.log;

  console.log = function () {
    assert.equal(arguments[0], '[JS-BUY-SDK]: ', 'console.log should be tagged');
    assert.equal(arguments[1], testOutput, 'console.log should be wrapped');
  };

  wrapConsole('log')(testOutput);
  console.log = oldLog;
  /* eslint-enable no-console */
});

test('it should fallback to console.log if the method is not defined', function (assert) {
  assert.expect(2);
  /* eslint-disable no-console */
  const oldLog = console.log;

  console.log = function () {
    assert.equal(arguments[0], '[JS-BUY-SDK]: ', 'console.log should be tagged');
    assert.equal(arguments[1], testOutput, 'console.log should be wrapped');
  };

  wrapConsole('output')(testOutput);
  console.log = oldLog;
  /* eslint-enable no-console */
});

['debug', 'info', 'warn', 'error'].forEach(method => {
  test(`it should wrap ${method}`, function (assert) {
    assert.expect(1);
    logger[method](testOutput);
    assert.ok(true, `${method} should not throw an error`);
  });
});
