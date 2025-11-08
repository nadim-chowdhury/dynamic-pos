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
  AutoComplete,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Adjustment {
  key: string;
  adjustmentNo: string;
  date: string;
  productSku: string;
  productName: string;
  type: 'increase' | 'decrease';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  notes?: string;
  adjustedBy: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Demo adjustments data
const demoAdjustments: Adjustment[] = [
  {
    key: '1',
    adjustmentNo: 'ADJ-2024-001',
    date: '2024-01-15 10:30 AM',
    productSku: 'WM-001',
    productName: 'Wireless Mouse',
    type: 'increase',
    quantity: 20,
    previousStock: 30,
    newStock: 50,
    reason: 'purchase',
    notes: 'New shipment received from supplier',
    adjustedBy: 'John Doe',
    status: 'approved',
  },
  {
    key: '2',
    adjustmentNo: 'ADJ-2024-002',
    date: '2024-01-15 09:15 AM',
    productSku: 'KB-002',
    productName: 'Mechanical Keyboard',
    type: 'decrease',
    quantity: 2,
    previousStock: 10,
    newStock: 8,
    reason: 'damage',
    notes: 'Found 2 units damaged during inspection',
    adjustedBy: 'Sarah Johnson',
    status: 'approved',
  },
  {
    key: '3',
    adjustmentNo: 'ADJ-2024-003',
    date: '2024-01-14 04:20 PM',
    productSku: 'CB-003',
    productName: 'USB-C Cable',
    type: 'increase',
    quantity: 50,
    previousStock: 50,
    newStock: 100,
    reason: 'purchase',
    notes: 'Bulk order for upcoming promotion',
    adjustedBy: 'Mike Brown',
    status: 'approved',
  },
  {
    key: '4',
    adjustmentNo: 'ADJ-2024-004',
    date: '2024-01-14 02:00 PM',
    productSku: 'WC-005',
    productName: 'Webcam HD',
    type: 'decrease',
    quantity: 12,
    previousStock: 15,
    newStock: 3,
    reason: 'sale',
    notes: 'Corporate bulk sale',
    adjustedBy: 'Emily Davis',
    status: 'approved',
  },
  {
    key: '5',
    adjustmentNo: 'ADJ-2024-005',
    date: '2024-01-13 11:45 AM',
    productSku: 'HP-006',
    productName: 'Noise Cancelling Headphones',
    type: 'increase',
    quantity: 5,
    previousStock: 15,
    newStock: 20,
    reason: 'return',
    notes: 'Customer returns - products in good condition',
    adjustedBy: 'John Doe',
    status: 'approved',
  },
  {
    key: '6',
    adjustmentNo: 'ADJ-2024-006',
    date: '2024-01-13 09:30 AM',
    productSku: 'MN-007',
    productName: 'Monitor 24"',
    type: 'decrease',
    quantity: 10,
    previousStock: 10,
    newStock: 0,
    reason: 'lost',
    notes: 'Stock discrepancy - items missing',
    adjustedBy: 'Sarah Johnson',
    status: 'pending',
  },
  {
    key: '7',
    adjustmentNo: 'ADJ-2024-007',
    date: '2024-01-12 03:15 PM',
    productSku: 'DL-008',
    productName: 'Desk Lamp LED',
    type: 'increase',
    quantity: 15,
    previousStock: 25,
    newStock: 40,
    reason: 'correction',
    notes: 'Stock count correction after physical inventory',
    adjustedBy: 'Mike Brown',
    status: 'approved',
  },
  {
    key: '8',
    adjustmentNo: 'ADJ-2024-008',
    date: '2024-01-12 10:00 AM',
    productSku: 'MB-010',
    productName: 'Mouse Pad',
    type: 'decrease',
    quantity: 13,
    previousStock: 15,
    newStock: 2,
    reason: 'sale',
    notes: 'Flash sale promotion',
    adjustedBy: 'Emily Davis',
    status: 'approved',
  },
];

// Demo products for autocomplete
const demoProducts = [
  { value: 'WM-001', label: 'WM-001 - Wireless Mouse (Stock: 50)' },
  { value: 'KB-002', label: 'KB-002 - Mechanical Keyboard (Stock: 8)' },
  { value: 'CB-003', label: 'CB-003 - USB-C Cable (Stock: 100)' },
  { value: 'WC-005', label: 'WC-005 - Webcam HD (Stock: 3)' },
  { value: 'HP-006', label: 'HP-006 - Noise Cancelling Headphones (Stock: 20)' },
];

export default function AdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<Adjustment[]>(demoAdjustments);
  const [selectedAdjustment, setSelectedAdjustment] = useState<Adjustment | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getTypeColor = (type: string) => {
    return type === 'increase' ? 'success' : 'error';
  };

  const getTypeIcon = (type: string) => {
    return type === 'increase' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      default:
        return null;
    }
  };

  const handleView = (record: Adjustment) => {
    setSelectedAdjustment(record);
    setIsViewModalOpen(true);
  };

  const handleDelete = (record: Adjustment) => {
    if (record.status === 'approved') {
      message.error('Cannot delete approved adjustments');
      return;
    }
    message.success(`Adjustment ${record.adjustmentNo} deleted successfully`);
    setAdjustments(adjustments.filter((adj) => adj.key !== record.key));
  };

  const handleApprove = (record: Adjustment) => {
    const updated = adjustments.map((adj) =>
      adj.key === record.key ? { ...adj, status: 'approved' as const } : adj
    );
    setAdjustments(updated);
    message.success(`Adjustment ${record.adjustmentNo} approved`);
  };

  const handleReject = (record: Adjustment) => {
    const updated = adjustments.map((adj) =>
      adj.key === record.key ? { ...adj, status: 'rejected' as const } : adj
    );
    setAdjustments(updated);
    message.warning(`Adjustment ${record.adjustmentNo} rejected`);
  };

  const getActionItems = (record: Adjustment): MenuProps['items'] => [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: () => handleView(record),
    },
    ...(record.status === 'pending'
      ? [
          {
            key: 'approve',
            label: 'Approve',
            icon: <CheckCircleOutlined />,
            onClick: () => handleApprove(record),
          },
          {
            key: 'reject',
            label: 'Reject',
            icon: <DeleteOutlined />,
            onClick: () => handleReject(record),
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
      disabled: record.status === 'approved',
    },
  ];

  const columns: DynamicTableColumn<Adjustment>[] = [
    {
      title: 'Adjustment No',
      dataIndex: 'adjustmentNo',
      key: 'adjustmentNo',
      width: 150,
      render: (no: string) => <Text strong>{no}</Text>,
      sorter: (a, b) => a.adjustmentNo.localeCompare(b.adjustmentNo),
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
      render: (_, record: Adjustment) => (
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag icon={getTypeIcon(type)} color={getTypeColor(type)}>
          {type.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Increase', value: 'increase' },
        { text: 'Decrease', value: 'decrease' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
      render: (qty: number, record: Adjustment) => (
        <Text strong style={{ color: record.type === 'increase' ? '#52c41a' : '#ff4d4f' }}>
          {record.type === 'increase' ? '+' : '-'}
          {qty}
        </Text>
      ),
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Stock Change',
      key: 'stockChange',
      width: 140,
      align: 'center',
      render: (_, record: Adjustment) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.previousStock} → {record.newStock}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      width: 130,
      render: (reason: string) => {
        const reasonLabels: Record<string, string> = {
          purchase: 'Purchase',
          sale: 'Sale',
          damage: 'Damaged',
          lost: 'Lost/Stolen',
          return: 'Return',
          correction: 'Correction',
          transfer: 'Transfer',
        };
        return <Tag>{reasonLabels[reason] || reason}</Tag>;
      },
      filters: [
        { text: 'Purchase', value: 'purchase' },
        { text: 'Sale', value: 'sale' },
        { text: 'Damaged', value: 'damage' },
        { text: 'Lost/Stolen', value: 'lost' },
        { text: 'Return', value: 'return' },
        { text: 'Correction', value: 'correction' },
      ],
      onFilter: (value, record) => record.reason === value,
    },
    {
      title: 'Adjusted By',
      dataIndex: 'adjustedBy',
      key: 'adjustedBy',
      width: 130,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record: Adjustment) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleView(record)} />
          <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleCreateAdjustment = (values: any) => {
    const newAdjustment: Adjustment = {
      key: String(Date.now()),
      adjustmentNo: `ADJ-2024-${String(adjustments.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleString(),
      productSku: values.productSku,
      productName: values.productName || 'Product Name',
      type: values.type,
      quantity: values.quantity,
      previousStock: values.previousStock || 0,
      newStock:
        values.type === 'increase'
          ? (values.previousStock || 0) + values.quantity
          : (values.previousStock || 0) - values.quantity,
      reason: values.reason,
      notes: values.notes,
      adjustedBy: 'Current User',
      status: 'pending',
    };

    setAdjustments([newAdjustment, ...adjustments]);
    message.success('Stock adjustment created successfully');
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <DynamicTable
        title="Stock Adjustments"
        columns={columns}
        data={adjustments}
        showAdd
        addButtonText="New Adjustment"
        onAdd={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
        rowKey="key"
        scroll={{ x: 1500 }}
      />

      {/* View Adjustment Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Adjustment Details - ${selectedAdjustment?.adjustmentNo}`}
        width={800}
        footer={[
          ...(selectedAdjustment?.status === 'pending'
            ? [
                <Button
                  key="approve"
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => {
                    if (selectedAdjustment) handleApprove(selectedAdjustment);
                    setIsViewModalOpen(false);
                  }}
                >
                  Approve
                </Button>,
              ]
            : []),
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedAdjustment && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Adjustment No">{selectedAdjustment.adjustmentNo}</Descriptions.Item>
            <Descriptions.Item label="Date">{selectedAdjustment.date}</Descriptions.Item>
            <Descriptions.Item label="Product Name">{selectedAdjustment.productName}</Descriptions.Item>
            <Descriptions.Item label="SKU">
              <Text code>{selectedAdjustment.productSku}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Type">
              <Tag icon={getTypeIcon(selectedAdjustment.type)} color={getTypeColor(selectedAdjustment.type)}>
                {selectedAdjustment.type.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              <Text strong>
                {selectedAdjustment.type === 'increase' ? '+' : '-'}
                {selectedAdjustment.quantity}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Previous Stock">{selectedAdjustment.previousStock}</Descriptions.Item>
            <Descriptions.Item label="New Stock">{selectedAdjustment.newStock}</Descriptions.Item>
            <Descriptions.Item label="Reason">
              <Tag>{selectedAdjustment.reason}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Adjusted By">{selectedAdjustment.adjustedBy}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag icon={getStatusIcon(selectedAdjustment.status)} color={getStatusColor(selectedAdjustment.status)}>
                {selectedAdjustment.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Notes" span={2}>
              {selectedAdjustment.notes || 'No notes'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </DynamicModal>

      {/* Create Adjustment Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Create Stock Adjustment"
        width={700}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateAdjustment}>
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
            name="type"
            label="Adjustment Type"
            rules={[{ required: true, message: 'Please select type' }]}
          >
            <Select placeholder="Select adjustment type">
              <Option value="increase">
                <Space>
                  <ArrowUpOutlined style={{ color: '#52c41a' }} />
                  Increase Stock
                </Space>
              </Option>
              <Option value="decrease">
                <Space>
                  <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                  Decrease Stock
                </Space>
              </Option>
            </Select>
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

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please select a reason' }]}
          >
            <Select placeholder="Select reason">
              <Option value="purchase">Purchase</Option>
              <Option value="sale">Sale</Option>
              <Option value="damage">Damaged</Option>
              <Option value="lost">Lost/Stolen</Option>
              <Option value="return">Return</Option>
              <Option value="correction">Stock Correction</Option>
              <Option value="transfer">Transfer</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <TextArea rows={3} placeholder="Add notes (optional)" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Create Adjustment
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </DynamicModal>
    </div>
  );
}
