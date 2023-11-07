"use client"

import { useEffect, useState } from "react"
import Card from "./components/Card"
import Container from "./components/Container"
import EasingEditor from "./components/EasingEditor"
import EasingVisualizer from "./components/EasingVisualizer"
import EasingPresetOptions from "./components/EasingPresetOptions"
import { DEFAULT_PRESET } from "./utils/constants"
import { BezierCurveValue, EasingPresetsType } from "./utils/typings"
import { easingPresets } from "./data/easingPresets"

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState(
    easingPresets[DEFAULT_PRESET]
  )
  const [currentValues, setCurrentValues] = useState(
    currentPreset.value as BezierCurveValue
  )
  const [vizValues, setVizValues] = useState(
    currentPreset.value as BezierCurveValue
  )

  const roundedCurrentValues = currentValues.map((val) => val.toFixed(2))

  useEffect(() => {
    setCurrentValues(currentPreset.value)
    setVizValues(currentPreset.value)
  }, [currentPreset])

  return (
    <Container>
      <Card cardWidth={450}>
        <EasingVisualizer values={vizValues} />
        <div className='flex justify-evenly'>
          <EasingPresetOptions
            currentPreset={currentPreset}
            setCurrentPreset={setCurrentPreset}
          />
          <EasingEditor
            values={currentValues}
            setValues={setCurrentValues}
            setVizValues={setVizValues}
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
