import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import MessageModal from "./MessageModal";

test("renders a modal", () => {
  render(
    <MessageModal isVisible title="Modal" onClickCancel={() => {}}>
      <div>child</div>
    </MessageModal>
  );
  const modalElement = screen.getByText(/Modal/i);
  expect(modalElement).toBeInTheDocument();
  const childElement = screen.getByText(/child/i);
  expect(childElement).toBeInTheDocument();
});

test("fires onClickCancel when close button clicked", () => {
  const onClickCancel = jest.fn();
  render(
    <MessageModal isVisible title="Modal" onClickCancel={onClickCancel}>
      <div>child</div>
    </MessageModal>
  );
  const closeButton = screen.getByRole("button");
  expect(closeButton).toBeInTheDocument();
  fireEvent.click(closeButton);
  expect(onClickCancel).toHaveBeenCalled();
});
