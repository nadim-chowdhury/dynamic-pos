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
  Alert,
} from "antd";
import {
  SwapOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Transfer {
  key: string;
  id: string;
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferType: string;
  reference?: string;
  description: string;
  status: "completed" | "pending" | "cancelled";
  fee?: number;
  createdBy?: string;
}

// Demo data
const demoTransfers: Transfer[] = [
  {
    key: "1",
    id: "TRF001",
    date: "2025-11-01",
    fromAccount: "Cash Account",
    toAccount: "Bank Account",
    amount: 10000,
    transferType: "Internal Transfer",
    reference: "DEP-001",
    description: "Cash deposit to bank",
    status: "completed",
    fee: 0,
    createdBy: "John Doe",
  },
  {
    key: "2",
    id: "TRF002",
    date: "2025-11-03",
    fromAccount: "Bank Account",
    toAccount: "Investment Account",
    amount: 5000,
    transferType: "Investment",
    reference: "INV-2025-11",
    description: "Transfer to investment portfolio",
    status: "completed",
    fee: 25,
    createdBy: "Jane Smith",
  },
  {
    key: "3",
    id: "TRF003",
    date: "2025-11-05",
    fromAccount: "Bank Account",
    toAccount: "Savings Account",
    amount: 3000,
    transferType: "Savings",
    reference: "SAV-NOV-2025",
    description: "Monthly savings transfer",
    status: "completed",
    fee: 0,
    createdBy: "John Doe",
  },
  {
    key: "4",
    id: "TRF004",
    date: "2025-11-07",
    fromAccount: "Cash Account",
    toAccount: "Petty Cash",
    amount: 500,
    transferType: "Internal Transfer",
    reference: "PC-001",
    description: "Petty cash replenishment",
    status: "completed",
    fee: 0,
    createdBy: "Sarah Johnson",
  },
  {
    key: "5",
    id: "TRF005",
    date: "2025-11-08",
    fromAccount: "Bank Account",
    toAccount: "Business Account",
    amount: 15000,
    transferType: "Business Transfer",
    reference: "BUS-234",
    description: "Transfer to business operations account",
    status: "pending",
    fee: 50,
    createdBy: "John Doe",
  },
  {
    key: "6",
    id: "TRF006",
    date: "2025-11-09",
    fromAccount: "Investment Account",
    toAccount: "Bank Account",
    amount: 2000,
    transferType: "Investment Withdrawal",
    reference: "WD-INV-045",
    description: "Partial investment withdrawal",
    status: "completed",
    fee: 20,
    createdBy: "Jane Smith",
  },
];

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>(demoTransfers);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: Transfer) => {
    setSelectedTransfer(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Transfer) => {
    setSelectedTransfer(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Transfer) => {
    setTransfers(transfers.filter((item) => item.key !== record.key));
    message.success(`Transfer record ${record.id} deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      if (values.fromAccount === values.toAccount) {
        message.error("Source and destination accounts cannot be the same");
        return;
      }

      setTransfers(
        transfers.map((item) =>
          item.key === selectedTransfer?.key
            ? {
                ...item,
                ...values,
                date: values.date.format("YYYY-MM-DD"),
              }
            : item
        )
      );
      message.success("Transfer record updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      if (values.fromAccount === values.toAccount) {
        message.error("Source and destination accounts cannot be the same");
        return;
      }

      const newTransfer: Transfer = {
        key: (transfers.length + 1).toString(),
        id: `TRF${String(transfers.length + 1).padStart(3, "0")}`,
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        status: "completed",
        fee: values.fee || 0,
        createdBy: "Current User",
      };
      setTransfers([...transfers, newTransfer]);
      message.success("Transfer record added successfully");
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
  const columns: DynamicTableColumn<Transfer>[] = [
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
      title: "From Account",
      dataIndex: "fromAccount",
      key: "fromAccount",
      width: 150,
    },
    {
      title: "",
      key: "arrow",
      width: 50,
      align: "center",
      render: () => <ArrowRightOutlined style={{ color: "#1890ff" }} />,
    },
    {
      title: "To Account",
      dataIndex: "toAccount",
      key: "toAccount",
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
        <Text strong style={{ color: "#1890ff" }}>
          ${amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      width: 100,
      align: "right",
      render: (fee: number) => (
        <Text type="secondary">${fee?.toLocaleString() || "0"}</Text>
      ),
    },
    {
      title: "Transfer Type",
      dataIndex: "transferType",
      key: "transferType",
      width: 160,
      filters: [
        { text: "Internal Transfer", value: "Internal Transfer" },
        { text: "Investment", value: "Investment" },
        { text: "Investment Withdrawal", value: "Investment Withdrawal" },
        { text: "Savings", value: "Savings" },
        { text: "Business Transfer", value: "Business Transfer" },
      ],
      onFilter: (value, record) => record.transferType === value,
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
      render: (_: any, record: Transfer) => (
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
            title="Delete Transfer Record"
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
  const totalTransferred = transfers.reduce((sum, trf) => sum + trf.amount, 0);
  const totalFees = transfers.reduce((sum, trf) => sum + (trf.fee || 0), 0);
  const completedTransfers = transfers.filter(
    (trf) => trf.status === "completed"
  ).length;
  const totalRecords = transfers.length;

  // Form definition
  const transferForm = (
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
            name="transferType"
            label="Transfer Type"
            rules={[{ required: true, message: "Please select transfer type" }]}
          >
            <Select placeholder="Select transfer type">
              <Option value="Internal Transfer">Internal Transfer</Option>
              <Option value="Investment">Investment</Option>
              <Option value="Investment Withdrawal">
                Investment Withdrawal
              </Option>
              <Option value="Savings">Savings</Option>
              <Option value="Business Transfer">Business Transfer</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Alert
        message="Transfer Direction"
        description="Select the source account (from) and destination account (to) for this transfer."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="fromAccount"
            label="From Account (Source)"
            rules={[
              { required: true, message: "Please select source account" },
            ]}
          >
            <Select placeholder="Select source account">
              <Option value="Cash Account">Cash Account</Option>
              <Option value="Bank Account">Bank Account</Option>
              <Option value="Investment Account">Investment Account</Option>
              <Option value="Savings Account">Savings Account</Option>
              <Option value="Business Account">Business Account</Option>
              <Option value="Petty Cash">Petty Cash</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="toAccount"
            label="To Account (Destination)"
            rules={[
              { required: true, message: "Please select destination account" },
            ]}
          >
            <Select placeholder="Select destination account">
              <Option value="Cash Account">Cash Account</Option>
              <Option value="Bank Account">Bank Account</Option>
              <Option value="Investment Account">Investment Account</Option>
              <Option value="Savings Account">Savings Account</Option>
              <Option value="Business Account">Business Account</Option>
              <Option value="Petty Cash">Petty Cash</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="Transfer Amount"
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
        <Col span={12}>
          <Form.Item name="fee" label="Transfer Fee" initialValue={0}>
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
        <Col span={24}>
          <Form.Item name="reference" label="Reference">
            <Input placeholder="e.g., TXN-001" />
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
            <TextArea rows={3} placeholder="Describe this transfer" />
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
        <SwapOutlined /> Transfers
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Transferred"
              value={totalTransferred}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Fees"
              value={totalFees}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Transfers"
              value={completedTransfers}
              suffix={`/ ${totalRecords}`}
              valueStyle={{ color: "#52c41a" }}
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
        title="Transfer Records"
        columns={columns}
        data={transfers}
        showAdd
        addButtonText="Add Transfer"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Transfer Details - ${selectedTransfer?.id}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedTransfer!);
            }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedTransfer && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Transfer ID" span={1}>
              {selectedTransfer.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              {getStatusTag(selectedTransfer.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Date" span={2}>
              {selectedTransfer.date}
            </Descriptions.Item>
            <Descriptions.Item label="Transfer Type" span={2}>
              <Tag color="blue">{selectedTransfer.transferType}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="From Account" span={1}>
              <Text strong>{selectedTransfer.fromAccount}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="To Account" span={1}>
              <Text strong>{selectedTransfer.toAccount}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Amount" span={1}>
              <Text strong style={{ color: "#1890ff", fontSize: 16 }}>
                ${selectedTransfer.amount.toLocaleString()}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Transfer Fee" span={1}>
              <Text type="secondary">
                ${selectedTransfer.fee?.toLocaleString() || "0"}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Reference" span={2}>
              {selectedTransfer.reference || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedTransfer.description}
            </Descriptions.Item>
            <Descriptions.Item label="Created By" span={2}>
              {selectedTransfer.createdBy}
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
        title="Edit Transfer Record"
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
        {transferForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add Transfer Record"
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
            Add Transfer
          </Button>,
        ]}
      >
        {transferForm}
      </DynamicModal>
    </div>
  );
}
