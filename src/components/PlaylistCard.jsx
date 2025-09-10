import "../css/PlaylistCard.css";
import { mainScheme } from "../colors/schemes";
import { IconLock } from '@tabler/icons-react';

export default function PlaylistCard({item, onClick=()=>{}}) {
  return (
    <li key={item?.id} className="playlist-card-container" onClick={onClick}>
      <div className="playlist-card-row" >
        <h3>{item?.title}</h3>
        {item?.isPrivate&&<IconLock stroke={2} color={mainScheme.black}/>}
      </div>
      {item?.modifiedAt&&
      <div className="playlist-card-row">
        <p>Modified</p>
        {item?.modifiedAt}
      </div>}
    </li>
  );
}
