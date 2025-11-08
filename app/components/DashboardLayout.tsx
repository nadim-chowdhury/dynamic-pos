"use client";

import React, { useState } from "react";
import { Layout, Button, Space, Select, Typography, Breadcrumb } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  BulbFilled,
  AppstoreOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useTheme } from "../providers/ThemeProvider";
import { useModule, ModuleType } from "../context/ModuleContext";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { currentTheme, toggleTheme } = useTheme();
  const { currentModule, setCurrentModule } = useModule();

  const moduleOptions = [
    { value: "pos" as ModuleType, label: "POS System" },
    { value: "hrm" as ModuleType, label: "HRM System" },
    { value: "account" as ModuleType, label: "Accounting" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          }}
        >
          {!collapsed ? (
            <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
              D~POS
            </Title>
          ) : (
            <AppstoreOutlined style={{ fontSize: 24, color: "#1677ff" }} />
          )}
        </div>
        <Sidebar />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? 80 : 250, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: currentTheme === "dark" ? "#141414" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 48,
                height: 48,
              }}
            />
            <Select
              value={currentModule}
              onChange={setCurrentModule}
              options={moduleOptions}
              style={{ width: 180 }}
              size="large"
            />
          </Space>
          <Space size="large">
            <Button
              type="text"
              icon={currentTheme === "dark" ? <BulbFilled /> : <BulbOutlined />}
              onClick={toggleTheme}
              style={{ fontSize: "16px" }}
            />
            <NotificationDropdown />
            <ProfileDropdown />
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: currentTheme === "dark" ? "#141414" : "#fff",
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
