import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useClickStore = create(
  persist(
    (set) => ({
      clickCount: 0,
      itemClicks: {},
      incrementClick: (itemId) => set((state) => ({
        clickCount: state.clickCount + 1,
        itemClicks: {
          ...state.itemClicks,
          [itemId]: (state.itemClicks[itemId] || 0) + 1,
        },
      })),
      resetCount: () => set({ clickCount: 0, itemClicks: {} }),
    }),
    {
      name: 'click-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);