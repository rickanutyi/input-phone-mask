#Input simple mask

window.InputPhoneMask({
    input: "input",
    mask: "0000 0000 0000 0000",
    onChange: (value) => console.log(value),
    replaceChar: "-",
});
input = id of input
mask = any string value, char "0" will be editable part, any other char will be part of mask
onChange = Function(value: string / MaskedValue)
replaceChar = The value that will shown instead of "0"
example mask = 00-00, replaceChar = "_", input shows "__-__"