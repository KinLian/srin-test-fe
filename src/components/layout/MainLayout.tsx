import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../styles";
import { Flex, type FlexProps } from "antd";

interface MainLayoutProps extends FlexProps {
  style?: CSSProperties;
  children: ReactNode;
}

const defaultStyle: CSSProperties = {
  background: colors["gray-10"],
  padding: "2rem",
  minWidth: "calc(100vw - 4rem)",
  minHeight: "calc(100vh - 4rem)",
};

const innerStyle: CSSProperties = {
  background: "white",
  borderRadius: "0.5rem",
  paddingInline: "2rem",
  paddingBlock: "2rem",
  minHeight: "calc(100vh - 8rem)",
};

function MainLayout({
  children,
  style,
  vertical = true,
  ...props
}: MainLayoutProps) {
  return (
    <div style={defaultStyle}>
      <Flex vertical={vertical} {...props} style={{ ...style, ...innerStyle }}>
        {children}
      </Flex>
    </div>
  );
}

export default MainLayout;
