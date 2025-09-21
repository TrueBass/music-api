const SONGS_API_URL = `${import.meta.env.VITE_MUSIC_API_URL}/music-api/songs`;
const LIKES_API_URL = `${import.meta.env.VITE_MUSIC_API_URL}/music-api/likes`;

import { refreshAccessToken } from "./user-api";

export const addSongToPlaylist = async (body) => {
  let bearerToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${SONGS_API_URL}/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify(body)
    });

    if(!response.ok){
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const deleteSong = async (songId) => {
  let bearerToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${SONGS_API_URL}/delete/${songId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });
    if(!response.ok) {
      const deserializedRes = await response.text();
      return deserializedRes;
    }
  } catch(error) {
    console.log("Internal fetch error!\n");
    return null;
  }
};

export const getAllSongsInfoFromPlaylist = async (playlistId) => {
  try {
    const response = await fetch(`${SONGS_API_URL}/info/all/${playlistId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(!response.ok){
      console.log(response);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getSongData = async (songId) => {
  try {
    const response = await fetch(`${SONGS_API_URL}/bytes/${songId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(!response.ok){
      console.log(response);
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getSongBytes = async (songId) => {
  try {
    const response = await fetch(`${SONGS_API_URL}/bytes/${songId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getAllPopularSongs = async (userId) => {
  try {
    const response = await fetch(`${SONGS_API_URL}/popular/all?userId=${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const deserializedRes = await response.json();

    if(!response.ok){
      return deserializedRes.message;
    }

    return deserializedRes;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTop5ForUser = async (userId) => {
  let bearerToken = localStorage.getItem("accessToken");
  try {
    let response = await fetch(`${SONGS_API_URL}/top5?userId=${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    // if(response.status == 401){
    //   await refreshAccessToken();
    //   bearerToken = localStorage.getItem("accessToken");
    //   response = await fetch(`${SONGS_API_URL}/top10?userId=${userId}`, {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       "Authorization": `Bearer ${bearerToken}`
    //     }
    //   });
    // }
    const deserializedRes = await response.json();

    if(!response.ok){
      console.log("if error!", deserializedRes);
      return null;
    }

    return deserializedRes;
  } catch (error){
    console.log("catch error", error.message);
    return null;
  }
};

export const likeSong = async (userId, songId) => {
  let bearerToken = localStorage.getItem("accessToken");
   try {
    const response = await fetch(`${LIKES_API_URL}/like`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify({userId, songId})
    });
    const deserRes = await response.text();
    console.log(deserRes);
    if (!response.ok) {
      console.error("Like request failed", response.status, response.statusText);
      return null;
    }
   } catch (error) {
    console.log(error.message);
   }
};

export const unlikeSong = async (userId, songId) => {
  let bearerToken = localStorage.getItem("accessToken");
   try {
    const response = await fetch(`${LIKES_API_URL}/unlike`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify({userId, songId})
    });
   } catch (error) {
    console.log(error.message);
    return null;
   }
};

export const getSongLikes = async (songId) => {
  let bearerToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${LIKES_API_URL}/count?songId=${songId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    if(!response.ok) {
      console.log(response);
      return null;
    }
  } catch(error) {
    console.log(error.message);
    return null;
  }
};

export const searchSongsByQuery = async (query) => {
  let bearerToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SONGS_API_URL}/search?query=${query}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    const deserializedRes = await response.json();
    return deserializedRes;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const searchSimilarSongsByQuery = async (query, userId) => {
  let bearerToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SONGS_API_URL}?query=${query}&userId=${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    const deserializedRes = await response.json();
    return deserializedRes;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};