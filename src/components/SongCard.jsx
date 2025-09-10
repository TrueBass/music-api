import "../css/SongCard.css";
import { usePlayingSongContext } from "../contexts/songsCtx";
import { likeSong, unlikeSong } from "../api/songs-api";
import { IconButton } from "@mui/material";
import { IconThumbUpFilled, IconPlayerPlayFilled, IconTrash  } from '@tabler/icons-react';
import { useUserContext } from "../contexts/UserContext";

export default function SongCard({song, onClick, onDelete, style="dark", updateSongList=null, likable=false}) {
  const {
    playSong
  } = usePlayingSongContext();

  const {user} = useUserContext();

  async function onLikeSong() {
    if(user.username == song.uploader) return;
    // console.log(user.id, song.id);
    song.likedByUser?
    await unlikeSong(user.id, song.id):
    await likeSong(user.id, song.id);

    updateSongList&&updateSongList(song.id);
  }

  return (
    <li key={song.id} className="song-card-container" style={style == "white"?{backgroundColor: 'white'}:{}} onClick={onClick}>
      <IconButton onClick={async()=>await playSong(song.id)}>
        <IconPlayerPlayFilled stroke={2} size={40} style={{marginRight: "10px", color: style == "white"?"black": "white"}}/>
      </IconButton>
      <div className="song-card-rows-container">
        <div className="song-card-row">
          <h3 style={style == "white"?{color: 'black'}:{}}>{`${song.title} - ${song.author}`}</h3>
        </div>
        {likable&&<div className="song-card-row" style={style == "white"?{color: 'black'}:{}}>
          <h4>{song.uploader}</h4>
        </div>}
      </div>
      <h2 style={{color: style == "white"?"black": "white"}}>{song.likes}</h2>
      <IconButton disabled={!likable} onClick={onLikeSong}>
        <IconThumbUpFilled stroke={2} size={32} style={{color: style == "white"?"black": "white"}}/>
      </IconButton>
      {onDelete&&
      <IconButton color="error">
        <IconTrash onClick={onDelete}/>
      </IconButton>}
    </li>
  );
}