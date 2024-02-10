import { isNumber, isMutable } from "../utils";

/**
 *
 * @param {string} mask - Маска
 * @param {string} newValue - Значение из поля ввода
 * @param {string} replaceCahr
 * @returns {string}
 * @example
 * MutablePlaceholderChar = "_"
 * maskNewValue('+996-000-000-000', '12') => '+996-12_-___-___'
 */
export const maskNewValue = (mask, newValue, placeholderChar) => {
  const unmaskedValue = newValue.replace(/\D/g, "");
  let index = 0;
  const arrayFromMask = mask.split("");
  const maskedValueArray = arrayFromMask.map((char, i) => {
    if (isNumber(char)) {
      index = index + 1;
      return char;
    }
    if (char === placeholderChar && isNumber(unmaskedValue[index])) {
      const value = unmaskedValue[index];
      index = index + 1;
      return value;
    } else return char;
  });
  const maskedValue = maskedValueArray.join("");
  return maskedValue;
};

export const replaceEditablePart = (mask, placeholderChar) => {
  const withReplacedChar = mask.replace(/0/g, placeholderChar);
  if (withReplacedChar) return withReplacedChar;
  return "";
};

export const inputChangeIndicator = (maskedValue, Input, placeholderChar) => {
  let stop = false;
  const numbersCount = maskedValue.split("").reduce((acc, prev) => {
    if (prev === placeholderChar) stop = true;
    if (stop) return acc;
    return acc + 1;
  }, 0);

  Input.setSelectionRange(numbersCount, numbersCount);
};

/**
 *
 * @param {{
 *  input: string;
 *  onChange: (value: string) => void;
 *  mask: string
 *  placeholderChar: string
 * }} props
 * @example
 * window.InputPhoneMask({
    input: "input",
    mask: "0000 0000 0000 0000",
    onChange: (value) => console.log(value),
    placeholderChar: "-",
  });
 */
export const InputPhoneMask = ({ input, onChange, mask, placeholderChar }) => {
  const Input = document.getElementById(input);
  const maskWithPlaceholderChar = replaceEditablePart(mask, placeholderChar);
  Input.value = maskWithPlaceholderChar;
  Input.addEventListener("input", function (event) {
    const inputValue = event.currentTarget.value;
    //при нажатии на кнопку удаления
    if (event.inputType === "deleteContentBackward") {
      return;
    }
    const maskedValue = maskNewValue(
      maskWithPlaceholderChar,
      inputValue,
      placeholderChar
    );
    onChange && onChange(maskedValue);
    Input.value = maskedValue;
    inputChangeIndicator(maskedValue, Input);
  });
};
