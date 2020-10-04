import React from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const propsDefinition = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

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

NewMessageButton.propTypes = propsDefinition;

export default NewMessageButton;
