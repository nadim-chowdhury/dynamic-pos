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
  Row,
  Col,
  Card,
  Statistic,
  InputNumber,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  IdcardOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Designation {
  key: string;
  id: string;
  title: string;
  description: string;
  department: string;
  level: 'Entry' | 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director';
  minSalary: number;
  maxSalary: number;
  employeeCount: number;
  status: 'active' | 'inactive';
  requirements?: string;
}

// Demo designations data
const demoDesignations: Designation[] = [
  {
    key: '1',
    id: 'DES-001',
    title: 'Store Manager',
    description: 'Oversees daily store operations and manages staff',
    department: 'Sales',
    level: 'Manager',
    minSalary: 60000,
    maxSalary: 80000,
    employeeCount: 3,
    status: 'active',
    requirements: '5+ years retail experience, Leadership skills',
  },
  {
    key: '2',
    id: 'DES-002',
    title: 'Sales Associate',
    description: 'Assists customers and processes sales transactions',
    department: 'Sales',
    level: 'Entry',
    minSalary: 35000,
    maxSalary: 50000,
    employeeCount: 8,
    status: 'active',
    requirements: 'High school diploma, Customer service experience',
  },
  {
    key: '3',
    id: 'DES-003',
    title: 'Cashier',
    description: 'Handles cash transactions and customer checkout',
    department: 'Sales',
    level: 'Entry',
    minSalary: 30000,
    maxSalary: 40000,
    employeeCount: 5,
    status: 'active',
    requirements: 'Basic math skills, Attention to detail',
  },
  {
    key: '4',
    id: 'DES-004',
    title: 'System Administrator',
    description: 'Maintains IT infrastructure and systems',
    department: 'IT',
    level: 'Senior',
    minSalary: 70000,
    maxSalary: 95000,
    employeeCount: 2,
    status: 'active',
    requirements: 'Bachelor\'s degree in IT, 5+ years experience',
  },
  {
    key: '5',
    id: 'DES-005',
    title: 'HR Manager',
    description: 'Manages human resources operations and employee relations',
    department: 'HR',
    level: 'Manager',
    minSalary: 65000,
    maxSalary: 85000,
    employeeCount: 2,
    status: 'active',
    requirements: 'HR certification, 5+ years HR experience',
  },
  {
    key: '6',
    id: 'DES-006',
    title: 'Accountant',
    description: 'Handles financial records and reporting',
    department: 'Finance',
    level: 'Mid',
    minSalary: 55000,
    maxSalary: 75000,
    employeeCount: 3,
    status: 'active',
    requirements: 'CPA or accounting degree, 3+ years experience',
  },
  {
    key: '7',
    id: 'DES-007',
    title: 'Warehouse Manager',
    description: 'Oversees warehouse operations and inventory',
    department: 'Operations',
    level: 'Manager',
    minSalary: 50000,
    maxSalary: 70000,
    employeeCount: 2,
    status: 'active',
    requirements: 'Logistics experience, Inventory management skills',
  },
  {
    key: '8',
    id: 'DES-008',
    title: 'Marketing Coordinator',
    description: 'Coordinates marketing campaigns and initiatives',
    department: 'Marketing',
    level: 'Junior',
    minSalary: 45000,
    maxSalary: 60000,
    employeeCount: 3,
    status: 'active',
    requirements: 'Marketing degree, 2+ years experience',
  },
  {
    key: '9',
    id: 'DES-009',
    title: 'Software Developer',
    description: 'Develops and maintains software applications',
    department: 'IT',
    level: 'Mid',
    minSalary: 65000,
    maxSalary: 90000,
    employeeCount: 4,
    status: 'active',
    requirements: 'Computer Science degree, Programming skills',
  },
  {
    key: '10',
    id: 'DES-010',
    title: 'Sales Director',
    description: 'Leads sales strategy and team management',
    department: 'Sales',
    level: 'Director',
    minSalary: 90000,
    maxSalary: 130000,
    employeeCount: 1,
    status: 'active',
    requirements: '10+ years sales experience, Leadership skills',
  },
  {
    key: '11',
    id: 'DES-011',
    title: 'Customer Support Representative',
    description: 'Provides customer service and support',
    department: 'Customer Support',
    level: 'Entry',
    minSalary: 32000,
    maxSalary: 45000,
    employeeCount: 6,
    status: 'active',
    requirements: 'Communication skills, Problem-solving abilities',
  },
  {
    key: '12',
    id: 'DES-012',
    title: 'Product Manager',
    description: 'Manages product development and lifecycle',
    department: 'Research & Development',
    level: 'Lead',
    minSalary: 80000,
    maxSalary: 110000,
    employeeCount: 0,
    status: 'inactive',
    requirements: 'Product management experience, Technical background',
  },
];

export default function DesignationsPage() {
  const [designations, setDesignations] = useState<Designation[]>(demoDesignations);
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleView = (record: Designation) => {
    setSelectedDesignation(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Designation) => {
    setSelectedDesignation(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Designation) => {
    if (record.employeeCount > 0) {
      message.warning(
        `Cannot delete ${record.title} designation. ${record.employeeCount} employees are assigned to this designation.`
      );
      return;
    }
    message.success(`Designation ${record.title} deleted successfully`);
    setDesignations(designations.filter((des) => des.key !== record.key));
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      const updatedDesignations = designations.map((des) =>
        des.key === selectedDesignation?.key ? { ...des, ...values } : des
      );
      setDesignations(updatedDesignations);
      message.success('Designation updated successfully');
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const handleSaveAdd = () => {
    form.validateFields().then((values) => {
      const newDesignation: Designation = {
        ...values,
        key: String(designations.length + 1),
        id: `DES-${String(designations.length + 1).padStart(3, '0')}`,
        employeeCount: 0,
      };
      setDesignations([...designations, newDesignation]);
      message.success('Designation added successfully');
      setIsAddModalOpen(false);
      form.resetFields();
    });
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Entry: 'blue',
      Junior: 'cyan',
      Mid: 'green',
      Senior: 'orange',
      Lead: 'purple',
      Manager: 'volcano',
      Director: 'magenta',
    };
    return colors[level] || 'default';
  };

  const getActionItems = (record: Designation): MenuProps['items'] => [
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
      disabled: record.employeeCount > 0,
    },
  ];

  const columns: DynamicTableColumn<Designation>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: 'Designation',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (title: string) => (
        <Space>
          <IdcardOutlined />
          <Text strong>{title}</Text>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 140,
      filters: [
        { text: 'Sales', value: 'Sales' },
        { text: 'IT', value: 'IT' },
        { text: 'HR', value: 'HR' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Operations', value: 'Operations' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Customer Support', value: 'Customer Support' },
        { text: 'Research & Development', value: 'Research & Development' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: string) => <Tag color={getLevelColor(level)}>{level}</Tag>,
      filters: [
        { text: 'Entry', value: 'Entry' },
        { text: 'Junior', value: 'Junior' },
        { text: 'Mid', value: 'Mid' },
        { text: 'Senior', value: 'Senior' },
        { text: 'Lead', value: 'Lead' },
        { text: 'Manager', value: 'Manager' },
        { text: 'Director', value: 'Director' },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: 'Salary Range',
      key: 'salaryRange',
      width: 180,
      align: 'right',
      render: (_, record: Designation) => (
        <Text>
          ${record.minSalary.toLocaleString()} - ${record.maxSalary.toLocaleString()}
        </Text>
      ),
      sorter: (a, b) => a.minSalary - b.minSalary,
    },
    {
      title: 'Employees',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      width: 100,
      align: 'center',
      render: (count: number) => <Tag color="blue">{count}</Tag>,
      sorter: (a, b) => a.employeeCount - b.employeeCount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag
          icon={status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={status === 'active' ? 'success' : 'default'}
        >
          {status.toUpperCase()}
        </Tag>
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
      render: (_, record: Designation) => (
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

  // Calculate summary statistics
  const totalDesignations = designations.length;
  const activeDesignations = designations.filter((d) => d.status === 'active').length;
  const totalPositions = designations.reduce((sum, d) => sum + d.employeeCount, 0);
  const avgSalary =
    designations.reduce((sum, d) => sum + (d.minSalary + d.maxSalary) / 2, 0) /
    designations.length;

  const designationForm = (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Designation Title"
            rules={[{ required: true, message: 'Please enter designation title' }]}
          >
            <Input size="large" placeholder="e.g., Sales Manager" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="level"
            label="Level"
            rules={[{ required: true, message: 'Please select level' }]}
          >
            <Select size="large" placeholder="Select level">
              <Option value="Entry">Entry</Option>
              <Option value="Junior">Junior</Option>
              <Option value="Mid">Mid</Option>
              <Option value="Senior">Senior</Option>
              <Option value="Lead">Lead</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Director">Director</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <TextArea rows={3} placeholder="Describe the role and responsibilities..." />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select size="large" placeholder="Select department">
              <Option value="Sales">Sales</Option>
              <Option value="IT">IT</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Operations">Operations</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Customer Support">Customer Support</Option>
              <Option value="Research & Development">Research & Development</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select size="large" placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="minSalary"
            label="Minimum Salary"
            rules={[{ required: true, message: 'Please enter minimum salary' }]}
          >
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="30000"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="maxSalary"
            label="Maximum Salary"
            rules={[{ required: true, message: 'Please enter maximum salary' }]}
          >
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="50000"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="requirements" label="Requirements">
        <TextArea rows={3} placeholder="List the requirements and qualifications..." />
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Title level={2}>
        <IdcardOutlined /> Designations
      </Title>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Designations"
              value={totalDesignations}
              prefix={<IdcardOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Designations"
              value={activeDesignations}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Positions Filled"
              value={totalPositions}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Salary"
              value={avgSalary}
              precision={0}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Designations List"
        columns={columns}
        data={designations}
        showAdd
        addButtonText="Add Designation"
        onAdd={handleAdd}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Designation Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Designation Details - ${selectedDesignation?.title}`}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedDesignation!);
            }}
          >
            Edit Designation
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedDesignation && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text type="secondary">Designation ID</Text>
              <div>
                <Text strong code>
                  {selectedDesignation.id}
                </Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Title</Text>
              <div>
                <Text strong style={{ fontSize: 18 }}>
                  {selectedDesignation.title}
                </Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Description</Text>
              <div>
                <Text>{selectedDesignation.description}</Text>
              </div>
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Department</Text>
                <div>
                  <Text strong>{selectedDesignation.department}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Level</Text>
                <div>
                  <Tag color={getLevelColor(selectedDesignation.level)}>
                    {selectedDesignation.level}
                  </Tag>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Salary Range</Text>
                <div>
                  <Text strong>
                    ${selectedDesignation.minSalary.toLocaleString()} - $
                    {selectedDesignation.maxSalary.toLocaleString()}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Employees in Position</Text>
                <div>
                  <Tag color="blue" style={{ fontSize: 16, padding: '4px 12px' }}>
                    {selectedDesignation.employeeCount}
                  </Tag>
                </div>
              </Col>
            </Row>
            <div>
              <Text type="secondary">Requirements</Text>
              <div>
                <Text>{selectedDesignation.requirements || 'Not specified'}</Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Status</Text>
              <div>
                <Tag
                  icon={
                    selectedDesignation.status === 'active' ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                  color={selectedDesignation.status === 'active' ? 'success' : 'default'}
                >
                  {selectedDesignation.status.toUpperCase()}
                </Tag>
              </div>
            </div>
          </Space>
        )}
      </DynamicModal>

      {/* Edit Designation Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title="Edit Designation"
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>,
        ]}
      >
        {designationForm}
      </DynamicModal>

      {/* Add Designation Modal */}
      <DynamicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        title="Add New Designation"
        footer={[
          <Button key="cancel" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveAdd}>
            Add Designation
          </Button>,
        ]}
      >
        {designationForm}
      </DynamicModal>
    </div>
  );
}
