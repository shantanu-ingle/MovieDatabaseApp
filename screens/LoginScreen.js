import React, { useState, useEffect } from 'react';  // Import useEffect here
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Add state for authentication

  // Use useEffect to check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem('userToken');  // Retrieve from AsyncStorage
      setIsAuthenticated(!!userToken);  // Set authentication based on token presence
    };
    checkAuth();
  }, []);  // Empty dependency array to run only once on mount

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password') {
     
      AsyncStorage.setItem('userToken', 'some_token'); // Save token for authentication
      setIsAuthenticated(true);  // Set authentication here
      navigation.replace('Home');
       alert('Login successful!');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#EDEDED',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#444444',
    color: '#EDEDED',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#DA0037',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#EDEDED',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#DA0037',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: '#DA0037',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
