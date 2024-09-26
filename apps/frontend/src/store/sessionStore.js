// src/stores/sessionStore.js
import { create } from "zustand";

export const useSessionStore = create((set) => ({
  selectedSessionId: null,
  setSelectedSessionId: (id) => set({ selectedSessionId: id }),
}));
