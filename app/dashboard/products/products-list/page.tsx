"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  message,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Image,
  Descriptions,
  Row,
  Col,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps, UploadFile } from "antd";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Product {
  key: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: "active" | "inactive";
  image?: string;
  description?: string;
  barcode?: string;
}

// ProductForm component - moved outside to avoid recreation on render
interface ProductFormProps {
  form: any;
  onFinish: (values: any) => void;
  onCancel: () => void;
  selectedProduct: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  form,
  onFinish,
  onCancel,
  selectedProduct,
}) => (
  <Form form={form} layout="vertical" onFinish={onFinish}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="sku"
          label="SKU"
          rules={[{ required: true, message: "Please enter SKU" }]}
        >
          <Input placeholder="e.g., PRD-001" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="barcode" label="Barcode">
          <Input placeholder="e.g., 123456789" />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item
      name="name"
      label="Product Name"
      rules={[{ required: true, message: "Please enter product name" }]}
    >
      <Input placeholder="Enter product name" />
    </Form.Item>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Electronics">Electronics</Option>
            <Option value="Accessories">Accessories</Option>
            <Option value="Audio">Audio</Option>
            <Option value="Office">Office</Option>
            <Option value="Furniture">Furniture</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter brand" }]}
        >
          <Input placeholder="Enter brand" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="cost"
          label="Cost Price"
          rules={[{ required: true, message: "Please enter cost price" }]}
        >
          <InputNumber
            prefix="$"
            placeholder="0.00"
            style={{ width: "100%" }}
            min={0}
            precision={2}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="price"
          label="Selling Price"
          rules={[{ required: true, message: "Please enter selling price" }]}
        >
          <InputNumber
            prefix="$"
            placeholder="0.00"
            style={{ width: "100%" }}
            min={0}
            precision={2}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="stock"
          label="Stock Quantity"
          rules={[{ required: true, message: "Please enter stock quantity" }]}
        >
          <InputNumber placeholder="0" style={{ width: "100%" }} min={0} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="minStock"
          label="Minimum Stock"
          rules={[{ required: true, message: "Please enter minimum stock" }]}
        >
          <InputNumber placeholder="0" style={{ width: "100%" }} min={0} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item name="description" label="Description">
      <TextArea rows={3} placeholder="Enter product description" />
    </Form.Item>

    <Form.Item name="image" label="Product Image">
      <Upload listType="picture-card" maxCount={1}>
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>

    <Form.Item>
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          {selectedProduct ? "Update Product" : "Create Product"}
        </Button>
      </Space>
    </Form.Item>
  </Form>
);

// Demo products data
const demoProducts: Product[] = [
  {
    key: "1",
    sku: "WM-001",
    name: "Wireless Mouse",
    category: "Electronics",
    brand: "Logitech",
    price: 25.99,
    cost: 15.0,
    stock: 50,
    minStock: 10,
    status: "active",
    barcode: "123456789001",
    description: "Ergonomic wireless mouse with 2.4GHz connectivity",
  },
  {
    key: "2",
    sku: "KB-002",
    name: "Mechanical Keyboard",
    category: "Electronics",
    brand: "Corsair",
    price: 89.99,
    cost: 60.0,
    stock: 30,
    minStock: 5,
    status: "active",
    barcode: "123456789002",
    description: "RGB mechanical keyboard with Cherry MX switches",
  },
  {
    key: "3",
    sku: "CB-003",
    name: "USB-C Cable",
    category: "Accessories",
    brand: "Anker",
    price: 12.99,
    cost: 5.0,
    stock: 100,
    minStock: 20,
    status: "active",
    barcode: "123456789003",
    description: "Durable USB-C to USB-A cable, 6ft length",
  },
  {
    key: "4",
    sku: "LS-004",
    name: "Laptop Stand",
    category: "Accessories",
    brand: "Rain Design",
    price: 45.5,
    cost: 25.0,
    stock: 25,
    minStock: 5,
    status: "active",
    barcode: "123456789004",
    description: "Aluminum laptop stand with adjustable height",
  },
  {
    key: "5",
    sku: "WC-005",
    name: "Webcam HD",
    category: "Electronics",
    brand: "Logitech",
    price: 65.0,
    cost: 40.0,
    stock: 15,
    minStock: 5,
    status: "active",
    barcode: "123456789005",
    description: "1080p HD webcam with auto-focus",
  },
  {
    key: "6",
    sku: "HP-006",
    name: "Noise Cancelling Headphones",
    category: "Audio",
    brand: "Sony",
    price: 120.0,
    cost: 80.0,
    stock: 20,
    minStock: 5,
    status: "active",
    barcode: "123456789006",
    description: "Premium noise cancelling headphones",
  },
  {
    key: "7",
    sku: "MN-007",
    name: 'Monitor 24"',
    category: "Electronics",
    brand: "Dell",
    price: 299.99,
    cost: 200.0,
    stock: 10,
    minStock: 3,
    status: "active",
    barcode: "123456789007",
    description: "Full HD IPS monitor, 24-inch display",
  },
  {
    key: "8",
    sku: "DL-008",
    name: "Desk Lamp LED",
    category: "Office",
    brand: "Philips",
    price: 35.99,
    cost: 20.0,
    stock: 40,
    minStock: 10,
    status: "active",
    barcode: "123456789008",
    description: "LED desk lamp with adjustable brightness",
  },
  {
    key: "9",
    sku: "CH-009",
    name: "Office Chair",
    category: "Furniture",
    brand: "Herman Miller",
    price: 450.0,
    cost: 300.0,
    stock: 8,
    minStock: 2,
    status: "inactive",
    barcode: "123456789009",
    description: "Ergonomic office chair with lumbar support",
  },
  {
    key: "10",
    sku: "MB-010",
    name: "Mouse Pad",
    category: "Accessories",
    brand: "SteelSeries",
    price: 19.99,
    cost: 8.0,
    stock: 3,
    minStock: 15,
    status: "active",
    barcode: "123456789010",
    description: "Large gaming mouse pad with RGB lighting",
  },
];

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "default";
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) {
      return { color: "error", text: "Out of Stock" };
    } else if (stock <= minStock) {
      return { color: "warning", text: "Low Stock" };
    }
    return { color: "success", text: "In Stock" };
  };

  const handleView = (record: Product) => {
    setSelectedProduct(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    setSelectedProduct(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Product) => {
    message.success(`Product "${record.name}" deleted successfully`);
    setProducts(products.filter((product) => product.key !== record.key));
  };

  const handleDuplicate = (record: Product) => {
    const newProduct = {
      ...record,
      key: String(Date.now()),
      sku: `${record.sku}-COPY`,
      name: `${record.name} (Copy)`,
    };
    setProducts([newProduct, ...products]);
    message.success(`Product duplicated successfully`);
  };

  const getActionItems = (record: Product): MenuProps["items"] => [
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleView(record),
    },
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
    },
    {
      key: "duplicate",
      label: "Duplicate",
      icon: <PlusOutlined />,
      onClick: () => handleDuplicate(record),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record),
    },
  ];

  const columns: DynamicTableColumn<Product>[] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image: string) => (
        <Image
          src={image || "/placeholder-product.png"}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: 4 }}
          fallback="data:image/png;base64,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"
        />
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 120,
      render: (sku: string) => <Text code>{sku}</Text>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
      filters: [
        { text: "Electronics", value: "Electronics" },
        { text: "Accessories", value: "Accessories" },
        { text: "Audio", value: "Audio" },
        { text: "Office", value: "Office" },
        { text: "Furniture", value: "Furniture" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 130,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      align: "right",
      render: (price: number) => <Text strong>${price.toFixed(2)}</Text>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 120,
      align: "center",
      render: (stock: number, record: Product) => {
        const status = getStockStatus(stock, record.minStock);
        return (
          <Space direction="vertical" size={0}>
            <Text strong>{stock}</Text>
            <Tag color={status.color} style={{ margin: 0 }}>
              {status.text}
            </Tag>
          </Space>
        );
      },
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag
          icon={
            status === "active" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
          color={getStatusColor(status)}
        >
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
          />
          <Dropdown
            menu={{ items: getActionItems(record) }}
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleCreateProduct = (values: any) => {
    const newProduct: Product = {
      key: String(Date.now()),
      ...values,
      status: "active",
    };
    setProducts([newProduct, ...products]);
    message.success("Product created successfully");
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleUpdateProduct = (values: any) => {
    const updatedProducts = products.map((product) =>
      product.key === selectedProduct?.key ? { ...product, ...values } : product
    );
    setProducts(updatedProducts);
    message.success("Product updated successfully");
    form.resetFields();
    setIsEditModalOpen(false);
  };

  const handleCancelForm = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <DynamicTable
        title="Products List"
        columns={columns}
        data={products}
        showAdd
        addButtonText="Add Product"
        onAdd={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Product Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Product Details - ${selectedProduct?.name}`}
        width={800}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedProduct!);
            }}
          >
            Edit Product
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedProduct && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="SKU">
              {selectedProduct.sku}
            </Descriptions.Item>
            <Descriptions.Item label="Barcode">
              {selectedProduct.barcode || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Product Name" span={2}>
              {selectedProduct.name}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {selectedProduct.category}
            </Descriptions.Item>
            <Descriptions.Item label="Brand">
              {selectedProduct.brand}
            </Descriptions.Item>
            <Descriptions.Item label="Cost Price">
              ${selectedProduct.cost.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Selling Price">
              ${selectedProduct.price.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Stock Quantity">
              {selectedProduct.stock}
            </Descriptions.Item>
            <Descriptions.Item label="Minimum Stock">
              {selectedProduct.minStock}
            </Descriptions.Item>
            <Descriptions.Item label="Stock Status">
              <Tag
                color={
                  getStockStatus(
                    selectedProduct.stock,
                    selectedProduct.minStock
                  ).color
                }
              >
                {
                  getStockStatus(
                    selectedProduct.stock,
                    selectedProduct.minStock
                  ).text
                }
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                icon={
                  selectedProduct.status === "active" ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
                color={getStatusColor(selectedProduct.status)}
              >
                {selectedProduct.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {selectedProduct.description || "No description available"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </DynamicModal>

      {/* Create Product Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Add New Product"
        width={800}
        footer={null}
      >
        <ProductForm
          form={form}
          onFinish={handleCreateProduct}
          onCancel={handleCancelForm}
          selectedProduct={null}
        />
      </DynamicModal>

      {/* Edit Product Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title={`Edit Product - ${selectedProduct?.name}`}
        width={800}
        footer={null}
      >
        <ProductForm
          form={form}
          onFinish={handleUpdateProduct}
          onCancel={handleCancelForm}
          selectedProduct={selectedProduct}
        />
      </DynamicModal>
    </div>
  );
}
