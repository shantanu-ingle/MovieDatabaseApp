import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        placeholderTextColor="#EDEDED" // Match the minimalistic theme
        value={query}
        onChangeText={onQueryChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, // Minimal spacing
    paddingHorizontal: 10, // Compact padding
    backgroundColor: '#171717', // Dark background for the container
    borderRadius: 8, // Slightly rounded corners for a clean look
  },
  input: {
    flex: 1,
    fontSize: 14, // Slightly smaller font for a minimalistic feel
    paddingVertical: 8, // Minimal padding for compact design
    paddingHorizontal: 10, // Balanced input spacing
    backgroundColor: '#444444', // Neutral gray for the input background
    borderRadius: 6, // Subtle rounded corners for simplicity
    marginRight: 10, // Small margin between input and button
    borderColor: '#DA0037', // Bright red for a subtle accent border
    borderWidth: 1, // Thin border for minimalism
    color: '#EDEDED', // Light gray text for better readability
  },
  button: {
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
});

export default SearchBar;
