import { render, screen } from "@testing-library/react";
import { TableActions } from "../../../../../../pages/phone/Main/modules";
import type { TableActionsProps } from "../../../../../../pages/phone/Main/modules/TableActions";
import { useNavigate } from "react-router";

// -------------------------- Mocks ------------------------------------
const useNavigateMocking = useNavigate as jest.Mock;
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

// -------------------------- Variables --------------------------------
const mockUseNavigate = jest.fn();

describe("Main Layout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent({ value }: TableActionsProps) {
    useNavigateMocking.mockReturnValue(mockUseNavigate);

    render(<TableActions value={value} />);
  }

  it("should render component without optional values", async () => {
    const value = { id: "ID" };
    renderComponent({ value });

    const buttonTitlesAndUrls = ["Detail", "Edit", "Delete"];

    buttonTitlesAndUrls.forEach((title, index) => {
      const button = screen.getByText(title);
      expect(button).toBeVisible();
      button.click();
      expect(mockUseNavigate).toHaveBeenCalledTimes(index + 1);
    });
  });
});
