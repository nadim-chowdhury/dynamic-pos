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
  message,
  Row,
  Col,
  Statistic,
  Table,
  Input,
  TimePicker,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  SaveOutlined,
  SearchOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface Employee {
  key: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  avatar?: string;
}

interface AttendanceRecord {
  employeeId: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
  checkIn?: Dayjs | null;
  checkOut?: Dayjs | null;
  notes?: string;
}

// Demo employees data
const demoEmployees: Employee[] = [
  { key: '1', employeeId: 'EMP-001', name: 'John Doe', department: 'Sales', designation: 'Store Manager' },
  { key: '2', employeeId: 'EMP-002', name: 'Sarah Johnson', department: 'Sales', designation: 'Sales Associate' },
  { key: '3', employeeId: 'EMP-003', name: 'Mike Brown', department: 'IT', designation: 'System Administrator' },
  { key: '4', employeeId: 'EMP-004', name: 'Emily Davis', department: 'HR', designation: 'HR Manager' },
  { key: '5', employeeId: 'EMP-005', name: 'Robert Taylor', department: 'Finance', designation: 'Accountant' },
  { key: '6', employeeId: 'EMP-006', name: 'Lisa Anderson', department: 'Sales', designation: 'Cashier' },
  { key: '7', employeeId: 'EMP-007', name: 'David Wilson', department: 'Operations', designation: 'Warehouse Manager' },
  { key: '8', employeeId: 'EMP-008', name: 'Jennifer Martinez', department: 'Marketing', designation: 'Marketing Coordinator' },
];

export default function MarkAttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceRecord>>({});
  const [searchText, setSearchText] = useState('');

  const handleStatusChange = (employeeId: string, status: AttendanceRecord['status']) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        employeeId,
        status,
        checkIn: status === 'present' || status === 'late' || status === 'half-day'
          ? prev[employeeId]?.checkIn || dayjs()
          : null,
        checkOut: status === 'present' || status === 'half-day'
          ? prev[employeeId]?.checkOut || null
          : null,
      },
    }));
  };

  const handleCheckInChange = (employeeId: string, time: Dayjs | null) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        employeeId,
        checkIn: time,
      },
    }));
  };

  const handleCheckOutChange = (employeeId: string, time: Dayjs | null) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        employeeId,
        checkOut: time,
      },
    }));
  };

  const handleNotesChange = (employeeId: string, notes: string) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        employeeId,
        notes,
      },
    }));
  };

  const handleMarkAllPresent = () => {
    const newRecords: Record<string, AttendanceRecord> = {};
    filteredEmployees.forEach((emp) => {
      newRecords[emp.employeeId] = {
        employeeId: emp.employeeId,
        status: 'present',
        checkIn: dayjs().hour(9).minute(0),
        checkOut: dayjs().hour(18).minute(0),
      };
    });
    setAttendanceRecords(newRecords);
    message.success('All employees marked as present');
  };

  const handleSaveAttendance = () => {
    const recordCount = Object.keys(attendanceRecords).length;
    if (recordCount === 0) {
      message.warning('Please mark attendance for at least one employee');
      return;
    }

    console.log('Attendance Records:', {
      date: selectedDate.format('YYYY-MM-DD'),
      records: attendanceRecords,
    });

    message.success(`Attendance saved successfully for ${recordCount} employees`);
  };

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

  const filteredEmployees = demoEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Employee> = [
    {
      title: 'Employee',
      key: 'employee',
      width: 250,
      render: (_, record) => (
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
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 130,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: 180,
    },
    {
      title: 'Status',
      key: 'status',
      width: 180,
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          placeholder="Select status"
          value={attendanceRecords[record.employeeId]?.status}
          onChange={(value) => handleStatusChange(record.employeeId, value)}
        >
          <Option value="present">
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              Present
            </Space>
          </Option>
          <Option value="absent">
            <Space>
              <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
              Absent
            </Space>
          </Option>
          <Option value="late">
            <Space>
              <ClockCircleOutlined style={{ color: '#faad14' }} />
              Late
            </Space>
          </Option>
          <Option value="half-day">
            <Space>
              <MinusCircleOutlined style={{ color: '#1677ff' }} />
              Half Day
            </Space>
          </Option>
          <Option value="leave">
            <Space>
              <CalendarOutlined style={{ color: '#8c8c8c' }} />
              Leave
            </Space>
          </Option>
        </Select>
      ),
    },
    {
      title: 'Check In',
      key: 'checkIn',
      width: 150,
      render: (_, record) => (
        <TimePicker
          style={{ width: '100%' }}
          format="HH:mm"
          value={attendanceRecords[record.employeeId]?.checkIn}
          onChange={(time) => handleCheckInChange(record.employeeId, time)}
          disabled={
            !attendanceRecords[record.employeeId] ||
            attendanceRecords[record.employeeId].status === 'absent' ||
            attendanceRecords[record.employeeId].status === 'leave'
          }
        />
      ),
    },
    {
      title: 'Check Out',
      key: 'checkOut',
      width: 150,
      render: (_, record) => (
        <TimePicker
          style={{ width: '100%' }}
          format="HH:mm"
          value={attendanceRecords[record.employeeId]?.checkOut}
          onChange={(time) => handleCheckOutChange(record.employeeId, time)}
          disabled={
            !attendanceRecords[record.employeeId] ||
            attendanceRecords[record.employeeId].status === 'absent' ||
            attendanceRecords[record.employeeId].status === 'leave'
          }
        />
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      width: 200,
      render: (_, record) => (
        <Input
          placeholder="Add notes..."
          value={attendanceRecords[record.employeeId]?.notes}
          onChange={(e) => handleNotesChange(record.employeeId, e.target.value)}
        />
      ),
    },
  ];

  // Calculate summary statistics
  const totalEmployees = filteredEmployees.length;
  const presentCount = Object.values(attendanceRecords).filter((r) => r.status === 'present').length;
  const absentCount = Object.values(attendanceRecords).filter((r) => r.status === 'absent').length;
  const lateCount = Object.values(attendanceRecords).filter((r) => r.status === 'late').length;

  return (
    <div>
      <Title level={2}>
        <CalendarOutlined /> Mark Attendance
      </Title>

      {/* Date Selection and Actions */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={8}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Select Date</Text>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date || dayjs())}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                size="large"
              />
            </Space>
          </Col>
          <Col xs={24} md={16}>
            <Space wrap style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button type="default" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveAttendance} size="large">
                Save Attendance
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Present"
              value={presentCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
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
            />
          </Card>
        </Col>
      </Row>

      {/* Attendance Table */}
      <Card
        title="Employee Attendance"
        extra={
          <Input
            placeholder="Search employees..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
        }
      >
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
}
