import React from "react";

type RenderPropsType = {
  ref: React.MutableRefObject<HTMLInputElement>;
  onInput: React.FormEventHandler<HTMLInputElement>;
};
/**
 * @example
 * <SimpleInputMask
    mask="0000-0000"
    placeholderChar="_"
    onChange={(maskedValue) => {
      // your code ...
    }}
    render={(props) => (
      // Input should accept the 'ref' parameter 
      <input {...props} /> // Do not pass the input value
    )} 
* />
*/
export declare function SimpleInputMask(props: {
  mask: string;
  placeholderChar: string;
  onChange?: (value: string) => void;
  render: (inputProps: RenderPropsType) => React.ReactNode;
});
