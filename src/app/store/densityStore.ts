import { create } from 'zustand'

type DensityGroup = {
  id: string;
  density: string;
  temperature: string;
}

interface DensityStore {
  groups: DensityGroup[];
  addGroup: () => void;
  updateGroupDensity: (id: string, value: string) => void;
  updateGroupTemperature: (id: string, value: string) => void;
}

export const useDensityStore = create<DensityStore>((set) => ({
  groups: [{ id: crypto.randomUUID(), density: "", temperature: "" }],
  
  addGroup: () => set((state) => ({
    groups: [...state.groups, { id: crypto.randomUUID(), density: "", temperature: "" }]
  })),
  
  updateGroupDensity: (id, value) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === id ? { ...group, density: value } : group
    )
  })),
  
  updateGroupTemperature: (id, value) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === id ? { ...group, temperature: value } : group
    )
  }))
}))