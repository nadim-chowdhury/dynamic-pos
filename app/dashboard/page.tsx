"use client";

import { Card, Row, Col, Statistic, Typography, Table, Progress } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface RecentSale {
  key: string;
  invoice: string;
  customer: string;
  amount: string;
  status: string;
}

const recentSalesData: RecentSale[] = [
  {
    key: "1",
    invoice: "INV-001",
    customer: "John Smith",
    amount: "$1,234.00",
    status: "Completed",
  },
  {
    key: "2",
    invoice: "INV-002",
    customer: "Sarah Johnson",
    amount: "$892.50",
    status: "Completed",
  },
  {
    key: "3",
    invoice: "INV-003",
    customer: "Mike Brown",
    amount: "$456.75",
    status: "Pending",
  },
  {
    key: "4",
    invoice: "INV-004",
    customer: "Emily Davis",
    amount: "$2,100.00",
    status: "Completed",
  },
];

const columns: ColumnsType<RecentSale> = [
  {
    title: "Invoice",
    dataIndex: "invoice",
    key: "invoice",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <span style={{ color: status === "Completed" ? "#52c41a" : "#faad14" }}>
        {status}
      </span>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Dashboard
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={25678}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
              suffix={
                <span style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={1234}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1677ff" }}
              suffix={
                <span style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 8%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={892}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
              suffix={
                <span style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Products"
              value={456}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#fa8c16" }}
              suffix={
                <span style={{ fontSize: 14 }}>
                  <ArrowDownOutlined /> 2%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent Sales */}
        <Col xs={24} lg={16}>
          <Card title="Recent Sales" bordered={false}>
            <Table
              columns={columns}
              dataSource={recentSalesData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Top Products */}
        <Col xs={24} lg={8}>
          <Card title="Top Products" bordered={false}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <span>Widget A</span>
                <Progress percent={85} status="active" />
              </div>
              <div style={{ marginBottom: 8 }}>
                <span>Product B</span>
                <Progress percent={72} status="active" />
              </div>
              <div style={{ marginBottom: 8 }}>
                <span>Item C</span>
                <Progress percent={58} status="active" />
              </div>
              <div style={{ marginBottom: 8 }}>
                <span>Service D</span>
                <Progress percent={45} status="active" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
