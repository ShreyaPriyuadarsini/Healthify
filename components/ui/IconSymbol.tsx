// @/components/ui/IconSymbol.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native'; // Use TextStyle

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chart.bar.fill': 'bar-chart',
  'person.fill': 'person',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>; // Changed to TextStyle
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}