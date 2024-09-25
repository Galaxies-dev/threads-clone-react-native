import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { UserProfile } from '@/components/UserProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Tabs from '@/components/Tabs'; // Import the Tabs component
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserProfile } from '@/hooks/useUserProfile';
import Thread from '@/components/Thread';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

type ProfileProps = {
  userId?: Id<'users'>;
  showBackButton?: boolean;
};

export default function Profile({ userId, showBackButton = false }: ProfileProps) {
  const { top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Threads');
  const { userProfile } = useUserProfile();
  const router = useRouter();

  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    { userId: userId || userProfile?._id },
    { initialNumItems: 10 }
  );

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {results.length === 0 && (
        <Text style={styles.tabContentText}>You haven't posted anything yet.</Text>
      )}
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <Link href={`/feed/${item._id}`} asChild>
            <TouchableOpacity>
              <Thread thread={item as Doc<'messages'> & { creator: Doc<'users'> }} />
            </TouchableOpacity>
          </Link>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={24} color="#000" />
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons name="web" size={24} color="black" />
              )}
              <View style={styles.headerIcons}>
                <Ionicons name="logo-instagram" size={24} color="black" />
                <MaterialCommunityIcons name="text-short" size={24} color="black" />
              </View>
            </View>
            {userId ? <UserProfile userId={userId} /> : <UserProfile userId={userProfile?._id} />}

            <Tabs onTabChange={handleTabChange} />
          </>
        }
      />
    </View>
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
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
});
