'use client'

import { useState } from 'react'
import { manrope } from '../utils/fonts'
import { ChatMessage } from '../models/chat'
import Message from './message'

export type ChatBarProps = {
  opened: boolean
}

export default function ChatBar({ opened }: ChatBarProps) {
  const greetingMessage: ChatMessage = {
    type: 'Ai',
    content:
      'Hi there! I am D.E.V. Nice to meet you! I can help you answer questions regarding the content of beAwesome.dev. Please let me know if you have any questions, always happy to help! :)',
  }

  const humanMessage: ChatMessage = {
    type: 'Human',
    content:
      'Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ea temporibus sed non incidunt, culpa consequuntur error molestias ex amet cumque expedita quos, quis assumenda praesentium architecto nihil voluptas vitae.',
  }

  const fakeAiMessage: ChatMessage = {
    type: 'Ai',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia id quaerat debitis a veniam eum, ea delectus nisi commodi deleniti quia at cupiditate ad, atque ex deserunt! Impedit sed minima magni debitis sit error maxime animi aut? Laudantium praesentium hic, quaerat quos autem officia quidem placeat tempore, voluptatum ut, aliquam sunt. Mollitia distinctio eveniet facilis doloribus autem iste dolor, saepe natus odit, praesentium ipsam officia omnis modi. Distinctio cum voluptas eum maxime doloribus aliquam repudiandae dolore unde quos vero. Molestiae suscipit temporibus perspiciatis! Consequatur repellat dolor voluptates iure quibusdam quaerat mollitia neque animi labore officiis non incidunt, doloribus ipsum porro!',
  }

  const [conversation, setConversation] = useState<ChatMessage[]>([
    greetingMessage,
    humanMessage,
    fakeAiMessage,
  ])

  return (
    <div
      className={
        'bg-white z-50 overflow-y-auto pl-4 pr-4 py-4 text-nowrap transition-all ease-in-out duration-300 absolute top-0 right-0 bottom-0 w-[500px] flex flex-col ' +
        (opened
          ? 'shadow-[20px_20px_35px_5px_rgba(0,0,0,0.15)] '
          : 'translate-x-full ') +
        manrope.className
      }
    >
      <div className="message-section flex-grow overflow-y-scroll">
        {conversation.map((message, idx) => (
          <Message key={idx} message={message}></Message>
        ))}
      </div>
      <div className="input-section"> Input section</div>
    </div>
  )
}
