import * as tape from "tape";
import {createIsEqualToValidator, createIsGreaterThanValidator, createIsLowerThanValidator} from "../../../src/lib/number";

tape('laval > lib > number', (test) => {
  const isGreaterThan5 = createIsGreaterThanValidator(5);
  const isLowerThan5 = createIsLowerThanValidator(5);
  const isEqualTo5 = createIsEqualToValidator(5);

  test.test('is equal to', (test) => {
    try {
      isEqualTo5(5);

      test.pass();
    }
    catch (error) {
      test.fail(error.message);
    }

    try {
      isEqualTo5(10);

      test.fail();
    }
    catch (error) {
      test.pass(error.message);
    }

    test.end();
  });

  test.test('is greater than or equal to', (test) => {
    const isGreaterThanOrEqualTo5 = isGreaterThan5.or(isEqualTo5);

    try {
      isGreaterThanOrEqualTo5(10);

      test.pass();
    }
    catch (error) {
      test.fail(error.message);
    }

    try {
      isGreaterThanOrEqualTo5(4);

      test.fail();
    }
    catch (error) {
      test.pass(error.message);
    }

    try {
      isGreaterThanOrEqualTo5(5);

      test.pass();
    }
    catch (error) {
      test.fail(error.message);
    }

    test.end();
  });

  test.test('is lower than or equal to', (test) => {
    const isLowerThanOrEqualTo5 = isLowerThan5.or(isEqualTo5);

    try {
      isLowerThanOrEqualTo5(4);

      test.pass();
    }
    catch (error) {
      test.fail(error.message);
    }

    try {
      isLowerThanOrEqualTo5(10);

      test.fail();
    }
    catch (error) {
      test.pass(error.message);
    }

    try {
      isLowerThanOrEqualTo5(5);

      test.pass();
    }
    catch (error) {
      test.fail(error.message);
    }

    test.end();
  });
});