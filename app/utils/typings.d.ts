export type BezierCurveValue = [number, number, number, number]

export interface EasingPreset {
  img: string
  value: BezierCurveValue
}

export interface EasingPresetsType {
  [key: string]: EasingPreset
}
