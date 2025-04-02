import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

interface SleepRecord {
  bedtime: string;
  wakeUp: string;
}

const SleepAnalytics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sleepRecords, setSleepRecords] = useState<Record<string, SleepRecord>>({});
  const [bedtime, setBedtime] = useState('');
  const [wakeUp, setWakeUp] = useState('');
  const sleepGoalMinutes = 8 * 60; // 480 minutes

  useEffect(() => {
    const dateKey = formatDate(selectedDate);
    if (sleepRecords[dateKey]) {
      setBedtime(sleepRecords[dateKey].bedtime);
      setWakeUp(sleepRecords[dateKey].wakeUp);
    } else {
      setBedtime('');
      setWakeUp('');
    }
  }, [selectedDate, sleepRecords]);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const parseTime = (time: string): number => {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) return NaN;
    const [hours, minutes] = time.split(':').map(Number);
    if (hours > 23 || minutes > 59) return NaN;
    return hours * 60 + minutes;
  };

  const calculateSleepDuration = (bedtime: string, wakeUp: string) => {
    const bedMinutes = parseTime(bedtime);
    const wakeMinutes = parseTime(wakeUp);

    if (isNaN(bedMinutes) || isNaN(wakeMinutes)) {
      return { hours: 0, minutes: 0, totalMinutes: 0 };
    }

    let totalMinutes = wakeMinutes - bedMinutes;
    if (totalMinutes < 0) totalMinutes += 24 * 60;

    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
      totalMinutes,
    };
  };

  const handleTimeInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const cleaned = text.replace(/[^0-9:]/g, '');
    if (cleaned.length <= 5) {
      if (cleaned.length === 2 && !cleaned.includes(':')) {
        setter(`${cleaned}:`);
      } else if (cleaned.length === 3 && cleaned[2] !== ':') {
        setter(`${cleaned.slice(0, 2)}:${cleaned.slice(2)}`);
      } else {
        setter(cleaned);
      }
    }
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    if (nextDay <= new Date()) setSelectedDate(nextDay);
  };

  const handleSave = () => {
    const dateKey = formatDate(selectedDate);
    if (!parseTime(bedtime) || !parseTime(wakeUp)) {
      Alert.alert('Error', 'Please enter valid times in HH:MM format (00:00-23:59)');
      return;
    }
    setSleepRecords((prevRecords) => ({
      ...prevRecords,
      [dateKey]: { bedtime, wakeUp },
    }));
    Alert.alert('Success', 'Sleep schedule saved!');
  };

  const { hours, minutes, totalMinutes } = calculateSleepDuration(bedtime, wakeUp);
  const progress = totalMinutes / sleepGoalMinutes; // Value between 0 and 1+

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{formatDate(selectedDate)}</Text>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.gaugeContainer}>
          <Progress.Circle
            size={200}
            progress={Math.min(progress, 1)} // Cap at 1 to avoid overflow
            thickness={15}
            color="#4A90E2"
            unfilledColor="#E0E0E0"
            borderWidth={0}
            animated={true} // Enable animation for better UX
            textStyle={{ fontSize: 24, color: '#333' }}
          />
          <Text style={styles.sleepDuration}>
            {hours}h {minutes}m
          </Text>
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}% of 8h goal
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <View style={styles.timeCard}>
            <Text style={styles.label}>Bedtime</Text>
            <TextInput
              style={styles.input}
              value={bedtime}
              onChangeText={(text) => handleTimeInput(text, setBedtime)}
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          <View style={styles.timeCard}>
            <Text style={styles.label}>Wake-up</Text>
            <TextInput
              style={styles.input}
              value={wakeUp}
              onChangeText={(text) => handleTimeInput(text, setWakeUp)}
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Sleep Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingBottom: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20, 
    backgroundColor: '#4A90E2' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FFF' 
  },
  gaugeContainer: { 
    alignItems: 'center', 
    marginVertical: 30,
    padding: 10,
  },
  sleepDuration: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#333',
    marginTop: 15,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  timeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingHorizontal: 20 
  },
  timeCard: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 12, 
    width: '45%', 
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: { 
    fontSize: 16, 
    color: '#666',
    marginBottom: 10 
  },
  input: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    textAlign: 'center'
  },
  saveButton: { 
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 2
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

export default SleepAnalytics;