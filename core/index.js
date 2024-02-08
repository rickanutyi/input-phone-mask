import { isNumber } from "../utils";

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

export const replaceEditablePart = (mask, replaceChar) => {
  const withReplacedChar = mask.replace(/0/g, replaceChar);
  if (withReplacedChar) return withReplacedChar;
  return "";
};

export const inputChangeIndicator = (maskedValue, Input, replaceChar) => {
  let stop = false;
  const numbersCount = maskedValue.split("").reduce((acc, prev) => {
    if (prev === replaceChar) stop = true;
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
 *  replaceChar: string
 * }} props
 * @example
 * window.InputPhoneMask({
    input: "input",
    mask: "0000 0000 0000 0000",
    onChange: (value) => console.log(value),
    replaceChar: "-",
  });
 */
export const InputPhoneMask = ({ input, onChange, mask, replaceChar }) => {
  const Input = document.getElementById(input);
  const maskWithReplaceChar = replaceEditablePart(mask, replaceChar);
  Input.value = maskWithReplaceChar;
  Input.addEventListener("input", function (event) {
    const inputValue = event.currentTarget.value;
    //при нажатии на кнопку удаления
    if (event.inputType === "deleteContentBackward") {
      return;
    }
    const maskedValue = maskNewValue(
      maskWithReplaceChar,
      inputValue,
      replaceChar
    );
    onChange && onChange(maskedValue);
    Input.value = maskedValue;
    inputChangeIndicator(maskedValue, Input);
  });
};
