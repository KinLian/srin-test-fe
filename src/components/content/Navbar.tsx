import { Button, Flex } from "antd";
import { colors } from "../../styles";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex
      gap="1rem"
      style={{
        width: "calc(100vw - 4rem)",
        paddingLeft: "1rem",
        alignItems: "center",
        background: colors["gray-10"],
        height: "5rem",
      }}
    >
      <Button
        data-testid="home"
        variant="link"
        style={{ color: "white", background: "transparent", border: "0" }}
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      <Button
        data-testid="phone"
        variant="link"
        style={{ color: "white", background: "transparent", border: "0" }}
        onClick={() => navigate("phone")}
      >
        Phones
      </Button>
    </Flex>
  );
}

export default Navbar;
