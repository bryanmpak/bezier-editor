"use client"

import { useEffect, useState } from "react"
import Card from "./components/Card"
import Container from "./components/Container"
import EasingEditor from "./components/EasingEditor"
import EasingVisualizer from "./components/EasingVisualizer"
import EasingPresetOptions from "./components/EasingPresetOptions"

export type BezierCurveValue = [number, number, number, number]

export type EasingPreset = {
  img: string
  value: number[]
}

type EasingPresetsType = {
  [key: string]: EasingPreset
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

// TTD: might need to rework linear - getting a 'bezier range in [0,1]' error
export const easingPresets: EasingPresetsType = {
  "ease-in-out": { img: "/ease-in-out.png", value: [0.42, 0, 0.58, 1] },
  "ease-in": { img: "/ease-in.png", value: [0.42, 0, 1, 1] },
  "ease-out": { img: "/ease-out.png", value: [0, 0, 0.58, 1] },
  ease: { img: "/ease.png", value: [0.25, 0.1, 0.25, 1] },
  linear: { img: "/linear.png", value: [0, 0, 1, 1] },
}

export default function Home() {
  const defaultPreset = easingPresets["ease-in-out"]

  // TTD: might be redundant to have these two separate states to manage

  const [currentPreset, setCurrentPreset] = useState(defaultPreset)
  const [currentValue, setCurrentValue] = useState(
    currentPreset.value as BezierCurveValue
  )

  // TTD: check if there's a better way to do this
  const roundedCurrentValues = [
    currentValue[0].toFixed(2),
    currentValue[1].toFixed(2),
    currentValue[2].toFixed(2),
    currentValue[3].toFixed(2),
  ]

  useEffect(() => {
    setCurrentValue(currentPreset.value as BezierCurveValue)
  }, [currentPreset])

  return (
    <Container>
      <Card cardHeight={600} cardWidth={300}>
        <EasingVisualizer value={currentValue} setValue={setCurrentValue} />
        <div className='flex justify-evenly'>
          <EasingPresetOptions
            currentPreset={currentPreset}
            setCurrentPreset={setCurrentPreset}
          />
          <EasingEditor
            value={currentValue}
            setValue={setCurrentValue}
            height={300}
            width={300}
          />
        </div>
        <div className='mx-auto pt-4 font-light text-sm'>
          <p>{`cubic-bezier (${roundedCurrentValues})`}</p>
        </div>
      </Card>
    </Container>
  )
}
