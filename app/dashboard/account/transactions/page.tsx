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
  Avatar,
  Progress,
} from "antd";
import {
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  SwapOutlined,
  RightOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface RecentTransaction {
  id: string;
  type: "income" | "expense" | "transfer";
  date: string;
  description: string;
  amount: number;
  category?: string;
  account?: string;
  status: "completed" | "pending";
}

interface CategorySummary {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export default function TransactionsOverviewPage() {
  const router = useRouter();

  // Demo data for recent transactions
  const recentTransactions: RecentTransaction[] = [
    {
      id: "INC001",
      type: "income",
      date: "2025-11-01",
      description: "Product sales for November week 1",
      amount: 15000,
      category: "Sales Revenue",
      account: "Cash Account",
      status: "completed",
    },
    {
      id: "EXP001",
      type: "expense",
      date: "2025-11-01",
      description: "Monthly office rent payment",
      amount: 5000,
      category: "Rent",
      account: "Bank Account",
      status: "completed",
    },
    {
      id: "TRF001",
      type: "transfer",
      date: "2025-11-01",
      description: "Cash deposit to bank",
      amount: 10000,
      account: "Cash Account → Bank Account",
      status: "completed",
    },
    {
      id: "INC002",
      type: "income",
      date: "2025-11-03",
      description: "Consulting services provided",
      amount: 8500,
      category: "Service Revenue",
      account: "Bank Account",
      status: "completed",
    },
    {
      id: "EXP002",
      type: "expense",
      date: "2025-11-02",
      description: "Electricity bill for October",
      amount: 850,
      category: "Utilities",
      account: "Cash Account",
      status: "completed",
    },
    {
      id: "TRF002",
      type: "transfer",
      date: "2025-11-03",
      description: "Transfer to investment portfolio",
      amount: 5000,
      account: "Bank Account → Investment Account",
      status: "completed",
    },
  ];

  // Income categories summary
  const incomeCategories: CategorySummary[] = [
    { category: "Sales Revenue", amount: 27000, count: 2, percentage: 60 },
    { category: "Service Revenue", amount: 8500, count: 1, percentage: 19 },
    { category: "Investment Income", amount: 3200, count: 1, percentage: 7 },
    { category: "Rental Income", amount: 5000, count: 1, percentage: 11 },
    { category: "Other Income", amount: 1500, count: 1, percentage: 3 },
  ];

  // Expense categories summary
  const expenseCategories: CategorySummary[] = [
    { category: "Salaries", amount: 25000, count: 1, percentage: 70 },
    { category: "Rent", amount: 5000, count: 1, percentage: 14 },
    { category: "Marketing", amount: 3200, count: 1, percentage: 9 },
    { category: "Travel", amount: 1200, count: 1, percentage: 3 },
    { category: "Utilities", amount: 850, count: 1, percentage: 2 },
    { category: "Others", amount: 700, count: 2, percentage: 2 },
  ];

  // Summary statistics
  const totalIncome = 45200;
  const totalExpense = 35950;
  const totalTransfers = 30500;
  const netProfit = totalIncome - totalExpense;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  // Get transaction icon and color
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <RiseOutlined style={{ color: "#52c41a" }} />;
      case "expense":
        return <FallOutlined style={{ color: "#ff4d4f" }} />;
      case "transfer":
        return <SwapOutlined style={{ color: "#1890ff" }} />;
      default:
        return <DollarOutlined />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "income":
        return "#52c41a";
      case "expense":
        return "#ff4d4f";
      case "transfer":
        return "#1890ff";
      default:
        return "#000";
    }
  };

  const getStatusTag = (status: string) => {
    return status === "completed" ? (
      <Tag color="success">Completed</Tag>
    ) : (
      <Tag color="processing">Pending</Tag>
    );
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
          <DollarOutlined /> Transactions Overview
        </Title>
      </div>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Income"
              value={totalIncome}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              suffix={<ArrowUpOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Expense"
              value={totalExpense}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              suffix={<ArrowDownOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Net Profit"
              value={netProfit}
              prefix="$"
              valueStyle={{ color: netProfit >= 0 ? "#52c41a" : "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Profit Margin"
              value={profitMargin}
              suffix="%"
              valueStyle={{ color: "#1890ff" }}
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={16}>
        {/* Recent Transactions */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <DollarOutlined />
                <span>Recent Transactions</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentTransactions}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={getTransactionIcon(item.type)}
                        style={{
                          backgroundColor: getTransactionColor(item.type),
                        }}
                      />
                    }
                    title={
                      <Space>
                        <Text strong>{item.description}</Text>
                        {getStatusTag(item.status)}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.category || item.account} • {item.date}
                        </Text>
                        <Text
                          strong
                          style={{
                            color: getTransactionColor(item.type),
                            fontSize: 14,
                          }}
                        >
                          {item.type === "expense" ? "-" : ""}$
                          {item.amount.toLocaleString()}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Income vs Expense Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <DollarOutlined />
                <span>Income vs Expense</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text strong>Income</Text>
                  <Text strong style={{ color: "#52c41a" }}>
                    ${totalIncome.toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={100}
                  strokeColor="#52c41a"
                  showInfo={false}
                />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text strong>Expense</Text>
                  <Text strong style={{ color: "#ff4d4f" }}>
                    ${totalExpense.toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={Math.round((totalExpense / totalIncome) * 100)}
                  strokeColor="#ff4d4f"
                  showInfo={false}
                />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text strong>Transfers</Text>
                  <Text strong style={{ color: "#1890ff" }}>
                    ${totalTransfers.toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={Math.round((totalTransfers / totalIncome) * 100)}
                  strokeColor="#1890ff"
                  showInfo={false}
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Category Breakdowns */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <RiseOutlined style={{ color: "#52c41a" }} />
                <span>Top Income Categories</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() => router.push("/dashboard/account/income")}
              >
                View All
              </Button>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              {incomeCategories.map((cat, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <Text>{cat.category}</Text>
                    <Text strong style={{ color: "#52c41a" }}>
                      ${cat.amount.toLocaleString()}
                    </Text>
                  </div>
                  <Progress
                    percent={cat.percentage}
                    strokeColor="#52c41a"
                    size="small"
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {cat.count} transaction{cat.count > 1 ? "s" : ""}
                  </Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FallOutlined style={{ color: "#ff4d4f" }} />
                <span>Top Expense Categories</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() => router.push("/dashboard/account/expense")}
              >
                View All
              </Button>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              {expenseCategories.map((cat, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <Text>{cat.category}</Text>
                    <Text strong style={{ color: "#ff4d4f" }}>
                      ${cat.amount.toLocaleString()}
                    </Text>
                  </div>
                  <Progress
                    percent={cat.percentage}
                    strokeColor="#ff4d4f"
                    size="small"
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {cat.count} transaction{cat.count > 1 ? "s" : ""}
                  </Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Section */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/income")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <RiseOutlined style={{ fontSize: 48, color: "#52c41a" }} />
              <Title level={4} style={{ margin: 0 }}>
                Income
              </Title>
              <Text type="secondary">Record and manage income</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/expense")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <FallOutlined style={{ fontSize: 48, color: "#ff4d4f" }} />
              <Title level={4} style={{ margin: 0 }}>
                Expense
              </Title>
              <Text type="secondary">Track and manage expenses</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/transfers")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <SwapOutlined style={{ fontSize: 48, color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>
                Transfers
              </Title>
              <Text type="secondary">Manage account transfers</Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Financial Health Indicators */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Financial Health Indicators">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Cash Flow"
                  value={netProfit}
                  prefix="$"
                  valueStyle={{ color: netProfit >= 0 ? "#52c41a" : "#ff4d4f" }}
                  suffix={
                    netProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  precision={2}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {netProfit >= 0 ? "Positive" : "Negative"} cash flow this
                  month
                </Text>
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Expense Ratio"
                  value={((totalExpense / totalIncome) * 100).toFixed(1)}
                  suffix="%"
                  valueStyle={{ color: "#faad14" }}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Expenses are {((totalExpense / totalIncome) * 100).toFixed(1)}
                  % of income
                </Text>
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Total Transactions"
                  value={recentTransactions.length}
                  valueStyle={{ color: "#1890ff" }}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Transactions recorded this month
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
