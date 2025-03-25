import { MediaPlayButton } from "media-chrome/react"
import { useState, useCallback, startTransition, useEffect } from "react"
import { FLIGHT_DURATION, PICTURE_DURATION } from "./constants"


const HummingbirdSVG = ({ isFlying, isPaused }: { isFlying: boolean, isPaused: boolean }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className={`transition-transform duration-300 ${
      isFlying ? "scale-95 rotate-12" : "scale-100"
    } ${isFlying ? "animate-glow" : ""}`} // Add glow effect when flying
  >
    {/* Body */}
    <path
      d="M32 40c8-2 16-8 20-14 4-6 4-12 0-16s-12-4-20 0c-8 4-12 12-12 20s4 12 12 10z"
      fill="#FF6B6B"
      className="drop-shadow-lg" // Add shadow for 3D effect
    />
    {/* Wing */}
    <path
      className={`transform-origin-center ${
        isFlying ? "animate-wing-flap" : ""
      }`} // Continuous wing flap animation
      d="M28 30c-6-2-12-8-14-14-2-6 0-10 4-12s10 0 14 6c4 6 4 12 2 16s-4 6-6 4z"
      fill="#4ECDC4"
    />
    {/* Beak */}
    <path
      d="M52 26c2-2 4-2 6 0s2 4 0 6-4 2-6 0-2-4 0-6z"
      fill="#FFE66D"
    />
    {/* Play or Pause symbol */}
    {isPaused ? (
      <g fill="white" className="drop-shadow-md">
        <rect x="28" y="26" width="3" height="12" />
        <rect x="33" y="26" width="3" height="12" />
      </g>
    ) : (
      <path
        d="M30 28l8 4-8 4z"
        fill="white"
        className="drop-shadow-md"
      />
    )}
  </svg>
)


export const PlayButton = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 })
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
      className="fixed cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseOver={moveToRandomPosition}
    >
      <MediaPlayButton>
        <span slot="play">
          <HummingbirdSVG isFlying={isFlying} isPaused={false} />
        </span>
        <span slot="pause">
          <HummingbirdSVG isFlying={isFlying} isPaused={true} />
        </span>
      </MediaPlayButton>
    </div>
  )
}