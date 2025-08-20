import "../css/Home.css";

import { useEffect, useState } from "react";

import { useUserContext } from "../contexts/UserContext";
import { useSearchContext } from "../contexts/searchCtx";

import { IconCoins } from '@tabler/icons-react';

import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import SongsList from "../components/SongsList";


import {
  getAllPopularSongs,
  searchSongsByQuery,
  searchSimilarSongsByQuery
} from "../api/songs-api";

export default function Home() {
  const { user } = useUserContext();
  const {
    searchHistory,
    addToSearchHistory,
    removeItem
  } = useSearchContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [popularSongs, setPopularSongs] = useState([]);
  const [searchResultSongs, setSearchResultSongs] = useState();
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search something...");
  const [errors, setErrors] = useState({});
  const [searchFlag, setSearchFlag] = useState(false);

  useEffect(()=>{
    const getPopularSongsContent = async () => {
      setErrors({});

      const res = await getAllPopularSongs(user.id);
      
      if(typeof res === "string") {
        setErrors({global: res});
        return;
      }
  
      setPopularSongs(res);
    };

    getPopularSongsContent();
  }, []);

  function onSearchQueryChange(e) {
    const trimmedText = e.target.value;
    setSearchQuery(trimmedText);

    // if(trimmedText.length < 2) return;
  }

  async function handleSearch(query) {
    setSearchFlag(true);
    const res = await searchSimilarSongsByQuery(query, user.id);
    console.log(res);
    setSearchResultSongs(res);
  }

  async function onHistoryItemClick(query) {
    setSearchFlag(true);
    setSearchQuery(query);
    const res = await searchSimilarSongsByQuery(query, user.id);
    console.log(res);
    setSearchResultSongs(res);
  }

  function handleCancelSearch() {
    setSearchQuery("");
    setSearchFlag(false);
  }

  function updateSongList(songId) {
    setPopularSongs(prev=>prev.map(song =>
      song.id == songId?
      {...song, likes: song.likedByUser? song.likes-1: song.likes+1, likedByUser: !song.likedByUser}:
      song
    ));
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <SearchBar
          value={searchQuery}
          onChange={onSearchQueryChange}
          searchHistory={searchHistory}
          onDebounceSearch={searchSongsByQuery}
          onHistoryItemClick={onHistoryItemClick}
          onAddToSearchHistory={addToSearchHistory}
          onRemoveFromSearchHistory={removeItem}
          searchFlag={searchFlag}
          onSearch={handleSearch}
          onCancelSearch={handleCancelSearch}
        />
        <div className="social-credtis-container">
          <IconCoins stroke={2} size={30} />
          <p style={{fontWeight: 600}}>{user?.socialCredit}</p>
        </div>
      </div>
      <div className="home-main-content">
        {Object.keys(errors).length > 0?
        <h2 style={{color: "white"}}>Something went wrong. We couldn't fetch popular songs.</h2>:
        <SongsList>
          {searchFlag?
            searchResultSongs?.length?
              searchResultSongs.map((s)=>
                <SongCard key={s.id} song={s} style="white" updateSongList={updateSongList} likable={true}/>
              ):
              <div style={{width: "100%", textAlign: "end"}}><h2>We couldn't find anything...</h2></div>:
          popularSongs?.map((s)=>
            <SongCard key={s.id} song={s} style="white" updateSongList={updateSongList} likable={true}/>
          )}
        </SongsList>}
      </div>
    </div>
  );
}