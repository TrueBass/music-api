import "../css/SongsList.css";

export default function SongsList({children}) {
  return (
    <ul className="songs-cards-list-container">
      {children}
    </ul>
  );
}