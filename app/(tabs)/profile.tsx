import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <View style={styles.info}>
        <ThemedText>Name: John Doe</ThemedText>
        <ThemedText>Email: john@example.com</ThemedText>
      </View>
      <Button title="Achievements" onPress={() => router.push('/achievements')} />
      <Button title="Plans" onPress={() => router.push('/plans')} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  info: { marginVertical: 16 },
});