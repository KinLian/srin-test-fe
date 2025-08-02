import { Flex, Typography } from "antd";
const { Title, Text } = Typography;

interface TextWithDescProps {
  title: string;
  desc?: string;
}

function TextWithDesc({ title, desc }: TextWithDescProps) {
  const formattedDesc = desc === null || desc === "" ? "-" : desc;
  return (
    <Flex vertical gap="0.5">
      <Title level={5}>{title}</Title>
      <Text>{formattedDesc}</Text>
    </Flex>
  );
}

export default TextWithDesc;
