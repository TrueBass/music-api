import "../css/TopSongsList.css";
import { IconHeart } from "@tabler/icons-react";

const TopSongsList = ({ topSongs }) => {
  return (
    <div className="top-liked-container">
      <h2 className="top-liked-title">
        Top 5 Most Liked Songs
      </h2>
      <div className="top-liked-list">
        {topSongs.map((song, index) => (
          <div key={index} className="top-liked-item">
            <div className="song-info">
              <span className="song-rank">#{index + 1}</span>
              <div className="song-text">
                <p className="song-title">{song.title}</p>
                <p className="song-artist">by {song.author}</p>
              </div>
            </div>
            <div className="song-likes">
              <IconHeart className="like-icon" />
              <span className="like-count">{song.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSongsList;