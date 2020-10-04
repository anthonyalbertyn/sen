import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const propsDefinition = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

function DeleteButton(props) {
  const { onClick = () => {}, label = "" } = props;
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

DeleteButton.propTypes = propsDefinition;

export default DeleteButton;
