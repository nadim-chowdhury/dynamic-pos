'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  TagsOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { useModule, ModuleType } from '../context/ModuleContext';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const posMenuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'sales',
    icon: <ShoppingCartOutlined />,
    label: 'Sales',
    children: [
      { key: 'new-sale', label: 'New Sale' },
      { key: 'sales-list', label: 'Sales List' },
      { key: 'quotations', label: 'Quotations' },
    ],
  },
  {
    key: 'products',
    icon: <AppstoreOutlined />,
    label: 'Products',
    children: [
      { key: 'products-list', label: 'Products List' },
      { key: 'categories', label: 'Categories' },
      { key: 'brands', label: 'Brands' },
    ],
  },
  {
    key: 'inventory',
    icon: <TagsOutlined />,
    label: 'Inventory',
    children: [
      { key: 'stock', label: 'Stock Management' },
      { key: 'adjustments', label: 'Adjustments' },
      { key: 'transfers', label: 'Transfers' },
    ],
  },
  {
    key: 'customers',
    icon: <UserOutlined />,
    label: 'Customers',
  },
  {
    key: 'reports',
    icon: <BarChartOutlined />,
    label: 'Reports',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

const hrmMenuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'employees',
    icon: <TeamOutlined />,
    label: 'Employees',
    children: [
      { key: 'employees-list', label: 'All Employees' },
      { key: 'add-employee', label: 'Add Employee' },
      { key: 'departments', label: 'Departments' },
      { key: 'designations', label: 'Designations' },
    ],
  },
  {
    key: 'attendance',
    icon: <CalendarOutlined />,
    label: 'Attendance',
    children: [
      { key: 'mark-attendance', label: 'Mark Attendance' },
      { key: 'attendance-report', label: 'Attendance Report' },
    ],
  },
  {
    key: 'payroll',
    icon: <DollarOutlined />,
    label: 'Payroll',
    children: [
      { key: 'salary-management', label: 'Salary Management' },
      { key: 'payslips', label: 'Payslips' },
      { key: 'bonuses', label: 'Bonuses' },
    ],
  },
  {
    key: 'leaves',
    icon: <FileTextOutlined />,
    label: 'Leaves',
    children: [
      { key: 'leave-requests', label: 'Leave Requests' },
      { key: 'leave-types', label: 'Leave Types' },
    ],
  },
  {
    key: 'reports',
    icon: <BarChartOutlined />,
    label: 'Reports',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

const accountMenuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'transactions',
    icon: <DollarOutlined />,
    label: 'Transactions',
    children: [
      { key: 'income', label: 'Income' },
      { key: 'expense', label: 'Expense' },
      { key: 'transfers', label: 'Transfers' },
    ],
  },
  {
    key: 'accounts',
    icon: <ShopOutlined />,
    label: 'Accounts',
    children: [
      { key: 'chart-of-accounts', label: 'Chart of Accounts' },
      { key: 'bank-accounts', label: 'Bank Accounts' },
    ],
  },
  {
    key: 'invoices',
    icon: <FileTextOutlined />,
    label: 'Invoices',
    children: [
      { key: 'sales-invoice', label: 'Sales Invoice' },
      { key: 'purchase-invoice', label: 'Purchase Invoice' },
    ],
  },
  {
    key: 'reports',
    icon: <BarChartOutlined />,
    label: 'Reports',
    children: [
      { key: 'balance-sheet', label: 'Balance Sheet' },
      { key: 'profit-loss', label: 'Profit & Loss' },
      { key: 'trial-balance', label: 'Trial Balance' },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

const getMenuItems = (module: ModuleType): MenuItem[] => {
  switch (module) {
    case 'pos':
      return posMenuItems;
    case 'hrm':
      return hrmMenuItems;
    case 'account':
      return accountMenuItems;
    default:
      return posMenuItems;
  }
};

export default function Sidebar() {
  const { currentModule } = useModule();
  const router = useRouter();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    console.log('Menu clicked:', key);

    // Define route mappings
    const routeMap: Record<string, string> = {
      'dashboard': '/dashboard',
      // POS Module
      'new-sale': '/dashboard/sales/new-sale',
      'sales-list': '/dashboard/sales/sales-list',
      'quotations': '/dashboard/sales/quotations',
      'products-list': '/dashboard/products/products-list',
      'categories': '/dashboard/products/categories',
      'brands': '/dashboard/products/brands',
      'stock': '/dashboard/inventory/stock',
      'adjustments': '/dashboard/inventory/adjustments',
      'transfers': '/dashboard/inventory/transfers',
      'customers': '/dashboard/customers',
      'reports': '/dashboard/reports',
      'settings': '/dashboard/settings',
      // HRM Module
      'employees-list': '/dashboard/hrm/employees-list',
      'add-employee': '/dashboard/hrm/add-employee',
      'departments': '/dashboard/hrm/departments',
      'designations': '/dashboard/hrm/designations',
      'mark-attendance': '/dashboard/hrm/mark-attendance',
      'attendance-report': '/dashboard/hrm/attendance-report',
      'salary-management': '/dashboard/hrm/salary-management',
      'payslips': '/dashboard/hrm/payslips',
      'bonuses': '/dashboard/hrm/bonuses',
      'leave-requests': '/dashboard/hrm/leave-requests',
      'leave-types': '/dashboard/hrm/leave-types',
      // Account Module
      'income': '/dashboard/account/income',
      'expense': '/dashboard/account/expense',
      'chart-of-accounts': '/dashboard/account/chart-of-accounts',
      'bank-accounts': '/dashboard/account/bank-accounts',
      'sales-invoice': '/dashboard/account/sales-invoice',
      'purchase-invoice': '/dashboard/account/purchase-invoice',
      'balance-sheet': '/dashboard/account/balance-sheet',
      'profit-loss': '/dashboard/account/profit-loss',
      'trial-balance': '/dashboard/account/trial-balance',
    };

    const route = routeMap[key];
    if (route) {
      router.push(route);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      defaultOpenKeys={[]}
      items={getMenuItems(currentModule)}
      onClick={handleMenuClick}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
}
