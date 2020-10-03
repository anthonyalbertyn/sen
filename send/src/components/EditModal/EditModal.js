import React from "react";
import { Modal, Button } from "antd";

function EditModal(props) {
  const {
    title = "",
    isVisible = false,
    onClickOk = () => {},
    onClickCancel = () => {},
    updateDisabled = false,
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
          disabled={updateDisabled}
        >
          Update
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default EditModal;
