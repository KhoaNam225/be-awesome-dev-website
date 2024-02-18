'use client'

import Lottie from 'lottie-react'
import developerMeditatingAnimation from '../../public/animations/developer-meditating.json'

export default function LandingPageAnimation() {
  return (
    <Lottie
      animationData={developerMeditatingAnimation}
      loop={true}
      autoPlay={true}
      style={{
        width: '80%',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
      }}
    ></Lottie>
  )
}
