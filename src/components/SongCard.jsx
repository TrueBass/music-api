import "../css/SongCard.css";
import { usePlayingSongContext } from "../contexts/songsCtx";
import { IconButton } from "@mui/material";
import { IconThumbUpFilled, IconPlayerPlayFilled, IconTrash  } from '@tabler/icons-react';

export default function SongCard({song, onClick, onDelete, style="dark"}) {
  const {
    playSong
  } = usePlayingSongContext();

  return (
    <li key={song.id} className="song-card-container" style={style == "white"?{backgroundColor: 'white'}:{}} onClick={onClick}>
      <IconButton onClick={async()=>await playSong(song.id)}>
        <IconPlayerPlayFilled stroke={2} size={40} style={{marginRight: "10px", color: style == "white"?"black": "white"}}/>
      </IconButton>
      <div className="song-card-rows-container">
        <div className="song-card-row">
          <h3 style={style == "white"?{color: 'black'}:{}}>{`${song.title} - ${song.author}`}</h3>
        </div>
        <div className="song-card-row">
          Added at: {song.addedAt}
        </div>
      </div>
      <h2 style={{color: style == "white"?"black": "white"}}>{song.likes}</h2>
      <IconThumbUpFilled stroke={2} size={32} style={{color: style == "white"?"black": "white"}}/>
      {onDelete&&
      <IconButton color="error">
        <IconTrash onClick={onDelete}/>
      </IconButton>}
    </li>
  );
}