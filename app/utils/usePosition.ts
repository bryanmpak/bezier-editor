import { useMemo } from "react"

// interpolating b/w the start & end points
const interpolate = (a: number, b: number, x: number) => {
  return a * (1 - x) + b * x
}

export interface Position {
  x: {
    from: number
    to: number
  }
  y: {
    from: number
    to: number
  }
}

export const usePosition = (pos: Position) => {
  const result = useMemo(
    () => ({
      x: (value: number) =>
        Math.round(interpolate(pos.x.from, pos.x.to, value)),
      y: (value: number) =>
        Math.round(interpolate(pos.y.from, pos.y.to, value)),
    }),
    [pos.x.from, pos.x.to, pos.y.from, pos.y.to]
  )
  return result
}
