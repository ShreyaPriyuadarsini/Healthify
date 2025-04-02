import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  dateAchieved?: string;
  progress?: number;
  icon: string;
  earned: boolean;
}

const dummyAchievements: Achievement[] = [
  {
    id: '1',
    title: '10,000 Steps Achieved',
    description: 'You reached 10,000 steps in a day!',
    dateAchieved: '2025-03-20',
    icon: 'walk',
    earned: true,
  },
  {
    id: '2',
    title: '7-Day Step Streak',
    description: 'Walked consistently for 7 days in a row.',
    dateAchieved: '2025-03-25',
    icon: 'run-fast',
    earned: true,
  },
  {
    id: '3',
    title: 'Consistent Hydration',
    description: 'Met your daily water goal for 7 days.',
    dateAchieved: '2025-03-22',
    icon: 'water',
    earned: true,
  },
  {
    id: '4',
    title: 'Sleep Schedule Master',
    description: 'Maintained a consistent sleep schedule for 5 days.',
    dateAchieved: '2025-03-21',
    icon: 'sleep',
    earned: true,
  },
  {
    id: '5',
    title: 'Period Tracker Pro',
    description: 'Tracked your cycle consistently for 3 months.',
    icon: 'calendar',
    progress: 0.8,
    earned: false,
  },
  {
    id: '6',
    title: 'Mindful Meditator',
    description: 'Meditated consistently for 10 days.',
    icon: 'meditation',
    progress: 0.5,
    earned: false,
  },
];

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setAchievements(dummyAchievements);
  }, []);

  const handleShare = (achievement: Achievement) => {
    Alert.alert(
      'Share Achievement',
      `Share "${achievement.title}" with your friends?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log(`Sharing: ${achievement.title}`) },
      ]
    );
  };

  const renderAchievement = ({ item }: { item: Achievement }) => (
    <View style={[styles.achievementCard, !item.earned && styles.unearnedCard]}>
      <Icon
        name={item.icon}
        size={40}
        color={item.earned ? '#4A90E2' : '#CCCCCC'}
        style={styles.achievementIcon}
      />
      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, !item.earned && styles.unearnedText]}>
          {item.title}
        </Text>
        <Text style={[styles.achievementDescription, !item.earned && styles.unearnedText]}>
          {item.description}
        </Text>
        {item.earned && item.dateAchieved && (
          <Text style={styles.achievementDate}>Achieved on {item.dateAchieved}</Text>
        )}
        {item.progress !== undefined && !item.earned && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={item.progress}
              width={200} // Reduced width for better fit
              height={10}
              color="#4A90E2"
              unfilledColor="#E0E0E0"
              borderWidth={0}
              animated={true}
            />
            <Text style={styles.progressText}>{Math.round(item.progress * 100)}% Complete</Text>
          </View>
        )}
        {item.earned && (
          <TouchableOpacity onPress={() => handleShare(item)} style={styles.shareIcon}>
            <Icon name="share-variant" size={20} color="#4A90E2" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Achievements</Text>
      </View>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={renderAchievement}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No achievements yet!</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  headerTitle: { fontSize: 24, color: '#FFF', fontWeight: 'bold' },
  listContainer: { padding: 20, paddingBottom: 40 },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unearnedCard: { backgroundColor: '#F8F8F8', opacity: 0.9 },
  achievementIcon: { marginRight: 15, alignSelf: 'center' },
  achievementContent: { flex: 1 },
  achievementTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  achievementDescription: { fontSize: 14, color: '#666', marginVertical: 5 },
  achievementDate: { fontSize: 12, color: '#999' },
  unearnedText: { color: '#999' },
  progressContainer: { marginTop: 10, alignItems: 'center' },
  progressText: { fontSize: 12, color: '#666', marginTop: 5 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
  shareIcon: { position: 'absolute', right: 0, top: 0, padding: 5 },
});

export default Achievements;