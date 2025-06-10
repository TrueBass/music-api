import "../css/AddSongModal.css";
import { useState } from "react";
import { TextField, Button, FormControl, Select, InputLabel, MenuItem, NativeSelect } from "@mui/material";
import genres from "../enums/genres";

export default function AddSongModal({songData, setSongData, onAdd, onClose}){

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [songGenre, setSongGenre] = useState("OTHER");

  async function handleAddSong() {
    const clearTitle = title.trim();
    const clearAuthor = author.trim();
    const newErrors = {};
    if (!clearTitle && clearTitle.length < 1) {
      newErrors.title = "Title must contain at least 1 character";
    }
    if(!clearAuthor && clearAuthor.length < 1) {
      newErrors.author = "Author must contain at least 1 character";
    }
    
    setErrors(newErrors);
    if(Object.keys(newErrors).length > 0)
      return;

    await onAdd({...songData, author: clearAuthor, title: clearTitle, genre: songGenre});
    onClose&&onClose();
  }

  function handleCancel() {
    setSongData({});
  }
  
  function handleGenreSelect(e) {
    setSongGenre(e.target.value);
  }

  return (
    <div className="add-song-modal-container">
      <div className="add-song-modal-text-fields">
        <TextField sx={{marginBottom: "10px"}} label="Title" variant="outlined" fullWidth
          error={errors.title} helperText={errors.title}
          value={title} onChange={e => setTitle(e.target.value)}
        />
        <TextField label="Author" variant="outlined" fullWidth
          error={errors.author} helperText={errors.author}
          value={author} onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <FormControl size="small" sx={{ width: 200 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          label="Genre"
          defaultValue="OTHER"
          MenuProps={{
            PaperProps: {
                style: {
                    maxHeight: 200,
                    overflowY: 'auto',
                    width: 200,
                },
            },
        }}
          value={songGenre}
          onChange={handleGenreSelect}
        >
          {Object.values(genres).map((g, i)=>
            <MenuItem key={i} value={g}>{g}</MenuItem>
          )}
        </Select>
      </FormControl>
      <div className="add-song-modal-btns">
        <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleAddSong}>Add</Button>
      </div>
    </div>
  );
}