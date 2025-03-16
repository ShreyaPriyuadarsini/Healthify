import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: themeColors.background },
    section: {
      marginVertical: 16,
      padding: 8,
      borderRadius: 8,
      backgroundColor: themeColors.card,
    },
  });

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Dashboard</ThemedText>
        <View style={styles.section}>
          <ThemedText>Steps This Week</ThemedText>
          <ThemedText>[Chart Placeholder]</ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText>Sleep Patterns</ThemedText>
          <ThemedText>[Chart Placeholder]</ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}