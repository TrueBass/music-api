import { createContext, useContext } from 'react';

export const SongsContext = createContext();
export const useSongsContext = () => useContext(SongsContext);