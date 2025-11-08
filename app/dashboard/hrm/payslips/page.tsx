"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tag,
  Avatar,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
  Divider,
} from "antd";
import {
  EyeOutlined,
  UserOutlined,
  DollarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

interface Payslip {
  key: string;
  payslipId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  status: "paid" | "pending" | "cancelled";
  paymentDate?: string;
  paymentMethod?: string;
  avatar?: string;
}

// Demo payslip data
const demoPayslips: Payslip[] = [
  {
    key: "1",
    payslipId: "PAY-2024-01-001",
    employeeId: "EMP-001",
    employeeName: "John Doe",
    department: "Sales",
    designation: "Store Manager",
    month: "January",
    year: 2024,
    basicSalary: 65000,
    allowances: 14000,
    deductions: 11500,
    bonus: 5000,
    netSalary: 72500,
    status: "paid",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "2",
    payslipId: "PAY-2024-01-002",
    employeeId: "EMP-002",
    employeeName: "Sarah Johnson",
    department: "Sales",
    designation: "Sales Associate",
    month: "January",
    year: 2024,
    basicSalary: 45000,
    allowances: 9000,
    deductions: 7500,
    bonus: 2000,
    netSalary: 48500,
    status: "paid",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "3",
    payslipId: "PAY-2024-01-003",
    employeeId: "EMP-003",
    employeeName: "Mike Brown",
    department: "IT",
    designation: "System Administrator",
    month: "January",
    year: 2024,
    basicSalary: 75000,
    allowances: 18000,
    deductions: 14500,
    bonus: 6000,
    netSalary: 84500,
    status: "paid",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "4",
    payslipId: "PAY-2024-02-001",
    employeeId: "EMP-001",
    employeeName: "John Doe",
    department: "Sales",
    designation: "Store Manager",
    month: "February",
    year: 2024,
    basicSalary: 65000,
    allowances: 14000,
    deductions: 11500,
    bonus: 0,
    netSalary: 67500,
    status: "pending",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "5",
    payslipId: "PAY-2024-02-002",
    employeeId: "EMP-002",
    employeeName: "Sarah Johnson",
    department: "Sales",
    designation: "Sales Associate",
    month: "February",
    year: 2024,
    basicSalary: 45000,
    allowances: 9000,
    deductions: 7500,
    bonus: 0,
    netSalary: 46500,
    status: "pending",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "6",
    payslipId: "PAY-2023-12-001",
    employeeId: "EMP-004",
    employeeName: "Emily Davis",
    department: "HR",
    designation: "HR Manager",
    month: "December",
    year: 2023,
    basicSalary: 70000,
    allowances: 15700,
    deductions: 12700,
    bonus: 10000,
    netSalary: 83000,
    status: "paid",
    paymentDate: "2023-12-31",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "7",
    payslipId: "PAY-2023-12-002",
    employeeId: "EMP-005",
    employeeName: "Robert Taylor",
    department: "Finance",
    designation: "Accountant",
    month: "December",
    year: 2023,
    basicSalary: 60000,
    allowances: 12300,
    deductions: 10350,
    bonus: 4000,
    netSalary: 65950,
    status: "paid",
    paymentDate: "2023-12-31",
    paymentMethod: "Bank Transfer",
  },
  {
    key: "8",
    payslipId: "PAY-2024-01-004",
    employeeId: "EMP-006",
    employeeName: "Lisa Anderson",
    department: "Sales",
    designation: "Cashier",
    month: "January",
    year: 2024,
    basicSalary: 35000,
    allowances: 7000,
    deductions: 5600,
    bonus: 1000,
    netSalary: 37400,
    status: "paid",
    paymentDate: "2024-01-31",
    paymentMethod: "Cash",
  },
];

export default function PayslipsPage() {
  const [payslips, setPayslips] = useState<Payslip[]>(demoPayslips);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const handleView = (record: Payslip) => {
    setSelectedPayslip(record);
    setIsViewModalOpen(true);
  };

  const handleDownload = (record: Payslip) => {
    console.log("Downloading payslip:", record.payslipId);
    // Implement download logic
  };

  const handlePrint = (record: Payslip) => {
    console.log("Printing payslip:", record.payslipId);
    // Implement print logic
  };

  const getStatusColor = (status: Payslip["status"]) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: Payslip["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircleOutlined />;
      case "pending":
        return <ClockCircleOutlined />;
      case "cancelled":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  // Filter payslips
  const filteredPayslips = payslips.filter((payslip) => {
    const monthMatch =
      selectedMonth === "all" || payslip.month === selectedMonth;
    const yearMatch = selectedYear === "all" || payslip.year === selectedYear;
    const statusMatch =
      selectedStatus === "all" || payslip.status === selectedStatus;
    return monthMatch && yearMatch && statusMatch;
  });

  const columns: DynamicTableColumn<Payslip>[] = [
    {
      title: "Payslip ID",
      dataIndex: "payslipId",
      key: "payslipId",
      width: 150,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: "Employee",
      key: "employee",
      width: 220,
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          <div>
            <Text strong>{record.employeeName}</Text>
            <br />
            <Text type="secondary" code style={{ fontSize: 12 }}>
              {record.employeeId}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 130,
    },
    {
      title: "Period",
      key: "period",
      width: 130,
      render: (_, record) => `${record.month} ${record.year}`,
      sorter: (a, b) => {
        const dateA = new Date(`${a.month} 1, ${a.year}`);
        const dateB = new Date(`${b.month} 1, ${b.year}`);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: "Basic Salary",
      dataIndex: "basicSalary",
      key: "basicSalary",
      width: 130,
      align: "right",
      render: (salary: number) => `$${salary.toLocaleString()}`,
    },
    {
      title: "Allowances",
      dataIndex: "allowances",
      key: "allowances",
      width: 120,
      align: "right",
      render: (allowances: number) => (
        <Text style={{ color: "#52c41a" }}>
          +${allowances.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Deductions",
      dataIndex: "deductions",
      key: "deductions",
      width: 120,
      align: "right",
      render: (deductions: number) => (
        <Text style={{ color: "#ff4d4f" }}>
          -${deductions.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      key: "bonus",
      width: 100,
      align: "right",
      render: (bonus: number) =>
        bonus > 0 ? (
          <Text style={{ color: "#52c41a" }}>+${bonus.toLocaleString()}</Text>
        ) : (
          "-"
        ),
    },
    {
      title: "Net Salary",
      dataIndex: "netSalary",
      key: "netSalary",
      width: 140,
      align: "right",
      render: (salary: number) => (
        <Text strong style={{ fontSize: 14, color: "#1677ff" }}>
          ${salary.toLocaleString()}
        </Text>
      ),
      sorter: (a, b) => a.netSalary - b.netSalary,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: Payslip["status"]) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Paid", value: "paid" },
        { text: "Pending", value: "pending" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
          />
          <Button
            icon={<DownloadOutlined />}
            size="small"
            onClick={() => handleDownload(record)}
          />
          <Button
            icon={<PrinterOutlined />}
            size="small"
            onClick={() => handlePrint(record)}
          />
        </Space>
      ),
    },
  ];

  // Calculate summary statistics
  const totalPayslips = filteredPayslips.length;
  const paidPayslips = filteredPayslips.filter(
    (p) => p.status === "paid"
  ).length;
  const pendingPayslips = filteredPayslips.filter(
    (p) => p.status === "pending"
  ).length;
  const totalPaid = filteredPayslips
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.netSalary, 0);

  return (
    <div>
      <Title level={2}>
        <CalendarOutlined /> Payslips
      </Title>

      {/* Filters */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Month</Text>
              <Select
                value={selectedMonth}
                onChange={setSelectedMonth}
                style={{ width: "100%" }}
                size="large"
              >
                <Option value="all">All Months</Option>
                <Option value="January">January</Option>
                <Option value="February">February</Option>
                <Option value="March">March</Option>
                <Option value="April">April</Option>
                <Option value="May">May</Option>
                <Option value="June">June</Option>
                <Option value="July">July</Option>
                <Option value="August">August</Option>
                <Option value="September">September</Option>
                <Option value="October">October</Option>
                <Option value="November">November</Option>
                <Option value="December">December</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Year</Text>
              <Select
                value={selectedYear}
                onChange={setSelectedYear}
                style={{ width: "100%" }}
                size="large"
              >
                <Option value="all">All Years</Option>
                <Option value={2024}>2024</Option>
                <Option value={2023}>2023</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Status</Text>
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                style={{ width: "100%" }}
                size="large"
              >
                <Option value="all">All Status</Option>
                <Option value="paid">Paid</Option>
                <Option value="pending">Pending</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Payslips"
              value={totalPayslips}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Paid"
              value={paidPayslips}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={pendingPayslips}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Paid Amount"
              value={totalPaid}
              precision={0}
              prefix="$"
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Payslip Records"
        columns={columns}
        data={filteredPayslips}
        rowKey="key"
        scroll={{ x: 1600 }}
      />

      {/* View Payslip Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Payslip Details"
        width={800}
        footer={[
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={() => {
              handleDownload(selectedPayslip!);
              setIsViewModalOpen(false);
            }}
          >
            Download
          </Button>,
          <Button
            key="print"
            type="primary"
            icon={<PrinterOutlined />}
            onClick={() => {
              handlePrint(selectedPayslip!);
              setIsViewModalOpen(false);
            }}
          >
            Print
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedPayslip && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Title level={4} style={{ margin: 0 }}>
                PAYSLIP
              </Title>
              <Text type="secondary">
                {selectedPayslip.month} {selectedPayslip.year}
              </Text>
              <br />
              <Text code>{selectedPayslip.payslipId}</Text>
            </div>

            <Divider />

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text type="secondary">Employee Name</Text>
                  <Text strong style={{ fontSize: 16 }}>
                    {selectedPayslip.employeeName}
                  </Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text type="secondary">Employee ID</Text>
                  <Text code>{selectedPayslip.employeeId}</Text>
                </Space>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text type="secondary">Department</Text>
                  <Text>{selectedPayslip.department}</Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text type="secondary">Designation</Text>
                  <Text>{selectedPayslip.designation}</Text>
                </Space>
              </Col>
            </Row>

            <Divider />

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Basic Salary">
                ${selectedPayslip.basicSalary.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Allowances">
                <Text style={{ color: "#52c41a" }}>
                  +${selectedPayslip.allowances.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Bonus">
                {selectedPayslip.bonus > 0 ? (
                  <Text style={{ color: "#52c41a" }}>
                    +${selectedPayslip.bonus.toLocaleString()}
                  </Text>
                ) : (
                  "-"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Deductions">
                <Text style={{ color: "#ff4d4f" }}>
                  -${selectedPayslip.deductions.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Net Salary">
                <Text strong style={{ fontSize: 18, color: "#1677ff" }}>
                  ${selectedPayslip.netSalary.toLocaleString()}
                </Text>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text type="secondary">Status</Text>
                  <Tag
                    icon={getStatusIcon(selectedPayslip.status)}
                    color={getStatusColor(selectedPayslip.status)}
                  >
                    {selectedPayslip.status.toUpperCase()}
                  </Tag>
                </Space>
              </Col>
              {selectedPayslip.paymentDate && (
                <Col span={12}>
                  <Space direction="vertical">
                    <Text type="secondary">Payment Date</Text>
                    <Text>
                      {dayjs(selectedPayslip.paymentDate).format(
                        "MMMM DD, YYYY"
                      )}
                    </Text>
                  </Space>
                </Col>
              )}
            </Row>

            {selectedPayslip.paymentMethod && (
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Space direction="vertical">
                    <Text type="secondary">Payment Method</Text>
                    <Text>{selectedPayslip.paymentMethod}</Text>
                  </Space>
                </Col>
              </Row>
            )}
          </div>
        )}
      </DynamicModal>
    </div>
  );
}
