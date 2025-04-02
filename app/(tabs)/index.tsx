import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';0
import { useRouter } from 'expo-router';

// Screen dimensions
const { width } = Dimensions.get('window');

// Define valid route types
type ValidRoutes =
  | 'period-tracker'
  | 'step-count'
  | 'meditation-yoga'
  | 'water-intake'
  | 'daily-records'  
  | 'sleep-schedule'
  | 'calorie-count' 
  | 'achievements';


// Define grid item's shape
interface GridItem {
  id: string;
  route: ValidRoutes;
  image: any;
  title: string;
}

// Grid data (immutable and typed)
const GRID_ITEMS: GridItem[] = [
  { id: 'period', route: 'period-tracker', image: require('../../assets/images/period.png'), title: 'Period Tracker' },
  { id: 'step', route: 'step-count', image: require('../../assets/images/stepcount.png'), title: 'Step Count' },
  { id: 'meditation', route: 'meditation-yoga', image: require('../../assets/images/meditation.png'), title: 'Meditation & Yoga' },
  { id: 'water', route: 'water-intake', image: require('../../assets/images/water.png'), title: 'Water Intake' },
  { id: 'daily', route: 'daily-records', image: require('../../assets/images/planner.png'), title: 'Daily records' },
  { id: 'sleep', route: 'sleep-schedule', image: require('../../assets/images/sleep.png'), title: 'Sleep Schedule' },
  { id: 'calorie', route: 'calorie-count', image: require('../../assets/images/calorie.png'), title: 'Calorie count' },
  { id: 'achievements', route: 'achievements', image: require('../../assets/images/achievement.png'), title: 'Achievements' },
];   

// Grid item component for reusability
const GridCard: React.FC<GridItem & { onPress: () => void }> = ({ image, title, onPress }) => (
  <TouchableOpacity style={styles.gridItem} onPress={onPress} activeOpacity={0.75}>
    <Image source={image} style={styles.gridImage} resizeMode="contain" />
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen: React.FC = () => {
  const router = useRouter();

  // Navigation handler
  const handleNavigation = (route: ValidRoutes) => {
    router.push(`/${route}`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Image
        source={require('../../assets/images/water.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to Healtify</Text>
          <Text style={styles.subText}>Your wellness companion starts here</Text>
        </View>
        {/* Grid Section */}
        <View style={styles.gridContainer}>
          {GRID_ITEMS.map((item) => (
            <GridCard
              key={item.id}
              {...item}
              onPress={() => handleNavigation(item.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F7F9FC', // Softer, modern gray-blue
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.08, // Subtle yet refined background
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25, // Space between header and grid
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '900', // Extra bold for emphasis
    color: '#1A3C5A', // Deep blue for sophistication
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280', // Neutral gray for balance
    marginTop: 8,
    letterSpacing: 0.3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Evenly spaced columns
    gap: 15, // Consistent spacing between items (RN 0.71+)
  },
  gridItem: {
    width: (width - 45) / 2, // Dynamic width for 2 columns with padding
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // Softer corners
    marginBottom: 15,
    elevation: 8, // Stronger shadow for prominence
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Lighter border
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gridImage: {
    width: '70%',
    height: '70%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Slightly darker overlay
    paddingVertical: 10,
    borderBottomLeftRadius: 20, // Match card corners
    borderBottomRightRadius: 20,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.6,
  },
});

export default HomeScreen;