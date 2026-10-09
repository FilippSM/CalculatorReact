import { create } from "zustand"

type RegistrationNumberState = {
  registrationNumber: string
  setRegistrationNumber: (registrationNumber: string) => void
}

export const useRegistrationNumberStore = create<RegistrationNumberState>((set) => ({
  registrationNumber: "260526-М-1203",
  setRegistrationNumber: (registrationNumber) => set({ registrationNumber }),
}))
