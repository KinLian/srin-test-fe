import {
  TextWithDesc,
  type TextWithDescProps,
} from "../../../../components/content";
import { render, screen } from "@testing-library/react";

describe("Text with Desc", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(props: TextWithDescProps) {
    render(<TextWithDesc {...props} />);
  }

  it("should render component without description", async () => {
    renderComponent({ title: "Title" });

    const titleText = screen.getByText("Title");
    const descText = screen.queryByText("Desc");

    expect(titleText).toBeVisible();
    expect(descText).not.toBeInTheDocument();
  });

  it("should render component with description", async () => {
    renderComponent({ title: "Title", desc: "Desc" });

    const titleText = screen.getByText("Title");
    const descText = screen.getByText("Desc");

    expect(titleText).toBeVisible();
    expect(descText).toBeVisible();
  });

  it("should render component with empty string description", async () => {
    renderComponent({ title: "Title", desc: "" });

    const titleText = screen.getByText("Title");
    const descText = screen.getByText("-");

    expect(titleText).toBeVisible();
    expect(descText).toBeVisible();
  });
});
