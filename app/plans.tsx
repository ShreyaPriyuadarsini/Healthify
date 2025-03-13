import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PlansScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Plans</ThemedText>
        <ThemedText>30-Day Fitness Challenge</ThemedText>
        <ThemedText>Beginner Yoga Plan</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});