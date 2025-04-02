// app/AuthScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignInScreen from './sign-in';
import SignUpScreen from './sign-up';

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <View style={styles.container}>
      {isSignIn ? <SignInScreen /> : <SignUpScreen />}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsSignIn(!isSignIn)}
      >
        <Text style={styles.toggleButtonText}>
          {isSignIn ? 'Go to Sign Up' : 'Go to Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});