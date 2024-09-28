'use client'

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'
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
      className={robotoMono.className}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <SyntaxHighlighter
      {...props}
      PreTag="div"
      language={'typescript'} // Default to typescript
      style={oneDark}
      className={robotoMono.className}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

const Paragraph = ({ children, ...props }: any) => {
  return <p className="my-4">{children}</p>
}

export default function Message({ message }: ChatMessageProps) {
  if (message.type === 'Loading') {
    return (
      <div className={getMessageClassName(message)}>
        <FontAwesomeIcon icon={faCircleNotch} spin />
        <span className="ml-2">I&apos;m thinking...</span>
      </div>
    )
  }
  return (
    <div className={getMessageClassName(message)}>
      <ReactMarkdown
        className="text-pretty leading-relaxed"
        components={{
          code: CodeBlock,
          p: Paragraph,
        }}
      >
        {message.message}
      </ReactMarkdown>
    </div>
  )
}

function getMessageClassName(message: ChatMessage) {
  const baseClasses: string[] = [
    'rounded-xl',
    'px-4',
    'max-w-[90%]',
    'mt-4',
    'py-1',
    'w-fit',
  ]

  if (message.type === 'Ai') {
    baseClasses.push('bg-[#ebecf2]')
  } else if (message.type === 'Human') {
    baseClasses.push('ml-auto', 'bg-[#1c63f2]', 'text-white')
  } else {
    baseClasses.push('bg-[#ebecf2]', 'py-2')
  }

  return baseClasses.join(' ')
}
