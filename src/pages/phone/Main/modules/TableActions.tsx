import { Button, Flex } from "antd";
import type { PhoneType } from "../../../../types";
import { useNavigate } from "react-router";

export interface TableActionsProps {
  value: PhoneType;
}

function TableActions({ value }: TableActionsProps) {
  const navigate = useNavigate();

  return (
    <Flex gap="0.5rem">
      <Button
        variant="outlined"
        color="blue"
        onClick={() => navigate(`${value["id"]}`)}
      >
        Detail
      </Button>
      <Button
        variant="outlined"
        color="blue"
        onClick={() => navigate(`${value["id"]}/edit`)}
      >
        Edit
      </Button>
      <Button onClick={() => navigate(`${value["id"]}`)}>Delete</Button>
    </Flex>
  );
}

export default TableActions;
