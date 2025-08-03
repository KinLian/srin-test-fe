import { useNavigate } from "react-router";
import { Navbar } from "../../../../components/content";
import { render, screen } from "@testing-library/react";
import { act } from "react";

// -------------------------- Mocks ------------------------------------
const useNavigateMocking = useNavigate as jest.Mock;
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

// -------------------------- Variables --------------------------------
const mockUseNavigate = jest.fn();

describe("Navbar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent() {
    useNavigateMocking.mockReturnValue(mockUseNavigate);

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
      ["phone", "phone"],
    ];

    buttonTitleWithUrls.forEach((it, index) => {
      const button = screen.getByTestId(it[0]);
      expect(button).toBeVisible();
      act(() => button.click());
      expect(mockUseNavigate).toHaveBeenCalledTimes(index + 1);
      expect(mockUseNavigate).toHaveBeenCalledWith(it[1]);
    });
  });
});
