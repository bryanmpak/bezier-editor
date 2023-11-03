"use client"

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { BezierCurveValue } from "../page"
import { bezier } from "../utils/bezier-easing"

type EasingVisualizerProps = {
  value: BezierCurveValue
  setValue: Dispatch<SetStateAction<BezierCurveValue>>
}

const EasingVisualizer = ({ value, setValue }: EasingVisualizerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [fps, setFps] = useState(30) // TTD: pull this up to page and pass as props
  const ghostOpacity = 0.2

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  // TTD: figure out how to deal with negative values
  const easingFunction = useMemo(() => bezier(...value), [value])

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
  }, [value])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeStepIndex < steps.length - 1) {
        setActiveStepIndex((index) => index + 1)
      } else {
        setIsPlaying(false)
      }
    }, 1000 / fps) // TTD: pull this up to page and pass as props

    return () => clearInterval(intervalId)
  }, [activeStepIndex, isPlaying])

  return (
    <div ref={containerRef} className='relative h-10 mr-8'>
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
                : ghostOpacity,
          }}
        />
      ))}
    </div>
  )
}

export default EasingVisualizer
