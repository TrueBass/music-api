import "../css/SearchHistoryCard.css";
import { IconX } from "@tabler/icons-react";

export default function SearchHistoryCard({index, item, onRemove}) {

  function handleDelete() {
    onRemove(index);
  }

  return (
    <div className="search-history-card-container">
      {item}
      <IconX stroke={1} onClick={handleDelete}/>
    </div>
  );
}