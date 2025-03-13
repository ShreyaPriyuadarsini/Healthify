import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MeditationYogaScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Meditation & Yoga</ThemedText>
        <ThemedText>10-Minute Calm</ThemedText>
        <ThemedText>20-Minute Yoga Flow</ThemedText>
        {/* Add playable content */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});