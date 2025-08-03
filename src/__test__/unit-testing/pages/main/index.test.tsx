import { render, screen } from "@testing-library/react";
import HomePage from "../../../../pages/main";
import { useNavigate } from "react-router";

// -------------------------- Mocks ------------------------------------
const useNavigateMocking = useNavigate as jest.Mock;
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../../components/content/Navbar", () => ({
  __esModule: true,
  default: () => <p>Navbar</p>,
}));
// -------------------------- Variables --------------------------------
const mockUseNavigate = jest.fn();

describe("Home Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent() {
    useNavigateMocking.mockReturnValue(mockUseNavigate);

    render(<HomePage />);
  }

  it("should render component", async () => {
    renderComponent();

    const titleText = screen.getByText("SRIN Take Home Test");
    const subtitleText = screen.getByText("Electronics Catalogue");

    expect(titleText).toBeVisible();
    expect(subtitleText).toBeVisible();
  });

  it("should show card & clickable", async () => {
    renderComponent();

    const cardTitleAndUrls = [["Phones", "/phone"]];
    cardTitleAndUrls.forEach((it) => {
      const button = screen.getByText(it[0]);
      expect(button).toBeVisible();

      button.click();
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
