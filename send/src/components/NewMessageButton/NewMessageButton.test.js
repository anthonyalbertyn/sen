import React from "react";
import { render, fireEvent } from "@testing-library/react";

import NewMessageButton from "./NewMessageButton";

test("renders a new message button", () => {
  const { getByText } = render(
    <NewMessageButton label="New Message" onClick={() => {}} />
  );
  const buttonElement = getByText(/New Message/i);
  expect(buttonElement).toBeInTheDocument();
});

test("new message button fires onClick when clicked", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <NewMessageButton label="New Message" onClick={onClick} />
  );
  const buttonElement = getByText(/New Message/i);
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalled();
});
