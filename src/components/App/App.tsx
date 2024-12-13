import { useState, ChangeEvent } from 'react';
import List from '../List';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppSelector } from '../../store';
import { dragCard, filterCard } from '../../store/listSlice';
import { selectState } from '../../store/listSlice';
import { useDispatch } from 'react-redux';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const state = useAppSelector(selectState);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    dispatch(
      dragCard({
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceCardIndex: source.index,
        destinationCardIndex: destination.index,
      })
    );
  };

  const onChangeFilterInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
    dispatch(
      filterCard({
        searchTerm: event.target.value,
      })
    );
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <h2 className="app-title">Engenharia de Software 2: Kanban Board</h2>
        <div className="app-tools">
          <input
            type="text"
            name="search-cards"
            id="search-cards"
            placeholder="Search card"
            className="search-card-input"
            value={searchInput}
            onChange={(e) => onChangeFilterInput(e)}
          />
        </div>
        <div className="app-board-list">
          {state.list.list.map((list) => {
            return (
              <List
                title={list.title}
                cards={list.cards}
                searchTerm={state.list.searchTerm}
                id={list.id}
                key={list.id}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
