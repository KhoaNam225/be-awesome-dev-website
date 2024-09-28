'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { manrope } from '../utils/fonts'
import { ChatMessage } from '../models/chat'
import Message from './message'
import sendAnimation from '../../public/animations/send.json'
import Lottie from 'lottie-react'

export type ChatBarProps = {
  opened: boolean
}

export default function ChatBar({ opened }: ChatBarProps) {
  const greetingMessage: ChatMessage = {
    type: 'Ai',
    content:
      'Hi there! I am D.E.V. Nice to meet you! I can help you answer questions regarding the content of beAwesome.dev. Please let me know if you have any questions, always happy to help! :)',
  }

  const sendAnimationButtonRef = useRef(null)
  const bottomMessageListRef = useRef<HTMLDivElement>(null)
  const [conversation, setConversation] = useState<ChatMessage[]>([
    greetingMessage,
  ])
  const [userMessage, setUserMessage] = useState<string>('')

  useEffect(() => {
    if (bottomMessageListRef.current && opened) {
      bottomMessageListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [conversation])

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault()
    const newHumanMessage: ChatMessage = {
      type: 'Human',
      content: userMessage,
    }
    const loadingMessage: ChatMessage = {
      type: 'Loading',
      content: '',
    }

    let newConversation = [...conversation, newHumanMessage, loadingMessage]
    setConversation(newConversation)
    setUserMessage('')

    const aiResponse = await sendNewMessage(
      conversation,
      newHumanMessage.content
    )

    const newAIMessage: ChatMessage = {
      type: 'Ai',
      content: aiResponse,
    }

    setConversation([
      ...newConversation.slice(0, newConversation.length - 1),
      newAIMessage,
    ])
  }

  return (
    <div
      className={
        'bg-white z-50 overflow-y-auto pl-4 pr-4 py-4 text-nowrap transition-all ease-in-out duration-300 absolute top-0 right-0 bottom-0 w-[500px] flex flex-col ' +
        (opened
          ? 'shadow-[20px_20px_35px_5px_rgba(0,0,0,0.15)]'
          : 'translate-x-full ') +
        manrope.className
      }
    >
      <div className="message-section flex-grow overflow-y-auto">
        {conversation.map((message, idx) => {
          return <Message key={idx} message={message}></Message>
        })}
        <div ref={bottomMessageListRef} />
      </div>
      <form
        onSubmit={sendMessage}
        className="input-section pt-3 flex-row flex items-center"
      >
        <input
          className="rounded-full outline-none bg-[#ebecf2] block px-4 py-4 flex-grow"
          placeholder="Your message..."
          value={userMessage}
          onChange={(event) => setUserMessage(event.target.value)}
        ></input>
        <button className="rounded-full ml-2 block w-[40px]" type="submit">
          <Lottie
            lottieRef={sendAnimationButtonRef}
            animationData={sendAnimation}
            loop={true}
            autoPlay={true}
          ></Lottie>
        </button>
      </form>
    </div>
  )
}

async function sendNewMessage(
  currentConversation: ChatMessage[],
  newMessage: string
) {
  const response = await fetch(
    'https://b411d51b-1240-4fa3-85f9-48b0d784351e.mock.pstmn.io/chat',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatHistory: currentConversation,
        newMessage,
      }),
    }
  )

  return await response.text()
}
