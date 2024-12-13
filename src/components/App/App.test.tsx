import { render } from "@testing-library/react";
import App from "./App";

describe("App tests", () => {
  it("should render App component", () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });
});
