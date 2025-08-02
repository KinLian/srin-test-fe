import {
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
const { Title } = Typography;

const columnTitles = ["Model", "Price", "OS"];

const columns: TableColumnsType = columnTitles.map((it: string) => ({
  title: it,
  dataIndex: it.toLowerCase(),
  key: it.toLowerCase(),
}));
const actionColumns: TableColumnsType = [
  {
    title: "Actions",
    width: 90,
  },
];

function PhonePage() {
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
    <MainLayout gap="2rem" isLoading={Boolean(!data)}>
      <Title>Phones</Title>
      <Table dataSource={convertedDatas} columns={columnsWithSources} />
    </MainLayout>
  );
}

export default PhonePage;
