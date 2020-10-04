import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

function EditButton(props) {
  const { onClick = () => {}, label = "" } = props;
  return (
    <Button
      type="secondary"
      size="small"
      icon={<EditOutlined />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default EditButton;
