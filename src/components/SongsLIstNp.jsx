import "../css/SongsList.css";

export default function SongsListNp({children}) {
  return (
    <ul className="songs-cards-list-container">
      {children}
    </ul>
  );
}