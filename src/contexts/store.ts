import { createContext } from 'react';

export const Context = createContext<{
  token: string | null;
  socket: any;
  admin: boolean;
  tokens: number | null;
  setTokens: (tokens: number | null) => void;
  setToken: (token: string | null) => void;
  setAdmin: (admin: boolean) => void;
}>({
  token: '',
  socket: undefined,
  admin: false,
  tokens: 0,
  setToken: () => {},
  setAdmin: () => {},
  setTokens: () => {}
});
