import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../styles";
import { Flex, Spin, type FlexProps } from "antd";
import { Navbar } from "../content";

export interface MainLayoutProps extends FlexProps {
  style?: Omit<CSSProperties, "padding">;
  isLoading?: boolean;
  children: ReactNode;
}

const defaultStyle: CSSProperties = {
  background: colors["gray-10"],
  paddingInline: "2rem",
  paddingBottom: "2rem",
  paddingTop: "0rem",
  boxSizing: "border-box",
  width: "100%",
  minHeight: "calc(100vh - 2rem)",
};

const innerStyle: CSSProperties = {
  background: colors['gray-2'],
  borderRadius: "0.5rem",
  padding: "2rem",
  boxSizing: "border-box",
  minHeight: "calc(100vh - 7rem)",
};

function MainLayout({
  children,
  style,
  vertical = true,
  isLoading = false,
  ...props
}: MainLayoutProps) {
  return (
    <Flex vertical style={defaultStyle}>
      <Navbar />
      <Flex vertical={vertical} {...props} style={{ ...innerStyle, ...style }}>
        {!isLoading ? (
          children
        ) : (
          <Spin data-testid="spinner" fullscreen size="large" />
        )}
      </Flex>
    </Flex>
  );
}

export default MainLayout;
