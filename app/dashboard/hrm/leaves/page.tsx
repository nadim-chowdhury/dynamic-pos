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
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  RightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface LeaveBalance {
  leaveType: string;
  total: number;
  used: number;
  remaining: number;
  status: "good" | "medium" | "low";
}

interface RecentRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
}

export default function LeavesOverviewPage() {
  const router = useRouter();

  // Demo data for leave balances
  const leaveBalances: LeaveBalance[] = [
    {
      leaveType: "Annual Leave",
      total: 20,
      used: 8,
      remaining: 12,
      status: "good",
    },
    {
      leaveType: "Sick Leave",
      total: 15,
      used: 10,
      remaining: 5,
      status: "medium",
    },
    {
      leaveType: "Casual Leave",
      total: 10,
      used: 7,
      remaining: 3,
      status: "low",
    },
    {
      leaveType: "Maternity Leave",
      total: 90,
      used: 0,
      remaining: 90,
      status: "good",
    },
    {
      leaveType: "Paternity Leave",
      total: 14,
      used: 0,
      remaining: 14,
      status: "good",
    },
  ];

  // Demo data for recent requests
  const recentRequests: RecentRequest[] = [
    {
      id: "LR007",
      employeeName: "Robert Taylor",
      leaveType: "Paternity Leave",
      startDate: "2025-11-18",
      endDate: "2025-12-01",
      days: 14,
      status: "pending",
    },
    {
      id: "LR006",
      employeeName: "Lisa Anderson",
      leaveType: "Sick Leave",
      startDate: "2025-11-09",
      endDate: "2025-11-09",
      days: 1,
      status: "pending",
    },
    {
      id: "LR003",
      employeeName: "Michael Brown",
      leaveType: "Casual Leave",
      startDate: "2025-11-15",
      endDate: "2025-11-15",
      days: 1,
      status: "approved",
    },
    {
      id: "LR005",
      employeeName: "David Wilson",
      leaveType: "Annual Leave",
      startDate: "2025-11-25",
      endDate: "2025-11-29",
      days: 5,
      status: "rejected",
    },
  ];

  // Calculate summary statistics
  const totalRequests = 8;
  const pendingRequests = 3;
  const approvedRequests = 3;
  const rejectedRequests = 1;
  const totalLeaveTypes = 7;
  const activeLeaveTypes = 6;

  // Get status tag for requests
  const getStatusTag = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Approved
          </Tag>
        );
      case "rejected":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Rejected
          </Tag>
        );
      default:
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Pending
          </Tag>
        );
    }
  };

  // Get progress color based on remaining leave
  const getProgressColor = (status: string) => {
    switch (status) {
      case "good":
        return "#52c41a";
      case "medium":
        return "#faad14";
      case "low":
        return "#ff4d4f";
      default:
        return "#1890ff";
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
          <FileTextOutlined /> Leaves Management
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/dashboard/hrm/leave-requests")}
          >
            New Leave Request
          </Button>
        </Space>
      </div>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Requests"
              value={totalRequests}
              valueStyle={{ color: "#1890ff" }}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={pendingRequests}
              valueStyle={{ color: "#faad14" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Approved"
              value={approvedRequests}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Leave Types"
              value={activeLeaveTypes}
              suffix={`/ ${totalLeaveTypes}`}
              valueStyle={{ color: "#722ed1" }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={16}>
        {/* Leave Balances Section */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>Leave Balances</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() => router.push("/dashboard/hrm/leave-types")}
              >
                View All
              </Button>
            }
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {leaveBalances.map((balance, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text strong>{balance.leaveType}</Text>
                    <Text>
                      <span
                        style={{
                          color: getProgressColor(balance.status),
                          fontWeight: "bold",
                        }}
                      >
                        {balance.remaining}
                      </span>
                      {" / "}
                      {balance.total} days
                    </Text>
                  </div>
                  <Progress
                    percent={Math.round(
                      (balance.remaining / balance.total) * 100
                    )}
                    strokeColor={getProgressColor(balance.status)}
                    showInfo={false}
                  />
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Used: {balance.used} days
                    </Text>
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Recent Leave Requests Section */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                <span>Recent Leave Requests</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() => router.push("/dashboard/hrm/leave-requests")}
              >
                View All
              </Button>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentRequests}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <Text strong>{item.employeeName}</Text>
                        {getStatusTag(item.status)}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">{item.leaveType}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.startDate} to {item.endDate} ({item.days}{" "}
                          {item.days === 1 ? "day" : "days"})
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
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/hrm/leave-requests")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <CalendarOutlined style={{ fontSize: 48, color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>
                Leave Requests
              </Title>
              <Text type="secondary">View and manage all leave requests</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/hrm/leave-types")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <FileTextOutlined style={{ fontSize: 48, color: "#52c41a" }} />
              <Title level={4} style={{ margin: 0 }}>
                Leave Types
              </Title>
              <Text type="secondary">Configure leave types and policies</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            onClick={() => router.push("/dashboard/hrm/leave-requests")}
            style={{ cursor: "pointer" }}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <ClockCircleOutlined style={{ fontSize: 48, color: "#faad14" }} />
              <Title level={4} style={{ margin: 0 }}>
                Pending Approvals
              </Title>
              <Text type="secondary">
                Review {pendingRequests} pending requests
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Additional Statistics */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Leave Statistics Overview">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Approval Rate"
                  value={75}
                  suffix="%"
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Leave Duration"
                  value={4.5}
                  suffix="days"
                  precision={1}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Most Requested Type"
                  value="Annual Leave"
                  valueStyle={{ color: "#722ed1", fontSize: 20 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
