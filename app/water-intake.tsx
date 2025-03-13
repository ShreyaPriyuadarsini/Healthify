import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function WaterIntakeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Water Intake</ThemedText>
      <ThemedText>Today: 4 / 8 glasses</ThemedText>
      <Button title="Log Glass" onPress={() => { /* Log water */ }} />
      <Button title="Set Alarm" onPress={() => { /* Set notification */ }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});