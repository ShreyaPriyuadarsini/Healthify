import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StepHistoryScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Step History</ThemedText>
        {/* Mock data */}
        <ThemedText>Oct 10: 8000 steps</ThemedText>
        <ThemedText>Oct 9: 7500 steps</ThemedText>
        {/* Add chart or list here */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});