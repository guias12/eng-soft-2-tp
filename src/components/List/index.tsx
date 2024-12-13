import React, { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ICard } from '../../types';
import { addCard } from '../../store/listSlice';
import Card from '../Card';

import './List.css';

import { mappedKeys } from '../../common/mappedKeys';
interface IListProps {
    title: string;
    id: number;
    cards: ICard[];
    searchTerm: string;
}

const List = ({ title, id, cards, searchTerm }: IListProps) => {
    const dispatch = useDispatch();
    const [creatingCard, setCreatingCard] = useState(false);
    const [newCardText, setNewCardText] = useState('');

    const isEmptySearchTerm = searchTerm === '';

    const toggleCardCreation = (status: boolean): void => {
        setCreatingCard(status);

        if (!status) {
            setNewCardText('');
        }
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === mappedKeys.ENTER) {
            handleAddCard();
        }
    };

    const handleAddCard = (): void => {
        if (newCardText) {
            dispatch(
                addCard({
                    text: newCardText,
                    listId: id,
                })
            );
        }
        toggleCardCreation(false);
    };

    const renderCard = (card: ICard, index: number): JSX.Element => {
        return (
            <Card card={card} listId={id} id={card.id} key={card.id} index={index} />
        );
    };

    return (
        <Droppable droppableId={`${id}`}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="list-container"
                >
                    <h3>{title}</h3>
                    {cards.map((card, index) => {
                        if (isEmptySearchTerm) {
                            return renderCard(card, index);
                        } else {
                            if (card.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return renderCard(card, index);
                            } else {
                                return null;
                            }
                        }
                    })}
                    {creatingCard ? (
                        <div className="new-card-container">
                            <input
                                type="text"
                                name="new-card-text"
                                id="new-card-text"
                                className="new-card-text"
                                placeholder="Add new card text"
                                value={newCardText}
                                onChange={(e) => setNewCardText(e.target.value)}
                                onKeyDown={handleInputKeyDown}
                                autoFocus
                                data-testid="list-create-input"
                            />
                            <div className="new-card-buttons">
                                <button
                                    className="add-card-btn"
                                    onClick={handleAddCard}
                                    data-testid="list-save-button"
                                >
                                    Add card
                                </button>
                                <button
                                    className="cancel-add-btn"
                                    onClick={() => toggleCardCreation(false)}
                                    data-testid="list-cancel-button"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="list-add-card-btn"
                            type="button"
                            onClick={() => toggleCardCreation(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Create new card
                        </button>
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default List;
