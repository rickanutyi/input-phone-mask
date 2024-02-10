export declare function maskNewValue(
  mask: string,
  newValue: string,
  placeholderChar: string
): string;

export declare function replaceEditablePart(
  mask: string,
  placeholderChar: string
): string;

export declare function inputChangeIndicator(
  maskedValue: string,
  Input: HTMLInputElement,
  placeholderChar: stirng
): void;

export declare function InputPhoneMask(props: {
  input: string;
  onChange: (value: string) => void;
  mask: string;
  placeholderChar: string;
});
