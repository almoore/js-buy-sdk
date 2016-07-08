/* eslint no-new: 0 */

import { module, test } from 'qunit';
import logger from 'shopify-buy/logger';

const testOutput = 'test output';

module('Unit | Logger');

['debug', 'info', 'warn', 'error'].forEach(method => {
  test(`it should wrap ${method}`, function (assert) {
    assert.expect(2);

    /* eslint-disable no-console */
    const oldLog = console[method];

    console[method] = function () {
      assert.equal(arguments[0], '[JS-BUY-SDK]: ', `console.${method} should be tagged`);
      assert.equal(arguments[1], testOutput, `console.${method} should be wrapped`);
    };

    logger[method](testOutput);
    console[method] = oldLog;
    /* eslint-enable no-console */
  });
});

test('it should call console.log if the method is not defined', function (assert) {
  assert.expect(1);

  /* eslint-disable no-console */
  const oldLog = console.log;
  const oldWarn = console.warn;

  console.log = function () {
    assert.equal(arguments[1], testOutput, 'console.log should be called');
  };
  /* eslint-disable no-undefined */
  console.warn = undefined;
  /* eslint-enable no-undefined */

  logger.warn(testOutput);

  console.log = oldLog;
  console.warn = oldWarn;
  /* eslint-enable no-console */
});
