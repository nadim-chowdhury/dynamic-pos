'use client';

import React from 'react';
import { Typography, Card, Form, Input, Button, Space, message, Alert, List } from 'antd';
import { LockOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ChangePasswordPage() {
  const [form] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = React.useState<{
    score: number;
    feedback: string[];
  }>({ score: 0, feedback: [] });

  const checkPasswordStrength = (password: string) => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
      feedback.push('At least 8 characters');
    } else {
      feedback.push('At least 8 characters (missing)');
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
      feedback.push('Uppercase and lowercase letters');
    } else {
      feedback.push('Uppercase and lowercase letters (missing)');
    }

    if (/\d/.test(password)) {
      score += 1;
      feedback.push('At least one number');
    } else {
      feedback.push('At least one number (missing)');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
      feedback.push('Special character');
    } else {
      feedback.push('Special character (missing)');
    }

    setPasswordStrength({ score, feedback });
    return score;
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return '#ff4d4f';
    if (score === 2) return '#faad14';
    if (score === 3) return '#52c41a';
    return '#1677ff';
  };

  const getStrengthText = (score: number) => {
    if (score <= 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong';
  };

  const handlePasswordChange = (values: any) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    // Demo validation - in real app, verify with backend
    if (currentPassword === 'wrongpassword') {
      message.error('Current password is incorrect');
      return;
    }

    if (passwordStrength.score < 3) {
      message.warning('Please choose a stronger password');
      return;
    }

    message.success('Password changed successfully');
    form.resetFields();
    setPasswordStrength({ score: 0, feedback: [] });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Change Password</Title>

      <Card>
        <Alert
          message="Password Security Tips"
          description={
            <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
              <li>Use a unique password that you don't use for other accounts</li>
              <li>Avoid using personal information like names, birthdays, or common words</li>
              <li>Consider using a password manager to generate and store strong passwords</li>
              <li>Change your password regularly (every 90 days recommended)</li>
            </ul>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter current password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
              size="large"
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
          </Form.Item>

          {passwordStrength.score > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <Text strong style={{ marginRight: 8 }}>
                  Password Strength:
                </Text>
                <Text strong style={{ color: getStrengthColor(passwordStrength.score) }}>
                  {getStrengthText(passwordStrength.score)}
                </Text>
              </div>
              <div
                style={{
                  height: 8,
                  background: '#f0f0f0',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(passwordStrength.score / 4) * 100}%`,
                    background: getStrengthColor(passwordStrength.score),
                    transition: 'all 0.3s',
                  }}
                />
              </div>
              <List
                size="small"
                dataSource={passwordStrength.feedback}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Space>
                      {item.includes('missing') ? (
                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                      ) : (
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      )}
                      <Text type={item.includes('missing') ? 'secondary' : undefined}>{item}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </div>
          )}

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Change Password
              </Button>
              <Button size="large" onClick={() => form.resetFields()}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Password History" style={{ marginTop: 24 }}>
        <List
          dataSource={[
            { date: '2024-01-15 10:30 AM', device: 'Chrome on Windows', ip: '192.168.1.100' },
            { date: '2023-10-20 02:15 PM', device: 'Safari on macOS', ip: '192.168.1.101' },
            { date: '2023-07-12 09:00 AM', device: 'Firefox on Linux', ip: '192.168.1.102' },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`Password changed on ${item.date}`}
                description={`Device: ${item.device} • IP: ${item.ip}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
