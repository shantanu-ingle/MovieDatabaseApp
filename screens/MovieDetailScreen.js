import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Rating } from 'react-native-ratings'; // Import the Rating component
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useWatchlist } from '../context/WatchlistContext';

// API Configuration
const API_KEY = '5c6dd5fb8c7d0cccb6a5da55cef8fe0f';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailScreen = ({ navigation,route }) => {
  const { movie } = route.params; // Get movie data from navigation params
  const [movieDetails, setMovieDetails] = useState(null);
  const [userRating, setUserRating] = useState(0); // Add state for storing user rating
  const [savedRating, setSavedRating] = useState(null); // Add state to track saved rating
  const [newReview, setNewReview] = useState(''); // Add state for new review input
  const [reviews, setReviews] = useState([]); // State to store all reviews for the movie
  const [watchlist, setWatchlist] = useState([]);
  const { addToWatchlist } = useWatchlist();

  // Function to fetch movie details from API
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });

      // Fetch the cast and crew details separately
      const castResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        params: {
          api_key: API_KEY,
        },
      });

    
      const director = castResponse.data.crew.find((member) => member.job === 'Director');
      const actors = castResponse.data.cast.slice(0, 5); // Get top 5 actors

      // Fetch movie reviews
      const reviewsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        params: {
          api_key: API_KEY,
        },
      });

      // Set movie details along with actors, director, and reviews
      setMovieDetails({
        ...response.data,
        director: director ? director.name : 'Unknown',
        actors: actors.map((actor) => actor.name).join(', '), // Join actor names with a comma
        reviews: reviewsResponse.data.results || [], // Handle case if there are no reviews
      });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(movie.id); // Fetch details when the component is mounted
    loadSavedRating(); // Load saved rating when the component is mounted
    loadReviews(); // Load saved reviews when the component is mounted
    const loadWatchlist = async () => {
      try {
        const savedWatchlist = await AsyncStorage.getItem('watchlist');
        if (savedWatchlist) {
          setWatchlist(JSON.parse(savedWatchlist));
        }
      } catch (error) {
        console.error("Error loading watchlist:", error);
      }
    };
    loadWatchlist();
  }, [movie.id]); // Added movie.id as a dependency to prevent stale data


  const handleAddToWatchlist = () => {
    addToWatchlist(movie);
    alert(`${movie.title} added to your watchlist!`);
  };

  // Load saved rating from AsyncStorage
  const loadSavedRating = async () => {
    try {
      const storedRating = await AsyncStorage.getItem(`movieRating_${movie.id}`);  // Retrieve saved rating
      if (storedRating !== null) {
        setSavedRating(JSON.parse(storedRating));  // If rating exists, parse and set it
      }
    } catch (error) {
      console.error('Error loading saved rating:', error);
    }
  };

  // Load reviews from AsyncStorage
  const loadReviews = async () => {
    try {
      const storedReviews = await AsyncStorage.getItem(`movieReviews_${movie.id}`); // Retrieve saved reviews
      if (storedReviews !== null) {
        setReviews(JSON.parse(storedReviews)); // Parse and set saved reviews
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  // Handle rating change
  const handleRating = (rating) => {
    setUserRating(rating);
    saveRating(rating); // Save the rating whenever it changes
  };

  // Save the rating to AsyncStorage
  const saveRating = async (rating) => {
    try {
      await AsyncStorage.setItem(`movieRating_${movie.id}`, JSON.stringify(rating));  // Save rating using movieId as the key
      setSavedRating(rating);  // Update saved rating state to show it immediately
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  // Handle submitting a new review
  const handleReviewSubmit = async () => {
    if (newReview.trim()) {
      const updatedReviews = [...reviews, { review: newReview.trim(), author: 'User' }]; // Add the new review
      setReviews(updatedReviews); // Update local state with new review
      saveReviews(updatedReviews); // Save updated reviews to AsyncStorage
      setNewReview(''); // Clear the input field after submission
    } else {
      alert('Please enter a review'); // Alert user if the review is empty
    }
  };

  // Save the reviews to AsyncStorage
  const saveReviews = async (reviews) => {
    try {
      await AsyncStorage.setItem(`movieReviews_${movie.id}`, JSON.stringify(reviews)); // Save reviews using movieId as the key
    } catch (error) {
      console.error('Error saving reviews:', error);
    }
  };

  // Check if movie details have been fetched
  if (!movieDetails) {
    return <Text>Loading...</Text>; // Show loading if movie details are not available
  }

  return (
    <ScrollView style={styles.container}>
      {/* Movie Poster */}
      <Image source={{ uri: movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : movie.poster }} style={styles.poster} />

      {/* Movie Title and Rating */}
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.rating}>Rating: {movieDetails.vote_average}/10</Text>

  {/* Add to Watchlist Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddToWatchlist}>
        <Text style={styles.buttonText}>Add to Watchlist</Text>
      </TouchableOpacity>

     
      {/* Rating component to show star rating */}
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        startingValue={savedRating || userRating}  // If savedRating exists, show that, otherwise show the userRating
        onFinishRating={handleRating}  // Handle rating change
        style={styles.ratingStars}
      />

      <Text style={styles.savedRating}>
        {savedRating !== null ? `Your Rating: ${savedRating}` : 'No rating yet'}
      </Text>

      {/* Genres Section */}
      {movieDetails.genres && movieDetails.genres.length > 0 && (
        <View style={styles.genresContainer}>
          <Text style={styles.genresTitle}>Genres:</Text>
          <View style={styles.genresList}>
            {movieDetails.genres.map((genre, index) => (
              <Text key={index} style={styles.genre}>
                {genre.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Director Section */}
      {movieDetails.director && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Director:</Text>
          <Text style={styles.details}>{movieDetails.director}</Text>
        </View>
      )}

      {/* Actors Section */}
      {movieDetails.actors && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Actors:</Text>
          <Text style={styles.details}>{movieDetails.actors}</Text>
        </View>
      )}

      {/* Overview Section */}
      {movieDetails.overview && (
        <>
          <Text style={styles.overviewTitle}>Overview:</Text>
          <Text style={styles.overview}>{movieDetails.overview}</Text>
        </>
      )}
  {/* User Review Input */}
      <View style={styles.reviewInputContainer}>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review..."
          value={newReview}
          onChangeText={setNewReview} // Update the newReview state as the user types
        />
        <Button title="Submit Review" onPress={handleReviewSubmit} />
      </View>

      {/* Display User Submitted Reviews */}
      {reviews.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>User Reviews:</Text>
          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text style={styles.reviewerName}>{review.author}</Text>
              <Text style={styles.reviewContent}>{review.review}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Reviews Section */}
      {movieDetails.reviews.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews:</Text>
          {movieDetails.reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text style={styles.reviewerName}>By: {review.author}</Text>
              <Text style={styles.reviewContent}>{review.content}</Text>
            </View>
          ))}
        </View>
      )}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1c',
  },
  poster: {
    width: '100%',
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  rating: {
    fontSize: 18,
    color: '#EDEDED',
    marginVertical: 5,
  },
  ratingStars: {
    marginVertical: 10,
  },
  savedRating: {
    fontSize: 16,
    color: '#EDEDED',
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: '#DA0037', // Bright red for the button
    paddingVertical: 10, // Comfortable button size
    paddingHorizontal: 15, // Balanced padding for text
    borderRadius: 6, // Slightly rounded corners for cohesion
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14, // Standard text size
    color: '#EDEDED', // Light gray for button text
    fontWeight: 'bold', // Slight emphasis for button text
  },
  genresContainer: {
    marginBottom: 10,
  },
  genresTitle: {
    fontSize: 18,
    color: '#EDEDED',
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 5,
    margin: 3,
    borderRadius: 5,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 18,
    color: '#EDEDED',
  },
  details: {
    fontSize: 16,
    color: '#EDEDED',
  },
  overviewTitle: {
    fontSize: 18,
    color: '#EDEDED',
    marginTop: 10,
  },
  overview: {
    fontSize: 16,
    color: '#EDEDED',
    lineHeight: 22,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    color: '#EDEDED',
  },
  reviewItem: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EDEDED',
  },
  reviewContent: {
    fontSize: 14,
    color: '#EDEDED',
    lineHeight: 20,
  },
  reviewInputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  reviewInput: {
    height: 100,
    backgroundColor: '#333',
    color: '#EDEDED',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default MovieDetailScreen;
