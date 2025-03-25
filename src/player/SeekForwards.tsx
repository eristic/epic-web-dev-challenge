import { useState, useCallback, startTransition, useEffect } from "react"
import { FLIGHT_DURATION, PICTURE_DURATION } from "./constants"
import { MediaSeekForwardButton } from "media-chrome/react"


const PeregrineFalconSVG = ({ isFlying }: { isFlying: boolean }) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    className={`transition-transform duration-300 ${
      isFlying ? "scale-95 rotate-12" : "scale-100"
    } ${isFlying ? "animate-glow" : ""}`} // Add glow effect when flying
  >
    {/* Body */}
    <path
      d="M40 50c14-4 24-14 28-22 4-8 4-16 0-20s-18-4-28 0c-10 4-16 16-16 26s6 16 16 16z"
      fill="#2F2F2F" // Darker color for falcon
      className="drop-shadow-lg" // Add shadow for 3D effect
    />
    {/* Wing */}
    <path
      className={`transform-origin-center ${
        isFlying ? "animate-wing-flap" : ""
      }`} // Continuous wing flap animation
      d="M34 40c-12-4-20-14-22-22-2-8 0-14 4-16s14 0 22 10c4 8 4 16 2 20s-4 8-6 8z"
      fill="#1A1A1A" // Darker wing color
    />
    {/* Beak */}
    <path
      d="M60 32c2-2 4-2 6 0s2 4 0 6-4 2-6 0-2-4 0-6z"
      fill="#FFD700" // Golden beak
    />
    {/* Skip Forward 10s symbol */}
    <path
      d="M36 36l8 4-8 4z M44 36l8 4-8 4z" // Double right arrow shape
      fill="white"
      className="drop-shadow-md"
    />
  </svg>
)


export const SeekForwards = () => {
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
      className="z-50 fixed cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseOver={moveToRandomPosition}
    >
      <MediaSeekForwardButton seekOffset={3} mediaController="player">
        <span slot="icon">
          <PeregrineFalconSVG isFlying={isFlying} />
        </span>
      </MediaSeekForwardButton>
    </div>
  )
}