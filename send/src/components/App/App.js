import React, { useRef, useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import NewMessageButton from "../NewMessageButton";
import MessageList from "../MessageList";
import CreateModal from "../CreateModal";
import EditModal from "../EditModal";
import MessageForm from "../MessageForm";

function App() {
  const [messages, setMessages] = useState([]);

  const lastCreatedMessageId = useRef(0);

  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [isCreateDisabled, setIsCreateDisabled] = useState(true);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

  const [editMessageId, setEditMessageId] = useState(0);

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
    if (
      !message ||
      !unixTimestamp ||
      typeof message !== "string" ||
      typeof unixStamp !== "string"
    ) {
      console.error(
        "Could not create message - missing or invalid field values"
      );
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

  const updateMessage = (message, unixTimestamp) => {};

  const handleUpdateMessage = (message, unixTimestamp) => {
    updateMessage(message, unixTimestamp);
    setIsCreateModalActive(false);
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

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
    // add a delete message confimation here
    // maybe a toaster message
  };

  const handleOnEditClick = (messageId) => {
    setEditMessageId(messageId);
    setIsEditModalActive(true);
  };

  const handleOnDeleteClick = (messageId) => {
    alert("Delete message id: " + messageId);
  };

  const handleCreate = () => {
    setIsCreateModalActive(true);
  };

  const handleCreateModalOk = () => {
    setIsCreateModalActive(false);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalActive(false);
  };

  const handleEditModalOk = () => {
    setEditMessageId(0);
    setIsEditModalActive(false);
  };

  const handleEditModalCancel = () => {
    setEditMessageId(0);
    setIsEditModalActive(false);
  };

  const editMessageData = getMessageData(editMessageId);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Message Scheduler</h1>
      </header>
      <div className="app-actions">
        <NewMessageButton label="New Message" onClick={handleCreate} />
      </div>
      {messages.length > 0 && (
        <div className="app-message-list-wrapper">
          <MessageList
            messages={messages}
            onEditClick={handleOnEditClick}
            onDeleteClick={handleOnDeleteClick}
          />
        </div>
      )}
      {isCreateModalActive && (
        <CreateModal
          title="Create new message"
          isVisible={isCreateModalActive}
          onClickOk={handleCreateModalOk}
          onClickCancel={handleCreateModalCancel}
          createDisabled={isCreateDisabled}
        >
          <MessageForm
            enableOk={() => setIsCreateDisabled(false)}
            disableOk={() => setIsCreateDisabled(true)}
            createMessage={createMessage}
          />
        </CreateModal>
      )}
      {isEditModalActive && editMessageData && (
        <EditModal
          title="Edit message"
          isVisible={isEditModalActive}
          onClickOk={handleEditModalOk}
          onClickCancel={handleEditModalCancel}
          updateDisabled={isUpdateDisabled}
        >
          <MessageForm
            enableOk={() => setIsUpdateDisabled(false)}
            disableOk={() => setIsUpdateDisabled(true)}
            message={editMessageData.message}
            unixTimestamp={editMessageData.unixTimestamp}
          />
        </EditModal>
      )}
    </div>
  );
}

export default App;
