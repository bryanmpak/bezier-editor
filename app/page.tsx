"use client"

import { useState } from "react"
import Card from "./components/Card"
import Container from "./components/Container"
import EasingEditor from "./components/EasingEditor"
import EasingVisualizer from "./components/EasingVisualizer"

export type BezierCurveValue = [number, number, number, number]

/*

default easing curves:
https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#values
ease = cubic-bezier(0.25, 0.1, 0.25, 1).
ease-in = cubic-bezier(0.42, 0, 1, 1).
ease-out = cubic-bezier(0, 0, 0.58, 1).
ease-in-out = cubic-bezier(0.42, 0, 0.58, 1).
linear = cubic-bezier(0.0, 0.0, 1.0, 1.0).
*/

// TTD: rebuild to be objects that contain value & img - to refer to for defaults
const easingPresets = {
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  linear: [0, 0, 1, 1],
}

export default function Home() {
  const [easingPreset, setEasingPreset] = useState(easingPresets["linear"])
  const [value, setValue] = useState(easingPreset as BezierCurveValue)

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
