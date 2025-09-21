import { refreshAccessToken } from "./user-api";

const PLAYLISTS_API_URL = `${import.meta.env.VITE_MUSIC_API_URL}/music-api/playlist`;
const STATS_API_URL = `${import.meta.env.VITE_MUSIC_API_URL}/music-api/stats`;

export const getAllUserPlaylists = async (userId) => {
  try {
    const response = await fetch(`${PLAYLISTS_API_URL}/get-all?userId=${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(!response.ok) return [];

    return await response.json();
  } catch (error) {
    return [];
  }
};

export const changePlaylistVisibility = async (playlistId, playlistVisibility) => {
  try {
    const bearerToken = localStorage.getItem("accessToken");

    const response = await fetch(`${PLAYLISTS_API_URL}/change-visibility?playlistId=${playlistId}&visibility=${!playlistVisibility}`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    

    if(!response.ok){
      const deserializedRes = await response.json();
      console.log(deserializedRes.message);
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const deletePlaylist = async (playlistId) => {
  const bearerToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${PLAYLISTS_API_URL}/delete?playlistId=${playlistId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    if(!response.ok){
      const deserializedRes = await response.json();
      return deserializedRes.message;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getLargestPlaylist = async (userId) => {
  try {
    let bearerToken = localStorage.getItem("accessToken");

    let response = await fetch(`${STATS_API_URL}?userId=${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    // if(response.status == 401){
    //   await refreshAccessToken();
    //   bearerToken = localStorage.getItem("accessToken");
    //   response = await fetch(`${STATS_API_URL}?userId=${userId}`, {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       "Authorization": `Bearer ${bearerToken}`
    //     }
    //   });
    // }

    const deserializedRes = await response.json();
    if(!response.ok) return deserializedRes.message;
    return deserializedRes;
  } catch (error) {
    return null;
  }
};