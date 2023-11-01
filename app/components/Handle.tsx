"use client"

import React, { KeyboardEvent, useEffect, useRef, useState } from "react"

type HandleProps = {
  index: number
  initialX: number
  initialY: number
  onMouseDown: () => void
}

const Handle = ({ initialX, initialY, onMouseDown }: HandleProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })

  const handleKeyDown = (e: KeyboardEvent<SVGCircleElement>) => {
    let { x, y } = position
    switch (e.key) {
      case "ArrowUp":
        y -= 5 // Adjust the value as per your requirement
        break
      case "ArrowDown":
        y += 5 // Adjust the value as per your requirement
        break
      case "ArrowLeft":
        x -= 5 // Adjust the value as per your requirement
        break
      case "ArrowRight":
        x += 5 // Adjust the value as per your requirement
        break
      default:
        break
    }
    setPosition({ x, y })
  }

  useEffect(() => {
    setPosition({ x: initialX, y: initialY })
  }, [initialX, initialY])

  return (
    <>
      <line />
      <circle
        className='focus:rounded-full'
        cx={position.x}
        cy={position.y}
        r={6}
        fill='purple'
        onMouseDown={onMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
    </>
  )
}

export default Handle
