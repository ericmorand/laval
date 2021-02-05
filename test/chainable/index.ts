import * as tape from "tape";
import {validator} from "../../src";

tape('chainable', (test) => {
  test.test('and', (test) => {
    test.test('when neither the receiver nor the target throws', (test) => {
      let callCount: number = 0;

      const doesntThrow = validator<void>(() => {
        callCount++;
      });

      try {
        doesntThrow.and(doesntThrow)();

        test.same(callCount, 2, 'should call the receiver and the target');
        test.pass('should not throw');
      } catch (error) {
        test.fail(error.message);
      }

      test.end();
    });

    test.test('when only the receiver throws', (test) => {
      let throwsCallCount: number = 0;
      let doesntThrowCallCount: number = 0;

      const throws = validator<void>(() => {
        throwsCallCount++;

        throw new Error('Something went wrong');
      });

      const doesntThrow = validator<void>(() => {
        doesntThrowCallCount++;
      });

      try {
        throws.and(doesntThrow)();

        test.fail();
      } catch (error) {
        test.same(throwsCallCount, 1, 'should call the receiver');
        test.same(doesntThrowCallCount, 0, 'should not call the target');
        test.same(error.message, 'Something went wrong', 'should throw the receiver error');
      }

      test.end();
    });

    test.test('when only the target throws', (test) => {
      let throwsCallCount: number = 0;
      let doesntThrowCallCount: number = 0;

      const throws = validator<void>(() => {
        throwsCallCount++;

        throw new Error('Something went wrong');
      });

      const doesntThrow = validator<void>(() => {
        doesntThrowCallCount++;
      });

      try {
        doesntThrow.and(throws)();

        test.fail();
      } catch (error) {
        test.same(throwsCallCount, 1, 'should call the receiver');
        test.same(doesntThrowCallCount, 1, 'should call the target');
        test.same(error.message, 'Something went wrong', 'should throw the target error');
      }

      test.end();
    });

    test.test('when both the receiver and the target throw', (test) => {
      let throwsCallCount: number = 0;
      let doesntThrowCallCount: number = 0;

      const throws = validator<void>(() => {
        throwsCallCount++;

        throw new Error('Something went wrong');
      });

      const alsoThrows = validator<void>(() => {
        throwsCallCount++;

        throw new Error('Something went wrong...again');
      });

      try {
        throws.and(alsoThrows)();

        test.fail();
      } catch (error) {
        test.same(throwsCallCount, 1, 'should call the receiver');
        test.same(doesntThrowCallCount, 0, 'should not call the target');
        test.same(error.message, 'Something went wrong', 'should throw the receiver error');
      }

      test.end();
    });

    test.end();
  });
});