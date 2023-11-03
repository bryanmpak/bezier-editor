import React, { memo, useMemo } from "react"
import { Position, usePosition } from "../utils/usePosition"
import { BezierCurveValue } from "../page"

type CurveProps = {
  value: BezierCurveValue
  position: Position
  width: number
  height: number
  padding: number
}

export const Curve: React.FC<CurveProps> = memo(function Curve({
  value,
  position,
  width,
  height,
  padding,
}) {
  const { x, y } = usePosition(position)

  const curve = useMemo(() => {
    const startX = x(0)
    const startY = y(0)
    const endX = x(1)
    const endY = y(1)
    const controlStartX = x(value[0])
    const controlStartY = y(value[1])
    const controlEndX = x(value[2])
    const controlEndY = y(value[3])
    return `M${startX},${startY} C${controlStartX},${controlStartY} ${controlEndX},${controlEndY} ${endX},${endY}`
  }, [value, x, y])

  return (
    <>
      <path className='stroke-2 stroke-black fill-none' d={curve} />
      <path
        className='stroke-1 stroke-gray-500 fill-none'
        d={`M${padding},${height - padding} C${padding},${height - padding} ${
          width - padding
        },${padding} ${width - padding},${padding}`}
      />
    </>
  )
})
