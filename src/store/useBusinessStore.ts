import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BusinessStore {
  activeBusinessId: string | null;
  setActiveBusinessId: (id: string | null) => void;
}

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set) => ({
      activeBusinessId: null,
      setActiveBusinessId: (id) => set({ activeBusinessId: id }),
    }),
    {
      name: 'loyalscan-business-storage',
    }
  )
);
