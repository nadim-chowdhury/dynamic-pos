"use client";

import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  GoogleOutlined,
  GithubOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const router = useRouter();
  const { currentTheme, toggleTheme } = useTheme();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Register values:", values);
    // Handle registration logic here
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          currentTheme === "dark"
            ? "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 550,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/">
            <Title level={2} style={{ color: "#1677ff", marginBottom: 8 }}>
              D~POS
            </Title>
          </Link>
          <Title level={4} style={{ marginTop: 0, fontWeight: 400 }}>
            Create your account
          </Title>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="First name"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Last name"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="businessName"
            label="Business Name"
            rules={[
              { required: true, message: "Please input your business name!" },
            ]}
          >
            <Input
              prefix={<ShopOutlined />}
              placeholder="Enter your business name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter your phone number"
              size="large"
            />
          </Form.Item>

          <div className="flex items-baseline justify-center gap-4">
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Create a password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm your password"
                size="large"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or sign up with</Divider>

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Space direction="horizontal" size="middle">
            <Button block size="large" icon={<GoogleOutlined />}>
              Sign up with Google
            </Button>
            <Button block size="large" icon={<GithubOutlined />}>
              Sign up with GitHub
            </Button>
          </Space>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Text>
            Already have an account?{" "}
            <Link href="/login">
              <Text style={{ color: "#1677ff", fontWeight: 500 }}>Sign in</Text>
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
