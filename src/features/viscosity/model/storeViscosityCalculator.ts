import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { produce } from "immer"

export type ViscosityGroup = {
  id: string
  time: string
  constant: string
}

export type ViscosityEntity = {
  id: string
  dataMode: "input" | "select"
  flowTimeFormat: "sec" | "timer"
  groups100: ViscosityGroup[]
  groups40: ViscosityGroup[]
}

type ViscosityStore = {
  entities: ViscosityEntity[]

  addEntity: () => void
  removeEntity: (entityId: string) => void

  clearStore: () => void
  clearEntity: (entityId: string) => void

  setDataMode: (entityId: string, mode: ViscosityEntity["dataMode"]) => void
  setFlowTimeFormat: (entityId: string, format: ViscosityEntity["flowTimeFormat"]) => void

  addGroup100: (entityId: string) => void
  removeGroup100: (entityId: string, groupId: string) => void
  updateGroup100: (entityId: string, groupId: string, field: keyof ViscosityGroup, value: string) => void

  addGroup40: (entityId: string) => void
  removeGroup40: (entityId: string, groupId: string) => void
  updateGroup40: (entityId: string, groupId: string, field: keyof ViscosityGroup, value: string) => void
}

const createViscosityGroup = (): ViscosityGroup => ({
  id: `${Date.now()}-${Math.random()}`,
  time: "",
  constant: "",
})

const createViscosityEntity = (): ViscosityEntity => ({
  id: `${Date.now()}-${Math.random()}`,
  dataMode: "input",
  flowTimeFormat: "sec",
  groups100: [createViscosityGroup()],
  groups40: [createViscosityGroup()],
})

const createInitialState = (): Pick<ViscosityStore, "entities"> => ({
  entities: [createViscosityEntity()],
})

export const useViscosityStore = create<ViscosityStore>()(
  persist(
    (set) => ({
      ...createInitialState(),

      addEntity: () =>
        set(
          produce((state: ViscosityStore) => {
            state.entities.push(createViscosityEntity())
          }),
        ),

      removeEntity: (entityId) =>
        set(
          produce((state: ViscosityStore) => {
            if (state.entities.length <= 1) return
            state.entities = state.entities.filter((entity) => entity.id !== entityId)
          }),
        ),

      clearStore: () => {
        set(createInitialState())
      },

      clearEntity: (entityId) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            entity.dataMode = "input"
            entity.flowTimeFormat = "sec"
            entity.groups100 = [createViscosityGroup()]
            entity.groups40 = [createViscosityGroup()]
          }),
        ),

      setDataMode: (entityId, mode) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            entity.dataMode = mode

            // Switching modes resets constants (same behaviour as before).
            entity.groups100.forEach((g) => {
              g.constant = ""
            })
            entity.groups40.forEach((g) => {
              g.constant = ""
            })
          }),
        ),

      setFlowTimeFormat: (entityId, format) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            entity.flowTimeFormat = format
          }),
        ),

      addGroup100: (entityId) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            entity.groups100.push(createViscosityGroup())
          }),
        ),

      removeGroup100: (entityId, groupId) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            if (entity.groups100.length <= 1) return

            entity.groups100 = entity.groups100.filter((g) => g.id !== groupId)
          }),
        ),

      updateGroup100: (entityId, groupId, field, value) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            const group = entity.groups100.find((g) => g.id === groupId)
            if (!group) return

            group[field] = value
          }),
        ),

      addGroup40: (entityId) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            entity.groups40.push(createViscosityGroup())
          }),
        ),

      removeGroup40: (entityId, groupId) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            if (entity.groups40.length <= 1) return

            entity.groups40 = entity.groups40.filter((g) => g.id !== groupId)
          }),
        ),

      updateGroup40: (entityId, groupId, field, value) =>
        set(
          produce((state: ViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return

            const group = entity.groups40.find((g) => g.id === groupId)
            if (!group) return

            group[field] = value
          }),
        ),
    }),
    {
      name: "viscosity-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

