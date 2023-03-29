import { create, useStore } from "zustand";

export type User = {
  image: string;
  name: string;
  id: string;
};

export type UserStore = {
  user: User;
  token: string | null;
  switchUser: () => void;
  setToken: (token: string) => void;
};

const users: User[] = [
  {
    image: "https://picsum.photos/id/30/200/300",
    name: "Emanate",
    id: "emanatelive",
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
  switchUser: () =>
    set((state) => {
      const currentIndex = users.findIndex((e) => e.id == state.user.id);
      const newIndex: number = currentIndex === 0 ? 1 : 0;
      return { user: users[newIndex] };
    }),
  setToken: (token: string) =>
    set((state) => {
      return { token: token };
    }),
}));

export function useUser() {
  return useStore(userStore);
}
