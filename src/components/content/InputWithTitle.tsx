import { Flex, Input, type InputProps, Typography } from "antd";
const { Text } = Typography;

export interface InputWithTitleProps extends InputProps {
  title: string;
}

function InputWithTitle({ title, ...props }: InputWithTitleProps) {
  return (
    <Flex vertical gap="0.75rem" style={{ width: "100%" }}>
      <Text>{title}</Text>
      <Input {...props} />
    </Flex>
  );
}

export default InputWithTitle;
