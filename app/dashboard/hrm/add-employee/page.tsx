'use client';

import React, { useState } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Space,
  message,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  SaveOutlined,
  CloseOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function AddEmployeePage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Employee Data:', {
        ...values,
        avatar: fileList.length > 0 ? fileList[0] : null,
        joinDate: values.joinDate?.format('YYYY-MM-DD'),
      });

      message.success('Employee added successfully!');
      setLoading(false);
      router.push('/dashboard/hrm/employees-list');
    }, 1000);
  };

  const handleCancel = () => {
    router.push('/dashboard/hrm/employees-list');
  };

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  return (
    <div style={{ maxWidth: 1200 }}>
      <Title level={2}>
        <UserAddOutlined /> Add New Employee
      </Title>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'active',
          }}
        >
          {/* Personal Information */}
          <Title level={4}>Personal Information</Title>
          <Divider />

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="employeeId"
                label="Employee ID"
                rules={[{ required: true, message: 'Please enter employee ID' }]}
              >
                <Input size="large" placeholder="EMP-001" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input size="large" placeholder="John" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input size="large" placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' },
                ]}
              >
                <Input size="large" placeholder="john.doe@company.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input size="large" placeholder="+1 (555) 123-4567" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="address" label="Address">
                <TextArea rows={3} placeholder="123 Main St, San Francisco, CA" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="emergencyContact" label="Emergency Contact">
                <Input size="large" placeholder="+1 (555) 987-6543" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="avatar" label="Profile Picture">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Photo</div>
                </div>
              )}
            </Upload>
            <Text type="secondary">Recommended size: 200x200px</Text>
          </Form.Item>

          {/* Employment Details */}
          <Title level={4} style={{ marginTop: 32 }}>
            Employment Details
          </Title>
          <Divider />

          <Row gutter={16}>
            <Col xs={24} md={8}>
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
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="designation"
                label="Designation"
                rules={[{ required: true, message: 'Please select designation' }]}
              >
                <Select size="large" placeholder="Select designation">
                  <Option value="Store Manager">Store Manager</Option>
                  <Option value="Sales Associate">Sales Associate</Option>
                  <Option value="Cashier">Cashier</Option>
                  <Option value="System Administrator">System Administrator</Option>
                  <Option value="HR Manager">HR Manager</Option>
                  <Option value="Accountant">Accountant</Option>
                  <Option value="Warehouse Manager">Warehouse Manager</Option>
                  <Option value="Marketing Coordinator">Marketing Coordinator</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="joinDate"
                label="Join Date"
                rules={[{ required: true, message: 'Please select join date' }]}
              >
                <DatePicker size="large" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="salary"
                label="Annual Salary"
                rules={[{ required: true, message: 'Please enter salary' }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  min={0}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="65000"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select size="large">
                  <Option value="active">Active</Option>
                  <Option value="on-leave">On Leave</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Additional Information */}
          <Title level={4} style={{ marginTop: 32 }}>
            Additional Information
          </Title>
          <Divider />

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="bankName" label="Bank Name">
                <Input size="large" placeholder="Bank of America" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="bankAccount" label="Bank Account Number">
                <Input size="large" placeholder="1234567890" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="taxId" label="Tax ID / SSN">
                <Input size="large" placeholder="123-45-6789" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="insuranceNumber" label="Insurance Number">
                <Input size="large" placeholder="INS-123456" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Notes">
            <TextArea rows={4} placeholder="Any additional notes or comments..." />
          </Form.Item>

          <Divider />

          {/* Form Actions */}
          <Form.Item>
            <Space size="middle">
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                size="large"
                loading={loading}
              >
                Add Employee
              </Button>
              <Button
                icon={<CloseOutlined />}
                size="large"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
