'use client'

import { ChatMessage } from '../models/chat'

export type ChatMessageProps = {
  message: ChatMessage
}

export default function Message({ message }: ChatMessageProps) {
  return (
    <div className={getMessageClassName(message)}>
      <p className="text-pretty leading-relaxed">{message.content}</p>
    </div>
  )
}

function getMessageClassName(message: ChatMessage) {
  const baseClasses: string[] = ['rounded-lg', 'p-4', 'w-[90%]', 'mt-4']

  if (message.type === 'Ai') {
    baseClasses.push('bg-[#ebecf2]')
  } else {
    baseClasses.push('ml-auto', 'bg-[#1c63f2]', 'text-white')
  }

  return baseClasses.join(' ')
}
