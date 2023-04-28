import { createContext } from 'react';

export const Context = createContext<{
  token: string | null;
  socket: any;
  admin: boolean;
  setToken: (token: string | null) => void;
  setAdmin: (admin: boolean) => void;
}>({
  token: '',
  socket: undefined,
  admin: false,
  setToken: () => {},
  setAdmin: () => {},
});
