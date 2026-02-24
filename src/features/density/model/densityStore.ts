import { create } from "zustand"

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
    set((state) => ({
      entities: [
        ...state.entities,
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
    })),

  removeEntity: (entityId) =>
    set((state) => ({
      entities: state.entities.filter((e) => e.id !== entityId),
    })),

  addGroup: (entityId) =>
    set((state) => ({
      entities: state.entities.map((entity) =>
        entity.id === entityId
          ? {
              ...entity,
              groups: [
                ...entity.groups,
                {
                  id: crypto.randomUUID(),
                  density: "",
                  temperature: "",
                },
              ],
            }
          : entity,
      ),
    })),

  removeGroup: (entityId, groupId) =>
    set((state) => ({
      entities: state.entities.map((entity) =>
        entity.id === entityId
          ? {
              ...entity,
              groups: entity.groups.filter((g) => g.id !== groupId),
            }
          : entity,
      ),
    })),

  updateDensity: (entityId, groupId, value) =>
    set((state) => ({
      entities: state.entities.map((entity) =>
        entity.id === entityId
          ? {
              ...entity,
              groups: entity.groups.map((g) => (g.id === groupId ? { ...g, density: value } : g)),
            }
          : entity,
      ),
    })),

  updateTemperature: (entityId, groupId, value) =>
    set((state) => ({
      entities: state.entities.map((entity) =>
        entity.id === entityId
          ? {
              ...entity,
              groups: entity.groups.map((g) => (g.id === groupId ? { ...g, temperature: value } : g)),
            }
          : entity,
      ),
    })),

  updateCorrection: (entityId, value) =>
    set((state) => ({
      entities: state.entities.map((entity) => (entity.id === entityId ? { ...entity, correction: value } : entity)),
    })),

  updateUnit: (entityId, value) =>
    set((state) => ({
      entities: state.entities.map((entity) => (entity.id === entityId ? { ...entity, unit: value } : entity)),
    })),
}))
