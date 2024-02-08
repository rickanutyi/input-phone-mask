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
        replaceChar="_"
        render={(props) => <input {...props} />}
   * />
   */

export const SimpleInputMask = ({ render, mask, replaceChar, onChange }) => {
  const ref = useRef(null);
  const inputState = useRef({ value: replaceEditablePart(mask, replaceChar) });

  const onInput = ({ target: { value }, nativeEvent }) => {
    if (nativeEvent && nativeEvent.inputType === "deleteContentBackward") {
      onChange && onChange(value);
      return;
    }
    const maskWithReplaceChar = replaceEditablePart(mask, replaceChar);
    const newValue = maskNewValue(maskWithReplaceChar, value, replaceChar);
    ref.current.value = newValue;
    onChange && onChange(newValue);
    inputChangeIndicator(newValue, ref.current, replaceChar);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.value = inputState.current.value;
    }
  }, [ref]);
  return render({ ref, onInput });
};
