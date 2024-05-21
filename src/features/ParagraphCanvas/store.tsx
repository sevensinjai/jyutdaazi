import React, { createContext, useContext, useReducer } from 'react';
import { type ParagraphWord } from "@/pages/index"

const initialState = {
    currentWordIndex: 0,
    isCurrentWordCorrect: true,
    currentInput: '',
    isEnd: false,
    paragraph: [],
    wordBreakIndexList: [],
    currentWordBreakIndex: -1,
    gameMode: "FULL" as "FULL" | "TONE",
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
    | { type: 'PLAY_NEXT' }
    | { type: 'SKIP_CURRENT' }
    | { type: "CHANGE_GAME_MODE", payload: "FULL" | "TONE" }

// Define the reducer function to handle the actions and update the state
function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_INPUT':
            if (state.isEnd) return state;
            // case: user delete all text
            if (action.payload.userInput.length == 0) {
                return {
                    ...state,
                    currentInput: action.payload.userInput,
                    isCurrentWordCorrect: true,
                };
            }

            // case check game mode
            switch (state.gameMode) {
                case "FULL":
                    // case: user keeps typing but the word is already not correct
                    if (action.payload.userInput.length > action.payload.currentWord.initial.length + action.payload.currentWord.final.length) {
                        return {
                            ...state,
                            currentInput: action.payload.userInput,
                            isCurrentWordCorrect: false,
                        };
                    }
                    if (action.payload.userInput === action.payload.currentWord.word) {
                        const isWordBreakChanged = state.wordBreakIndexList[state.currentWordBreakIndex]! < state.currentWordIndex + 1
                        return {
                            ...state,
                            currentWordIndex: state.currentWordIndex + 1,
                            isCurrentWordCorrect: true,
                            currentInput: '',
                            isEnd: state.currentWordIndex + 1 === state.paragraph.length,
                            currentWordBreakIndex: isWordBreakChanged ? state.currentWordBreakIndex + 1 : state.currentWordBreakIndex,
                        };
                    }
                    return {
                        ...state,
                        currentInput: action.payload.userInput,
                    };
                case "TONE":
                    // case: user keeps typing but the word is already not correct
                    if (action.payload.userInput.length > 1) {
                        return {
                            ...state,
                            currentInput: action.payload.userInput,
                            isCurrentWordCorrect: false,
                        };
                    }
                    if (action.payload.userInput === action.payload.currentWord.tone) {
                        const isWordBreakChanged = state.wordBreakIndexList[state.currentWordBreakIndex]! < state.currentWordIndex + 1
                        return {
                            ...state,
                            currentWordIndex: state.currentWordIndex + 1,
                            isCurrentWordCorrect: true,
                            currentInput: '',
                            isEnd: state.currentWordIndex + 1 === state.paragraph.length,
                            currentWordBreakIndex: isWordBreakChanged ? state.currentWordBreakIndex + 1 : state.currentWordBreakIndex,
                        };
                    }
                    return {
                        ...state,
                        currentInput: action.payload.userInput,
                    };
            }

        case 'INIT_PARAGRAPH':
            const wordBreakIndexList: number[] = []
            action.payload.forEach((unit, index) => {
                if (unit.suffix) {
                    wordBreakIndexList.push(index)
                }
            });
            return {
                ...state,
                paragraph: action.payload,
                wordBreakIndexList,
                currentWordBreakIndex: wordBreakIndexList.length > 0 ? 0 : -1,
            };
        case 'PLAY_NEXT':
            return {
                ...initialState,
            };
        case 'SKIP_CURRENT':
            const isWordBreakChanged = state.wordBreakIndexList[state.currentWordBreakIndex]! < state.currentWordIndex + 1
            return {
                ...state,
                currentWordIndex: state.currentWordIndex + 1,
                currentWordBreakIndex: isWordBreakChanged ? state.currentWordBreakIndex + 1 : state.currentWordBreakIndex,
                isCurrentWordCorrect: true,
                currentInput: '',
                isEnd: state.currentWordIndex + 1 === state.paragraph.length,
            };
        case 'CHANGE_GAME_MODE':
            return {
                ...state,
                gameMode: action.payload,
            }
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