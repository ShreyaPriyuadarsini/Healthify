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

// Type for a single food item
type FoodItem = {
  name: string;
  calories: number;
};

// Type for a day's calorie record
type CalorieRecord = {
  date: string; // Format: YYYY-MM-DD
  foods: FoodItem[];
};

// Basic food calorie chart (approximate calories per serving)
const basicFoodCalories = [
  { name: 'Apple (1 medium)', calories: 95 },
  { name: 'Banana (1 medium)', calories: 105 },
  { name: 'Chicken Breast (100g)', calories: 165 },
  { name: 'White Rice (1 cup, cooked)', calories: 205 },
  { name: 'Broccoli (1 cup, cooked)', calories: 55 },
  { name: 'Salmon (100g)', calories: 208 },
  { name: 'Egg (1 large)', calories: 78 },
  { name: 'Almonds (1 oz, ~23 nuts)', calories: 160 },
  { name: 'Avocado (1 medium)', calories: 234 },
  { name: 'Whole Wheat Bread (1 slice)', calories: 80 },
];

const CalorieCountScreen: React.FC = () => {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [records, setRecords] = useState<CalorieRecord[]>([]);

  // Format date as YYYY-MM-DD for consistency
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const currentDateKey = formatDate(selectedDate);

  // Find the record for the selected date
  const currentRecord = records.find((record) => record.date === currentDateKey) || {
    date: currentDateKey,
    foods: [],
  };

  // Calculate total calories for the day
  const totalCalories = currentRecord.foods.reduce((sum, food) => sum + food.calories, 0);

  // Navigation handlers for date
  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
    setFoodName('');
    setCalories('');
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
    setFoodName('');
    setCalories('');
  };

  // Add a food item
  const addFoodItem = () => {
    if (!foodName.trim() || !calories.trim()) {
      Alert.alert('Error', 'Please enter both food name and calorie count.');
      return;
    }

    const calorieValue = parseInt(calories);
    if (isNaN(calorieValue) || calorieValue <= 0) {
      Alert.alert('Error', 'Please enter a valid calorie count.');
      return;
    }

    const newFood: FoodItem = {
      name: foodName,
      calories: calorieValue,
    };

    const updatedRecords = records.filter((record) => record.date !== currentDateKey);
    updatedRecords.push({
      date: currentDateKey,
      foods: [...currentRecord.foods, newFood],
    });

    setRecords(updatedRecords);
    setFoodName('');
    setCalories('');
    Alert.alert('Success', `${foodName} added with ${calorieValue} calories!`);
  };

  // Save the day's record
  const saveDayRecord = () => {
    if (currentRecord.foods.length === 0) {
      Alert.alert('Error', 'No food items to save. Add some food items first.');
      return;
    }

    Alert.alert('Success', `Calorie record for ${selectedDate.toDateString()} saved! Total: ${totalCalories} kcal`);
  };

  // Clear the day's record
  const clearDayRecord = () => {
    Alert.alert(
      'Confirm Clear',
      'Are you sure you want to clear all food items for this day?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => {
            const updatedRecords = records.filter((record) => record.date !== currentDateKey);
            setRecords(updatedRecords);
            Alert.alert('Success', 'Day cleared!');
          },
        },
      ]
    );
  };

  // Render a single food item
  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.foodItem}>
      <Text style={styles.foodText}>{item.name}: {item.calories} kcal</Text>
    </View>
  );

  // Render a single food calorie chart item
  const renderCalorieChartItem = ({ item }: { item: { name: string; calories: number } }) => (
    <View style={styles.chartItem}>
      <Text style={styles.chartFood}>{item.name}</Text>
      <Text style={styles.chartCalories}>{item.calories} kcal</Text>
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

        {/* Add Food Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Food Item</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Food name (e.g., Apple)"
              value={foodName}
              onChangeText={setFoodName}
            />
            <TextInput
              style={[styles.input, styles.calorieInput]}
              placeholder="Calories (kcal)"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={addFoodItem}>
              <Icon name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Calorie Intake */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Calorie Intake</Text>
          <Text style={styles.totalCalories}>Total: {totalCalories} kcal</Text>
          <FlatList
            data={currentRecord.foods}
            renderItem={renderFoodItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>No food items added yet.</Text>}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveDayRecord}>
              <Text style={styles.buttonText}>Save Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={clearDayRecord}>
              <Text style={styles.buttonText}>Clear Day</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Basic Food Calorie Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Food Calorie Chart</Text>
          <FlatList
            data={basicFoodCalories}
            renderItem={renderCalorieChartItem}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={
              <View style={styles.chartHeader}>
                <Text style={styles.chartHeaderText}>Food Item</Text>
                <Text style={styles.chartHeaderText}>Calories (kcal)</Text>
              </View>
            }
          />
        </View>

        {/* Past Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Calorie Records</Text>
          {records.length > 0 ? (
            records.map((record) => {
              const recordTotal = record.foods.reduce((sum, food) => sum + food.calories, 0);
              return (
                <View key={record.date} style={styles.recordItem}>
                  <Text style={styles.recordDate}>{record.date}</Text>
                  <Text style={styles.recordTotal}>Total: {recordTotal} kcal</Text>
                  {record.foods.map((food, index) => (
                    <Text key={index} style={styles.recordFood}>
                      {food.name}: {food.calories} kcal
                    </Text>
                  ))}
                </View>
              );
            })
          ) : (
            <Text style={styles.emptyText}>No past records yet.</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333333',
    marginRight: 10,
  },
  calorieInput: {
    flex: 0.5,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
  },
  totalCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 10,
  },
  foodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  foodText: {
    fontSize: 16,
    color: '#333333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  clearButton: {
    backgroundColor: '#FF5733',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EDE9FE',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  chartHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  chartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  chartFood: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  chartCalories: {
    fontSize: 16,
    color: '#FF5733',
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
  recordTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5733',
    marginTop: 5,
  },
  recordFood: {
    fontSize: 14,
    color: '#333333',
    marginTop: 5,
  },
});

export default CalorieCountScreen;