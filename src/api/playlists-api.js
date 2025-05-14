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