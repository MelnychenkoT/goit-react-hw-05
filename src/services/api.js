import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_TOKEN = 'a40f4439b4b507a232fdcb71e781ef6e';
const API_URL = 'https://api.themoviedb.org/3/';
const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
const options = {
  headers: {
    Authorization: 'Bearer af069d5a4aa6dab18750675f951f88b6',  
  }
};

axios.get(url, options)
  .then(response => console.log(response.data))
  .catch(err => console.error('Error fetching movies:', err));


export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}search/movie`, {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data.results; 
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};


export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data.results; 
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
	

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    return response.data; 
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

