"use client"

import React from "react"
import { Position, usePosition } from "../utils/usePosition"

type HandleProps = {
  index: number
  initialX: number
  initialY: number
  handleMouseDown: () => void
  position: Position
  // handleKeyDown: (e: KeyboardEvent<SVGCircleElement>) => void
}

const Handle = ({
  index,
  initialX,
  initialY,
  handleMouseDown,
  position,
}: // handleKeyDown,
HandleProps) => {
  // Calculations for the line's starting point
  const { x, y } = usePosition(position)
  // incorrect since you need the usePosition (interpolating between the two points)
  const startX = x(index)
  const startY = y(index)
  const controlX = x(initialX)
  const controlY = y(initialY)
  const a = Math.atan2(controlY - startY, controlX - startX)
  const cxs = controlX - 6 * Math.cos(a)
  const cys = controlY - 6 * Math.sin(a)

  return (
    <>
      <line
        stroke='purple'
        strokeWidth={2}
        x1={cxs}
        y1={cys}
        x2={startX}
        y2={startY}
      />
      <circle
        className='focus:rounded-full'
        cx={controlX}
        cy={controlY}
        r={6}
        fill='purple'
        onMouseDown={handleMouseDown}
        // optional: maybe figure this out later
        // onKeyDown={handleKeyDown}
        tabIndex={0}
      />
    </>
  )
}

export default Handle
