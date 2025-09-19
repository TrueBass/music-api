const USERS_API_URL = "https://music-api-deploymen.onrender.com/music-api/users";
const PLAYLISTS_API_URL = "https://music-api-deploymen.onrender.com/music-api/playlist";
const REFERSH_TOKEN_URL = "https://music-api-deploymen.onrender.com/music-api/users/refresh";

function parseJwt (token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export async function loginUser(emailOrUsername, password) {
  try {
    const response = await fetch(`${USERS_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailOrUsername, password })
    });
    
    if (!response.ok) {
      return { general: 'Invalid email or password' };
    }

    const data = await response.json();
    
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    window.location.href = '/home';
  } catch (error) {
    console.error('Error:', error);
    return { general: 'Something went wrong. Please try again.' };
  }
};

export async function getUserByUsername(username){

  try {
    let accessToken;
    if(username == undefined) {
      accessToken = parseJwt(localStorage.getItem("accessToken"));
      username = accessToken.sub;
    }

    const response = await fetch(`${USERS_API_URL}/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await fetch(`${USERS_API_URL}/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken })
    });

    if(response.ok){
      localStorage.clear();
    }

    return response.ok;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUsername = async (username) => {
  const bearerToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${USERS_API_URL}/update-username`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify({ username })
    });

    if(!response.ok) {
      console.log(response);
      return null;
    }

    const parsedRes = await response.text();
    return parsedRes;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const updateEmail = async (email) => {
  try {
    const bearerToken = localStorage.getItem("accessToken");

    const response = await fetch(`${USERS_API_URL}/update-email`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify({ email })
    });

    if(!response.ok) {
      console.log(response);
      return null;
    }

    return response.ok;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const updatePassword = async (body) => {
  try {
    const bearerToken = localStorage.getItem("accessToken");

    const response = await fetch(`${USERS_API_URL}/update-password`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify(body)
    });

    if(!response.ok) {
      const deserializedRes = await response.json();
      return deserializedRes.message;
    }
  } catch (error) {
    return null;
  }
};

export const updateSocialCredit = async (body) => {
  const bearerToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${USERS_API_URL}/update-social-credit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify(body)
    });
      const deserializedRes = await response.json();
      console.log(deserializedRes);
    if(!response.ok) {
      return deserializedRes.message;
    }
    return deserializedRes;
  } catch (error) {
    return 0;
  }
};

export const createPlaylist = async (createPlaylistBody) => {
  const bearerToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${PLAYLISTS_API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify(createPlaylistBody)
    });
    
    if (!response.ok) {
      console.log(response);
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.log("No refresh token");
    return; // No refresh token, log the user out or do other actions
  }

  try{
    const response = await fetch(REFERSH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(response);
      localStorage.setItem('accessToken', data.accessToken);
    } else {
      // If refresh fails, log the user out
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Redirect to login page
      window.location.href = '/login';
    }
  }catch(error){
    console.log(error.message);
    return;
  }
};

export const deleteUser = async (userId) => {
  const bearerToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    if(response.ok) {
      localStorage.clear();
    }

    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};