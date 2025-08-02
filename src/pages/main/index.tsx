import { Card, Typography } from "antd";
import { MainLayout } from "../../components/layout";
import { useNavigate } from "react-router";
const { Title } = Typography;

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
            fontWeight: "600",
            color: "white",
            backgroundSize: "cover",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backgroundImage:
              "url('https://cdn.thewirecutter.com/wp-content/media/2025/02/BEST-ANDROID-PHONES-2048px-samsung25ultra-hero.jpg?auto=webp&quality=75&width=1024')",
            backgroundBlendMode: "overlay",
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
