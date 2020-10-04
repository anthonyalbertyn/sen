import React from "react";
import { shallow, mount } from "../../enzyme";
import MessageList from "./MessageList";

const messageListPropsFixture = {
  messages: [
    {
      id: 1,
      message: "Newest",
      unixTimestamp: 2238927120, // 12-12-2040 12:12
    },
    {
      id: 2,
      message: "Oldest",
      unixTimestamp: 2208993000, // 01-01-2040 01:10
    },
  ],
  onDeleteClick: () => {},
  onEditClick: () => {},
  sortAscending: true,
};

test("renders a message list", () => {
  const wrapper = shallow(<MessageList {...messageListPropsFixture} />);
  expect(wrapper.find("MessageList")).toExist;
});

test("renders message cards in a message list", () => {
  const wrapper = mount(<MessageList {...messageListPropsFixture} />);
  expect(wrapper.find("MessageCard").length).toBe(2);
});

test("renders message cards in ascending date order", () => {
  const wrapper = mount(<MessageList {...messageListPropsFixture} />);
  expect(wrapper.find(".message-card-body").first().text()).toBe("Oldest");
});
