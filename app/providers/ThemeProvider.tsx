"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

type Theme = "light" | "dark";

interface ThemeContextType {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize theme from localStorage (client-side only)
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || "light";
    }
    return "light";
  });

  // Sync theme to DOM and localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            algorithm:
              currentTheme === "dark"
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            token: {
              // Modern Color Palette
              colorPrimary: "#4F46E5", // Indigo - modern and professional
              colorSuccess: "#10B981", // Emerald
              colorWarning: "#F59E0B", // Amber
              colorError: "#EF4444", // Red
              colorInfo: "#3B82F6", // Blue
              colorTextBase: currentTheme === "dark" ? "#F9FAFB" : "#111827",
              colorBgBase: currentTheme === "dark" ? "#111827" : "#FFFFFF",

              // Typography - Modern font system
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: 14,
              fontSizeHeading1: 38,
              fontSizeHeading2: 30,
              fontSizeHeading3: 24,
              fontSizeHeading4: 20,
              fontSizeHeading5: 16,
              lineHeight: 1.6,
              lineHeightHeading1: 1.2,
              lineHeightHeading2: 1.3,
              lineHeightHeading3: 1.4,

              // Border & Radius - Softer, more modern
              borderRadius: 8,
              borderRadiusLG: 12,
              borderRadiusSM: 6,
              borderRadiusXS: 4,

              // Spacing - More generous, breathable
              padding: 16,
              paddingLG: 24,
              paddingSM: 12,
              paddingXS: 8,
              margin: 16,
              marginLG: 24,
              marginSM: 12,
              marginXS: 8,

              // Control Heights - Comfortable sizing
              controlHeight: 36,
              controlHeightLG: 44,
              controlHeightSM: 28,

              // Shadows - Subtle, modern elevation
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              boxShadowSecondary:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              boxShadowTertiary:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",

              // Motion - Smooth, polished
              motionDurationSlow: "0.3s",
              motionDurationMid: "0.2s",
              motionDurationFast: "0.1s",

              // Wireframe - Clean, minimal borders
              wireframe: false,

              // Color variations for depth
              colorBgContainer: currentTheme === "dark" ? "#1F2937" : "#FFFFFF",
              colorBgElevated: currentTheme === "dark" ? "#374151" : "#FFFFFF",
              colorBgLayout: currentTheme === "dark" ? "#0F172A" : "#F9FAFB",
              colorBorder: currentTheme === "dark" ? "#374151" : "#E5E7EB",
              colorBorderSecondary:
                currentTheme === "dark" ? "#4B5563" : "#F3F4F6",

              // Text colors
              colorText: currentTheme === "dark" ? "#F9FAFB" : "#111827",
              colorTextSecondary:
                currentTheme === "dark" ? "#D1D5DB" : "#6B7280",
              colorTextTertiary:
                currentTheme === "dark" ? "#9CA3AF" : "#9CA3AF",
              colorTextQuaternary:
                currentTheme === "dark" ? "#6B7280" : "#D1D5DB",
            },
            components: {
              Button: {
                primaryShadow: "0 2px 0 rgba(79, 70, 229, 0.1)",
                controlHeight: 38,
                controlHeightLG: 46,
                controlHeightSM: 30,
                paddingContentHorizontal: 20,
                fontWeight: 500,
              },
              Card: {
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                boxShadowTertiary:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                borderRadiusLG: 12,
                paddingLG: 24,
              },
              Table: {
                headerBg: currentTheme === "dark" ? "#1F2937" : "#F9FAFB",
                headerColor: currentTheme === "dark" ? "#F9FAFB" : "#111827",
                borderRadius: 8,
                borderRadiusLG: 12,
                padding: 16,
                paddingSM: 12,
              },
              Menu: {
                itemBg: "transparent",
                itemBorderRadius: 6,
                itemMarginBlock: 4,
                itemMarginInline: 8,
                itemPaddingInline: 12,
              },
              Input: {
                controlHeight: 38,
                controlHeightLG: 46,
                controlHeightSM: 30,
                borderRadius: 6,
                paddingBlock: 8,
                paddingInline: 12,
              },
              Select: {
                controlHeight: 38,
                controlHeightLG: 46,
                controlHeightSM: 30,
                borderRadius: 6,
              },
              Modal: {
                borderRadiusLG: 12,
                paddingLG: 24,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              },
              Drawer: {
                paddingLG: 24,
              },
              Notification: {
                borderRadiusLG: 12,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
              },
              Message: {
                borderRadiusLG: 8,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              },
              Tag: {
                borderRadiusSM: 4,
                fontSizeSM: 12,
              },
              Statistic: {
                titleFontSize: 14,
                contentFontSize: 28,
              },
              Layout: {
                headerBg: currentTheme === "dark" ? "#1F2937" : "#FFFFFF",
                bodyBg: currentTheme === "dark" ? "#0F172A" : "#F9FAFB",
                siderBg: currentTheme === "dark" ? "#1F2937" : "#FFFFFF",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </ThemeContext.Provider>
  );
}
