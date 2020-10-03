import React from "react";
import { Card, Popconfirm } from "antd";
import "./MessageCard.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";

function MessageCard(props) {
  const {
    title = "",
    messageText = "",
    messageId = 0,
    onEditClick = () => {},
    onDeleteClick = () => {},
  } = props;
  return (
    <Card title={title} className="message-card">
      <div className="message-card-body">{messageText}</div>
      <div className="message-card-actions">
        <div className="message-card-action-buttons-wrapper">
          <div className="message-card-action-button">
            <EditButton label="Edit" onClick={onEditClick} />
          </div>
          <div className="message-card-action-button">
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              placement="topLeft"
              onConfirm={onDeleteClick}
            >
              <DeleteButton label="Delete" />
            </Popconfirm>
          </div>
        </div>
        <div className="message-id">ID: {messageId}</div>
      </div>
    </Card>
  );
}

export default MessageCard;
