import React from "react";
import { render, fireEvent } from "@testing-library/react";

import DeleteButton from "./DeleteButton";

test("renders a delete button", () => {
  const { getByText } = render(
    <DeleteButton label="Delete" onClick={() => {}} />
  );
  const buttonElement = getByText(/Delete/i);
  expect(buttonElement).toBeInTheDocument();
});

test("delete button fires onClick when clicked", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <DeleteButton label="Delete" onClick={onClick} />
  );
  const buttonElement = getByText(/Delete/i);
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalled();
});
