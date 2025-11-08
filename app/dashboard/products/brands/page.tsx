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
  Upload,
  Image,
  Switch,
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
  TagsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Brand {
  key: string;
  name: string;
  code: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  logo?: string;
  productCount: number;
  status: "active" | "inactive";
}

// Demo brands data
const demoBrands: Brand[] = [
  {
    key: "1",
    name: "Logitech",
    code: "LOGI",
    description: "Computer peripherals and software",
    website: "https://www.logitech.com",
    email: "contact@logitech.com",
    phone: "+1-510-795-8500",
    productCount: 28,
    status: "active",
  },
  {
    key: "2",
    name: "Corsair",
    code: "CORS",
    description: "High-performance gaming and enthusiast products",
    website: "https://www.corsair.com",
    email: "support@corsair.com",
    phone: "+1-888-222-4346",
    productCount: 15,
    status: "active",
  },
  {
    key: "3",
    name: "Anker",
    code: "ANKR",
    description: "Consumer electronics and charging solutions",
    website: "https://www.anker.com",
    email: "support@anker.com",
    productCount: 22,
    status: "active",
  },
  {
    key: "4",
    name: "Sony",
    code: "SONY",
    description: "Consumer and professional electronics",
    website: "https://www.sony.com",
    email: "info@sony.com",
    phone: "+1-800-222-7669",
    productCount: 18,
    status: "active",
  },
  {
    key: "5",
    name: "Dell",
    code: "DELL",
    description: "Computer technology and services",
    website: "https://www.dell.com",
    email: "support@dell.com",
    phone: "+1-800-624-9896",
    productCount: 35,
    status: "active",
  },
  {
    key: "6",
    name: "Philips",
    code: "PHIL",
    description: "Health technology and consumer electronics",
    website: "https://www.philips.com",
    email: "contact@philips.com",
    productCount: 12,
    status: "active",
  },
  {
    key: "7",
    name: "Herman Miller",
    code: "HM",
    description: "Office furniture and ergonomic seating",
    website: "https://www.hermanmiller.com",
    email: "info@hermanmiller.com",
    phone: "+1-888-443-4357",
    productCount: 8,
    status: "active",
  },
  {
    key: "8",
    name: "SteelSeries",
    code: "STLS",
    description: "Gaming peripherals and accessories",
    website: "https://www.steelseries.com",
    email: "support@steelseries.com",
    productCount: 16,
    status: "active",
  },
  {
    key: "9",
    name: "Rain Design",
    code: "RAIN",
    description: "Premium computer accessories",
    website: "https://www.raindesigninc.com",
    email: "info@raindesigninc.com",
    productCount: 6,
    status: "inactive",
  },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(demoBrands);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "default";
  };

  const handleView = (record: Brand) => {
    setSelectedBrand(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: Brand) => {
    setSelectedBrand(record);
    form.setFieldsValue(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Brand) => {
    if (record.productCount > 0) {
      message.warning(
        `Cannot delete brand "${record.name}" as it has ${record.productCount} products assigned`
      );
      return;
    }
    message.success(`Brand "${record.name}" deleted successfully`);
    setBrands(brands.filter((brand) => brand.key !== record.key));
  };

  const handleToggleStatus = (record: Brand) => {
    const newStatus: "active" | "inactive" =
      record.status === "active" ? "inactive" : "active";
    const updatedBrands = brands.map((brand) =>
      brand.key === record.key ? { ...brand, status: newStatus } : brand
    );
    setBrands(updatedBrands);
    message.success(`Brand status updated to ${newStatus}`);
  };

  const getActionItems = (record: Brand): MenuProps["items"] => [
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
      key: "toggle",
      label: record.status === "active" ? "Deactivate" : "Activate",
      icon:
        record.status === "active" ? (
          <CloseCircleOutlined />
        ) : (
          <CheckCircleOutlined />
        ),
      onClick: () => handleToggleStatus(record),
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
      disabled: record.productCount > 0,
    },
  ];

  const columns: DynamicTableColumn<Brand>[] = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 80,
      render: (logo: string, record: Brand) => (
        <div
          style={{
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {logo ? (
            <Image
              src={logo}
              alt={record.name}
              width={50}
              height={50}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Text>{record.code}</Text>
          )}
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 100,
      render: (code: string) => <Text code>{code}</Text>,
    },
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (name: string) => <Text strong>{name}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Contact Info",
      key: "contact",
      width: 250,
      render: (_, record: Brand) => (
        <Space direction="vertical" size={0}>
          {record.website && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              🌐 {record.website}
            </Text>
          )}
          {record.email && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              ✉️ {record.email}
            </Text>
          )}
          {record.phone && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              📞 {record.phone}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) =>
        description || <Text type="secondary">No description</Text>,
    },
    {
      title: "Products",
      dataIndex: "productCount",
      key: "productCount",
      width: 120,
      align: "center",
      render: (count: number) => (
        <Tag color={count > 0 ? "blue" : "default"} icon={<TagsOutlined />}>
          {count}
        </Tag>
      ),
      sorter: (a, b) => a.productCount - b.productCount,
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
      render: (_, record: Brand) => (
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

  const handleCreateBrand = (values: any) => {
    const newBrand: Brand = {
      key: String(Date.now()),
      ...values,
      productCount: 0,
      status: values.status ? "active" : "inactive",
    };
    setBrands([newBrand, ...brands]);
    message.success("Brand created successfully");
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleUpdateBrand = (values: any) => {
    const updatedBrands = brands.map((brand) =>
      brand.key === selectedBrand?.key
        ? { ...brand, ...values, status: values.status ? "active" : "inactive" }
        : brand
    );
    setBrands(updatedBrands);
    message.success("Brand updated successfully");
    form.resetFields();
    setIsEditModalOpen(false);
  };

  const BrandForm = ({ onFinish }: { onFinish: (values: any) => void }) => (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ status: true }}
    >
      <Form.Item
        name="code"
        label="Brand Code"
        rules={[
          { required: true, message: "Please enter brand code" },
          { max: 10, message: "Code must be maximum 10 characters" },
        ]}
      >
        <Input
          placeholder="e.g., LOGI"
          style={{ textTransform: "uppercase" }}
        />
      </Form.Item>

      <Form.Item
        name="name"
        label="Brand Name"
        rules={[{ required: true, message: "Please enter brand name" }]}
      >
        <Input placeholder="Enter brand name" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <TextArea rows={2} placeholder="Enter brand description (optional)" />
      </Form.Item>

      <Form.Item name="website" label="Website">
        <Input placeholder="https://www.example.com" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      >
        <Input placeholder="contact@brand.com" />
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input placeholder="+1-XXX-XXX-XXXX" />
      </Form.Item>

      <Form.Item name="logo" label="Brand Logo">
        <Upload listType="picture-card" maxCount={1}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item name="status" label="Status" valuePropName="checked">
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
      </Form.Item>

      <Form.Item>
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setIsCreateModalOpen(false);
              setIsEditModalOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            {selectedBrand ? "Update Brand" : "Create Brand"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <DynamicTable
        title="Product Brands"
        columns={columns}
        data={brands}
        showAdd
        addButtonText="Add Brand"
        onAdd={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
        rowKey="key"
        scroll={{ x: 1400 }}
      />

      {/* View Brand Modal */}
      <DynamicModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Brand Details - ${selectedBrand?.name}`}
        width={700}
        footer={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalOpen(false);
              handleEdit(selectedBrand!);
            }}
          >
            Edit Brand
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedBrand && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Text type="secondary">Brand Code</Text>
              <div>
                <Text strong code>
                  {selectedBrand.code}
                </Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Brand Name</Text>
              <div>
                <Text strong style={{ fontSize: 18 }}>
                  {selectedBrand.name}
                </Text>
              </div>
            </div>
            {selectedBrand.description && (
              <div>
                <Text type="secondary">Description</Text>
                <div>
                  <Text>{selectedBrand.description}</Text>
                </div>
              </div>
            )}
            {selectedBrand.website && (
              <div>
                <Text type="secondary">Website</Text>
                <div>
                  <a
                    href={selectedBrand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedBrand.website}
                  </a>
                </div>
              </div>
            )}
            {selectedBrand.email && (
              <div>
                <Text type="secondary">Email</Text>
                <div>
                  <Text>{selectedBrand.email}</Text>
                </div>
              </div>
            )}
            {selectedBrand.phone && (
              <div>
                <Text type="secondary">Phone</Text>
                <div>
                  <Text>{selectedBrand.phone}</Text>
                </div>
              </div>
            )}
            <div>
              <Text type="secondary">Products Count</Text>
              <div>
                <Tag color="blue" icon={<TagsOutlined />}>
                  {selectedBrand.productCount} Products
                </Tag>
              </div>
            </div>
            <div>
              <Text type="secondary">Status</Text>
              <div>
                <Tag
                  icon={
                    selectedBrand.status === "active" ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                  color={getStatusColor(selectedBrand.status)}
                >
                  {selectedBrand.status.toUpperCase()}
                </Tag>
              </div>
            </div>
          </Space>
        )}
      </DynamicModal>

      {/* Create Brand Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Add New Brand"
        width={700}
        footer={null}
      >
        <BrandForm onFinish={handleCreateBrand} />
      </DynamicModal>

      {/* Edit Brand Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title={`Edit Brand - ${selectedBrand?.name}`}
        width={700}
        footer={null}
      >
        <BrandForm onFinish={handleUpdateBrand} />
      </DynamicModal>
    </div>
  );
}
