import type { Metadata } from 'next'
import './globals.css'
import 'highlight.js/styles/atom-one-dark.css'
import { FileMetaData } from './models/file-meta-data'
import {
  readMarkdownFilesMetaData,
  readPostsMetaDataFromS3,
} from './services/file-reader'
import BodyContainer from './components/body-container'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'beAwesome.dev()',
  description: 'A website where you can find all things about coding',
  icons: '/favicon.png',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const filesMetaData: FileMetaData[] = await readPostsMetaDataFromS3()

  return (
    <html lang="en" className="h-svh antialiased">
      <BodyContainer filesMetaData={filesMetaData}>{children}</BodyContainer>
    </html>
  )
}
