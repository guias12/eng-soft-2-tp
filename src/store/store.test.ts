import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { getInitialState } from "./initialState";
import { IInitialState } from "../models/types";
import reducer from "./listSlice";

describe("Store", () => {
  const initialState = () => {
    return getInitialState();
  };

  let store: EnhancedStore<{ list: IInitialState }, AnyAction>;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        list: reducer,
      },
    });
  });
  afterAll(() => {});

  it("Should display initial state when no data is provided", () => {
    const action = { type: "Unknown" };
    store.dispatch(action);

    const currentState = store.getState();
    const expected = initialState();

    expect(currentState.list).toEqual(expected);
  });

  it("Should update initial state when data is provided", () => {
    const payload = { listId: 0, text: "lorem ipsum" };
    const action = { type: "list/addCard", payload };
    store.dispatch(action);

    const currentState = store.getState();
    const expectedState = initialState();
    expectedState.list[0].cards.push({
      id: 1,
      text: "lorem ipsum",
    });

    expect(currentState.list).toEqual(expectedState);
  });
});
