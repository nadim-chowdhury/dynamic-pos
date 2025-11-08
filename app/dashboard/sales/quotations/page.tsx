'use client';

import React, { useState } from 'react';
import { Typography, Button, Space, Tag, Dropdown, message, Form, Input, Select, DatePicker, Descriptions, Divider } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SendOutlined,
  CopyOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';

const { Title, Text } = Typography;
const { Option } = Select;

interface Quotation {
  key: string;
  quotationNo: string;
  date: string;
  validUntil: string;
  customer: string;
  customerEmail: string;
  items: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  notes?: string;
}

// Demo quotations data
const demoQuotations: Quotation[] = [
  {
    key: '1',
    quotationNo: 'QUO-2024-001',
    date: '2024-01-10',
    validUntil: '2024-01-24',
    customer: 'Tech Solutions Inc',
    customerEmail: 'contact@techsolutions.com',
    items: 5,
    subtotal: 3500.00,
    discount: 350.00,
    tax: 315.00,
    total: 3465.00,
    status: 'sent',
    notes: 'Bulk order discount applied',
  },
  {
    key: '2',
    quotationNo: 'QUO-2024-002',
    date: '2024-01-12',
    validUntil: '2024-01-26',
    customer: 'Global Enterprises',
    customerEmail: 'orders@globalent.com',
    items: 8,
    subtotal: 5200.00,
    discount: 520.00,
    tax: 468.00,
    total: 5148.00,
    status: 'accepted',
    notes: 'Premium customer - 10% discount',
  },
  {
    key: '3',
    quotationNo: 'QUO-2024-003',
    date: '2024-01-13',
    validUntil: '2024-01-20',
    customer: 'Startup Hub',
    customerEmail: 'admin@startuphub.com',
    items: 3,
    subtotal: 1200.00,
    discount: 0,
    tax: 120.00,
    total: 1320.00,
    status: 'draft',
  },
  {
    key: '4',
    quotationNo: 'QUO-2024-004',
    date: '2024-01-14',
    validUntil: '2024-01-21',
    customer: 'Retail Masters',
    customerEmail: 'info@retailmasters.com',
    items: 12,
    subtotal: 8900.00,
    discount: 890.00,
    tax: 801.00,
    total: 8811.00,
    status: 'rejected',
    notes: 'Customer requested price revision',
  },
  {
    key: '5',
    quotationNo: 'QUO-2024-005',
    date: '2024-01-05',
    validUntil: '2024-01-15',
    customer: 'Quick Shop',
    customerEmail: 'sales@quickshop.com',
    items: 4,
    subtotal: 2100.00,
    discount: 210.00,
    tax: 189.00,
    total: 2079.00,
    status: 'expired',
  },
  {
    key: '6',
    quotationNo: 'QUO-2024-006',
    date: '2024-01-16',
    validUntil: '2024-01-30',
    customer: 'Office Supplies Co',
    customerEmail: 'purchase@officesupplies.com',
    items: 6,
    subtotal: 1850.00,
    discount: 185.00,
    tax: 166.50,
    total: 1831.50,
    status: 'sent',
  },
];

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(demoQuotations);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'sent':
        return 'processing';
      case 'draft':
        return 'default';
      case 'rejected':
        return 'error';
      case 'expired':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircleOutlined />;
      case 'sent':
        return <SendOutlined />;
      case 'draft':
        return <EditOutlined />;
      case 'rejected':
        return <CloseCircleOutlined />;
      case 'expired':
        return <ClockCircleOutlined />;
      default:
        return null;
    }
  };

  const handleView = (record: Quotation) => {
    setSelectedQuotation(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Quotation) => {
    message.info(`Editing quotation ${record.quotationNo}`);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = (record: Quotation) => {
    message.success(`Quotation ${record.quotationNo} deleted successfully`);
    setQuotations(quotations.filter((quotation) => quotation.key !== record.key));
  };

  const handlePrint = (record: Quotation) => {
    message.info(`Printing quotation ${record.quotationNo}`);
    // Implement print functionality
  };

  const handleSend = (record: Quotation) => {
    message.success(`Quotation ${record.quotationNo} sent to ${record.customer}`);
    const updated = quotations.map((q) =>
      q.key === record.key ? { ...q, status: 'sent' as const } : q
    );
    setQuotations(updated);
  };

  const handleConvertToSale = (record: Quotation) => {
    message.success(`Converting quotation ${record.quotationNo} to sale`);
    // Navigate to new sale page with quotation data
  };

  const handleDuplicate = (record: Quotation) => {
    message.success(`Quotation ${record.quotationNo} duplicated`);
    // Create duplicate quotation
  };

  const getActionItems = (record: Quotation): MenuProps['items'] => [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: () => handleView(record),
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
      disabled: record.status === 'accepted',
    },
    {
      key: 'send',
      label: 'Send to Customer',
      icon: <SendOutlined />,
      onClick: () => handleSend(record),
      disabled: record.status === 'sent' || record.status === 'accepted',
    },
    {
      key: 'convert',
      label: 'Convert to Sale',
      icon: <ShoppingCartOutlined />,
      onClick: () => handleConvertToSale(record),
      disabled: record.status !== 'accepted',
    },
    {
      type: 'divider',
    },
    {
      key: 'print',
      label: 'Print',
      icon: <PrinterOutlined />,
      onClick: () => handlePrint(record),
    },
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: <CopyOutlined />,
      onClick: () => handleDuplicate(record),
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record),
    },
  ];

  const columns: DynamicTableColumn<Quotation>[] = [
    {
      title: 'Quotation No',
      dataIndex: 'quotationNo',
      key: 'quotationNo',
      width: 150,
      render: (quotationNo: string) => <Text strong>{quotationNo}</Text>,
      sorter: (a, b) => a.quotationNo.localeCompare(b.quotationNo),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      width: 120,
      render: (date: string, record: Quotation) => {
        const isExpired = new Date(date) < new Date() && record.status !== 'accepted';
        return (
          <Text type={isExpired ? 'danger' : undefined}>
            {date}
            {isExpired && ' (Expired)'}
          </Text>
        );
      },
      sorter: (a, b) => new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime(),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: 200,
      render: (customer: string, record: Quotation) => (
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
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 80,
      align: 'center',
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
      width: 130,
      align: 'right',
      render: (total: number) => <Text strong>${total.toFixed(2)}</Text>,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Draft', value: 'draft' },
        { text: 'Sent', value: 'sent' },
        { text: 'Accepted', value: 'accepted' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Expired', value: 'expired' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record: Quotation) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
          />
          <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleCreateQuotation = (values: any) => {
    console.log('Create quotation:', values);
    message.success('Quotation created successfully');
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <DynamicTable
        title="Quotations"
        columns={columns}
        data={quotations}
        showAdd
        addButtonText="New Quotation"
        onAdd={() => setIsCreateModalOpen(true)}
        rowKey="key"
        scroll={{ x: 1300 }}
      />

      {/* View Quotation Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Quotation Details - ${selectedQuotation?.quotationNo}`}
        width={900}
        footer={[
          <Button
            key="send"
            icon={<SendOutlined />}
            disabled={selectedQuotation?.status === 'sent' || selectedQuotation?.status === 'accepted'}
            onClick={() => {
              if (selectedQuotation) handleSend(selectedQuotation);
              setIsViewModalOpen(false);
            }}
          >
            Send to Customer
          </Button>,
          <Button
            key="convert"
            type="primary"
            icon={<ShoppingCartOutlined />}
            disabled={selectedQuotation?.status !== 'accepted'}
            onClick={() => {
              if (selectedQuotation) handleConvertToSale(selectedQuotation);
              setIsViewModalOpen(false);
            }}
          >
            Convert to Sale
          </Button>,
          <Button key="print" icon={<PrinterOutlined />} onClick={() => handlePrint(selectedQuotation!)}>
            Print
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedQuotation && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Quotation No">{selectedQuotation.quotationNo}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag icon={getStatusIcon(selectedQuotation.status)} color={getStatusColor(selectedQuotation.status)}>
                  {selectedQuotation.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date">{selectedQuotation.date}</Descriptions.Item>
              <Descriptions.Item label="Valid Until">{selectedQuotation.validUntil}</Descriptions.Item>
              <Descriptions.Item label="Customer">{selectedQuotation.customer}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedQuotation.customerEmail}</Descriptions.Item>
              <Descriptions.Item label="Items Count">{selectedQuotation.items}</Descriptions.Item>
              <Descriptions.Item label="Notes" span={2}>
                {selectedQuotation.notes || 'No notes'}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ marginTop: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>Subtotal:</Text>
                  <Text>${selectedQuotation.subtotal.toFixed(2)}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>Discount:</Text>
                  <Text type="danger">-${selectedQuotation.discount.toFixed(2)}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>Tax:</Text>
                  <Text>${selectedQuotation.tax.toFixed(2)}</Text>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Title level={4} style={{ margin: 0 }}>
                    Total:
                  </Title>
                  <Title level={4} style={{ margin: 0, color: '#1677ff' }}>
                    ${selectedQuotation.total.toFixed(2)}
                  </Title>
                </div>
              </Space>
            </div>
          </div>
        )}
      </DynamicModal>

      {/* Create Quotation Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Create New Quotation"
        width={700}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateQuotation}>
          <Form.Item
            name="customer"
            label="Customer"
            rules={[{ required: true, message: 'Please select a customer' }]}
          >
            <Select placeholder="Select customer" showSearch>
              <Option value="1">Tech Solutions Inc</Option>
              <Option value="2">Global Enterprises</Option>
              <Option value="3">Startup Hub</Option>
              <Option value="4">Retail Masters</Option>
              <Option value="5">Quick Shop</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="validUntil"
            label="Valid Until"
            rules={[{ required: true, message: 'Please select validity date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={3} placeholder="Add notes (optional)" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Create Quotation
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </DynamicModal>
    </div>
  );
}
