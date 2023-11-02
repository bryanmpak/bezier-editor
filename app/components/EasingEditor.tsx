"use client"

import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react"
import Handle from "./Handle"
import { Curve } from "./Curve"
import { BezierCurveValue } from "../page"

type EasingEditorProps = {
  value: BezierCurveValue
  setValue: Dispatch<SetStateAction<BezierCurveValue>>
  width?: number
  height?: number
}

/*

default easing curves:
https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#values
ease = cubic-bezier(0.25, 0.1, 0.25, 1).
ease-in = cubic-bezier(0.42, 0, 1, 1).
ease-out = cubic-bezier(0, 0, 0.58, 1).
ease-in-out = cubic-bezier(0.42, 0, 0.58, 1).
linear = cubic-bezier(0.0, 0.0, 1.0, 1.0).
*/

const EasingEditor = ({
  value,
  setValue,
  width = 300,
  height = 300,
}: EasingEditorProps) => {
  const editorRef = useRef<SVGSVGElement | null>(null)
  const [isDragging, setIsDragging] = useState<null | number>(null)

  const { x, y } = useMemo(() => {
    const xFunc = (val: number) => Math.round(val * width)
    const yFunc = (val: number) => Math.round((1 - val) * height)

    return { x: xFunc, y: yFunc }
  }, [width, height])

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
        const x = (e.clientX - rect.left) / width
        const y = 1 - (e.clientY - rect.top) / height

        // based on index, which handle is being adjusted
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
  //         y = Math.max(0, y - 5 / height) // Ensure y remains within bounds [0, 1]
  //         break
  //       case "ArrowDown":
  //         y = Math.min(1, y + 5 / height) // Ensure y remains within bounds [0, 1]
  //         break
  //       case "ArrowLeft":
  //         x = Math.max(0, x - 5 / width) // Ensure x remains within bounds [0, 1]
  //         break
  //       case "ArrowRight":
  //         x = Math.min(1, x + 5 / width) // Ensure x remains within bounds [0, 1]
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
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  return (
    <svg
      className='bg-neutral-400'
      ref={editorRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Curve value={value} position={position} />
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
  )
}

export default EasingEditor
