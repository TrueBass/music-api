const PLAYLISTS_API_URL = "http://localhost:8080/music-api/playlist";

export const getAllUserPlaylists = async (userId) => {
  try {
    const response = await fetch(`${PLAYLISTS_API_URL}/get-all?userId=${userId}`, {
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
    console.log(error.message);
  }
};