"use client";

import { useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  List,
  Tag,
  Progress,
} from "antd";
import {
  ShopOutlined,
  BankOutlined,
  RightOutlined,
  PlusOutlined,
  FolderOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface AccountSummary {
  code: string;
  name: string;
  type: "Asset" | "Liability" | "Equity";
  balance: number;
  percentage: number;
}

interface BankAccountSummary {
  name: string;
  accountNumber: string;
  type: string;
  balance: number;
}

export default function AccountsOverviewPage() {
  const router = useRouter();

  // Account summaries
  const accountSummaries: AccountSummary[] = [
    {
      code: "1000",
      name: "Cash and Cash Equivalents",
      type: "Asset",
      balance: 50000,
      percentage: 77,
    },
    {
      code: "1200",
      name: "Accounts Receivable",
      type: "Asset",
      balance: 15000,
      percentage: 23,
    },
    {
      code: "2000",
      name: "Accounts Payable",
      type: "Liability",
      balance: 8000,
      percentage: 24,
    },
    {
      code: "2100",
      name: "Loans Payable",
      type: "Liability",
      balance: 25000,
      percentage: 76,
    },
    {
      code: "3000",
      name: "Owner's Equity",
      type: "Equity",
      balance: 100000,
      percentage: 100,
    },
  ];

  // Bank accounts
  const bankAccounts: BankAccountSummary[] = [
    {
      name: "Primary Business Account",
      accountNumber: "****7890",
      type: "Checking",
      balance: 125000,
    },
    {
      name: "Business Savings Account",
      accountNumber: "****4321",
      type: "Savings",
      balance: 50000,
    },
    {
      name: "Investment Portfolio Account",
      accountNumber: "****1214",
      type: "Investment",
      balance: 75000,
    },
    {
      name: "Payroll Account",
      accountNumber: "****6677",
      type: "Checking",
      balance: 35000,
    },
  ];

  // Summary statistics
  const totalAssets = 65000;
  const totalLiabilities = 33000;
  const totalEquity = 100000;
  const totalBankBalance = 285000;
  const totalAccounts = 12;
  const activeBankAccounts = 5;

  // Get account type color
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "Asset":
        return "#52c41a";
      case "Liability":
        return "#ff4d4f";
      case "Equity":
        return "#1890ff";
      default:
        return "#000";
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>
          <ShopOutlined /> Accounts Overview
        </Title>
      </div>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Assets"
              value={totalAssets}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Liabilities"
              value={totalLiabilities}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Equity"
              value={totalEquity}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Bank Balance"
              value={totalBankBalance}
              prefix="$"
              valueStyle={{ color: "#722ed1" }}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={16}>
        {/* Chart of Accounts Summary */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FolderOutlined />
                <span>Chart of Accounts</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() =>
                  router.push("/dashboard/account/chart-of-accounts")
                }
              >
                View All
              </Button>
            }
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {accountSummaries.map((account, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Space>
                      <Text type="secondary">{account.code}</Text>
                      <Text strong>{account.name}</Text>
                    </Space>
                    <Text
                      strong
                      style={{
                        color: getAccountTypeColor(account.type),
                      }}
                    >
                      ${account.balance.toLocaleString()}
                    </Text>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Tag
                      color={
                        account.type === "Asset"
                          ? "green"
                          : account.type === "Liability"
                          ? "red"
                          : "blue"
                      }
                    >
                      {account.type}
                    </Tag>
                    <Progress
                      percent={account.percentage}
                      strokeColor={getAccountTypeColor(account.type)}
                      showInfo={false}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Bank Accounts Summary */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <BankOutlined />
                <span>Bank Accounts</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() => router.push("/dashboard/account/bank-accounts")}
              >
                View All
              </Button>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={bankAccounts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <BankOutlined
                        style={{ fontSize: 24, color: "#1890ff" }}
                      />
                    }
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.accountNumber} • {item.type}
                        </Text>
                        <Text strong style={{ color: "#52c41a", fontSize: 14 }}>
                          ${item.balance.toLocaleString()}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Section */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/chart-of-accounts")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <FolderOutlined style={{ fontSize: 48, color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>
                Chart of Accounts
              </Title>
              <Text type="secondary">Manage your account structure</Text>
              <Text strong style={{ color: "#1890ff" }}>
                {totalAccounts} accounts configured
              </Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/bank-accounts")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <BankOutlined style={{ fontSize: 48, color: "#52c41a" }} />
              <Title level={4} style={{ margin: 0 }}>
                Bank Accounts
              </Title>
              <Text type="secondary">View and manage bank accounts</Text>
              <Text strong style={{ color: "#52c41a" }}>
                {activeBankAccounts} active accounts
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Financial Position Summary */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Financial Position Summary">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Text type="secondary">Assets</Text>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      color: "#52c41a",
                      margin: "10px 0",
                    }}
                  >
                    ${totalAssets.toLocaleString()}
                  </div>
                  <Progress
                    type="circle"
                    percent={100}
                    strokeColor="#52c41a"
                    format={() => "100%"}
                    width={80}
                  />
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Text type="secondary">Liabilities</Text>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      color: "#ff4d4f",
                      margin: "10px 0",
                    }}
                  >
                    ${totalLiabilities.toLocaleString()}
                  </div>
                  <Progress
                    type="circle"
                    percent={Math.round((totalLiabilities / totalAssets) * 100)}
                    strokeColor="#ff4d4f"
                    width={80}
                  />
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Text type="secondary">Equity</Text>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      color: "#1890ff",
                      margin: "10px 0",
                    }}
                  >
                    ${totalEquity.toLocaleString()}
                  </div>
                  <Progress
                    type="circle"
                    percent={Math.round(
                      (totalEquity / (totalAssets + totalEquity)) * 100
                    )}
                    strokeColor="#1890ff"
                    width={80}
                  />
                </div>
              </Col>
            </Row>
            <div
              style={{
                marginTop: 20,
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
              }}
            >
              <Text strong>Accounting Equation: </Text>
              <Text>
                Assets ($65,000) = Liabilities ($33,000) + Equity ($100,000)
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
