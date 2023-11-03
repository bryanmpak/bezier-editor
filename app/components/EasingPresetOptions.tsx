import { Dispatch, SetStateAction, useState } from "react"
import { EasingPreset, easingPresets } from "../page"

type EasingPresetOptionsProps = {
  currentPreset: EasingPreset
  setCurrentPreset: Dispatch<SetStateAction<EasingPreset>>
}

const EasingPresetOptions = ({
  currentPreset,
  setCurrentPreset,
}: EasingPresetOptionsProps) => {
  const handleClick = (presetKey: string) => {
    setCurrentPreset(easingPresets[presetKey])
  }

  return (
    <div className='flex flex-col justify-evenly'>
      {Object.keys(easingPresets).map((presetKey) => (
        <button
          key={presetKey}
          className={`h-12 w-12 rounded-md border bg-gray-200 hover:bg-gray-300 ${
            currentPreset === easingPresets[presetKey] ? "bg-gray-300" : ""
          }`}
          onClick={() => handleClick(presetKey)}
        >
          <img src={easingPresets[presetKey].img} alt={presetKey} />{" "}
          {/* Display the image from the preset */}
        </button>
      ))}
    </div>
  )
}

export default EasingPresetOptions
