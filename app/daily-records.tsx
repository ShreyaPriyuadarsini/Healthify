import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Type for a single day's record
type DailyRecord = {
  date: string; // Format: YYYY-MM-DD
  diary: string;
  schedule: string[];
};

const DailyRecordsScreen: React.FC = () => {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryEntry, setDiaryEntry] = useState<string>('');
  const [newTask, setNewTask] = useState<string>('');
  const [records, setRecords] = useState<DailyRecord[]>([]);

  // Format date as YYYY-MM-DD for consistency
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const currentDateKey = formatDate(selectedDate);

  // Find the record for the selected date
  const currentRecord = records.find((record) => record.date === currentDateKey) || {
    date: currentDateKey,
    diary: '',
    schedule: [],
  };

  // Navigation handlers for date
  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
    setDiaryEntry(''); // Clear input for new date
    setNewTask('');
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
    setDiaryEntry(''); // Clear input for new date
    setNewTask('');
  };

  // Save diary entry
  const saveDiaryEntry = () => {
    if (!diaryEntry.trim()) {
      Alert.alert('Error', 'Please enter a diary entry before saving.');
      return;
    }

    const updatedRecords = records.filter((record) => record.date !== currentDateKey);
    updatedRecords.push({
      date: currentDateKey,
      diary: diaryEntry,
      schedule: currentRecord.schedule,
    });

    setRecords(updatedRecords);
    Alert.alert('Success', 'Diary entry saved!');
  };

  // Add a new task to the schedule
  const addTask = () => {
    if (!newTask.trim()) {
      Alert.alert('Error', 'Please enter a task before adding.');
      return;
    }

    const updatedRecords = records.filter((record) => record.date !== currentDateKey);
    updatedRecords.push({
      date: currentDateKey,
      diary: currentRecord.diary,
      schedule: [...currentRecord.schedule, newTask],
    });

    setRecords(updatedRecords);
    setNewTask(''); // Clear task input
    Alert.alert('Success', 'Task added to schedule!');
  };

  // Render a single task
  const renderTask = ({ item }: { item: string }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Date Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {selectedDate.toDateString() === new Date().toDateString()
              ? 'Today'
              : selectedDate.toDateString()}
          </Text>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Diary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Diary</Text>
          <TextInput
            style={styles.diaryInput}
            multiline
            placeholder="Write your thoughts for the day..."
            value={diaryEntry || currentRecord.diary}
            onChangeText={setDiaryEntry}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveDiaryEntry}>
            <Text style={styles.buttonText}>Save Diary</Text>
          </TouchableOpacity>
        </View>

        {/* Work Schedule Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Schedule</Text>
          <View style={styles.taskInputContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="Add a task..."
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Icon name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={currentRecord.schedule}
            renderItem={renderTask}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>No tasks for this day.</Text>}
          />
        </View>

        {/* View Past Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Records</Text>
          {records.length > 0 ? (
            records.map((record) => (
              <View key={record.date} style={styles.recordItem}>
                <Text style={styles.recordDate}>{record.date}</Text>
                <Text style={styles.recordDiary}>Diary: {record.diary || 'No entry'}</Text>
                <Text style={styles.recordSchedule}>
                  Schedule: {record.schedule.length > 0 ? record.schedule.join(', ') : 'No tasks'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No records yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  diaryInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    fontSize: 16,
    color: '#333333',
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  taskText: {
    fontSize: 16,
    color: '#333333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
  },
  recordItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  recordDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  recordDiary: {
    fontSize: 14,
    color: '#333333',
    marginTop: 5,
  },
  recordSchedule: {
    fontSize: 14,
    color: '#333333',
    marginTop: 5,
  },
});

export default DailyRecordsScreen;