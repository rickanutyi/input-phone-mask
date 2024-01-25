import { InputPhoneMask } from "core/index";

InputPhoneMask({
  input: "input",
  mask: "+996 000-000-000",
  onChange: (value) => console.log(value),
  replaceChar: "_",
});
