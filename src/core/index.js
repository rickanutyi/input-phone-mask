import { isMutable, isNumber, isUndefined } from "utils/index";

/**
 *
 * @param {string} mask - Маска
 * @param {string} newValue - Значение из поля ввода
 * @param {string} replaceCahr
 * @returns {string}
 * @example
 * MutableReplaceChar = "_"
 * maskNewValue('+996-000-000-000', '12') => '+996-12_-___-___'
 */
export const maskNewValue = (mask, newValue, replaceChar) => {
  const unmaskedValue = newValue.replace(/\D/g, "").replace(/^(996)/, "");
  let index = 0;
  const arrayFromMask = mask.split("");
  const maskedValueArray = arrayFromMask.map((char, i) => {
    if (char === replaceChar && isNumber(unmaskedValue[index])) {
      const value = unmaskedValue[index];
      index = index + 1;
      return value;
    } else return char;
  });
  const maskedValue = maskedValueArray.join("");
  return maskedValue;
};

/**
 *
 * @param {string} value - значение инпута
 * @param {string} mask - Маска, только где изменяемы значения были заменены на replaceChar
 * @returns {string}
 */
export const maskOnDelete = (value, mask, replaceChar) => {
  const maskArray = mask.split("");
  const unmaskedValue = value.replace(/\D/g, "").replace(/^(996)/, "");
  console.log(unmaskedValue);
  let index = 0;
  const newValue = maskArray.reduce((acc, prev) => {
    if (prev === replaceChar) {
      index = index + 1;
      //тут мы смотрим если что то стерлось unmaskedValue[index - 1] будет undefined, в таком случае акрнем acc + replaceChar
      return unmaskedValue[index - 1]
        ? acc + unmaskedValue[index - 1]
        : acc + replaceChar;
    }
    return acc + prev;
  }, "");
  return `${newValue}`;
};

/**
 *
 * @param {{
 *  input: string;
 *  onChange: (value: string) => void;
 *  mask: string
 *  replaceChar: string
 * }} props
 */
export const InputPhoneMask = ({ input, onChange, mask, replaceChar }) => {
  const Input = document.getElementById(input);
  const maskWithReplaceChar = mask.replace(/0/g, replaceChar);
  Input.value = maskWithReplaceChar;
  let betweenCharCount = 0;
  Input.addEventListener("input", function (event) {
    const inputValue = event.currentTarget.value;
    //при нажатии на кнопку удаления
    if (event.inputType === "deleteContentBackward") {
    //   let stop = false;
    //   const selectionPosition = Input.selectionStart;
    //   const maskedValue = maskOnDelete(
    //     inputValue,
    //     maskWithReplaceChar,
    //     replaceChar
    //   );
    //   Input.value = maskedValue;
      //вот это нужно чтобы контролировать расположение палочки в инпуте(забыл как называется)
      // И это обязательно нужно делать после того как значение инпута поменяется

    //   let replaceCharCount = maskedValue
    //     .split("")
    //     .filter((e) => e === replaceChar).length;
    //   if (
    //     maskedValue[selectionPosition - 1] !== replaceChar &&
    //     !isNumber(maskedValue[selectionPosition - 1])
    //   ) {
    //     betweenCharCount = betweenCharCount + 1;
    //   } else if (
    //     maskedValue[selectionPosition] !== replaceChar &&
    //     !isNumber(maskedValue[selectionPosition])
    //   )
    //     betweenCharCount = betweenCharCount + 1;
    //   Input.setSelectionRange(
    //     Input.selectionStart - (replaceCharCount + betweenCharCount),
    //     Input.selectionStart - (replaceCharCount + betweenCharCount)
    //   );

      return;
    }
    if (betweenCharCount !== 0) betweenCharCount = 0;
    const maskedValue = maskNewValue(
      maskWithReplaceChar,
      inputValue,
      replaceChar
    );
    onChange(maskedValue);
    Input.value = maskedValue;
  });
};
