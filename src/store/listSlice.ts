import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getInitialState } from './initialState.ts';

let nextAvailableCardId = 1;

const listSlice = createSlice({
  name: 'list',
  initialState: getInitialState(),
  reducers: {
    addCard(state, action) {
      const { listId, text } = action.payload;
      const currentListIndex = state.list.findIndex(
        (list) => list.id === listId
      );
      if (currentListIndex || currentListIndex === 0) {
        state.list[currentListIndex].cards.push({
          text: text,
          id: nextAvailableCardId,
        });
        nextAvailableCardId += 1;
      }
    },
    changeCardText(state, action) {
      const { listId, cardId, text } = action.payload;
      const currentListIndex = state.list.findIndex(
        (list) => list.id === listId
      );
      const currentCardIndex = state.list[currentListIndex].cards.findIndex(
        (card) => card.id === cardId
      );
      if (
        (currentCardIndex || currentCardIndex === 0) &&
        (currentListIndex || currentListIndex === 0)
      ) {
        state.list[currentListIndex].cards[currentCardIndex].text = text;
      }
    },
    dragCard(state, action) {
      const {
        sourceListId,
        destinationListId,
        sourceCardIndex,
        destinationCardIndex,
      } = action.payload;
      if (sourceListId === destinationListId) {
        const list = state.list.find(
          (list) => sourceListId === String(list.id)
        );
        const card = list?.cards.splice(sourceCardIndex, 1);

        if (card) {
          list?.cards.splice(destinationCardIndex, 0, ...card);
        }
      } else {
        const sourceList = state.list.find(
          (list) => sourceListId === String(list.id)
        );
        const card = sourceList?.cards.splice(sourceCardIndex, 1);
        const destinationList = state.list.find(
          (list) => destinationListId === String(list.id)
        );
        if (card) {
          destinationList?.cards.splice(destinationCardIndex, 0, ...card);
        }
      }
    },
    filterCard(state, action) {
      const { searchTerm } = action.payload;
      state.searchTerm = searchTerm;
    },
  },
});

export const { filterCard, dragCard, changeCardText, addCard } =
  listSlice.actions;
export const selectState = (state: RootState) => state;
export default listSlice.reducer;
