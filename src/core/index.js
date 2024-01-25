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
 * @param {string} value
 * @param {string} prevValue
 * @returns {string}
 */
export const maskOnDelete = (value, mask, replaceChar) => {
  const maskArray = mask.split("");
  const unmaskedValue = value.replace(/\D/g, "").replace(/^(996)/, "");
  let index = 0;
  const newValue = maskArray.reduce((acc, prev) => {
    if (prev === replaceChar) {
      index = index + 1;
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

  Input.addEventListener("input", function (event) {
    const inputValue = event.currentTarget.value;
    if (event.inputType === "deleteContentBackward") {
      let stop = false;
      let numbersCount = inputValue.split("").reduce((acc, prev) => {
        if (prev === replaceChar) stop = true;
        if (stop) return acc;
        return acc + 1;
      }, 0);
      if (
        !isNumber(inputValue[numbersCount - 1]) &&
        inputValue[numbersCount - 1] !== replaceChar
      )
        numbersCount = numbersCount - 1;
      const maskedValue = maskOnDelete(
        inputValue,
        maskWithReplaceChar,
        replaceChar
      );
      console.log(maskedValue, "masked");
      Input.value = maskedValue;
      Input.setSelectionRange(numbersCount, numbersCount);
      return;
    }
    const maskedValue = maskNewValue(
      maskWithReplaceChar,
      inputValue,
      replaceChar
    );
    onChange(maskedValue);
    Input.value = maskedValue;
  });
};
