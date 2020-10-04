import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import MessageForm from "./MessageForm";

test("renders a message form and buttons", () => {
  render(
    <MessageForm
      message="Hello"
      onClickCancel={() => {}}
      onClickSave={() => {}}
      unixTimestamp={2230027200}
    />
  );
  const messageInputElement = screen.getByPlaceholderText(/Add a message/i);
  expect(messageInputElement).toBeInTheDocument();
  const dateSelectorElement = screen.getByPlaceholderText(/Select date/i);
  expect(dateSelectorElement).toBeInTheDocument();
  const cancelButton = screen.getByText(/Cancel/i);
  expect(cancelButton).toBeInTheDocument();
  const saveButton = screen.getByText(/Save/i);
  expect(saveButton).toBeInTheDocument();
});
