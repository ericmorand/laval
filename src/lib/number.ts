import {ok} from "assert";
import {validator} from "../index";

import type {Validator, ValidatorFactory} from "../index";

export const isInteger: Validator<number> = validator((value) => {
  ok(Number.isInteger(value), `${value} is not an integer`);
});

export const createIsEqualToValidator: ValidatorFactory<number, number> = (operand) => {
  return validator((value) => {
    ok(value == operand, `${value} is not equal to ${operand}`);
  });
};

export const createIsGreaterThanValidator: ValidatorFactory<number, number> = (operand) => {
  return validator((value) => {
    ok(value > operand, `${value} is not greater than ${operand}`);
  });
};

export const createIsLowerThanValidator: ValidatorFactory<number, number> = (operand) => {
  return validator((value) => {
    ok(value < operand, `${value} is not lower than ${operand}`);
  });
};