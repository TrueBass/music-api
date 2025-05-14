import "../css/UploadField.css";
import React, { useState, useRef } from 'react';

import { Button } from "@mui/material";
import { mainScheme } from "../colors/schemes";
import { IconCloudUp } from '@tabler/icons-react';

export default function UploadField({setSongData}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async function retrieveMusicFileBuffer(file) {
    if (file && file.type.startsWith('audio/mpeg')){
      const musicData = {};

      const arrayBuffer = await file.arrayBuffer();
      musicData.data = arrayBufferToBase64(arrayBuffer);
      
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      musicData["duration"] = audioBuffer.duration;

      setFile(file);
      setSongData(musicData);
    }
    else if (file)
      alert('Invalid file type. Please upload an audio file.');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleFileSelect = () => {
    if (fileInputRef.current)
      fileInputRef.current.click();
  };

  const handleInputChange = async (e) => {
      const newFile = e.target.files?.[0];
      await retrieveMusicFileBuffer(newFile);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFile = e.dataTransfer.files?.[0];
    await retrieveMusicFileBuffer(newFile);
    //   const audioContext = new AudioContext();
    //   const audioBuffer = await audioContext.decodeAudioData(arrayBufferEncoded);
    //   console.log(audioBuffer);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className="upload-field"
      ref={dropAreaRef => {
          if (dropAreaRef) {
              dropAreaRef.addEventListener('drop', handleDrop);
              dropAreaRef.addEventListener('dragover', handleDragOver);
              dropAreaRef.addEventListener('dragenter', handleDragEnter);
              dropAreaRef.addEventListener('dragleave', handleDragLeave);
          }
      }}
    >
      <IconCloudUp size={32} color={mainScheme.black} />
      <p style={{color: mainScheme.black}}>
          Drag and drop a music file here, or click to select.
      </p>
      <input
          type="file"
          accept="audio/mpeg"
          onChange={handleInputChange}
          className="file-input"
          ref={fileInputRef}
          aria-label="Upload music file"
      />
      <Button onClick={handleFileSelect}>
          Choose File
      </Button>
    </div>
  );
};