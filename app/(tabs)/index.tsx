import React from 'react';
import { ScrollView, View, Button, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Welcome Back!</ThemedText>

        {/* Steps */}
        <View style={styles.section}>
          <ThemedText>Steps Today: 5000 / 10000</ThemedText>
          <Button title="View History" onPress={() => router.push('/step-history')} />
        </View>

        {/* Water Intake */}
        <View style={styles.section}>
          <ThemedText>Water: 4 / 8 glasses</ThemedText>
          <Button title="Log Water" onPress={() => router.push('/water-intake')} />
        </View>

        {/* Sleep */}
        <View style={styles.section}>
          <ThemedText>Last Night: 7 hours</ThemedText>
          <Button title="Sleep Schedule" onPress={() => router.push('/sleep-schedule')} />
        </View>

        {/* Meditation */}
        <View style={styles.section}>
          <ThemedText>Meditation: 10 min today</ThemedText>
          <Button title="Meditate Now" onPress={() => router.push('/meditation-yoga')} />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  section: { marginVertical: 16, padding: 8, borderRadius: 8, backgroundColor: '#F5F5F5' },
});