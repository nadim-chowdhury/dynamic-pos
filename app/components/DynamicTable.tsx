"use client";

import React, { useState } from "react";
import { Table, Input, Button, Space, Row, Col, Card, Tag } from "antd";
import type { TableProps, ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";

export interface DynamicTableColumn<T> {
  title: string;
  dataIndex?: string;
  key: string;
  width?: number | string;
  fixed?: "left" | "right";
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  filters?: { text: string; value: string | number | boolean }[];
  onFilter?: (value: any, record: T) => boolean;
  searchable?: boolean;
  align?: "left" | "right" | "center";
  ellipsis?: boolean;
}

export interface DynamicTableProps<T> {
  columns: DynamicTableColumn<T>[];
  data: T[];
  loading?: boolean;
  title?: string;
  showSearch?: boolean;
  showRefresh?: boolean;
  showExport?: boolean;
  showAdd?: boolean;
  addButtonText?: string;
  onAdd?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onSearch?: (value: string) => void;
  pagination?: TableProps<T>["pagination"];
  rowSelection?: TableProps<T>["rowSelection"];
  rowKey?: string | ((record: T) => string);
  size?: "small" | "middle" | "large";
  scroll?: { x?: number | string; y?: number | string };
  bordered?: boolean;
  customActions?: React.ReactNode;
  summary?: TableProps<T>["summary"];
}

export default function DynamicTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  title,
  showSearch = true,
  showRefresh = true,
  showExport = true,
  showAdd = false,
  addButtonText = "Add New",
  onAdd,
  onRefresh,
  onExport,
  onSearch,
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
  },
  rowSelection,
  rowKey = "key",
  size = "middle",
  scroll,
  bordered = false,
  customActions,
  summary,
}: DynamicTableProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    } else {
      // Default search implementation
      if (!value.trim()) {
        setFilteredData(data);
        return;
      }

      const searchLower = value.toLowerCase();
      const filtered = data.filter((record) =>
        Object.values(record).some((val) =>
          String(val).toLowerCase().includes(searchLower)
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleRefresh = () => {
    setSearchText("");
    setFilteredData(data);
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export to CSV - only export columns with dataIndex
      const exportableColumns = columns.filter((col) => col.dataIndex);
      const headers = exportableColumns.map((col) => col.title).join(",");
      const rows = filteredData.map((record) =>
        exportableColumns.map((col) => record[col.dataIndex!] || "").join(",")
      );
      const csv = [headers, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "table"}-${new Date().getTime()}.csv`;
      a.click();
    }
  };

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const tableColumns: ColumnsType<T> = columns.map((col) => ({
    title: col.title,
    dataIndex: col.dataIndex,
    key: col.key,
    width: col.width,
    fixed: col.fixed,
    render: col.render,
    sorter: col.sorter,
    filters: col.filters,
    onFilter: col.onFilter,
    align: col.align,
  }));

  return (
    <Card
      title={title}
      bordered={bordered}
      extra={
        <Space wrap>
          {showSearch && (
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
          )}
          {customActions}
          {showRefresh && (
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              Refresh
            </Button>
          )}
          {showExport && (
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              Export
            </Button>
          )}
          {showAdd && onAdd && (
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
              {addButtonText}
            </Button>
          )}
        </Space>
      }
    >
      <Table<T>
        columns={tableColumns}
        dataSource={filteredData}
        loading={loading}
        pagination={pagination}
        rowSelection={rowSelection}
        rowKey={rowKey}
        size={size}
        scroll={scroll}
        bordered={bordered}
        summary={summary}
      />
    </Card>
  );
}
