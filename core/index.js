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

/**
 *
 * @param {string} value - значение инпута
 * @param {string} mask - Маска, только где изменяемы значения были заменены на replaceChar
 * @returns {string}
 */
export const maskOnDelete = (value, mask, replaceChar) => {
  const maskArray = mask.split("");
  const unmaskedValue = value.replace(/\D/g, "").replace(/^(996)/, "");
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

export const replaceEditablePart = (mask, replaceChar) => {
  return mask.replace(/0/g, replaceChar);
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
    onChange(maskedValue);
    Input.value = maskedValue;
    inputChangeIndicator(maskedValue, Input);
  });
};