import React from "react";
import { Modal, Button } from "antd";

function CreateModal(props) {
  const {
    title = "",
    isVisible = false,
    onClickOk = () => {},
    onClickCancel = () => {},
    createDisabled = false,
    children,
  } = props;

  return (
    <Modal
      visible={isVisible}
      title={title}
      onOk={onClickOk}
      onCancel={onClickCancel}
      footer={[
        <Button key="cancel" onClick={onClickCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onClickOk}
          disabled={createDisabled}
        >
          Create
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default CreateModal;
