import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { fetchTrendingMovies, fetchTopRatedMovies } from '../services/api'; // Assuming fetchTopRatedMovies is available

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // Fetch trending movies and top-rated movies
  useEffect(() => {
    const loadTrendingMovies = async () => {
      const trendingMoviesList = await fetchTrendingMovies();
      setTrendingMovies(trendingMoviesList);
    };

    const loadTopRatedMovies = async () => {
      const topRatedMoviesList = await fetchTopRatedMovies();
      setTopRatedMovies(topRatedMoviesList);
    };

    loadTrendingMovies();
    loadTopRatedMovies();
  }, []);

  // Render item for each movie in the trending section
  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })} // Navigate to MovieDetailScreen
    >
      <Image source={{ uri: item.poster }} style={styles.poster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
    </TouchableOpacity>
  );

  // Render item for each movie in the top-rated section
  const renderTopRatedMovie = ({ item }) => (
   <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })} // Navigate to MovieDetailScreen
    >
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.rating}>Rating: {item.vote_average}</Text>
    </TouchableOpacity>
  );

  // Handle search and navigation to Movies screen
  const handleSearch = () => {
    if (query.trim() !== '') {
      navigation.navigate('Movies', { query });
    }
  };

  return (
    <ScrollView style={styles.container}> 
      <Text style={styles.title}>Movie Database</Text>
      <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

      {/* Trending Movies Section */}
      <Text style={styles.sectionTitle}>Trending Movies</Text>
      <FlatList
        data={trendingMovies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingList}
      />

      {/* Top Rated Movies Section */}
      <Text style={styles.sectionTitle}>Top 20 Rated Movies</Text>
      <FlatList
        data={topRatedMovies}
        renderItem={renderTopRatedMovie}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topRatedList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#171717', // Dark background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#DA0037', // Bright accent color
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DA0037', // Bright accent color for section titles
  },
  trendingList: {
    paddingVertical: 10, // Add padding on top and bottom
  },
  topRatedList: {
    paddingVertical: 10, // Add padding on top and bottom
  },
  movieContainer: {
    marginRight: 15, // Spacing between movie items
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 150, // Restrict title to fit poster size
    color: '#EDEDED', // Light text for movie titles
  },
  rating: {
    fontSize: 14,
    color: '#444444', // Neutral color for ratings
    textAlign: 'center',
  },
});

export default HomeScreen;
