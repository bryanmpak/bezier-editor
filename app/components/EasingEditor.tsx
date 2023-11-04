"use client"

import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react"
import Handle from "./Handle"
import { Curve } from "./Curve"
import { BezierCurveValue } from "../page"
import { PADDING } from "../utils/constants"

type EasingEditorProps = {
  value: BezierCurveValue
  setValue: Dispatch<SetStateAction<BezierCurveValue>>
  width?: number
  height?: number
}

const EasingEditor = ({
  value,
  setValue,
  width = 300,
  height = 300,
}: EasingEditorProps) => {
  const editorRef = useRef<SVGSVGElement | null>(null)
  const [isDragging, setIsDragging] = useState<null | number>(null)

  // to get some padding on the SVG
  const padding = PADDING
  const paddedWidth = width - padding * 2
  const paddedHeight = height - padding * 2

  const { x, y } = useMemo(() => {
    const xFunc = (val: number) => Math.round(val * paddedWidth) + padding
    const yFunc = (val: number) =>
      Math.round((1 - val) * paddedHeight) + padding

    return { x: xFunc, y: yFunc }
  }, [paddedWidth, paddedHeight, padding])

  const position = useMemo(
    () => ({
      x: {
        from: x(0),
        to: x(1),
      },
      y: {
        from: y(0),
        to: y(1),
      },
    }),
    [x, y]
  )

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging !== null && editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect()
      if (rect) {
        const newValue = value.slice()
        let x = (e.clientX - rect.left - padding) / paddedWidth
        const y = 1 - (e.clientY - rect.top - padding) / paddedHeight

        // clamping x value to range [0, 1], per bezier-easing.ts spec
        x = Math.min(Math.max(x, 0), 1)

        // based on coordinate, which handle is being adjusted
        newValue[isDragging * 2] = x
        newValue[isDragging * 2 + 1] = y

        setValue(newValue as BezierCurveValue)
      }
    }
  }

  // optional: maybe figure this out later
  // const handleKeyDown = (e: KeyboardEvent<SVGCircleElement>) => {
  //   if (isDragging !== null && editorRef.current) {
  //     // Get the current position of the selected handle
  //     const currentIndexX = isDragging * 2
  //     const currentIndexY = isDragging * 2 + 1
  //     let x = value[currentIndexX]
  //     let y = value[currentIndexY]

  //     switch (e.key) {
  //       case "ArrowUp":
  //         y = Math.max(0, y - 5 / paddedHeight) // Ensure y remains within bounds [0, 1]
  //         break
  //       case "ArrowDown":
  //         y = Math.min(1, y + 5 / paddedHeight) // Ensure y remains within bounds [0, 1]
  //         break
  //       case "ArrowLeft":
  //         x = Math.max(0, x - 5 / paddedWidth) // Ensure x remains within bounds [0, 1]
  //         break
  //       case "ArrowRight":
  //         x = Math.min(1, x + 5 / paddedWidth) // Ensure x remains within bounds [0, 1]
  //         break
  //       default:
  //         return
  //     }

  //     // Create a new value array with the updated position of the selected handle
  //     const newValue = value.slice()
  //     newValue[currentIndexX] = x
  //     newValue[currentIndexY] = y

  //     // Update the value state
  //     setValue(newValue as EasingEditorValue)
  //     console.log(value)
  //   }
  // }

  const handleMouseDown = (index: number) => () => {
    setIsDragging(index)
    console.log(index)
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  return (
    <div className='relative' style={{ width: width, height: height }}>
      <div
        className='absolute w-full h-full bg-[length:16px_16px] pointer-events-none'
        style={{
          backgroundImage:
            "   radial-gradient(circle at 6px 6px, rgb(26, 26, 26, 0.2) 1px, transparent 0)",
        }}
      ></div>
      <svg
        ref={editorRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Curve
          value={value}
          position={position}
          width={width}
          height={width}
          padding={padding}
        />
        <Handle
          index={0}
          initialX={value[0]}
          initialY={value[1]}
          handleMouseDown={handleMouseDown(0)}
          position={position}
          // handleKeyDown={handleKeyDown}
        />
        <Handle
          index={1}
          initialX={value[2]}
          initialY={value[3]}
          handleMouseDown={handleMouseDown(1)}
          position={position}
          // handleKeyDown={handleKeyDown}
        />
      </svg>
    </div>
  )
}

export default EasingEditor
