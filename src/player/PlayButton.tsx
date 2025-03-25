import { MediaPlayButton } from "media-chrome/react"
import { useState, useEffect, useCallback, startTransition } from "react"
import throttle from "lodash/throttle"

const FLIGHT_DURATION = 1000;
const PICTURE_DURATION = 5000;


const HummingbirdSVG = ({ isFlying }: { isFlying: boolean }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className={`transition-transform duration-300 ${
      isFlying ? "scale-95 rotate-12" : "scale-100"
    }`}
  >
    {/* Body */}
    <path
      d="M32 40c8-2 16-8 20-14 4-6 4-12 0-16s-12-4-20 0c-8 4-12 12-12 20s4 12 12 10z"
      fill="#FF6B6B"
    />
    {/* Wing */}
    <path
      className={`transform-origin-center ${
        isFlying ? "animate-wing" : ""
      }`}
      d="M28 30c-6-2-12-8-14-14-2-6 0-10 4-12s10 0 14 6c4 6 4 12 2 16s-4 6-6 4z"
      fill="#4ECDC4"
    />
    {/* Beak */}
    <path
      d="M52 26c2-2 4-2 6 0s2 4 0 6-4 2-6 0-2-4 0-6z"
      fill="#FFE66D"
    />
    {/* Play symbol */}
    <path
      d="M30 28l8 4-8 4z"
      fill="white"
      className="drop-shadow-md"
    />
  </svg>
)

export const PlayButton = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isFlying, setIsFlying] = useState(false)
  const [allowPicture, setAllowPicture] = useState(true)

  const moveToRandomPosition = useCallback(() => {
    console.log("moveToRandomPosition")
    if (!allowPicture) { return }
    const maxX = window.innerWidth - 100
    const maxY = window.innerHeight - 200 // Keep some distance from bottom
    const minY = 64 // Keep some distance from top
    
    const newX = Math.random() * maxX
    const newY = Math.min(maxY, Math.max(minY, Math.random() * maxY))
    
    startTransition(() => {
      setIsFlying(true)
      setPosition({ x: newX, y: newY })
      setAllowPicture(false);
    });
    
    setTimeout(() => {
      startTransition(() => {
        setIsFlying(false);
        setAllowPicture(true);
      });
    }, FLIGHT_DURATION);
    setTimeout(() => setAllowPicture(false), PICTURE_DURATION);
  }, [allowPicture])

  return (
    <div
      className="fixed cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseOver={moveToRandomPosition}
    >
      <MediaPlayButton>
        <span slot="play">
          <HummingbirdSVG isFlying={isFlying} />
        </span>
        <span slot="pause">
          <HummingbirdSVG isFlying={isFlying} />
        </span>
      </MediaPlayButton>
    </div>
  )
}