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
  ActivityIndicator, // Added ActivityIndicator import
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true); // Set loading to true when sign-in starts
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message);
      console.error('Firebase sign in error:', error);
    } finally {
      setIsLoading(false); // Set loading to false when sign-in completes (success or fail)
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  const handleGoToSignUp = () => {
    console.log('Navigating to sign-up');
    router.push('/sign-up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/sh2.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Welcome back to exercise app!</Text>
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
            editable={!isLoading} // Disable input while loading
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
            editable={!isLoading} // Disable input while loading
          />
        </View>
        <TouchableOpacity 
          style={[styles.signInButton, isLoading && styles.signInButtonDisabled]} 
          onPress={handleSignIn}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword} disabled={isLoading}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoToSignUp} disabled={isLoading}>
          <Text style={styles.forgotPassword}>Need an account? Sign Up</Text>
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
  signInButtonDisabled: { // Added disabled button style
    backgroundColor: '#99C1FF',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007AFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});