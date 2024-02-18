'use client'

import { useState } from 'react'
import { manrope } from '../utils/fonts'
import Header from './header'
import SideBar from './sidebar'
import { FileMetaData } from '../models/file-meta-data'

export type BodyContainerProps = {
  children: React.ReactNode
  filesMetaData: FileMetaData[]
}

export default function BodyContainer({
  children,
  filesMetaData,
}: BodyContainerProps) {
  const [sidebarOpened, setSideBarOpened] = useState<boolean>(false)

  return (
    <body
      className={manrope.className + ' h-svh flex-col flex overflow-y-hidden'}
    >
      <Header
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSideBarOpened}
      ></Header>
      <div className="min-h-0 min-w-0 relative flex-grow flex flex-row">
        <SideBar filesMetaData={filesMetaData} opened={sidebarOpened}></SideBar>
        <main
          onClick={() => setSideBarOpened(false)}
          className="flex-grow py-4 px-4 overflow-y-scroll"
        >
          {children}
        </main>
      </div>
    </body>
  )
}
