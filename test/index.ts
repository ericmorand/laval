import * as tape from "tape";
import {isFalsy, isTruthy} from "../src/lib/common";
import {validator} from "../src";

tape('misc', (test) => {
  test.test('at least one and at most one', (test) => {
    // here we test than we can write a validator that validates mutually exclusive propositions
    // (a || b) && (!a || !b)
    const tests = [
      [true, true, false],
      [false, false, false],
      [1, 2, false],
      ['a', 'b', false],
      [null, null, false],
      [true, false, true],
      [false, true, true],
      [5, null, true],
      [null, 5, true],
      ['a', null, true],
      [null, 'a', true]
    ];

    for (let [a, b, mutuallyExclusive] of tests) {
      const aIsTruthy = validator<void>(() => isTruthy(a));
      const bIsTruthy = validator<void>(() => isTruthy(b));
      const aIsFalsy = validator<void>(() => isFalsy(a));
      const bIsFalsy = validator<void>(() => isFalsy(b));

      const aAndBAreMutuallyExclusive = (aIsTruthy.or(bIsTruthy)).and(aIsFalsy.or(bIsFalsy));

      try {
        aAndBAreMutuallyExclusive();

        if (mutuallyExclusive) {
          test.pass(`${a} and ${b} are mutually exclusive`);
        }
        else {
          test.fail();
        }
      }
      catch (error) {
        if (mutuallyExclusive) {
          test.fail(error.message);
        }
        else {
          test.pass(error.message);
        }
      }
    }

    test.end();
  });
});