'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  message,
  Avatar,
  Descriptions,
  Row,
  Col,
  Card,
  Statistic,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface Employee {
  key: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'on-leave' | 'inactive';
  avatar?: string;
  address?: string;
  emergencyContact?: string;
}

// Demo employees data
const demoEmployees: Employee[] = [
  {
    key: '1',
    employeeId: 'EMP-001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Sales',
    designation: 'Store Manager',
    joinDate: '2023-01-15',
    salary: 65000,
    status: 'active',
    address: '123 Main St, San Francisco, CA',
    emergencyContact: '+1 (555) 987-6543',
  },
  {
    key: '2',
    employeeId: 'EMP-002',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Sales',
    designation: 'Sales Associate',
    joinDate: '2023-03-20',
    salary: 45000,
    status: 'active',
    address: '456 Oak Ave, Los Angeles, CA',
    emergencyContact: '+1 (555) 876-5432',
  },
  {
    key: '3',
    employeeId: 'EMP-003',
    name: 'Mike Brown',
    email: 'mike.b@company.com',
    phone: '+1 (555) 345-6789',
    department: 'IT',
    designation: 'System Administrator',
    joinDate: '2022-11-10',
    salary: 75000,
    status: 'active',
    address: '789 Pine Rd, Seattle, WA',
    emergencyContact: '+1 (555) 765-4321',
  },
  {
    key: '4',
    employeeId: 'EMP-004',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    phone: '+1 (555) 456-7890',
    department: 'HR',
    designation: 'HR Manager',
    joinDate: '2022-06-01',
    salary: 70000,
    status: 'on-leave',
    address: '321 Elm St, Portland, OR',
    emergencyContact: '+1 (555) 654-3210',
  },
  {
    key: '5',
    employeeId: 'EMP-005',
    name: 'Robert Taylor',
    email: 'robert.t@company.com',
    phone: '+1 (555) 567-8901',
    department: 'Finance',
    designation: 'Accountant',
    joinDate: '2023-02-14',
    salary: 60000,
    status: 'active',
    address: '654 Cedar Ln, Austin, TX',
    emergencyContact: '+1 (555) 543-2109',
  },
  {
    key: '6',
    employeeId: 'EMP-006',
    name: 'Lisa Anderson',
    email: 'lisa.a@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Sales',
    designation: 'Cashier',
    joinDate: '2023-07-01',
    salary: 35000,
    status: 'active',
    address: '987 Maple Dr, Denver, CO',
    emergencyContact: '+1 (555) 432-1098',
  },
  {
    key: '7',
    employeeId: 'EMP-007',
    name: 'David Wilson',
    email: 'david.w@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Operations',
    designation: 'Warehouse Manager',
    joinDate: '2022-08-15',
    salary: 55000,
    status: 'active',
    address: '147 Birch St, Phoenix, AZ',
    emergencyContact: '+1 (555) 321-0987',
  },
  {
    key: '8',
    employeeId: 'EMP-008',
    name: 'Jennifer Martinez',
    email: 'jennifer.m@company.com',
    phone: '+1 (555) 890-1234',
    department: 'Marketing',
    designation: 'Marketing Coordinator',
    joinDate: '2023-04-10',
    salary: 50000,
    status: 'inactive',
    address: '258 Spruce Ave, Miami, FL',
    emergencyContact: '+1 (555) 210-9876',
  },
];

export default function EmployeesListPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>(demoEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on-leave':
        return 'warning';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleView = (record: Employee) => {
    setSelectedEmployee(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Employee) => {
    message.info(`Editing employee ${record.name}`);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = (record: Employee) => {
    if (record.status === 'active') {
      message.warning('Cannot delete active employees. Please deactivate first.');
      return;
    }
    message.success(`Employee ${record.name} deleted successfully`);
    setEmployees(employees.filter((emp) => emp.key !== record.key));
  };

  const getActionItems = (record: Employee): MenuProps['items'] => [
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
      disabled: record.status === 'active',
    },
  ];

  const columns: DynamicTableColumn<Employee>[] = [
    {
      title: 'Employee',
      key: 'employee',
      width: 250,
      render: (_, record: Employee) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" code style={{ fontSize: 12 }}>
              {record.employeeId}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      width: 220,
      render: (_, record: Employee) => (
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
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 130,
      filters: [
        { text: 'Sales', value: 'Sales' },
        { text: 'IT', value: 'IT' },
        { text: 'HR', value: 'HR' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Operations', value: 'Operations' },
        { text: 'Marketing', value: 'Marketing' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: 180,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      width: 120,
      align: 'right',
      render: (salary: number) => `$${salary.toLocaleString()}`,
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase().replace('-', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'On Leave', value: 'on-leave' },
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
      render: (_, record: Employee) => (
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
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const onLeave = employees.filter((e) => e.status === 'on-leave').length;
  const totalSalaryExpense = employees
    .filter((e) => e.status === 'active')
    .reduce((sum, e) => sum + e.salary, 0);

  return (
    <div>
      <Title level={2}>
        <TeamOutlined /> All Employees
      </Title>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Employees"
              value={activeEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="On Leave"
              value={onLeave}
              prefix={<IdcardOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Payroll"
              value={totalSalaryExpense / 12}
              precision={0}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Employee List"
        columns={columns}
        data={employees}
        showAdd
        addButtonText="Add Employee"
        onAdd={() => router.push('/dashboard/hrm/add-employee')}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Employee Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Employee Details - ${selectedEmployee?.name}`}
        width={800}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedEmployee!);
            }}
          >
            Edit Employee
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedEmployee && (
          <div>
            <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: 24 }}>
              <Avatar size={80} icon={<UserOutlined />} src={selectedEmployee.avatar} />
              <Title level={4} style={{ margin: 0 }}>
                {selectedEmployee.name}
              </Title>
              <Text type="secondary">{selectedEmployee.designation}</Text>
              <Tag color={getStatusColor(selectedEmployee.status)}>
                {selectedEmployee.status.toUpperCase().replace('-', ' ')}
              </Tag>
            </Space>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Employee ID">{selectedEmployee.employeeId}</Descriptions.Item>
              <Descriptions.Item label="Join Date">
                {new Date(selectedEmployee.joinDate).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{selectedEmployee.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedEmployee.phone}</Descriptions.Item>
              <Descriptions.Item label="Department">{selectedEmployee.department}</Descriptions.Item>
              <Descriptions.Item label="Designation">{selectedEmployee.designation}</Descriptions.Item>
              <Descriptions.Item label="Annual Salary">
                ${selectedEmployee.salary.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Monthly Salary">
                ${(selectedEmployee.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                {selectedEmployee.address || 'Not provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Emergency Contact" span={2}>
                {selectedEmployee.emergencyContact || 'Not provided'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </DynamicModal>
    </div>
  );
}
