import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import List from "./index";
import { vi } from "vitest";

const mockStore = configureStore([]);

vi.mock("react-beautiful-dnd", () => ({
  Draggable: ({ children }) =>
    children({
      innerRef: vi.fn(),
      draggableProps: {},
      dragHandleProps: {},
    }),
  Droppable: ({ children }) =>
    children({
      innerRef: vi.fn(),
      droppableProps: {},
    }),
}));

describe("List Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  const mockCards = [
    { id: 1, text: "Card 1" },
    { id: 2, text: "Card 2" },
    { id: 3, text: "Searchable Card" },
  ];

  it("renders the list title and cards correctly", () => {
    render(
      <Provider store={store}>
        <List title="Test List" id={1} cards={mockCards} searchTerm="" />
      </Provider>
    );

    expect(screen.getByText("Test List")).toBeInTheDocument();
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Searchable Card")).toBeInTheDocument();
  });

  it("filters cards based on the search term", () => {
    render(
      <Provider store={store}>
        <List
          title="Test List"
          id={1}
          cards={mockCards}
          searchTerm="Searchable"
        />
      </Provider>
    );

    expect(screen.getByText("Searchable Card")).toBeInTheDocument();
    expect(screen.queryByText("Card 1")).toBeNull();
    expect(screen.queryByText("Card 2")).toBeNull();
  });

  it("enters card creation mode when the button is clicked", () => {
    render(
      <Provider store={store}>
        <List title="Test List" id={1} cards={mockCards} searchTerm="" />
      </Provider>
    );

    const createButton = screen.getByText("Create new card");
    fireEvent.click(createButton);

    expect(screen.getByTestId("list-create-input")).toBeInTheDocument();
  });

  it("creates a new card and dispatches the action", () => {
    render(
      <Provider store={store}>
        <List title="Test List" id={1} cards={mockCards} searchTerm="" />
      </Provider>
    );

    const createButton = screen.getByText("Create new card");
    fireEvent.click(createButton);

    const input = screen.getByTestId("list-create-input");
    fireEvent.change(input, { target: { value: "New Card" } });

    const saveButton = screen.getByTestId("list-save-button");
    fireEvent.click(saveButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "list/addCard",
      payload: { text: "New Card", listId: 1 },
    });
  });

  it("cancels card creation when the cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <List title="Test List" id={1} cards={mockCards} searchTerm="" />
      </Provider>
    );

    const createButton = screen.getByText("Create new card");
    fireEvent.click(createButton);

    const cancelButton = screen.getByTestId("list-cancel-button");
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId("list-create-input")).toBeNull();
  });

  it("adds a new card on Enter key press", () => {
    render(
      <Provider store={store}>
        <List title="Test List" id={1} cards={mockCards} searchTerm="" />
      </Provider>
    );

    const createButton = screen.getByText("Create new card");
    fireEvent.click(createButton);

    const input = screen.getByTestId("list-create-input");
    fireEvent.change(input, { target: { value: "New Card" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "list/addCard",
      payload: { text: "New Card", listId: 1 },
    });
  });
});
