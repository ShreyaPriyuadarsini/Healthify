// app/(auth)/sign-up.tsx
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignUpScreen() {
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
      borderColor: themeColors.text + '50',
      color: themeColors.text,
      backgroundColor: themeColors.card,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sign Up</ThemedText>
      <TextInput placeholder="Name" style={styles.input} placeholderTextColor={themeColors.text + '80'} />
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor={themeColors.text + '80'} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor={themeColors.text + '80'}
      />
      <Button title="Sign Up" onPress={() => router.push('/(tabs)')} />
      <Button title="Already have an account? Sign In" onPress={() => router.push('/sign-in')} />
    </ThemedView>
  );
}