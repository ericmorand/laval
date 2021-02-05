import {ok} from "assert";
import {inspect} from "util";
import {validator} from "../index";

import type {Validator} from "../index";

export const isTruthy: Validator<any> = validator((value) => {
  ok(value, `${inspect(value)} is not truthy`);
});

export const isFalsy: Validator<any> = validator((value) => {
  ok(!value, `${inspect(value)} is not falsy`);
});
