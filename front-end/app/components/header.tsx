'use client'

import Lottie, { LottieRef } from 'lottie-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import hamburgerMenuAnimations from '../../public/animations/hamburger-menu.json'
import chatBotAnimation from '../../public/animations/chat-bot.json'
import { courierPrime, firaCode } from '../utils/fonts'
import Link from 'next/link'

export type HeaderProps = {
  sidebarOpened: boolean
  setSidebarOpened: (opened: boolean) => void
  chatBarOpened: boolean
  setChatBarOpened: (opened: boolean) => void
}

export default function Header({
  sidebarOpened,
  setSidebarOpened,
  chatBarOpened,
  setChatBarOpened,
}: HeaderProps) {
  const pathname = usePathname()
  const hamburgerMenuLottieRef: LottieRef = useRef(null)
  const chatBotLottieRef: LottieRef = useRef(null)

  const toggleSideBar = () => {
    setSidebarOpened(!sidebarOpened)
  }

  const toggleChatBar = () => {
    setChatBarOpened(!chatBarOpened)
  }

  useEffect(() => {
    // More information about the animation used, please visit this link:
    // https://app.lottiefiles.com/animation/d631d01e-b65f-4260-893f-b4339be19c01?channel=web&source=public-animation&panel=download
    // If sidebar is closed, play the second half of the animation
    if (!sidebarOpened) {
      hamburgerMenuLottieRef.current?.playSegments([10, 20])
    }

    // If sidebar is opened, play the first half of the animation
    if (sidebarOpened) {
      hamburgerMenuLottieRef.current?.playSegments([0, 10])
    }
  }, [sidebarOpened])

  return (
    <header className="shadow-md z-50 py-4 px-4 sticky top-0 left-0 right-0 bg-white flex items-center gap-3">
      <button
        className="rounded-full transition-all duration-300 ease-in-out hover:bg-[#ebecf2] hover:text-white w-13 h-13 text-lg p-2"
        onClick={() => toggleSideBar()}
      >
        <Lottie
          lottieRef={hamburgerMenuLottieRef}
          animationData={hamburgerMenuAnimations}
          loop={false}
          autoPlay={false}
          initialSegment={[0, 1]}
        ></Lottie>
      </button>{' '}
      <Link href={'/'} className={'text-[1.75rem] ' + firaCode.className}>
        {'beAwesome.dev()'}
      </Link>
      <span className={'text-lg self-end mb-1 ' + courierPrime.className}>
        {getHeaderText(pathname)}
      </span>
      <button
        className="ml-auto w-[60px] h-[60px] rounded-full transition-all duration-300 ease-in-out hover:bg-[#ebecf2] hover:text-white w-13 h-13 text-lg p-2"
        onClick={() => toggleChatBar()}
      >
        <Lottie
          lottieRef={chatBotLottieRef}
          animationData={chatBotAnimation}
          loop={true}
          autoPlay={true}
        ></Lottie>
      </button>{' '}
    </header>
  )
}

function getHeaderText(pathname: string): string {
  const defaultText = ''

  const segments = pathname
    .replace('posts', '')
    .split('/')
    .filter((segment) => segment.length > 0)
  if (segments.length === 0) {
    return defaultText
  }

  const parts = segments[0].split('_').map((section) =>
    section
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
  return parts[parts.length - 1]
}
