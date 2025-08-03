import { Navbar } from "../../../../components/content";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent() {
    render(<Navbar />);
  }

  it("should render component", async () => {
    renderComponent();
    const buttonTitles = ["Home", "Phones"];

    buttonTitles.forEach((title) => {
      const button = screen.getByText(title);
      expect(button).toBeVisible();
    });
  });

  it("should click", async () => {
    renderComponent();
    const buttonTitleWithUrls = [
      ["home", "/"],
      ["phone", "/phone"],
    ];

    buttonTitleWithUrls.forEach((it) => {
      const button = screen.getByTestId(it[0]);
      expect(button).toBeVisible();
      expect(button).toHaveRole("link");
      expect(button).toHaveAttribute("href", it[1]);
    });
  });
});
