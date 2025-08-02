import { colors } from "../../styles";

interface TextBadgeProps {
  text: string;
  bg?: string;
  color?: string;
}

function TextBadge({
  text,
  bg = colors["blue-1"],
  color = "black",
}: TextBadgeProps) {
  return (
    <div
      style={{
        background: bg,
        color,
        paddingBlock: "0.25rem",
        paddingInline: "0.5rem",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      {text}
    </div>
  );
}

export default TextBadge;
