import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const ACCESS_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDBmNDQzOWI0YjUwN2EyMzJmZGNiNzFlNzgxZWY2ZSIsIm5iZiI6MTczNjUxMTUzNi41MDU5OTk4LCJzdWIiOiI2NzgxMTAzMDM0YTRlNzVlNDk3YjUzYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WiGenQmG8JPVe-LDfk380taXeStMFm2YenfkqLmFkPs';

axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_KEY}`;

export const fetchPosters = async () => {
    try {
      const response = await axios.get("/configuration");
      const { images } = response.data;
      return images.base_url;
    } catch (error) {
      console.error("Error fetching image configuration:", error);
      return null;
    }
  };
  
  export const fetchTrendingMovies = async () => {
    try {
      const base_url = await fetchPosters();
      const file_size = "w200";
      const { data } = await axios.get("/trending/movie/day", {
        params: { language: "en-US", page: 1 },
      });
      const moviesWithPosters = data.results.map((movie) => ({
        ...movie,
        posterUrl: movie.poster_path
          ? `${base_url}${file_size}${movie.poster_path}`
          : null,
      }));
      return moviesWithPosters;
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return [];
    }
  };
  
  export const fetchSearchMovie = async (query, fileSize = "w200") => {
    if (!query) {
      console.error("Search query is required!");
      return [];
    }
  
    try {
      const base_url = await fetchPosters();
      if (!base_url) {
        throw new Error("Failed to fetch base URL for images.");
      }
  
      const { data } = await axios.get("/search/movie", {
        params: {
          query,
          language: "en-US",
          page: 1,
        },
      });
  
      const moviesWithPosters = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title || "Untitled",
        release_date: movie.release_date,
        posterUrl: movie.poster_path
          ? `${base_url}${fileSize}${movie.poster_path}`
          : null,
    }));
  
      return moviesWithPosters;
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      return [];
    }
  };
  
  fetchTrendingMovies();
  
  export const fetchMoviesDetails = async (movieId) => {
    if (!movieId) {
      console.error("Movie ID is required.");
      return null;
    }
    try {
      const base_url = await fetchPosters();
      if (!base_url) {
        throw new Error("Base URL for images could not be fetched.");
      }
      const { data } = await axios.get(`/movie/${movieId}`, {
        params: { language: "en-US" },
      });
  
      const file_size = "w500";
      const posterUrl = `${base_url}${file_size}${data.poster_path}`;
      return { ...data, posterUrl };
    } catch (error) {
      console.error(
        "Error fetching movie details:",
        error.message,
        error.response?.data
      );
      return null;
    }
  };
  
  export const fetchReviews = async (movieId) => {
    try {
      const { data } = await axios.get(`/movie/${movieId}/reviews`, {
        params: { language: "en-US" },
      });
      return data.results;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return null;
    }
  };
  
  export const fetchCast = async (movieId) => {
    try {
      const { data } = await axios.get(`/movie/${movieId}/credits`, {
        params: { language: "en-US" },
      });
      return data.cast;
    } catch (error) {
      console.error("Error fetching cast:", error);
      return null;
    }
  };