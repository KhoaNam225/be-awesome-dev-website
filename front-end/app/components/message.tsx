'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ChatMessage } from '../models/chat'
import { robotoMono } from '../utils/fonts'

export type ChatMessageProps = {
  message: ChatMessage
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter
      {...props}
      PreTag="div"
      language={match[1]}
      style={oneDark}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code
      className={`${className} px-2 py-4 rounded-lg ${
        !inline ? 'block text-pretty my-3' : 'inline'
      } ${robotoMono.className}`}
      {...props}
    >
      {children}
    </code>
  )
}

const Paragraph = ({ children, ...props }: any) => {
  return <p className="my-4">{children}</p>
}

export default function Message({ message }: ChatMessageProps) {
  return (
    <div className={getMessageClassName(message)}>
      <ReactMarkdown
        className="text-pretty leading-relaxed"
        components={{
          code: CodeBlock,
          p: Paragraph,
        }}
      >
        {message.content}
      </ReactMarkdown>
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
