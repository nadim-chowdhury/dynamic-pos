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
  Form,
  InputNumber,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  MoreOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import DynamicModal from '../../../components/DynamicModal';

const { Title, Text } = Typography;

interface SalaryRecord {
  key: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  basicSalary: number;
  houseAllowance: number;
  transportAllowance: number;
  medicalAllowance: number;
  otherAllowances: number;
  taxDeduction: number;
  insuranceDeduction: number;
  otherDeductions: number;
  netSalary: number;
  avatar?: string;
}

// Demo salary data
const demoSalaryRecords: SalaryRecord[] = [
  {
    key: '1',
    employeeId: 'EMP-001',
    employeeName: 'John Doe',
    department: 'Sales',
    designation: 'Store Manager',
    basicSalary: 65000,
    houseAllowance: 8000,
    transportAllowance: 3000,
    medicalAllowance: 2000,
    otherAllowances: 1000,
    taxDeduction: 9500,
    insuranceDeduction: 1500,
    otherDeductions: 500,
    netSalary: 67500,
  },
  {
    key: '2',
    employeeId: 'EMP-002',
    employeeName: 'Sarah Johnson',
    department: 'Sales',
    designation: 'Sales Associate',
    basicSalary: 45000,
    houseAllowance: 5000,
    transportAllowance: 2000,
    medicalAllowance: 1500,
    otherAllowances: 500,
    taxDeduction: 6000,
    insuranceDeduction: 1200,
    otherDeductions: 300,
    netSalary: 46500,
  },
  {
    key: '3',
    employeeId: 'EMP-003',
    employeeName: 'Mike Brown',
    department: 'IT',
    designation: 'System Administrator',
    basicSalary: 75000,
    houseAllowance: 10000,
    transportAllowance: 4000,
    medicalAllowance: 2500,
    otherAllowances: 1500,
    taxDeduction: 12000,
    insuranceDeduction: 2000,
    otherDeductions: 500,
    netSalary: 78500,
  },
  {
    key: '4',
    employeeId: 'EMP-004',
    employeeName: 'Emily Davis',
    department: 'HR',
    designation: 'HR Manager',
    basicSalary: 70000,
    houseAllowance: 9000,
    transportAllowance: 3500,
    medicalAllowance: 2000,
    otherAllowances: 1200,
    taxDeduction: 10500,
    insuranceDeduction: 1800,
    otherDeductions: 400,
    netSalary: 73000,
  },
  {
    key: '5',
    employeeId: 'EMP-005',
    employeeName: 'Robert Taylor',
    department: 'Finance',
    designation: 'Accountant',
    basicSalary: 60000,
    houseAllowance: 7000,
    transportAllowance: 2500,
    medicalAllowance: 1800,
    otherAllowances: 1000,
    taxDeduction: 8500,
    insuranceDeduction: 1500,
    otherDeductions: 350,
    netSalary: 61950,
  },
  {
    key: '6',
    employeeId: 'EMP-006',
    employeeName: 'Lisa Anderson',
    department: 'Sales',
    designation: 'Cashier',
    basicSalary: 35000,
    houseAllowance: 4000,
    transportAllowance: 1500,
    medicalAllowance: 1000,
    otherAllowances: 500,
    taxDeduction: 4500,
    insuranceDeduction: 900,
    otherDeductions: 200,
    netSalary: 36400,
  },
  {
    key: '7',
    employeeId: 'EMP-007',
    employeeName: 'David Wilson',
    department: 'Operations',
    designation: 'Warehouse Manager',
    basicSalary: 55000,
    houseAllowance: 6500,
    transportAllowance: 2500,
    medicalAllowance: 1500,
    otherAllowances: 800,
    taxDeduction: 7500,
    insuranceDeduction: 1400,
    otherDeductions: 300,
    netSalary: 57100,
  },
  {
    key: '8',
    employeeId: 'EMP-008',
    employeeName: 'Jennifer Martinez',
    department: 'Marketing',
    designation: 'Marketing Coordinator',
    basicSalary: 50000,
    houseAllowance: 6000,
    transportAllowance: 2000,
    medicalAllowance: 1500,
    otherAllowances: 700,
    taxDeduction: 7000,
    insuranceDeduction: 1300,
    otherDeductions: 250,
    netSalary: 51650,
  },
];

export default function SalaryManagementPage() {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>(demoSalaryRecords);
  const [selectedRecord, setSelectedRecord] = useState<SalaryRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const calculateNetSalary = (values: any): number => {
    const totalAllowances =
      (values.houseAllowance || 0) +
      (values.transportAllowance || 0) +
      (values.medicalAllowance || 0) +
      (values.otherAllowances || 0);

    const totalDeductions =
      (values.taxDeduction || 0) +
      (values.insuranceDeduction || 0) +
      (values.otherDeductions || 0);

    return (values.basicSalary || 0) + totalAllowances - totalDeductions;
  };

  const handleView = (record: SalaryRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: SalaryRecord) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      const netSalary = calculateNetSalary(values);
      const updatedRecords = salaryRecords.map((record) =>
        record.key === selectedRecord?.key
          ? { ...record, ...values, netSalary }
          : record
      );
      setSalaryRecords(updatedRecords);
      message.success('Salary updated successfully');
      setIsEditModalOpen(false);
      form.resetFields();
    });
  };

  const getActionItems = (record: SalaryRecord): MenuProps['items'] => [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: () => handleView(record),
    },
    {
      key: 'edit',
      label: 'Edit Salary',
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
    },
  ];

  const columns: DynamicTableColumn<SalaryRecord>[] = [
    {
      title: 'Employee',
      key: 'employee',
      width: 220,
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          <div>
            <Text strong>{record.employeeName}</Text>
            <br />
            <Text type="secondary" code style={{ fontSize: 12 }}>
              {record.employeeId}
            </Text>
          </div>
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
      title: 'Basic Salary',
      dataIndex: 'basicSalary',
      key: 'basicSalary',
      width: 130,
      align: 'right',
      render: (salary: number) => `$${salary.toLocaleString()}`,
      sorter: (a, b) => a.basicSalary - b.basicSalary,
    },
    {
      title: 'Total Allowances',
      key: 'totalAllowances',
      width: 150,
      align: 'right',
      render: (_, record) => {
        const total =
          record.houseAllowance +
          record.transportAllowance +
          record.medicalAllowance +
          record.otherAllowances;
        return (
          <Text style={{ color: '#52c41a' }}>
            <RiseOutlined /> ${total.toLocaleString()}
          </Text>
        );
      },
      sorter: (a, b) => {
        const totalA = a.houseAllowance + a.transportAllowance + a.medicalAllowance + a.otherAllowances;
        const totalB = b.houseAllowance + b.transportAllowance + b.medicalAllowance + b.otherAllowances;
        return totalA - totalB;
      },
    },
    {
      title: 'Total Deductions',
      key: 'totalDeductions',
      width: 150,
      align: 'right',
      render: (_, record) => {
        const total =
          record.taxDeduction +
          record.insuranceDeduction +
          record.otherDeductions;
        return (
          <Text style={{ color: '#ff4d4f' }}>
            <FallOutlined /> ${total.toLocaleString()}
          </Text>
        );
      },
      sorter: (a, b) => {
        const totalA = a.taxDeduction + a.insuranceDeduction + a.otherDeductions;
        const totalB = b.taxDeduction + b.insuranceDeduction + b.otherDeductions;
        return totalA - totalB;
      },
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      key: 'netSalary',
      width: 140,
      align: 'right',
      render: (salary: number) => (
        <Text strong style={{ fontSize: 14, color: '#1677ff' }}>
          ${salary.toLocaleString()}
        </Text>
      ),
      sorter: (a, b) => a.netSalary - b.netSalary,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
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
  const totalEmployees = salaryRecords.length;
  const totalBasicSalary = salaryRecords.reduce((sum, r) => sum + r.basicSalary, 0);
  const totalAllowances = salaryRecords.reduce(
    (sum, r) =>
      sum +
      r.houseAllowance +
      r.transportAllowance +
      r.medicalAllowance +
      r.otherAllowances,
    0
  );
  const totalDeductions = salaryRecords.reduce(
    (sum, r) => sum + r.taxDeduction + r.insuranceDeduction + r.otherDeductions,
    0
  );
  const totalNetSalary = salaryRecords.reduce((sum, r) => sum + r.netSalary, 0);

  const salaryForm = (
    <Form form={form} layout="vertical">
      <Title level={5}>Basic Salary</Title>
      <Form.Item
        name="basicSalary"
        label="Basic Salary"
        rules={[{ required: true, message: 'Please enter basic salary' }]}
      >
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          min={0}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Title level={5} style={{ marginTop: 24 }}>
        Allowances
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="houseAllowance" label="House Allowance">
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="transportAllowance" label="Transport Allowance">
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="medicalAllowance" label="Medical Allowance">
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="otherAllowances" label="Other Allowances">
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 24 }}>
        Deductions
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="taxDeduction" label="Tax Deduction">
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="insuranceDeduction" label="Insurance Deduction">
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="otherDeductions" label="Other Deductions">
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          min={0}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Title level={2}>
        <DollarOutlined /> Salary Management
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
              title="Total Basic Salary"
              value={totalBasicSalary}
              precision={0}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Allowances"
              value={totalAllowances}
              precision={0}
              prefix="$"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Net Salary"
              value={totalNetSalary}
              precision={0}
              prefix="$"
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
      </Row>

      <DynamicTable
        title="Employee Salary Records"
        columns={columns}
        data={salaryRecords}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Salary Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Salary Details - ${selectedRecord?.employeeName}`}
        width={800}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedRecord!);
            }}
          >
            Edit Salary
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div>
            <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: 24 }}>
              <Avatar size={64} icon={<UserOutlined />} src={selectedRecord.avatar} />
              <Title level={4} style={{ margin: 0 }}>
                {selectedRecord.employeeName}
              </Title>
              <Text type="secondary">{selectedRecord.designation}</Text>
              <Tag color="blue">{selectedRecord.department}</Tag>
            </Space>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Employee ID" span={2}>
                <Text code>{selectedRecord.employeeId}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Basic Salary" span={2}>
                <Text strong style={{ fontSize: 16 }}>
                  ${selectedRecord.basicSalary.toLocaleString()}
                </Text>
              </Descriptions.Item>

              <Descriptions.Item label="House Allowance">
                ${selectedRecord.houseAllowance.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Transport Allowance">
                ${selectedRecord.transportAllowance.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Medical Allowance">
                ${selectedRecord.medicalAllowance.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Other Allowances">
                ${selectedRecord.otherAllowances.toLocaleString()}
              </Descriptions.Item>

              <Descriptions.Item label="Total Allowances" span={2}>
                <Text strong style={{ color: '#52c41a' }}>
                  $
                  {(
                    selectedRecord.houseAllowance +
                    selectedRecord.transportAllowance +
                    selectedRecord.medicalAllowance +
                    selectedRecord.otherAllowances
                  ).toLocaleString()}
                </Text>
              </Descriptions.Item>

              <Descriptions.Item label="Tax Deduction">
                ${selectedRecord.taxDeduction.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Insurance Deduction">
                ${selectedRecord.insuranceDeduction.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Other Deductions" span={2}>
                ${selectedRecord.otherDeductions.toLocaleString()}
              </Descriptions.Item>

              <Descriptions.Item label="Total Deductions" span={2}>
                <Text strong style={{ color: '#ff4d4f' }}>
                  $
                  {(
                    selectedRecord.taxDeduction +
                    selectedRecord.insuranceDeduction +
                    selectedRecord.otherDeductions
                  ).toLocaleString()}
                </Text>
              </Descriptions.Item>

              <Descriptions.Item label="Net Salary" span={2}>
                <Text strong style={{ fontSize: 18, color: '#1677ff' }}>
                  ${selectedRecord.netSalary.toLocaleString()}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </DynamicModal>

      {/* Edit Salary Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title={`Edit Salary - ${selectedRecord?.employeeName}`}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>,
        ]}
      >
        {salaryForm}
      </DynamicModal>
    </div>
  );
}
