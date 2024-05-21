'use client'
import { Copy, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type DialogProps } from "@radix-ui/react-dialog"
import { useStore } from "./store"
import { useRouter } from 'next/router';


const EndingDialog: React.FC<DialogProps> = () => {
    const { state, dispatch } = useStore()
    const router = useRouter();

    const onPlayNext = () => {
        router.replace(router.asPath);
        dispatch({ type: 'PLAY_NEXT' });
    }
    return (
        <Dialog open={state.isEnd} onOpenChange={() => onPlayNext()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {/* party popper emoji */}
                        🎉 Congratulations! 🎉
                    </DialogTitle>
                    <DialogDescription>
                        Share Jyutping with your friends! <br />
                        m hou bei Cantonese siu sat 😘
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={typeof window != 'undefined' ? window.location.href : ""}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => onPlayNext()}>
                            Play next
                        </Button>
                    </DialogClose>
                </DialogFooter>
                <div className="flex italic align-middle">
                    <div className="mr-2 text-sm">...more features will be coming</div>
                    <a href="https://github.com/sevensinjai/jyutdaazi" target="_new"><Github size={16} /></a>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EndingDialog