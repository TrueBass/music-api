import "../css/SongsModal.css";
import { useEffect, useState } from "react";
import { IconPlus } from '@tabler/icons-react';

import SongCard from "./SongCard";
import SongsList from "./SongsList";
import UploadField from "./UploadField";
import AddSongModal from "./AddSongModal";

import { addSongToPlaylist } from "../api/songs-api";


export default function SongsModal({visible, playlist, songs, setSongs, onClose}) {
  // const {
  //   songs,
  //   addSong,
  //   deleteSong,
  //   setCurrPlaylist
  // } = useSongsContext();

  const [newSongData, setNewSongData] = useState({});
  const [addSongModalIsOpen, setAddSongModalIsOpen] = useState();

  async function handleAddSong(songData) {
    songData.playlistId = playlist.id;
    setNewSongData(songData);
    
    const res = await addSongToPlaylist(songData);
    setSongs(prev => [...prev, res]);
    onClose&&onClose();
  }

  return (
    <div className="playlist-songs-container" style={{display: visible?"flex":"none"}}>
      <div className="playlist-songs-modal-header">
        <h2>{playlist.title}</h2>
        <IconPlus stroke={2} />
      </div>
      <div className="playlist-songs-modal-list">
        {(!songs?.length)?
        Object.keys(newSongData).length == 0?
          <div className="playlists-songs-empty">
            <h3>There are no songs</h3>
            <UploadField setSongData={setNewSongData}/>
          </div>:
        <div className="playlists-songs-empty">
          <AddSongModal songData={newSongData} setSongData={setNewSongData} onAdd={handleAddSong}/>
        </div>:
        <SongsList>
          {songs.map((s)=>
            <SongCard key={s.id} song={s}/>
          )}
        </SongsList>}
      </div>
    </div>
  );
}