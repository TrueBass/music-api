import { createContext, useContext } from 'react';

export const PlaylistsContext = createContext();
export const usePlaylistsContext = () => useContext(PlaylistsContext);