const GENRE_API_URL = "http://localhost:8080/music-api/genres";

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