import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { UserProfile } from '@/components/UserProfile';
import { useUser } from '@clerk/clerk-react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Tabs from '@/components/Tabs'; // Import the Tabs component
import { useState } from 'react';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const { user } = useUser();
  const { top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Threads');

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="web" size={24} color="black" />
        <View style={styles.headerIcons}>
          <Ionicons name="logo-instagram" size={24} color="black" />
          <MaterialCommunityIcons name="text-short" size={24} color="black" />
        </View>
      </View>
      <UserProfile clerkId={user?.id} />
      <Tabs onTabChange={handleTabChange} />

      <View style={styles.tabContent}>
        <Text style={styles.tabContentText}>You haven't posted anything yet.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
  },
});
