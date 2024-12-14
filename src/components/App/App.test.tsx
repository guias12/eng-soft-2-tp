import { render, screen } from "@testing-library/react";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { getInitialState } from "../../store/initialState";
import { Provider } from "react-redux";
import App from "./App";

describe("App component", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const setup = (): JSX.Element => {
    const initialState = getInitialState();
    store = configureMockStore()({ list: initialState });

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  it("Should render App component correctly", () => {
    render(setup());
    const pageTitle = screen.getByText(
      /Engenharia de Software 2: Kanban Board/i
    );

    expect(pageTitle).toBeInTheDocument();
  });
});
