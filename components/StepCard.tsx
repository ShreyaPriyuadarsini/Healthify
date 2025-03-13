// components/StepCard.tsx
import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface StepCardProps {
  currentSteps: number;
  goal: number;
}

export function StepCard({ currentSteps, goal }: StepCardProps) {
  return (
    <ThemedView style={{ padding: 16, borderRadius: 8, marginVertical: 8 }}>
      <ThemedText type="subtitle">Steps Today</ThemedText>
      <ThemedText>{currentSteps} / {goal}</ThemedText>
    </ThemedView>
  );
}