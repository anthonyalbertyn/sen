import React from "react";
import { render, fireEvent } from "@testing-library/react";

import EditButton from "./EditButton";

test("renders an edit button", () => {
  const { getByText } = render(<EditButton label="Edit" onClick={() => {}} />);
  const buttonElement = getByText(/Edit/i);
  expect(buttonElement).toBeInTheDocument();
});

test("edit button fires onClick when clicked", () => {
  const onClick = jest.fn();
  const { getByText } = render(<EditButton label="Edit" onClick={onClick} />);
  const buttonElement = getByText(/Edit/i);
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalled();
});
