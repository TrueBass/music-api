import { useEffect, useState } from "react";
import { PlaylistsContext } from "./playlistsCtx";
import { getAllUserPlaylists } from "../api/playlists-api";
import { useUserContext } from "./UserContext";

export function PlaylistsProvider({children}) {
  const [
    searchHistory,
    setSearchHistory
  ] = useState([]);

  const [
    playlists,
    setPlaylists
  ] = useState([]);

  const {user} = useUserContext();

  useState(()=>{
    const fetchPlaylists = async () => {
      const res = await getAllUserPlaylists(user.id);
      if(res){
        localStorage.setItem("playlists", JSON.stringify(res));
        setPlaylists(res);
      }else {
        setPlaylists([]);
      }
    };
    let savedSearchHistory = localStorage.getItem("playlistsHistory");
    if(savedSearchHistory) setSearchHistory(JSON.parse(savedSearchHistory));
    let savedPlaylists = localStorage.getItem("playlists");
    if(savedPlaylists && savedPlaylists.length !== 0)
      setPlaylists(JSON.parse(savedPlaylists));
    else {
      fetchPlaylists();
    }
  }, []);
  
  useEffect(()=>{
    localStorage.setItem("playlistsHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(()=>{
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const addToSearchHistory = (item) => {
    if(searchHistory.includes(item)) return;

    setSearchHistory(prev => {
      const newArray = [item];
      if(prev.length === 6) {
        for(let i = 0; i < prev.length-1; ++i)
          newArray.push(prev[i]);
      } else
        newArray.push(...prev);
        
      return newArray;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const removeItem = (id) => {
    setSearchHistory(prev => prev.filter((item, i) => i !== id));
  };

  const addPlaylist = (playlist) => {
    if(playlists.some(item=>item.id === playlist.id))
      return;
    setPlaylists(prev=>[...prev, playlist]);
  };

  const removePlaylist = (id) => {
    setPlaylists(prev=>prev.filter((item,i)=>i!==id));
  };

  const value = {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    removeItem,
    playlists,
    addPlaylist,
    removePlaylist
  };

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
}