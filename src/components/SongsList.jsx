import { useState, useRef, useEffect } from "react";
import "../css/SongsList.css";
import SongCard from "./SongCard";

export default function SongsList({userId}) {

  const [songs, setSongs] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const limit = 10;

  function updateSongList(songId) {
    setSongs(prev=>prev.map(song =>
      song.id == songId?
      {...song, likes: song.likedByUser? song.likes-1: song.likes+1, likedByUser: !song.likedByUser}:
      song
    ));
  }

  const fetchSongs = async () => {
    if (isLoading || !hasMore) return; // Prevent multiple requests at once or if no more data

    setIsLoading(true);
    const SONGS_API_URL = `${import.meta.env.VITE_MUSIC_API_URL}/music-api/songs`;

    let url = `${SONGS_API_URL}/popular/all?userId=${userId}&limit=${limit}`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    let bearerToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch songs.');
      }
      const newSongs = await response.json();

      setSongs(prevSongs => [...prevSongs, ...newSongs]);

      if (newSongs.length < limit)
        setHasMore(false);
      else
        setCursor(newSongs[newSongs.length - 1].id);
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (songs.length === 0 && !isLoading){
      fetchSongs();
    }
  }, [songs.length, isLoading]);  
  
  useEffect(() => {
    console.log(songs);
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

      if (isAtBottom && hasMore && !isLoading) {
        fetchSongs();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchSongs, hasMore, isLoading]);

  return (
    <ul ref={containerRef} className="songs-cards-list-container">
      {songs.map(song => (
        <SongCard key={song.id} song={song} style="white" updateSongList={updateSongList} likable={true}/>
      ))}
      {isLoading && <p>Loading more songs...</p>}
      {!hasMore && <p>You have reached the end of the list.</p>}
    </ul>
  );
}