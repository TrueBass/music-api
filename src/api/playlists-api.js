const PLAYLISTS_API_URL = "http://localhost:8080/music-api/playlist";

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

    const response = await fetch(`${PLAYLISTS_API_URL}/change-visibility/${playlistId}/${!playlistVisibility}`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    const deserializedRes = await response.json();
    console.log(deserializedRes.message);

    if(!response.ok){
      return null;
    }

  } catch (error) {
    return null;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    const response = await fetch(`${PLAYLISTS_API_URL}/delete?playlistId=${playlistId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
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