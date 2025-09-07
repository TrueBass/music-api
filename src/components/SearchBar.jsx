import "../css/SearchBar.css";
import { mainScheme } from "../colors/schemes";

import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { ClickAwayListener } from "@mui/material";

import { IconZoomCode } from '@tabler/icons-react';
import SearchHistoryCard from "./SearchHistoryCard";


export default function SearchBar({value, onChange, searchHistory, onSearch, onDebounceSearch, onHistoryItemClick, onAddToSearchHistory, onRemoveFromSearchHistory, onCancelSearch, searchFlag}) {
  const [
    historyModalIsOpen,
    setHistoryModalIsOpen
  ] = useState(false);

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedQueryRes, setDebouncedQueryRes] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(value.trim());
    }, 500);

    return () => {
      clearTimeout(handler); // cancel timeout if user keeps typing
    };
  }, [value]);

   useEffect(() => {
    if (debouncedQuery.length < 2) return;
    if (searchFlag) return;
    const fetchSongs = async () => {
      const res = await onDebounceSearch(debouncedQuery);
      if(res!==null)
        setDebouncedQueryRes(res);
      console.log(res);
    };

    fetchSongs();
  }, [debouncedQuery]);

  async function handleSearch() {
    const clearedSearchQuery = value.trim();
    if(!clearedSearchQuery) return;
    onAddToSearchHistory(clearedSearchQuery);
    setHistoryModalIsOpen(false);
    await onSearch(debouncedQuery);
  }

  return (
    <ClickAwayListener onClickAway={()=>{setHistoryModalIsOpen(false);}}>
      <div className="searchbar-container" style={{borderRadius: (debouncedQueryRes.length && historyModalIsOpen)||(historyModalIsOpen&&searchHistory.length)? "22px 22px 0 0": "50px"}}>
        
          <input className="searchbar-input"
            type="text" placeholder="Search something..."
            value={value} onChange={onChange}
            onClick={()=>setHistoryModalIsOpen(true)}
          />
        
        
        {value.length&&
          <IconX stroke={1} color="black" onClick={onCancelSearch}/>
        }
        <button className="searchbar-btn" onClick={handleSearch}>
          <IconZoomCode stroke={2} size={28} color={mainScheme.white}/>
        </button>
        {<div className="searchbar-history-modal" style={{display: historyModalIsOpen? "block": "none"}}>
          {debouncedQuery.length > 1?
          debouncedQueryRes.map((item, i) =>
            <SearchHistoryCard key={i} index={i} item={item}
            onClick={async()=>await onHistoryItemClick(item)}/>
          ):
          searchHistory.map((item, i) =>
            <SearchHistoryCard key={i} index={i} item={item} onRemove={onRemoveFromSearchHistory}
            onClick={async()=> {setHistoryModalIsOpen(false); await onHistoryItemClick(item);}}/>
          )}
        </div>}
      </div>
    </ClickAwayListener>
  );
}