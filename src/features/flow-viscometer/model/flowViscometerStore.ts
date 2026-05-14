import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { produce } from "immer"
import type { FlowViscometerCalibrationFilter } from "../lib/flowViscometerCalc"

export type FlowViscometerEntityProps = {
  id: string
  calibrationFilter: FlowViscometerCalibrationFilter
  minFlowTimeSec: string
  estimatedViscosity: string
}

type FlowViscometerStore = {
  entities: FlowViscometerEntityProps[]

  addEntity: () => void
  removeEntity: (entityId: string) => void
  clearEntity: (entityId: string) => void

  updateCalibrationFilter: (entityId: string, value: FlowViscometerCalibrationFilter) => void
  updateMinFlowTimeSec: (entityId: string, value: string) => void
  updateEstimatedViscosity: (entityId: string, value: string) => void

  clearStore: () => void
}

const createEntity = (): FlowViscometerEntityProps => ({
  id: crypto.randomUUID(),
  calibrationFilter: "all",
  minFlowTimeSec: "",
  estimatedViscosity: "",
})

const createInitialState = (): Pick<FlowViscometerStore, "entities"> => ({
  entities: [createEntity()],
})

export const useFlowViscometerStore = create<FlowViscometerStore>()(
  persist(
    (set) => ({
      ...createInitialState(),

      addEntity: () =>
        set(
          produce((state: FlowViscometerStore) => {
            state.entities.push(createEntity())
          }),
        ),

      removeEntity: (entityId) =>
        set(
          produce((state: FlowViscometerStore) => {
            state.entities = state.entities.filter((entity) => entity.id !== entityId)
          }),
        ),

      clearEntity: (entityId) =>
        set(
          produce((state: FlowViscometerStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.calibrationFilter = "all"
            entity.minFlowTimeSec = ""
            entity.estimatedViscosity = ""
          }),
        ),

      updateCalibrationFilter: (entityId, value) =>
        set(
          produce((state: FlowViscometerStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.calibrationFilter = value
          }),
        ),

      updateMinFlowTimeSec: (entityId, value) =>
        set(
          produce((state: FlowViscometerStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.minFlowTimeSec = value
          }),
        ),

      updateEstimatedViscosity: (entityId, value) =>
        set(
          produce((state: FlowViscometerStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.estimatedViscosity = value
          }),
        ),

      clearStore: () => {
        set(createInitialState())
      },
    }),
    {
      name: "flow-viscometer-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
