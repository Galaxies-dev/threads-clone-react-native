import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { UserProfile } from '@/components/UserProfile';
import { useUser } from '@clerk/clerk-react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Tabs from '@/components/Tabs'; // Import the Tabs component
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserProfile } from '@/hooks/useUserProfile';
import { FlashList } from '@shopify/flash-list';
import Thread from '@/components/Thread';
import { Doc } from '@/convex/_generated/dataModel';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const { user } = useUser();
  const { top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Threads');
  const { userProfile } = useUserProfile();

  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    { userId: userProfile?._id },
    { initialNumItems: 10 }
  );
  console.log('iser threads; ', results);

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
        {results.length === 0 && (
          <Text style={styles.tabContentText}>You haven't posted anything yet.</Text>
        )}
        <FlashList
          data={results}
          renderItem={({ item }) => (
            <Link href={`/feed/${item._id}`} asChild>
              <TouchableOpacity>
                <Thread thread={item as Doc<'messages'> & { creator: Doc<'users'> }} />
              </TouchableOpacity>
            </Link>
          )}
          estimatedItemSize={200}
        />
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
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
  },
});
