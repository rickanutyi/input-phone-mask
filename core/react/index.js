import React, { useEffect, useRef } from "react";
import {
  inputChangeIndicator,
  maskNewValue,
  replaceEditablePart,
} from "../index";

/**
   * @example
   * <SimpleInputMask
        mask="0000-0000"
        placeholderChar="_"
        render={(props) => <input {...props} />}
   * />
   */

export const SimpleInputMask = ({ render, mask, placeholderChar, onChange }) => {
  const ref = useRef(null);
  const inputState = useRef({ value: replaceEditablePart(mask, placeholderChar) });

  const onInput = ({ target: { value }, nativeEvent }) => {
    if (nativeEvent && nativeEvent.inputType === "deleteContentBackward") {
      onChange && onChange(value);
      return;
    }
    const maskWithPlaceholderChar = replaceEditablePart(mask, placeholderChar);
    const newValue = maskNewValue(maskWithPlaceholderChar, value, placeholderChar);
    ref.current.value = newValue;
    onChange && onChange(newValue);
    inputChangeIndicator(newValue, ref.current, placeholderChar);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.value = inputState.current.value;
    }
  }, [ref]);
  return render({ ref, onInput });
};
