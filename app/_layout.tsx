// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page on app start
    router.replace('/sign-in');
  }, []);

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="water-intake" options={{ title: 'Water Intake' }} />
      <Stack.Screen name="meditation-yoga" options={{ title: 'Meditation & Yoga' }} />
      <Stack.Screen name="sleep-schedule" options={{ title: 'Sleep Schedule' }} />
      <Stack.Screen name="period-tracker" options={{ title: 'Period Tracker' }} />
      <Stack.Screen name="achievements" options={{ title: 'Achievements' }} />
      <Stack.Screen name="plans" options={{ title: 'Plans' }} />
    </Stack>
  );
}