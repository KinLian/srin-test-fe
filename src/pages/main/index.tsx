import { Card } from "antd";
import { MainLayout } from "../../components/layout";
import { useNavigate } from "react-router";
import Title from "antd/es/typography/Title";

function HomePage() {
  const navigate = useNavigate();

  return (
    <MainLayout
      justify="center"
      style={{
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Title>SRIN Take Home Test</Title>
        <Title level={3}>Electronics Catalogue</Title>
      </div>
      <div style={{ marginTop: "4rem", justifyItems: "center" }}>
        <Card
          hoverable
          color="default"
          style={{
            fontSize: "2rem",
            paddingInline: "4rem",
            paddingBlock: "2rem",
            width: "fit-content",
          }}
          onClick={() => navigate("/phone")}
        >
          Phones
        </Card>
      </div>
    </MainLayout>
  );
}

export default HomePage;
