import { SimpleInputMask } from "../react/index";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

test("default input value as mask", async () => {
  render(
    <SimpleInputMask
      mask="0000-0000"
      placeholderChar="_"
      onChange={(maskedValue) => {
        // some code
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} />
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
      placeholderChar="_"
      onChange={(maskedValue) => {
        //some code
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} />
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
      placeholderChar="_"
      onChange={(maskedValue) => {
        value = maskedValue;
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} />
      )}
    />
  );
  await screen.findByRole("testId");
  fireEvent.input(screen.getByDisplayValue("____-____"), {
    target: { value: "22223333" },
  });
  expect(value).toEqual("2222-3333");
});


test("number in mask", async () => {
  let value = ""
  render(
    <SimpleInputMask
      mask="111-0000"
      placeholderChar="_"
      onChange={(maskedValue) => {
        value = maskedValue;
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} />
      )}
    />
  );
  await screen.findByRole("testId");
  fireEvent.input(screen.getByDisplayValue("111-____"), {
    target: { value: "555-2333" },
  });
  expect(value).toEqual("111-2333");
});


test("number in mask - 2", async () => {
  let value = ""
  render(
    <SimpleInputMask
      mask="111-0010"
      placeholderChar="_"
      onChange={(maskedValue) => {
        value = maskedValue;
      }}
      render={(props) => (
        <input role="testId" className="testid" {...props} />
      )}
    />
  );
  await screen.findByRole("testId");
  fireEvent.input(screen.getByDisplayValue("111-__1_"), {
    target: { value: "555-2333" },
  });
  expect(value).toEqual("111-2313");
});

test("number in mask - 3", async () => {
  let value = ""
  render(
    <SimpleInputMask
      mask="+7 000-000"
      placeholderChar="_"
      onChange={(maskedValue) => {
        value = maskedValue;
      }}
      render={(props) => (
        <input role="testId" className="testid" placeholder="+7 ___-___" {...props} />
      )}
    />
  );
  await screen.findByRole("testId");
  fireEvent.input(screen.getByPlaceholderText("+7 ___-___"), {
    target: { value: "5" },
  });
  fireEvent.input(screen.getByPlaceholderText("+7 ___-___"), {
    target: { value: "+7 55_-___" },
  });
  fireEvent.input(screen.getByPlaceholderText("+7 ___-___"), {
    target: { value: "+7 555-___" },
  });
  fireEvent.input(screen.getByPlaceholderText("+7 ___-___"), {
    target: { value: "+7 555-5__" },
  });
  expect(value).toEqual("+7 555-5__");
});