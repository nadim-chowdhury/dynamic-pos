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
  Avatar,
} from "antd";
import {
  FileTextOutlined,
  ShoppingOutlined,
  RightOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface RecentInvoice {
  id: string;
  number: string;
  type: "sales" | "purchase";
  date: string;
  party: string;
  total: number;
  status: "draft" | "sent" | "received" | "paid" | "partial" | "overdue";
}

export default function InvoicesOverviewPage() {
  const router = useRouter();

  // Recent invoices
  const recentInvoices: RecentInvoice[] = [
    {
      id: "1",
      number: "INV-2025-001",
      type: "sales",
      date: "2025-11-01",
      party: "ABC Corporation",
      total: 1100,
      status: "paid",
    },
    {
      id: "2",
      number: "PINV-2025-001",
      type: "purchase",
      date: "2025-11-01",
      party: "Office Supplies Inc",
      total: 3300,
      status: "paid",
    },
    {
      id: "3",
      number: "INV-2025-002",
      type: "sales",
      date: "2025-11-03",
      party: "XYZ Enterprises",
      total: 3100,
      status: "sent",
    },
    {
      id: "4",
      number: "PINV-2025-002",
      type: "purchase",
      date: "2025-11-03",
      party: "Tech Hardware Corp",
      total: 8925,
      status: "received",
    },
    {
      id: "5",
      number: "INV-2025-003",
      type: "sales",
      date: "2025-11-05",
      party: "Tech Solutions Inc",
      total: 2100,
      status: "partial",
    },
    {
      id: "6",
      number: "PINV-2025-004",
      type: "purchase",
      date: "2025-10-20",
      party: "Utility Services Co",
      total: 1067,
      status: "overdue",
    },
  ];

  // Summary statistics
  const totalSalesRevenue = 6537.5;
  const totalPurchaseExpenses = 18242;
  const salesOutstanding = 4337.5;
  const purchaseOutstanding = 11059;
  const overdueInvoices = 1;

  // Get status tag
  const getStatusTag = (status: string) => {
    switch (status) {
      case "paid":
        return <Tag color="success">Paid</Tag>;
      case "sent":
        return <Tag color="processing">Sent</Tag>;
      case "received":
        return <Tag color="processing">Received</Tag>;
      case "partial":
        return <Tag color="warning">Partial</Tag>;
      case "overdue":
        return <Tag color="error">Overdue</Tag>;
      case "draft":
        return <Tag color="default">Draft</Tag>;
      default:
        return <Tag>{status}</Tag>;
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
          <FileTextOutlined /> Invoices Overview
        </Title>
      </div>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sales Revenue"
              value={totalSalesRevenue}
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
              title="Purchase Expenses"
              value={totalPurchaseExpenses}
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
              title="Sales Outstanding"
              value={salesOutstanding}
              prefix="$"
              valueStyle={{ color: "#faad14" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Overdue Invoices"
              value={overdueInvoices}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={16}>
        {/* Recent Invoices */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>Recent Invoices</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentInvoices}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      key={index}
                      type="link"
                      onClick={() =>
                        router.push(
                          item.type === "sales"
                            ? "/dashboard/account/sales-invoice"
                            : "/dashboard/account/purchase-invoice"
                        )
                      }
                    >
                      View
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.type === "sales" ? (
                            <FileTextOutlined />
                          ) : (
                            <ShoppingOutlined />
                          )
                        }
                        style={{
                          backgroundColor:
                            item.type === "sales" ? "#52c41a" : "#ff4d4f",
                        }}
                      />
                    }
                    title={
                      <Space>
                        <Text strong>{item.number}</Text>
                        {getStatusTag(item.status)}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.party} • {item.date}
                        </Text>
                        <Text
                          strong
                          style={{
                            color:
                              item.type === "sales" ? "#52c41a" : "#ff4d4f",
                            fontSize: 14,
                          }}
                        >
                          {item.type === "purchase" && "-"}$
                          {item.total.toLocaleString()}
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

      {/* Invoice Statistics */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Sales Invoice Summary">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text>Total Revenue</Text>
                  <Text strong style={{ color: "#52c41a" }}>
                    ${totalSalesRevenue.toLocaleString()}
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
                  <Text>Paid</Text>
                  <Text strong style={{ color: "#1890ff" }}>
                    ${(totalSalesRevenue - salesOutstanding).toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={Math.round(
                    ((totalSalesRevenue - salesOutstanding) /
                      totalSalesRevenue) *
                      100
                  )}
                  strokeColor="#1890ff"
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
                  <Text>Outstanding</Text>
                  <Text strong style={{ color: "#faad14" }}>
                    ${salesOutstanding.toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={Math.round(
                    (salesOutstanding / totalSalesRevenue) * 100
                  )}
                  strokeColor="#faad14"
                  showInfo={false}
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Purchase Invoice Summary">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text>Total Expenses</Text>
                  <Text strong style={{ color: "#ff4d4f" }}>
                    ${totalPurchaseExpenses.toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={100}
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
                  <Text>Paid</Text>
                  <Text strong style={{ color: "#52c41a" }}>
                    $
                    {(
                      totalPurchaseExpenses - purchaseOutstanding
                    ).toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={Math.round(
                    ((totalPurchaseExpenses - purchaseOutstanding) /
                      totalPurchaseExpenses) *
                      100
                  )}
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
                  <Text>Outstanding</Text>
                  <Text strong style={{ color: "#faad14" }}>
                    ${purchaseOutstanding.toLocaleString()}
                  </Text>
                </div>
                <Progress
                  percent={Math.round(
                    (purchaseOutstanding / totalPurchaseExpenses) * 100
                  )}
                  strokeColor="#faad14"
                  showInfo={false}
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Section */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/sales-invoice")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <FileTextOutlined style={{ fontSize: 48, color: "#52c41a" }} />
              <Title level={4} style={{ margin: 0 }}>
                Sales Invoices
              </Title>
              <Text type="secondary">Manage customer invoices</Text>
              <Space>
                <Statistic
                  value={totalSalesRevenue}
                  prefix="$"
                  valueStyle={{ color: "#52c41a", fontSize: 20 }}
                  precision={2}
                />
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/account/purchase-invoice")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <ShoppingOutlined style={{ fontSize: 48, color: "#ff4d4f" }} />
              <Title level={4} style={{ margin: 0 }}>
                Purchase Invoices
              </Title>
              <Text type="secondary">Track vendor invoices</Text>
              <Space>
                <Statistic
                  value={totalPurchaseExpenses}
                  prefix="$"
                  valueStyle={{ color: "#ff4d4f", fontSize: 20 }}
                  precision={2}
                />
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Cash Flow Impact */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Cash Flow Impact">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Net Invoice Value"
                  value={totalSalesRevenue - totalPurchaseExpenses}
                  prefix="$"
                  valueStyle={{
                    color:
                      totalSalesRevenue - totalPurchaseExpenses >= 0
                        ? "#52c41a"
                        : "#ff4d4f",
                  }}
                  suffix={
                    totalSalesRevenue - totalPurchaseExpenses >= 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  precision={2}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {totalSalesRevenue - totalPurchaseExpenses >= 0
                    ? "Positive"
                    : "Negative"}{" "}
                  cash flow from invoices
                </Text>
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Total Outstanding"
                  value={salesOutstanding + purchaseOutstanding}
                  prefix="$"
                  valueStyle={{ color: "#faad14" }}
                  precision={2}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Pending payments (both receivable and payable)
                </Text>
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Collection Ratio"
                  value={
                    ((totalSalesRevenue - salesOutstanding) /
                      totalSalesRevenue) *
                    100
                  }
                  suffix="%"
                  valueStyle={{ color: "#1890ff" }}
                  precision={1}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Percentage of sales invoices collected
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
