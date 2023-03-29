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
