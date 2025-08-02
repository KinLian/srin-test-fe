import { render, screen } from "@testing-library/react";
import { useGet } from "../../../../../hooks";
import { PhonePage } from "../../../../../pages/phone";
import type { TableProps } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import type { PhoneType } from "../../../../../types";

// -------------------------- Mocks ------------------------------------
const useGetMocking = useGet as jest.Mock;
jest.mock("../../../../../hooks", () => ({
  useGet: jest.fn(),
}));
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Table: ({ dataSource, columns }: Required<TableProps>) => (
    <table>
      <thead>
        <tr>
          {columns.map((it: AnyObject) => (
            <th key={it["title"]}>{it?.["render"] ? it["render"]() : null}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((it) => (
          <tr key={it["model"]}>
            <td>{it["os"]}</td>
            <td>{it["price"]}</td>
            <td>{it["model"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

jest.mock("../../../../../pages/phone/Main/modules/TableActions", () => ({
  __esModule: true,
  default: () => <p>Actions</p>,
}));

// --------------------------- Datas ---------------------------------
const USE_GET_RESPONSE = {
  data: [{ id: "ID 0", model: "MODEL 0", os: "OS 0", price: "PRICE 0" }],
};

describe("Phone Main", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  async function renderComponent(val: { data: PhoneType[] | null }) {
    useGetMocking.mockReturnValue(val);

    render(<PhonePage />);
  }

  it("should render component with datas", async () => {
    await renderComponent({ data: USE_GET_RESPONSE["data"] });

    USE_GET_RESPONSE["data"].forEach((phone) => {
      const phoneOS = screen.getByText(phone["os"]);
      const phoneModel = screen.getByText(phone["model"]);
      const phonePrice = screen.getByText(phone["price"]);
      expect(phoneOS).toBeVisible();
      expect(phoneModel).toBeVisible();
      expect(phonePrice).toBeVisible();
    });

    const actions = screen.getByText("Actions");
    expect(actions).toBeVisible();
  });

  it("should render component without datas", async () => {
    await renderComponent({ data: null });

    USE_GET_RESPONSE["data"].forEach((phone) => {
      const phoneOS = screen.queryByText(phone["os"]);
      const phoneModel = screen.queryByText(phone["model"]);
      const phonePrice = screen.queryByText(phone["price"]);
      expect(phoneOS).not.toBeInTheDocument();
      expect(phoneModel).not.toBeInTheDocument();
      expect(phonePrice).not.toBeInTheDocument();
    });

    const actions = screen.queryByText("Actions");
    expect(actions).not.toBeInTheDocument();

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeVisible();
  });
});
