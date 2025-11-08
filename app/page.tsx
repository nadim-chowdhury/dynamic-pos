"use client";

import React from "react";
import { Button, Row, Col, Typography, Card, Space } from "antd";
import {
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTheme } from "./providers/ThemeProvider";

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const { currentTheme, toggleTheme } = useTheme();
  const [hoveredCard, setHoveredCard] = React.useState<any>(null);

  const router = useRouter();

  const features = [
    {
      icon: <ShoppingCartOutlined style={{ fontSize: 48 }} />,
      title: "Point of Sale",
      description:
        "Streamline your sales process with our intuitive POS system",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: <TeamOutlined style={{ fontSize: 48 }} />,
      title: "HR Management",
      description: "Manage your team efficiently with comprehensive HR tools",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <DollarOutlined style={{ fontSize: 48 }} />,
      title: "Accounting",
      description:
        "Keep track of your finances with integrated accounting features",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  const benefits = [
    { text: "Cloud-based and accessible anywhere", icon: <SafetyOutlined /> },
    { text: "Real-time inventory tracking", icon: <RocketOutlined /> },
    {
      text: "Comprehensive reporting and analytics",
      icon: <CheckCircleOutlined />,
    },
    { text: "Multi-location support", icon: <TeamOutlined /> },
    { text: "Secure and reliable", icon: <SafetyOutlined /> },
    { text: "24/7 customer support", icon: <CheckCircleOutlined /> },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          currentTheme === "dark"
            ? "linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #f5f7fa 100%)",
      }}
    >
      {/* Header */}
      <div
        className="glass-effect"
        style={{
          padding: "20px 50px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          background:
            currentTheme === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 100%)"
              : "linear-gradient(135deg, #f5f7fa 0%, #f5f7fa 100%)",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} className="gradient-text" style={{ margin: 0 }}>
              ✨ D~POS
            </Title>
          </Col>
          <Col>
            <Space size="middle">
              <Button
                onClick={() => router.push("/login")}
                style={{
                  borderRadius: 20,
                  fontWeight: 500,
                }}
              >
                Login
              </Button>
              <Button
                type="primary"
                onClick={() => router.push("/register")}
                style={{
                  borderRadius: 20,
                  fontWeight: 500,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
              >
                Get Started
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Hero Section */}
      <div
        style={{
          padding: "120px 50px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div className="floating" style={{ display: "inline-block" }}>
          <RocketOutlined
            style={{ fontSize: 80, color: "#667eea", marginBottom: 20 }}
          />
        </div>
        <Title
          level={1}
          className="fade-in-up"
          style={{
            fontSize: 64,
            marginBottom: 24,
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Transform Your Business Today
        </Title>
        <Paragraph
          className="fade-in-up"
          style={{
            fontSize: 22,
            marginBottom: 50,
            maxWidth: 800,
            margin: "0 auto 50px",
            lineHeight: 1.8,
            opacity: 0.9,
          }}
        >
          Unite your point of sale, human resources, and accounting in one
          intelligent platform. Experience seamless operations and exponential
          growth.
        </Paragraph>
        <Space size="large" className="fade-in-up">
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/register")}
            style={{
              height: 56,
              padding: "0 40px",
              fontSize: 18,
              borderRadius: 28,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
              fontWeight: 600,
            }}
          >
            Start Free Trial →
          </Button>
          <Button
            size="large"
            onClick={() => router.push("/login")}
            style={{
              height: 56,
              padding: "0 40px",
              fontSize: 18,
              borderRadius: 28,
              fontWeight: 600,
              background:
                currentTheme === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            Watch Demo
          </Button>
        </Space>
      </div>

      {/* Features Section */}
      <div
        style={{
          padding: "100px 50px",
          position: "relative",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Powerful Features
        </Title>
        <Paragraph
          style={{
            textAlign: "center",
            fontSize: 18,
            marginBottom: 80,
            opacity: 0.8,
          }}
        >
          Everything you need to scale your business to new heights
        </Paragraph>
        <Row gutter={[40, 40]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                className="card-hover"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 24,
                  border: "none",
                  background:
                    hoveredCard === index
                      ? feature.gradient
                      : currentTheme === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  position: "relative",
                }}
                bodyStyle={{ padding: 48 }}
              >
                <div
                  style={{
                    marginBottom: 24,
                    color: hoveredCard === index ? "#fff" : "#667eea",
                    transition: "all 0.3s ease",
                    transform:
                      hoveredCard === index ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {feature.icon}
                </div>
                <Title
                  level={4}
                  style={{
                    color: hoveredCard === index ? "#fff" : "inherit",
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  {feature.title}
                </Title>
                <Paragraph
                  style={{
                    color:
                      hoveredCard === index
                        ? "rgba(255, 255, 255, 0.9)"
                        : "inherit",
                    fontSize: 16,
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Benefits Section */}
      <div
        className="glass-effect"
        style={{
          padding: "100px 50px",
          margin: "0 50px",
          borderRadius: 32,
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Why Industry Leaders Choose Us
        </Title>
        <Paragraph
          style={{
            textAlign: "center",
            fontSize: 18,
            marginBottom: 80,
            opacity: 0.8,
          }}
        >
          Join thousands of businesses experiencing unprecedented growth
        </Paragraph>
        <Row gutter={[32, 32]} justify="center">
          {benefits.map((benefit, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                className="card-hover"
                style={{
                  borderRadius: 20,
                  border: "none",
                  background:
                    currentTheme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
                bodyStyle={{ padding: 32 }}
              >
                <Space align="start" size="middle">
                  <div
                    style={{
                      fontSize: 28,
                      color: "#667eea",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <Text strong style={{ fontSize: 17, lineHeight: 1.6 }}>
                    {benefit.text}
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div
        style={{
          padding: "120px 50px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            opacity: 0.1,
            borderRadius: 32,
            margin: "100px 50px 0 50px",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Title
            level={2}
            style={{ fontSize: 52, fontWeight: 800, marginBottom: 24 }}
          >
            Ready to Scale Your Business?
          </Title>
          <Paragraph
            style={{
              fontSize: 20,
              marginBottom: 48,
              opacity: 0.9,
              maxWidth: 600,
              margin: "0 auto 48px",
            }}
          >
            Start your journey to exponential growth today. No credit card
            required.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/register")}
            style={{
              height: 64,
              padding: "0 48px",
              fontSize: 20,
              borderRadius: 32,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 12px 40px rgba(102, 126, 234, 0.5)",
              fontWeight: 700,
            }}
          >
            Start Free Trial - 14 Days →
          </Button>
          <div style={{ marginTop: 32 }}>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>
              ✓ No credit card required • ✓ Setup in 5 minutes • ✓ Cancel
              anytime
            </Text>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "48px 50px",
          textAlign: "center",
        }}
      >
        <Text type="secondary" style={{ fontSize: 15 }}>
          © 2024 D~POS. Empowering businesses worldwide. All rights reserved.
        </Text>
      </div>
    </div>
  );
}
