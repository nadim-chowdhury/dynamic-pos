"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  message,
  Form,
  Input,
  Select,
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
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Department {
  key: string;
  id: string;
  name: string;
  description: string;
  head: string;
  employeeCount: number;
  status: "active" | "inactive";
  location?: string;
  budget?: number;
}

// Demo departments data
const demoDepartments: Department[] = [
  {
    key: "1",
    id: "DEPT-001",
    name: "Sales",
    description: "Handles all sales operations and customer relations",
    head: "John Doe",
    employeeCount: 15,
    status: "active",
    location: "Floor 1",
    budget: 250000,
  },
  {
    key: "2",
    id: "DEPT-002",
    name: "IT",
    description: "Manages technology infrastructure and software development",
    head: "Mike Brown",
    employeeCount: 8,
    status: "active",
    location: "Floor 3",
    budget: 180000,
  },
  {
    key: "3",
    id: "DEPT-003",
    name: "Human Resources",
    description: "Manages employee relations, recruitment, and payroll",
    head: "Emily Davis",
    employeeCount: 5,
    status: "active",
    location: "Floor 2",
    budget: 120000,
  },
  {
    key: "4",
    id: "DEPT-004",
    name: "Finance",
    description: "Handles accounting, budgeting, and financial planning",
    head: "Robert Taylor",
    employeeCount: 6,
    status: "active",
    location: "Floor 2",
    budget: 150000,
  },
  {
    key: "5",
    id: "DEPT-005",
    name: "Operations",
    description: "Manages daily operations and logistics",
    head: "David Wilson",
    employeeCount: 12,
    status: "active",
    location: "Floor 1",
    budget: 200000,
  },
  {
    key: "6",
    id: "DEPT-006",
    name: "Marketing",
    description: "Handles marketing campaigns and brand management",
    head: "Jennifer Martinez",
    employeeCount: 7,
    status: "active",
    location: "Floor 3",
    budget: 160000,
  },
  {
    key: "7",
    id: "DEPT-007",
    name: "Customer Support",
    description: "Provides customer service and support",
    head: "Sarah Johnson",
    employeeCount: 10,
    status: "active",
    location: "Floor 1",
    budget: 130000,
  },
  {
    key: "8",
    id: "DEPT-008",
    name: "Research & Development",
    description: "Product research and development",
    head: "Lisa Anderson",
    employeeCount: 4,
    status: "inactive",
    location: "Floor 3",
    budget: 100000,
  },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(demoDepartments);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleView = (record: Department) => {
    setSelectedDepartment(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Department) => {
    setSelectedDepartment(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Department) => {
    if (record.employeeCount > 0) {
      message.warning(
        `Cannot delete ${record.name} department. Please reassign ${record.employeeCount} employees first.`
      );
      return;
    }
    message.success(`Department ${record.name} deleted successfully`);
    setDepartments(departments.filter((dept) => dept.key !== record.key));
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      const updatedDepartments = departments.map((dept) =>
        dept.key === selectedDepartment?.key ? { ...dept, ...values } : dept
      );
      setDepartments(updatedDepartments);
      message.success("Department updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newDepartment: Department = {
        ...values,
        key: String(departments.length + 1),
        id: `DEPT-${String(departments.length + 1).padStart(3, "0")}`,
        employeeCount: 0,
      };
      setDepartments([...departments, newDepartment]);
      message.success("Department added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  const getActionItems = (record: Department): MenuProps["items"] => [
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
      disabled: record.employeeCount > 0,
    },
  ];

  const columns: DynamicTableColumn<Department>[] = [
    {
      title: "Department ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (name: string) => (
        <Space>
          <TeamOutlined />
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Department Head",
      dataIndex: "head",
      key: "head",
      width: 150,
      render: (head: string) => (
        <Space>
          <UserOutlined />
          <Text>{head}</Text>
        </Space>
      ),
    },
    {
      title: "Employees",
      dataIndex: "employeeCount",
      key: "employeeCount",
      width: 100,
      align: "center",
      render: (count: number) => <Tag color="blue">{count}</Tag>,
      sorter: (a, b) => a.employeeCount - b.employeeCount,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      width: 130,
      align: "right",
      render: (budget: number) => `$${budget?.toLocaleString() || 0}`,
      sorter: (a, b) => (a.budget || 0) - (b.budget || 0),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag
          icon={
            status === "active" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
          color={status === "active" ? "success" : "default"}
        >
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record: Department) => (
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
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(
    (d) => d.status === "active"
  ).length;
  const totalEmployees = departments.reduce(
    (sum, d) => sum + d.employeeCount,
    0
  );
  const totalBudget = departments.reduce((sum, d) => sum + (d.budget || 0), 0);

  const departmentForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Department Name"
            rules={[
              { required: true, message: "Please enter department name" },
            ]}
          >
            <Input size="large" placeholder="e.g., Sales" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="head"
            label="Department Head"
            rules={[
              { required: true, message: "Please enter department head" },
            ]}
          >
            <Input size="large" placeholder="e.g., John Doe" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <TextArea
          rows={3}
          placeholder="Describe the department's responsibilities..."
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="location" label="Location">
            <Input size="large" placeholder="e.g., Floor 1" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="budget" label="Annual Budget">
            <Input
              size="large"
              type="number"
              prefix="$"
              placeholder="e.g., 100000"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select status" }]}
      >
        <Select size="large" placeholder="Select status">
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Title level={2}>
        <TeamOutlined /> Departments
      </Title>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Departments"
              value={totalDepartments}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Departments"
              value={activeDepartments}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Budget"
              value={totalBudget}
              precision={0}
              prefix="$"
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Departments List"
        columns={columns}
        data={departments}
        showAdd
        addButtonText="Add Department"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1300 }}
      />

      {/* View Department Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Department Details - ${selectedDepartment?.name}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedDepartment!);
            }}
          >
            Edit Department
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedDepartment && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Text type="secondary">Department ID</Text>
              <div>
                <Text strong code>
                  {selectedDepartment.id}
                </Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Department Name</Text>
              <div>
                <Text strong style={{ fontSize: 18 }}>
                  {selectedDepartment.name}
                </Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Description</Text>
              <div>
                <Text>{selectedDepartment.description}</Text>
              </div>
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Department Head</Text>
                <div>
                  <Text strong>{selectedDepartment.head}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Number of Employees</Text>
                <div>
                  <Tag
                    color="blue"
                    style={{ fontSize: 16, padding: "4px 12px" }}
                  >
                    {selectedDepartment.employeeCount}
                  </Tag>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Location</Text>
                <div>
                  <Text>{selectedDepartment.location || "Not specified"}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Annual Budget</Text>
                <div>
                  <Text strong>
                    ${selectedDepartment.budget?.toLocaleString() || 0}
                  </Text>
                </div>
              </Col>
            </Row>
            <div>
              <Text type="secondary">Status</Text>
              <div>
                <Tag
                  icon={
                    selectedDepartment.status === "active" ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                  color={
                    selectedDepartment.status === "active"
                      ? "success"
                      : "default"
                  }
                >
                  {selectedDepartment.status.toUpperCase()}
                </Tag>
              </div>
            </div>
          </Space>
        )}
      </DynamicModal>

      {/* Edit Department Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title="Edit Department"
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>,
        ]}
      >
        {departmentForm}
      </DynamicModal>

      {/* Add Department Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add New Department"
        footer={[
          <Button key="cancel" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveAdd}>
            Add Department
          </Button>,
        ]}
      >
        {departmentForm}
      </DynamicModal>
    </div>
  );
}
