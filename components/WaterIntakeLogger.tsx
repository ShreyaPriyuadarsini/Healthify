// components/WaterIntake.tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface WaterIntakeProps {
  initialIntake: number;
  onLog: (newIntake: number) => void;
}

export function WaterIntake({ initialIntake, onLog }: WaterIntakeProps) {
  const [intake, setIntake] = useState(initialIntake);

  const logWater = () => {
    const newIntake = intake + 1;
    setIntake(newIntake);
    onLog(newIntake);
  };

  return (
    <ThemedView style={{ padding: 16, borderRadius: 8, marginVertical: 8 }}>
      <ThemedText type="subtitle">Water Intake</ThemedText>
      <ThemedText>Glasses today: {intake}</ThemedText>
      <Button title="Log Glass" onPress={logWater} />
    </ThemedView>
  );
}