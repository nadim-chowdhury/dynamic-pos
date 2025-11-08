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
  Select,
  Descriptions,
  Row,
  Col,
  Statistic,
  Card,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../components/DynamicTable';
import DynamicModal from '../../components/DynamicModal';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Customer {
  key: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
  customerType: 'retail' | 'wholesale' | 'vip';
  status: 'active' | 'inactive';
  notes?: string;
}

// Demo customers data
const demoCustomers: Customer[] = [
  {
    key: '1',
    customerId: 'CUST-0001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    totalPurchases: 45,
    totalSpent: 12450.50,
    lastPurchase: '2024-01-15',
    customerType: 'vip',
    status: 'active',
  },
  {
    key: '2',
    customerId: 'CUST-0002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    totalPurchases: 28,
    totalSpent: 5680.25,
    lastPurchase: '2024-01-14',
    customerType: 'retail',
    status: 'active',
  },
  {
    key: '3',
    customerId: 'CUST-0003',
    name: 'Tech Solutions Inc',
    email: 'contact@techsolutions.com',
    phone: '+1 (555) 345-6789',
    address: '789 Business Park',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95113',
    totalPurchases: 156,
    totalSpent: 45890.75,
    lastPurchase: '2024-01-13',
    customerType: 'wholesale',
    status: 'active',
    notes: 'Corporate client - 15% discount on bulk orders',
  },
  {
    key: '4',
    customerId: 'CUST-0004',
    name: 'Mike Brown',
    email: 'mike.brown@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Pine Street',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    totalPurchases: 12,
    totalSpent: 2340.00,
    lastPurchase: '2024-01-10',
    customerType: 'retail',
    status: 'active',
  },
  {
    key: '5',
    customerId: 'CUST-0005',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Elm Road',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    totalPurchases: 67,
    totalSpent: 18920.30,
    lastPurchase: '2024-01-12',
    customerType: 'vip',
    status: 'active',
  },
  {
    key: '6',
    customerId: 'CUST-0006',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+1 (555) 678-9012',
    address: '987 Cedar Lane',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    totalPurchases: 8,
    totalSpent: 1450.00,
    lastPurchase: '2023-12-28',
    customerType: 'retail',
    status: 'inactive',
  },
  {
    key: '7',
    customerId: 'CUST-0007',
    name: 'Global Enterprises',
    email: 'orders@globalent.com',
    phone: '+1 (555) 789-0123',
    address: '147 Corporate Drive',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    totalPurchases: 234,
    totalSpent: 89560.00,
    lastPurchase: '2024-01-15',
    customerType: 'wholesale',
    status: 'active',
    notes: 'Major corporate account - special pricing tier',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(demoCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case 'vip':
        return 'gold';
      case 'wholesale':
        return 'purple';
      case 'retail':
        return 'blue';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  const handleView = (record: Customer) => {
    setSelectedCustomer(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Customer) => {
    setSelectedCustomer(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Customer) => {
    message.success(`Customer "${record.name}" deleted successfully`);
    setCustomers(customers.filter((customer) => customer.key !== record.key));
  };

  const getActionItems = (record: Customer): MenuProps['items'] => [
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

  const columns: DynamicTableColumn<Customer>[] = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 130,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string) => <Text strong>{name}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Contact',
      key: 'contact',
      width: 250,
      render: (_, record: Customer) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 12 }}>
            <MailOutlined /> {record.email}
          </Text>
          <Text style={{ fontSize: 12 }}>
            <PhoneOutlined /> {record.phone}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      width: 180,
      render: (_, record: Customer) => (
        <Text type="secondary">
          {record.city}, {record.state}
        </Text>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'customerType',
      key: 'customerType',
      width: 120,
      render: (type: string) => (
        <Tag color={getCustomerTypeColor(type)}>{type.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'VIP', value: 'vip' },
        { text: 'Wholesale', value: 'wholesale' },
        { text: 'Retail', value: 'retail' },
      ],
      onFilter: (value, record) => record.customerType === value,
    },
    {
      title: 'Total Purchases',
      dataIndex: 'totalPurchases',
      key: 'totalPurchases',
      width: 140,
      align: 'center',
      render: (count: number) => <Text strong>{count}</Text>,
      sorter: (a, b) => a.totalPurchases - b.totalPurchases,
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      width: 140,
      align: 'right',
      render: (amount: number) => <Text strong>${amount.toLocaleString()}</Text>,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record: Customer) => (
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

  const handleCreateCustomer = (values: any) => {
    const newCustomer: Customer = {
      key: String(Date.now()),
      customerId: `CUST-${String(customers.length + 1).padStart(4, '0')}`,
      ...values,
      totalPurchases: 0,
      totalSpent: 0,
      lastPurchase: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setCustomers([newCustomer, ...customers]);
    message.success('Customer created successfully');
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleUpdateCustomer = (values: any) => {
    const updatedCustomers = customers.map((customer) =>
      customer.key === selectedCustomer?.key ? { ...customer, ...values } : customer
    );
    setCustomers(updatedCustomers);
    message.success('Customer updated successfully');
    form.resetFields();
    setIsEditModalOpen(false);
  };

  const CustomerForm = ({ onFinish }: { onFinish: (values: any) => void }) => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Customer Name"
        rules={[{ required: true, message: 'Please enter customer name' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Enter customer name" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="email@example.com" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="+1 (555) 123-4567" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please enter address' }]}
      >
        <Input prefix={<EnvironmentOutlined />} placeholder="Street address" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please enter city' }]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please enter state' }]}
          >
            <Input placeholder="State" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="zipCode"
            label="ZIP Code"
            rules={[{ required: true, message: 'Please enter ZIP code' }]}
          >
            <Input placeholder="ZIP" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="customerType"
        label="Customer Type"
        rules={[{ required: true, message: 'Please select customer type' }]}
      >
        <Select placeholder="Select customer type">
          <Option value="retail">Retail</Option>
          <Option value="wholesale">Wholesale</Option>
          <Option value="vip">VIP</Option>
        </Select>
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <TextArea rows={3} placeholder="Additional notes (optional)" />
      </Form.Item>

      <Form.Item>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              setIsCreateModalOpen(false);
              setIsEditModalOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            {selectedCustomer ? 'Update Customer' : 'Create Customer'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  // Calculate summary statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div>
      <Title level={2}>Customers</Title>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Active Customers"
              value={activeCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Customer List"
        columns={columns}
        data={customers}
        showAdd
        addButtonText="Add Customer"
        onAdd={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
        rowKey="key"
        scroll={{ x: 1500 }}
      />

      {/* View Customer Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Customer Details - ${selectedCustomer?.name}`}
        width={800}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedCustomer!);
            }}
          >
            Edit Customer
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedCustomer && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Customer ID">{selectedCustomer.customerId}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedCustomer.status)}>
                  {selectedCustomer.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Name" span={2}>
                {selectedCustomer.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedCustomer.phone}</Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                {selectedCustomer.address}
              </Descriptions.Item>
              <Descriptions.Item label="City">{selectedCustomer.city}</Descriptions.Item>
              <Descriptions.Item label="State">{selectedCustomer.state}</Descriptions.Item>
              <Descriptions.Item label="ZIP Code">{selectedCustomer.zipCode}</Descriptions.Item>
              <Descriptions.Item label="Customer Type">
                <Tag color={getCustomerTypeColor(selectedCustomer.customerType)}>
                  {selectedCustomer.customerType.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Total Purchases">
                <Text strong>{selectedCustomer.totalPurchases}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Total Spent">
                <Text strong>${selectedCustomer.totalSpent.toLocaleString()}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Last Purchase">
                {new Date(selectedCustomer.lastPurchase).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Notes" span={2}>
                {selectedCustomer.notes || 'No notes'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </DynamicModal>

      {/* Create Customer Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Add New Customer"
        width={800}
        footer={null}
      >
        <CustomerForm onFinish={handleCreateCustomer} />
      </DynamicModal>

      {/* Edit Customer Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title={`Edit Customer - ${selectedCustomer?.name}`}
        width={800}
        footer={null}
      >
        <CustomerForm onFinish={handleUpdateCustomer} />
      </DynamicModal>
    </div>
  );
}
