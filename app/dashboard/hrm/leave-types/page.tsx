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
  InputNumber,
  Switch,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
} from "antd";
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface LeaveType {
  key: string;
  id: string;
  name: string;
  description: string;
  maxDays: number;
  carryForwardDays: number;
  requiresApproval: boolean;
  isPaid: boolean;
  status: "active" | "inactive";
}

// Demo data
const demoLeaveTypes: LeaveType[] = [
  {
    key: "1",
    id: "LT001",
    name: "Annual Leave",
    description: "Annual vacation leave for all employees",
    maxDays: 20,
    carryForwardDays: 5,
    requiresApproval: true,
    isPaid: true,
    status: "active",
  },
  {
    key: "2",
    id: "LT002",
    name: "Sick Leave",
    description: "Leave for medical reasons and health issues",
    maxDays: 15,
    carryForwardDays: 0,
    requiresApproval: true,
    isPaid: true,
    status: "active",
  },
  {
    key: "3",
    id: "LT003",
    name: "Casual Leave",
    description: "Short-term casual leave for personal matters",
    maxDays: 10,
    carryForwardDays: 2,
    requiresApproval: false,
    isPaid: true,
    status: "active",
  },
  {
    key: "4",
    id: "LT004",
    name: "Maternity Leave",
    description: "Leave for expecting mothers",
    maxDays: 90,
    carryForwardDays: 0,
    requiresApproval: true,
    isPaid: true,
    status: "active",
  },
  {
    key: "5",
    id: "LT005",
    name: "Paternity Leave",
    description: "Leave for new fathers",
    maxDays: 14,
    carryForwardDays: 0,
    requiresApproval: true,
    isPaid: true,
    status: "active",
  },
  {
    key: "6",
    id: "LT006",
    name: "Unpaid Leave",
    description: "Leave without salary for extended personal matters",
    maxDays: 30,
    carryForwardDays: 0,
    requiresApproval: true,
    isPaid: false,
    status: "active",
  },
  {
    key: "7",
    id: "LT007",
    name: "Study Leave",
    description: "Leave for educational purposes and examinations",
    maxDays: 10,
    carryForwardDays: 0,
    requiresApproval: true,
    isPaid: false,
    status: "inactive",
  },
];

export default function LeaveTypesPage() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(demoLeaveTypes);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: LeaveType) => {
    setSelectedLeaveType(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: LeaveType) => {
    setSelectedLeaveType(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: LeaveType) => {
    setLeaveTypes(leaveTypes.filter((item) => item.key !== record.key));
    message.success(`Leave type "${record.name}" deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      setLeaveTypes(
        leaveTypes.map((item) =>
          item.key === selectedLeaveType?.key ? { ...item, ...values } : item
        )
      );
      message.success("Leave type updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newLeaveType: LeaveType = {
        key: (leaveTypes.length + 1).toString(),
        id: `LT${String(leaveTypes.length + 1).padStart(3, "0")}`,
        ...values,
      };
      setLeaveTypes([...leaveTypes, newLeaveType]);
      message.success("Leave type added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  // Column definitions
  const columns: DynamicTableColumn<LeaveType>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Leave Type",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Max Days",
      dataIndex: "maxDays",
      key: "maxDays",
      width: 120,
      align: "center",
      sorter: (a, b) => a.maxDays - b.maxDays,
    },
    {
      title: "Carry Forward",
      dataIndex: "carryForwardDays",
      key: "carryForwardDays",
      width: 130,
      align: "center",
      sorter: (a, b) => a.carryForwardDays - b.carryForwardDays,
    },
    {
      title: "Requires Approval",
      dataIndex: "requiresApproval",
      key: "requiresApproval",
      width: 150,
      align: "center",
      render: (requiresApproval: boolean) =>
        requiresApproval ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Yes
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="default">
            No
          </Tag>
        ),
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      key: "isPaid",
      width: 100,
      align: "center",
      render: (isPaid: boolean) =>
        isPaid ? (
          <Tag color="green">Paid</Tag>
        ) : (
          <Tag color="orange">Unpaid</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status: string) => (
        <Tag color={status === "active" ? "success" : "default"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
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
      width: 150,
      fixed: "right",
      render: (_: any, record: LeaveType) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Leave Type"
            description={`Are you sure you want to delete "${record.name}"?`}
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
  const totalLeaveTypes = leaveTypes.length;
  const activeLeaveTypes = leaveTypes.filter(
    (lt) => lt.status === "active"
  ).length;
  const paidLeaveTypes = leaveTypes.filter((lt) => lt.isPaid).length;
  const totalMaxDays = leaveTypes
    .filter((lt) => lt.status === "active" && lt.isPaid)
    .reduce((sum, lt) => sum + lt.maxDays, 0);

  // Form definition
  const leaveTypeForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Leave Type Name"
            rules={[
              { required: true, message: "Please enter leave type name" },
            ]}
          >
            <Input placeholder="e.g., Annual Leave" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
            initialValue="active"
          >
            <Space>
              <Text>Inactive</Text>
              <Form.Item name="status" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  onChange={(checked) =>
                    form.setFieldsValue({
                      status: checked ? "active" : "inactive",
                    })
                  }
                />
              </Form.Item>
              <Text>Active</Text>
            </Space>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={3} placeholder="Describe this leave type" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="maxDays"
            label="Maximum Days per Year"
            rules={[{ required: true, message: "Please enter max days" }]}
          >
            <InputNumber
              min={0}
              max={365}
              style={{ width: "100%" }}
              placeholder="e.g., 20"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="carryForwardDays"
            label="Carry Forward Days"
            rules={[
              { required: true, message: "Please enter carry forward days" },
            ]}
            initialValue={0}
          >
            <InputNumber
              min={0}
              max={365}
              style={{ width: "100%" }}
              placeholder="e.g., 5"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="requiresApproval"
            label="Requires Approval"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="isPaid"
            label="Paid Leave"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Paid" unCheckedChildren="Unpaid" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      {/* Page Title */}
      <Title level={2}>
        <FileTextOutlined /> Leave Types
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Leave Types"
              value={totalLeaveTypes}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Types"
              value={activeLeaveTypes}
              valueStyle={{ color: "#52c41a" }}
              suffix={`/ ${totalLeaveTypes}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Paid Leave Types"
              value={paidLeaveTypes}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Days (Paid)"
              value={totalMaxDays}
              suffix="days"
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Leave Types List"
        columns={columns}
        data={leaveTypes}
        showAdd
        addButtonText="Add Leave Type"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1300 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Leave Type Details - ${selectedLeaveType?.name}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedLeaveType!);
            }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedLeaveType && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="ID" span={1}>
              {selectedLeaveType.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              <Tag
                color={
                  selectedLeaveType.status === "active" ? "success" : "default"
                }
              >
                {selectedLeaveType.status.charAt(0).toUpperCase() +
                  selectedLeaveType.status.slice(1)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Name" span={2}>
              <Text strong>{selectedLeaveType.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedLeaveType.description}
            </Descriptions.Item>
            <Descriptions.Item label="Maximum Days" span={1}>
              <Text strong>{selectedLeaveType.maxDays}</Text> days per year
            </Descriptions.Item>
            <Descriptions.Item label="Carry Forward" span={1}>
              <Text strong>{selectedLeaveType.carryForwardDays}</Text> days
            </Descriptions.Item>
            <Descriptions.Item label="Requires Approval" span={1}>
              {selectedLeaveType.requiresApproval ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Yes
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="default">
                  No
                </Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Type" span={1}>
              {selectedLeaveType.isPaid ? (
                <Tag color="green">Paid</Tag>
              ) : (
                <Tag color="orange">Unpaid</Tag>
              )}
            </Descriptions.Item>
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
        title="Edit Leave Type"
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
        {leaveTypeForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add New Leave Type"
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
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleSaveAdd}
          >
            Add Leave Type
          </Button>,
        ]}
      >
        {leaveTypeForm}
      </DynamicModal>
    </div>
  );
}
