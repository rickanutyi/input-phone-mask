export declare function maskNewValue(
  mask: string,
  newValue: string,
  replaceChar: string
): string;

export declare function replaceEditablePart(
  mask: string,
  replaceChar: string
): string;

export declare function inputChangeIndicator(
  maskedValue: string,
  Input: HTMLInputElement,
  replaceChar: stirng
): void;

export declare function InputPhoneMask(props: {
  input: string;
  onChange: (value: string) => void;
  mask: string;
  replaceChar: string;
});
