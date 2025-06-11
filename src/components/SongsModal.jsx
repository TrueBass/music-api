import "../css/SongsModal.css";
import { useState } from "react";
import { IconPlus,
  IconLockOpen2,
  IconDotsVertical,
  IconTrash,
  IconLock
} from '@tabler/icons-react';

import SongCard from "./SongCard";
import SongsList from "./SongsList";
import UploadField from "./UploadField";
import AddSongModal from "./AddSongModal";

import { IconButton, Menu, MenuItem } from "@mui/material";

import { addSongToPlaylist } from "../api/songs-api";
import { updateSocialCredit } from "../api/user-api";
import { changePlaylistVisibility, deletePlaylist } from "../api/playlists-api";
import { useUserContext } from "../contexts/UserContext";
import { usePlaylistsContext } from "../contexts/playlistsCtx";

const ITEM_HEIGHT = 48;

export default function SongsModal({visible, playlist, songs, setSongs, onClose}) {
  const { user, saveUser } = useUserContext();
  const {setPlaylistIsPrivate, removePlaylist} = usePlaylistsContext();

  const [newSongData, setNewSongData] = useState({});
  const [addSongModalIsOpen, setAddSongModalIsOpen] = useState(false);

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const open = Boolean(moreMenuAnchorEl);
  
  const handleMoreClick = event => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreMenuAnchorEl(null);
  };

  async function handleAddSong(songData) {
    songData.playlistId = playlist.id;
    setNewSongData(songData);
    
    const res = await addSongToPlaylist(songData);

    const updateSocialCreditRes = await updateSocialCredit({
      userId: user.id, changedSocialCredit: 5
    });

    user.socialCredit = updateSocialCreditRes;
    saveUser(user);

    setSongs(prev => [...prev, res]);
    setAddSongModalIsOpen(false);
  }

  const handleDeletePlaylist = async () => {
    handleMoreClose();
    const res = await deletePlaylist(playlist.id);
    if(typeof res != "undefined"){
      console.log(res);
      return;
    }
    onClose&&onClose();
    removePlaylist(playlist.id);
  };

  const handleToggleVisibility = async () => {
    const res = await changePlaylistVisibility(playlist.id, playlist.isPrivate);
    if (res === null) {
      console.log("!Toggle privacy went wrong!");
      return;
    }
    setPlaylistIsPrivate(playlist.id, !playlist.isPrivate);
    handleMoreClose();
  };

  const handleDeleteSong = (playlistId, songId) => {
    // TODO: inplement api call and ui updating
  };

  return (
    <div className="playlist-songs-container" style={{display: visible?"flex":"none"}}>
      <div className="playlist-songs-modal-header">
        <h2>{playlist.title}</h2>
        <div>
          <IconButton onClick={()=>setAddSongModalIsOpen(true)}>
            <IconPlus stroke={2}/>
          </IconButton>
          <IconButton onClick={handleMoreClick}>
            <IconDotsVertical stroke={2}/>
          </IconButton>
        </div>
        <Menu
          anchorEl={moreMenuAnchorEl}
          open={open}
          onClose={handleMoreClose}
          slotProps={{
          paper: {
            style: {
              // maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch'
            },
          }}}>
          <MenuItem onClick={handleDeletePlaylist}>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
              <IconTrash stroke={2} />
              <p style={{ textAlign: "left", marginLeft: "10px"}}>Delete</p>
            </div>
          </MenuItem>
          <MenuItem onClick={handleToggleVisibility}>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
              {playlist.isPrivate?
                <IconLockOpen2 stroke={2} />:
                <IconLock stroke={2} />}
              <p>Make {playlist.isPrivate? "public": "private"}</p>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div className="playlist-songs-modal-list" style={{display: addSongModalIsOpen? "none": "flex"}}>
        {!songs?.length?
          <div className="playlists-songs-empty">
            <h3>There are no songs. Try to add one.</h3>
          </div>:
          <SongsList>
          {songs?.map((s)=>
            <SongCard key={s.id} song={s} onDelete={()=>handleDeleteSong(playlist.id, s.id)}/>
          )}
        </SongsList>}
      </div>
      <div className="playlists-songs-empty" style={{display: addSongModalIsOpen? "flex": "none"}}>
        {Object.keys(newSongData).length == 0?
          <div className="playlists-songs-empty">
            <UploadField setSongData={setNewSongData} onCancel={()=>setAddSongModalIsOpen(false)}/>
          </div>:
        <div className="playlists-songs-empty">
          <AddSongModal songData={newSongData} setSongData={setNewSongData} onAdd={handleAddSong}/>
        </div>}
      </div>
    </div>
  );
}