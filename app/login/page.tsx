"use client";

import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Checkbox,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { currentTheme, toggleTheme } = useTheme();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Login values:", values);
    // Handle login logic here
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
            ? "linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #f5f7fa 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
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
            Sign in to your account
          </Title>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Row justify="space-between" align="middle">
              <Col>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <Link href="/forgot-password">
                  <Text style={{ color: "#1677ff" }}>Forgot password?</Text>
                </Link>
              </Col>
            </Row>
          </Form.Item>

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
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or continue with</Divider>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Space direction="horizontal" size="middle">
            <Button block size="small" icon={<GoogleOutlined />}>
              Sign up with Google
            </Button>
            <Button block size="small" icon={<GithubOutlined />}>
              Sign up with GitHub
            </Button>
          </Space>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Text>
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <Text style={{ color: "#1677ff", fontWeight: 500 }}>Sign up</Text>
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
