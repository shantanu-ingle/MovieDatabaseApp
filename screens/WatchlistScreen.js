import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';

const WatchlistScreen = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Watchlist</Text>
      {watchlist.length === 0 ? (
        <Text style={styles.emptyText}>Your watchlist is empty.</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromWatchlist(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#171717',
  },
  title: {
    color: '#EDEDED',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    color: '#EDEDED',
    fontSize: 16,
  },
  movieItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#2C2C2C',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieTitle: {
    color: '#EDEDED',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default WatchlistScreen;
