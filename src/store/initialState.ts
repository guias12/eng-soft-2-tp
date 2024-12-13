import { IInitialState } from '../types/index.ts';

const getInitialState = (): IInitialState => ({
    searchTerm: '',
    list: [
        {
            title: 'To Do',
            id: 0,
            cards: [
                {
                    id: 0,
                    text: 'Test kanban board',
                },
            ],
        },
        {
            title: 'Doing',
            id: 1,
            cards: [],
        },
        {
            title: 'Done',
            id: 2,
            cards: [],
        },
    ],
});

const getEhancedTestInitialState = (): IInitialState => ({
    searchTerm: '',
    list: [
        {
            title: 'To Do',
            id: 0,
            cards: [
                {
                    id: 0,
                    text: 'First ToDo card',
                },
                {
                    id: 1,
                    text: 'Second ToDo card',
                },
            ],
        },
        {
            title: 'Doing',
            id: 1,
            cards: [
                {
                    id: 2,
                    text: 'first Doing card',
                },
                {
                    id: 3,
                    text: 'second Doing card',
                },
                {
                    id: 4,
                    text: 'third Doing card',
                },
            ],
        },
        {
            title: 'Done',
            id: 2,
            cards: [
                {
                    id: 5,
                    text: 'first Done card',
                },
                {
                    id: 6,
                    text: 'second Done card',
                },
            ],
        },
    ],
});

export { getInitialState, getEhancedTestInitialState };
