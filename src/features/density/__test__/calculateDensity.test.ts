import { describe, expect, test } from "vitest"
import {
  calculateDensity,
  DENSITY_AT20_CORRECTION,
  DENSITY_AT20_UNIT,
  DENSITY_NO_CORRECTION,
} from "../lib/calculateDensity"
import { calculateDensityAverage } from "../lib/calculateDensityAverage"
import { calculateDensityRepeatability } from "../lib/calculateDensityRepeatability"
import { formatDensityValue } from "../lib/formatDensityValue"

describe("calculateDensity", () => {
  test("calculates density at 20C with 1.4 correction for protocol test data", () => {
    const first = calculateDensity("863,0", "21,0", DENSITY_AT20_UNIT, DENSITY_AT20_CORRECTION)
    const second = calculateDensity("875,0", "22,0", DENSITY_AT20_UNIT, DENSITY_AT20_CORRECTION)
    const firstAt20 = calculateDensity("863,0", "21,0", DENSITY_AT20_UNIT, DENSITY_NO_CORRECTION)
    const secondAt20 = calculateDensity("875,0", "22,0", DENSITY_AT20_UNIT, DENSITY_NO_CORRECTION)

    expect(first).not.toBeNull()
    expect(second).not.toBeNull()
    expect(formatDensityValue(firstAt20!, DENSITY_AT20_UNIT)).toBe("863,6")
    expect(formatDensityValue(secondAt20!, DENSITY_AT20_UNIT)).toBe("876,3")
    expect(formatDensityValue(first!, DENSITY_AT20_UNIT)).toBe("865,0")
    expect(formatDensityValue(second!, DENSITY_AT20_UNIT)).toBe("877,7")
    expect(calculateDensityAverage(first, second, DENSITY_AT20_UNIT)).toBe("871,4")
  })

  test("calculates repeatability from corrected densities", () => {
    const first = calculateDensity("863,0", "21,0", DENSITY_AT20_UNIT, DENSITY_AT20_CORRECTION)
    const second = calculateDensity("875,0", "22,0", DENSITY_AT20_UNIT, DENSITY_AT20_CORRECTION)

    expect(calculateDensityRepeatability(first, second)).toEqual({
      value: "12,7 > r (Error)",
      isError: true,
    })
    expect(calculateDensityRepeatability(865, 865.3)).toEqual({
      value: "0,3",
      isError: false,
    })
  })
})
