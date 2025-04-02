import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import * as Progress from 'react-native-progress'; // For the progress circle

// Type for water intake history
interface WaterIntakeEntry {
  date: string;
  amount: number;
}

const WaterIntake: React.FC = () => {
  // State for water intake
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000); // Goal in ml (2 liters)
  const [history, setHistory] = useState<WaterIntakeEntry[]>([
    { date: '2025-03-25', amount: 1800 },
    { date: '2025-03-24', amount: 1500 },
    { date: '2025-03-23', amount: 2000 },
  ]);

  // Function to log water intake
  const logWaterIntake = (amount: number) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake);
    if (newIntake >= goal) {
      alert('Great job! You’ve reached your water intake goal for the day!');
    }
  };

  // Function to reset daily intake
  const resetIntake = () => {
    setWaterIntake(0);
    setHistory([
      { date: '2025-03-26', amount: waterIntake },
      ...history,
    ]);
  };

  // Render history item
  const renderHistoryItem = ({ item }: { item: WaterIntakeEntry }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDate}>{item.date}</Text>
      <Text style={styles.historyAmount}>{item.amount} ml</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Water Intake</Text>
        <TouchableOpacity onPress={resetIntake}>
          <Icon name="refresh" size={24} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <Progress.Circle
          size={200}
          progress={waterIntake / goal} // Progress based on intake vs goal
          thickness={10}
          color="#4A90E2" // Blue for progress
          unfilledColor="#E0E0E0" // Light gray for unfilled portion
          borderWidth={0}
          showsText={false}
        />
        <View style={styles.progressTextContainer}>
          <Icon name="local-drink" size={40} color="#4A90E2" />
          <Text style={styles.intakeText}>{waterIntake} ml</Text>
          <Text style={styles.goalText}>of {goal} ml</Text>
        </View>
      </View>

      {/* Log Water Intake Buttons */}
      <View style={styles.logContainer}>
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => logWaterIntake(250)}
        >
          <Icon name="add" size={20} color="#FFFFFF" />
          <Text style={styles.logButtonText}>Add 250ml</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => logWaterIntake(500)}
        >
          <Icon name="add" size={20} color="#FFFFFF" />
          <Text style={styles.logButtonText}>Add 500ml</Text>
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History</Text>
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.date}
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
  intakeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  goalText: {
    fontSize: 16,
    color: '#666666',
  },
  logContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2', // Blue button
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  historyDate: {
    fontSize: 16,
    color: '#333333',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default WaterIntake;