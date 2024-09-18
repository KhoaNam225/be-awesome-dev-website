'use client'

import { manrope } from '../utils/fonts'

export type ChatBarProps = {
  opened: boolean
}

export default function ChatBar({ opened }: ChatBarProps) {
  return (
    <div
      className={
        'bg-white z-50 overflow-y-auto w-fit pl-2 pr-8 py-4 text-nowrap transition-all ease-in-out duration-300 absolute top-0 right-0 bottom-0 min-w-[500px] ' +
        (opened
          ? 'shadow-[20px_20px_35px_5px_rgba(0,0,0,0.15)] '
          : 'translate-x-full ') +
        manrope.className
      }
    >
      {' '}
      Chat Section{' '}
    </div>
  )
}
