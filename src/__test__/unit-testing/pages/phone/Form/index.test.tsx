import { render, screen } from "@testing-library/react";
import { useNavigate, useParams } from "react-router";
import { act } from "react";
import { PhoneFormPage } from "../../../../../pages/phone";
import { useGet, useSend, type RequestProps } from "../../../../../hooks";

// -------------------------- Mocks ------------------------------------
const useGetMocking = useGet as jest.Mock;
const useSendMocking = useSend as jest.Mock;
jest.mock("../../../../../hooks", () => ({
  useGet: jest.fn(),
  useSend: jest.fn(),
}));

const useParamsMocking = useParams as jest.Mock;
const useNavigateMocking = useNavigate as jest.Mock;
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// -------------------------- Variables --------------------------------
const mockCallFunction = (
  url: string,
  body: unknown,
  { onSuccess }: RequestProps
) => onSuccess({ url, body });
const mockUseNavigate = jest.fn();
const mockCall = jest.fn();

// ---------------------------- Datas ----------------------------------
const USE_PARAMS_DATA = {
  id: "ID",
};
const USE_GET_RESPONSE = {
  data: {
    id: "ID 0",
    model: "MODEL 0",
    os: "OS 0",
    price: "PRICE 0",
    processor: "PROCESSOR 0",
    ram: "RAM 0",
    battery: "BATTERY 0",
    display: "DISPLAY 0",
    camera: "CAMERA 0",
    card: "CARD 0",
  },
};
const USE_SEND_RESPONSE = {
  call: mockCall,
};

describe("Phone Form", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(params: { id: string }) {
    mockCall.mockImplementation(mockCallFunction);
    useGetMocking.mockReturnValue(USE_GET_RESPONSE);
    useSendMocking.mockReturnValue(USE_SEND_RESPONSE);
    useParamsMocking.mockReturnValue(params);
    useNavigateMocking.mockReturnValue(mockUseNavigate);

    render(<PhoneFormPage />);
  }

  it("should render component with", async () => {
    renderComponent(USE_PARAMS_DATA);

    const inputTitles: string[] = [
      "Model",
      "Price",
      "Processor",
      "RAM",
      "Battery",
      "Display",
      "Camera",
      "Card",
      "OS",
    ];

    inputTitles.forEach((title) => {
      const input = screen.getByText(title);
      expect(input).toBeVisible();
    });
  });

  it("should be able to submit (edit)", async () => {
    renderComponent(USE_PARAMS_DATA);

    const button = screen.getByText("Submit");
    expect(button).toBeVisible();
    act(() => {
      button.click();
    });

    // Hold for setTimeout
    await act(async () => await new Promise((res) => setTimeout(res, 3000)));
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  }, 4000);

  it("should be able to submit (add)", async () => {
    renderComponent({ id: "" });

    const button = screen.getByText("Submit");
    expect(button).toBeVisible();
    act(() => {
      button.click();
    });

    // Hold for setTimeout
    await act(async () => await new Promise((res) => setTimeout(res, 3000)));
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  }, 4000);

  it("should not be able to submit (empty model input)", async () => {
    USE_GET_RESPONSE["data"]["model"] = "";
    renderComponent({ id: "" });

    const button = screen.getByText("Submit");
    expect(button).toBeVisible();
    act(() => {
      button.click();
    });

    // Hold for setTimeout
    await act(async () => await new Promise((res) => setTimeout(res, 3000)));
    expect(mockUseNavigate).toHaveBeenCalledTimes(0);
  }, 4000);
});
