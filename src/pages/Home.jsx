import "../css/Home.css";

import { useState } from "react";

import { useUserContext } from "../contexts/UserContext";
import { useSearchContext } from "../contexts/searchCtx";

import SearchBar from "../components/SearchBar";
import { IconCoins } from '@tabler/icons-react';


export default function Home() {
  const { user } = useUserContext();
  const {
    searchHistory,
    addToSearchHistory,
    removeItem
  } = useSearchContext();

  const [searchQuery, setSearchQuery] = useState("");

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
    </div>
  );
}