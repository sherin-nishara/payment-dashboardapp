import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import api from './services/api';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!username || !password) {
      Alert.alert('Missing Fields', 'Please enter username and password');
      return;
    }

    try {
      const res = await api.post('/auth/login', { username, password });
      console.log('✅ Token received:', res.data.accessToken);
      await SecureStore.setItemAsync('token', res.data.accessToken);
      router.replace('/dashboard');
    } catch (err) {
      console.log('❌ Login error:', err?.response?.data || err.message);
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };


  return (
    <ImageBackground
      source={require('../assets/images/my.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🔐 Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Login" onPress={login} color="#2e7d32" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 24,
    padding: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
});
