import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DashboardScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Dashboard</ThemedText>

        <View style={styles.section}>
          <ThemedText>Steps This Week</ThemedText>
          {/* Placeholder for chart */}
          <ThemedText>[Chart Placeholder]</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText>Sleep Patterns</ThemedText>
          {/* Placeholder for chart */}
          <ThemedText>[Chart Placeholder]</ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  section: { marginVertical: 16, padding: 8, borderRadius: 8, backgroundColor: '#F5F5F5' },
});