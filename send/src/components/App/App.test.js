import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import App from "./App";

test("renders Message Scheduler title", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Message Scheduler/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders New Message button", () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/New Message/i);
  expect(buttonElement).toBeInTheDocument();
});

test("can open a modal", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/New Message/i));
  await screen.getByText(/Create new message/i);
  const modalElement = screen.getByText(/Create new message/i);
  expect(modalElement).toBeInTheDocument();
});

test("can create and display a message card", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/New Message/i));
  await screen.getByText("Create new message");
  const messageInputElement = screen.getByPlaceholderText(/Add a message/i);
  fireEvent.change(messageInputElement, { target: { value: "Hello" } });
  const dateSelectorElement = screen.getByPlaceholderText(/Select date/i);
  fireEvent.change(dateSelectorElement, {
    target: { value: "31-08-2040 12:00" },
  });
  fireEvent.keyPress(dateSelectorElement, {
    key: "Enter",
    code: 13,
    charCode: 13,
  });
  const saveButton = screen.getByText(/Save/i);
  fireEvent.click(saveButton);
  await screen.getByText(/Hello/i);
  const messageCard = screen.getByText(/Hello/i);
  expect(messageCard).toBeInTheDocument();
});
