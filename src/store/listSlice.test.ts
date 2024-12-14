import reducer from "./listSlice";
import { getInitialState, getEhancedTestInitialState } from "./initialState";

describe("List Reducers", () => {
  const initialState = () => {
    return getInitialState();
  };
  const enhancedState = () => {
    return getEhancedTestInitialState();
  };

  it("Should set initial state by default", () => {
    const action = { type: "test" };
    const expectedState = initialState();

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it("Shoud add a new card to the list", () => {
    const payload = { listId: 0, text: "lorem ipsum" };
    const action = { type: "list/addCard", payload };

    const expectedState = initialState();
    expectedState.list[0].cards.push({ id: 1, text: "lorem ipsum" });

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it("Should change the text of a existing card", () => {
    const payload = { listId: 0, cardId: 0, text: "new card text" };
    const action = { type: "list/changeCardText", payload };

    const expectedState = initialState();
    expectedState.list[0].cards[0].text = "new card text";

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it("Should drag and drop a card within the same list", () => {
    // Card index 1 -> Card index 0
    // Card index 0 -> Card index 1
    const payload = {
      souceListId: 0,
      destinationListId: 0,
      sourceCardIndex: 1,
      destinationCardIndex: 0,
    };
    const action = { type: "list/dragCard", payload };

    const expectedState = enhancedState();
    const firstCardCopy = {
      id: 0,
      text: "First ToDo card",
    };
    const secondCardCopy = {
      id: 1,
      text: "Second ToDo card",
    };

    expectedState.list[0].cards[1] = secondCardCopy;
    expectedState.list[0].cards[0] = firstCardCopy;

    expect(reducer(enhancedState(), action)).toEqual(expectedState);
  });

  it("Should drag and drop a card between different lists", () => {
    const payload = {
      sourceListId: "0",
      destinationListId: "1",
      sourceCardIndex: 0,
      destinationCardIndex: 0,
    };
    const action = { type: "list/dragCard", payload };

    const appState = initialState();

    const newExpectedState = {
      searchTerm: "",
      list: [
        {
          title: "To Do",
          id: 0,
          cards: [],
        },
        {
          title: "Doing",
          id: 1,
          cards: [
            {
              id: 0,
              text: "Test kanban board",
            },
          ],
        },
        {
          title: "Done",
          id: 2,
          cards: [],
        },
      ],
    };
    expect(reducer(appState, action)).toEqual(newExpectedState);
  });

  it("Should change the filter text variable", () => {
    const payload = { searchTerm: "test search" };
    const action = { type: "list/filterCard", payload };

    const expectedState = initialState();
    expectedState.searchTerm = "test search";

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
