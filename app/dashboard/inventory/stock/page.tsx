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
  Progress,
  Alert,
  Statistic,
  Row,
  Col,
  Card,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  MoreOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';

const { Title, Text } = Typography;
const { Option } = Select;

interface StockItem {
  key: string;
  sku: string;
  productName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unitCost: number;
  stockValue: number;
  location: string;
  lastUpdated: string;
}

// Demo stock data
const demoStockData: StockItem[] = [
  {
    key: '1',
    sku: 'WM-001',
    productName: 'Wireless Mouse',
    category: 'Electronics',
    currentStock: 50,
    minStock: 10,
    maxStock: 100,
    reorderPoint: 15,
    unitCost: 15.00,
    stockValue: 750.00,
    location: 'Warehouse A - Shelf 12',
    lastUpdated: '2024-01-15 10:30 AM',
  },
  {
    key: '2',
    sku: 'KB-002',
    productName: 'Mechanical Keyboard',
    category: 'Electronics',
    currentStock: 8,
    minStock: 5,
    maxStock: 50,
    reorderPoint: 10,
    unitCost: 60.00,
    stockValue: 480.00,
    location: 'Warehouse A - Shelf 13',
    lastUpdated: '2024-01-15 09:15 AM',
  },
  {
    key: '3',
    sku: 'CB-003',
    productName: 'USB-C Cable',
    category: 'Accessories',
    currentStock: 100,
    minStock: 20,
    maxStock: 200,
    reorderPoint: 30,
    unitCost: 5.00,
    stockValue: 500.00,
    location: 'Warehouse B - Bin 05',
    lastUpdated: '2024-01-14 02:45 PM',
  },
  {
    key: '4',
    sku: 'LS-004',
    productName: 'Laptop Stand',
    category: 'Accessories',
    currentStock: 25,
    minStock: 5,
    maxStock: 40,
    reorderPoint: 8,
    unitCost: 25.00,
    stockValue: 625.00,
    location: 'Warehouse A - Shelf 15',
    lastUpdated: '2024-01-15 11:20 AM',
  },
  {
    key: '5',
    sku: 'WC-005',
    productName: 'Webcam HD',
    category: 'Electronics',
    currentStock: 3,
    minStock: 5,
    maxStock: 30,
    reorderPoint: 8,
    unitCost: 40.00,
    stockValue: 120.00,
    location: 'Warehouse A - Shelf 14',
    lastUpdated: '2024-01-15 08:00 AM',
  },
  {
    key: '6',
    sku: 'HP-006',
    productName: 'Noise Cancelling Headphones',
    category: 'Audio',
    currentStock: 20,
    minStock: 5,
    maxStock: 35,
    reorderPoint: 8,
    unitCost: 80.00,
    stockValue: 1600.00,
    location: 'Warehouse B - Shelf 08',
    lastUpdated: '2024-01-14 04:30 PM',
  },
  {
    key: '7',
    sku: 'MN-007',
    productName: 'Monitor 24"',
    category: 'Electronics',
    currentStock: 0,
    minStock: 3,
    maxStock: 20,
    reorderPoint: 5,
    unitCost: 200.00,
    stockValue: 0.00,
    location: 'Warehouse A - Shelf 20',
    lastUpdated: '2024-01-13 03:15 PM',
  },
  {
    key: '8',
    sku: 'DL-008',
    productName: 'Desk Lamp LED',
    category: 'Office',
    currentStock: 40,
    minStock: 10,
    maxStock: 60,
    reorderPoint: 15,
    unitCost: 20.00,
    stockValue: 800.00,
    location: 'Warehouse B - Shelf 10',
    lastUpdated: '2024-01-15 01:00 PM',
  },
  {
    key: '9',
    sku: 'MB-010',
    productName: 'Mouse Pad',
    category: 'Accessories',
    currentStock: 2,
    minStock: 15,
    maxStock: 80,
    reorderPoint: 20,
    unitCost: 8.00,
    stockValue: 16.00,
    location: 'Warehouse B - Bin 03',
    lastUpdated: '2024-01-12 10:45 AM',
  },
];

export default function StockManagementPage() {
  const [stockData, setStockData] = useState<StockItem[]>(demoStockData);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
  const [form] = Form.useForm();

  const getStockStatus = (currentStock: number, minStock: number, reorderPoint: number) => {
    if (currentStock === 0) {
      return { status: 'outofstock', color: 'error', text: 'Out of Stock', icon: <InboxOutlined /> };
    } else if (currentStock <= minStock) {
      return { status: 'critical', color: 'error', text: 'Critical', icon: <ExclamationCircleOutlined /> };
    } else if (currentStock <= reorderPoint) {
      return { status: 'low', color: 'warning', text: 'Low Stock', icon: <WarningOutlined /> };
    }
    return { status: 'normal', color: 'success', text: 'Normal', icon: <CheckCircleOutlined /> };
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const handleAddStock = (record: StockItem) => {
    setSelectedItem(record);
    setAdjustmentType('add');
    form.resetFields();
    setIsAdjustModalOpen(true);
  };

  const handleRemoveStock = (record: StockItem) => {
    setSelectedItem(record);
    setAdjustmentType('remove');
    form.resetFields();
    setIsAdjustModalOpen(true);
  };

  const handleStockAdjustment = (values: any) => {
    const { quantity, reason } = values;
    const updatedStock = stockData.map((item) => {
      if (item.key === selectedItem?.key) {
        const newStock =
          adjustmentType === 'add'
            ? item.currentStock + quantity
            : Math.max(0, item.currentStock - quantity);
        return {
          ...item,
          currentStock: newStock,
          stockValue: newStock * item.unitCost,
          lastUpdated: new Date().toLocaleString(),
        };
      }
      return item;
    });

    setStockData(updatedStock);
    message.success(
      `Stock ${adjustmentType === 'add' ? 'added' : 'removed'} successfully: ${quantity} units`
    );
    setIsAdjustModalOpen(false);
    form.resetFields();
  };

  const getActionItems = (record: StockItem): MenuProps['items'] => [
    {
      key: 'add',
      label: 'Add Stock',
      icon: <PlusOutlined />,
      onClick: () => handleAddStock(record),
    },
    {
      key: 'remove',
      label: 'Remove Stock',
      icon: <MinusOutlined />,
      onClick: () => handleRemoveStock(record),
      disabled: record.currentStock === 0,
    },
  ];

  const columns: DynamicTableColumn<StockItem>[] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
      render: (sku: string) => <Text code>{sku}</Text>,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 130,
      filters: [
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Accessories', value: 'Accessories' },
        { text: 'Audio', value: 'Audio' },
        { text: 'Office', value: 'Office' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Current Stock',
      dataIndex: 'currentStock',
      key: 'currentStock',
      width: 150,
      align: 'center',
      render: (stock: number, record: StockItem) => (
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 18 }}>
            {stock}
          </Text>
          <Progress
            percent={getStockPercentage(stock, record.maxStock)}
            size="small"
            status={stock <= record.minStock ? 'exception' : 'normal'}
            showInfo={false}
          />
        </Space>
      ),
      sorter: (a, b) => a.currentStock - b.currentStock,
    },
    {
      title: 'Min / Max',
      key: 'minMax',
      width: 100,
      align: 'center',
      render: (_, record: StockItem) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Min: {record.minStock}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Max: {record.maxStock}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 130,
      render: (_, record: StockItem) => {
        const status = getStockStatus(record.currentStock, record.minStock, record.reorderPoint);
        return (
          <Tag icon={status.icon} color={status.color}>
            {status.text}
          </Tag>
        );
      },
      filters: [
        { text: 'Out of Stock', value: 'outofstock' },
        { text: 'Critical', value: 'critical' },
        { text: 'Low Stock', value: 'low' },
        { text: 'Normal', value: 'normal' },
      ],
      onFilter: (value, record) => {
        const status = getStockStatus(record.currentStock, record.minStock, record.reorderPoint);
        return status.status === value;
      },
    },
    {
      title: 'Stock Value',
      dataIndex: 'stockValue',
      key: 'stockValue',
      width: 130,
      align: 'right',
      render: (value: number) => <Text strong>${value.toFixed(2)}</Text>,
      sorter: (a, b) => a.stockValue - b.stockValue,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 180,
      render: (location: string) => <Text type="secondary">{location}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (_, record: StockItem) => (
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleAddStock(record)}
          >
            Add
          </Button>
          <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Calculate summary statistics
  const totalItems = stockData.length;
  const outOfStockItems = stockData.filter((item) => item.currentStock === 0).length;
  const lowStockItems = stockData.filter(
    (item) => item.currentStock > 0 && item.currentStock <= item.reorderPoint
  ).length;
  const totalStockValue = stockData.reduce((sum, item) => sum + item.stockValue, 0);

  return (
    <div>
      <Title level={2}>Stock Management</Title>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Items"
              value={totalItems}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Stock Value"
              value={totalStockValue}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Out of Stock"
              value={outOfStockItems}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Low Stock"
              value={lowStockItems}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      {(outOfStockItems > 0 || lowStockItems > 0) && (
        <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
          {outOfStockItems > 0 && (
            <Alert
              message={`${outOfStockItems} product(s) are out of stock`}
              description="These products need immediate restocking"
              type="error"
              showIcon
              icon={<ExclamationCircleOutlined />}
            />
          )}
          {lowStockItems > 0 && (
            <Alert
              message={`${lowStockItems} product(s) have low stock`}
              description="Consider reordering these products soon"
              type="warning"
              showIcon
              icon={<WarningOutlined />}
            />
          )}
        </Space>
      )}

      <DynamicTable
        title="Stock Inventory"
        columns={columns}
        data={stockData}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* Stock Adjustment Modal */}
      <DynamicModal
        isOpen={isAdjustModalOpen}
        onClose={() => {
          setIsAdjustModalOpen(false);
          form.resetFields();
        }}
        title={`${adjustmentType === 'add' ? 'Add' : 'Remove'} Stock - ${selectedItem?.productName}`}
        width={600}
        footer={null}
      >
        <div style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text type="secondary">Current Stock:</Text>
              <Text strong style={{ marginLeft: 8, fontSize: 18 }}>
                {selectedItem?.currentStock} units
              </Text>
            </div>
            <div>
              <Text type="secondary">SKU:</Text>
              <Text code style={{ marginLeft: 8 }}>
                {selectedItem?.sku}
              </Text>
            </div>
          </Space>
        </div>

        <Form form={form} layout="vertical" onFinish={handleStockAdjustment}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter quantity' },
              { type: 'number', min: 1, message: 'Quantity must be at least 1' },
            ]}
          >
            <InputNumber
              placeholder="Enter quantity"
              style={{ width: '100%' }}
              min={1}
              max={adjustmentType === 'remove' ? selectedItem?.currentStock : undefined}
            />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please select a reason' }]}
          >
            <Select placeholder="Select reason">
              {adjustmentType === 'add' ? (
                <>
                  <Option value="purchase">New Purchase</Option>
                  <Option value="return">Customer Return</Option>
                  <Option value="correction">Stock Correction</Option>
                  <Option value="transfer">Transfer In</Option>
                </>
              ) : (
                <>
                  <Option value="sale">Sale</Option>
                  <Option value="damage">Damaged</Option>
                  <Option value="lost">Lost/Stolen</Option>
                  <Option value="correction">Stock Correction</Option>
                  <Option value="transfer">Transfer Out</Option>
                </>
              )}
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={3} placeholder="Add notes (optional)" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsAdjustModalOpen(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={adjustmentType === 'add' ? <PlusOutlined /> : <MinusOutlined />}
              >
                {adjustmentType === 'add' ? 'Add Stock' : 'Remove Stock'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </DynamicModal>
    </div>
  );
}
