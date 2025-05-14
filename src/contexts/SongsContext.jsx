import "../css/PlayingSongProvider.css"
import { useEffect, useRef, useState } from "react";
import { PlayingSongContext } from "./songsCtx";

import { getSongBytes } from "../api/songs-api";

export function PlayingSongProvider({children}) {
  const audioRef = useRef(null);
  const [ song, setSong ] = useState([]);
  const [songId, setSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useState(()=>{
    const currentAudioSrc = audioRef.current ? audioRef.current.src : null;
    return () => {
      if (currentAudioSrc && currentAudioSrc.startsWith('blob:')) {
        URL.revokeObjectURL(currentAudioSrc);
      }
    };
  }, [audioRef.current?.src]);
  
  // useEffect(()=>{
    
  // }, [song]);

  const playSong = async (songId) => {
    setIsPlaying(false);
    try {
      console.log("invoked");
      const arrayBuffer = await getSongBytes(songId);
      console.log("got bytes");

      const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      console.log("created audio blob");
      
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log("added audio url");
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error("Error playing audio:", err);
            setIsPlaying(false);
          });
      }
    } catch (e) {
      console.error('Failed to fetch or play song:', e);
      setIsPlaying(false);
    }
  };

  const pauseSong = async () => {
    setIsPlaying(false);
  };

  const value = {
    song,
    setSong,
    playSong,
    pauseSong
  };

  return (
    <PlayingSongContext.Provider value={value}>
          {children}
          <audio ref={audioRef} controls onEnded={() => setIsPlaying(false)} >
          </audio>
    </PlayingSongContext.Provider>
  );
}