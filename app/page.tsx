"use client"

import { useState } from "react"
import Card from "./components/Card"
import Container from "./components/Container"
import EasingEditor from "./components/EasingEditor"
import EasingVisualizer from "./components/EasingVisualizer"

export type BezierCurveValue = [number, number, number, number]

export default function Home() {
  // TTD: temporary before adding presets const easingPresets = []
  const [value, setValue] = useState([0.42, 0, 0.58, 1] as BezierCurveValue)

  return (
    <Container>
      <Card cardHeight={600} cardWidth={300}>
        <EasingVisualizer value={value} setValue={setValue} />
        <EasingEditor
          value={value}
          setValue={setValue}
          height={300}
          width={300}
        />
      </Card>
    </Container>
  )
}
