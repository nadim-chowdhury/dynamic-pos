'use client';

import React, { useState } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  Space,
  message,
  Row,
  Col,
  InputNumber,
  Upload,
  Radio,
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  ShopOutlined,
  DollarOutlined,
  MailOutlined,
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Settings {
  // Business Settings
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  taxId: string;
  currency: string;
  timezone: string;
  dateFormat: string;

  // Receipt Settings
  receiptFooter: string;
  showLogo: boolean;
  showTax: boolean;

  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;

  // Tax Settings
  enableTax: boolean;
  defaultTaxRate: number;

  // Other
  language: string;
  autoBackup: boolean;
}

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('business');

  const [settings, setSettings] = useState<Settings>({
    businessName: 'Dynamic POS Store',
    businessEmail: 'contact@dynamicpos.com',
    businessPhone: '+1 (555) 123-4567',
    businessAddress: '123 Business Street, San Francisco, CA 94105',
    taxId: '12-3456789',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    receiptFooter: 'Thank you for your business!',
    showLogo: true,
    showTax: true,
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlert: true,
    lowStockThreshold: 10,
    enableTax: true,
    defaultTaxRate: 10,
    language: 'en',
    autoBackup: true,
  });

  const handleSave = (values: any) => {
    setSettings({ ...settings, ...values });
    message.success('Settings saved successfully');
  };

  return (
    <div style={{ maxWidth: 1200 }}>
      <Title level={2}>Settings</Title>

      <Row gutter={[24, 24]}>
        {/* Settings Navigation */}
        <Col xs={24} md={6}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                block
                type={activeTab === 'business' ? 'primary' : 'text'}
                icon={<ShopOutlined />}
                onClick={() => setActiveTab('business')}
                style={{ textAlign: 'left' }}
              >
                Business Info
              </Button>
              <Button
                block
                type={activeTab === 'receipt' ? 'primary' : 'text'}
                icon={<MailOutlined />}
                onClick={() => setActiveTab('receipt')}
                style={{ textAlign: 'left' }}
              >
                Receipt Settings
              </Button>
              <Button
                block
                type={activeTab === 'notifications' ? 'primary' : 'text'}
                icon={<BellOutlined />}
                onClick={() => setActiveTab('notifications')}
                style={{ textAlign: 'left' }}
              >
                Notifications
              </Button>
              <Button
                block
                type={activeTab === 'tax' ? 'primary' : 'text'}
                icon={<DollarOutlined />}
                onClick={() => setActiveTab('tax')}
                style={{ textAlign: 'left' }}
              >
                Tax Settings
              </Button>
              <Button
                block
                type={activeTab === 'general' ? 'primary' : 'text'}
                icon={<GlobalOutlined />}
                onClick={() => setActiveTab('general')}
                style={{ textAlign: 'left' }}
              >
                General
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Settings Content */}
        <Col xs={24} md={18}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={settings}
            >
              {/* Business Information */}
              {activeTab === 'business' && (
                <>
                  <Title level={4}>
                    <ShopOutlined /> Business Information
                  </Title>
                  <Divider />

                  <Form.Item
                    name="businessName"
                    label="Business Name"
                    rules={[{ required: true, message: 'Please enter business name' }]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="businessEmail"
                        label="Business Email"
                        rules={[
                          { required: true, message: 'Please enter business email' },
                          { type: 'email', message: 'Please enter valid email' },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="businessPhone"
                        label="Business Phone"
                        rules={[{ required: true, message: 'Please enter business phone' }]}
                      >
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="businessAddress"
                    label="Business Address"
                    rules={[{ required: true, message: 'Please enter business address' }]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>

                  <Form.Item name="taxId" label="Tax ID / EIN">
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item label="Business Logo">
                    <Upload listType="picture-card" maxCount={1}>
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload Logo</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </>
              )}

              {/* Receipt Settings */}
              {activeTab === 'receipt' && (
                <>
                  <Title level={4}>
                    <MailOutlined /> Receipt Settings
                  </Title>
                  <Divider />

                  <Form.Item name="receiptFooter" label="Receipt Footer Message">
                    <TextArea rows={3} placeholder="Message to display at the bottom of receipts" />
                  </Form.Item>

                  <Form.Item name="showLogo" label="Show Logo on Receipt" valuePropName="checked">
                    <Switch />
                  </Form.Item>

                  <Form.Item name="showTax" label="Show Tax Breakdown" valuePropName="checked">
                    <Switch />
                  </Form.Item>

                  <Form.Item name="receiptFormat" label="Receipt Format">
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="thermal">Thermal Printer (80mm)</Radio>
                        <Radio value="a4">A4 Paper</Radio>
                        <Radio value="letter">Letter Size</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <>
                  <Title level={4}>
                    <BellOutlined /> Notification Settings
                  </Title>
                  <Divider />

                  <Form.Item
                    name="emailNotifications"
                    label="Email Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Text type="secondary" style={{ display: 'block', marginTop: -16, marginBottom: 16 }}>
                    Receive email notifications for sales, inventory updates, and system alerts
                  </Text>

                  <Form.Item
                    name="smsNotifications"
                    label="SMS Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Text type="secondary" style={{ display: 'block', marginTop: -16, marginBottom: 16 }}>
                    Receive SMS notifications for critical alerts
                  </Text>

                  <Form.Item
                    name="lowStockAlert"
                    label="Low Stock Alerts"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name="lowStockThreshold"
                    label="Low Stock Threshold"
                    tooltip="Notify when stock falls below this number"
                  >
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                </>
              )}

              {/* Tax Settings */}
              {activeTab === 'tax' && (
                <>
                  <Title level={4}>
                    <DollarOutlined /> Tax Settings
                  </Title>
                  <Divider />

                  <Form.Item name="enableTax" label="Enable Tax" valuePropName="checked">
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name="defaultTaxRate"
                    label="Default Tax Rate (%)"
                    tooltip="Default tax rate applied to sales"
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      precision={2}
                      style={{ width: '100%' }}
                      formatter={(value) => `${value}%`}
                    />
                  </Form.Item>

                  <Form.Item name="taxCalculation" label="Tax Calculation Method">
                    <Select size="large">
                      <Option value="inclusive">Tax Inclusive (price includes tax)</Option>
                      <Option value="exclusive">Tax Exclusive (tax added to price)</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="taxNumber" label="Tax Registration Number">
                    <Input size="large" placeholder="Enter tax registration number" />
                  </Form.Item>
                </>
              )}

              {/* General Settings */}
              {activeTab === 'general' && (
                <>
                  <Title level={4}>
                    <GlobalOutlined /> General Settings
                  </Title>
                  <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="currency" label="Currency">
                        <Select size="large">
                          <Option value="USD">USD - US Dollar</Option>
                          <Option value="EUR">EUR - Euro</Option>
                          <Option value="GBP">GBP - British Pound</Option>
                          <Option value="JPY">JPY - Japanese Yen</Option>
                          <Option value="INR">INR - Indian Rupee</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="language" label="Language">
                        <Select size="large">
                          <Option value="en">English</Option>
                          <Option value="es">Spanish</Option>
                          <Option value="fr">French</Option>
                          <Option value="de">German</Option>
                          <Option value="zh">Chinese</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="timezone" label="Timezone">
                        <Select size="large" showSearch>
                          <Option value="America/New_York">Eastern Time (ET)</Option>
                          <Option value="America/Chicago">Central Time (CT)</Option>
                          <Option value="America/Denver">Mountain Time (MT)</Option>
                          <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                          <Option value="Europe/London">GMT</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="dateFormat" label="Date Format">
                        <Select size="large">
                          <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                          <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                          <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="autoBackup" label="Automatic Backup" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Text type="secondary" style={{ display: 'block', marginTop: -16, marginBottom: 16 }}>
                    Automatically backup data daily at midnight
                  </Text>
                </>
              )}

              <Divider />

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
                    Save Settings
                  </Button>
                  <Button size="large" onClick={() => form.resetFields()}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
