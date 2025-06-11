import "../css/Playlists.css";
import { mainScheme } from "../colors/schemes";

import { useState, useEffect } from "react";
import { IconCirclePlus } from '@tabler/icons-react';
import { TextField, Switch, Button } from "@mui/material";

import { createPlaylist } from "../api/user-api";

import { useUserContext } from "../contexts/UserContext";
import { usePlaylistsContext } from "../contexts/playlistsCtx";

import List from "../components/List";
import SearchBar from "../components/SearchBar";
import PopUpMessage from "../components/PopUpMessage";
import SongsModal from "../components/SongsModal";
import PlaylistCard from "../components/PlaylistCard";
import { getAllSongsInfoFromPlaylist } from "../api/songs-api";

const switchStyle = {
  '& .MuiSwitch-thumb': {
    color: mainScheme.blue
  },
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
    color: mainScheme.blue
  }
}

export default function Playlists() {

  const { user } = useUserContext();
  const {
    searchHistory,
    addToSearchHistory,
    removeItem,
    playlists,
    addPlaylist
  } = usePlaylistsContext();

  const [songs, setSongs] = useState([]);
  const [playlist, setPlayList] = useState({});
  const [songsModalIsOpen,setSongsModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [responseIsLoading, setResponseIsLoading] = useState(false);
  const [createPlaylistErrors, setCreatePlaylistErrors] = useState("");
  const [accessSwitchToggled, setAccessSwitchToggled] = useState(false);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);

  async function handleCreatePlaylist() {
    setCreatePlaylistErrors("");
    const clearedPlaylistTitle = playlistTitle.trim();
    if(!clearedPlaylistTitle) {
      setCreatePlaylistErrors("Title must contain at least 1 non blank character.");
      return;
    }
    
    setResponseIsLoading(true);
    
    const createPlaylistBody = {
      userId: user.id,
      title: clearedPlaylistTitle,
      isPrivate: accessSwitchToggled
    };
    
    const res = await createPlaylist(createPlaylistBody);
    if(res) addPlaylist(res);
      
    setResponseIsLoading(false);
    setCreateModalIsOpen(false);
    setIsSuccessMsgVisible(true);
  }

  useEffect(()=>{
    const getAllSongs = async (playlistId) => {
      if(!playlistId) return;
      const songsFromPlaylist = await getAllSongsInfoFromPlaylist(playlist.id);
      setSongs(songsFromPlaylist);
    }

    getAllSongs(playlist.id);
  }, [playlist]);

  async function onPlaylistClick(playlist) {
    setPlayList(playlist);
    setSongsModalIsOpen(true);
  }

  async function onPlayCick() {
    setCurrPlayingSongId()
  }

  return (
    <div className="playlists-container">
      <div className="playlists-header">
        <SearchBar 
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
          searchHistory={searchHistory}
          onAddToSearchHistory={addToSearchHistory}
          onRemoveFromSearchHistory={removeItem}
        />
        <button className="button-17" role="button" onClick={()=>{setCreateModalIsOpen(true);}}>
          Create
          <IconCirclePlus stroke={2}/>
        </button>
        <div className="create-playlist-modal" style={{display: createModalIsOpen? "flex": "none"}}>
          <TextField label="Playlist title" variant="outlined" fullWidth
            error={createPlaylistErrors} helperText={createPlaylistErrors}
            value={playlistTitle} onChange={e=>setPlaylistTitle(e.target.value)}
          />
          <div className="creatre-playlist-private-switch">
            <Switch sx={switchStyle} onClick={()=>setAccessSwitchToggled(prev=>!prev)}/>
            <h4>{accessSwitchToggled? "Private": "Public"}</h4>
          </div>
          <div className="creatre-playlist-confirm-cancel-btns">
            <Button variant="contained" sx={{bgcolor: mainScheme.blue}}
              loading={responseIsLoading} loadingPosition="end"
              onClick={handleCreatePlaylist}
            >
              confirm
            </Button>
            <Button variant="contained" color="error"
              onClick={()=>setCreateModalIsOpen(false)}
            >cancel
            </Button>
          </div>
        </div>
      </div>
      {!playlists.length?
      <div className="playlists-empty">
        <h2>There are no playlists yet. Create one!</h2>
      </div>:
      <div className="playlists-music-container">
        <List list={playlists} onItemClick={onPlaylistClick}>
          {playlists.map((p)=><PlaylistCard key={p.id} item={p} onClick={()=>onPlaylistClick(p)}/>)}
        </List>
        {<SongsModal visible={songsModalIsOpen} playlist={playlist} songs={songs} setSongs={setSongs} onClose={()=>setSongsModalIsOpen(false)}/>}
      </div>}
      <PopUpMessage message="Playlist has been created successfully!"
        isVisible={isSuccessMsgVisible} onClose={()=>setIsSuccessMsgVisible(false)}/>
    </div>
  );
}