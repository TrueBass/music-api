import { createContext, useContext } from 'react';

export const PlayingSongContext = createContext();
export const usePlayingSongContext = () => useContext(PlayingSongContext);