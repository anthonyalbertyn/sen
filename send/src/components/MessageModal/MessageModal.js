import React from "react";
import { Modal } from "antd";

function MessageModal(props) {
  const {
    title = "",
    isVisible = false,
    onClickCancel = () => {},
    children,
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
