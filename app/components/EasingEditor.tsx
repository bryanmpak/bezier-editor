"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Handle from "./Handle"

export type EasingEditorValue = [number, number, number, number]

type EasingEditorProps = {
  defaultValue?: EasingEditorValue
  width?: number
  height?: number
}

const EasingEditor = ({
  width = 300,
  height = 300,
  defaultValue = [0.25, 0.25, 0.75, 0.75],
}: EasingEditorProps) => {
  const [value, setValue] = useState(defaultValue)
  const editorRef = useRef<SVGSVGElement | null>(null)
  const [isDragging, setIsDragging] = useState<null | number>(null)

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
        setValue(newValue as EasingEditorValue)
      }
    }
  }

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
      <Handle
        index={0}
        initialX={value[0] * width}
        initialY={(1 - value[1]) * height}
        onMouseDown={handleMouseDown(0)}
      />
      <Handle
        index={1}
        initialX={value[2] * width}
        initialY={(1 - value[3]) * height}
        onMouseDown={handleMouseDown(1)}
      />
    </svg>
  )
}

export default EasingEditor
