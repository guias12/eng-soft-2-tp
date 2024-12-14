import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Card from "./index";
import { vi } from "vitest";

const mockStore = configureStore([]);

vi.mock("react-beautiful-dnd", () => ({
  Draggable: ({ children }) =>
    children({
      innerRef: vi.fn(),
      draggableProps: {},
      dragHandleProps: {},
    }),
}));

describe("Card Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  const mockCard = {
    id: 1,
    text: "Test Card",
  };

  it("renders card text correctly", () => {
    render(
      <Provider store={store}>
        <Card card={mockCard} id={1} index={0} listId={1} />
      </Provider>
    );

    const cardText = screen.getByTestId("card-text");
    expect(cardText).toBeInTheDocument();
    expect(cardText.textContent).toBe("Test Card");
  });

  it("enters editing mode when text is clicked", () => {
    render(
      <Provider store={store}>
        <Card card={mockCard} id={1} index={0} listId={1} />
      </Provider>
    );

    const cardText = screen.getByTestId("card-text");
    fireEvent.click(cardText);

    const input = screen.getByTestId("card-input");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Test Card");
  });

  it("saves new text on save icon click", () => {
    render(
      <Provider store={store}>
        <Card card={mockCard} id={1} index={0} listId={1} />
      </Provider>
    );

    const cardText = screen.getByTestId("card-text");
    fireEvent.click(cardText);

    const input = screen.getByTestId("card-input");
    fireEvent.change(input, { target: { value: "Updated Card" } });

    const saveIcon = screen.getByTestId("card-input-save");
    fireEvent.click(saveIcon);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "list/changeCardText",
      payload: { listId: 1, text: "Updated Card", cardId: 1 },
    });
  });

  it("cancels editing mode and reverts text on cancel icon click", () => {
    render(
      <Provider store={store}>
        <Card card={mockCard} id={1} index={0} listId={1} />
      </Provider>
    );

    const cardText = screen.getByTestId("card-text");
    fireEvent.click(cardText);

    const input = screen.getByTestId("card-input");
    fireEvent.change(input, { target: { value: "Updated Card" } });

    const cancelIcon = screen.getByTestId("card-input-cancel");
    fireEvent.click(cancelIcon);

    expect(input).not.toBeInTheDocument();
    const revertedText = screen.getByTestId("card-text");
    expect(revertedText.textContent).toBe("Test Card");
  });

  it("saves text on Enter key press", () => {
    render(
      <Provider store={store}>
        <Card card={mockCard} id={1} index={0} listId={1} />
      </Provider>
    );

    const cardText = screen.getByTestId("card-text");
    fireEvent.click(cardText);

    const input = screen.getByTestId("card-input");
    fireEvent.change(input, { target: { value: "Updated Card" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "list/changeCardText",
      payload: { listId: 1, text: "Updated Card", cardId: 1 },
    });
  });
});
