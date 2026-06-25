import axios from "axios";

// Weather API
export const fetchCurrentWeather = async (city, apiKey) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Weather service failure:", error);
    throw error;
  }
};

// News API
export const fetchTopHeadlines = async (category = "general", apiKey) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`
    );
    return response.data.articles || [];
  } catch (error) {
    console.error("News service failure:", error);
    throw error;
  }
};

// Movie API - OMDB
export const searchMovieByGenre = async (query, apiKey) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`
    );
    return response.data.Search || [];
  } catch (error) {
    console.error("Movie query service failure:", error);
    throw error;
  }
};

// Detailed Movie Fetcher
export const fetchMovieDetails = async (imdbID, apiKey) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Movie detail payload query error:", error);
    throw error;
  }
};
