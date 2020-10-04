import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

const propsDefinition = {
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  onClickCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

function MessageModal(props) {
  const {
    children,
    isVisible = false,
    onClickCancel = () => {},
    title = "",
  } = props;

  return (
    <Modal
      visible={isVisible}
      title={title}
      onCancel={onClickCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
}

MessageModal.propTypes = propsDefinition;

export default MessageModal;
