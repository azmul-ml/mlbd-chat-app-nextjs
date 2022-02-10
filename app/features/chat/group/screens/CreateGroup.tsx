import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";

export default function GroupChat({ styles, handleGroupModal }: any) {
  return (
    <>
      <CaretDownOutlined />
      <span className={styles.chatLeftDetailsHeaderText}>Groups</span>
      <Button onClick={handleGroupModal}>
        <PlusOutlined />
      </Button>
    </>
  );
}
