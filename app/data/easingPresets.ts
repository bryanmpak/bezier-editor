/*
default easing curves:
https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#values
*/

import { EasingPresetsType } from "../utils/typings"

export const easingPresets: EasingPresetsType = {
  "ease-in-out": { img: "/ease-in-out.png", value: [0.42, 0, 0.58, 1] },
  "ease-in": { img: "/ease-in.png", value: [0.42, 0, 1, 1] },
  "ease-out": { img: "/ease-out.png", value: [0, 0, 0.58, 1] },
  ease: { img: "/ease.png", value: [0.25, 0.1, 0.25, 1] },
  linear: { img: "/linear.png", value: [0, 0, 1, 1] },
}
