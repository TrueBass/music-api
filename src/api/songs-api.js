const SONGS_API_URL = "http://localhost:8080/music-api/songs";

export const addSongToPlaylist = async (body) => {
  try {
    const response = await fetch(`${SONGS_API_URL}/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
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