import "../css/SearchHistoryCard.css";
import { IconX } from "@tabler/icons-react";

export default function SearchHistoryCard({index, item, onRemove=null, onClick}) {

  function handleDelete() {
    onRemove(index);
  }

  return (
    <div className="search-history-card-container">
      <p onClick={onClick}>{item}</p>
      {onRemove&&<IconX className="search-card-remove-icon" stroke={1} onClick={handleDelete}/>}
    </div>
  );
}