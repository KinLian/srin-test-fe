import { render, screen } from "@testing-library/react";
import {
  MainLayout,
  type MainLayoutProps,
} from "../../../../components/layout";

describe("Main Layout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent({ children, ...props }: MainLayoutProps) {
    render(<MainLayout {...props}>{children}</MainLayout>);
  }

  it("should render component without optional values", async () => {
    renderComponent({ children: "Main Layout" });

    const spinner = screen.queryByTestId("spinner");
    const childrenText = screen.getByText("Main Layout");

    expect(childrenText).toBeVisible();
    expect(spinner).not.toBeInTheDocument();
  });

  it("should render component with optional values (loading)", async () => {
    renderComponent({
      children: "Main Layout",
      isLoading: true,
      vertical: false,
    });

    const spinner = screen.getByTestId("spinner");
    const childrenText = screen.queryByText("Main Layout");

    expect(spinner).toBeVisible();
    expect(childrenText).not.toBeInTheDocument();
  });

  it("should render component with optional values (unloaded)", async () => {
    renderComponent({
      children: "Main Layout",
      isLoading: false,
      vertical: true,
    });

    const spinner = screen.queryByTestId("spinner");
    const childrenText = screen.getByText("Main Layout");

    expect(spinner).not.toBeInTheDocument();
    expect(childrenText).toBeVisible();
  });
});
