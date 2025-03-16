// constants/Colors.ts
type ColorScheme = {
  primary: string;   // For buttons, highlights
  secondary: string; // For accents
  background: string; // Main background
  card: string;      // For sections or cards
  text: string;      // Default text color
  tint: string;      // Active/highlighted elements
};

export const Colors: {
  light: ColorScheme;
  dark: ColorScheme;
} = {
  light: {
    primary: '#4CAF50',    // Green, symbolizing health
    secondary: '#2196F3',  // Blue, evoking calmness
    background: '#F5F5F5', // Light gray, softer than pure white
    card: '#FFFFFF',       // White for sections
    text: '#212121',       // Dark gray, easier on eyes than black
    tint: '#4CAF50',       // Matches primary
  },
  dark: {
    primary: '#66BB6A',    // Lighter green for visibility
    secondary: '#64B5F6',  // Lighter blue for contrast
    background: '#121212', // Dark gray, better for OLED screens
    card: '#1E1E1E',       // Slightly lighter gray for sections
    text: '#E0E0E0',       // Light gray, softer than pure white
    tint: '#66BB6A',       // Matches primary
  },
};