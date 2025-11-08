'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  message,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Descriptions,
  Steps,
  AutoComplete,
  Row,
  Col,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  SwapOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CarOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Transfer {
  key: string;
  transferNo: string;
  date: string;
  productSku: string;
  productName: string;
  quantity: number;
  fromLocation: string;
  toLocation: string;
  status: 'pending' | 'in-transit' | 'completed' | 'cancelled';
  notes?: string;
  initiatedBy: string;
  receivedBy?: string;
  transferredDate?: string;
  receivedDate?: string;
}

// Demo transfers data
const demoTransfers: Transfer[] = [
  {
    key: '1',
    transferNo: 'TRF-2024-001',
    date: '2024-01-15 10:00 AM',
    productSku: 'WM-001',
    productName: 'Wireless Mouse',
    quantity: 15,
    fromLocation: 'Warehouse A - Shelf 12',
    toLocation: 'Store - Display Section 3',
    status: 'completed',
    notes: 'Transfer for store restocking',
    initiatedBy: 'John Doe',
    receivedBy: 'Emily Davis',
    transferredDate: '2024-01-15 10:30 AM',
    receivedDate: '2024-01-15 02:15 PM',
  },
  {
    key: '2',
    transferNo: 'TRF-2024-002',
    date: '2024-01-15 09:00 AM',
    productSku: 'KB-002',
    productName: 'Mechanical Keyboard',
    quantity: 10,
    fromLocation: 'Warehouse A - Shelf 13',
    toLocation: 'Warehouse B - Shelf 05',
    status: 'in-transit',
    notes: 'Relocating stock for better organization',
    initiatedBy: 'Sarah Johnson',
    transferredDate: '2024-01-15 09:30 AM',
  },
  {
    key: '3',
    transferNo: 'TRF-2024-003',
    date: '2024-01-14 03:30 PM',
    productSku: 'HP-006',
    productName: 'Noise Cancelling Headphones',
    quantity: 8,
    fromLocation: 'Warehouse B - Shelf 08',
    toLocation: 'Store - Display Section 1',
    status: 'completed',
    notes: 'New product launch display',
    initiatedBy: 'Mike Brown',
    receivedBy: 'Lisa Anderson',
    transferredDate: '2024-01-14 04:00 PM',
    receivedDate: '2024-01-14 05:30 PM',
  },
  {
    key: '4',
    transferNo: 'TRF-2024-004',
    date: '2024-01-14 11:00 AM',
    productSku: 'DL-008',
    productName: 'Desk Lamp LED',
    quantity: 20,
    fromLocation: 'Warehouse B - Shelf 10',
    toLocation: 'Warehouse A - Shelf 25',
    status: 'pending',
    notes: 'Consolidating inventory',
    initiatedBy: 'Emily Davis',
  },
  {
    key: '5',
    transferNo: 'TRF-2024-005',
    date: '2024-01-13 02:15 PM',
    productSku: 'CB-003',
    productName: 'USB-C Cable',
    quantity: 30,
    fromLocation: 'Warehouse A - Bin 05',
    toLocation: 'Store - Counter Display',
    status: 'completed',
    notes: 'High demand product - restocking',
    initiatedBy: 'John Doe',
    receivedBy: 'Robert Taylor',
    transferredDate: '2024-01-13 02:45 PM',
    receivedDate: '2024-01-13 04:00 PM',
  },
  {
    key: '6',
    transferNo: 'TRF-2024-006',
    date: '2024-01-13 09:45 AM',
    productSku: 'MN-007',
    productName: 'Monitor 24"',
    quantity: 5,
    fromLocation: 'Warehouse A - Shelf 20',
    toLocation: 'Warehouse B - Shelf 15',
    status: 'cancelled',
    notes: 'Cancelled due to stock shortage',
    initiatedBy: 'Sarah Johnson',
  },
  {
    key: '7',
    transferNo: 'TRF-2024-007',
    date: '2024-01-12 01:30 PM',
    productSku: 'LS-004',
    productName: 'Laptop Stand',
    quantity: 12,
    fromLocation: 'Warehouse A - Shelf 15',
    toLocation: 'Store - Display Section 2',
    status: 'in-transit',
    notes: 'Promotional display setup',
    initiatedBy: 'Mike Brown',
    transferredDate: '2024-01-12 02:00 PM',
  },
];

// Demo locations
const demoLocations = [
  'Warehouse A - Shelf 12',
  'Warehouse A - Shelf 13',
  'Warehouse A - Shelf 14',
  'Warehouse A - Shelf 15',
  'Warehouse B - Shelf 05',
  'Warehouse B - Shelf 08',
  'Warehouse B - Shelf 10',
  'Store - Display Section 1',
  'Store - Display Section 2',
  'Store - Display Section 3',
  'Store - Counter Display',
];

// Demo products
const demoProducts = [
  { value: 'WM-001', label: 'WM-001 - Wireless Mouse' },
  { value: 'KB-002', label: 'KB-002 - Mechanical Keyboard' },
  { value: 'CB-003', label: 'CB-003 - USB-C Cable' },
  { value: 'HP-006', label: 'HP-006 - Noise Cancelling Headphones' },
  { value: 'DL-008', label: 'DL-008 - Desk Lamp LED' },
];

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>(demoTransfers);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-transit':
        return 'processing';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined />;
      case 'in-transit':
        return <CarOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      case 'cancelled':
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'in-transit':
        return 1;
      case 'completed':
        return 2;
      default:
        return 0;
    }
  };

  const handleView = (record: Transfer) => {
    setSelectedTransfer(record);
    setIsViewModalOpen(true);
  };

  const handleDelete = (record: Transfer) => {
    if (record.status === 'completed') {
      message.error('Cannot delete completed transfers');
      return;
    }
    message.success(`Transfer ${record.transferNo} deleted successfully`);
    setTransfers(transfers.filter((transfer) => transfer.key !== record.key));
  };

  const handleComplete = (record: Transfer) => {
    if (record.status !== 'in-transit') {
      message.error('Only in-transit transfers can be completed');
      return;
    }
    const updated = transfers.map((transfer) =>
      transfer.key === record.key
        ? {
            ...transfer,
            status: 'completed' as const,
            receivedBy: 'Current User',
            receivedDate: new Date().toLocaleString(),
          }
        : transfer
    );
    setTransfers(updated);
    message.success(`Transfer ${record.transferNo} completed`);
  };

  const handleCancel = (record: Transfer) => {
    if (record.status === 'completed') {
      message.error('Cannot cancel completed transfers');
      return;
    }
    const updated = transfers.map((transfer) =>
      transfer.key === record.key ? { ...transfer, status: 'cancelled' as const } : transfer
    );
    setTransfers(updated);
    message.warning(`Transfer ${record.transferNo} cancelled`);
  };

  const getActionItems = (record: Transfer): MenuProps['items'] => [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: () => handleView(record),
    },
    ...(record.status === 'in-transit'
      ? [
          {
            key: 'complete',
            label: 'Mark as Completed',
            icon: <CheckCircleOutlined />,
            onClick: () => handleComplete(record),
          },
        ]
      : []),
    ...(record.status !== 'completed'
      ? [
          {
            key: 'cancel',
            label: 'Cancel Transfer',
            icon: <CloseCircleOutlined />,
            onClick: () => handleCancel(record),
          },
        ]
      : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record),
      disabled: record.status === 'completed',
    },
  ];

  const columns: DynamicTableColumn<Transfer>[] = [
    {
      title: 'Transfer No',
      dataIndex: 'transferNo',
      key: 'transferNo',
      width: 150,
      render: (no: string) => <Text strong>{no}</Text>,
      sorter: (a, b) => a.transferNo.localeCompare(b.transferNo),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 180,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Product',
      key: 'product',
      width: 220,
      render: (_, record: Transfer) => (
        <div>
          <Text strong>{record.productName}</Text>
          <br />
          <Text type="secondary" code style={{ fontSize: 12 }}>
            {record.productSku}
          </Text>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
      render: (qty: number) => <Text strong>{qty}</Text>,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'From → To',
      key: 'locations',
      width: 300,
      render: (_, record: Transfer) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            From: {record.fromLocation}
          </Text>
          <SwapOutlined style={{ color: '#1677ff' }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            To: {record.toLocation}
          </Text>
        </Space>
      ),
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
        { text: 'Pending', value: 'pending' },
        { text: 'In Transit', value: 'in-transit' },
        { text: 'Completed', value: 'completed' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Initiated By',
      dataIndex: 'initiatedBy',
      key: 'initiatedBy',
      width: 130,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (_, record: Transfer) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleView(record)} />
          <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleCreateTransfer = (values: any) => {
    const newTransfer: Transfer = {
      key: String(Date.now()),
      transferNo: `TRF-2024-${String(transfers.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleString(),
      productSku: values.productSku,
      productName: values.productName || 'Product Name',
      quantity: values.quantity,
      fromLocation: values.fromLocation,
      toLocation: values.toLocation,
      status: 'pending',
      notes: values.notes,
      initiatedBy: 'Current User',
    };

    setTransfers([newTransfer, ...transfers]);
    message.success('Transfer request created successfully');
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <DynamicTable
        title="Stock Transfers"
        columns={columns}
        data={transfers}
        showAdd
        addButtonText="New Transfer"
        onAdd={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
        rowKey="key"
        scroll={{ x: 1500 }}
      />

      {/* View Transfer Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Transfer Details - ${selectedTransfer?.transferNo}`}
        width={900}
        footer={[
          ...(selectedTransfer?.status === 'in-transit'
            ? [
                <Button
                  key="complete"
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => {
                    if (selectedTransfer) handleComplete(selectedTransfer);
                    setIsViewModalOpen(false);
                  }}
                >
                  Mark as Completed
                </Button>,
              ]
            : []),
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedTransfer && (
          <div>
            {/* Transfer Progress */}
            <div style={{ marginBottom: 32 }}>
              <Steps
                current={getStatusStep(selectedTransfer.status)}
                status={selectedTransfer.status === 'cancelled' ? 'error' : 'process'}
                items={[
                  {
                    title: 'Initiated',
                    description: selectedTransfer.date,
                    icon: <InboxOutlined />,
                  },
                  {
                    title: 'In Transit',
                    description: selectedTransfer.transferredDate || 'Not started',
                    icon: <CarOutlined />,
                  },
                  {
                    title: 'Received',
                    description: selectedTransfer.receivedDate || 'Pending',
                    icon: <CheckCircleOutlined />,
                  },
                ]}
              />
            </div>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Transfer No">{selectedTransfer.transferNo}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag icon={getStatusIcon(selectedTransfer.status)} color={getStatusColor(selectedTransfer.status)}>
                  {selectedTransfer.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Product Name">{selectedTransfer.productName}</Descriptions.Item>
              <Descriptions.Item label="SKU">
                <Text code>{selectedTransfer.productSku}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Quantity">
                <Text strong style={{ fontSize: 18 }}>
                  {selectedTransfer.quantity} units
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Date Initiated">{selectedTransfer.date}</Descriptions.Item>
              <Descriptions.Item label="From Location" span={2}>
                {selectedTransfer.fromLocation}
              </Descriptions.Item>
              <Descriptions.Item label="To Location" span={2}>
                {selectedTransfer.toLocation}
              </Descriptions.Item>
              <Descriptions.Item label="Initiated By">{selectedTransfer.initiatedBy}</Descriptions.Item>
              <Descriptions.Item label="Received By">
                {selectedTransfer.receivedBy || 'Not received yet'}
              </Descriptions.Item>
              {selectedTransfer.transferredDate && (
                <Descriptions.Item label="Transferred Date">{selectedTransfer.transferredDate}</Descriptions.Item>
              )}
              {selectedTransfer.receivedDate && (
                <Descriptions.Item label="Received Date">{selectedTransfer.receivedDate}</Descriptions.Item>
              )}
              <Descriptions.Item label="Notes" span={2}>
                {selectedTransfer.notes || 'No notes'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </DynamicModal>

      {/* Create Transfer Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Create Stock Transfer"
        width={700}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateTransfer}>
          <Form.Item
            name="productSku"
            label="Product"
            rules={[{ required: true, message: 'Please select a product' }]}
          >
            <AutoComplete
              options={demoProducts}
              placeholder="Search product by SKU or name"
              filterOption={(inputValue, option) =>
                option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter quantity' },
              { type: 'number', min: 1, message: 'Quantity must be at least 1' },
            ]}
          >
            <InputNumber placeholder="Enter quantity" style={{ width: '100%' }} min={1} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fromLocation"
                label="From Location"
                rules={[{ required: true, message: 'Please select from location' }]}
              >
                <Select placeholder="Select source location" showSearch>
                  {demoLocations.map((loc) => (
                    <Option key={loc} value={loc}>
                      {loc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="toLocation"
                label="To Location"
                rules={[{ required: true, message: 'Please select to location' }]}
              >
                <Select placeholder="Select destination location" showSearch>
                  {demoLocations.map((loc) => (
                    <Option key={loc} value={loc}>
                      {loc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Notes">
            <TextArea rows={3} placeholder="Add transfer notes (optional)" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Create Transfer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </DynamicModal>
    </div>
  );
}
