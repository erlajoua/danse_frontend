import { createContext } from 'react';

export const Context = createContext<{token: string | null, socket: any}>({token: '', socket: undefined});