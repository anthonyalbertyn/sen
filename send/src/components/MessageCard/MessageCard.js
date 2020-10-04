import React from "react";
import { Card, Popconfirm } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import PropTypes from "prop-types";
import "./MessageCard.css";

const { Meta } = Card;

const propsDefinition = {
  messageId: PropTypes.number.isRequired,
  messageText: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

function MessageCard(props) {
  const {
    messageId = 0,
    messageText = "",
    onDeleteClick = () => {},
    onEditClick = () => {},
    title = "",
  } = props;
  return (
    <Card className="message-card">
      <div>
        <Meta avatar={<CalendarOutlined />} title={title} />
      </div>
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

MessageCard.propTypes = propsDefinition;

export default MessageCard;
