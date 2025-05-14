import "../css/List.css";

export default function List({children}) {
  return (
    <ul className="playlist-cards-list-container">
      {children}
    </ul>
  );
}
