"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  message,
  Avatar,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Statistic,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  DollarOutlined,
  GiftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Bonus {
  key: string;
  bonusId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  bonusType: string;
  amount: number;
  date: string;
  reason: string;
  status: "approved" | "pending" | "rejected";
  approvedBy?: string;
  avatar?: string;
}

// Demo bonus data
const demoBonuses: Bonus[] = [
  {
    key: "1",
    bonusId: "BON-001",
    employeeId: "EMP-001",
    employeeName: "John Doe",
    department: "Sales",
    bonusType: "Performance Bonus",
    amount: 5000,
    date: "2024-01-15",
    reason: "Exceeded quarterly sales target by 150%",
    status: "approved",
    approvedBy: "Emily Davis",
  },
  {
    key: "2",
    bonusId: "BON-002",
    employeeId: "EMP-002",
    employeeName: "Sarah Johnson",
    department: "Sales",
    bonusType: "Performance Bonus",
    amount: 2000,
    date: "2024-01-15",
    reason: "Excellent customer service ratings",
    status: "approved",
    approvedBy: "Emily Davis",
  },
  {
    key: "3",
    bonusId: "BON-003",
    employeeId: "EMP-003",
    employeeName: "Mike Brown",
    department: "IT",
    bonusType: "Project Completion",
    amount: 6000,
    date: "2024-01-20",
    reason: "Successfully implemented new POS system",
    status: "approved",
    approvedBy: "Emily Davis",
  },
  {
    key: "4",
    bonusId: "BON-004",
    employeeId: "EMP-004",
    employeeName: "Emily Davis",
    department: "HR",
    bonusType: "Annual Bonus",
    amount: 10000,
    date: "2023-12-31",
    reason: "Year-end bonus for excellent leadership",
    status: "approved",
    approvedBy: "CEO",
  },
  {
    key: "5",
    bonusId: "BON-005",
    employeeId: "EMP-005",
    employeeName: "Robert Taylor",
    department: "Finance",
    bonusType: "Performance Bonus",
    amount: 4000,
    date: "2024-01-10",
    reason: "Successful financial audit with zero discrepancies",
    status: "approved",
    approvedBy: "Emily Davis",
  },
  {
    key: "6",
    bonusId: "BON-006",
    employeeId: "EMP-006",
    employeeName: "Lisa Anderson",
    department: "Sales",
    bonusType: "Spot Bonus",
    amount: 1000,
    date: "2024-02-01",
    reason: "Handled difficult customer situation professionally",
    status: "pending",
  },
  {
    key: "7",
    bonusId: "BON-007",
    employeeId: "EMP-007",
    employeeName: "David Wilson",
    department: "Operations",
    bonusType: "Performance Bonus",
    amount: 3500,
    date: "2024-02-05",
    reason: "Improved warehouse efficiency by 30%",
    status: "pending",
  },
  {
    key: "8",
    bonusId: "BON-008",
    employeeId: "EMP-008",
    employeeName: "Jennifer Martinez",
    department: "Marketing",
    bonusType: "Campaign Success",
    amount: 2500,
    date: "2023-12-15",
    reason: "Marketing campaign increased sales by 40%",
    status: "rejected",
  },
];

export default function BonusesPage() {
  const [bonuses, setBonuses] = useState<Bonus[]>(demoBonuses);
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleView = (record: Bonus) => {
    setSelectedBonus(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Bonus) => {
    setSelectedBonus(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Bonus) => {
    if (record.status === "approved") {
      message.warning("Cannot delete approved bonuses");
      return;
    }
    message.success(`Bonus ${record.bonusId} deleted successfully`);
    setBonuses(bonuses.filter((bonus) => bonus.key !== record.key));
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      const updatedBonuses = bonuses.map((bonus) =>
        bonus.key === selectedBonus?.key
          ? {
              ...bonus,
              ...values,
              date: values.date.format("YYYY-MM-DD"),
            }
          : bonus
      );
      setBonuses(updatedBonuses);
      message.success("Bonus updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newBonus: Bonus = {
        ...values,
        key: String(bonuses.length + 1),
        bonusId: `BON-${String(bonuses.length + 1).padStart(3, "0")}`,
        date: values.date.format("YYYY-MM-DD"),
        status: "pending",
      };
      setBonuses([...bonuses, newBonus]);
      message.success("Bonus added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  const getStatusColor = (status: Bonus["status"]) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: Bonus["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircleOutlined />;
      case "pending":
        return <ClockCircleOutlined />;
      case "rejected":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const getActionItems = (record: Bonus): MenuProps["items"] => [
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleView(record),
    },
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
      disabled: record.status === "approved",
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record),
      disabled: record.status === "approved",
    },
  ];

  const columns: DynamicTableColumn<Bonus>[] = [
    {
      title: "Bonus ID",
      dataIndex: "bonusId",
      key: "bonusId",
      width: 110,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: "Employee",
      key: "employee",
      width: 200,
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
      filters: [
        { text: "Sales", value: "Sales" },
        { text: "IT", value: "IT" },
        { text: "HR", value: "HR" },
        { text: "Finance", value: "Finance" },
        { text: "Operations", value: "Operations" },
        { text: "Marketing", value: "Marketing" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Bonus Type",
      dataIndex: "bonusType",
      key: "bonusType",
      width: 160,
      render: (type: string) => <Tag color="blue">{type}</Tag>,
      filters: [
        { text: "Performance Bonus", value: "Performance Bonus" },
        { text: "Annual Bonus", value: "Annual Bonus" },
        { text: "Spot Bonus", value: "Spot Bonus" },
        { text: "Project Completion", value: "Project Completion" },
        { text: "Campaign Success", value: "Campaign Success" },
      ],
      onFilter: (value, record) => record.bonusType === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      align: "right",
      render: (amount: number) => (
        <Text strong style={{ color: "#52c41a" }}>
          ${amount.toLocaleString()}
        </Text>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: Bonus["status"]) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
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
          <Dropdown
            menu={{ items: getActionItems(record) }}
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Calculate summary statistics
  const totalBonuses = bonuses.length;
  const approvedBonuses = bonuses.filter((b) => b.status === "approved").length;
  const pendingBonuses = bonuses.filter((b) => b.status === "pending").length;
  const totalAmount = bonuses.reduce((sum, b) => sum + b.amount, 0);
  const approvedAmount = bonuses
    .filter((b) => b.status === "approved")
    .reduce((sum, b) => sum + b.amount, 0);

  const bonusForm = (
    <Form form={form} layout="vertical">
      <Form.Item
        name="employeeId"
        label="Employee ID"
        rules={[{ required: true, message: "Please enter employee ID" }]}
      >
        <Input size="large" placeholder="EMP-001" />
      </Form.Item>

      <Form.Item
        name="employeeName"
        label="Employee Name"
        rules={[{ required: true, message: "Please enter employee name" }]}
      >
        <Input size="large" placeholder="John Doe" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please select department" }]}
          >
            <Select size="large" placeholder="Select department">
              <Option value="Sales">Sales</Option>
              <Option value="IT">IT</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Operations">Operations</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="bonusType"
            label="Bonus Type"
            rules={[{ required: true, message: "Please select bonus type" }]}
          >
            <Select size="large" placeholder="Select bonus type">
              <Option value="Performance Bonus">Performance Bonus</Option>
              <Option value="Annual Bonus">Annual Bonus</Option>
              <Option value="Spot Bonus">Spot Bonus</Option>
              <Option value="Project Completion">Project Completion</Option>
              <Option value="Campaign Success">Campaign Success</Option>
              <Option value="Referral Bonus">Referral Bonus</Option>
              <Option value="Retention Bonus">Retention Bonus</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="Bonus Amount"
            rules={[{ required: true, message: "Please enter bonus amount" }]}
          >
            <InputNumber
              size="large"
              style={{ width: "100%" }}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "") as any}
              placeholder="5000"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker size="large" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="reason"
        label="Reason"
        rules={[{ required: true, message: "Please enter reason for bonus" }]}
      >
        <TextArea
          rows={3}
          placeholder="Describe the reason for this bonus..."
        />
      </Form.Item>

      {isEditModalOpen && (
        <>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select size="large">
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Form.Item>

          <Form.Item name="approvedBy" label="Approved By">
            <Input size="large" placeholder="Manager name" />
          </Form.Item>
        </>
      )}
    </Form>
  );

  return (
    <div>
      <Title level={2}>
        <GiftOutlined /> Bonuses
      </Title>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Bonuses"
              value={totalBonuses}
              prefix={<GiftOutlined />}
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Approved"
              value={approvedBonuses}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={pendingBonuses}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Approved Amount"
              value={approvedAmount}
              precision={0}
              prefix="$"
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Bonus Records"
        columns={columns}
        data={bonuses}
        showAdd
        addButtonText="Add Bonus"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1500 }}
      />

      {/* View Bonus Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Bonus Details"
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedBonus!);
            }}
            disabled={selectedBonus?.status === "approved"}
          >
            Edit Bonus
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedBonus && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Text type="secondary">Bonus ID</Text>
              <div>
                <Text strong code>
                  {selectedBonus.bonusId}
                </Text>
              </div>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Employee Name</Text>
                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    {selectedBonus.employeeName}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Employee ID</Text>
                <div>
                  <Text code>{selectedBonus.employeeId}</Text>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Department</Text>
                <div>
                  <Text>{selectedBonus.department}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Bonus Type</Text>
                <div>
                  <Tag color="blue">{selectedBonus.bonusType}</Tag>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Amount</Text>
                <div>
                  <Text strong style={{ fontSize: 20, color: "#52c41a" }}>
                    ${selectedBonus.amount.toLocaleString()}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Date</Text>
                <div>
                  <Text>
                    {dayjs(selectedBonus.date).format("MMMM DD, YYYY")}
                  </Text>
                </div>
              </Col>
            </Row>

            <div>
              <Text type="secondary">Reason</Text>
              <div>
                <Text>{selectedBonus.reason}</Text>
              </div>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Status</Text>
                <div>
                  <Tag
                    icon={getStatusIcon(selectedBonus.status)}
                    color={getStatusColor(selectedBonus.status)}
                  >
                    {selectedBonus.status.toUpperCase()}
                  </Tag>
                </div>
              </Col>
              {selectedBonus.approvedBy && (
                <Col span={12}>
                  <Text type="secondary">Approved By</Text>
                  <div>
                    <Text>{selectedBonus.approvedBy}</Text>
                  </div>
                </Col>
              )}
            </Row>
          </Space>
        )}
      </DynamicModal>

      {/* Edit Bonus Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title="Edit Bonus"
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>,
        ]}
      >
        {bonusForm}
      </DynamicModal>

      {/* Add Bonus Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add New Bonus"
        footer={[
          <Button key="cancel" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveAdd}>
            Add Bonus
          </Button>,
        ]}
      >
        {bonusForm}
      </DynamicModal>
    </div>
  );
}
