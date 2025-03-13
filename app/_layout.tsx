import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="step-counter" options={{ title: 'Step Counter' }} />
      <Stack.Screen name="water-intake" options={{ title: 'Water Intake' }} />
      <Stack.Screen name="meditation-yoga" options={{ title: 'Meditation & Yoga' }} />
      <Stack.Screen name="sleep-schedule" options={{ title: 'Sleep Schedule' }} />
      <Stack.Screen name="period-tracker" options={{ title: 'Period Tracker' }} />
      <Stack.Screen name="achievements" options={{ title: 'Achievements' }} />
      <Stack.Screen name="plans" options={{ title: 'Plans' }} />
    </Stack>
  );
}