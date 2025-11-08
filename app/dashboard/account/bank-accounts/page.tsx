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
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
} from "antd";
import {
  BankOutlined,
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
const { Option } = Select;

interface BankAccount {
  key: string;
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankBranch: string;
  accountType: "Checking" | "Savings" | "Credit" | "Investment";
  currency: string;
  balance: number;
  openingBalance: number;
  swiftCode?: string;
  iban?: string;
  routingNumber?: string;
  status: "active" | "inactive" | "closed";
  description?: string;
}

// Demo data
const demoBankAccounts: BankAccount[] = [
  {
    key: "1",
    id: "BANK001",
    accountName: "Primary Business Account",
    accountNumber: "1234567890",
    bankName: "First National Bank",
    bankBranch: "Downtown Branch",
    accountType: "Checking",
    currency: "USD",
    balance: 125000,
    openingBalance: 50000,
    swiftCode: "FNBAUS33",
    iban: "US12FNBA1234567890",
    routingNumber: "021000021",
    status: "active",
    description: "Main operating account for business transactions",
  },
  {
    key: "2",
    id: "BANK002",
    accountName: "Business Savings Account",
    accountNumber: "0987654321",
    bankName: "First National Bank",
    bankBranch: "Downtown Branch",
    accountType: "Savings",
    currency: "USD",
    balance: 50000,
    openingBalance: 30000,
    swiftCode: "FNBAUS33",
    iban: "US12FNBA0987654321",
    status: "active",
    description: "Emergency fund and savings",
  },
  {
    key: "3",
    id: "BANK003",
    accountName: "Business Credit Card",
    accountNumber: "4532-1234-5678-9010",
    bankName: "Commerce Bank",
    bankBranch: "Central Office",
    accountType: "Credit",
    currency: "USD",
    balance: -5000,
    openingBalance: 0,
    status: "active",
    description: "Corporate credit card for expenses",
  },
  {
    key: "4",
    id: "BANK004",
    accountName: "Investment Portfolio Account",
    accountNumber: "2468101214",
    bankName: "Investment Bank Corp",
    bankBranch: "Investment Services",
    accountType: "Investment",
    currency: "USD",
    balance: 75000,
    openingBalance: 50000,
    swiftCode: "INVBUS44",
    status: "active",
    description: "Long-term investment portfolio",
  },
  {
    key: "5",
    id: "BANK005",
    accountName: "Payroll Account",
    accountNumber: "5555666677",
    bankName: "First National Bank",
    bankBranch: "Downtown Branch",
    accountType: "Checking",
    currency: "USD",
    balance: 35000,
    openingBalance: 20000,
    routingNumber: "021000021",
    status: "active",
    description: "Dedicated account for employee payroll",
  },
  {
    key: "6",
    id: "BANK006",
    accountName: "Old Operating Account",
    accountNumber: "9999888877",
    bankName: "Legacy Bank",
    bankBranch: "Main Street",
    accountType: "Checking",
    currency: "USD",
    balance: 0,
    openingBalance: 25000,
    status: "closed",
    description: "Previously used operating account - now closed",
  },
];

export default function BankAccountsPage() {
  const [bankAccounts, setBankAccounts] =
    useState<BankAccount[]>(demoBankAccounts);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: BankAccount) => {
    setSelectedAccount(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: BankAccount) => {
    setSelectedAccount(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: BankAccount) => {
    setBankAccounts(bankAccounts.filter((item) => item.key !== record.key));
    message.success(
      `Bank account "${record.accountName}" deleted successfully`
    );
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      setBankAccounts(
        bankAccounts.map((item) =>
          item.key === selectedAccount?.key ? { ...item, ...values } : item
        )
      );
      message.success("Bank account updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newAccount: BankAccount = {
        key: (bankAccounts.length + 1).toString(),
        id: `BANK${String(bankAccounts.length + 1).padStart(3, "0")}`,
        ...values,
      };
      setBankAccounts([...bankAccounts, newAccount]);
      message.success("Bank account added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  // Get status tag and color
  const getStatusTag = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Active
          </Tag>
        );
      case "inactive":
        return (
          <Tag icon={<CloseCircleOutlined />} color="warning">
            Inactive
          </Tag>
        );
      case "closed":
        return (
          <Tag icon={<CloseCircleOutlined />} color="default">
            Closed
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "Checking":
        return "blue";
      case "Savings":
        return "green";
      case "Credit":
        return "orange";
      case "Investment":
        return "purple";
      default:
        return "default";
    }
  };

  // Column definitions
  const columns: DynamicTableColumn<BankAccount>[] = [
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
      width: 180,
      sorter: (a, b) => a.accountName.localeCompare(b.accountName),
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      width: 150,
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      width: 160,
      sorter: (a, b) => a.bankName.localeCompare(b.bankName),
    },
    {
      title: "Branch",
      dataIndex: "bankBranch",
      key: "bankBranch",
      width: 140,
    },
    {
      title: "Type",
      dataIndex: "accountType",
      key: "accountType",
      width: 120,
      render: (type: string) => (
        <Tag color={getAccountTypeColor(type)}>{type}</Tag>
      ),
      filters: [
        { text: "Checking", value: "Checking" },
        { text: "Savings", value: "Savings" },
        { text: "Credit", value: "Credit" },
        { text: "Investment", value: "Investment" },
      ],
      onFilter: (value, record) => record.accountType === value,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 100,
      align: "center",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      width: 130,
      align: "right",
      sorter: (a, b) => a.balance - b.balance,
      render: (balance: number) => (
        <Text
          strong
          style={{
            color: balance >= 0 ? "#52c41a" : "#ff4d4f",
          }}
        >
          ${balance.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
        { text: "Closed", value: "closed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      fixed: "right",
      render: (_: any, record: BankAccount) => (
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
            title="Delete Bank Account"
            description={`Are you sure you want to delete "${record.accountName}"?`}
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
  const totalBalance = bankAccounts
    .filter((acc) => acc.status === "active")
    .reduce((sum, acc) => sum + acc.balance, 0);
  const activeAccounts = bankAccounts.filter(
    (acc) => acc.status === "active"
  ).length;
  const totalAccounts = bankAccounts.length;
  const savingsBalance = bankAccounts
    .filter((acc) => acc.accountType === "Savings" && acc.status === "active")
    .reduce((sum, acc) => sum + acc.balance, 0);

  // Form definition
  const bankAccountForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="accountName"
            label="Account Name"
            rules={[{ required: true, message: "Please enter account name" }]}
          >
            <Input placeholder="e.g., Primary Business Account" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true, message: "Please enter account number" }]}
          >
            <Input placeholder="e.g., 1234567890" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true, message: "Please enter bank name" }]}
          >
            <Input placeholder="e.g., First National Bank" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="bankBranch"
            label="Bank Branch"
            rules={[{ required: true, message: "Please enter branch name" }]}
          >
            <Input placeholder="e.g., Downtown Branch" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="accountType"
            label="Account Type"
            rules={[{ required: true, message: "Please select account type" }]}
          >
            <Select placeholder="Select account type">
              <Option value="Checking">Checking</Option>
              <Option value="Savings">Savings</Option>
              <Option value="Credit">Credit</Option>
              <Option value="Investment">Investment</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: "Please select currency" }]}
            initialValue="USD"
          >
            <Select placeholder="Select currency">
              <Option value="USD">USD - US Dollar</Option>
              <Option value="EUR">EUR - Euro</Option>
              <Option value="GBP">GBP - British Pound</Option>
              <Option value="JPY">JPY - Japanese Yen</Option>
              <Option value="CAD">CAD - Canadian Dollar</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="openingBalance"
            label="Opening Balance"
            rules={[
              { required: true, message: "Please enter opening balance" },
            ]}
            initialValue={0}
          >
            <InputNumber
              step={0.01}
              style={{ width: "100%" }}
              placeholder="0.00"
              prefix="$"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="balance"
            label="Current Balance"
            rules={[
              { required: true, message: "Please enter current balance" },
            ]}
            initialValue={0}
          >
            <InputNumber
              step={0.01}
              style={{ width: "100%" }}
              placeholder="0.00"
              prefix="$"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="swiftCode" label="SWIFT Code">
            <Input placeholder="e.g., FNBAUS33" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="iban" label="IBAN">
            <Input placeholder="e.g., US12FNBA1234567890" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="routingNumber" label="Routing Number">
            <Input placeholder="e.g., 021000021" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Describe this bank account" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="status" label="Status" initialValue="active">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="closed">Closed</Option>
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
        <BankOutlined /> Bank Accounts
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Balance"
              value={totalBalance}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Savings Balance"
              value={savingsBalance}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Accounts"
              value={activeAccounts}
              suffix={`/ ${totalAccounts}`}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Accounts"
              value={totalAccounts}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Bank Accounts List"
        columns={columns}
        data={bankAccounts}
        showAdd
        addButtonText="Add Bank Account"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Bank Account Details - ${selectedAccount?.accountName}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedAccount!);
            }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedAccount && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Account ID" span={1}>
              {selectedAccount.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              {getStatusTag(selectedAccount.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Account Name" span={2}>
              <Text strong>{selectedAccount.accountName}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Account Number" span={1}>
              {selectedAccount.accountNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Account Type" span={1}>
              <Tag color={getAccountTypeColor(selectedAccount.accountType)}>
                {selectedAccount.accountType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Bank Name" span={1}>
              {selectedAccount.bankName}
            </Descriptions.Item>
            <Descriptions.Item label="Bank Branch" span={1}>
              {selectedAccount.bankBranch}
            </Descriptions.Item>
            <Descriptions.Item label="Currency" span={1}>
              {selectedAccount.currency}
            </Descriptions.Item>
            <Descriptions.Item label="Current Balance" span={1}>
              <Text
                strong
                style={{
                  fontSize: 16,
                  color: selectedAccount.balance >= 0 ? "#52c41a" : "#ff4d4f",
                }}
              >
                ${selectedAccount.balance.toLocaleString()}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Opening Balance" span={2}>
              ${selectedAccount.openingBalance.toLocaleString()}
            </Descriptions.Item>
            {selectedAccount.swiftCode && (
              <Descriptions.Item label="SWIFT Code" span={1}>
                {selectedAccount.swiftCode}
              </Descriptions.Item>
            )}
            {selectedAccount.iban && (
              <Descriptions.Item label="IBAN" span={1}>
                {selectedAccount.iban}
              </Descriptions.Item>
            )}
            {selectedAccount.routingNumber && (
              <Descriptions.Item label="Routing Number" span={2}>
                {selectedAccount.routingNumber}
              </Descriptions.Item>
            )}
            {selectedAccount.description && (
              <Descriptions.Item label="Description" span={2}>
                {selectedAccount.description}
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
        title="Edit Bank Account"
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
        {bankAccountForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add New Bank Account"
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
            Add Bank Account
          </Button>,
        ]}
      >
        {bankAccountForm}
      </DynamicModal>
    </div>
  );
}
