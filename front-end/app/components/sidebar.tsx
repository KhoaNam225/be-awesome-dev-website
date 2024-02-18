'use client'

import Link from 'next/link'
import { FileMetaData } from '../models/file-meta-data'
import { manrope, manropeBold } from '../utils/fonts'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export type SideBarProps = {
  opened: boolean
  filesMetaData: FileMetaData[]
}

type SideMenuItemProps = {
  title: string
  childItems?: SideMenuItemProps[]
  url?: string
}

export default function SideBar({ opened, filesMetaData }: SideBarProps) {
  const menuItems = parseWholeFilesStructure(filesMetaData)

  return (
    <nav
      className={
        'bg-white z-50 overflow-y-auto w-fit pl-2 pr-8 py-4 text-nowrap transition-all ease-in-out duration-300 absolute top-0 left-0 bottom-0 min-w-[300px] ' +
        (opened
          ? 'shadow-[20px_20px_35px_5px_rgba(0,0,0,0.15)] '
          : '-translate-x-full ') +
        manrope.className
      }
    >
      {menuItems.map((itemProp) => (
        <SideMenuItem
          title={itemProp.title}
          childItems={itemProp.childItems}
          key={itemProp.title}
          url={itemProp.url}
          level={0}
        ></SideMenuItem>
      ))}
    </nav>
  )
}

function SideMenuItem({
  title,
  childItems,
  url,
  level,
}: SideMenuItemProps & { level: number }) {
  const segment = title
    .replace('.md', '')
    .replace(/^[0-9]+./g, '')
    .toLowerCase()

  const processedTitle = title
    .replaceAll('-', ' ')
    .replace('.md', '')
    .replace(/^[0-9]+./g, '')

  const pathname = usePathname()
  const [expanded, setExpanded] = useState<boolean>(true)

  if (!childItems) {
    return (
      <li
        className={
          'px-4 py-2 my-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ' +
          (pathname === `/posts/${url}`
            ? 'bg-[#004de5] text-white'
            : 'hover:bg-[#ebecf2]')
        }
      >
        <Link href={`/posts/${url ?? '#'}`}>{processedTitle}</Link>
      </li>
    )
  }

  return (
    <ul className="flex flex-col">
      <li
        className={
          'py-2 my-2 cursor-pointer hover:bg-[#ebecf2] rounded-md px-4 flex flex-row justify-between items-center'
        }
        onClick={() => setExpanded(!expanded)}
      >
        <h6 className={pathname.includes(segment) ? manropeBold.className : ''}>
          {processedTitle}
        </h6>
        <FontAwesomeIcon
          icon={faAngleRight}
          className={
            'transition-all duration-300 ease-in-out text-[#adb0be] ' +
            (expanded ? 'rotate-90' : '')
          }
        />
      </li>
      <ul
        className={
          'pl-4 transition-all duration-500 ease-in-out overflow-hidden ' +
          (!expanded ? 'max-h-0' : 'max-h-[1000px]')
        }
      >
        {childItems
          .sort((a, b) => (a.title < b.title ? -1 : 1))
          .map((item) => (
            <SideMenuItem
              key={item.title}
              title={item.title}
              childItems={item.childItems}
              url={item.url}
              level={level + 1}
            ></SideMenuItem>
          ))}
      </ul>
    </ul>
  )
}

function parseWholeFilesStructure(
  filesMetaData: FileMetaData[]
): SideMenuItemProps[] {
  const menuItemsMapping: Map<string, SideMenuItemProps> = new Map()

  filesMetaData.forEach((file) => {
    parseURLPath(file, menuItemsMapping)
  })

  const menuItems: Set<SideMenuItemProps> = new Set()
  filesMetaData.forEach((file) => {
    const topLevelPath = file.filePath
      .split('/')
      .filter((part) => part.length > 0)[0]
    menuItems.add(menuItemsMapping.get(topLevelPath)!)
  })

  return Array.from(menuItems)
}

function parseURLPath(
  file: FileMetaData,
  sideMenuItemsMapping: Map<string, SideMenuItemProps>
) {
  const path = [file.filePath, file.fileName].join('/')
  const parts = path.split('/').filter((part) => part.length > 0) // Split the URL into segments
  for (let currSegment = parts.length; currSegment > 0; currSegment--) {
    const key = parts.slice(0, currSegment).join('/')

    const currItem: SideMenuItemProps = sideMenuItemsMapping.get(key) ?? {
      title: parts[currSegment - 1],
    }

    if (currSegment === parts.length) {
      currItem.url = file.url
    }

    if (currSegment < parts.length) {
      const childKey = parts.slice(0, currSegment + 1).join('/')
      const childItem: SideMenuItemProps = sideMenuItemsMapping.get(childKey)!

      if (!currItem.childItems) {
        currItem.childItems = []
      }

      if (!currItem.childItems.some((item) => item.title === childItem.title)) {
        currItem.childItems.push(childItem)
      }
    }

    sideMenuItemsMapping.set(key, currItem)
  }
}
