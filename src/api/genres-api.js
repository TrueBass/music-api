const GENRE_API_URL = "https://music-api-deploymen.onrender.com/music-api/genres";

export const getAllGenres = async () => {
    let bearerToken = localStorage.getItem("accessToken");

    try {
        const response = await fetch(`${GENRE_API_URL}/all`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${bearerToken}`
            }
        });
        const deserealizedRes = await response.json();

        if(!response.ok) {
            
            console.log(deserealizedRes);
            return null;
        }
        return deserealizedRes;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

export const getGenre = async (genreId) => {
    let bearerToken = localStorage.getItem("accessToken");

    try {
        const response = await fetch(`${GENRE_API_URL}?genreId=${genreId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${bearerToken}`
            }
        });
        const deserealizedRes = await response.json();

        if(!response.ok) {
            
            console.log(deserealizedRes);
            return null;
        }
        return deserealizedRes;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

export const addGenre = async (genreName) => {
    let bearerToken = localStorage.getItem("accessToken");

    try {
        const response = await fetch(`${GENRE_API_URL}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${bearerToken}`
            },
            body: genreName
        });
        const deserealizedRes = await response.json();

        if(!response.ok) {
            
            console.log(deserealizedRes);
            return null;
        }
        return deserealizedRes;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};