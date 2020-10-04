import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const propsDefinition = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

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

EditButton.propTypes = propsDefinition;

export default EditButton;
