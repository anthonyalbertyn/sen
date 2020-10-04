import React from "react";
import { Modal } from "antd";

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

export default MessageModal;
