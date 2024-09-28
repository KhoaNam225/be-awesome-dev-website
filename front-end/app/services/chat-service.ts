import axios from 'axios'
import { ChatMessage } from '../models/chat'

export async function sendNewMessage(
  currentConversation: ChatMessage[],
  newMessage: string
) {
  const api_url = process.env.NEXT_PUBLIC_API_URL
  const response = await axios.post<string>(`${api_url}/chat`, {
    chatHistory: currentConversation,
    newMessage,
  })

  return await response.data
}
