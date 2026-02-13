import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      usertoken: null,
      userCredentials: null,

      storeUser: (token, user) => set({ userToken: token, userCredentials: user }),
      clearUser: () => set({ userToken: null, userCredentials: null}),
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
