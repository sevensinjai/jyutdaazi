import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useStore } from "./store"


const SettingsSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch } = useStore();

  return (
    <Sheet key="bottom">
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="r1">Game Mode</Label>
          <RadioGroup defaultValue={state.gameMode}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="FULL" id="r1" onClick={(e) => {
                dispatch({ type: 'CHANGE_GAME_MODE', payload: e.target.value })
              }} />
              <Label htmlFor="r1">Full</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TONE" id="r2" onClick={(e) => {
                dispatch({ type: 'CHANGE_GAME_MODE', payload: e.target.value })
              }} />
              <Label htmlFor="r2">Tone</Label>
            </div>
          </RadioGroup>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SettingsSheet