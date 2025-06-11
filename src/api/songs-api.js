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

export const getAllPopularSongs = async () => {
  try {
    const response = await fetch(`${SONGS_API_URL}/popular/all`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
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
}