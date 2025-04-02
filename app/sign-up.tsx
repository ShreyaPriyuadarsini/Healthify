import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully');
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
      console.error('Sign-up error:', error);
    }
  };

  const handleGoToSignIn = () => {
    console.log('Navigating to Sign In');
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/sh.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create an account to get started!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#A0A0A0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
          <Text style={styles.signInButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoToSignIn}>
          <Text style={styles.forgotPassword}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: 180,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  forgotPassword: {
    marginBottom: 50,
    color: '#007AFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});