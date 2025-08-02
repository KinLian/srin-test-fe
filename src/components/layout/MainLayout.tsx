import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../styles";
import { Flex, Spin, type FlexProps } from "antd";

interface MainLayoutProps extends FlexProps {
  style?: Omit<CSSProperties, "padding">;
  isLoading?: boolean;
  children: ReactNode;
}

const defaultStyle: CSSProperties = {
  background: colors["gray-10"],
  padding: "2rem",
  boxSizing: "border-box",
  maxWidth: "100vw",
  minHeight: "98vh",
};

const innerStyle: CSSProperties = {
  background: "white",
  borderRadius: "0.5rem",
  padding: "2rem",
  boxSizing: "border-box",
  width: "calc(100vw - 5rem)",
  minHeight: "calc(100vh - 5rem)",
};

function MainLayout({
  children,
  style,
  vertical = true,
  isLoading = true,
  ...props
}: MainLayoutProps) {
  return (
    <Flex style={defaultStyle}>
      <Flex vertical={vertical} {...props} style={{ ...style, ...innerStyle }}>
        {isLoading ? children : <Spin fullscreen size="large" />}
      </Flex>
    </Flex>
  );
}

export default MainLayout;
