import {
  Roboto,
  Roboto_Mono,
  Manrope,
  Courier_Prime,
  Fira_Code,
} from 'next/font/google'

export const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
})

export const manrope = Manrope({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
})

export const manropeBold = Manrope({
  weight: '600',
  subsets: ['latin', 'vietnamese'],
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
})

export const roboto = Roboto({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
})
