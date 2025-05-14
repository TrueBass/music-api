import "../css/SearchBar.css";
import { mainScheme } from "../colors/schemes";

import { useState } from "react";
import { ClickAwayListener } from "@mui/material";

import { IconZoomCode } from '@tabler/icons-react';
import SearchHistoryCard from "./SearchHistoryCard";


export default function SearchBar({value, onChange, searchHistory, onAddToSearchHistory, onRemoveFromSearchHistory}) {
  const [
    historyModalIsOpen,
    setHistoryModalIsOpen
  ] = useState(false);

  function handleSearch() {
    const clearedSearchQuery = value.trim();
    if(!clearedSearchQuery) return;
    onAddToSearchHistory(clearedSearchQuery);
  }

  return (
    <ClickAwayListener onClickAway={()=>{setHistoryModalIsOpen(false);}}>
      <div className="searchbar-container" style={{borderRadius: historyModalIsOpen&&searchHistory.length? "22px 22px 0 0": "50px"}}>
        
          <input className="searchbar-input"
            type="text" placeholder="Search something..."
            value={value} onChange={onChange}
            onClick={()=>setHistoryModalIsOpen(true)}
          />
        
        <button className="searchbar-btn" onClick={handleSearch}>
          <IconZoomCode stroke={2} size={28} color={mainScheme.white} />
        </button>
        {<div className="searchbar-history-modal" style={{display: historyModalIsOpen? "block": "none"}}>
          {searchHistory.map((item, i) =>
            <SearchHistoryCard key={i} index={i} item={item} onRemove={onRemoveFromSearchHistory}/>
          )}
        </div>}
      </div>
    </ClickAwayListener>
  );
}