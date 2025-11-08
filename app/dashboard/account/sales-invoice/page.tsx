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
} from "@ant-design/icons";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface SalesInvoice {
  key: string;
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: "draft" | "sent" | "paid" | "partial" | "overdue";
  notes?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Demo data
const demoSalesInvoices: SalesInvoice[] = [
  {
    key: "1",
    id: "SI001",
    invoiceNumber: "INV-2025-001",
    date: "2025-11-01",
    dueDate: "2025-11-15",
    customerName: "ABC Corporation",
    customerEmail: "contact@abccorp.com",
    customerPhone: "+1-555-0101",
    items: [
      { description: "Product A", quantity: 10, unitPrice: 50, amount: 500 },
      { description: "Product B", quantity: 5, unitPrice: 100, amount: 500 },
    ],
    subtotal: 1000,
    tax: 100,
    discount: 0,
    total: 1100,
    amountPaid: 1100,
    balance: 0,
    status: "paid",
    notes: "Thank you for your business!",
  },
  {
    key: "2",
    id: "SI002",
    invoiceNumber: "INV-2025-002",
    date: "2025-11-03",
    dueDate: "2025-11-17",
    customerName: "XYZ Enterprises",
    customerEmail: "billing@xyzent.com",
    customerPhone: "+1-555-0102",
    items: [
      {
        description: "Service Package A",
        quantity: 1,
        unitPrice: 2500,
        amount: 2500,
      },
      {
        description: "Additional Support",
        quantity: 3,
        unitPrice: 150,
        amount: 450,
      },
    ],
    subtotal: 2950,
    tax: 295,
    discount: 145,
    total: 3100,
    amountPaid: 0,
    balance: 3100,
    status: "sent",
    notes: "Net 14 payment terms",
  },
  {
    key: "3",
    id: "SI003",
    invoiceNumber: "INV-2025-003",
    date: "2025-11-05",
    dueDate: "2025-11-19",
    customerName: "Tech Solutions Inc",
    customerEmail: "accounts@techsol.com",
    customerPhone: "+1-555-0103",
    items: [
      {
        description: "Consulting Services",
        quantity: 20,
        unitPrice: 100,
        amount: 2000,
      },
    ],
    subtotal: 2000,
    tax: 200,
    discount: 100,
    total: 2100,
    amountPaid: 1000,
    balance: 1100,
    status: "partial",
    notes: "Partial payment received",
  },
  {
    key: "4",
    id: "SI004",
    invoiceNumber: "INV-2025-004",
    date: "2025-10-20",
    dueDate: "2025-11-03",
    customerName: "Global Trade Co",
    customerEmail: "finance@globaltrade.com",
    customerPhone: "+1-555-0104",
    items: [
      { description: "Product C", quantity: 50, unitPrice: 25, amount: 1250 },
      { description: "Shipping", quantity: 1, unitPrice: 150, amount: 150 },
    ],
    subtotal: 1400,
    tax: 140,
    discount: 0,
    total: 1540,
    amountPaid: 0,
    balance: 1540,
    status: "overdue",
    notes: "Payment overdue - please remit ASAP",
  },
  {
    key: "5",
    id: "SI005",
    invoiceNumber: "INV-2025-005",
    date: "2025-11-07",
    dueDate: "2025-11-21",
    customerName: "Retail Partners LLC",
    customerEmail: "orders@retailpartners.com",
    customerPhone: "+1-555-0105",
    items: [
      {
        description: "Product Mix Bundle",
        quantity: 15,
        unitPrice: 75,
        amount: 1125,
      },
    ],
    subtotal: 1125,
    tax: 112.5,
    discount: 0,
    total: 1237.5,
    amountPaid: 0,
    balance: 1237.5,
    status: "draft",
    notes: "Draft - pending approval",
  },
];

export default function SalesInvoicePage() {
  const [invoices, setInvoices] = useState<SalesInvoice[]>(demoSalesInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<SalesInvoice | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Handler functions
  const handleView = (record: SalesInvoice) => {
    setSelectedInvoice(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: SalesInvoice) => {
    setSelectedInvoice(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
      dueDate: dayjs(record.dueDate),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: SalesInvoice) => {
    setInvoices(invoices.filter((item) => item.key !== record.key));
    message.success(`Invoice ${record.invoiceNumber} deleted successfully`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handlePrint = (record: SalesInvoice) => {
    message.info(`Printing invoice ${record.invoiceNumber}...`);
  };

  const handleDownload = (record: SalesInvoice) => {
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

      const newInvoice: SalesInvoice = {
        key: (invoices.length + 1).toString(),
        id: `SI${String(invoices.length + 1).padStart(3, "0")}`,
        invoiceNumber: `INV-2025-${String(invoices.length + 1).padStart(
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
      case "sent":
        return <Tag color="processing">Sent</Tag>;
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
  const columns: DynamicTableColumn<SalesInvoice>[] = [
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 140,
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
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      width: 180,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
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
        { text: "Sent", value: "sent" },
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
      render: (_: any, record: SalesInvoice) => (
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
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
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
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="e.g., ABC Corporation" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="customerEmail"
            label="Customer Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="e.g., contact@company.com" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="customerPhone"
            label="Customer Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="e.g., +1-555-0101" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="status" label="Status" initialValue="draft">
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="sent">Sent</Option>
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
        <FileTextOutlined /> Sales Invoice
      </Title>

      {/* Summary Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
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
              valueStyle={{ color: "#ff4d4f" }}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Overdue Invoices"
              value={overdueCount}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <DynamicTable
        title="Sales Invoices"
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
        title={`Invoice ${selectedInvoice?.invoiceNumber}`}
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
              <Descriptions.Item label="Customer Name" span={2}>
                <Text strong>{selectedInvoice.customerName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={1}>
                {selectedInvoice.customerEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Phone" span={1}>
                {selectedInvoice.customerPhone}
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
        title="Edit Invoice"
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
        title="Create New Invoice"
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
