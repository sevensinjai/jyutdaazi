import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Play, Mic } from "lucide-react"

export default function CardWithForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Let's create an App!</CardTitle>
          <CardDescription>Put Your Idea Into Reality!</CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="h-80">
          </Card>
        </CardContent>
        <CardFooter className="flex justify-center gap-x-4">
          <Button variant="outline">
            <Mic />
            Record
          </Button>
          <Button>
            <Play />
            Play
          </Button>
        </CardFooter>
      </Card>
    </div>

  )
}
