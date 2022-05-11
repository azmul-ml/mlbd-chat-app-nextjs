import React, { ReactNode } from "react";
import { Modal, Button } from "antd";

export interface CustomModalProps {
  children: ReactNode;
  visible: boolean;
  handleCancel: () => void;
  title: string | undefined;
}

export default function CustomModal({
  children,
  visible,
  handleCancel,
  title,
  ...props
}: CustomModalProps) {
  return (
    <Modal
      title={title}
      visible={visible}
      closable
      onCancel={handleCancel}
      footer={null}
      centered
    >
      {children}
    </Modal>
  );
}
