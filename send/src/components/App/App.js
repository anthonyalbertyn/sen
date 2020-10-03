import React, { useRef, useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import NewMessageButton from "../NewMessageButton";
import MessageList from "../MessageList";
import MessageModal from "../MessageModal";
import MessageForm from "../MessageForm";
import SortFilter from "../SortFilter";

function App() {
  const [messages, setMessages] = useState([]);

  const lastCreatedMessageId = useRef(0);

  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [editMessageId, setEditMessageId] = useState(0);
  const [isSortAscending, setIsSortAscending] = useState(true);

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

  const handleOnEditClick = (messageId) => {
    setEditMessageId(messageId);
    setIsEditModalActive(true);
  };

  const handleOnDeleteClick = (messageId) => {
    deleteMessage(messageId);
  };

  const handleCreate = () => {
    setIsCreateModalActive(true);
  };

  const handleCreateModalSave = (messageText, unixTimestamp) => {
    createMessage(messageText, unixTimestamp);
    setIsCreateModalActive(false);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalActive(false);
  };

  const handleEditModalSave = (message, unixTimestamp) => {
    updateMessage(message, unixTimestamp);
    setEditMessageId(0);
    setIsEditModalActive(false);
  };

  const handleEditModalCancel = () => {
    setEditMessageId(0);
    setIsEditModalActive(false);
  };

  const editMessageData = getMessageData(editMessageId);

  const sortOrderText = isSortAscending ? "ascending" : "descending";

  return (
    <div className="app">
      <header className="app-header">
        <h1>Message Scheduler</h1>
      </header>
      <div className="app-actions">
        <div className="app-new-message-button-wrapper">
          <NewMessageButton label="New Message" onClick={handleCreate} />
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
            onEditClick={handleOnEditClick}
            onDeleteClick={handleOnDeleteClick}
            sortAscending={isSortAscending}
          />
        </div>
      )}
      {isCreateModalActive && (
        <MessageModal
          title="Create new message"
          isVisible={isCreateModalActive}
          onClickCancel={handleCreateModalCancel}
        >
          <MessageForm
            onClickCancel={handleCreateModalCancel}
            onClickSave={handleCreateModalSave}
          />
        </MessageModal>
      )}
      {isEditModalActive && editMessageData && (
        <MessageModal
          title="Edit message"
          isVisible={isEditModalActive}
          onClickCancel={handleEditModalCancel}
        >
          <MessageForm
            onClickCancel={handleEditModalCancel}
            onClickSave={handleEditModalSave}
            message={editMessageData.message}
            unixTimestamp={editMessageData.unixTimestamp}
          />
        </MessageModal>
      )}
    </div>
  );
}

export default App;
