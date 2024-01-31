# Input Simple Mask

Implement a simple mask for phone input effortlessly using the `InputPhoneMask` function. This function accepts various parameters to tailor the input behavior according to your needs.

## Usage
```
window.InputPhoneMask({
    input: "input",                   // ID of the input element
    mask: "0000 0000 0000 0000",      // Mask for formatting the input
    onChange: (value) => console.log(value), // Callback function triggered on input change
    replaceChar: "-",                 // The character shown instead of "0" in the mask
});

## Parameters

- **input**: ID of the input element to apply the mask to.
- **mask**: A string defining the mask for formatting the input. Use "0" for editable parts and any other character for fixed parts of the mask.
- **onChange**: A callback function that receives the current value or masked value on input change.
- **replaceChar**: The character to be displayed instead of "0" in the mask.

## Example

If `mask` is set to "00-00" and `replaceChar` is set to "_", the input will display "__-__".
