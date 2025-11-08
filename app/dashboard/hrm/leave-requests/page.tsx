"use client";

import { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
  Avatar,
} from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface LeaveRequest {
  key: string;
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
}

// Demo data
const demoLeaveRequests: LeaveRequest[] = [
  {
    key: "1",
    id: "LR001",
    employeeName: "John Smith",
    employeeId: "EMP001",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2025-12-20",
    endDate: "2025-12-27",
    numberOfDays: 6,
    reason: "Family vacation during holidays",
    status: "approved",
    approvedBy: "Jane Doe",
    approvalDate: "2025-11-05",
  },
  {
    key: "2",
    id: "LR002",
    employeeName: "Sarah Johnson",
    employeeId: "EMP002",
    department: "Marketing",
    leaveType: "Sick Leave",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    numberOfDays: 3,
    reason: "Medical treatment required",
    status: "pending",
  },
  {
    key: "3",
    id: "LR003",
    employeeName: "Michael Brown",
    employeeId: "EMP003",
    department: "Sales",
    leaveType: "Casual Leave",
    startDate: "2025-11-15",
    endDate: "2025-11-15",
    numberOfDays: 1,
    reason: "Personal matters",
    status: "approved",
    approvedBy: "Jane Doe",
    approvalDate: "2025-11-08",
  },
  {
    key: "4",
    id: "LR004",
    employeeName: "Emily Davis",
    employeeId: "EMP004",
    department: "HR",
    leaveType: "Maternity Leave",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    numberOfDays: 90,
    reason: "Maternity leave as per policy",
    status: "approved",
    approvedBy: "Jane Doe",
    approvalDate: "2025-11-01",
  },
  {
    key: "5",
    id: "LR005",
    employeeName: "David Wilson",
    employeeId: "EMP005",
    department: "Finance",
    leaveType: "Annual Leave",
    startDate: "2025-11-25",
    endDate: "2025-11-29",
    numberOfDays: 5,
    reason: "Wedding anniversary trip",
    status: "rejected",
    approvedBy: "Jane Doe",
    approvalDate: "2025-11-07",
    rejectionReason: "Insufficient leave balance",
  },
  {
    key: "6",
    id: "LR006",
    employeeName: "Lisa Anderson",
    employeeId: "EMP006",
    department: "Engineering",
    leaveType: "Sick Leave",
    startDate: "2025-11-09",
    endDate: "2025-11-09",
    numberOfDays: 1,
    reason: "Flu symptoms",
    status: "pending",
  },
  {
    key: "7",
    id: "LR007",
    employeeName: "Robert Taylor",
    employeeId: "EMP007",
    department: "Operations",
    leaveType: "Paternity Leave",
    startDate: "2025-11-18",
    endDate: "2025-12-01",
    numberOfDays: 14,
    reason: "Newborn care",
    status: "pending",
  },
  {
    key: "8",
    id: "LR008",
    employeeName: "Jennifer Martinez",
    employeeId: "EMP008",
    department: "Marketing",
    leaveType: "Casual Leave",
    startDate: "2025-11-22",
    endDate: "2025-11-22",
    numberOfDays: 1,
    reason: "Family function",
    status: "cancelled",
  },
];

export default function LeaveRequestsPage() {
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(demoLeaveRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: LeaveRequest) => {
    setSelectedRequest(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: LeaveRequest) => {
    setSelectedRequest(record);
    form.setFieldsValue({
      ...record,
      dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: LeaveRequest) => {
    setLeaveRequests(leaveRequests.filter((item) => item.key !== record.key));
    message.success(`Leave request ${record.id} deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleApprove = (record: LeaveRequest) => {
    setSelectedRequest(record);
    setIsApproveModalOpen(true);
  };

  const handleApproveConfirm = (approved: boolean) => {
    if (!selectedRequest) return;

    const status = approved ? "approved" : "rejected";
    setLeaveRequests(
      leaveRequests.map((item) =>
        item.key === selectedRequest.key
          ? {
              ...item,
              status,
              approvedBy: "Current User",
              approvalDate: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
    message.success(
      `Leave request ${approved ? "approved" : "rejected"} successfully`
    );
    setIsApproveModalOpen(false);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      const [startDate, endDate] = values.dateRange;
      const numberOfDays = endDate.diff(startDate, "day") + 1;

      setLeaveRequests(
        leaveRequests.map((item) =>
          item.key === selectedRequest?.key
            ? {
                ...item,
                ...values,
                startDate: startDate.format("YYYY-MM-DD"),
                endDate: endDate.format("YYYY-MM-DD"),
                numberOfDays,
              }
            : item
        )
      );
      message.success("Leave request updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const [startDate, endDate] = values.dateRange;
      const numberOfDays = endDate.diff(startDate, "day") + 1;

      const newRequest: LeaveRequest = {
        key: (leaveRequests.length + 1).toString(),
        id: `LR${String(leaveRequests.length + 1).padStart(3, "0")}`,
        ...values,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        numberOfDays,
        status: "pending",
      };
      setLeaveRequests([...leaveRequests, newRequest]);
      message.success("Leave request submitted successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  // Status rendering helper
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
      case "cancelled":
        return (
          <Tag icon={<CloseCircleOutlined />} color="default">
            Cancelled
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

  // Column definitions
  const columns: DynamicTableColumn<LeaveRequest>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
      width: 180,
      sorter: (a, b) => a.employeeName.localeCompare(b.employeeName),
      render: (name: string, record: LeaveRequest) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          <div>
            <div>{name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
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
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "Marketing", value: "Marketing" },
        { text: "Sales", value: "Sales" },
        { text: "HR", value: "HR" },
        { text: "Finance", value: "Finance" },
        { text: "Operations", value: "Operations" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      width: 140,
      filters: [
        { text: "Annual Leave", value: "Annual Leave" },
        { text: "Sick Leave", value: "Sick Leave" },
        { text: "Casual Leave", value: "Casual Leave" },
        { text: "Maternity Leave", value: "Maternity Leave" },
        { text: "Paternity Leave", value: "Paternity Leave" },
      ],
      onFilter: (value, record) => record.leaveType === value,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 120,
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 120,
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    },
    {
      title: "Days",
      dataIndex: "numberOfDays",
      key: "numberOfDays",
      width: 80,
      align: "center",
      sorter: (a, b) => a.numberOfDays - b.numberOfDays,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      align: "center",
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Approved", value: "approved" },
        { text: "Rejected", value: "rejected" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      fixed: "right",
      render: (_: any, record: LeaveRequest) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          {record.status === "pending" && (
            <>
              <Button
                type="link"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApprove(record)}
                style={{ color: "#52c41a" }}
              >
                Review
              </Button>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              >
                Edit
              </Button>
            </>
          )}
          <Popconfirm
            title="Delete Leave Request"
            description={`Are you sure you want to delete ${record.id}?`}
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Summary statistics
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(
    (lr) => lr.status === "pending"
  ).length;
  const approvedRequests = leaveRequests.filter(
    (lr) => lr.status === "approved"
  ).length;
  const rejectedRequests = leaveRequests.filter(
    (lr) => lr.status === "rejected"
  ).length;

  // Form definition
  const leaveRequestForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="employeeName"
            label="Employee Name"
            rules={[{ required: true, message: "Please enter employee name" }]}
          >
            <Input placeholder="e.g., John Smith" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="employeeId"
            label="Employee ID"
            rules={[{ required: true, message: "Please enter employee ID" }]}
          >
            <Input placeholder="e.g., EMP001" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please select department" }]}
          >
            <Select placeholder="Select department">
              <Option value="Engineering">Engineering</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Sales">Sales</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Operations">Operations</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="leaveType"
            label="Leave Type"
            rules={[{ required: true, message: "Please select leave type" }]}
          >
            <Select placeholder="Select leave type">
              <Option value="Annual Leave">Annual Leave</Option>
              <Option value="Sick Leave">Sick Leave</Option>
              <Option value="Casual Leave">Casual Leave</Option>
              <Option value="Maternity Leave">Maternity Leave</Option>
              <Option value="Paternity Leave">Paternity Leave</Option>
              <Option value="Unpaid Leave">Unpaid Leave</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="dateRange"
            label="Leave Period"
            rules={[{ required: true, message: "Please select leave dates" }]}
          >
            <RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[
              { required: true, message: "Please enter reason for leave" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Explain the reason for this leave request"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      {/* Page Title */}
      <Title level={2}>
        <CalendarOutlined /> Leave Requests
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Requests"
              value={totalRequests}
              valueStyle={{ color: "#1890ff" }}
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
              title="Rejected"
              value={rejectedRequests}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Leave Requests List"
        columns={columns}
        data={leaveRequests}
        showAdd
        addButtonText="New Leave Request"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1500 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Leave Request Details - ${selectedRequest?.id}`}
        footer={[
          selectedRequest?.status === "pending" && (
            <Button
              key="review"
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => {
                setIsViewModalOpen(false);
                handleApprove(selectedRequest!);
              }}
            >
              Review
            </Button>
          ),
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRequest && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Request ID" span={1}>
              {selectedRequest.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              {getStatusTag(selectedRequest.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Employee Name" span={1}>
              <Text strong>{selectedRequest.employeeName}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Employee ID" span={1}>
              {selectedRequest.employeeId}
            </Descriptions.Item>
            <Descriptions.Item label="Department" span={1}>
              {selectedRequest.department}
            </Descriptions.Item>
            <Descriptions.Item label="Leave Type" span={1}>
              <Tag color="blue">{selectedRequest.leaveType}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Start Date" span={1}>
              {selectedRequest.startDate}
            </Descriptions.Item>
            <Descriptions.Item label="End Date" span={1}>
              {selectedRequest.endDate}
            </Descriptions.Item>
            <Descriptions.Item label="Number of Days" span={2}>
              <Text strong>{selectedRequest.numberOfDays}</Text> days
            </Descriptions.Item>
            <Descriptions.Item label="Reason" span={2}>
              {selectedRequest.reason}
            </Descriptions.Item>
            {selectedRequest.approvedBy && (
              <>
                <Descriptions.Item label="Approved/Rejected By" span={1}>
                  {selectedRequest.approvedBy}
                </Descriptions.Item>
                <Descriptions.Item label="Decision Date" span={1}>
                  {selectedRequest.approvalDate}
                </Descriptions.Item>
              </>
            )}
            {selectedRequest.rejectionReason && (
              <Descriptions.Item label="Rejection Reason" span={2}>
                <Text type="danger">{selectedRequest.rejectionReason}</Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </DynamicModal>

      {/* Edit Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title="Edit Leave Request"
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsEditModalOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>,
        ]}
      >
        {leaveRequestForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="New Leave Request"
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsAddModalOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleSaveAdd}
          >
            Submit Request
          </Button>,
        ]}
      >
        {leaveRequestForm}
      </DynamicModal>

      {/* Approve/Reject Modal */}
      <DynamicModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Review Leave Request"
        footer={[
          <Button key="cancel" onClick={() => setIsApproveModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="reject"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleApproveConfirm(false)}
          >
            Reject
          </Button>,
          <Button
            key="approve"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleApproveConfirm(true)}
          >
            Approve
          </Button>,
        ]}
      >
        {selectedRequest && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Employee">
              <Text strong>{selectedRequest.employeeName}</Text> (
              {selectedRequest.employeeId})
            </Descriptions.Item>
            <Descriptions.Item label="Leave Type">
              {selectedRequest.leaveType}
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              {selectedRequest.startDate} to {selectedRequest.endDate} (
              {selectedRequest.numberOfDays} days)
            </Descriptions.Item>
            <Descriptions.Item label="Reason">
              {selectedRequest.reason}
            </Descriptions.Item>
          </Descriptions>
        )}
      </DynamicModal>
    </div>
  );
}
