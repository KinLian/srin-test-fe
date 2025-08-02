import Title from "antd/es/typography/Title";
import { MainLayout } from "../../../components/layout";
import { useGet } from "../../../hooks";
import type { PhoneType } from "../../../types";
import { urlSinglePhone } from "../../../const/apiUrl";
import { useNavigate, useParams } from "react-router";
import { TextWithDesc } from "../../../components/content";
import { Button, Col, Row } from "antd";

const columnTitles: string[] = [
  "Price",
  "Processor",
  "RAM",
  "Battery",
  "Display",
  "Camera",
  "Card",
  "OS",
];

function PhoneDetailPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data } = useGet<PhoneType>(urlSinglePhone(id));

  return (
    <MainLayout gap="1rem" isLoading={Boolean(data)}>
      <Title style={{ textAlign: "center" }}>{data?.model}</Title>
      <Button
        onClick={() => navigate("edit")}
        style={{
          alignSelf: "center",
          width: "fit-content",
          padding: "1rem 2rem",
        }}
      >
        Edit
      </Button>
      <Row gutter={[24, 24]} style={{ padding: "2rem" }}>
        {columnTitles.map((it: string) => (
          <Col span={12}>
            <TextWithDesc
              title={it}
              desc={data?.[it.toLowerCase() as keyof PhoneType]}
            />
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
}

export default PhoneDetailPage;
