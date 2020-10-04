import React, { useRef, useState } from "react";
import NewMessageButton from "../NewMessageButton";
import MessageForm from "../MessageForm";
import MessageList from "../MessageList";
import MessageModal from "../MessageModal";
import SortFilter from "../SortFilter";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  // In a more complex application, we can store
  // messages state in a Redux store, but for this
  // tiny app, component state will do
  const [messages, setMessages] = useState([]);

  // If this app was accessing an API to save
  // and retrieve data from a relational database,
  // then the id for each record would come from
  // the primary key from a database record via
  // a response from the API. For this app we
  // just use a simple count. We could do this
  // in component state, but useRef is ok too as
  // it avoids an extra component rerender every
  // time its value changes.
  const lastCreatedMessageId = useRef(0);

  // State for tracking opening and closing modals
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);

  // State for tracking which message is been edited
  const [editMessageId, setEditMessageId] = useState(0);

  // State to track sort order of messages
  const [isSortAscending, setIsSortAscending] = useState(true);

  // Add a new message to messages state
  const createMessage = (message, unixTimestamp) => {
    if (!message || !unixTimestamp) {
      console.error("Could not create message - missing field values");
      return;
    }
    const newMessage = {
      id: lastCreatedMessageId.current + 1,
      unixTimestamp: unixTimestamp,
      message: message,
    };
    lastCreatedMessageId.current = lastCreatedMessageId.current + 1;
    setMessages([
      ...messages,
      {
        ...newMessage,
      },
    ]);
  };

  // Update a specific message in messages state
  const updateMessage = (message, unixTimestamp) => {
    if (editMessageId === 0) {
      console.error("Could not update message - messageId may not be 0");
      return;
    }
    const updatedMessages = messages.filter(
      (message) => message.id !== editMessageId
    );
    const updatedMessage = {
      id: editMessageId,
      unixTimestamp: unixTimestamp,
      message: message,
    };
    setMessages([
      ...updatedMessages,
      {
        ...updatedMessage,
      },
    ]);
  };

  // Remove a specific message from messages state
  const deleteMessage = (messageId) => {
    if (!messageId || typeof messageId !== "number") {
      console.error("Could not delete message - invalid or missing message id");
      return;
    }
    const updatedMessages = messages.filter(
      (message) => message.id !== messageId
    );
    setMessages([...updatedMessages]);
  };

  // Retrieve a copy of a specific message from messages state
  const getMessageData = (messageId) => {
    let messageData;
    if (messageId) {
      const data = messages.find((item) => item.id === messageId);
      if (data) {
        messageData = {
          ...data,
        };
      }
    }
    return messageData;
  };

  // Open create message modal
  const handleCreateClick = () => {
    setIsCreateModalActive(true);
  };

  // Close create message modal without saving
  const handleCreateCancel = () => {
    setIsCreateModalActive(false);
  };

  // Save new message and close create message modal
  const handleCreateSave = (messageText, unixTimestamp) => {
    createMessage(messageText, unixTimestamp);
    setIsCreateModalActive(false);
  };

  // Open specific message in edit message modal
  const handleEditClick = (messageId) => {
    setEditMessageId(messageId);
    setIsEditModalActive(true);
  };

  // Close edit message modal without saving
  const handleEditCancel = () => {
    setEditMessageId(0);
    setIsEditModalActive(false);
  };

  // Save changes to message and close edit message modal
  const handleEditSave = (message, unixTimestamp) => {
    updateMessage(message, unixTimestamp);
    setEditMessageId(0);
    setIsEditModalActive(false);
  };

  // Delete a specific message
  const handleDeleteClick = (messageId) => {
    deleteMessage(messageId);
  };

  // Message data for edit message modal
  const editMessageData = getMessageData(editMessageId);

  // Text for sort order wording
  const sortOrderText = isSortAscending ? "ascending" : "descending";

  // For a more complicated app, we could make this component
  // a child of a layout component so that layout can be re-used
  // across the app.
  return (
    <div className="app">
      <header className="app-header">
        <h1>Message Scheduler</h1>
      </header>
      <div className="app-actions">
        <div className="app-new-message-button-wrapper">
          <NewMessageButton label="New Message" onClick={handleCreateClick} />
        </div>
        {messages.length > 1 && (
          <div classNName="app-sort-filter-wrapper">
            <SortFilter
              isSortAscending={isSortAscending}
              setIsSortAscending={setIsSortAscending}
            />
            <div className="app-sort-filter-label">
              Messages sorted by {sortOrderText} post date
            </div>
          </div>
        )}
      </div>
      {messages.length > 0 && (
        <div className="app-message-list-wrapper">
          <MessageList
            messages={messages}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            sortAscending={isSortAscending}
          />
        </div>
      )}
      {isCreateModalActive && (
        <MessageModal
          title="Create new message"
          isVisible={isCreateModalActive}
          onClickCancel={handleCreateCancel}
        >
          <MessageForm
            onClickCancel={handleCreateCancel}
            onClickSave={handleCreateSave}
          />
        </MessageModal>
      )}
      {isEditModalActive && editMessageData && (
        <MessageModal
          title="Edit message"
          isVisible={isEditModalActive}
          onClickCancel={handleEditCancel}
        >
          <MessageForm
            onClickCancel={handleEditCancel}
            onClickSave={handleEditSave}
            message={editMessageData.message}
            unixTimestamp={editMessageData.unixTimestamp}
          />
        </MessageModal>
      )}
    </div>
  );
}

export default App;
