import React from "react"
import { Position, usePosition } from "../utils/usePosition"
import { RADIUS } from "../utils/constants"

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
  // calculations for the line's starting point
  const { x, y } = usePosition(position)

  const startX = x(index)
  const startY = y(index)
  const controlX = x(initialX)
  const controlY = y(initialY)
  const a = Math.atan2(controlY - startY, controlX - startX)
  const cxs = controlX - RADIUS * Math.cos(a)
  const cys = controlY - RADIUS * Math.sin(a)

  return (
    <>
      <line
        className='stroke-purple-400 stroke-2'
        x1={cxs}
        y1={cys}
        x2={startX}
        y2={startY}
      />
      <circle
        className='focus:rounded-full hover:cursor-pointer fill-purple-400 focus:outline-purple-600'
        cx={controlX}
        cy={controlY}
        r={RADIUS}
        onMouseDown={handleMouseDown}
        // optional: maybe figure this out later
        // onKeyDown={handleKeyDown}
        tabIndex={0}
      />
    </>
  )
}

export default Handle
