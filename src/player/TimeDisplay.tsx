import { useState, useCallback, startTransition, useEffect } from "react"
import { FLIGHT_DURATION, PICTURE_DURATION } from "./constants"
import { MediaTimeDisplay } from "media-chrome/react"


const RoosterSVG = ({ isFlying }: { isFlying: boolean }) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    className={`transition-transform duration-300 ${
      isFlying ? "scale-95 rotate-12" : "scale-100"
    } ${isFlying ? "animate-glow" : ""}`} // Add glow effect when flying
  >
    {/* Head */}
    <path
      d="M20 20c-2-2-4-2-6 0s-2 4 0 6 4 2 6 0 2-4 0-6z"
      fill="#FF4500" // Reddish-orange head
    />
    {/* Body with space for time display */}
    <rect
      x="20"
      y="30"
      width="40"
      height="40"
      fill="#FFD700" // Golden color for rooster body
      className="drop-shadow-lg" // Add shadow for 3D effect
    />
    {/* Wings */}
    <path
      className={`transform-origin-center ${
        isFlying ? "animate-wing-flap" : ""
      }`} // Continuous wing flap animation
      d="M30 40c10-3 18-10 20-16 2-6 0-12-4-14s-12 0-20 8c-4 6-4 12-2 16s4 6 6 6z"
      fill="#FFD700" // Golden color for rooster wings
    />
    {/* Tail */}
    <path
      d="M40 50c2 4 6 8 10 10s8-2 10-6-2-8-6-10-8-2-10 0z"
      fill="#FFD700" // Golden color for rooster tail
    />
    {/* Beak */}
    <path
      d="M20 32c-2-2-4-2-6 0s-2 4 0 6 4 2 6 0 2-4 0-6z"
      fill="#FF4500" // Reddish-orange beak
    />
  </svg>
)

export const TimeDisplay = () => {
  const [position, setPosition] = useState({ x: 200, y: 100 })
  const [isFlying, setIsFlying] = useState(false)
  const [allowPicture, setAllowPicture] = useState(false)

  const moveToRandomPosition = useCallback(() => {
    if (allowPicture) { return }
    const maxX = window.innerWidth - 100
    const maxY = window.innerHeight - 200 // Keep some distance from bottom
    const minY = 64 // Keep some distance from top
    
    const newX = Math.random() * maxX
    const newY = Math.min(maxY, Math.max(minY, Math.random() * maxY))
    
    startTransition(() => {
      setIsFlying(true)
      setPosition({ x: newX, y: newY })
      setAllowPicture(true);
    });
    
    setTimeout(() => {
      startTransition(() => {
        setIsFlying(false);
      });
    }, FLIGHT_DURATION);
    setTimeout(() => setAllowPicture(false), PICTURE_DURATION);
  }, [allowPicture])

  useEffect(() => {
    setTimeout(() => {
      moveToRandomPosition();
    }, Math.random() * 1000);
  }, []);

  return (
    <div
      className="z-10 fixed cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseOver={moveToRandomPosition}
    >
      <RoosterSVG isFlying={isFlying} />
      <MediaTimeDisplay className="absolute top-[30px] left-[14px]" />
    </div>
  )
}