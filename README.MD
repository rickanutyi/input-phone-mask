# Input Simple Mask

Implement a simple mask for input effortlessly using the `InputPhoneMask` function. This function accepts various parameters to tailor the input behavior according to your needs.

## Usage
# Js

```js
    window.InputPhoneMask({
        input: "input",                   // ID of the input element
        mask: "0000 0000 0000 0000",      // Mask for formatting the input.
        onChange: (value) => console.log(value), // Callback function triggered on input change
        placeholderChar: "-",                 // The character shown exept of "0" in the mask
    });
```
## React


```jsx
    import { SimpleInputMask } from "input-simple-mask";

    <SimpleInputMask
        mask={"+2 000-777-000"}
        placeholderChar={"_"}
        onChange={(maskedValue) => {
            // your code ...
        }}
        render={(props) => (
            // Input should accept the 'ref' parameter 
            <input {...props} /> // Do not pass the input value
        )} 
    />  
    // input value = +2 ___-777-___
    // The digits (except for zero) are part of the mask and will not change upon input.
```

```jsx
    import { SimpleInputMask } from "input-simple-mask";

    <SimpleInputMask
        mask={"0000 0000 0000 0000"}
        placeholderChar={"_"}
        onChange={(maskedValue) => {
            // your code ...
        }}
        render={(props) => (
            // Input should accept the 'ref' parameter 
            <input {...props} /> // Do not pass the input value
        )} 
    />   
```
## Parameters

- **input**: ID of the input element to apply the mask to.
- **mask**: A string defining the mask for formatting the input. Use "0" for editable parts and any other character for fixed parts of the mask.
- **onChange**: A callback function that receives the current value or masked value on input change.
- **placeholderChar**: The character to be displayed instead of "0" in the mask.

## Example

If `mask` is set to "00-00" and `placeholderChar` is set to "_", the input will display "\_\_-\_\_".
