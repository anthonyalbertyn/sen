import React from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";

function NewMessageButton(props) {
  const { label = "", onClick = () => {} } = props;
  return (
    <Button
      type="primary"
      size="large"
      icon={<MessageOutlined />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default NewMessageButton;
