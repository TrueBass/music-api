const USERS_API_URL = "http://localhost:8080/music-api/users";
const PLAYLISTS_API_URL = "http://localhost:8080/music-api/playlist";

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

export async function getUserByUsername(){
  try {
    const accessToken = parseJwt(localStorage.getItem("accessToken"));
    const username = accessToken.sub;

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

    return response.ok;
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

export const updatePassword = async (password) => {
  const bearerToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${USERS_API_URL}/update-password`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify({ password })
    });

    if(!response.ok) {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const createPlaylist = async (createPlaylistBody) => {
  try {
    const response = await fetch(`${PLAYLISTS_API_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return; // No refresh token, log the user out or do other actions
  }

  const response = await fetch('https://your-api-endpoint/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
  } else {
    // If refresh fails, log the user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Redirect to login page
    window.location.href = '/login';
  }
};