import React, { memo, useMemo } from "react"
import { Position, usePosition } from "../utils/usePosition"
import { BezierCurveValue } from "../page"

type CurveProps = {
  value: BezierCurveValue
  position: Position
  width: number
  height: number
}

export const Curve: React.FC<CurveProps> = memo(function Curve({
  value,
  position,
  width,
  height,
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
  console.log(curve)

  return (
    <>
      <path fill='none' stroke='black' strokeWidth={2} d={curve} />
      <path
        fill='none'
        stroke='grey'
        strokeWidth={1}
        d={`M0,${height} C0,${height} ${width},2 ${width},0`}
      />
    </>
  )
})
