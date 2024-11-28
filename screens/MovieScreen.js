import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { fetchMovies, fetchGenres } from '../services/api';
import SearchBar from '../components/SearchBar';

const MoviesScreen = ({ route, navigation }) => {
  const { query: initialQuery } = route.params || {}; // Get the initial query from navigation params
  const [query, setQuery] = useState(initialQuery || ''); // Manage query state
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    // Fetch movies based on query
    const loadMovies = async () => {
      const movieList = await fetchMovies(query);
      setMovies(movieList);
    };

    // Fetch genres
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };

    loadMovies();
    loadGenres();
  }, [query]); // Run this effect when the query changes

  // Handle genre selection
  const handleGenreSelect = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        // Deselect genre if it's already selected
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        // Select genre
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  // Filter movies based on selected genres
  const filteredMovies =
    selectedGenres.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenres.some((genreId) =>
            movie.genre_ids?.includes(genreId) // Ensure that the movie has the genre
          )
        );

  // Render each movie in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
      style={styles.movieItem}
    >
      <Image source={{ uri: item.poster }} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
    </TouchableOpacity>
  );

  // Handle search submission
  const handleSearch = () => {
    if (query.trim() !== '') {
      navigation.navigate('Movies', { query }); // Update query in navigation
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

      {/* Display Search Query */}
      <Text style={styles.title}>Search Results for "{query}"</Text>

      {/* Genre Buttons for Filtering */}
      <ScrollView horizontal style={styles.genreContainer}>
        {Object.keys(genres).map((genreId) => (
          <TouchableOpacity
            key={genreId}
            style={[
              styles.genreButton,
              selectedGenres.includes(parseInt(genreId)) && styles.selectedGenre,
            ]}
            onPress={() => handleGenreSelect(parseInt(genreId))}
          >
            <Text style={styles.genreText}>{genres[genreId]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Movie List */}
      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Two movies per row
        columnWrapperStyle={styles.row} // Add spacing between rows
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#171717',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EDEDED',
    marginBottom: 10,
  },
  genreContainer: {
    marginBottom: 10,
  },
  genreButton: {
    backgroundColor: '#444444',
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  selectedGenre: {
    backgroundColor: '#DA0037',
  },
  genreText: {
    color: '#EDEDED',
  },
  row: {
    justifyContent: 'space-between', // Space movies evenly across the row
    marginBottom: 10,
  },
  movieItem: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between items
    alignItems: 'center',
    backgroundColor: '#444444',
    borderRadius: 8,
    padding: 10,
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EDEDED',
    marginTop: 5,
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#EDEDED',
  },
});

export default MoviesScreen;
