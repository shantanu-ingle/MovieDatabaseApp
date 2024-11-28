// screens/ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';

const ReviewScreen = ({ route }) => {
  const { movieId } = route.params;
  const [reviews, setReviews] = useState([]); // Mock reviews data
  const [newReview, setNewReview] = useState('');

  const addReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, { id: reviews.length + 1, content: newReview }]);
      setNewReview('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews for Movie {movieId}</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewText}>{item.content}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Write a review..."
        value={newReview}
        onChangeText={setNewReview}
      />
      <Button title="Submit Review" onPress={addReview} />
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
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  reviewItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default ReviewScreen;
