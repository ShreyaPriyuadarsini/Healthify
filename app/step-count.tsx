import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pedometer } from "expo-sensors";
import * as Progress from "react-native-progress";
import * as Device from "expo-device";

const StepCount = () => {
  const [steps, setSteps] = useState<number>(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<boolean | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<any>(null);
  const stepGoal = 5000;

  // 📌 Request Motion & Fitness Permissions
  const requestPermissions = async () => {
    if (!Device.isDevice) {
      Alert.alert("Simulator Detected", "Step tracking requires a physical device.");
      return false;
    }

    const available = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(available);

    if (!available) {
      Alert.alert("Pedometer Not Available", "Your device does not support step tracking.");
      return false;
    }
    return true;
  };

  // 📌 Start Step Tracking
  const startTracking = async () => {
    if (!(await requestPermissions())) return;

    const stepSubscription = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });

    setSubscription(stepSubscription);
    setIsTracking(true);
  };

  // 📌 Stop Step Tracking
  const stopTracking = () => {
    subscription?.remove();
    setSubscription(null);
    setIsTracking(false);
  };

  useEffect(() => {
    requestPermissions(); // ✅ Request permission on mount

    return () => {
      subscription?.remove(); // Cleanup when unmounting
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Steps</Text>

      {isPedometerAvailable === null ? (
        <Text style={styles.statusText}>Checking pedometer availability...</Text>
      ) : !isPedometerAvailable ? (
        <Text style={styles.statusText}>Pedometer not available on this device</Text>
      ) : (
        <>
          <View style={styles.progressContainer}>
            <Progress.Circle
              size={200}
              progress={Math.min(steps / stepGoal, 1)}
              color="#FF007F"
              unfilledColor="#333"
              borderWidth={0}
              thickness={10}
              showsText={true}
              formatText={() => `${steps}`}
              textStyle={styles.stepText}
            />
            <Text style={styles.goalText}>Goal: {stepGoal}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="walk" size={24} color="#00AEEF" />
              <Text style={styles.statText}>{(steps * 0.0008).toFixed(2)} Miles</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="flame" size={24} color="#FF4500" />
              <Text style={styles.statText}>{(steps * 0.04).toFixed(0)} Kcal</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="time" size={24} color="#32CD32" />
              <Text style={styles.statText}>{(steps * 0.007).toFixed(0)} Min</Text>
            </View>
          </View>
        </>
      )}

      <TouchableOpacity
        style={styles.controlButton}
        onPress={isTracking ? stopTracking : startTracking}
      >
        <Text style={styles.controlText}>{isTracking ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  goalText: {
    fontSize: 16,
    color: "#FFF",
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statText: {
    color: "#FFF",
    marginTop: 5,
  },
  controlButton: {
    marginTop: 30,
    backgroundColor: "#FF007F",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  controlText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default StepCount;
