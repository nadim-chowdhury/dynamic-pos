"use client";

import React from "react";
import { Avatar, Dropdown, Space, Typography } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  LockOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function ProfileDropdown() {
  const router = useRouter();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "profile":
        router.push("/dashboard/profile");
        break;
      case "settings":
        router.push("/dashboard/settings");
        break;
      case "password":
        router.push("/dashboard/change-password");
        break;
      case "logout":
        router.push("/login");
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "user-info",
      label: (
        <div style={{ padding: "8px 0" }}>
          <Text strong>John Doe</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            admin@pos.com
          </Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "My Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "password",
      icon: <LockOutlined />,
      label: "Change Password",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Space style={{ cursor: "pointer" }}>
        <Avatar
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1677ff" }}
        />
        <Text>John Doe</Text>
      </Space>
    </Dropdown>
  );
}
