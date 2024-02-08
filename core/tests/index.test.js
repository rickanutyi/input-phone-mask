import { SimpleInputMask } from "../react/index";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

test("default input value as mask", async () => {
  render(
    <SimpleInputMask
      mask="0000-0000"
      replaceChar="_"
      onChange={(maskedValue) => {
        // some code
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} /> // Do not pass the input value
      )}
    />
  );
  await screen.findByRole("testId");
  expect(screen.getByDisplayValue("____-____")).toBeInTheDocument();
});
test("onChange value", async () => {
  render(
    <SimpleInputMask
      mask="0000-0000"
      replaceChar="_"
      onChange={(maskedValue) => {
        //some code
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} /> // Do not pass the input value
      )}
    />
  );
  await screen.findByRole("testId");
  fireEvent.input(screen.getByDisplayValue("____-____"), {
    target: { value: "22223333" },
  });
  expect(screen.getByDisplayValue("2222-3333")).toBeInTheDocument();
});

test("display input value on change", async () => {
  let value = "";
  render(
    <SimpleInputMask
      mask="0000-0000"
      replaceChar="_"
      onChange={(maskedValue) => {
        value = maskedValue;
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} /> // Do not pass the input value
      )}
    />
  );
  await screen.findByRole("testId");
  fireEvent.input(screen.getByDisplayValue("____-____"), {
    target: { value: "22223333" },
  });
  expect(value).toEqual("2222-3333");
});
