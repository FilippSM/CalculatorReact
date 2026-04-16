import { create } from "zustand"
import { produce } from "immer"

export type DensityGroup = {
  id: string
  density: string
  temperature: string
}

export type DensityEntityProps = {
  id: string
  correction: string
  unit: string
  groups: DensityGroup[]
}

type DensityStore = {
  entities: DensityEntityProps[]

  addEntity: () => void
  removeEntity: (entityId: string) => void

  addGroup: (entityId: string) => void
  removeGroup: (entityId: string, groupId: string) => void

  updateDensity: (entityId: string, groupId: string, value: string) => void
  updateTemperature: (entityId: string, groupId: string, value: string) => void

  updateCorrection: (entityId: string, value: string) => void
  updateUnit: (entityId: string, value: string) => void
}

export const useDensityStore = create<DensityStore>((set) => ({
    entities: [
      {
        id: crypto.randomUUID(),
        correction: "0.0014",
        unit: "кг/м³",
        groups: [
          {
            id: crypto.randomUUID(),
            density: "",
            temperature: "",
          },
        ],
      },
    ],

    addEntity: () =>
      set(
        produce((state: DensityStore) => {
          state.entities.push({
            id: crypto.randomUUID(),
            correction: "0.0014",
            unit: "кг/м³",
            groups: [
              {
                id: crypto.randomUUID(),
                density: "",
                temperature: "",
              },
            ],
          })
        }),
      ),

    removeEntity: (entityId) =>
      set(
        produce((state: DensityStore) => {
          state.entities = state.entities.filter((entity) => entity.id !== entityId)
        }),
      ),

    addGroup: (entityId) =>
      set(
        produce((state: DensityStore) => {
          const entity = state.entities.find((item) => item.id === entityId)
          if (!entity) return

          entity.groups.push({
            id: crypto.randomUUID(),
            density: "",
            temperature: "",
          })
        }),
      ),

    removeGroup: (entityId, groupId) =>
      set(
        produce((state: DensityStore) => {
          const entity = state.entities.find((item) => item.id === entityId)
          if (!entity) return

          entity.groups = entity.groups.filter((group) => group.id !== groupId)
        }),
      ),

    updateDensity: (entityId, groupId, value) =>
      set(
        produce((state: DensityStore) => {
          const entity = state.entities.find((item) => item.id === entityId)
          if (!entity) return

          const group = entity.groups.find((item) => item.id === groupId)
          if (!group) return

          group.density = value
        }),
      ),

    updateTemperature: (entityId, groupId, value) =>
      set(
        produce((state: DensityStore) => {
          const entity = state.entities.find((item) => item.id === entityId)
          if (!entity) return

          const group = entity.groups.find((item) => item.id === groupId)
          if (!group) return

          group.temperature = value
        }),
      ),

    updateCorrection: (entityId, value) =>
      set(
        produce((state: DensityStore) => {
          const entity = state.entities.find((item) => item.id === entityId)
          if (!entity) return

          entity.correction = value
        }),
      ),

    updateUnit: (entityId, value) =>
      set(
        produce((state: DensityStore) => {
          const entity = state.entities.find((item) => item.id === entityId)
          if (!entity) return

          entity.unit = value
        }),
      ),
}))
