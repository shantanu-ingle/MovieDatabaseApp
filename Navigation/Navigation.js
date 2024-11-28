import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import WatchlistScreen from '../screens/WatchlistScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem('userToken'); // Get stored token
      setIsAuthenticated(!!userToken); // Set authentication status based on token
    };
    checkAuth();
  }, []);


  return (
    <NavigationContainer>
    {isAuthenticated ? (
        <Stack.Navigator initialRouteName="Home">
      
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED', // Ensure header title text matches
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Watchlist</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Movies"
          component={MovieScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Watchlist</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Watchlist</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED',
            },
          }}
        />
      </Stack.Navigator>
       ) : (
         <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED', // Ensure header title text matches
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Watchlist</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Movies"
          component={MovieScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Watchlist</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Watchlist</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            headerStyle: {
              backgroundColor: '#171717', // Primary background color
            },
            headerTintColor: '#EDEDED', // Light text for header
            headerTitleStyle: {
              color: '#EDEDED',
            },
          }}
        />
      </Stack.Navigator>
      )}
    </NavigationContainer>
       
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    padding: 5,
  },
  headerButtonText: {
    color: '#EDEDED',
    fontSize: 16,
  },
});


