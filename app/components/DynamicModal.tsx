"use client";

import React from "react";
import { Modal, ModalProps } from "antd";

export interface DynamicModalProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
}

export default function DynamicModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 800,
  ...rest
}: DynamicModalProps) {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
      destroyOnClose
      {...rest}
    >
      {children}
    </Modal>
  );
}
