import { Button, Flex } from "antd";
import type { PhoneType } from "../../../../types";
import { useNavigate } from "react-router";
import { urlSinglePhone } from "../../../../const/apiUrl";
import { useSend } from "../../../../hooks";

export interface TableActionsProps {
  value: PhoneType;
}

function TableActions({ value }: TableActionsProps) {
  const navigate = useNavigate();
  const { call } = useSend("DELETE");

  function handleDelete(id: string) {
    call(urlSinglePhone(id), null, { onSuccess });
  }

  function onSuccess() {
    navigate(0);
  }

  return (
    <Flex gap="0.5rem">
      <Button
        variant="outlined"
        color="blue"
        onClick={() => navigate(value["id"])}
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
      <Button
        variant="outlined"
        color="red"
        onClick={() => handleDelete(value["id"])}
      >
        Delete
      </Button>
    </Flex>
  );
}

export default TableActions;
