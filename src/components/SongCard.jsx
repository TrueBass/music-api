import "../css/SongCard.css";

import { IconThumbUpFilled, IconPlayerPlayFilled  } from '@tabler/icons-react';

export default function SongCard({song, onClick}) {
  return (
    <li key={song.id} className="song-card-container" onClick={onClick}>
      <IconPlayerPlayFilled stroke={2} size={40} style={{marginRight: "10px"}} />
      <div className="song-card-rows-container">
        <div className="song-card-row">
          <h3>{`${song.title} - ${song.author}`}</h3>
        </div>
        <div className="song-card-row">
          Added at: {song.addedAt}
          <div style={{display: "flex", alignItems: "center"}}>
            <h3>{song.likes}</h3> <IconThumbUpFilled stroke={2}/>
          </div>
        </div>
      </div>
    </li>
  );
}