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
  Upload,
} from "antd";
import {
  DollarOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Income {
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
  createdBy?: string;
}

// Demo data
const demoIncomes: Income[] = [
  {
    key: "1",
    id: "INC001",
    date: "2025-11-01",
    category: "Sales Revenue",
    account: "Cash Account",
    amount: 15000,
    paymentMethod: "Cash",
    reference: "SAL-001",
    description: "Product sales for November week 1",
    status: "completed",
    createdBy: "John Doe",
  },
  {
    key: "2",
    id: "INC002",
    date: "2025-11-03",
    category: "Service Revenue",
    account: "Bank Account",
    amount: 8500,
    paymentMethod: "Bank Transfer",
    reference: "SRV-045",
    description: "Consulting services provided",
    status: "completed",
    createdBy: "Jane Smith",
  },
  {
    key: "3",
    id: "INC003",
    date: "2025-11-05",
    category: "Investment Income",
    account: "Investment Account",
    amount: 3200,
    paymentMethod: "Bank Transfer",
    reference: "DIV-2025-Q4",
    description: "Quarterly dividend income",
    status: "completed",
    createdBy: "John Doe",
  },
  {
    key: "4",
    id: "INC004",
    date: "2025-11-07",
    category: "Sales Revenue",
    account: "Cash Account",
    amount: 12000,
    paymentMethod: "Credit Card",
    reference: "SAL-002",
    description: "Online store sales",
    status: "pending",
    createdBy: "Sarah Johnson",
  },
  {
    key: "5",
    id: "INC005",
    date: "2025-11-08",
    category: "Rental Income",
    account: "Bank Account",
    amount: 5000,
    paymentMethod: "Bank Transfer",
    reference: "RENT-NOV-2025",
    description: "Monthly office space rental",
    status: "completed",
    createdBy: "John Doe",
  },
  {
    key: "6",
    id: "INC006",
    date: "2025-11-10",
    category: "Other Income",
    account: "Cash Account",
    amount: 1500,
    paymentMethod: "Cash",
    description: "Miscellaneous income",
    status: "completed",
    createdBy: "Jane Smith",
  },
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>(demoIncomes);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: Income) => {
    setSelectedIncome(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Income) => {
    setSelectedIncome(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Income) => {
    setIncomes(incomes.filter((item) => item.key !== record.key));
    message.success(`Income record ${record.id} deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      setIncomes(
        incomes.map((item) =>
          item.key === selectedIncome?.key
            ? {
                ...item,
                ...values,
                date: values.date.format("YYYY-MM-DD"),
              }
            : item
        )
      );
      message.success("Income record updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newIncome: Income = {
        key: (incomes.length + 1).toString(),
        id: `INC${String(incomes.length + 1).padStart(3, "0")}`,
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        status: "completed",
        createdBy: "Current User",
      };
      setIncomes([...incomes, newIncome]);
      message.success("Income record added successfully");
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
  const columns: DynamicTableColumn<Income>[] = [
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
      width: 150,
      filters: [
        { text: "Sales Revenue", value: "Sales Revenue" },
        { text: "Service Revenue", value: "Service Revenue" },
        { text: "Investment Income", value: "Investment Income" },
        { text: "Rental Income", value: "Rental Income" },
        { text: "Other Income", value: "Other Income" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 130,
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number) => (
        <Text strong style={{ color: "#52c41a" }}>
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
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      width: 120,
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
      render: (_: any, record: Income) => (
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
            title="Delete Income Record"
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
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const completedIncome = incomes
    .filter((inc) => inc.status === "completed")
    .reduce((sum, inc) => sum + inc.amount, 0);
  const pendingIncome = incomes
    .filter((inc) => inc.status === "pending")
    .reduce((sum, inc) => sum + inc.amount, 0);
  const totalRecords = incomes.length;

  // Form definition
  const incomeForm = (
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
              <Option value="Sales Revenue">Sales Revenue</Option>
              <Option value="Service Revenue">Service Revenue</Option>
              <Option value="Investment Income">Investment Income</Option>
              <Option value="Rental Income">Rental Income</Option>
              <Option value="Other Income">Other Income</Option>
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
              <Option value="Investment Account">Investment Account</Option>
              <Option value="Savings Account">Savings Account</Option>
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
          <Form.Item name="reference" label="Reference">
            <Input placeholder="e.g., INV-001" />
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
            <TextArea rows={3} placeholder="Describe this income transaction" />
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
        <RiseOutlined /> Income
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Income"
              value={totalIncome}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed"
              value={completedIncome}
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
              value={pendingIncome}
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
        title="Income Records"
        columns={columns}
        data={incomes}
        showAdd
        addButtonText="Add Income"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Income Details - ${selectedIncome?.id}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedIncome!);
            }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedIncome && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Income ID" span={1}>
              {selectedIncome.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              {getStatusTag(selectedIncome.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Date" span={1}>
              {selectedIncome.date}
            </Descriptions.Item>
            <Descriptions.Item label="Category" span={1}>
              <Tag color="blue">{selectedIncome.category}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Account" span={1}>
              {selectedIncome.account}
            </Descriptions.Item>
            <Descriptions.Item label="Amount" span={1}>
              <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
                ${selectedIncome.amount.toLocaleString()}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method" span={1}>
              {selectedIncome.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Reference" span={1}>
              {selectedIncome.reference || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedIncome.description}
            </Descriptions.Item>
            <Descriptions.Item label="Created By" span={2}>
              {selectedIncome.createdBy}
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
        title="Edit Income Record"
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
        {incomeForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add Income Record"
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
            Add Income
          </Button>,
        ]}
      >
        {incomeForm}
      </DynamicModal>
    </div>
  );
}
