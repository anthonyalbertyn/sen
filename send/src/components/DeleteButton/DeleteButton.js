import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteButton(props) {
  const { label = "", onClick = () => {} } = props;
  return (
    <Button
      type="secondary"
      size="small"
      icon={<DeleteOutlined />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default DeleteButton;
