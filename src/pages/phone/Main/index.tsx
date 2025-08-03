import {
  Button,
  Flex,
  Table,
  Typography,
  type TableColumnsType,
  type TableColumnType,
} from "antd";
import { MainLayout } from "../../../components/layout";
import { urlPhone } from "../../../const/apiUrl";
import { useGet } from "../../../hooks";
import type { PhoneType } from "../../../types";
import type { ColumnsType } from "antd/es/table/interface";
import { TableActions } from "./modules";
import { useNavigate } from "react-router";
const { Title } = Typography;

const columnTitles = ["Model", "Price", "OS"];

const columns: TableColumnsType = columnTitles.map((it: string) => ({
  title: it,
  dataIndex: it.toLowerCase(),
  key: it.toLowerCase(),
  filterMode: "tree",
  filterSearch: true,
  onFilter: (value, record) => record.name.startsWith(value as string),
  width: "30%",
}));
const actionColumns: TableColumnsType = [
  {
    title: "Actions",
    width: 90,
  },
];

function PhonePage() {
  const navigate = useNavigate();
  const { data } = useGet<PhoneType[]>(urlPhone);

  const convertedDatas: ColumnsType = (data ?? [])?.map(
    (it: PhoneType, idx: number) => ({
      key: idx,
      ...it,
    })
  );
  const convertedActions: ColumnsType = actionColumns.map(
    (it: TableColumnType) => ({
      ...it,
      render: (value: PhoneType) => <TableActions value={value} />,
    })
  );

  const columnsWithSources = [...columns, ...convertedActions];
  return (
    <MainLayout
      style={{
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backgroundImage:
          "url('https://cdn.thewirecutter.com/wp-content/media/2025/02/BEST-ANDROID-PHONES-2048px-samsung25ultra-hero.jpg?auto=webp&quality=75&width=1024)'",
        backgroundBlendMode: "overlay",
      }}
      gap="2rem"
      isLoading={Boolean(!data)}
    >
      <Flex gap="2rem" justify="space-between" align="center">
        <Title>Phones</Title>
        <Button
          data-testid="add"
          size="large"
          color="blue"
          variant="outlined"
          onClick={() => navigate("add")}
        >
          Add More
        </Button>
      </Flex>
      <Table
        dataSource={convertedDatas}
        columns={columnsWithSources}
        style={{
          overflow: "hidden",
          background: "white",
          borderRadius: "0.5rem",
          opacity: "0.95",
          margin: "0",

          padding: "rem",
        }}
      />
    </MainLayout>
  );
}

export default PhonePage;
