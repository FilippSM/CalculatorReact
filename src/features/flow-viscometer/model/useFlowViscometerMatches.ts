import { useMemo } from "react"
import { constansVisc } from "@/features/viscosity/constans/constans-visc"
import { getFlowViscometerMatches } from "../lib/flowViscometerCalc"
import type { FlowViscometerEntityProps } from "./flowViscometerStore"

type EntitySlice = Pick<FlowViscometerEntityProps, "calibrationFilter" | "minFlowTimeSec" | "estimatedViscosity">

export const useFlowViscometerMatches = (entity: EntitySlice) => {
  return useMemo(
    () =>
      getFlowViscometerMatches(
        constansVisc,
        entity.calibrationFilter,
        entity.minFlowTimeSec,
        entity.estimatedViscosity,
      ),
    [entity.calibrationFilter, entity.estimatedViscosity, entity.minFlowTimeSec],
  )
}
