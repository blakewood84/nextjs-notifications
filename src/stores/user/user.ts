import { User, UserStore } from "./types";
import { create, useStore } from "zustand";

export const users: User[] = [
  {
    image: "https://picsum.photos/id/30/200/300",
    name: "Emanate",
    id: "emanate-live",
  },
  {
    image: "https://picsum.photos/id/237/200/300",
    name: "mau5trap",
    id: "mau5trap",
  },
];

const userStore = create<UserStore>((set) => ({
  user: users[0],
  token: null,
  otherToken: null,
  switchUser: () =>
    set((state) => {
      const currentIndex = users.findIndex((e) => e.id == state.user.id);
      const newIndex: number = currentIndex === 0 ? 1 : 0;
      return { user: users[newIndex] };
    }),
  setToken: (token: string, otherToken: string) =>
    set((state) => {
      return { token: token, otherToken: otherToken };
    }),
}));

export function useUser() {
  return useStore(userStore);
}
