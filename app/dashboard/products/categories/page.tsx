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
  ColorPicker,
  Upload,
  Image,
} from "antd";
import type { Color } from "antd/es/color-picker";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  UploadOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import DynamicTable, {
  DynamicTableColumn,
} from "../../../components/DynamicTable";
import DynamicModal from "../../../components/DynamicModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Category {
  key: string;
  name: string;
  code: string;
  description?: string;
  color?: string;
  productCount: number;
  icon?: string;
}

// CategoryForm component - moved outside to avoid recreation on render
interface CategoryFormProps {
  form: any;
  onFinish: (values: any) => void;
  onCancel: () => void;
  selectedCategory: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  form,
  onFinish,
  onCancel,
  selectedCategory,
}) => (
  <Form form={form} layout="vertical" onFinish={onFinish}>
    <Form.Item
      name="code"
      label="Category Code"
      rules={[
        { required: true, message: "Please enter category code" },
        { max: 10, message: "Code must be maximum 10 characters" },
      ]}
    >
      <Input placeholder="e.g., ELEC" style={{ textTransform: "uppercase" }} />
    </Form.Item>

    <Form.Item
      name="name"
      label="Category Name"
      rules={[{ required: true, message: "Please enter category name" }]}
    >
      <Input placeholder="Enter category name" />
    </Form.Item>

    <Form.Item name="description" label="Description">
      <TextArea rows={3} placeholder="Enter category description (optional)" />
    </Form.Item>

    <Form.Item name="color" label="Category Color" initialValue="#1677ff">
      <ColorPicker showText format="hex" />
    </Form.Item>

    <Form.Item name="icon" label="Category Icon">
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
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          {selectedCategory ? "Update Category" : "Create Category"}
        </Button>
      </Space>
    </Form.Item>
  </Form>
);

// Demo categories data
const demoCategories: Category[] = [
  {
    key: "1",
    name: "Electronics",
    code: "ELEC",
    description: "Electronic devices and accessories",
    color: "#1677ff",
    productCount: 45,
  },
  {
    key: "2",
    name: "Accessories",
    code: "ACC",
    description: "Computer and device accessories",
    color: "#52c41a",
    productCount: 32,
  },
  {
    key: "3",
    name: "Audio",
    code: "AUD",
    description: "Audio equipment and headphones",
    color: "#722ed1",
    productCount: 18,
  },
  {
    key: "4",
    name: "Office",
    code: "OFF",
    description: "Office supplies and equipment",
    color: "#fa8c16",
    productCount: 27,
  },
  {
    key: "5",
    name: "Furniture",
    code: "FURN",
    description: "Office and home furniture",
    color: "#eb2f96",
    productCount: 12,
  },
  {
    key: "6",
    name: "Gaming",
    code: "GAM",
    description: "Gaming peripherals and accessories",
    color: "#13c2c2",
    productCount: 23,
  },
  {
    key: "7",
    name: "Networking",
    code: "NET",
    description: "Network devices and cables",
    color: "#faad14",
    productCount: 15,
  },
  {
    key: "8",
    name: "Storage",
    code: "STOR",
    description: "Storage devices and solutions",
    color: "#2f54eb",
    productCount: 19,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record: Category) => {
    setSelectedCategory(record);
    form.setFieldsValue({
      ...record,
      color: record.color,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Category) => {
    if (record.productCount > 0) {
      message.warning(
        `Cannot delete category "${record.name}" as it has ${record.productCount} products assigned`
      );
      return;
    }
    message.success(`Category "${record.name}" deleted successfully`);
    setCategories(categories.filter((category) => category.key !== record.key));
  };

  const getActionItems = (record: Category): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
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

  const columns: DynamicTableColumn<Category>[] = [
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 80,
      align: "center",
      render: (color: string) => (
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: color || "#d9d9d9",
            borderRadius: 4,
            margin: "0 auto",
          }}
        />
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 120,
      render: (code: string) => <Text code>{code}</Text>,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string) => <Text strong>{name}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
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
        <Tag color={count > 0 ? "blue" : "default"} icon={<AppstoreOutlined />}>
          {count} {count === 1 ? "Product" : "Products"}
        </Tag>
      ),
      sorter: (a, b) => a.productCount - b.productCount,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record: Category) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
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

  const handleCreateCategory = (values: any) => {
    const newCategory: Category = {
      key: String(Date.now()),
      ...values,
      color:
        typeof values.color === "string"
          ? values.color
          : values.color?.toHexString(),
      productCount: 0,
    };
    setCategories([newCategory, ...categories]);
    message.success("Category created successfully");
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleUpdateCategory = (values: any) => {
    const updatedCategories = categories.map((category) =>
      category.key === selectedCategory?.key
        ? {
            ...category,
            ...values,
            color:
              typeof values.color === "string"
                ? values.color
                : values.color?.toHexString(),
          }
        : category
    );
    setCategories(updatedCategories);
    message.success("Category updated successfully");
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
        title="Product Categories"
        columns={columns}
        data={categories}
        showAdd
        addButtonText="Add Category"
        onAdd={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
        rowKey="key"
        scroll={{ x: 1000 }}
      />

      {/* Create Category Modal */}
      <DynamicModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        title="Add New Category"
        width={600}
        footer={null}
      >
        <CategoryForm
          form={form}
          onFinish={handleCreateCategory}
          onCancel={handleCancelForm}
          selectedCategory={null}
        />
      </DynamicModal>

      {/* Edit Category Modal */}
      <DynamicModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        title={`Edit Category - ${selectedCategory?.name}`}
        width={600}
        footer={null}
      >
        <CategoryForm
          form={form}
          onFinish={handleUpdateCategory}
          onCancel={handleCancelForm}
          selectedCategory={selectedCategory}
        />
      </DynamicModal>
    </div>
  );
}
