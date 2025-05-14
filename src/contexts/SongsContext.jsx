import { useEffect, useState } from "react";
import { SongsContext } from "./songsCtx";
import { getAllSongsInfoFromPlaylist } from "../api/songs-api";

export function SongsProvider({children, playlist}) {
  const [
    songs,
    setSongs
  ] = useState([]);

  const [
    currPlaylist,
    setCurrPlaylist
  ] = useState(playlist);

  useState(()=>{
    

    // let savedSongs = localStorage.getItem("playlistSongs"+currPlaylist?.id);
    // if(savedSongs) setSongs(JSON.parse(savedSongs));
    // else {
      getAllSongs(currPlaylist?.id);
    // }
  }, [currPlaylist]);
  
  useEffect(()=>{
    localStorage.setItem("playlistSongs", JSON.stringify(songs));
  }, [songs]);

  const addSong = (song) => {
    if(songs.includes(song))
      return;
    setSongs(prev => [...prev, song]);
  };

  const deleteSong = (id) => {
    setSongs(prev => prev.filter((_, i) => i !== id));
  };

  const value = {
    songs,
    addSong,
    deleteSong,
    setCurrPlaylist
  };

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
}