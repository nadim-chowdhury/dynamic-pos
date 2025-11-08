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
  Tree,
} from "antd";
import {
  ShopOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  FolderOutlined,
  FileOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ChartAccount {
  key: string;
  id: string;
  accountCode: string;
  accountName: string;
  accountType: "Asset" | "Liability" | "Equity" | "Revenue" | "Expense";
  parentAccount?: string;
  balance: number;
  description: string;
  status: "active" | "inactive";
  isSubAccount: boolean;
}

// Demo data
const demoAccounts: ChartAccount[] = [
  // Assets
  {
    key: "1",
    id: "ACC001",
    accountCode: "1000",
    accountName: "Cash and Cash Equivalents",
    accountType: "Asset",
    balance: 50000,
    description: "Cash on hand and in banks",
    status: "active",
    isSubAccount: false,
  },
  {
    key: "2",
    id: "ACC002",
    accountCode: "1010",
    accountName: "Cash Account",
    accountType: "Asset",
    parentAccount: "Cash and Cash Equivalents",
    balance: 20000,
    description: "Physical cash on hand",
    status: "active",
    isSubAccount: true,
  },
  {
    key: "3",
    id: "ACC003",
    accountCode: "1020",
    accountName: "Bank Account",
    accountType: "Asset",
    parentAccount: "Cash and Cash Equivalents",
    balance: 30000,
    description: "Main business bank account",
    status: "active",
    isSubAccount: true,
  },
  {
    key: "4",
    id: "ACC004",
    accountCode: "1200",
    accountName: "Accounts Receivable",
    accountType: "Asset",
    balance: 15000,
    description: "Money owed by customers",
    status: "active",
    isSubAccount: false,
  },
  // Liabilities
  {
    key: "5",
    id: "ACC005",
    accountCode: "2000",
    accountName: "Accounts Payable",
    accountType: "Liability",
    balance: 8000,
    description: "Money owed to suppliers",
    status: "active",
    isSubAccount: false,
  },
  {
    key: "6",
    id: "ACC006",
    accountCode: "2100",
    accountName: "Loans Payable",
    accountType: "Liability",
    balance: 25000,
    description: "Bank loans and credit",
    status: "active",
    isSubAccount: false,
  },
  // Equity
  {
    key: "7",
    id: "ACC007",
    accountCode: "3000",
    accountName: "Owner's Equity",
    accountType: "Equity",
    balance: 100000,
    description: "Owner's capital investment",
    status: "active",
    isSubAccount: false,
  },
  // Revenue
  {
    key: "8",
    id: "ACC008",
    accountCode: "4000",
    accountName: "Sales Revenue",
    accountType: "Revenue",
    balance: 150000,
    description: "Income from product sales",
    status: "active",
    isSubAccount: false,
  },
  {
    key: "9",
    id: "ACC009",
    accountCode: "4100",
    accountName: "Service Revenue",
    accountType: "Revenue",
    balance: 45000,
    description: "Income from services",
    status: "active",
    isSubAccount: false,
  },
  // Expenses
  {
    key: "10",
    id: "ACC010",
    accountCode: "5000",
    accountName: "Operating Expenses",
    accountType: "Expense",
    balance: 60000,
    description: "Day-to-day business expenses",
    status: "active",
    isSubAccount: false,
  },
  {
    key: "11",
    id: "ACC011",
    accountCode: "5010",
    accountName: "Salaries Expense",
    accountType: "Expense",
    parentAccount: "Operating Expenses",
    balance: 40000,
    description: "Employee salaries and wages",
    status: "active",
    isSubAccount: true,
  },
  {
    key: "12",
    id: "ACC012",
    accountCode: "5020",
    accountName: "Rent Expense",
    accountType: "Expense",
    parentAccount: "Operating Expenses",
    balance: 20000,
    description: "Office rent payments",
    status: "active",
    isSubAccount: true,
  },
];

export default function ChartOfAccountsPage() {
  const [accounts, setAccounts] = useState<ChartAccount[]>(demoAccounts);
  const [selectedAccount, setSelectedAccount] = useState<ChartAccount | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: ChartAccount) => {
    setSelectedAccount(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: ChartAccount) => {
    setSelectedAccount(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: ChartAccount) => {
    setAccounts(accounts.filter((item) => item.key !== record.key));
    message.success(`Account "${record.accountName}" deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      setAccounts(
        accounts.map((item) =>
          item.key === selectedAccount?.key ? { ...item, ...values } : item
        )
      );
      message.success("Account updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newAccount: ChartAccount = {
        key: (accounts.length + 1).toString(),
        id: `ACC${String(accounts.length + 1).padStart(3, "0")}`,
        ...values,
        isSubAccount: !!values.parentAccount,
      };
      setAccounts([...accounts, newAccount]);
      message.success("Account added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  // Get account type color
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "Asset":
        return "green";
      case "Liability":
        return "red";
      case "Equity":
        return "blue";
      case "Revenue":
        return "cyan";
      case "Expense":
        return "orange";
      default:
        return "default";
    }
  };

  // Column definitions
  const columns: DynamicTableColumn<ChartAccount>[] = [
    {
      title: "Account Code",
      dataIndex: "accountCode",
      key: "accountCode",
      width: 130,
      sorter: (a, b) => a.accountCode.localeCompare(b.accountCode),
      render: (code: string, record: ChartAccount) => (
        <Space>
          {record.isSubAccount ? <FileOutlined /> : <FolderOutlined />}
          <Text strong>{code}</Text>
        </Space>
      ),
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
      width: 200,
      sorter: (a, b) => a.accountName.localeCompare(b.accountName),
      render: (name: string, record: ChartAccount) => (
        <div style={{ paddingLeft: record.isSubAccount ? 20 : 0 }}>{name}</div>
      ),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      width: 130,
      render: (type: string) => (
        <Tag color={getAccountTypeColor(type)}>{type}</Tag>
      ),
      filters: [
        { text: "Asset", value: "Asset" },
        { text: "Liability", value: "Liability" },
        { text: "Equity", value: "Equity" },
        { text: "Revenue", value: "Revenue" },
        { text: "Expense", value: "Expense" },
      ],
      onFilter: (value, record) => record.accountType === value,
    },
    {
      title: "Parent Account",
      dataIndex: "parentAccount",
      key: "parentAccount",
      width: 150,
      render: (parent?: string) => parent || "-",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      width: 130,
      align: "right",
      sorter: (a, b) => a.balance - b.balance,
      render: (balance: number, record: ChartAccount) => (
        <Text
          strong
          style={{
            color:
              record.accountType === "Asset" || record.accountType === "Revenue"
                ? "#52c41a"
                : record.accountType === "Liability" ||
                  record.accountType === "Expense"
                ? "#ff4d4f"
                : "#1890ff",
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
      width: 100,
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
      width: 180,
      fixed: "right",
      render: (_: any, record: ChartAccount) => (
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
            title="Delete Account"
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
  const totalAssets = accounts
    .filter((acc) => acc.accountType === "Asset" && acc.status === "active")
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = accounts
    .filter((acc) => acc.accountType === "Liability" && acc.status === "active")
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalEquity = accounts
    .filter((acc) => acc.accountType === "Equity" && acc.status === "active")
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalAccounts = accounts.length;

  // Form definition
  const accountForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="accountCode"
            label="Account Code"
            rules={[{ required: true, message: "Please enter account code" }]}
          >
            <Input placeholder="e.g., 1000" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="accountType"
            label="Account Type"
            rules={[{ required: true, message: "Please select account type" }]}
          >
            <Select placeholder="Select account type">
              <Option value="Asset">Asset</Option>
              <Option value="Liability">Liability</Option>
              <Option value="Equity">Equity</Option>
              <Option value="Revenue">Revenue</Option>
              <Option value="Expense">Expense</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="accountName"
            label="Account Name"
            rules={[{ required: true, message: "Please enter account name" }]}
          >
            <Input placeholder="e.g., Cash Account" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="parentAccount" label="Parent Account">
            <Select placeholder="Select parent account (optional)" allowClear>
              {accounts
                .filter((acc) => !acc.isSubAccount)
                .map((acc) => (
                  <Option key={acc.key} value={acc.accountName}>
                    {acc.accountName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="balance"
            label="Opening Balance"
            rules={[{ required: true, message: "Please enter balance" }]}
            initialValue={0}
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
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={3} placeholder="Describe this account" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="status" label="Status" initialValue="active">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
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
        <ShopOutlined /> Chart of Accounts
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Assets"
              value={totalAssets}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Liabilities"
              value={totalLiabilities}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Equity"
              value={totalEquity}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Accounts"
              value={totalAccounts}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Accounts List"
        columns={columns}
        data={accounts}
        showAdd
        addButtonText="Add Account"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1300 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Account Details - ${selectedAccount?.accountName}`}
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
            <Descriptions.Item label="Account Code" span={1}>
              <Text strong>{selectedAccount.accountCode}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Account Name" span={2}>
              <Text strong>{selectedAccount.accountName}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Account Type" span={1}>
              <Tag color={getAccountTypeColor(selectedAccount.accountType)}>
                {selectedAccount.accountType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              <Tag
                color={
                  selectedAccount.status === "active" ? "success" : "default"
                }
              >
                {selectedAccount.status.charAt(0).toUpperCase() +
                  selectedAccount.status.slice(1)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Parent Account" span={2}>
              {selectedAccount.parentAccount || "None (Main Account)"}
            </Descriptions.Item>
            <Descriptions.Item label="Balance" span={2}>
              <Text
                strong
                style={{
                  fontSize: 16,
                  color:
                    selectedAccount.accountType === "Asset" ||
                    selectedAccount.accountType === "Revenue"
                      ? "#52c41a"
                      : selectedAccount.accountType === "Liability" ||
                        selectedAccount.accountType === "Expense"
                      ? "#ff4d4f"
                      : "#1890ff",
                }}
              >
                ${selectedAccount.balance.toLocaleString()}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedAccount.description}
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
        title="Edit Account"
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
        {accountForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add New Account"
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
            Add Account
          </Button>,
        ]}
      >
        {accountForm}
      </DynamicModal>
    </div>
  );
}
