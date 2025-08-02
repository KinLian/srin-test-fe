import { render, screen } from "@testing-library/react";
import { useGet } from "../../../../../hooks";
import { PhoneDetailPage } from "../../../../../pages/phone";
import type { PhoneType } from "../../../../../types";
import { useNavigate } from "react-router";

// -------------------------- Mocks ------------------------------------
const useNavigateMocking = useNavigate as jest.Mock;
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

const useGetMocking = useGet as jest.Mock;
jest.mock("../../../../../hooks", () => ({
  useGet: jest.fn(),
}));

// ---------------------------- Variables -----------------------------
const mockUseNavigate = jest.fn();
const columnTitles: string[] = [
  "Price",
  "Processor",
  "RAM",
  "Battery",
  "Display",
  "Camera",
  "Card",
  "OS",
];

// --------------------------- Datas ---------------------------------
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

describe("Phone Detail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  async function renderComponent(val: { data: PhoneType | null }) {
    useGetMocking.mockReturnValue(val);
    useNavigateMocking.mockReturnValue(mockUseNavigate);

    render(<PhoneDetailPage />);
  }

  it("should render component with datas", async () => {
    await renderComponent(USE_GET_RESPONSE);

    columnTitles.forEach((it: string) => {
      const phoneAttr = screen.getByText(
        USE_GET_RESPONSE["data"][it.toLowerCase() as keyof PhoneType]
      );
      expect(phoneAttr).toBeVisible();
    });
  });

  it("should render component without datas", async () => {
    await renderComponent({ data: null });

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeVisible();
  });

  it("all button should be clickable", async () => {
    await renderComponent(USE_GET_RESPONSE);

    const button = screen.getByText("Edit");
    expect(button).toBeVisible();
    button.click();
    expect(mockUseNavigate).toHaveBeenCalledWith("edit");
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});
