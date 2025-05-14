import React, { useState, useRef, useEffect } from 'react';
import { getSongBytes } from '../api/songs-api';

export default function SongPlayer({songId, onPlayCick}) {
  const audioRef = useRef(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFetchAndPlaySong = async () => {
    
  };

  useEffect(()=>{
    handleFetchAndPlaySong();
  }, []);

  // Optional: Clean up the Object URL when the component unmounts or the URL changes
  // This is important to prevent memory leaks.
  useEffect(() => {
    const currentAudioSrc = audioRef.current ? audioRef.current.src : null;
    return () => {
      if (currentAudioSrc && currentAudioSrc.startsWith('blob:')) {
        URL.revokeObjectURL(currentAudioSrc);
      }
    };
  }, [audioRef.current?.src]); // Re-run when audio source changes

  return (
    <audio ref={audioRef} controls onEnded={() => setIsPlaying(false)}>
      Your browser does not support the audio element.
    </audio>
  );
}