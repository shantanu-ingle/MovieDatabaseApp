import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieCard = ({ title, poster, rating }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>Rating: {rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,  // Added more padding for better spacing
    marginBottom: 15,  // Increased margin for better separation between cards
    backgroundColor: '#fff',  // Keeping the white background
    borderRadius: 12,  // Softer and larger rounded corners for a modern feel
    elevation: 5,  // Increased elevation for a more pronounced shadow on Android
    shadowColor: '#000',  // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 },  // Slight offset to make the shadow pop
    shadowOpacity: 0.1,  // Subtle shadow opacity
    shadowRadius: 8,  // Soft shadow blur for a floating effect
  },
  poster: {
    width: 90,  // Increased size for better visibility of the poster
    height: 140,  // Increased height for better aspect ratio
    borderRadius: 8,  // Rounded corners for the poster image
    borderWidth: 1,  // Light border around the image to define edges
    borderColor: '#EB3678',  // Bright pink border to make it pop
  },
  details: {
    marginLeft: 15,  // More space between the image and text
    justifyContent: 'center',
    flex: 1,  // Ensures that text takes up the available space
  },
  title: {
    fontSize: 18,  // Slightly larger title for better readability
    fontWeight: 'bold',
    color: '#180161',  // Dark purple color for the title to match the theme
    marginBottom: 5,  // Space between title and rating
  },
  rating: {
    marginTop: 5,
    fontSize: 16,  // Increased font size for the rating
    color: '#EB3678',  // Bright pink color for rating to add emphasis
  },
});


export default MovieCard;
