import { isMutable, isNumber } from "utils";

/**
 * 
 * @param {string} mask - Маска
 * @param {string} newValue - Значение из поля ввода
 * @returns {string}
 * @example
 * MutableReplaceChar = "_"
 * maskNewValue('+996-000-000-000', '12') => '+996-12_-___-___'
 */
export const maskNewValue = (mask, newValue) => {
  const unmaskedValue = newValue.replace(/\D/g, "").replace(/^(996)/, "");
  let index = 0;
  const arrayFromMask = mask.split("");
  const maskedValueArray = arrayFromMask.map((char, i) => {
    if (isMutable(char) && isNumber(unmaskedValue[index])) {
      const value = unmaskedValue[index];
      index = index + 1;
      return value;
    } else return char;
  });
  const maskedValue = maskedValueArray.join("");
  return maskedValue;
};
