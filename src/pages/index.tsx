import * as React from "react"
import ParagraphCanvas from "@/features/ParagraphCanvas"
import { StoreProvider } from "@/features/ParagraphCanvas/store"
import EndingDialog from "@/features/ParagraphCanvas/EndingDialog"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { promises as fs } from 'fs';


export type ParagraphWord = {
  word: string
  initial: string
  final: string
  tone: string
  suffix?: string
}
export const getServerSideProps = (async () => {
  // random int from 1 - 1
  const randomInt = Math.floor(Math.random() * 5) + 1
  // import the paragraph from the json file
  const file = await fs.readFile(process.cwd() + `/src/server/paragraphs/${randomInt}.json`, 'utf8');
  const data = JSON.parse(file)
  const paragraph: ParagraphWord[] = data
  return { props: { paragraph } }
}) satisfies GetServerSideProps<{ paragraph: ParagraphWord[] }>


export default function Main({ paragraph }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <StoreProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-700">
        <ParagraphCanvas paragraph={paragraph} />
        <EndingDialog />
      </div>
    </StoreProvider>

  )
}
