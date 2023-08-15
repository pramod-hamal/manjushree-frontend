"use client";

import { useEffect, useState } from "react";
import { Modal } from "antd";

export interface CusModalProps {
  show: boolean;
  children?: any;
  onClose?: any;
  title?: string;
  style?: any;
  width?: number;
}

export default function CusModal({
  show,
  onClose,
  children,
  title,
  style,
  width,
}: CusModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    <Modal
      title={title ?? ""}
      open={showModal}
      onOk={() => {}}
      style={style}
      centered={true}
      footer={false}
      width={width}
      onCancel={onClose}
    >
      {children}
    </Modal>
  );
}
