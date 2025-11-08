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
  Table,
} from "antd";
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  PrinterOutlined,
  DownloadOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface PurchaseInvoice {
  key: string;
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: "draft" | "received" | "paid" | "partial" | "overdue";
  notes?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Demo data
const demoPurchaseInvoices: PurchaseInvoice[] = [
  {
    key: "1",
    id: "PI001",
    invoiceNumber: "PINV-2025-001",
    date: "2025-11-01",
    dueDate: "2025-11-15",
    vendorName: "Office Supplies Inc",
    vendorEmail: "billing@officesupplies.com",
    vendorPhone: "+1-555-0201",
    items: [
      {
        description: "Office Chairs",
        quantity: 10,
        unitPrice: 150,
        amount: 1500,
      },
      { description: "Desks", quantity: 5, unitPrice: 300, amount: 1500 },
    ],
    subtotal: 3000,
    tax: 300,
    discount: 0,
    total: 3300,
    amountPaid: 3300,
    balance: 0,
    status: "paid",
    notes: "Payment completed",
  },
  {
    key: "2",
    id: "PI002",
    invoiceNumber: "PINV-2025-002",
    date: "2025-11-03",
    dueDate: "2025-11-17",
    vendorName: "Tech Hardware Corp",
    vendorEmail: "accounts@techhardware.com",
    vendorPhone: "+1-555-0202",
    items: [
      { description: "Laptops", quantity: 5, unitPrice: 1200, amount: 6000 },
      { description: "Monitors", quantity: 10, unitPrice: 250, amount: 2500 },
    ],
    subtotal: 8500,
    tax: 850,
    discount: 425,
    total: 8925,
    amountPaid: 0,
    balance: 8925,
    status: "received",
    notes: "Net 14 payment terms",
  },
  {
    key: "3",
    id: "PI003",
    invoiceNumber: "PINV-2025-003",
    date: "2025-11-05",
    dueDate: "2025-11-19",
    vendorName: "Marketing Services LLC",
    vendorEmail: "finance@marketingsvcs.com",
    vendorPhone: "+1-555-0203",
    items: [
      {
        description: "Social Media Advertising",
        quantity: 1,
        unitPrice: 2500,
        amount: 2500,
      },
    ],
    subtotal: 2500,
    tax: 250,
    discount: 125,
    total: 2625,
    amountPaid: 1500,
    balance: 1125,
    status: "partial",
    notes: "Partial payment made",
  },
  {
    key: "4",
    id: "PI004",
    invoiceNumber: "PINV-2025-004",
    date: "2025-10-20",
    dueDate: "2025-11-03",
    vendorName: "Utility Services Co",
    vendorEmail: "billing@utilityco.com",
    vendorPhone: "+1-555-0204",
    items: [
      {
        description: "Electricity - October",
        quantity: 1,
        unitPrice: 850,
        amount: 850,
      },
      {
        description: "Water - October",
        quantity: 1,
        unitPrice: 120,
        amount: 120,
      },
    ],
    subtotal: 970,
    tax: 97,
    discount: 0,
    total: 1067,
    amountPaid: 0,
    balance: 1067,
    status: "overdue",
    notes: "Payment overdue",
  },
  {
    key: "5",
    id: "PI005",
    invoiceNumber: "PINV-2025-005",
    date: "2025-11-07",
    dueDate: "2025-11-21",
    vendorName: "Raw Materials Supplier",
    vendorEmail: "sales@rawmaterials.com",
    vendorPhone: "+1-555-0205",
    items: [
      {
        description: "Component A",
        quantity: 100,
        unitPrice: 25,
        amount: 2500,
      },
      { description: "Component B", quantity: 50, unitPrice: 40, amount: 2000 },
    ],
    subtotal: 4500,
    tax: 450,
    discount: 0,
    total: 4950,
    amountPaid: 0,
    balance: 4950,
    status: "draft",
    notes: "Draft - pending approval",
  },
];

export default function PurchaseInvoicePage() {
  const [invoices, setInvoices] =
    useState<PurchaseInvoice[]>(demoPurchaseInvoices);
  const [selectedInvoice, setSelectedInvoice] =
    useState<PurchaseInvoice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: PurchaseInvoice) => {
    setSelectedInvoice(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: PurchaseInvoice) => {
    setSelectedInvoice(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
      dueDate: dayjs(record.dueDate),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: PurchaseInvoice) => {
    setInvoices(invoices.filter((item) => item.key !== record.key));
    message.success(`Invoice ${record.invoiceNumber} deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handlePrint = (record: PurchaseInvoice) => {
    message.info(`Printing invoice ${record.invoiceNumber}...`);
  };

  const handleDownload = (record: PurchaseInvoice) => {
    message.info(`Downloading invoice ${record.invoiceNumber}...`);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      // Calculate totals
      const subtotal = values.subtotal || 0;
      const tax = values.tax || 0;
      const discount = values.discount || 0;
      const total = subtotal + tax - discount;
      const amountPaid = values.amountPaid || 0;
      const balance = total - amountPaid;

      setInvoices(
        invoices.map((item) =>
          item.key === selectedInvoice?.key
            ? {
                ...item,
                ...values,
                date: values.date.format("YYYY-MM-DD"),
                dueDate: values.dueDate.format("YYYY-MM-DD"),
                total,
                balance,
              }
            : item
        )
      );
      message.success("Invoice updated successfully");
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      // Calculate totals
      const subtotal = values.subtotal || 0;
      const tax = values.tax || 0;
      const discount = values.discount || 0;
      const total = subtotal + tax - discount;
      const amountPaid = values.amountPaid || 0;
      const balance = total - amountPaid;

      const newInvoice: PurchaseInvoice = {
        key: (invoices.length + 1).toString(),
        id: `PI${String(invoices.length + 1).padStart(3, "0")}`,
        invoiceNumber: `PINV-2025-${String(invoices.length + 1).padStart(
          3,
          "0"
        )}`,
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        items: [],
        total,
        balance,
      };
      setInvoices([...invoices, newInvoice]);
      message.success("Invoice created successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  // Get status tag and color
  const getStatusTag = (status: string) => {
    switch (status) {
      case "paid":
        return <Tag color="success">Paid</Tag>;
      case "received":
        return <Tag color="processing">Received</Tag>;
      case "partial":
        return <Tag color="warning">Partial</Tag>;
      case "overdue":
        return <Tag color="error">Overdue</Tag>;
      case "draft":
        return <Tag color="default">Draft</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Column definitions
  const columns: DynamicTableColumn<PurchaseInvoice>[] = [
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 150,
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
      render: (num: string) => <Text strong>{num}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 110,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 110,
      sorter: (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
      width: 180,
      sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 120,
      align: "right",
      sorter: (a, b) => a.total - b.total,
      render: (total: number) => <Text strong>${total.toLocaleString()}</Text>,
    },
    {
      title: "Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
      width: 120,
      align: "right",
      render: (paid: number) => (
        <Text style={{ color: "#52c41a" }}>${paid.toLocaleString()}</Text>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      width: 120,
      align: "right",
      render: (balance: number) => (
        <Text strong style={{ color: balance > 0 ? "#ff4d4f" : "#52c41a" }}>
          ${balance.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      align: "center",
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: "Draft", value: "draft" },
        { text: "Received", value: "received" },
        { text: "Paid", value: "paid" },
        { text: "Partial", value: "partial" },
        { text: "Overdue", value: "overdue" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 220,
      fixed: "right",
      render: (_: any, record: PurchaseInvoice) => (
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
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(record)}
          >
            Print
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Invoice"
            description={`Are you sure you want to delete ${record.invoiceNumber}?`}
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
  const totalExpenses = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balance, 0);
  const overdueCount = invoices.filter(
    (inv) => inv.status === "overdue"
  ).length;

  // Item columns for detail view
  const itemColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "center" as const,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 120,
      align: "right" as const,
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      align: "right" as const,
      render: (amount: number) => (
        <Text strong>${amount.toLocaleString()}</Text>
      ),
    },
  ];

  // Form definition
  const invoiceForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Invoice Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select due date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="vendorName"
            label="Vendor Name"
            rules={[{ required: true, message: "Please enter vendor name" }]}
          >
            <Input placeholder="e.g., Office Supplies Inc" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="vendorEmail"
            label="Vendor Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="e.g., billing@vendor.com" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="vendorPhone"
            label="Vendor Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="e.g., +1-555-0201" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="status" label="Status" initialValue="draft">
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="received">Received</Option>
              <Option value="paid">Paid</Option>
              <Option value="partial">Partial</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="subtotal"
            label="Subtotal"
            rules={[{ required: true, message: "Please enter subtotal" }]}
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
        <Col span={8}>
          <Form.Item name="tax" label="Tax" initialValue={0}>
            <InputNumber
              min={0}
              step={0.01}
              style={{ width: "100%" }}
              placeholder="0.00"
              prefix="$"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="discount" label="Discount" initialValue={0}>
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
          <Form.Item name="amountPaid" label="Amount Paid" initialValue={0}>
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
          <Form.Item name="notes" label="Notes">
            <TextArea rows={3} placeholder="Additional notes or terms" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      {/* Page Title */}
      <Title level={2}>
        <ShoppingOutlined /> Purchase Invoice
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={totalExpenses}
              prefix="$"
              valueStyle={{ color: "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Paid"
              value={totalPaid}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Outstanding"
              value={totalOutstanding}
              prefix="$"
              valueStyle={{ color: "#faad14" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Overdue Invoices"
              value={overdueCount}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Purchase Invoices"
        columns={columns}
        data={invoices}
        showAdd
        addButtonText="Create Invoice"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Purchase Invoice ${selectedInvoice?.invoiceNumber}`}
        width={800}
        footer={[
          <Button
            key="print"
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(selectedInvoice!)}
          >
            Print
          </Button>,
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(selectedInvoice!)}
          >
            Download
          </Button>,
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedInvoice!);
            }}
          >
            Edit
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedInvoice && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 16 }}>
              <Descriptions.Item label="Invoice Number" span={1}>
                <Text strong>{selectedInvoice.invoiceNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={1}>
                {getStatusTag(selectedInvoice.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Date" span={1}>
                {selectedInvoice.date}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date" span={1}>
                {selectedInvoice.dueDate}
              </Descriptions.Item>
              <Descriptions.Item label="Vendor Name" span={2}>
                <Text strong>{selectedInvoice.vendorName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={1}>
                {selectedInvoice.vendorEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Phone" span={1}>
                {selectedInvoice.vendorPhone}
              </Descriptions.Item>
            </Descriptions>

            {selectedInvoice.items && selectedInvoice.items.length > 0 && (
              <>
                <Title level={5} style={{ marginTop: 16 }}>
                  Items
                </Title>
                <Table
                  columns={itemColumns}
                  dataSource={selectedInvoice.items}
                  pagination={false}
                  size="small"
                  style={{ marginBottom: 16 }}
                />
              </>
            )}

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Subtotal" span={2}>
                ${selectedInvoice.subtotal.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Tax" span={1}>
                ${selectedInvoice.tax.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Discount" span={1}>
                ${selectedInvoice.discount.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Total" span={2}>
                <Text strong style={{ fontSize: 16 }}>
                  ${selectedInvoice.total.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Amount Paid" span={2}>
                <Text style={{ color: "#52c41a" }}>
                  ${selectedInvoice.amountPaid.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Balance Due" span={2}>
                <Text
                  strong
                  style={{
                    color: selectedInvoice.balance > 0 ? "#ff4d4f" : "#52c41a",
                    fontSize: 16,
                  }}
                >
                  ${selectedInvoice.balance.toLocaleString()}
                </Text>
              </Descriptions.Item>
              {selectedInvoice.notes && (
                <Descriptions.Item label="Notes" span={2}>
                  {selectedInvoice.notes}
                </Descriptions.Item>
              )}
            </Descriptions>
          </>
        )}
      </DynamicModal>

      {/* Edit Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title="Edit Purchase Invoice"
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
        {invoiceForm}
      </DynamicModal>

      {/* Add Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Create New Purchase Invoice"
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
            Create Invoice
          </Button>,
        ]}
      >
        {invoiceForm}
      </DynamicModal>
    </div>
  );
}
