"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { bezier } from "../utils/bezier-easing"
import { FPS, OPACITY, TIME_ELAPSED } from "../utils/constants"
import { BezierCurveValue } from "../utils/typings"

type EasingVisualizerProps = {
  values: BezierCurveValue
}

const EasingVisualizer = ({ values }: EasingVisualizerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const fps = FPS
  const elapsedOpacity = OPACITY
  const animationTiming = TIME_ELAPSED

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const easingFunction = useMemo(() => bezier(...values), [values])

  const getSteps = (easingFn: (x: number) => number, fps: number) => {
    const steps = Array.from({ length: fps })
      .fill(-1)
      .map((_, index) => easingFn(index / fps))
    steps.push(easingFn(1))
    return steps
  }

  const steps = useMemo(
    () => getSteps(easingFunction, fps),
    [easingFunction, fps]
  )

  const [activeStepIndex, setActiveStepIndex] = useState(steps.length - 1)

  useEffect(() => {
    setActiveStepIndex(0)
    setIsPlaying(true)
  }, [values])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeStepIndex < steps.length - 1) {
        setActiveStepIndex((index) => index + 1)
      } else {
        setIsPlaying(false)
      }
    }, animationTiming / fps)

    return () => clearInterval(intervalId)
  }, [activeStepIndex, isPlaying])

  return (
    <div ref={containerRef} className='relative h-12 mr-8'>
      {steps.map((step, index) => (
        <div
          key={step}
          className='absolute top-0 w-8 h-8 border border-purple-500 bg-purple-400 rounded-full'
          style={{
            transform: `translateX(${step * containerWidth}px)`,
            opacity:
              index === activeStepIndex
                ? 1
                : index > activeStepIndex
                ? 0
                : elapsedOpacity,
          }}
        />
      ))}
    </div>
  )
}

export default EasingVisualizer
