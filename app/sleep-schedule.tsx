import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SleepScheduleScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Sleep Schedule</ThemedText>
        <ThemedText>Oct 10: 11 PM - 6 AM (7h)</ThemedText>
        {/* Add input for logging */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});