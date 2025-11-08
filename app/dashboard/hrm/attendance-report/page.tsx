'use client';

import React, { useState } from 'react';
import {
  Typography,
  Card,
  DatePicker,
  Space,
  Button,
  Tag,
  Avatar,
  Select,
  Row,
  Col,
  Statistic,
  Progress,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  DownloadOutlined,
  PrinterOutlined,
  MinusCircleOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import DynamicTable, { DynamicTableColumn } from '../../../components/DynamicTable';
import dayjs, { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface AttendanceRecord {
  key: string;
  date: string;
  employeeId: string;
  employeeName: string;
  department: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
  checkIn?: string;
  checkOut?: string;
  workingHours?: number;
  notes?: string;
  avatar?: string;
}

// Demo attendance data for last 7 days
const demoAttendanceRecords: AttendanceRecord[] = [
  // Today
  { key: '1', date: dayjs().format('YYYY-MM-DD'), employeeId: 'EMP-001', employeeName: 'John Doe', department: 'Sales', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '2', date: dayjs().format('YYYY-MM-DD'), employeeId: 'EMP-002', employeeName: 'Sarah Johnson', department: 'Sales', status: 'present', checkIn: '09:15', checkOut: '18:10', workingHours: 8.9 },
  { key: '3', date: dayjs().format('YYYY-MM-DD'), employeeId: 'EMP-003', employeeName: 'Mike Brown', department: 'IT', status: 'late', checkIn: '10:30', checkOut: '18:30', workingHours: 8, notes: 'Traffic delay' },
  { key: '4', date: dayjs().format('YYYY-MM-DD'), employeeId: 'EMP-004', employeeName: 'Emily Davis', department: 'HR', status: 'leave', notes: 'Sick leave' },
  { key: '5', date: dayjs().format('YYYY-MM-DD'), employeeId: 'EMP-005', employeeName: 'Robert Taylor', department: 'Finance', status: 'present', checkIn: '09:00', checkOut: '17:45', workingHours: 8.75 },

  // Yesterday
  { key: '6', date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-001', employeeName: 'John Doe', department: 'Sales', status: 'present', checkIn: '08:55', checkOut: '18:05', workingHours: 9.1 },
  { key: '7', date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-002', employeeName: 'Sarah Johnson', department: 'Sales', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '8', date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-003', employeeName: 'Mike Brown', department: 'IT', status: 'present', checkIn: '09:10', checkOut: '18:15', workingHours: 9 },
  { key: '9', date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-004', employeeName: 'Emily Davis', department: 'HR', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '10', date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-005', employeeName: 'Robert Taylor', department: 'Finance', status: 'half-day', checkIn: '09:00', checkOut: '13:00', workingHours: 4, notes: 'Personal work' },

  // 2 days ago
  { key: '11', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-001', employeeName: 'John Doe', department: 'Sales', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '12', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-002', employeeName: 'Sarah Johnson', department: 'Sales', status: 'late', checkIn: '10:00', checkOut: '18:30', workingHours: 8.5, notes: 'Doctor appointment' },
  { key: '13', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-003', employeeName: 'Mike Brown', department: 'IT', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '14', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-004', employeeName: 'Emily Davis', department: 'HR', status: 'absent', notes: 'Unplanned absence' },
  { key: '15', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-005', employeeName: 'Robert Taylor', department: 'Finance', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },

  // 3 days ago
  { key: '16', date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-001', employeeName: 'John Doe', department: 'Sales', status: 'present', checkIn: '09:00', checkOut: '18:15', workingHours: 9.25 },
  { key: '17', date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-002', employeeName: 'Sarah Johnson', department: 'Sales', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '18', date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-003', employeeName: 'Mike Brown', department: 'IT', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '19', date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-004', employeeName: 'Emily Davis', department: 'HR', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '20', date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-005', employeeName: 'Robert Taylor', department: 'Finance', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },

  // 4 days ago
  { key: '21', date: dayjs().subtract(4, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-006', employeeName: 'Lisa Anderson', department: 'Sales', status: 'present', checkIn: '09:00', checkOut: '18:00', workingHours: 9 },
  { key: '22', date: dayjs().subtract(4, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-007', employeeName: 'David Wilson', department: 'Operations', status: 'present', checkIn: '08:45', checkOut: '17:50', workingHours: 9 },
  { key: '23', date: dayjs().subtract(4, 'day').format('YYYY-MM-DD'), employeeId: 'EMP-008', employeeName: 'Jennifer Martinez', department: 'Marketing', status: 'late', checkIn: '10:15', checkOut: '18:15', workingHours: 8, notes: 'Family emergency' },
];

export default function AttendanceReportPage() {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(7, 'days'),
    dayjs(),
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [attendanceData] = useState<AttendanceRecord[]>(demoAttendanceRecords);

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      case 'half-day':
        return 'processing';
      case 'leave':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircleOutlined />;
      case 'absent':
        return <CloseCircleOutlined />;
      case 'late':
        return <ClockCircleOutlined />;
      case 'half-day':
        return <MinusCircleOutlined />;
      case 'leave':
        return <CalendarOutlined />;
      default:
        return null;
    }
  };

  // Filter data based on selections
  const filteredData = attendanceData.filter((record) => {
    const dateInRange =
      dayjs(record.date).isAfter(dateRange[0].subtract(1, 'day')) &&
      dayjs(record.date).isBefore(dateRange[1].add(1, 'day'));
    const departmentMatch = selectedDepartment === 'all' || record.department === selectedDepartment;
    const statusMatch = selectedStatus === 'all' || record.status === selectedStatus;
    return dateInRange && departmentMatch && statusMatch;
  });

  const columns: DynamicTableColumn<AttendanceRecord>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Employee',
      key: 'employee',
      width: 200,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: AttendanceRecord['status']) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status.toUpperCase().replace('-', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Present', value: 'present' },
        { text: 'Absent', value: 'absent' },
        { text: 'Late', value: 'late' },
        { text: 'Half Day', value: 'half-day' },
        { text: 'Leave', value: 'leave' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
      width: 100,
      align: 'center',
      render: (time: string | undefined) => time || '-',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
      width: 100,
      align: 'center',
      render: (time: string | undefined) => time || '-',
    },
    {
      title: 'Working Hours',
      dataIndex: 'workingHours',
      key: 'workingHours',
      width: 120,
      align: 'right',
      render: (hours: number | undefined) => (hours ? `${hours.toFixed(1)} hrs` : '-'),
      sorter: (a, b) => (a.workingHours || 0) - (b.workingHours || 0),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      width: 200,
      ellipsis: true,
      render: (notes: string | undefined) => notes || '-',
    },
  ];

  // Calculate summary statistics
  const totalRecords = filteredData.length;
  const presentCount = filteredData.filter((r) => r.status === 'present').length;
  const absentCount = filteredData.filter((r) => r.status === 'absent').length;
  const lateCount = filteredData.filter((r) => r.status === 'late').length;
  const halfDayCount = filteredData.filter((r) => r.status === 'half-day').length;
  const leaveCount = filteredData.filter((r) => r.status === 'leave').length;
  const attendanceRate = totalRecords > 0 ? ((presentCount + lateCount) / totalRecords) * 100 : 0;
  const avgWorkingHours =
    filteredData.filter((r) => r.workingHours).reduce((sum, r) => sum + (r.workingHours || 0), 0) /
    filteredData.filter((r) => r.workingHours).length;

  return (
    <div>
      <Title level={2}>
        <CalendarOutlined /> Attendance Report
      </Title>

      {/* Filters */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={10}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Date Range</Text>
              <RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs])}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                size="large"
              />
            </Space>
          </Col>
          <Col xs={24} md={5}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Department</Text>
              <Select
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="all">All Departments</Option>
                <Option value="Sales">Sales</Option>
                <Option value="IT">IT</Option>
                <Option value="HR">HR</Option>
                <Option value="Finance">Finance</Option>
                <Option value="Operations">Operations</Option>
                <Option value="Marketing">Marketing</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} md={5}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Status</Text>
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="all">All Status</Option>
                <Option value="present">Present</Option>
                <Option value="absent">Absent</Option>
                <Option value="late">Late</Option>
                <Option value="half-day">Half Day</Option>
                <Option value="leave">Leave</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} md={4}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>&nbsp;</Text>
              <Space style={{ width: '100%' }}>
                <Button icon={<DownloadOutlined />}>Export</Button>
                <Button icon={<PrinterOutlined />}>Print</Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Present"
              value={presentCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${totalRecords}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Absent"
              value={absentCount}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
              suffix={`/ ${totalRecords}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Late"
              value={lateCount}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix={`/ ${totalRecords}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Attendance Rate"
              value={attendanceRate}
              precision={1}
              suffix="%"
              prefix={<PercentageOutlined />}
              valueStyle={{ color: attendanceRate >= 80 ? '#52c41a' : '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={8}>
          <Card title="Status Breakdown">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>Half Day</Text>
                  <Text strong>{halfDayCount}</Text>
                </Space>
                <Progress
                  percent={(halfDayCount / totalRecords) * 100}
                  strokeColor="#1677ff"
                  showInfo={false}
                />
              </div>
              <div>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>Leave</Text>
                  <Text strong>{leaveCount}</Text>
                </Space>
                <Progress
                  percent={(leaveCount / totalRecords) * 100}
                  strokeColor="#8c8c8c"
                  showInfo={false}
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Average Working Hours">
            <Statistic
              value={avgWorkingHours || 0}
              precision={1}
              suffix="hours"
              valueStyle={{ fontSize: 32, color: '#1677ff' }}
            />
            <Text type="secondary">Per day (for present employees)</Text>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Attendance Overview">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text type="secondary">Total Records</Text>
                <div>
                  <Text strong style={{ fontSize: 24 }}>
                    {totalRecords}
                  </Text>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Date Range</Text>
                <div>
                  <Text strong>
                    {dateRange[0].format('MMM DD')} - {dateRange[1].format('MMM DD, YYYY')}
                  </Text>
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Attendance Records Table */}
      <DynamicTable
        title="Attendance Records"
        columns={columns}
        data={filteredData}
        rowKey="key"
        scroll={{ x: 1200 }}
      />
    </div>
  );
}
