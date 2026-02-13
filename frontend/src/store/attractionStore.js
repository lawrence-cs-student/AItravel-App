import { create } from "zustand";
import { persist } from "zustand/middleware";

const attractionStore = create(
  persist(
    (set) => ({
      attractionList: [],

      setAttractionList: (spots) => {
        console.log("ZUSTAND SET:", spots);
        set({ attractionList: spots });
      },

      resetAttractionList: () => {
        console.log("RESET CALLED");
        set({ attractionList: [] });
      },
    }),
    {
      name: "attraction-storage",
      partialize: (state) => ({ attractionList: state.attractionList }), 
    }
  )
);

export default attractionStore;
