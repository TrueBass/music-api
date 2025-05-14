import { useEffect, useState } from "react";
import { SearchContext } from "./searchCtx";

export function SearchProvider({children, historyName}) {
  const [
    searchHistory,
    setSearchHistory
  ] = useState([]);

  useState(()=>{
    let savedSearchHistory = localStorage.getItem("searchHistory");
    if(savedSearchHistory) setSearchHistory(JSON.parse(savedSearchHistory));
  }, []);
  
  useEffect(()=>{
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToSearchHistory = (item) => {
    if(searchHistory.includes(item)) return;

    setSearchHistory(prev => {
      const newArray = [item];
      if(prev.length === 6) {
        for(let i = 0; i < prev.length-1; ++i)
          newArray.push(prev[i]);
      } else
        newArray.push(...prev);
        
      return newArray;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const removeItem = (id) => {
    setSearchHistory(prev => prev.filter((item, i) => i !== id));
  };

  const value = {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    removeItem
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}