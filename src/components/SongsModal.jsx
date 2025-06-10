import "../css/SongsModal.css";
import { useEffect, useState } from "react";
import { IconPlus } from '@tabler/icons-react';

import SongCard from "./SongCard";
import SongsList from "./SongsList";
import UploadField from "./UploadField";
import AddSongModal from "./AddSongModal";

import { addSongToPlaylist } from "../api/songs-api";
import { useUserContext } from "../contexts/UserContext";
import { updateSocialCredit } from "../api/user-api";


export default function SongsModal({visible, playlist, songs, setSongs, onClose}) {
  const { user, saveUser } = useUserContext();

  const [newSongData, setNewSongData] = useState({});
  const [addSongModalIsOpen, setAddSongModalIsOpen] = useState(false);

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
    onClose&&onClose();
    setAddSongModalIsOpen(false);
  }

  return (
    <div className="playlist-songs-container" style={{display: visible?"flex":"none"}}>
      <div className="playlist-songs-modal-header">
        <h2>{playlist.title}</h2>
        <IconPlus stroke={2} onClick={()=>setAddSongModalIsOpen(true)}/>
      </div>
      <div className="playlist-songs-modal-list" style={{display: addSongModalIsOpen? "none": "flex"}}>
        {!songs?.length?
          <div className="playlists-songs-empty">
            <h3>There are no songs. Try to add one.</h3>
          </div>:
          <SongsList>
          {songs?.map((s)=>
            <SongCard key={s.id} song={s}/>
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