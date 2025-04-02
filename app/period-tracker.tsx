import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Types for period data
type PeriodEntry = {
  startDate: string; // ISO string (e.g., "2025-03-05")
  endDate: string; // ISO string (e.g., "2025-03-11")
};

// Main component
const PeriodTrackerScreen: React.FC = () => {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodHistory, setPeriodHistory] = useState<PeriodEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [periodDuration, setPeriodDuration] = useState<string>('7'); // Default to 7 days

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('periodHistory');
        if (savedHistory) setPeriodHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading data:', e);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('periodHistory', JSON.stringify(periodHistory));
      } catch (e) {
        console.error('Error saving data:', e);
      }
    };
    saveData();
  }, [periodHistory]);

  // Calendar calculations
  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return {
      daysInMonth,
      firstDayOfMonth: firstDay === 0 ? 6 : firstDay - 1, // Adjust for Monday start
    };
  };

  const { daysInMonth, firstDayOfMonth } = getMonthData(currentDate);
  const calendarData: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Period prediction and status logic
  const getLastPeriodStartDate = () => {
    if (periodHistory.length === 0) {
      const prevMonth = new Date();
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      prevMonth.setDate(1);
      return prevMonth;
    }
    const lastEntry = periodHistory.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )[0];
    return new Date(lastEntry.startDate);
  };

  const getLastPeriodDuration = () => {
    if (periodHistory.length === 0) {
      return 7; // Default to 7 days if no history
    }
    const lastEntry = periodHistory.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )[0];
    const start = new Date(lastEntry.startDate);
    const end = new Date(lastEntry.endDate);
    const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
    return duration;
  };

  const getPredictedPeriodStartDate = () => {
    const lastPeriodDate = getLastPeriodStartDate();
    const predictedDate = new Date(lastPeriodDate);
    predictedDate.setMonth(predictedDate.getMonth() + 1); // Same day next month
    return predictedDate;
  };

  const daysUntilNextPeriod = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const nextPeriodDate = getPredictedPeriodStartDate();
    nextPeriodDate.setHours(0, 0, 0, 0);
    const timeDiff = nextPeriodDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  const periodStatus = () => {
    const dayDiff = daysUntilNextPeriod();
    if (dayDiff > 0) return `Next period in ${dayDiff} days`;
    if (dayDiff === 0) return "Period expected today";
    return `Period is ${-dayDiff} days late`;
  };

  const getCurrentPeriodStatus = () => {
    if (periodHistory.length < 2) {
      return "Not enough data to determine status.";
    }

    // Get the two most recent periods
    const sortedHistory = periodHistory.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    const currentPeriod = sortedHistory[0]; // Most recent period
    const previousPeriod = sortedHistory[1]; // Second most recent period

    const currentStartDate = new Date(currentPeriod.startDate);
    const previousStartDate = new Date(previousPeriod.startDate);

    // Predict the expected start date based on the previous period
    const predictedStartDate = new Date(previousStartDate);
    predictedStartDate.setMonth(predictedStartDate.getMonth() + 1);

    // Calculate the difference in days
    const diffTime = currentStartDate.getTime() - predictedStartDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

    if (diffDays < 0) {
      return `Period started ${-diffDays} days early`;
    } else if (diffDays > 0) {
      return `Period started ${diffDays} days late`;
    } else {
      return `Period started on time`;
    }
  };

  // Handlers
  const togglePeriodDay = (day: number) => {
    setSelectedDay(day);
  };

  const savePeriod = () => {
    if (selectedDay === null) {
      Alert.alert('Error', 'Please select the start day of your period.');
      return;
    }

    const duration = parseInt(periodDuration, 10);
    if (isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'Please enter a valid period duration (in days).');
      return;
    }

    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1); // Calculate end date based on duration

    const newEntry: PeriodEntry = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    setPeriodHistory((prev) => [
      ...prev.filter((entry) => {
        const entryDate = new Date(entry.startDate);
        return (
          entryDate.getFullYear() !== currentDate.getFullYear() ||
          entryDate.getMonth() !== currentDate.getMonth()
        );
      }),
      newEntry,
    ]);

    setSelectedDay(null);
    setPeriodDuration('7'); // Reset to default of 7 days
    Alert.alert('Success', `Period saved starting on ${startDate.toDateString()} for ${duration} days`);
  };

  const resetHistory = () => {
    Alert.alert(
      'Confirm Reset',
      'Are you sure you want to reset all period history? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear the state
              setPeriodHistory([]);
              setSelectedDay(null);
              setPeriodDuration('7');
              // Clear AsyncStorage
              await AsyncStorage.removeItem('periodHistory');
              Alert.alert('Success', 'Period history has been reset.');
            } catch (e) {
              console.error('Error resetting history:', e);
              Alert.alert('Error', 'Failed to reset period history.');
            }
          },
        },
      ]
    );
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    setSelectedDay(null); // Reset selected day for new month
  };

  // Render day
  const renderDay = ({ item }: { item: number | null }) => {
    if (!item) return <View style={styles.dayContainer} />;

    const isSelected = selectedDay === item;
    const isToday =
      item === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    // Check if this day is a period day from history
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), item);
    const isPeriodDay = periodHistory.some((entry) => {
      const start = new Date(entry.startDate);
      const end = new Date(entry.endDate);
      return dayDate >= start && dayDate <= end;
    });

    // Check if this day is a predicted period day
    const nextPeriodStart = getPredictedPeriodStartDate();
    const duration = getLastPeriodDuration(); // Use the duration of the last period
    const isPredictedPeriodDay =
      nextPeriodStart.getFullYear() === currentDate.getFullYear() &&
      nextPeriodStart.getMonth() === currentDate.getMonth() &&
      item >= nextPeriodStart.getDate() &&
      item < nextPeriodStart.getDate() + duration;

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isSelected && styles.selectedDay,
          isPeriodDay && styles.periodDay,
          isPredictedPeriodDay && styles.predictedPeriodDay,
          isToday && styles.today,
        ]}
        onPress={() => togglePeriodDay(item)}
      >
        <Text
          style={[
            styles.dayText,
            (isSelected || isPeriodDay || isPredictedPeriodDay) && styles.highlightedText,
            isToday && styles.todayText,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeMonth('prev')}>
            <Icon name="chevron-left" size={width * 0.06} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity onPress={() => changeMonth('next')}>
            <Icon name="chevron-right" size={width * 0.06} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Weekdays */}
        <View style={styles.weekDays}>
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar */}
        <FlatList
          data={calendarData}
          renderItem={renderDay}
          keyExtractor={(_, index) => index.toString()}
          numColumns={7}
          contentContainerStyle={styles.calendar}
          scrollEnabled={false}
        />

        {/* Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>Current Period Status</Text>
          <Text style={styles.statusText}>{getCurrentPeriodStatus()}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.trackerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={savePeriod}>
            <Icon name="content-save" size={width * 0.06} color="#FFFFFF" />
            <Text style={styles.iconText}>Save Period</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={resetHistory}>
            <Icon name="delete" size={width * 0.06} color="#FFFFFF" />
            <Text style={styles.iconText}>Reset History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Updated Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.02,
  },
  header: {
    backgroundColor: '#7C3AED',
    paddingVertical: height * 0.025,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#EDE9FE',
  },
  weekDayText: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#6D28D9',
    flex: 1,
    textAlign: 'center',
  },
  calendar: {
    padding: width * 0.04,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: width * 0.025,
    marginVertical: height * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  dayContainer: {
    width: (width - width * 0.14) / 7,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.005,
  },
  dayText: {
    fontSize: width * 0.04,
    color: '#374151',
    fontWeight: '500',
  },
  selectedDay: {
    backgroundColor: '#FBCFE8',
    borderRadius: 50,
  },
  periodDay: {
    backgroundColor: '#F472B6',
    borderRadius: 50,
  },
  predictedPeriodDay: {
    backgroundColor: '#F9A8D4',
    borderRadius: 50,
  },
  highlightedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  today: {
    borderWidth: 2,
    borderColor: '#7C3AED',
    borderRadius: 50,
  },
  todayText: {
    color: '#7C3AED',
  },
  inputSection: {
    padding: width * 0.05,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: width * 0.025,
    marginVertical: height * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  inputTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: height * 0.01,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDE9FE',
    borderRadius: 8,
    padding: width * 0.02,
    marginBottom: height * 0.015,
    fontSize: width * 0.04,
    color: '#374151',
  },
  trackerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    backgroundColor: '#7C3AED',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexWrap: 'wrap',
  },
  iconButton: {
    backgroundColor: '#9F67FF',
    borderRadius: 30,
    padding: width * 0.03,
    margin: width * 0.01,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    marginLeft: width * 0.02,
    fontSize: 16,
  },
  statusSection: {
    padding: width * 0.05,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: width * 0.025,
    marginVertical: height * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  statusTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: height * 0.01,
  },
  statusText: {
    fontSize: width * 0.04,
    color: '#374151',
    marginBottom: height * 0.005,
  },
});

export default PeriodTrackerScreen;