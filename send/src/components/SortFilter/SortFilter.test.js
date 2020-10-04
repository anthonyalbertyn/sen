import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import SortFilter from "./SortFilter";

test("renders a sort filter", () => {
  render(<SortFilter isSortAscending setIsSortAscending={() => {}} />);
  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBe(2);
});

test("button fires an onClick event when clicked", () => {
  const setIsSortAscending = jest.fn();
  render(
    <SortFilter isSortAscending setIsSortAscending={setIsSortAscending} />
  );
  const buttons = screen.getAllByRole("button");
  fireEvent.click(buttons[1]);
  expect(setIsSortAscending).toHaveBeenCalled();
});
