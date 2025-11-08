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
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
} from "antd";
import {
  DollarOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  FallOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Expense {
  key: string;
  id: string;
  date: string;
  category: string;
  account: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  description: string;
  status: "completed" | "pending" | "cancelled";
  vendor?: string;
  createdBy?: string;
}

// Demo data
const demoExpenses: Expense[] = [
  {
    key: "1",
    id: "EXP001",
    date: "2025-11-01",
    category: "Rent",
    account: "Bank Account",
    amount: 5000,
    paymentMethod: "Bank Transfer",
    reference: "RENT-NOV-2025",
    description: "Monthly office rent payment",
    status: "completed",
    vendor: "Property Management Co.",
    createdBy: "John Doe",
  },
  {
    key: "2",
    id: "EXP002",
    date: "2025-11-02",
    category: "Utilities",
    account: "Cash Account",
    amount: 850,
    paymentMethod: "Cash",
    reference: "ELEC-NOV",
    description: "Electricity bill for October",
    status: "completed",
    vendor: "Power Company",
    createdBy: "Jane Smith",
  },
  {
    key: "3",
    id: "EXP003",
    date: "2025-11-03",
    category: "Salaries",
    account: "Bank Account",
    amount: 25000,
    paymentMethod: "Bank Transfer",
    reference: "SAL-NOV-2025",
    description: "Monthly staff salaries",
    status: "completed",
    createdBy: "John Doe",
  },
  {
    key: "4",
    id: "EXP004",
    date: "2025-11-05",
    category: "Office Supplies",
    account: "Credit Card",
    amount: 450,
    paymentMethod: "Credit Card",
    reference: "SUP-234",
    description: "Stationery and office supplies",
    status: "completed",
    vendor: "Office Depot",
    createdBy: "Sarah Johnson",
  },
  {
    key: "5",
    id: "EXP005",
    date: "2025-11-07",
    category: "Marketing",
    account: "Bank Account",
    amount: 3200,
    paymentMethod: "Bank Transfer",
    reference: "AD-2025-11",
    description: "Social media advertising campaign",
    status: "pending",
    vendor: "Marketing Agency Inc.",
    createdBy: "Jane Smith",
  },
  {
    key: "6",
    id: "EXP006",
    date: "2025-11-08",
    category: "Travel",
    account: "Cash Account",
    amount: 1200,
    paymentMethod: "Cash",
    reference: "TRV-045",
    description: "Business trip to client location",
    status: "completed",
    createdBy: "Michael Brown",
  },
  {
    key: "7",
    id: "EXP007",
    date: "2025-11-09",
    category: "Maintenance",
    account: "Bank Account",
    amount: 750,
    paymentMethod: "Cheque",
    reference: "MAINT-234",
    description: "Equipment maintenance and repairs",
    status: "completed",
    vendor: "Tech Services Ltd.",
    createdBy: "John Doe",
  },
];

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>(demoExpenses);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: Expense) => {
    setSelectedExpense(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Expense) => {
    setSelectedExpense(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Expense) => {
    setExpenses(expenses.filter((item) => item.key !== record.key));
    message.success(`Expense record ${record.id} deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      setExpenses(
        expenses.map((item) =>
          item.key === selectedExpense?.key
            ? {
                ...item,
                ...values,
                date: values.date.format("YYYY-MM-DD"),
              }
            : item
        )
      );
      message.success("Expense record updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newExpense: Expense = {
        key: (expenses.length + 1).toString(),
        id: `EXP${String(expenses.length + 1).padStart(3, "0")}`,
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        status: "completed",
        createdBy: "Current User",
      };
      setExpenses([...expenses, newExpense]);
      message.success("Expense record added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  // Get status tag
  const getStatusTag = (status: string) => {
    switch (status) {
      case "completed":
        return <Tag color="success">Completed</Tag>;
      case "pending":
        return <Tag color="processing">Pending</Tag>;
      case "cancelled":
        return <Tag color="default">Cancelled</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Column definitions
  const columns: DynamicTableColumn<Expense>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 140,
      filters: [
        { text: "Rent", value: "Rent" },
        { text: "Utilities", value: "Utilities" },
        { text: "Salaries", value: "Salaries" },
        { text: "Office Supplies", value: "Office Supplies" },
        { text: "Marketing", value: "Marketing" },
        { text: "Travel", value: "Travel" },
        { text: "Maintenance", value: "Maintenance" },
        { text: "Other", value: "Other" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      width: 140,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 130,
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number) => (
        <Text strong style={{ color: "#ff4d4f" }}>
          ${amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 140,
      filters: [
        { text: "Cash", value: "Cash" },
        { text: "Bank Transfer", value: "Bank Transfer" },
        { text: "Credit Card", value: "Credit Card" },
        { text: "Cheque", value: "Cheque" },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: "Completed", value: "completed" },
        { text: "Pending", value: "pending" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      fixed: "right",
      render: (_: any, record: Expense) => (
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
            title="Delete Expense Record"
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
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const completedExpense = expenses
    .filter((exp) => exp.status === "completed")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpense = expenses
    .filter((exp) => exp.status === "pending")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const totalRecords = expenses.length;

  // Form definition
  const expenseForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="Rent">Rent</Option>
              <Option value="Utilities">Utilities</Option>
              <Option value="Salaries">Salaries</Option>
              <Option value="Office Supplies">Office Supplies</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Travel">Travel</Option>
              <Option value="Maintenance">Maintenance</Option>
              <Option value="Insurance">Insurance</Option>
              <Option value="Taxes">Taxes</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="account"
            label="Account"
            rules={[{ required: true, message: "Please select account" }]}
          >
            <Select placeholder="Select account">
              <Option value="Cash Account">Cash Account</Option>
              <Option value="Bank Account">Bank Account</Option>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Petty Cash">Petty Cash</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              style={{ width: "100%" }}
              placeholder="0.00"
              prefix="$"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[
              { required: true, message: "Please select payment method" },
            ]}
          >
            <Select placeholder="Select payment method">
              <Option value="Cash">Cash</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Cheque">Cheque</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="vendor" label="Vendor">
            <Input placeholder="e.g., ABC Suppliers" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="reference" label="Reference">
            <Input placeholder="e.g., INV-001, Bill-234" />
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
            <TextArea
              rows={3}
              placeholder="Describe this expense transaction"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="status" label="Status" initialValue="completed">
            <Select>
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      {/* Page Title */}
      <Title level={2}>
        <FallOutlined /> Expense
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Expense"
              value={totalExpense}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed"
              value={completedExpense}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={pendingExpense}
              prefix="$"
              valueStyle={{ color: "#faad14" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Records"
              value={totalRecords}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Expense Records"
        columns={columns}
        data={expenses}
        showAdd
        addButtonText="Add Expense"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Expense Details - ${selectedExpense?.id}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedExpense!);
            }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedExpense && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Expense ID" span={1}>
              {selectedExpense.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              {getStatusTag(selectedExpense.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Date" span={1}>
              {selectedExpense.date}
            </Descriptions.Item>
            <Descriptions.Item label="Category" span={1}>
              <Tag color="orange">{selectedExpense.category}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Account" span={1}>
              {selectedExpense.account}
            </Descriptions.Item>
            <Descriptions.Item label="Amount" span={1}>
              <Text strong style={{ color: "#ff4d4f", fontSize: 16 }}>
                ${selectedExpense.amount.toLocaleString()}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method" span={1}>
              {selectedExpense.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Vendor" span={1}>
              {selectedExpense.vendor || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Reference" span={2}>
              {selectedExpense.reference || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedExpense.description}
            </Descriptions.Item>
            <Descriptions.Item label="Created By" span={2}>
              {selectedExpense.createdBy}
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
        title="Edit Expense Record"
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
        {expenseForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add Expense Record"
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
            Add Expense
          </Button>,
        ]}
      >
        {expenseForm}
      </DynamicModal>
    </div>
  );
}
