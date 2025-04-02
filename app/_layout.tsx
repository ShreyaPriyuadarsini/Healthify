// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function Layout() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn === true) {
      router.replace('/(tabs)');
    } else if (isUserLoggedIn === false) {
      router.replace('./AuthScreen');
    }
  }, [isUserLoggedIn]);

  if(isUserLoggedIn === null){
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="AuthScreen" options={{ headerShown: false }} />
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