import { Button, Flex } from "antd";
import { colors } from "../../styles";

function Navbar() {
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
        href="/"
        style={{ color: "white", background: "transparent", border: "0" }}
      >
        Home
      </Button>
      <Button
        data-testid="phone"
        variant="link"
        href="/phone"
        style={{ color: "white", background: "transparent", border: "0" }}
      >
        Phones
      </Button>
    </Flex>
  );
}

export default Navbar;
