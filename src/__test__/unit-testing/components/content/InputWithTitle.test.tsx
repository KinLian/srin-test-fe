import {
  InputWithTitle,
  type InputWithTitleProps,
} from "../../../../components/content";
import { render, screen } from "@testing-library/react";

describe("Input with Title", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(props: InputWithTitleProps) {
    render(<InputWithTitle {...props} />);
  }

  it("should render component", async () => {
    renderComponent({ title: "Title" });

    const titleText = screen.getByText("Title");
    expect(titleText).toBeVisible();
  });
});
