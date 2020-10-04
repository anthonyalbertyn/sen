import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import MessageCard from "./MessageCard";

test("renders a message card", () => {
  render(
    <MessageCard
      messageId={1}
      messageText="Hello"
      onDeleteClick={() => {}}
      onEditClick={() => {}}
      title="Card"
    />
  );
  const cardElement = screen.getByText(/Card/i);
  expect(cardElement).toBeInTheDocument();
  const cardMessageElement = screen.getByText(/Hello/i);
  expect(cardMessageElement).toBeInTheDocument();
  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBe(2);
});

test("calls onClick handlers for buttons", async () => {
  const onDeleteClick = jest.fn();
  const onEditClick = jest.fn();
  render(
    <MessageCard
      messageId={1}
      messageText="Hello"
      onDeleteClick={onDeleteClick}
      onEditClick={onEditClick}
      title="Card"
    />
  );
  const buttons = screen.getAllByRole("button");
  fireEvent.click(buttons[0]);
  expect(onEditClick).toHaveBeenCalled();
  fireEvent.click(buttons[1]);
  await screen.getByText(/Are you sure/i);
  const confirmationElement = screen.getByText(/Are you sure/i);
  expect(confirmationElement).toBeInTheDocument();
  const deleteContirmationButton = screen.getByText(/Yes/i);
  fireEvent.click(deleteContirmationButton);
  expect(onDeleteClick).toHaveBeenCalled();
});
