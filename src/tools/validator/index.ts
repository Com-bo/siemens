import { isObjectNotEmpty, isShallowEqual } from './object';
import { isIE, isValidURL } from './browser';
import {
  isEmojiCharacter,
  isNumber,
  isSpecialCharacters,
  isStringNotEmpty,
  isStringNotEmptyOrWhiteSpace,
} from './string';
const validatorWrapper =
  <F extends (...args: any[]) => boolean>(f: F) =>
  (...args: [...Parameters<F>, string?]) => {
    const tail = args.pop();
    return Validator.experssion(f(...args), tail);
  };

export class Validator {
  /**
   * 统一校验，当判断失败且有message时，抛出message异常
   * @param exp
   * @param message
   * @returns
   */
  static experssion(exp: boolean, message: string = undefined) {
    if (!exp && message) {
      throw message;
    }
    return exp;
  }

  static isIE = validatorWrapper(isIE);

  /**
   * 浅比较
   */
  static isShallowEqual = validatorWrapper(isShallowEqual);

  static isNumber = validatorWrapper(isNumber);

  static isSpecialCharacters = validatorWrapper(isSpecialCharacters);

  static isEmojiCharacter = validatorWrapper(isEmojiCharacter);

  static isObjectNotEmpty = validatorWrapper(isObjectNotEmpty);

  static isStringNotEmpty = validatorWrapper(isStringNotEmpty);

  static isStringNotEmptyOrWhiteSpace = validatorWrapper(
    isStringNotEmptyOrWhiteSpace,
  );

  static isValidURL = validatorWrapper(isValidURL);
}

export default Validator;
