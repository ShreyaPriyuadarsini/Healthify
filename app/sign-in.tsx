// app/(auth)/sign-in.tsx
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      backgroundColor: themeColors.background,
    },
    input: {
      borderWidth: 1,
      padding: 8,
      marginVertical: 8,
      borderRadius: 4,
      borderColor: themeColors.text + '50', // 50% opacity
      color: themeColors.text,
      backgroundColor: themeColors.card,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sign In</ThemedText>
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={themeColors.text + '80'} // 80% opacity
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor={themeColors.text + '80'}
      />
      <Button title="Sign In" onPress={() => router.push('/(tabs)')} />
      <Button title="Need an account? Sign Up" onPress={() => router.push('/sign-up')} />
    </ThemedView>
  );
}