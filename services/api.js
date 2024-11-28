import axios from 'axios';

const API_KEY = '5c6dd5fb8c7d0cccb6a5da55cef8fe0f';
const BASE_URL = 'https://api.themoviedb.org/3';

// Cache to store genres to avoid redundant API calls
let genreMap = null; 

// In your services/api.js file
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        page: 1,
      },
    });
    return response.data.results; // Return the list of movies
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

// Fetch genres and map them by ID (cached for efficiency)
export const fetchGenres = async () => {
  if (genreMap) return genreMap; // Return cached genres if already fetched
  
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });

    const genres = response.data.genres;

    // Cache genre names by their IDs for future use
    genreMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    return genreMap;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {}; // Return empty object if fetching genres fails
  }
};

// Fetch movies based on search query, including genres
export const fetchMovies = async (query) => {
  try {
    // Fetch genres if they are not already cached
    if (!genreMap) {
      await fetchGenres();
    }

    // Make request to search movies by query
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });

    // Map movie data to include genre names
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'), // Map genre IDs to names
    }));

    return movies;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return []; // Return empty array if fetching movies fails
  }
};

// Fetch trending movies (weekly) and include genres
export const fetchTrendingMovies = async () => {
  try {
    // Fetch genres if they are not already cached
    if (!genreMap) {
      await fetchGenres();
    }

    // Make request to fetch trending movies
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Map trending movie data to include genre names
    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'), // Map genre IDs to names
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return []; // Return empty array if fetching trending movies fails
  }
};
// Fetch the top-rated movies (up to 20)
export const fetchTopRatedMovies = async () => {
  try {
    // Request to the top-rated movies endpoint
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        page: 1, // You can change this to get a different page of results
      },
    });
        // Get the top 20 movies (the API returns 20 movies per page by default)
    return response.data.results.slice(0, 20); // Limit to the top 20
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};

// services/api.js
export const fetchMovieDetails = (movieId) => {
  // You can replace this with an actual API call
  return fetch(`https://api.example.com/movies/${movieId}`)
    .then(response => response.json())
    .catch(error => console.error('Error fetching movie details:', error));
};

export const fetchReviews = (movieId) => {
  // You can replace this with an actual API call
  return fetch(`https://api.example.com/movies/${movieId}/reviews`)
    .then(response => response.json())
    .catch(error => console.error('Error fetching reviews:', error));
};

export const addReview = (movieId, review) => {
  // API call to add review
  return fetch(`https://api.example.com/movies/${movieId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ review }),
  })
    .then(response => response.json())
    .catch(error => console.error('Error adding review:', error));
};