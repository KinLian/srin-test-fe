import { Button } from "antd";
import { MainLayout } from "../../components/layout";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  return (
    <MainLayout
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>SRIN Take Home Test</h1>
        <h2>Electronics Catalogue</h2>
      </div>
      <div style={{ marginTop: "4rem" }}>
        <Button
          variant="filled"
          color="blue"
          style={{ fontSize: "2rem", padding: "4rem", width: "fit-content" }}
          onClick={() => navigate("/phone")}
        >
          Phones
        </Button>
      </div>
    </MainLayout>
  );
}

export default HomePage;
