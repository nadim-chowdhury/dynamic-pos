"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  message,
  Descriptions,
  Divider,
  Table,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface Sale {
  key: string;
  invoice: string;
  date: string;
  customer: string;
  customerEmail: string;
  items: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "paid" | "partial" | "unpaid";
  status: "completed" | "pending" | "cancelled";
}

// Demo sales data
const demoSales: Sale[] = [
  {
    key: "1",
    invoice: "INV-2024-001",
    date: "2024-01-15 10:30 AM",
    customer: "John Smith",
    customerEmail: "john@example.com",
    items: 5,
    subtotal: 1500.0,
    discount: 150.0,
    tax: 135.0,
    total: 1485.0,
    paymentMethod: "Card",
    paymentStatus: "paid",
    status: "completed",
  },
  {
    key: "2",
    invoice: "INV-2024-002",
    date: "2024-01-15 11:45 AM",
    customer: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    items: 3,
    subtotal: 850.0,
    discount: 0,
    tax: 85.0,
    total: 935.0,
    paymentMethod: "Cash",
    paymentStatus: "paid",
    status: "completed",
  },
  {
    key: "3",
    invoice: "INV-2024-003",
    date: "2024-01-15 02:15 PM",
    customer: "Mike Brown",
    customerEmail: "mike@example.com",
    items: 2,
    subtotal: 450.0,
    discount: 45.0,
    tax: 40.5,
    total: 445.5,
    paymentMethod: "Bank Transfer",
    paymentStatus: "partial",
    status: "pending",
  },
  {
    key: "4",
    invoice: "INV-2024-004",
    date: "2024-01-15 03:30 PM",
    customer: "Emily Davis",
    customerEmail: "emily@example.com",
    items: 8,
    subtotal: 2500.0,
    discount: 250.0,
    tax: 225.0,
    total: 2475.0,
    paymentMethod: "Card",
    paymentStatus: "paid",
    status: "completed",
  },
  {
    key: "5",
    invoice: "INV-2024-005",
    date: "2024-01-15 04:45 PM",
    customer: "David Wilson",
    customerEmail: "david@example.com",
    items: 1,
    subtotal: 299.99,
    discount: 0,
    tax: 30.0,
    total: 329.99,
    paymentMethod: "Mobile Payment",
    paymentStatus: "unpaid",
    status: "cancelled",
  },
  {
    key: "6",
    invoice: "INV-2024-006",
    date: "2024-01-16 09:00 AM",
    customer: "Lisa Anderson",
    customerEmail: "lisa@example.com",
    items: 4,
    subtotal: 680.0,
    discount: 68.0,
    tax: 61.2,
    total: 673.2,
    paymentMethod: "Cash",
    paymentStatus: "paid",
    status: "completed",
  },
  {
    key: "7",
    invoice: "INV-2024-007",
    date: "2024-01-16 10:30 AM",
    customer: "Robert Taylor",
    customerEmail: "robert@example.com",
    items: 6,
    subtotal: 1200.0,
    discount: 120.0,
    tax: 108.0,
    total: 1188.0,
    paymentMethod: "Card",
    paymentStatus: "partial",
    status: "pending",
  },
];

export default function SalesListPage() {
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>(demoSales);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "unpaid":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "processing";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "pending":
        return <ClockCircleOutlined />;
      case "cancelled":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const handleView = (record: Sale) => {
    setSelectedSale(record);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Sale) => {
    message.info(`Editing sale ${record.invoice}`);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = (record: Sale) => {
    message.success(`Sale ${record.invoice} deleted successfully`);
    setSales(sales.filter((sale) => sale.key !== record.key));
  };

  const handlePrint = (record: Sale) => {
    message.info(`Printing invoice ${record.invoice}`);
    // Implement print functionality
  };

  const getActionItems = (record: Sale): MenuProps["items"] => [
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
      key: "print",
      label: "Print Invoice",
      icon: <PrinterOutlined />,
      onClick: () => handlePrint(record),
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
    },
  ];

  const columns: DynamicTableColumn<Sale>[] = [
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      width: 150,
      render: (invoice: string) => <Text strong>{invoice}</Text>,
      sorter: (a, b) => a.invoice.localeCompare(b.invoice),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 180,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (customer: string, record: Sale) => (
        <div>
          <Text strong>{customer}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.customerEmail}
          </Text>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      width: 80,
      align: "center",
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      width: 130,
      align: "right",
      render: (total: number) => <Text strong>${total.toFixed(2)}</Text>,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 150,
      filters: [
        { text: "Cash", value: "Cash" },
        { text: "Card", value: "Card" },
        { text: "Bank Transfer", value: "Bank Transfer" },
        { text: "Mobile Payment", value: "Mobile Payment" },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 140,
      render: (status: string) => (
        <Tag color={getPaymentStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Paid", value: "paid" },
        { text: "Partial", value: "partial" },
        { text: "Unpaid", value: "unpaid" },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
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
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record: Sale) => (
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

  return (
    <div>
      <DynamicTable
        title="Sales List"
        columns={columns}
        data={sales}
        showAdd
        addButtonText="New Sale"
        onAdd={() => router.push("/dashboard/sales/new-sale")}
        rowKey="key"
        scroll={{ x: 1400 }}
        summary={(pageData) => {
          let totalAmount = 0;
          pageData.forEach(({ total }) => {
            totalAmount += total;
          });
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <Text strong>Total</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>${totalAmount.toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={4} />
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />

      <DynamicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Sale Details - ${selectedSale?.invoice}`}
        width={900}
        footer={[
          <Button
            key="print"
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(selectedSale!)}
          >
            Print Invoice
          </Button>,
          <Button key="download" icon={<DownloadOutlined />}>
            Download PDF
          </Button>,
          <Button
            key="close"
            type="primary"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>,
        ]}
      >
        {selectedSale && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Invoice Number">
                {selectedSale.invoice}
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {selectedSale.date}
              </Descriptions.Item>
              <Descriptions.Item label="Customer">
                {selectedSale.customer}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedSale.customerEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {selectedSale.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <Tag color={getPaymentStatusColor(selectedSale.paymentStatus)}>
                  {selectedSale.paymentStatus.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Sale Status">
                <Tag
                  icon={getStatusIcon(selectedSale.status)}
                  color={getStatusColor(selectedSale.status)}
                >
                  {selectedSale.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Items Count">
                {selectedSale.items}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ marginTop: 16 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Subtotal:</Text>
                  <Text>${selectedSale.subtotal.toFixed(2)}</Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Discount:</Text>
                  <Text type="danger">
                    -${selectedSale.discount.toFixed(2)}
                  </Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Tax:</Text>
                  <Text>${selectedSale.tax.toFixed(2)}</Text>
                </div>
                <Divider style={{ margin: "12px 0" }} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Title level={4} style={{ margin: 0 }}>
                    Total:
                  </Title>
                  <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
                    ${selectedSale.total.toFixed(2)}
                  </Title>
                </div>
              </Space>
            </div>
          </div>
        )}
      </DynamicModal>
    </div>
  );
}
