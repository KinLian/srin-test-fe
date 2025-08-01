import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../styles";

interface MainLayoutProps {
  style?: CSSProperties;
  children: ReactNode;
}

const defaultStyle: CSSProperties = {
  background: colors["blue-1"],
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

function MainLayout({ children, style }: MainLayoutProps) {
  return (
    <div style={defaultStyle}>
      <div style={{ ...style, ...innerStyle }}>{children}</div>
    </div>
  );
}

export default MainLayout;
