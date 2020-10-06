# Coding Challenge

Completed by: Anthony Albertyn
Date completed: 4 October 2020

## Brief

- Build a small front-end app that is used for scheduling social media posts.
- The app lists messages that a user can create, edit and delete
- The app should have a modal for creating and editing messages
- The message list should be empty when no messages
- The message list needs a button to create new messages
- When the new message button is clicked, a modal opens
- The user can choose to close the modal without applying any changes
- Messages must be displayed in ascending date order in the message list
- Each message should have an edit and delete button
- When a message is added or edited, there should be fields for:
  -- adding a text message
  -- setting a post date and time for the message
- The message form should validate that:
  -- the message text is not empty
  -- the post date and time is not empty
  -- the post date and time is not already passed
- The app should be mobile responsive
- Design is not supplied, so create your own design
- There is no need for the data to persist between sessions
- There is no need to build a REST or other back-end API

## Implementation

- Project was build with React and uses create-react-app as a starting point
- It uses antd for components library https://ant.design
- Unit tests are written with Jest, React Testing Library and Enzyme
- Test coverage could be improved, but it should be good enough to demonstrate testing
- To start the app, cd into ./send then read the README.md file for instructions

## Some bugs

- The console is reporting some errors (cuased by the antd library)
- These errors are produced by the antd Button and DatePicker components
- Upgrading to a later version of antd library should fix the issues
