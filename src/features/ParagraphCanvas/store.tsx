import React, { createContext, useContext, useReducer } from 'react';
import { type ParagraphWord } from "@/pages/index"

const initialState = {
    currentWordIndex: 0,
    isCurrentWordCorrect: true,
    currentInput: '',
    isEnd: false,
    paragraph: [],
};

// Define the actions that can be performed on the store
type Action =
    | {
        type: 'UPDATE_CURRENT_INPUT'; payload: {
            userInput: string,
            currentWord: ParagraphWord,
        }
    }
    | { type: 'INIT_PARAGRAPH'; payload: ParagraphWord[] }
    | { type: 'PLAY_NEXT' };

// Define the reducer function to handle the actions and update the state
function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_INPUT':
            if (state.isEnd) return state;
            // Handle action 1 and update the state
            if (action.payload.userInput.length == 0) {
                return {
                    ...state,
                    currentInput: action.payload.userInput,
                    isCurrentWordCorrect: true,
                };
            }
            if (action.payload.userInput.length > action.payload.currentWord.initial.length + action.payload.currentWord.final.length) {
                return {
                    ...state,
                    currentInput: action.payload.userInput,
                    isCurrentWordCorrect: false,
                };
            }
            if (action.payload.userInput === action.payload.currentWord.initial + action.payload.currentWord.final) {
                return {
                    ...state,
                    currentWordIndex: state.currentWordIndex + 1,
                    isCurrentWordCorrect: true,
                    currentInput: '',
                    isEnd: state.currentWordIndex + 1 === state.paragraph.length,
                };
            }
            return {
                ...state,
                currentInput: action.payload.userInput,
            };
        case 'INIT_PARAGRAPH':
            return {
                ...state,
                paragraph: action.payload,
            };
        case 'PLAY_NEXT':
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

const StoreContext = createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => { },
});

export function useStore() {
    return useContext(StoreContext);
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};