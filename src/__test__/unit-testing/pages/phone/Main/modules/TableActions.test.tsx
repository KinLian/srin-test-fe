import { render, screen } from "@testing-library/react";
import { TableActions } from "../../../../../../pages/phone/Main/modules";
import type { TableActionsProps } from "../../../../../../pages/phone/Main/modules/TableActions";
import { useNavigate } from "react-router";
import { useSend } from "../../../../../../hooks";
import type { RequestProps } from "../../../../../../hooks/useSend";
import { act } from "react";

// -------------------------- Mocks ------------------------------------
const useSendMocking = useSend as jest.Mock;
jest.mock("../../../../../../hooks", () => ({
  useSend: jest.fn(),
}));

const useNavigateMocking = useNavigate as jest.Mock;
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

// -------------------------- Variables --------------------------------
const mockUseNavigate = jest.fn();

// ---------------------------- Datas ----------------------------------
const USE_SEND_RESPONSE = {
  call: (url: string, body: unknown, { onSuccess }: RequestProps) =>
    onSuccess(body),
};

describe("Table Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent({ value }: TableActionsProps) {
    useSendMocking.mockReturnValue(USE_SEND_RESPONSE);
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
      act(() => {
        button.click();
      });
      expect(mockUseNavigate).toHaveBeenCalledTimes(index + 1);
    });
  });
});
