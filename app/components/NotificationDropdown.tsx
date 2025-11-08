"use client";

import React from "react";
import { Badge, Dropdown, List, Avatar, Typography, theme } from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Sale Completed",
    description: "New sale transaction #1234 completed successfully",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Low Stock Alert",
    description: 'Product "Widget A" is running low on stock',
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "System Update",
    description: "System will undergo maintenance tonight at 2 AM",
    time: "3 hours ago",
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
    case "warning":
      return <WarningOutlined style={{ color: "#faad14" }} />;
    case "info":
      return <InfoCircleOutlined style={{ color: "#1677ff" }} />;
    default:
      return <InfoCircleOutlined />;
  }
};

export default function NotificationDropdown() {
  const { token } = useToken();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const notificationContent = (
    <div
      style={{
        width: 320,
        backgroundColor: token.colorBgElevated,
        borderRadius: 8,
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Text strong>Notifications</Text>
      </div>
      <List
        dataSource={mockNotifications}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              backgroundColor: item.read
                ? "transparent"
                : token.colorPrimaryBg,
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={getIcon(item.type)}
                  style={{ backgroundColor: "transparent" }}
                />
              }
              title={<Text strong={!item.read}>{item.title}</Text>}
              description={
                <>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.description}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {item.time}
                  </Text>
                </>
              }
            />
          </List.Item>
        )}
      />
      <div
        style={{
          padding: "12px 16px",
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Text type="secondary">View All Notifications</Text>
      </div>
    </div>
  );

  return (
    <Dropdown
      dropdownRender={() => notificationContent}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Badge count={unreadCount} offset={[-5, 5]}>
        <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />
      </Badge>
    </Dropdown>
  );
}
