"use client"

import { useEffect, useState } from "react"
import Card from "./components/Card"
import Container from "./components/Container"
import EasingEditor from "./components/EasingEditor"
import EasingVisualizer from "./components/EasingVisualizer"
import EasingPresetOptions from "./components/EasingPresetOptions"
import { DEFAULT_PRESET } from "./utils/constants"

export type BezierCurveValue = [number, number, number, number]

export interface EasingPreset {
  img: string
  value: BezierCurveValue
}

type EasingPresetsType = {
  [key: string]: EasingPreset
}

/*
default easing curves:
https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#values
*/

export const easingPresets: EasingPresetsType = {
  "ease-in-out": { img: "/ease-in-out.png", value: [0.42, 0, 0.58, 1] },
  "ease-in": { img: "/ease-in.png", value: [0.42, 0, 1, 1] },
  "ease-out": { img: "/ease-out.png", value: [0, 0, 0.58, 1] },
  ease: { img: "/ease.png", value: [0.25, 0.1, 0.25, 1] },
  linear: { img: "/linear.png", value: [0, 0, 1, 1] },
}

export default function Home() {
  const defaultPreset = easingPresets[DEFAULT_PRESET]

  const [currentPreset, setCurrentPreset] = useState(defaultPreset)
  const [currentValue, setCurrentValue] = useState(
    currentPreset.value as BezierCurveValue
  )

  const roundedCurrentValues = currentValue.map((val) => val.toFixed(1))

  useEffect(() => {
    setCurrentValue(currentPreset.value as BezierCurveValue)
  }, [currentPreset])

  return (
    <Container>
      <Card cardWidth={450}>
        <EasingVisualizer value={currentValue} />
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
          <p>{`cubic-bezier (${roundedCurrentValues.join(", ")})`}</p>
        </div>
      </Card>
    </Container>
  )
}
