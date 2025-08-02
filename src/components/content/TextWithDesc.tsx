import { Flex, Typography } from "antd";
const { Title, Text } = Typography;

interface TextWithDescProps {
  title: string;
  desc?: string;
}

function TextWithDesc({ title, desc }: TextWithDescProps) {
  return (
    <Flex vertical gap="0.5">
      <Title level={5}>{title}</Title>
      <Text>{desc ?? "-"}</Text>
    </Flex>
  );
}

export default TextWithDesc;
