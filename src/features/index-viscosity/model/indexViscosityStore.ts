import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { produce } from "immer"

export type IndexViscosityGroup = {
  id: string
  viscosity100: string
  viscosity40: string
}

export type IndexViscosityEntityProps = {
  id: string
  groups: IndexViscosityGroup[]
}

type IndexViscosityStore = {
  entities: IndexViscosityEntityProps[]

  addEntity: () => void
  removeEntity: (entityId: string) => void

  addGroup: (entityId: string) => void
  removeGroup: (entityId: string, groupId: string) => void

  clearEntity: (entityId: string) => void

  updateViscosity100: (entityId: string, groupId: string, value: string) => void
  updateViscosity40: (entityId: string, groupId: string, value: string) => void

  clearStore: () => void
}

const createGroup = (): IndexViscosityGroup => ({
  id: crypto.randomUUID(),
  viscosity100: "",
  viscosity40: "",
})

const createEntity = (): IndexViscosityEntityProps => ({
  id: crypto.randomUUID(),
  groups: [createGroup()],
})

const createInitialState = (): Pick<IndexViscosityStore, "entities"> => ({
  entities: [createEntity()],
})

export const useIndexViscosityStore = create<IndexViscosityStore>()(
  persist(
    (set) => ({
      ...createInitialState(),

      addEntity: () =>
        set(
          produce((state: IndexViscosityStore) => {
            state.entities.push(createEntity())
          }),
        ),

      removeEntity: (entityId) =>
        set(
          produce((state: IndexViscosityStore) => {
            state.entities = state.entities.filter((entity) => entity.id !== entityId)
          }),
        ),

      addGroup: (entityId) =>
        set(
          produce((state: IndexViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.groups.push(createGroup())
          }),
        ),

      removeGroup: (entityId, groupId) =>
        set(
          produce((state: IndexViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.groups = entity.groups.filter((group) => group.id !== groupId)
          }),
        ),

      clearEntity: (entityId) =>
        set(
          produce((state: IndexViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            entity.groups = [createGroup()]
          }),
        ),

      updateViscosity100: (entityId, groupId, value) =>
        set(
          produce((state: IndexViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            const group = entity.groups.find((item) => item.id === groupId)
            if (!group) return
            group.viscosity100 = value
          }),
        ),

      updateViscosity40: (entityId, groupId, value) =>
        set(
          produce((state: IndexViscosityStore) => {
            const entity = state.entities.find((item) => item.id === entityId)
            if (!entity) return
            const group = entity.groups.find((item) => item.id === groupId)
            if (!group) return
            group.viscosity40 = value
          }),
        ),

      clearStore: () => {
        set(createInitialState())
      },
    }),
    {
      name: "index-viscosity-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
