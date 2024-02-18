import Link from 'next/link'
import LandingPageAnimation from './components/landing-page-animation'
import { FileMetaData } from './models/file-meta-data'
import {
  readMarkdownFilesMetaData,
  readPostsMetaDataFromS3,
} from './services/file-reader'
import { firaCode, robotoMono } from './utils/fonts'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default async function Page() {
  const title = 'beAwesome.dev()'
  return (
    <div className="flex flex-row h-full relative items-center z-0">
      <div
        className={
          'w-3/5 text-left px-[5%] absolute top-0 left-0 bottom-0 flex flex-col justify-center '
        }
      >
        <h1 className={'text-6xl ' + firaCode.className}>{title}</h1>
        <p className="text-2xl mt-8">
          Why be a good dev when you can be awesome?
        </p>
        <button className="rounded mt-6 border-[#004de5] border-2 text-[#004de5] hover:bg-[#004de5] hover:text-white transition-colors duration-300 ease-in-out w-fit px-8 py-3">
          <Link href={'/posts/javascript-basics_es6-syntax_modern-syntax'}>
            Go to first page
          </Link>
        </button>
      </div>
      <LandingPageAnimation />
    </div>
  )
}
