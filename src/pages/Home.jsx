import "../css/Home.css";

import { useEffect, useState } from "react";

import { useUserContext } from "../contexts/UserContext";
import { useSearchContext } from "../contexts/searchCtx";

import { IconCoins } from '@tabler/icons-react';

import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import SongsList from "../components/SongsList";

import { getAllPopularSongs } from "../api/songs-api";

export default function Home() {
  const { user } = useUserContext();
  const {
    searchHistory,
    addToSearchHistory,
    removeItem
  } = useSearchContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [popularSongs, setPopularSongs] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    const getPopularSongsContent = async () => {
      setErrors({});

      const res = await getAllPopularSongs();
      
      if(typeof res === "string") {
        setErrors({global: res});
        return;
      }
      
      console.log(res);
      setPopularSongs(res);
    };

    getPopularSongsContent();
  }, []);

  function handleSearch() {
    
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <SearchBar
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
          searchHistory={searchHistory}
          onAddToSearchHistory={addToSearchHistory}
          onRemoveFromSearchHistory={removeItem}
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
          {popularSongs?.map((s)=>
            <SongCard key={s.id} song={s} style="white"/>
          )}
        </SongsList>}
      </div>
    </div>
  );
}