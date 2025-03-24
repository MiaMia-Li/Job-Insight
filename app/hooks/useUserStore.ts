import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface User {
  id: string | undefined;
  name: string | undefined;
  email?: string | undefined;
  image: string | undefined;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
