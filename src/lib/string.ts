import {match, ok} from "assert";
import {validator, ValidatorFactory} from "../index";

export const createRegExpValidator: ValidatorFactory<string, RegExp> = (regExp) => {
  return validator((value) => {
    match(value, regExp, `"${value}" does not match the expected format "${regExp}"`);
  });
};

export const createMinLengthValidator: ValidatorFactory<string, number> = (length) => {
  return validator((value) => {
    ok(value.length >= length, `"${value}" length is lower than ${length}`);
  });
};

export const createMaxLengthValidator: ValidatorFactory<string, number> = (length) => {
  return validator((value) => {
    ok(value.length <= length, `"${value}" length is greater than ${length}`);
  });
};