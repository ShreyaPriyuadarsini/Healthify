import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';

// Get screen dimensions for full-screen image sizing
const { width, height } = Dimensions.get('window');

// Define valid route types
type ValidRoutes =
  | 'period-tracker'
  | 'achievements'
  | 'meditation-yoga'
  | 'water-intake'
  | 'sleep-schedule';

// Define the grid item type with image source
interface GridItem {
  id: string;
  route: ValidRoutes;
  image: any; // Image source (can be local or remote URI)
  title: string; // Label for each grid item
}

// Grid data with image placeholders (replace with your actual images)
const gridItems: GridItem[] = [
  {
    id: 'calendar',
    route: 'period-tracker',
    image: require('../../assets/images/period.png'),
    title: 'Period Tracker',
  },
  {
    id: 'activity',
    route: 'achievements',
    image: require('../../assets/images/activity.png'),
    title: 'Achievements',
  },
  {
    id: 'meditation',
    route: 'meditation-yoga',
    image: require('../../assets/images/meditation.png'),
    title: 'Meditation & Yoga',
  },
  {
    id: 'water',
    route: 'water-intake',
    image: require('../../assets/images/planner.png'),
    title: 'Water Intake',
  },
  {
    id: 'period',
    route: 'period-tracker',
    image: require('../../assets/images/adaptive-icon.png'),
    title: 'Period Overview',
  },
  {
    id: 'sleep',
    route: 'sleep-schedule',
    image: require('../../assets/images/period.png'),
    title: 'Sleep Schedule',
  },
];

const HomeScreen: React.FC = () => {
  const router = useRouter();

  // Handle navigation on press
  const handlePress = (route: ValidRoutes) => {
    router.push(`/${route}` as const);
  };

  return (
    <View style={styles.container}>
      {/* Full-screen background image */}
      <Image
        source={require('../../assets/images/water.png')} // Replace with a suitable background
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {/* Grid Layout */}
      <View style={styles.gridContainer}>
        {gridItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            onPress={() => handlePress(item.route)}
            activeOpacity={0.7} // Enhanced press feedback
          >
            <Image
              source={item.image}
              style={styles.gridImage}
              resizeMode="contain" // Ensures images fit well
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Softer light gray for a clean look
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.05, // Very subtle background for professionalism
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', // Even spacing for a balanced grid
    padding: 20,
    paddingTop: 30, // Extra top padding for better alignment
  },
  gridItem: {
    width: width * 0.42, // Slightly smaller for better spacing (42% of screen width)
    aspectRatio: 1, // Square shape
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // Softer, modern corners
    marginBottom: 20,
    elevation: 6, // Slightly stronger shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Subtle border
    borderColor: '#E0E4E8', // Light gray border
  },
  gridImage: {
    width: '65%', // Slightly smaller for balance
    height: '65%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for contrast
    paddingVertical: 8, // More padding for readability
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 16, // Slightly larger for prominence
    fontWeight: '700', // Bolder for emphasis
    textAlign: 'center',
    letterSpacing: 0.5, // Subtle spacing for a premium feel
  },
});

export default HomeScreen;