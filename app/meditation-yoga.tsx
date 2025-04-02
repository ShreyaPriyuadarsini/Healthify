import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import * as Progress from 'react-native-progress'; // For the progress circle

// Type for meditation/yoga session
interface Session {
  id: string;
  title: string;
  duration: string;
  type: 'Meditation' | 'Yoga';
  icon: string; // Icon name from MaterialIcons
}

const MeditationYoga: React.FC = () => {
  // State for meditation/yoga progress
  const [minutesCompleted, setMinutesCompleted] = useState<number>(0);
  const [goalMinutes, setGoalMinutes] = useState<number>(30); // Daily goal in minutes

  // List of available sessions
  const sessions: Session[] = [
    { id: '1', title: 'Morning Calm', duration: '10 min', type: 'Meditation', icon: 'self-improvement' },
    { id: '2', title: 'Sun Salutation', duration: '15 min', type: 'Yoga', icon: 'fitness-center' },
    { id: '3', title: 'Stress Relief', duration: '20 min', type: 'Meditation', icon: 'spa' },
    { id: '4', title: 'Evening Stretch', duration: '12 min', type: 'Yoga', icon: 'nights-stay' },
  ];

  // Function to start a session
  const startSession = (duration: string) => {
    const minutes = parseInt(duration.split(' ')[0]); // Extract minutes from duration string
    const newMinutes = minutesCompleted + minutes;
    setMinutesCompleted(newMinutes);
    alert(`Started ${duration} session!`);
    if (newMinutes >= goalMinutes) {
      alert('Great job! You’ve reached your daily meditation/yoga goal!');
    }
  };

  // Function to reset daily progress
  const resetProgress = () => {
    setMinutesCompleted(0);
  };

  // Render session item
  const renderSessionItem = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={styles.sessionItem}
      onPress={() => startSession(item.duration)}
    >
      <Icon name={item.icon} size={30} color="#4A90E2" />
      <View style={styles.sessionDetails}>
        <Text style={styles.sessionTitle}>{item.title}</Text>
        <Text style={styles.sessionDuration}>{item.duration} • {item.type}</Text>
      </View>
      <Icon name="play-circle-outline" size={24} color="#666666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Meditation & Yoga</Text>
        <TouchableOpacity onPress={resetProgress}>
          <Icon name="refresh" size={24} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <Progress.Circle
          size={200}
          progress={minutesCompleted / goalMinutes} // Progress based on minutes vs goal
          thickness={10}
          color="#4A90E2" // Blue for progress
          unfilledColor="#E0E0E0" // Light gray for unfilled portion
          borderWidth={0}
          showsText={false}
        />
        <View style={styles.progressTextContainer}>
          <Icon name="self-improvement" size={40} color="#4A90E2" />
          <Text style={styles.progressText}>{minutesCompleted} min</Text>
          <Text style={styles.goalText}>of {goalMinutes} min</Text>
        </View>
      </View>

      {/* Sessions Section */}
      <View style={styles.sessionsContainer}>
        <Text style={styles.sessionsTitle}>Today’s Sessions</Text>
        <FlatList
          data={sessions}
          renderItem={renderSessionItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  goalText: {
    fontSize: 16,
    color: '#666666',
  },
  sessionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sessionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionDetails: {
    flex: 1,
    marginLeft: 15,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  sessionDuration: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
});

export default MeditationYoga;