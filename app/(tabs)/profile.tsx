// screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Corrected import

// Define navigation param list
type RootStackParamList = {
  SignIn: undefined;
  Profile: undefined;
  'water-intake': undefined;
  'meditation-yoga': undefined;
  'sleep-schedule': undefined;
  'period-tracker': undefined;
  achievements: undefined;
  plans: undefined;
};

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Icon name="pencil" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120' }}
          style={styles.profilePic}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <Icon name="camera" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* User Information Card */}
      <View style={styles.card}>
        <Text style={styles.name}>Alex Johnson</Text>
        <InfoItem icon="user" label="Age" value="28 years" />
        <InfoItem icon="ruler" label="Height" value="5’10”" />
        <InfoItem icon="balance-scale" label="Weight" value="165 lbs" />
        <InfoItem icon="male" label="Gender" value="Male" />
      </View>

      {/* Health Preferences Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Health Preferences</Text>
        <InfoItem icon="utensils" label="Preferred Diet" value="Balanced" />
        <InfoItem icon="heartbeat" label="Activity Level" value="Moderate" />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Navigate To</Text>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('water-intake')}
        >
          <Text style={styles.navButtonText}>Water Intake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('meditation-yoga')}
        >
          <Text style={styles.navButtonText}>Meditation & Yoga</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('sleep-schedule')}
        >
          <Text style={styles.navButtonText}>Sleep Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('period-tracker')}
        >
          <Text style={styles.navButtonText}>Period Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('achievements')}
        >
          <Text style={styles.navButtonText}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('plans')}
        >
          <Text style={styles.navButtonText}>Plans</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={20} color="#007AFF" style={styles.infoIcon} />
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica',
    fontWeight: '600',
    color: '#333',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 40,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  navButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;