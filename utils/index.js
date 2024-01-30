/**
 * Принимает маску(строку) и вернет длину редактируемой части маски
 * @param { string } mask
 * @returns {number}
 */
export const getMutableMaskPartsLength = (mask) =>
  mask.split("").filter((mi) => mi === "0").length;

/**
 * Проверка редактируемой части маски.
 * Редактируемая часть маски будет указываться цифрой 0
 * @param { string } char - строка для проверки, 1 символ
 * @returns { boolean }
 */
export const isMutable = (char) => char === "0";

/**
 * Проверяет нет ли в переданной строке символы кроме цифр
 * @param {string} char
 * @returns {boolean}
 */
export const isNumber = (char) => !/\D/g.test(char) && /\d/g.test(char);

/**
 * Проверка переданного значения на undefined
 * @param {any} char
 * @returns {boolean}
 */
export const isUndefined = (char) => char === undefined;
