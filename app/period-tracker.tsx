// app/period-tracker.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons for icons

const PeriodTrackerScreen: React.FC = () => {
  // Calendar data for May 2020
  const daysInMonth = 31;
  const firstDayOfMonth = 5; // May 1st, 2020 was a Friday (0 = Sunday, 1 = Monday, ..., 5 = Friday)
  const menstruationDays = [7, 8, 9, 10, 11]; // Days of menstruation

  // Generate calendar data
  const calendarData: (number | null)[] = [];
  // Add empty slots for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarData.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarData.push(i);
  }

  // Render each day in the calendar
  const renderDay = ({ item }: { item: number | null }) => {
    if (!item) {
      return <View style={styles.dayContainer} />;
    }

    const isMenstruationDay = menstruationDays.includes(item);
    return (
      <View
        style={[
          styles.dayContainer,
          isMenstruationDay && styles.menstruationDay,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            isMenstruationDay && styles.menstruationDayText,
          ]}
        >
          {item}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>May 2020</Text>
      </View>

      {/* Days of the Week */}
      <View style={styles.weekDays}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <FlatList
        data={calendarData}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        contentContainerStyle={styles.calendar}
      />

      {/* Tracker Info */}
      <View style={styles.trackerInfo}>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>05 days until next</Text>
          <Text style={styles.infoHighlight}>Period</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>3 day of</Text>
          <Text style={styles.infoHighlight}>menstruation</Text>
        </View>
      </View>

      {/* Ovulation Info */}
      <View style={styles.ovulationCard}>
        <Text style={styles.ovulationText}>20 days until next</Text>
        <Text style={styles.ovulationHighlight}>Ovulation Day</Text>
      </View>

      {/* Tracker Icons */}
      <View style={styles.trackerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="water" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="pill" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="pencil" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="cog" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Reminders and Notes */}
      <View style={styles.notesSection}>
        <Text style={styles.notesTitle}>Reminders:</Text>
        <Text style={styles.notesPlaceholder}>Add your reminders...</Text>
        <Text style={styles.notesTitle}>Notes:</Text>
        <Text style={styles.notesPlaceholder}>Add your notes...</Text>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6A1B9A', // Purple header
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#EDE7F6', // Light purple background for weekdays
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6A1B9A',
  },
  calendar: {
    padding: 10,
  },
  dayContainer: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  menstruationDay: {
    backgroundColor: '#F06292', // Pink for menstruation days
    borderRadius: 20,
  },
  menstruationDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  trackerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  infoCard: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  infoHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F06292',
  },
  ovulationCard: {
    alignItems: 'center',
    backgroundColor: '#E1BEE7', // Light purple for ovulation card
    borderRadius: 50,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  ovulationText: {
    fontSize: 16,
    color: '#666',
  },
  ovulationHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  trackerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#6A1B9A', // Purple background for icons
  },
  iconButton: {
    backgroundColor: '#AB47BC', // Slightly lighter purple for buttons
    borderRadius: 25,
    padding: 10,
  },
  notesSection: {
    padding: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 5,
  },
  notesPlaceholder: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 15,
  },
});

export default PeriodTrackerScreen;