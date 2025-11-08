"use client";

import React, { useState } from "react";
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Avatar,
  Upload,
  Space,
  Divider,
  message,
  Descriptions,
  Tag,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EditOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd";

const { Title, Text } = Typography;

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  role: string;
  department: string;
  joinDate: string;
  avatar?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Demo user data
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@dynamicpos.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street",
    city: "San Francisco",
    state: "California",
    zipCode: "94105",
    country: "United States",
    role: "Store Manager",
    department: "Sales",
    joinDate: "2023-01-15",
  });

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = (values: any) => {
    setProfile({ ...profile, ...values });
    setIsEditing(false);
    message.success("Profile updated successfully");
  };

  return (
    <div>
      <Title level={2}>My Profile</Title>

      <Row gutter={[24, 24]}>
        {/* Profile Card */}
        <Col xs={24} lg={8}>
          <Card>
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <Avatar size={120} icon={<UserOutlined />} src={profile.avatar} />
              <Upload maxCount={1} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Change Photo</Button>
              </Upload>
              <Title level={4} style={{ margin: "16px 0 0 0" }}>
                {profile.firstName} {profile.lastName}
              </Title>
              <Text type="secondary">{profile.email}</Text>
              <Space>
                <Tag color="blue">{profile.role}</Tag>
                <Tag color="green">{profile.department}</Tag>
              </Space>
            </Space>

            <Divider />

            <Descriptions column={1} size="small">
              <Descriptions.Item label="Member Since">
                {new Date(profile.joinDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                {profile.department}
              </Descriptions.Item>
              <Descriptions.Item label="Role">{profile.role}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Profile Information */}
        <Col xs={24} lg={16}>
          <Card
            title="Personal Information"
            extra={
              !isEditing && (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
              )
            }
          >
            {!isEditing ? (
              <Descriptions bordered column={2}>
                <Descriptions.Item label="First Name">
                  {profile.firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {profile.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={2}>
                  <Space>
                    <MailOutlined />
                    {profile.email}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Phone" span={2}>
                  <Space>
                    <PhoneOutlined />
                    {profile.phone}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                  <Space>
                    <EnvironmentOutlined />
                    {profile.address}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  {profile.city}
                </Descriptions.Item>
                <Descriptions.Item label="State">
                  {profile.state}
                </Descriptions.Item>
                <Descriptions.Item label="ZIP Code">
                  {profile.zipCode}
                </Descriptions.Item>
                <Descriptions.Item label="Country">
                  {profile.country}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Form form={form} layout="vertical" onFinish={handleSave}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[
                        { required: true, message: "Please enter first name" },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[
                        { required: true, message: "Please enter last name" },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: "email", message: "Please enter valid email" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <Input prefix={<EnvironmentOutlined />} />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[{ required: true, message: "Please enter city" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="state"
                      label="State"
                      rules={[
                        { required: true, message: "Please enter state" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="zipCode"
                      label="ZIP Code"
                      rules={[
                        { required: true, message: "Please enter ZIP code" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[
                        { required: true, message: "Please enter country" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    >
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </Card>

          {/* Account Security */}
          <Card title="Account Security" style={{ marginTop: 24 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>Password</Text>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">Last changed 30 days ago</Text>
                </div>
                <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                  Change Password
                </Button>
              </div>
              <Divider />
              <div>
                <Text strong>Two-Factor Authentication</Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color="error">Disabled</Tag>
                </div>
                <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                  Enable 2FA
                </Button>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
