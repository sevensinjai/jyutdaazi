import React, { useEffect } from 'react';
import {
    Card
} from "@/components/ui/card"
import { type ParagraphWord } from "@/pages/index"
import { Input } from "@/components/ui/input"
import { useStore } from "./store"
import SettingsSheet from "@/features/ParagraphCanvas/SettingsSheet"
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react';
import { Label } from "@/components/ui/label"
interface Props {
    paragraph: ParagraphWord[];
}


const ParagraphCanvas: React.FC<Props> = ({ paragraph }) => {
    const { state, dispatch } = useStore();
    useEffect(() => {
        dispatch({ type: 'INIT_PARAGRAPH', payload: paragraph })
    }, [paragraph, dispatch])

    return (
        <>
            <div className="flex justify-center flex-col gap-2">
                <Card className="text-center p-4 min-w-48 bg-gray-700">
                    <Input className='text-center font-mono bg-gray-700 text-white border-none'
                        type={state.gameMode === "FULL" ? "text" : "number"}
                        value={state.currentInput}
                        placeholder="呢到輸入..."
                        onKeyDown={(e) => {
                            // if key is escape
                            if (e.keyCode === 27) {
                                dispatch({ type: 'SKIP_CURRENT' })
                            }
                        }}
                        onChange={(e) => {
                            dispatch({
                                type: 'UPDATE_CURRENT_INPUT',
                                payload: {
                                    userInput: e.target.value || "",
                                    currentWord: paragraph[state.currentWordIndex]!,
                                }
                            })
                        }}
                    />
                </Card>
                <Card className='text-center p-4 bg-gray-700'>
                    {
                        paragraph.map((unit, index) => {
                            const prevWordBreakIndex = state.wordBreakIndexList[state.currentWordBreakIndex - 1] ?? -1
                            const currentWordBreakIndex = state.wordBreakIndexList[state.currentWordBreakIndex] ?? paragraph.length
                            const shouldSkip = index <= prevWordBreakIndex || index > currentWordBreakIndex
                            return (
                                !shouldSkip &&
                                (
                                    <span key={index} className={`font-mono text-2xl ml-1 mr-1 
                                    ${index === state.currentWordIndex ? state.isCurrentWordCorrect ? 'text-blue-500' : 'text-red-500' : ''} 
                                    ${index < state.currentWordIndex ? 'text-green-500' : ''}
                                    ${index > state.currentWordIndex ? 'text-gray-500' : ''}
                                    `}>
                                        {unit.word}
                                        {
                                            unit.suffix && <br />
                                        }
                                    </span>
                                )

                            );
                        })
                    }
                    <div>
                        <Label className="text-yellow-500">
                            {
                                state.currentWordIndex + 1
                            }/
                            {
                                paragraph.length
                            }
                        </Label>
                    </div>
                </Card>
                <SettingsSheet>
                    <Button variant={"outline"} className='bg-gray-700 text-gray-500'>
                        <Settings />
                    </Button>
                </SettingsSheet>
            </div>
        </>
    );
};

export default ParagraphCanvas;