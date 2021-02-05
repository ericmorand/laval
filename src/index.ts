type ValidatorOperator<T> = (operand: Validator<T>) => Validator<T>;

type ValidatorImplementation<T> = (value: T) => void;

export type Validator<T> = ValidatorImplementation<T> & {
  and: ValidatorOperator<T>;
  or: ValidatorOperator<T>
};
export type ValidatorFactory<T, P> = (parameter: P) => Validator<T>;

export const validator = <T>(implementation: ValidatorImplementation<T>): Validator<T> => {
  // don't mutate the passed implementation
  const target: ValidatorImplementation<T> = (value: T) => implementation(value);

  const and: ValidatorOperator<T> = (operand) => {
    return validator((value) => {
      target(value);
      operand(value);
    });
  };

  const or: ValidatorOperator<T> = (operand) => {
    return validator((value) => {
      let errors: Array<Error> = [];

      try {
        target(value);

        return;
      } catch (error) {
        errors.push(error);
      }

      try {
        operand(value);

        return;
      } catch (error) {
        errors.push(error);

        throw new Error(`${errors.map((error) => error.message).join((' and '))}`);
      }
    });
  };

  return Object.assign(target, {and, or});
};
