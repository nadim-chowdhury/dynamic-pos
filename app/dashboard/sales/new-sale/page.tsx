"use client";

import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  InputNumber,
  Space,
  Row,
  Col,
  Divider,
  Typography,
  message,
  AutoComplete,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SaveOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
}

interface CartItem {
  key: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  discount: number;
  tax: number;
  total: number;
}

// Demo products data
const demoProducts: Product[] = [
  { id: "1", name: "Wireless Mouse", price: 25.99, stock: 50, sku: "WM-001" },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 89.99,
    stock: 30,
    sku: "KB-002",
  },
  { id: "3", name: "USB-C Cable", price: 12.99, stock: 100, sku: "CB-003" },
  { id: "4", name: "Laptop Stand", price: 45.5, stock: 25, sku: "LS-004" },
  { id: "5", name: "Webcam HD", price: 65.0, stock: 15, sku: "WC-005" },
  { id: "6", name: "Headphones", price: 120.0, stock: 20, sku: "HP-006" },
  { id: "7", name: 'Monitor 24"', price: 299.99, stock: 10, sku: "MN-007" },
  { id: "8", name: "Desk Lamp", price: 35.99, stock: 40, sku: "DL-008" },
];

// Demo customers data
const demoCustomers = [
  { value: "1", label: "John Smith - john@example.com" },
  { value: "2", label: "Sarah Johnson - sarah@example.com" },
  { value: "3", label: "Mike Brown - mike@example.com" },
  { value: "4", label: "Emily Davis - emily@example.com" },
  { value: "5", label: "Walk-in Customer" },
];

export default function NewSalePage() {
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [productSearch, setProductSearch] = useState("");

  const calculateItemTotal = (item: Partial<CartItem>): number => {
    const quantity = item.quantity || 0;
    const price = item.price || 0;
    const discount = item.discount || 0;
    const tax = item.tax || 0;

    const subtotal = quantity * price;
    const discountAmount = subtotal * (discount / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (tax / 100);

    return taxableAmount + taxAmount;
  };

  const addProductToCart = (productId: string) => {
    const product = demoProducts.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: calculateItemTotal({
                ...item,
                quantity: item.quantity + 1,
              }),
            }
          : item
      );
      setCartItems(updatedItems);
    } else {
      const newItem: CartItem = {
        key: productId,
        productId: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
        discount: 0,
        tax: 10,
        total: calculateItemTotal({
          price: product.price,
          quantity: 1,
          discount: 0,
          tax: 10,
        }),
      };
      setCartItems([...cartItems, newItem]);
    }
    setSelectedProduct("");
    setProductSearch("");
  };

  const updateCartItem = (key: string, field: keyof CartItem, value: any) => {
    const updatedItems = cartItems.map((item) => {
      if (item.key === key) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.total = calculateItemTotal(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const removeCartItem = (key: string) => {
    setCartItems(cartItems.filter((item) => item.key !== key));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const totalDiscount = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity * (item.discount / 100);
    }, 0);

    const totalTax = cartItems.reduce((sum, item) => {
      const discounted = item.price * item.quantity * (1 - item.discount / 100);
      return sum + discounted * (item.tax / 100);
    }, 0);

    const grandTotal = subtotal - totalDiscount + totalTax;

    return { subtotal, totalDiscount, totalTax, grandTotal };
  };

  const handleSale = (isDraft: boolean = false) => {
    if (cartItems.length === 0) {
      message.error("Please add items to cart");
      return;
    }

    const values = form.getFieldsValue();
    if (!values.customer) {
      message.error("Please select a customer");
      return;
    }

    const totals = calculateTotals();
    console.log("Sale Data:", {
      ...values,
      items: cartItems,
      totals,
      isDraft,
      date: new Date().toISOString(),
    });

    message.success(
      isDraft ? "Sale saved as draft" : "Sale completed successfully!"
    );

    // Reset form
    form.resetFields();
    setCartItems([]);
  };

  const productOptions = demoProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase())
    )
    .map((p) => ({
      value: p.id,
      label: `${p.name} (${p.sku}) - $${p.price.toFixed(2)} - Stock: ${
        p.stock
      }`,
    }));

  const columns: ColumnsType<CartItem> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            SKU: {record.sku}
          </Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "12%",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) =>
            updateCartItem(record.key, "quantity", value || 1)
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      width: "15%",
      render: (discount, record) => (
        <InputNumber
          min={0}
          max={100}
          value={discount}
          onChange={(value) =>
            updateCartItem(record.key, "discount", value || 0)
          }
          style={{ width: "100%" }}
          formatter={(value) => `${value}%`}
        />
      ),
    },
    {
      title: "Tax (%)",
      dataIndex: "tax",
      key: "tax",
      width: "15%",
      render: (tax, record) => (
        <InputNumber
          min={0}
          max={100}
          value={tax}
          onChange={(value) => updateCartItem(record.key, "tax", value || 0)}
          style={{ width: "100%" }}
          formatter={(value) => `${value}%`}
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "13%",
      render: (total) => <Text strong>${total.toFixed(2)}</Text>,
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeCartItem(record.key)}
        />
      ),
    },
  ];

  const totals = calculateTotals();

  return (
    <div>
      <Title level={2}>
        <ShoppingCartOutlined /> New Sale
      </Title>

      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Card title="Sale Items" style={{ marginBottom: 16 }}>
            <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
              <AutoComplete
                style={{ width: "100%" }}
                options={productOptions}
                value={productSearch}
                onChange={setProductSearch}
                onSelect={(value) => {
                  setSelectedProduct(value);
                  addProductToCart(value);
                }}
                placeholder="Search product by name or SKU..."
                allowClear
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() =>
                  selectedProduct && addProductToCart(selectedProduct)
                }
                disabled={!selectedProduct}
              >
                Add
              </Button>
            </Space.Compact>

            <Table
              columns={columns}
              dataSource={cartItems}
              pagination={false}
              scroll={{ x: 800 }}
              locale={{ emptyText: "No items in cart" }}
            />

            <Divider />

            <Row justify="end">
              <Col xs={24} sm={12} md={8}>
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="small"
                >
                  <Row justify="space-between">
                    <Text>Subtotal:</Text>
                    <Text strong>${totals.subtotal.toFixed(2)}</Text>
                  </Row>
                  <Row justify="space-between">
                    <Text>Discount:</Text>
                    <Text type="danger">
                      -${totals.totalDiscount.toFixed(2)}
                    </Text>
                  </Row>
                  <Row justify="space-between">
                    <Text>Tax:</Text>
                    <Text>${totals.totalTax.toFixed(2)}</Text>
                  </Row>
                  <Divider style={{ margin: "8px 0" }} />
                  <Row justify="space-between">
                    <Title level={4} style={{ margin: 0 }}>
                      Grand Total:
                    </Title>
                    <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
                      ${totals.grandTotal.toFixed(2)}
                    </Title>
                  </Row>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Sale Information">
            <Form form={form} layout="vertical">
              <Form.Item
                name="customer"
                label="Customer"
                rules={[
                  { required: true, message: "Please select a customer" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select or search customer"
                  options={demoCustomers}
                  suffixIcon={<UserOutlined />}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>

              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                initialValue="cash"
              >
                <Select>
                  <Option value="cash">Cash</Option>
                  <Option value="card">Credit/Debit Card</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="mobile">Mobile Payment</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="paymentStatus"
                label="Payment Status"
                initialValue="paid"
              >
                <Select>
                  <Option value="paid">Paid</Option>
                  <Option value="partial">Partially Paid</Option>
                  <Option value="unpaid">Unpaid</Option>
                </Select>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <Input.TextArea rows={3} placeholder="Add notes (optional)" />
              </Form.Item>

              <Divider />

              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<SaveOutlined />}
                  onClick={() => handleSale(false)}
                >
                  Complete Sale
                </Button>
                <Button
                  block
                  size="large"
                  icon={<PrinterOutlined />}
                  onClick={() => handleSale(false)}
                >
                  Complete & Print
                </Button>
                <Button block size="large" onClick={() => handleSale(true)}>
                  Save as Draft
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
