import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For icons

// Screen dimensions for chart sizing
const screenWidth = Dimensions.get('window').width;

const Dashboard: React.FC = () => {
  // Sample data for the chart (weekly progress)
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [10, 20, 15, 30, 25, 35, 20], // Example: Steps in thousands
        color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`, // Light blue
        strokeWidth: 2,
      },
    ],
  };

  // Data summary items
  const summaryItems = [
    { icon: 'shoe-print', label: 'Steps', value: '8,500' },
    { icon: 'glass-water', label: 'Water', value: '6/8 glasses' },
    { icon: 'lotus', label: 'Meditation', value: '30 min' },
    { icon: 'moon', label: 'Sleep', value: '7.5/8 hr' },
    { icon: 'calendar', label: 'Menstrual', value: 'Cycle Day 10' },
  ];

  // Achievement items
  const achievements = [
    { label: 'Water Streak', value: '5/7 days' },
    { label: 'Meditation Master', value: '25/30 days' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.date}>March 16, 2025</Text>
        <Text style={styles.greeting}>Good evening, User</Text>
        <Text style={styles.sectionTitle}>Data Summary</Text>
      </View>

      {/* Main Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 40} // Adjust for padding
          height={220}
          yAxisLabel=""
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4285f4',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Data Summary */}
      <View style={styles.summaryContainer}>
        {summaryItems.map((item, index) => (
          <View key={index} style={styles.summaryCard}>
            <Icon name={item.icon} size={24} color="#4285f4" />
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Score Section */}
      <View style={styles.scoreContainer}>
        <Text style={styles.sectionTitle}>Score</Text>
        <View style={styles.scoreContent}>
          <Progress.Circle
            size={80}
            progress={0.85} // 85%
            showsText={true}
            color="#4285f4"
            textStyle={styles.progressText}
            thickness={5}
          />
          <Text style={styles.scoreText}>Daily Score: Great job!</Text>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Menstrual Record</Text>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <Icon name="trophy" size={20} color="#4285f4" />
            <Text style={styles.achievementLabel}>{achievement.label}</Text>
            <Text style={styles.achievementValue}>{achievement.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    borderRadius: 16,
  },
  summaryContainer: {
    padding: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4285f4',
  },
  scoreContainer: {
    padding: 20,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  scoreText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
  },
  achievementsContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  achievementValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4285f4',
  },
});

export default Dashboard;