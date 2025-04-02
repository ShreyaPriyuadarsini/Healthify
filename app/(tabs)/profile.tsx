import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Logout Failed');
     
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Image source={{ uri: 'https://via.placeholder.com/120' }} style={styles.profilePic} />
          <TouchableOpacity style={styles.cameraIcon}>
            <Icon name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
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
    fontWeight: '600',
    color: '#333',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;