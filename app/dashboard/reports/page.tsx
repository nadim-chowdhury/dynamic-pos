"use client";

import React, { useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Space,
  Button,
  Table,
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  DownloadOutlined,
  PrinterOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface SalesData {
  key: string;
  date: string;
  sales: number;
  revenue: number;
  profit: number;
  customers: number;
}

const demoSalesData: SalesData[] = [
  {
    key: "1",
    date: "2024-01-15",
    sales: 45,
    revenue: 12450.5,
    profit: 3450.2,
    customers: 32,
  },
  {
    key: "2",
    date: "2024-01-14",
    sales: 38,
    revenue: 9820.75,
    profit: 2890.15,
    customers: 28,
  },
  {
    key: "3",
    date: "2024-01-13",
    sales: 52,
    revenue: 15680.0,
    profit: 4250.5,
    customers: 41,
  },
  {
    key: "4",
    date: "2024-01-12",
    sales: 41,
    revenue: 11240.25,
    profit: 3120.8,
    customers: 35,
  },
  {
    key: "5",
    date: "2024-01-11",
    sales: 36,
    revenue: 8970.5,
    profit: 2580.3,
    customers: 29,
  },
];

interface ProductSales {
  key: string;
  product: string;
  category: string;
  quantity: number;
  revenue: number;
}

const topProducts: ProductSales[] = [
  {
    key: "1",
    product: "Wireless Mouse",
    category: "Electronics",
    quantity: 145,
    revenue: 3760.55,
  },
  {
    key: "2",
    product: "Mechanical Keyboard",
    category: "Electronics",
    quantity: 89,
    revenue: 8009.11,
  },
  {
    key: "3",
    product: "USB-C Cable",
    category: "Accessories",
    quantity: 234,
    revenue: 3039.66,
  },
  {
    key: "4",
    product: "Laptop Stand",
    category: "Accessories",
    quantity: 67,
    revenue: 3048.5,
  },
  {
    key: "5",
    product: "Headphones",
    category: "Audio",
    quantity: 56,
    revenue: 6720.0,
  },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("today");

  const salesColumns: ColumnsType<SalesData> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Sales Count",
      dataIndex: "sales",
      key: "sales",
      align: "center",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      align: "right",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      align: "right",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: "Customers",
      dataIndex: "customers",
      key: "customers",
      align: "center",
    },
  ];

  const productColumns: ColumnsType<ProductSales> = [
    {
      title: "Rank",
      key: "rank",
      width: 70,
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      align: "right",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Reports & Analytics</Title>
        </Col>
        <Col>
          <Space>
            <Select
              value={reportType}
              onChange={setReportType}
              style={{ width: 180 }}
            >
              <Option value="sales">Sales Report</Option>
              <Option value="products">Product Report</Option>
              <Option value="customers">Customer Report</Option>
              <Option value="inventory">Inventory Report</Option>
            </Select>
            <Select
              value={dateRange}
              onChange={setDateRange}
              style={{ width: 150 }}
            >
              <Option value="today">Today</Option>
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="year">This Year</Option>
              <Option value="custom">Custom Range</Option>
            </Select>
            {dateRange === "custom" && <RangePicker />}
          </Space>
        </Col>
      </Row>

      {/* Summary Statistics */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={58161.0}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
              suffix={
                <Space>
                  <RiseOutlined />
                  <Text style={{ fontSize: 14 }}>12.5%</Text>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={212}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1677ff" }}
              suffix={
                <Space>
                  <RiseOutlined />
                  <Text style={{ fontSize: 14 }}>8.3%</Text>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Profit"
              value={16291.95}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#722ed1" }}
              suffix={
                <Space>
                  <RiseOutlined />
                  <Text style={{ fontSize: 14 }}>15.2%</Text>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Unique Customers"
              value={165}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#fa8c16" }}
              suffix={
                <Space>
                  <FallOutlined />
                  <Text style={{ fontSize: 14 }}>2.1%</Text>
                </Space>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Report Content */}
      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Card
            title={
              reportType === "sales"
                ? "Sales Performance"
                : "Top Selling Products"
            }
            extra={
              <Space>
                <Button icon={<DownloadOutlined />}>Export</Button>
                <Button icon={<PrinterOutlined />}>Print</Button>
              </Space>
            }
          >
            {reportType === "sales" ? (
              <Table
                columns={salesColumns}
                dataSource={demoSalesData}
                pagination={false}
                summary={(pageData) => {
                  let totalSales = 0;
                  let totalRevenue = 0;
                  let totalProfit = 0;
                  let totalCustomers = 0;

                  pageData.forEach(({ sales, revenue, profit, customers }) => {
                    totalSales += sales;
                    totalRevenue += revenue;
                    totalProfit += profit;
                    totalCustomers += customers;
                  });

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                          <Text strong>Total</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} align="center">
                          <Text strong>{totalSales}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} align="right">
                          <Text strong>${totalRevenue.toFixed(2)}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3} align="right">
                          <Text strong>${totalProfit.toFixed(2)}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4} align="center">
                          <Text strong>{totalCustomers}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
              />
            ) : (
              <Table
                columns={productColumns}
                dataSource={topProducts}
                pagination={false}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quick Stats" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text type="secondary">Average Order Value</Text>
                <div>
                  <Text strong style={{ fontSize: 24 }}>
                    $274.34
                  </Text>
                  <Text type="success" style={{ marginLeft: 8 }}>
                    <RiseOutlined /> 5.2%
                  </Text>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Conversion Rate</Text>
                <div>
                  <Text strong style={{ fontSize: 24 }}>
                    68.5%
                  </Text>
                  <Text type="success" style={{ marginLeft: 8 }}>
                    <RiseOutlined /> 3.1%
                  </Text>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Profit Margin</Text>
                <div>
                  <Text strong style={{ fontSize: 24 }}>
                    28.0%
                  </Text>
                  <Text type="success" style={{ marginLeft: 8 }}>
                    <RiseOutlined /> 2.5%
                  </Text>
                </div>
              </div>
            </Space>
          </Card>

          <Card title="Report Categories">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                block
                icon={<LineChartOutlined />}
                onClick={() => setReportType("sales")}
                type={reportType === "sales" ? "primary" : "default"}
              >
                Sales Report
              </Button>
              <Button
                block
                icon={<ShoppingCartOutlined />}
                onClick={() => setReportType("products")}
                type={reportType === "products" ? "primary" : "default"}
              >
                Product Report
              </Button>
              <Button
                block
                icon={<UserOutlined />}
                onClick={() => setReportType("customers")}
                type={reportType === "customers" ? "primary" : "default"}
              >
                Customer Report
              </Button>
              <Button
                block
                icon={<DollarOutlined />}
                onClick={() => setReportType("inventory")}
                type={reportType === "inventory" ? "primary" : "default"}
              >
                Inventory Report
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
